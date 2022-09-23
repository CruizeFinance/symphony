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
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { useEffect, useState } from 'react'
import { rem } from '../../utils'
import {
  useAccount,
  useContract,
  useDeprecatedContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import abi from '../../abis/cruize_abi.json'
import { BigNumber, ethers } from 'ethers'
import { createPositionDyDx, depositToDyDx, getAssetPrice } from '../../apis'

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

const ProtectCard = () => {
  const [openTransactionDetails, setOpenTransactionDetails] = useState(false)
  const [openTutorialVideo, setOpenTutorialVideo] = useState(false)
  const [inputValue, setInputValue] = useState('0.0')
  const [assetPrice, setAssetPrice] = useState(0)
  const [tab, setTab] = useState('protect')
  const { isConnected, address } = useAccount()

  const { config: depositConfig } = usePrepareContractWrite({
    addressOrName: '0x8519D277273F6d07CA7DE0e2aBCD6C2E69485ecD',
    contractInterface: abi,
    functionName: 'depositTest',
    args: [
      ethers.utils.parseEther(inputValue),
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(inputValue),
      gasLimit: 1000000
    },
  })
  const { writeAsync: depositWriteAsync } = useDeprecatedContractWrite(
    depositConfig,
  )

  const { config: withdrawConfig } = usePrepareContractWrite({
    addressOrName: '0x8519D277273F6d07CA7DE0e2aBCD6C2E69485ecD',
    contractInterface: abi,
    functionName: 'withdrawTest',
    args: [
      ethers.utils.parseEther(inputValue),
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      (assetPrice * Math.pow(10, 6)).toString()
    ],
    overrides: {
      gasLimit: 1000000
    },
  })
  const { writeAsync: withdrawWriteAsync } = useDeprecatedContractWrite(
    withdrawConfig,
  )

  const handleTab = async () => {
    if (tab === 'withdraw') {
      const tx = await withdrawWriteAsync?.();
      const data = await tx.wait();
      if (data.status === 1) {
        const positionData = await createPositionDyDx('buy')
        console.log(positionData);
      }
    } else {
      const tx = await depositWriteAsync?.();
      const data = await tx.wait();
      if (data.status === 1) {
        const depositData = await depositToDyDx();
        console.log(depositData);
        const positionData = await createPositionDyDx('sell');
        console.log(positionData);
      }
    }
  }
  const setDefaultValues = () => {
    setOpenTransactionDetails(false)
    setInputValue('0.0')
  }
  const handleAssetChange = async (val: string) => {
    const data = await getAssetPrice(val)
    if (data.price) setAssetPrice(data.price)
  }

  useEffect(() => {
    setDefaultValues()
  }, [tab])

  useEffect(() => {
    handleAssetChange('ethereum')
  }, [])

  return (
    <>
      <ProtectArea>
        <Tabs
          onClick={(val) => setTab(val.toLowerCase())}
          tabs={[{ label: 'Protect' }, { label: 'Withdraw' }]}
        />
        {tab === 'withdraw' ? (
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
        ) : null}
        <Input
          label="AMOUNT"
          inputValue={inputValue}
          onInputChange={(val) => setInputValue(val || '0.0')}
          onAssetChange={(val) => handleAssetChange(val)}
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
              3000 USDC
            </Typography>
          </Detail>
          <Detail>
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
          </Detail>
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
              3000 USDC
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
              <Typography fontFamily="bold">0.10040784ETH ($164.93)</Typography>
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
                0.0015678 ETH
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
                'https://www.cruize.org',
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
    </>
  )
}

export default ProtectCard
