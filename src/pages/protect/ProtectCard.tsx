import Tabs from '../../components/tabs'
import { Button, Input, Sprite, Typography } from '../../components'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
  CONTRACTS_CONFIG,
  PRICE_FLOORS_RESPONSE_MAPPING,
  rem,
  GAS_LIMIT,
} from '../../utils'
import {
  chain,
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useDeprecatedContractWrite,
  useFeeData,
  usePrepareContractWrite,
} from 'wagmi'
import testnet_abi from '../../abis/testnet_cruize_abi.json'
import { BigNumber, constants, ethers } from 'ethers'
import { depositToDyDx, storeTransaction } from '../../apis'
import { AppContext } from '../../context'
import ProtectCardModals from './ProtectCardModals'
import { Actions } from '../../context/Action'
import ProtectCardConfirm from './ProtectCardConfirm'
import {
  ConnectWalletButton,
  DetailComponent,
  SwitchNetworkButton,
} from '../../common'

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

  @media only screen and (max-width: 1024px) {
    padding: ${rem(20)} ${rem(16)};
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

  // web3 hooks
  const { connector, isConnected, address } = useAccount()
  const { data: gasData } = useFeeData({
    chainId: state.chainId,
    formatUnits: 'ether',
    watch: true,
  })

  // object for fetching token contracts per chain
  const contractsConfig = CONTRACTS_CONFIG[state.chainId || chain.goerli.id]

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
  const [tokenApproved, setTokenApproved] = useState(false)
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

  // web3 hooks to interact with the contract
  /*
   * hook to prepare contract config for protecting or withdrawing
   */
  const { config: writeConfig } = usePrepareContractWrite({
    addressOrName: contractsConfig?.CRUIZE?.address || '',
    contractInterface: testnet_abi,
    functionName: state.tab === 'protect' ? 'deposit' : 'withdrawTest',
    args: [
      ethers.utils.parseUnits(
        inputValue || '0',
        contractsConfig[
          state.selectedAsset.label as keyof typeof contractsConfig
        ]?.decimals || '',
      ),
      contractsConfig[state.selectedAsset.label as keyof typeof contractsConfig]
        ?.address || '',
    ],
    overrides: {
      ...(state.tab === 'protect' && state.selectedAsset.label === 'ETH'
        ? {
            from: address,
            value: ethers.utils.parseEther(inputValue || '0'),
          }
        : undefined),
      gasLimit: GAS_LIMIT,
    },
  })

  /*
   * hook that returns a function to execute while writing the contract... either protect or withdraw
   */
  const { writeAsync } = useDeprecatedContractWrite(writeConfig)

  /*
   * hook to prepare config for taking token approval to deposit in the contract
   */
  const { config: approveConfig } = usePrepareContractWrite({
    addressOrName:
      contractsConfig[state.selectedAsset.label as keyof typeof contractsConfig]
        ?.address || '',
    contractInterface: erc20ABI,
    functionName: 'approve',
    args: [contractsConfig?.CRUIZE?.address || '', constants.MaxUint256],
  })

  /*
   * hook that returns a function to execute for token approval
   */
  const { writeAsync: approveAsync } = useDeprecatedContractWrite(approveConfig)

  /*
   * hook to return token allowance data
   */
  const { data: allowanceData, status: allowanceStatus } = useContractRead({
    addressOrName:
      contractsConfig[state.selectedAsset.label as keyof typeof contractsConfig]
        ?.address || '',
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [address, contractsConfig?.CRUIZE?.address || ''],
  })

  // balance hook for cruize wrapped assets
  const { data: cruizeBalanceData } = useBalance({
    addressOrName: address,
    token:
      contractsConfig[state.selectedAsset.label as keyof typeof contractsConfig]
        ?.cruizeAddress || '',
    watch: true,
  })

  /*
   * memoised data to check whether the token is approved or not
   */
  const allowed = useMemo(() => {
    if (state.selectedAsset.label === 'ETH') return true
    if (allowanceData) {
      return BigNumber.from(allowanceData).gt(BigNumber.from('0'))
    }
  }, [allowanceData, state.selectedAsset])

  /*
   * a function to display error in case of a mistype during protection or withdrawal
   */
  const setError = () => {
    return inputValue && parseFloat(inputValue) === 0
      ? 'Amount should be greater than 0.'
      : inputValue &&
        parseFloat(inputValue) >
          parseFloat(
            state.tab === 'protect'
              ? state.assetBalance
              : cruizeBalanceData?.formatted!,
          )
      ? 'Amount exceeds balance.'
      : state.tab === 'protect' && state.assetPrice < priceFloor
      ? 'Cannot protect. Asset price lower than the price floor.'
      : ''
  }

  /*
   * function to protect or withdraw the asset based on the user's choice
   * also enables token approval in case the asset is not approved for depositing in contract
   */
  const onButtonClick = async (type = 'interact') => {
    try {
      setModalType('transaction')
      // interacting with the contract
      const tx =
        type === 'interact' ? await writeAsync?.() : await approveAsync?.()
      if (type !== 'interact') setTokenApproved(true)
      setOpenTransactionModal(true)
      setTransactionLoading(true)
      setTransactionDetails({
        ...transactionDetails,
        hash: tx.hash,
      })
      // waiting on the transaction to retrieve the data
      const data = await tx.wait()
      setTransactionDetails({
        hash: data.transactionHash,
        status: data.status || 0,
      })
      setTransactionLoading(false)
      setOpenConfirmSection(false)
      // functions to execute after the transaction has been executed
      // store the record for type of transaction in the DB
      if (type === 'interact')
        await storeTransaction(
          address ?? '',
          data.transactionHash,
          state.selectedAsset.label,
          inputValue || '0',
          state.tab === 'withdraw' ? 'Withdraw' : 'Protect',
        )
      // deposit assets to dydx in case of protect
      if (type === 'interact' && state.tab === 'protect') await depositToDyDx()
    } catch (e) {
      console.log(e)
      resetTransactionDetails()
      setTokenApproved(false)
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
   * an effect to call the set default values function
   */
  useEffect(() => {
    setInputValue('')
  }, [state.tab, state.selectedAsset])

  /*
   * an effect to set token approval based on memoised data
   */
  useEffect(() => {
    setTokenApproved(!!allowed)
  }, [allowed])

  return (
    <>
      <ProtectArea>
        <Tabs
          onClick={(val) =>
            dispatch({ type: Actions.STORE_TAB, payload: val.toLowerCase() })
          }
          tabs={[{ label: 'Protect' }, { label: 'Withdraw' }]}
        />
        <Input
          label="AMOUNT"
          inputValue={inputValue}
          onInputChange={(val) => setInputValue(val)}
          onMaxClick={(val) => setInputValue(val)}
          // error shown if the input value is 0 or the input value exceeds the user asset's balance
          error={setError()}
          cruizeBalanceData={cruizeBalanceData?.formatted}
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
          style={{ alignItems: 'flex-start' }}
        />
        <DetailArea>
          <Typography
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
              <Sprite id="gas-icon" width={16} height={16} />
              <Typography tag="span" color={STYLES.palette.colors.white60}>
                $
                {(
                  Number(gasData?.formatted.gasPrice || 0) * state.ethPrice
                ).toFixed(10) || '-'}
              </Typography>
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
                : !(allowed || tokenApproved)
                ? () => onButtonClick('approve')
                : () => setOpenConfirmSection(true)
            }
            disabled={
              setError() !== '' ||
              !inputValue ||
              allowanceStatus === 'loading' ||
              !state.supportedChains.includes(state.chainId)
            }
            borderRadius={32}
          >
            {allowanceStatus === 'loading'
              ? 'Please wait...'
              : !(allowed || tokenApproved)
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
          Need to add GoerliETH to your wallet?&nbsp;
          <Typography
            tag="a"
            color={STYLES.palette.colors.linkBlue}
            href="https://faucetlink.to/goerli"
            openInNewTab={true}
<<<<<<< HEAD
            style={{
              fontSize: rem(14),
              lineHeight: '16.48px',
              cursor: 'pointer',
            }}
=======
>>>>>>> 8dd2d64 ([TESTNET-52] Enabling an option to redirect user to Goerli faucet)
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
          onConfirm={() => onButtonClick('interact')}
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
