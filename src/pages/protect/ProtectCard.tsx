import Tabs from '../../components/tabs'
import {
  Button,
  Collapsible,
  Divider,
  Input,
  Modal,
  Sprite,
  Tooltip,
  Typography,
} from '../../components'
import styled, { keyframes } from 'styled-components'
import STYLES from '../../style/styles.json'
import { useContext, useEffect, useState } from 'react'
import { rem } from '../../utils'
import {
  chain,
  useAccount,
  useDeprecatedContractWrite,
  useFeeData,
  usePrepareContractWrite,
} from 'wagmi'
import testnet_abi from '../../abis/testnet_cruize_abi.json'
import { ethers } from 'ethers'
import { createPositionDyDx, depositToDyDx, storeTransaction } from '../../apis'
import { AppContext } from '../../context'
import { useNavigate } from 'react-router-dom'

const ProtectArea = styled.div`
  background: ${STYLES.palette.colors.cardBackground};
  padding: ${rem(24)} ${rem(20)};
  border-radius: ${rem(8)};
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
const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const Loader = styled.div`
  display: inline-block;
  width: ${rem(40)};
  height: ${rem(40)};
  border: ${rem(3)} solid ${STYLES.palette.colors.white};
  border-radius: 50%;
  border-top-color: ${STYLES.palette.colors.loaderColor};
  animation: ${loading} 1s linear infinite;
