import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Sprite, Typography } from '../../components'
import { Modal } from '../../components'
import STYLES from '../../style/styles.json'
import { useAccount } from 'wagmi'
import { useLocation, useNavigate } from 'react-router-dom'
import { PAGE_LINKS, rem } from '../../utils'
import RecentOrdersDropdown from './RecentOrdersDropdown'
import NetworkDropdown from './NetworkDropdown'
import ConnectButtonDropdown from './ConnectButtonDropdown'

// mobile interface
interface MobileProps {
  open: boolean
}

const Container = styled.div`
  position: fixed;
  padding: ${rem(30)} ${rem(60)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: -webkit-fill-available;
  backdrop-filter: blur(${rem(8)});
  z-index: 9999;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(16)};
  }
`
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(36)};
`
const DesktopArea = styled(LogoArea)`
  gap: ${rem(10)};

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
export const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(36)};

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
export const MobileLinks = styled.div`
  display: none;
  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      width: 100%;
      padding: ${rem(20)};
      border-top: ${rem(1)} solid ${STYLES.palette.colors.dividerStroke};
    }
  }
`
const ModalContent = styled(LogoArea)`
  justify-content: center;
  flex-direction: column;
  gap: ${rem(10)};
`
const Hamburger = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;
    cursor: pointer;
  }
`
const MobileHeader = styled.div<MobileProps>`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: ${(props) => (props.open ? '80vh' : rem(0))};
  top: ${rem(64)};
  left: 0;
  background: ${STYLES.palette.colors.black};
  transition: height ease 0.7s;
  backdrop-filter: blur(${rem(8)});
  ${(props) => (props.open ? `z-index: 9999` : '')};
`
const MobileHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

/*
 * App Header
 * Fixed to the top
 * Enables wallet connection and navigation
 */
const Header = () => {
  //web3 hook
  const { isConnected } = useAccount()

  // react router dom hooks
  const navigate = useNavigate()
  const location = useLocation()

  // state hooks
  const [openConnectedModal, setOpenConnectedModal] = useState(false)
  const [openMobileHeader, setOpenMobileHeader] = useState(false)

  /*
   * a function to hide the connected modal after 2 seconds
   */
  const hideModal = () => {
    const timeout = setTimeout(() => {
      setOpenConnectedModal(false)
      clearTimeout(timeout)
    }, 2000)
  }

  /*
   * an effect to call the hide modal function
   */
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
          <Sprite id="cruize-beta-logo-icon" width={132} height={32} />
          {/* hidden for the beta release */}
          {/* <Typography
            fontFamily="extraBold"
            tag="h1"
            color={STYLES.palette.colors.logoBlue}\
          >
            Cruize
          </Typography> */}
          <DesktopLinks>
            {PAGE_LINKS.map((link, index) => (
              <Typography
                onClick={() => navigate(link.url)}
                key={`${link.label} - ${index}`}
                style={{ fontSize: '20px', cursor: 'pointer' }}
                color={
                  location.pathname === link.url
                    ? STYLES.palette.colors.white
                    : STYLES.palette.colors.white60
                }
              >
                {link.label}
              </Typography>
            ))}
          </DesktopLinks>
        </LogoArea>
        <DesktopArea>
          {isConnected ? (
            <>
              <RecentOrdersDropdown />
              <NetworkDropdown />
            </>
          ) : null}
          <ConnectButtonDropdown />
        </DesktopArea>
        <Hamburger onClick={() => setOpenMobileHeader(!openMobileHeader)}>
          <Sprite
            id={openMobileHeader ? 'close-icon' : 'hamburger-icon'}
            height={24}
            width={24}
          />
        </Hamburger>
        <MobileHeader open={openMobileHeader}>
          <MobileHeaderContent>
            <MobileLinks>
              {PAGE_LINKS.map((link, index) => (
                <Typography
                  onClick={() => {
                    navigate(link.url)
                    setOpenMobileHeader(!openMobileHeader)
                  }}
                  key={`${link.label} - ${index}`}
                  style={{ fontSize: '20px', cursor: 'pointer' }}
                  color={
                    location.pathname === link.url
                      ? STYLES.palette.colors.white
                      : STYLES.palette.colors.white60
                  }
                >
                  {link.label}
                </Typography>
              ))}
            </MobileLinks>
            {isConnected ? (
              <>
                <RecentOrdersDropdown />
                <NetworkDropdown />
              </>
            ) : null}
            <ConnectButtonDropdown />
          </MobileHeaderContent>
        </MobileHeader>
      </Container>
      <Modal open={openConnectedModal}>
        <ModalContent>
          <Sprite id="wallet-connected-icon" width={120} height={120} />
          <Typography
            tag="label"
            fontFamily="medium"
            style={{ fontSize: rem(18) }}
          >
            Connected
          </Typography>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
