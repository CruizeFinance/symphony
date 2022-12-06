import Tabs from '../../../components/tabs'
import { Button, Input, Sprite, Typography } from '../../../components'
import styled from 'styled-components'
import STYLES from '../../../style/styles.json'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
  CONTRACTS_CONFIG,
  PRICE_FLOORS_RESPONSE_MAPPING,
  rem,
} from '../../../utils'
import { chain, useAccount, useFeeData } from 'wagmi'
import { BigNumber, ethers } from 'ethers'
import { depositToDyDx, storeTransaction } from '../../../apis'
import { AppContext } from '../../../context'
import ProtectCardModals from './ProtectCardModals'
import { Actions } from '../../../context/Action'
import ProtectCardConfirm from './ProtectCardConfirm'
import {
  ConnectWalletButton,
  DetailComponent,
  SwitchNetworkButton,
} from '../../../common'
import AddTokensToWallet from './AddTokensToWallet'
import { TransactionReceipt, TransactionResponse } from '../../../interfaces'

const ProtectArea = styled.div`
  background: ${STYLES.palette.colors.cardBackground};
  padding: ${rem(24)} ${rem(20)};
  border-radius: ${rem(20)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${rem(20)};
  max-width: ${rem(450)};
  position: relative;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(20)} ${rem(16)};
    width: 100%;
  }
`
const DetailArea = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${rem(8)};
  width: 100%;