`

const ProtectCard = () => {
  const navigate = useNavigate()
  const [openTransactionDetails, setOpenTransactionDetails] = useState(false)
  const [openTutorialVideo, setOpenTutorialVideo] = useState(false)
  const [inputValue, setInputValue] = useState('0.0')
  const [tab, setTab] = useState('protect')
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<{
    hash: string
    status: number
  }>({ hash: '', status: 0 })
  const { isConnected, address } = useAccount()

  const [state] = useContext(AppContext)

  const { data: gasData } = useFeeData({
    chainId: chain.goerli.id,
    formatUnits: 'ether',
    watch: true,
  })

  const { config: depositConfig } = usePrepareContractWrite({
    addressOrName: '0xCB7d7264b70aE89a65F9ee660Fe5c5BAB0Ab4f3c',
    contractInterface: testnet_abi,
    functionName: 'depositTest',
    args: [
      ethers.utils.parseEther(inputValue),
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(inputValue),
      gasLimit: 1000000,
    },
  })
  const { writeAsync: depositWriteAsync } = useDeprecatedContractWrite(
    depositConfig,
  )

  const { config: withdrawConfig } = usePrepareContractWrite({
    addressOrName: '0xCB7d7264b70aE89a65F9ee660Fe5c5BAB0Ab4f3c',
    contractInterface: testnet_abi,
    functionName: 'withdrawTest',
    args: [
      ethers.utils.parseEther(inputValue),
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      (state.assetPrice * Math.pow(10, 6)).toFixed(0),
    ],
    overrides: {
      gasLimit: 1000000,
    },
  })
  const { writeAsync: withdrawWriteAsync } = useDeprecatedContractWrite(
    withdrawConfig,
  )

  const handleTab = async () => {
    setOpenTransactionModal(true)
    if (tab === 'withdraw') {
      try {
        setTransactionLoading(true)
        const tx = await withdrawWriteAsync?.()
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
        await storeTransaction(
          address ?? '',
          data.transactionHash,
          state.selectedAsset.label,
          inputValue,
          'Withdraw',
        )
        await createPositionDyDx('buy')
      } catch (e) {
        console.log(e)
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
    } else {
      try {
        setTransactionLoading(true)
        const tx = await depositWriteAsync?.()
        const data = await tx.wait()
        setTransactionLoading(false)
        setTransactionDetails({
          hash: data.transactionHash,
          status: data.status || 0,
        })
        const timer = setTimeout(() => {
          setTransactionDetails({
            hash: '',
            status: 0,
          })
          setOpenTransactionModal(false)
          clearTimeout(timer)
        }, 1500)
        await storeTransaction(
          address ?? '',
          data.transactionHash,
          state.selectedAsset.label,
          inputValue,
          'Protect',
        )
        await depositToDyDx()
        await createPositionDyDx('sell')
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
  }
  const setDefaultValues = () => {
    setOpenTransactionDetails(false)
    setInputValue('0.0')
  }

  useEffect(() => {
    setDefaultValues()
  }, [tab])

  return (
    <>
      <ProtectArea>
        <Tabs
          onClick={(val) => setTab(val.toLowerCase())}
          tabs={[{ label: 'Protect' }, { label: 'Withdraw' }]}
        />
        {/* hidden for demo */}
        {/* {tab === 'withdraw' ? (
          <Tabs
            onClick={(val) => console.log(val)}
            tabs={[
              {
                label: 'Standard',
                icon: (
                  <Tooltip content={'test'}>
                    <Sprite id="info-icon" width={20} height={20} />
                  </Tooltip>
                ),
              },
              {
                label: 'Instant',
                icon: (
                  <Tooltip content={'test'}>
                    <Sprite id="info-icon" width={20} height={20} />
                  </Tooltip>
                ),
              },
            ]}
            type="contained"
          />
        ) : null} */}
        <Input
          label="AMOUNT"
          inputValue={inputValue}
          onInputChange={(val) => setInputValue(val || '0.0')}
          showBalance={tab === 'protect'}
          onMaxClick={(val) => setInputValue(val)}
        />
        <DetailArea>
          <Typography
            style={{ width: '100%', textAlign: 'left', marginBottom: rem(8) }}
          >
            Protection Details
          </Typography>
          <Detail>
            <Typography
              fontFamily="regular"
              color={STYLES.palette.colors.white60}
            >
              Price floor
              <Tooltip content={'test'}>
                <Sprite id="info-icon" width={20} height={20} />
              </Tooltip>
            </Typography>
            <Typography
              fontFamily="regular"
              color={STYLES.palette.colors.white60}
            >
              {state.priceFloor.toFixed(2)} USDC
            </Typography>
          </Detail>
          {/* hidden for demo */}
          {/* <Detail>
            <Typography
              fontFamily="regular"
              color={STYLES.palette.colors.white60}
            >
              Staking Price Limit
              <Sprite id="info-icon" width={20} height={20} />
            </Typography>
            <Typography
              fontFamily="regular"
              color={STYLES.palette.colors.white60}
            >
              3000 USDC
            </Typography>
          </Detail> */}
          <Detail>
            <Typography
              fontFamily="regular"
              color={STYLES.palette.colors.white60}
            >
              APY
              <Sprite id="info-icon" width={20} height={20} />
            </Typography>
            <Typography
              fontFamily="regular"
              color={STYLES.palette.colors.white60}
            >
              {((((0.9 * (Number(inputValue) * state.assetPrice) * 0.0102) -
                (0.25 * (Number(inputValue) * (state.assetPrice - 100)) * 0.0222))/(Number(inputValue) * state.assetPrice) * 100) || 0).toFixed(3)}{' '}
              %
            </Typography>
          </Detail>
        </DetailArea>
        <Divider
          labelOptions={{
            label: 'Transaction Details',
            labelAlign: 'center',
            dropdown: true,
            dropdownOpen: openTransactionDetails,
          }}
          onClick={() => setOpenTransactionDetails(!openTransactionDetails)}
        />
        <Collapsible open={openTransactionDetails}>
          <DetailArea>
            <Detail>
              <Typography fontFamily="bold">
                Total
                <Sprite id="info-icon" width={20} height={20} />
              </Typography>
              <Typography fontFamily="bold">
                {(
                  Number(inputValue) + Number(gasData?.formatted.gasPrice)
                ).toFixed(8) || 0}{' '}
                ETH
              </Typography>
            </Detail>
            <Detail>
              <Typography
                fontFamily="regular"
                color={STYLES.palette.colors.white60}
              >
                Gas fee
                <Tooltip content={'test'}>
                  <Sprite id="info-icon" width={20} height={20} />
                </Tooltip>
              </Typography>
              <Typography
                fontFamily="regular"
                color={STYLES.palette.colors.white60}
              >
                {gasData?.formatted.gasPrice || '-'} ETH
              </Typography>
            </Detail>
          </DetailArea>
        </Collapsible>
        <Button
          buttonType="protect"
          onClick={handleTab}
          disabled={!isConnected}
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
        <img src="confused.gif" alt="confused-gif" width={'100%'} />
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
        <Button borderRadius={8} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Modal>
    </>
  )
}

export default ProtectCard
