import Tabs from '../../components/tabs'
import {
  Button,
  Input,
  Loader,
  Modal,
  Sprite,
  Tooltip,
  Typography,
} from '../../components'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { useContext, useEffect, useState } from 'react'
import {
  APP_CONFIG,
  APYS_RESPONSE_MAPPING,
  PRICE_FLOORS_RESPONSE_MAPPING,
  rem,
} from '../../utils'
import {
  chain,
  useAccount,
  useDeprecatedContractWrite,
  useFeeData,
  usePrepareContractWrite,
} from 'wagmi'
import testnet_abi from '../../abis/testnet_cruize_abi.json'
import { ethers } from 'ethers'
import { depositToDyDx, storeTransaction } from '../../apis'
import { AppContext } from '../../context'

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
const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  p {
    display: flex;
    align-items: center;
    gap: ${rem(4)};
  }
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: ${rem(8)};
`

// props that can be passed to the detail component
interface DetailComponentProps {
  label: string
  value: React.ReactNode
  tooltipContent?: string
}

/*
 * Pure component created to display the protection details
 */
const DetailComponent = ({
  label,
  value,
  tooltipContent,
}: DetailComponentProps) => (
  <Detail>
    <Typography fontFamily="regular" color={STYLES.palette.colors.white60}>
      {label}
      {tooltipContent ? (
        <Tooltip content={tooltipContent}>
          <Sprite id="info-icon" width={20} height={20} />
        </Tooltip>
      ) : null}
    </Typography>
    <Typography fontFamily="regular" color={STYLES.palette.colors.white60}>
      {value}
    </Typography>
  </Detail>
)

/*
 * Protect Card
 * Created to carry out protection and withdrawal functionalities
 * This is where the users are expected to interact the most
 */
const ProtectCard = () => {
  // context
  const [state] = useContext(AppContext)

  // web3 hooks
  const { isConnected, address } = useAccount()
  const { data: gasData } = useFeeData({
    chainId: state.chainId,
    formatUnits: 'ether',
    watch: true,
  })

  // state hooks
  const [priceFloor, setPriceFloor] = useState(0)
  const [openTutorialVideo, setOpenTutorialVideo] = useState(false)
  const [inputValue, setInputValue] = useState('0.0')
  const [tab, setTab] = useState('protect')
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<{
    hash: string
    status: number
  }>({ hash: '', status: 0 })

  // web3 hooks to interact with the contract
  const { config: depositConfig } = usePrepareContractWrite({
    addressOrName: APP_CONFIG[state.chainId]?.CRUIZE_CONTRACT || '',
    contractInterface: testnet_abi,
    functionName: tab === 'protect' ? 'depositTest' : 'withdrawTest',
    args: [
      ethers.utils.parseEther(inputValue),
      APP_CONFIG[state.chainId]?.ETH_CONTRACT_ADDRESS,
    ],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(inputValue),
      gasLimit: 1000000,
    },
  })
  const { writeAsync } = useDeprecatedContractWrite(depositConfig)

  /*
   * function to protect or withdraw the asset based on the user's choice
   */
  const onButtonClick = async () => {
    try {
      setOpenTransactionModal(true)
      setTransactionLoading(true)
      // interacting with the contract
      const tx = await writeAsync?.()
      // waiting on the transaction to retrieve the data
      const data = await tx.wait()
      setTransactionDetails({
        hash: data.transactionHash,
        status: data.status || 0,
      })
      setTransactionLoading(false)
      const timer = setTimeout(() => {
        setTransactionDetails({
          hash: '',
          status: 0,
        })
        setOpenTransactionModal(false)
        clearTimeout(timer)
      }, 1500)
      // functions to execute after the transaction has been executed
      // store the record for type of transaction in the DB
      await storeTransaction(
        address ?? '',
        data.transactionHash,
        state.selectedAsset.label,
        inputValue,
        tab === 'withdraw' ? 'Withdraw' : 'Protect',
      )
      // deposit assets to dydx in case of protect
      if (tab === 'protect') await depositToDyDx()
    } catch (e) {
      setTransactionDetails({
        hash: '',
        status: 0,
      })
      setTransactionLoading(false)
      const timer = setTimeout(() => {
        setOpenTransactionModal(false)
        clearTimeout(timer)
      }, 1500)
    }
  }

  /*
   * a default value setter function
   * written to set the input values back to 0 and close the transaction details on tab change
   */
  const setDefaultValues = () => {
    setInputValue('0.0')
  }

  /*
   * an effect to call the set default values function
   */
  useEffect(() => {
    setDefaultValues()
  }, [tab])

  /*
   * effect to set a local price floor state instead of rewriting the same code multiple times
   */
  useEffect(() => {
    setPriceFloor(
      state.priceFloors[
        PRICE_FLOORS_RESPONSE_MAPPING[
          state.selectedAsset
            .label as keyof typeof PRICE_FLOORS_RESPONSE_MAPPING
        ] as keyof typeof state.priceFloors
      ],
    )
  }, [state.selectedAsset, state.priceFloors])

  return (
    <>
      <ProtectArea>
        <Tabs
          onClick={(val) => setTab(val.toLowerCase())}
          tabs={[{ label: 'Protect' }, { label: 'Withdraw' }]}
        />
        <Input
          label="AMOUNT"
          inputValue={inputValue}
          onInputChange={(val) => setInputValue(val || '0.0')}
          showBalance={tab === 'protect'}
          onMaxClick={(val) => setInputValue(val)}
          // error shown if the input value is 0 or the input value exceeds the user asset's balance
          error={
            parseFloat(inputValue) === 0
              ? 'Amount should be greater than 0'
              : tab === 'protect' &&
                parseFloat(inputValue) > parseFloat(state.assetBalance)
              ? 'Amount exceeds balance'
              : ''
          }
        />
        <DetailComponent
          label="You will receive"
          value={`${inputValue} cr${state.selectedAsset.label}`}
        />
        <DetailArea>
          <Typography
            style={{ width: '100%', textAlign: 'left', marginBottom: rem(8) }}
          >
            Protection Details
          </Typography>
          <DetailComponent
            label="Price Floor"
            value={`${priceFloor || '-'} USDC`}
          />
          <DetailComponent
            label="APY"
            value={`${
              state.apys[
                APYS_RESPONSE_MAPPING[
                  state.selectedAsset
                    .label as keyof typeof APYS_RESPONSE_MAPPING
                ] as keyof typeof state.apys
              ]?.toFixed(8) || '-'
            } %`}
          />
        </DetailArea>
        <DetailComponent
          label={`1 cr${state.selectedAsset.label} = ${
            priceFloor > state.assetPrice
              ? priceFloor.toFixed(4)
              : state.assetPrice.toFixed(4) || '-'
          } USDC`}
          value={
            <>
              <Sprite id="gas-icon" width={16} height={16} />
              <Typography tag="span" color={STYLES.palette.colors.white60}>
                $
                {(
                  Number(gasData?.formatted.gasPrice || 0) * state.ethPrice
                ).toFixed(9) || '-'}
              </Typography>
            </>
          }
        />
        <Button
          buttonType="protect"
          onClick={onButtonClick}
          disabled={!isConnected}
          borderRadius={32}
        >
          {isConnected ? (
            <>{tab === 'protect' ? 'Protect' : 'Withdraw'}</>
          ) : (
            <>
              Connect Wallet
              <Sprite id="connect-wallet-black" width={20} height={20} />
            </>
          )}
        </Button>
        <Typography tag="label">
          Need help?&nbsp;
          <Typography
            tag="label"
            color={STYLES.palette.colors.linkBlue}
            onClick={() => setOpenTutorialVideo(true)}
            style={{ cursor: 'pointer' }}
          >
            Learn from video tutorials/docs
          </Typography>
        </Typography>
      </ProtectArea>
      <Modal
        open={openTutorialVideo}
        hide={() => setOpenTutorialVideo(false)}
        modalContentStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: rem(24),
          maxWidth: rem(500),
          background: STYLES.palette.colors.notificationBackground,
        }}
      >
        <Typography tag="h2" fontFamily="extraBold">
          Need any help?
        </Typography>
        <Typography tag="h4" fontFamily="regular">
          To help you get started, we recorded a set of tutorials and a hand on
          guide that can be viewed on youtube.
        </Typography>
        <img src="assets/confused.gif" alt="confused-gif" width={'100%'} />
        <ButtonContainer>
          <Button
            buttonType="protect-small"
            borderRadius={100}
            style={{ width: 'auto', padding: rem(16) }}
            onClick={() =>
              window.open(
                'https://docs.cruize.org',
                '_blank',
                'noopener noreferrer',
              )
            }
          >
            Tutorial
            <Sprite id="top-right-arrow" width={16} height={16} />
          </Button>
          <Button
            style={{
              background: STYLES.palette.colors.modalBackground,
              color: STYLES.palette.colors.white,
              filter: 'brightness(70%)',
              padding: rem(16),
              borderColor: STYLES.palette.colors.modalBackground,
            }}
            onClick={() => setOpenTutorialVideo(false)}
          >
            It's fine, I know stuff
          </Button>
        </ButtonContainer>
      </Modal>
      <Modal
        open={openTransactionModal}
        modalContentStyle={{
          padding: `${rem(36)} ${rem(40)}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: rem(24),
        }}
      >
        {transactionLoading ? (
          <Loader />
        ) : (
          <Sprite
            id={
              transactionDetails.status === 1
                ? 'green-check-icon'
                : 'red-cross-icon'
            }
            width={40}
            height={40}
          />
        )}
        <Typography fontFamily="extraBold" style={{ fontSize: rem(20) }}>
          {transactionLoading
            ? 'Transaction Pending'
            : tab === 'protect'
            ? transactionDetails.status === 1
              ? 'Deposit Successful'
              : 'Deposit Failed'
            : transactionDetails.status === 1
            ? 'Withdraw Successful'
            : 'Withdraw Failed'}
        </Typography>
        {transactionDetails.hash ? (
          <Typography
            style={{ display: 'flex', gap: rem(10) }}
            tag="a"
            href={`https://goerli.etherscan.io/tx/${transactionDetails.hash}`}
            openInNewTab={true}
            color={STYLES.palette.colors.linkBlue}
          >
            View on etherscan
            <Sprite id="redirect-icon" width={16} height={16} />
          </Typography>
        ) : null}
        <Button borderRadius={8} onClick={() => setOpenTransactionModal(false)}>
          Close
        </Button>
      </Modal>
    </>
  )
}

export default ProtectCard
