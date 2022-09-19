import { ConnectKitButton } from 'connectkit'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button, Select, Sprite, Typography } from '../components'
import { Modal } from '../components'
import STYLES from '../style/styles.json'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { vw } from '../utils'
import { useOutsideAlerter } from '../hooks'

const Container = styled.div`
  position: fixed;
  padding: ${vw(30)} ${vw(60)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: -webkit-fill-available;
  backdrop-filter: blur(${vw(8)});
  z-index: 9999;

  @media only screen and (max-width: 1024px) {
    padding: ${vw(16)};
  }
`
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(36)};
`
const DesktopArea = styled(LogoArea)`
  gap: ${vw(10)};

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
const Page = styled.label`
  font-family: ${STYLES.typography.fonts.semiBold};
  color: ${STYLES.palette.colors.white};
  font-size: ${vw(20)};
  cursor: default;
  text-transform: capitalize;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
const ModalContent = styled(LogoArea)`
  justify-content: center;
  flex-direction: column;
  gap: ${vw(10)};
`
const NotificationArea = styled.div`
  position: relative;
`
const NotificationDropdown = styled.div`
  position: absolute;
  right: 0;
  background: ${STYLES.palette.colors.black};
  border: 1px solid ${STYLES.palette.colors.dividerStroke};
  border-radius: ${vw(8)};
  padding: ${vw(8)};
  width: ${vw(300)};
  display: flex;
  flex-direction: column;
  gap: ${vw(8)};
  box-shadow: ${vw(0)} ${vw(4)} ${vw(20)} rgba(255, 255, 255, 0.2);
`
const Notification = styled.div`
  border-radius: ${vw(4)};
  background: ${STYLES.palette.colors.notificationBackground};
  display: flex;
  align-items: flex-start;
  gap: ${vw(8)};
  padding: ${vw(4)};
  width: 100%;
`
const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${vw(8)};
  width: 100%;
`
const NotificationLabel = styled(NotificationContent)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
const Hamburger = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;
  }
`

interface HeaderProps {
  location?: string
}

const Header = ({ location }: HeaderProps) => {
  const [openConnectedModal, setOpenConnectedModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const notificationRef = useRef(null)
  // commenting to fix the logic
  // useOutsideAlerter(notificationRef, () => setShowNotification(false))
  const { isConnected } = useAccount()
  const navigate = useNavigate()

  const hideModal = () => {
    const timeout = setTimeout(() => {
      setOpenConnectedModal(false)
      clearTimeout(timeout)
    }, 2000)
  }

  useEffect(() => {
    if (isConnected) {
      setOpenConnectedModal(true)
      hideModal()
    }
  }, [isConnected])

  return (
    <>
      <Container>
        <LogoArea>
          <Typography
            fontFamily="extraBold"
            tag="h1"
            color={STYLES.palette.colors.logoBlue}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            Cruize
          </Typography>
          {location ? <Page>{location}</Page> : null}
        </LogoArea>
        <DesktopArea>
          <NotificationArea>
            <Sprite
              id="notifications-icon"
              width={42}
              height={42}
              style={{ cursor: 'pointer' }}
              onClick={() => setShowNotification(!showNotification)}
            />
            {showNotification ? (
              <NotificationDropdown ref={notificationRef}>
                <Typography
                  fontFamily="bold"
                  style={{ filter: 'brightness(60%)' }}
                >
                  Recent Orders
                </Typography>
                <Notification>
                  <Sprite id="protect-icon" width={16} height={16} />
                  <NotificationContent>
                    <NotificationLabel>
                      <Typography
                        fontFamily="medium"
                        style={{ fontSize: vw(14) }}
                      >
                        Protect ETH
                      </Typography>
                      <Typography
                        fontFamily="medium"
                        style={{ fontSize: vw(14) }}
                      >
                        2345 ETH
                      </Typography>
                    </NotificationLabel>
                    <NotificationLabel>
                      <Typography
                        fontFamily="medium"
                        style={{ fontSize: vw(10) }}
                      >
                        View on etherscan
                      </Typography>
                      <Typography
                        tag="a"
                        openInNewTab={true}
                        href="https://goerli.etherscan.io/address/0x671b4709Be7aF1626d033B3e82A508789a5b9B0f#code"
                      >
                        <Sprite id="redirect-icon" width={12} height={12} />
                      </Typography>
                    </NotificationLabel>
                  </NotificationContent>
                </Notification>
                <Notification>
                  <Sprite id="withdraw-icon" width={16} height={16} />
                  <NotificationContent>
                    <NotificationLabel>
                      <Typography
                        fontFamily="medium"
                        style={{ fontSize: vw(14) }}
                      >
                        Withdraw ETH
                      </Typography>
                      <Typography
                        fontFamily="medium"
                        style={{ fontSize: vw(14) }}
                      >
                        2345 ETH
                      </Typography>
                    </NotificationLabel>
                    <NotificationLabel>
                      <Typography
                        fontFamily="medium"
                        style={{ fontSize: vw(10) }}
                      >
                        View on etherscan
                      </Typography>
                      <Typography
                        tag="a"
                        openInNewTab={true}
                        href="https://goerli.etherscan.io/address/0x671b4709Be7aF1626d033B3e82A508789a5b9B0f#code"
                      >
                        <Sprite id="redirect-icon" width={12} height={12} />
                      </Typography>
                    </NotificationLabel>
                  </NotificationContent>
                </Notification>
              </NotificationDropdown>
            ) : null}
          </NotificationArea>
          <Select
            onChange={(val) => console.log(val)}
            options={[{ label: 'Ethereum', icon: 'eth-asset-icon' }]}
            labelStyle={{ fontSize: 16 }}
          />
          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName }) => {
              return (
                <Button onClick={show}>
                  {isConnected ? (
                    ensName ?? truncatedAddress
                  ) : (
                    <>
                      <Sprite
                        id="connect-wallet-black"
                        width={20}
                        height={20}
                      />
                      Connect
                    </>
                  )}
                </Button>
              )
            }}
          </ConnectKitButton.Custom>
        </DesktopArea>
        <Hamburger onClick={() => console.log('test')}>
          <Sprite id="hamburger-icon" height={24} width={24} />
        </Hamburger>
      </Container>
      <Modal open={openConnectedModal}>
        <ModalContent>
          <Sprite id="wallet-connected-icon" width={120} height={120} />
          <Typography
            tag="label"
            fontFamily="medium"
            style={{ fontSize: vw(18) }}
          >
            Connected
          </Typography>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