`

/*
 * Protect Card
 * Created to carry out protection and withdrawal functionalities
 * This is where the users are expected to interact the most
 */
const ProtectCard = () => {
  // context
  const [state, dispatch] = useContext(AppContext)

  // object for fetching token contracts per chain
  const contractsConfig = CONTRACTS_CONFIG[state.chainId || chain.goerli.id]

  // web3 hooks
  const { isConnected, address, connector } = useAccount()
  const { data: gasData } = useFeeData({
    chainId: state.chainId,
    formatUnits: 'ether',
  })

  /*
   * memoised value to set a local price floor state instead of rewriting the same code multiple times
   */
  const priceFloor = useMemo(
    () =>
      state.priceFloors
        ? state.priceFloors[
            PRICE_FLOORS_RESPONSE_MAPPING[
              state.selectedAsset
                .label as keyof typeof PRICE_FLOORS_RESPONSE_MAPPING
            ] as keyof typeof state.priceFloors
          ]
        : 0,
    [state.selectedAsset, state.priceFloors],
  )

  // state hooks
  const [openConfirmSection, setOpenConfirmSection] = useState(false)
  const [openTutorialVideo, setOpenTutorialVideo] = useState(false)
  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<{
    hash: string
    status: number
  }>({ hash: '', status: 0 })
  const [modalType, setModalType] = useState<
    'tutorial' | 'transaction' | 'error'
  >('tutorial')

  /*
   * a function to display error in case of a mistype during protection or withdrawal
   */
  const setError = () => {
    return inputValue && parseFloat(inputValue) === 0
      ? 'Amount should be greater than 0.'
      : inputValue && parseFloat(inputValue) > parseFloat(state.assetBalance)
      ? 'Amount exceeds balance.'
      : state.tab === 'protect' && state.assetPrice < priceFloor
      ? 'Cannot protect. Asset price lower than the price floor.'
      : ''
  }

  /*
   * function to write to contract
   */
  const writeContract = async (
    functionName: string,
    args: Array<BigNumber | string>,
  ) => {
    try {
      const tx = await state.cruizeContract![functionName](...args)
      const data: TransactionReceipt = await transactionExecution(tx)
      await storeTransaction(
        address ?? '',
        data.transactionHash,
        state.selectedAsset.label,
        inputValue || '0',
        state.tab === 'withdraw' ? 'Withdraw' : 'Protect',
      )
      // deposit assets to dydx in case of protect
      if (state.tab === 'protect') await depositToDyDx()
    } catch (e) {
      resetTransactionDetails()
    }
  }

  /*
   * a function to approve erc20 token to spend
   */
  const approveToken = async () => {
    try {
      const tx = await state.assetContract!.approve(
        contractsConfig['CRUIZE'].address,
        ethers.constants.MaxUint256,
      )
      const data: TransactionReceipt = await transactionExecution(tx)
      dispatch({
        type: Actions.STORE_TOKEN_APPROVED,
        payload: data.status === 1,
      })
    } catch (e) {
      resetTransactionDetails()
    }
  }

  /*
   * a function to execute transaction
   */
  const transactionExecution = async (tx: TransactionResponse) => {
    setModalType('transaction')
    setOpenTransactionModal(true)
    setTransactionLoading(true)
    setTransactionDetails({
      ...transactionDetails,
      hash: tx!.hash,
    })
    const data: TransactionReceipt = await tx.wait()
    setTransactionDetails({
      hash: data.transactionHash,
      status: data.status || 0,
    })
    setTransactionLoading(false)
    setOpenConfirmSection(false)
    return data
  }

  /*
   * function to protect or withdraw the asset based on the user's choice
   */
  const onConfirm = async () => {
    try {
      writeContract(state.tab === 'protect' ? 'deposit' : 'withdraw', [
        ethers.utils.parseUnits(
          inputValue || '0',
          contractsConfig[
            state.selectedAsset.label as keyof typeof contractsConfig
          ]?.decimals || '',
        ),
        contractsConfig[
          state.selectedAsset.label as keyof typeof contractsConfig
        ]?.address || '',
      ])
    } catch (e) {
      resetTransactionDetails()
    }
  }

  /*
   * a function to mint token
   */
  const mintToken = async () => {
    try {
      if (connector?.id.toLowerCase() === 'metamask') addToken('weth')
      const tx = await state.mintContract!.mint(
        ethers.utils.parseUnits(
          '1',
          contractsConfig[
            state.selectedAsset.label as keyof typeof contractsConfig
          ]?.decimals || '',
        ),
      )
      await transactionExecution(tx)
    } catch (e) {
      resetTransactionDetails()
    }
  }

  /*
   * add token
   * a function written to add wrapped cruize token to metamask against the selected asset
   */
  const addToken = async (type = 'asset') => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address:
              contractsConfig[
                type === 'usdc'
                  ? 'CRUIZE-USDC'
                  : (state.selectedAsset.label as keyof typeof contractsConfig)
              ]![type === 'weth' ? 'address' : 'cruizeAddress'] || '', // The address that the token is at.
            symbol:
              type === 'usdc'
                ? 'USDC'
                : type === 'weth'
                ? state.selectedAsset.label
                : `cr${state.selectedAsset.label}`, // A ticker symbol or shorthand, up to 5 chars.
            decimals:
              contractsConfig[
                type === 'usdc'
                  ? 'CRUIZE-USDC'
                  : (state.selectedAsset.label as keyof typeof contractsConfig)
              ]?.decimals || '', // The number of decimals in the token
          },
        },
      })
    } catch (error: any) {
      if (error.code !== 4001) {
        setOpenErrorModal(true)
      }
    }
  }

  /*
   * a function to reset transaction details
   */
  const resetTransactionDetails = () => {
    setTransactionLoading(false)
    setInputValue('')
    setOpenConfirmSection(false)
  }

  /*
   * an effect to reset transaction details on closing the modal
   */
  useEffect(() => {
    if (!openTransactionModal) {
      setTransactionDetails({
        hash: '',
        status: 0,
      })
      resetTransactionDetails()
    }
  }, [openTransactionModal])

  /*
   * a function to get user balance of the asset
   */
  const getBalance = async () => {
    const balance: BigNumber = await state[
      state.tab === 'protect' ? 'assetContract' : 'cruizeAssetContract'
    ]!.balanceOf(address)
    dispatch({
      type: Actions.STORE_ASSET_BALANCE,
      payload: ethers.utils.formatUnits(
        balance,
        contractsConfig[
          state.selectedAsset.label as keyof typeof contractsConfig
        ]?.decimals,
      ),
    })
  }

  /*
   * an effect to call the set default values function
   */
  useEffect(() => {
    setInputValue('')
  }, [state.tab, state.selectedAsset])

  /*
   * an effect to get asset balance
   */
  useEffect(() => {
    if (state.assetContract && state.cruizeAssetContract) getBalance()
  }, [
    state.tab,
    state.selectedAsset,
    transactionDetails.status,
    state.assetContract,
    state.cruizeAssetContract,
    address,
  ])

  return (
    <>
      <AddTokensToWallet addToken={addToken} />
      <ProtectArea>
        <Tabs
          onClick={(val) =>
            dispatch({ type: Actions.STORE_TAB, payload: val.toLowerCase() })
          }
          tabs={[{ label: 'Protect' }, { label: 'Withdraw' }]}
          tabStyle={{ paddingTop: '0', fontSize: '22' }}
        />
        <Input
          label="AMOUNT"
          inputValue={inputValue}
          onInputChange={(val) => setInputValue(val)}
          onMaxClick={(val) => setInputValue(val)}
          // error shown if the input value is 0 or the input value exceeds the user asset's balance
          error={setError()}
        />
        <DetailComponent
          label="You will receive"
          value={`${
            state.tab === 'protect'
              ? `${inputValue} cr${state.selectedAsset.label}`
              : state.assetPrice > priceFloor
              ? `${inputValue} ${state.selectedAsset.label}`
              : `${(
                  Number(inputValue || 0) * state.assetPrice
                ).toString()} USDC`
          }`}
        />
        <DetailArea>
          <Typography
            fontFamily="semiBold"
            style={{ width: '100%', textAlign: 'left', marginBottom: rem(8) }}
          >
            Protection Details
          </Typography>
          <DetailComponent
            label="Price Floor"
            value={`${priceFloor.toFixed(2) || '-'} USDC`}
            tooltipContent={`cr${state.selectedAsset.label} is hedged with this minimum value.`}
          />
        </DetailArea>
        <DetailComponent
          label={`1 cr${state.selectedAsset.label} = ${
            priceFloor > state.assetPrice
              ? priceFloor.toFixed(2)
              : state.assetPrice?.toFixed(2) || '0.00'
          } USDC`}
          value={
            <Typography
              tag="span"
              style={{
                background: STYLES.palette.colors.inputBackground,
                padding: `${rem(6)} ${rem(3)}`,
                display: 'flex',
                gap: rem(4),
              }}
            >
              {state.supportedChains.includes(state.chainId) ? (
                <>
                  <Sprite id="gas-icon" width={16} height={16} />
                  <Typography tag="span" color={STYLES.palette.colors.white60}>
                    $
                    {(
                      Number(gasData?.formatted.gasPrice || 0) * state.ethPrice
                    ).toFixed(10) || '-'}
                  </Typography>
                </>
              ) : null}
            </Typography>
          }
        />
        {!isConnected ? (
          <ConnectWalletButton
            buttonLabel="Connect Wallet"
            showIcon={true}
            style={{ padding: `${rem(16)} ${rem(32)}`, width: '100%' }}
          />
        ) : !state.supportedChains.includes(state.chainId) ? (
          <SwitchNetworkButton
            style={{ padding: `${rem(16)} ${rem(32)}`, borderRadius: rem(100) }}
          />
        ) : (
          <Button
            buttonType="protect"
            onClick={
              state.assetPrice === 0 || priceFloor === 0
                ? () => {
                    setModalType('error')
                    setOpenErrorModal(true)
                  }
                : !state.tokenApproved
                ? () => approveToken()
                : () => setOpenConfirmSection(true)
            }
            disabled={
              setError() !== '' ||
              !inputValue ||
              !state.supportedChains.includes(state.chainId)
            }
            borderRadius={32}
          >
            {!state.tokenApproved
              ? 'Approve'
              : state.tab === 'protect'
              ? 'Protect'
              : 'Withdraw'}
          </Button>
        )}
        <Typography
          tag="label"
          style={{ fontSize: rem(14), lineHeight: '16.48px' }}
        >
          Need to add {state.selectedAsset.label} to your wallet?&nbsp;
          <Typography
            tag="label"
            color={STYLES.palette.colors.linkBlue}
            onClick={() => mintToken()}
            style={{
              fontSize: rem(14),
              lineHeight: '16.48px',
              cursor: 'pointer',
            }}
          >
            Click here
          </Typography>
        </Typography>
        <Typography
          tag="label"
          style={{ fontSize: rem(14), lineHeight: '16.48px' }}
        >
          Need help?&nbsp;
          <Typography
            tag="label"
            color={STYLES.palette.colors.linkBlue}
            onClick={() => {
              setModalType('tutorial')
              setOpenTutorialVideo(true)
            }}
            style={{
              fontSize: rem(14),
              lineHeight: '16.48px',
              cursor: 'pointer',
            }}
          >
            Learn from video tutorials/docs
          </Typography>
        </Typography>
        <ProtectCardConfirm
          open={openConfirmSection}
          hide={() => setOpenConfirmSection(false)}
          onConfirm={() => onConfirm()}
          inputValue={inputValue || '-'}
          totalCost={
            Number(gasData?.formatted.gasPrice || 0).toFixed(10) + ' ETH'
          }
          priceFloor={`$${priceFloor.toFixed(2)}`}
          usdValue={`${(Number(inputValue || 0) * state.assetPrice).toFixed(
            4,
          )} USDC`}
          receiveValue={`${
            state.tab === 'protect'
              ? `${inputValue} cr${state.selectedAsset.label}`
              : state.assetPrice > priceFloor
              ? `${inputValue} ${state.selectedAsset.label}`
              : `${(
                  Number(inputValue || 0) * state.assetPrice
                ).toString()} USDC`
          }`}
        />
      </ProtectArea>
      <ProtectCardModals
        tutorialModalOptions={{
          openTutorialVideo: openTutorialVideo,
          setOpenTutorialVideo: (val) => setOpenTutorialVideo(val),
        }}
        transactionModalOptions={{
          openTransactionModal: openTransactionModal,
          setOpenTransactionModal: (val) => setOpenTransactionModal(val),
          transactionDetails: {
            transactionLoading: transactionLoading,
            hash: transactionDetails.hash,
            status: transactionDetails.status,
          },
        }}
        errorModalOptions={{
          openErrorModal: openErrorModal,
          setOpenErrorModal: (val) => setOpenErrorModal(val),
        }}
        type={modalType}
      />
    </>
  )
}

export default ProtectCard
