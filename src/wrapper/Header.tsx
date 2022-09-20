import { ConnectKitButton } from 'connectkit'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button, Select, Sprite, Typography } from '../components'
import { Modal } from '../components'
import STYLES from '../style/styles.json'
import { useAccount, useDisconnect } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { rem } from '../utils'
import { useOutsideAlerter } from '../hooks'

interface DropdownProps {
  dropdownWidth?: number
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
const ConnectedButton = styled.div`
  background: ${STYLES.palette.colors.assetBackground};
  padding: ${rem(8)} ${rem(16)};
  border-radius: ${rem(100)};
  display: flex;
  align-items: center;
  gap: ${rem(10)};
  cursor: pointer;
  filter: brightness(70%);
  line-height: 20px;
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
const Page = styled.label`
  font-family: ${STYLES.typography.fonts.semiBold};
  color: ${STYLES.palette.colors.white};
  font-size: ${rem(20)};
  cursor: default;
  text-transform: capitalize;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
const ModalContent = styled(LogoArea)`
  justify-content: center;
  flex-direction: column;
  gap: ${rem(10)};
`
const DropdownArea = styled.div`
  position: relative;
`
const HeaderDropdown = styled.div<DropdownProps>`
  position: absolute;
  right: 0;
  background: ${STYLES.palette.colors.black};
  border: 1px solid ${STYLES.palette.colors.dividerStroke};
  border-radius: ${rem(8)};
  padding: ${rem(8)};
  width: ${(props) => rem(props.dropdownWidth || 300)};
  display: flex;
  flex-direction: column;
  gap: ${rem(8)};
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);
`
const Section = styled.div`
  border-radius: ${rem(4)};
  background: ${STYLES.palette.colors.notificationBackground};
  display: flex;
  align-items: flex-start;
  gap: ${rem(8)};
  padding: ${rem(4)};
  width: 100%;
`
const DropdownContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${rem(8)};
  width: 100%;
`
const DropdownLabel = styled(DropdownContent)`
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
  const [showButtonDropdown, setShowButtonDropdown] = useState(false)

  const notificationRef = useRef(null)
  // commenting to fix the logic
  // useOutsideAlerter(notificationRef, () => setShowNotification(false))
  const { connector, address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
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
          {isConnected ? (
            <>
              <DropdownArea>
                <Sprite
                  id="notifications-icon"
                  width={42}
                  height={42}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowNotification(!showNotification)}
                />
                {showNotification ? (
                  <HeaderDropdown ref={notificationRef}>
                    <Typography
                      fontFamily="bold"
                      style={{ filter: 'brightness(60%)' }}
                    >
                      Recent Orders
                    </Typography>
                    <Section>
                      <Sprite id="protect-icon" width={16} height={16} />
                      <DropdownContent>
                        <DropdownLabel>
                          <Typography
                            fontFamily="medium"
                            style={{ fontSize: rem(14) }}
                          >
                            Protect ETH
                          </Typography>
                          <Typography
                            fontFamily="medium"
                            style={{ fontSize: rem(14) }}
                          >
                            2345 ETH
                          </Typography>
                        </DropdownLabel>
                        <DropdownLabel>
                          <Typography
                            fontFamily="medium"
                            style={{
                              fontSize: rem(10),
                              filter: 'brightness(80%)',
                            }}
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
                        </DropdownLabel>
                      </DropdownContent>
                    </Section>
                    <Section>
                      <Sprite id="withdraw-icon" width={16} height={16} />
                      <DropdownContent>
                        <DropdownLabel>
                          <Typography
                            fontFamily="medium"
                            style={{ fontSize: rem(14) }}
                          >
                            Withdraw ETH
                          </Typography>
                          <Typography
                            fontFamily="medium"
                            style={{ fontSize: rem(14) }}
                          >
                            2345 ETH
                          </Typography>
                        </DropdownLabel>
                        <DropdownLabel>
                          <Typography
                            fontFamily="medium"
                            style={{
                              fontSize: rem(10),
                              filter: 'brightness(80%)',
                            }}
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
                        </DropdownLabel>
                      </DropdownContent>
                    </Section>
                  </HeaderDropdown>
                ) : null}
              </DropdownArea>
              <Select
                onChange={(val) => console.log(val)}
                options={[{ label: 'Ethereum', icon: 'eth-asset-icon' }]}
                pickerStyle={{
                  padding: `${rem(8)} ${rem(16)}`,
                  filter: 'brightness(70%)',
                  iconHeight: 20,
                  iconWidth: 20,
                }}
                labelStyle={{ fontSize: 16 }}
              />
            </>
          ) : null}
          {isConnected ? (
            <DropdownArea>
              <ConnectedButton
                onClick={() => setShowButtonDropdown(!showButtonDropdown)}
              >
                <Typography>
                  {address?.slice(0, 7)}...{address?.slice(-7)}
                </Typography>
                <Sprite
                  id="chevron-down"
                  width={12}
                  height={12}
                  {...(showButtonDropdown
                    ? { style: { transform: 'rotate(180deg)' } }
                    : undefined)}
                />
              </ConnectedButton>
              {showButtonDropdown ? (
                <HeaderDropdown style={{ gap: rem(2) }} dropdownWidth={250}>
                  <Section>
                    <DropdownContent>
                      <DropdownLabel>
                        <Typography fontFamily="medium">
                          {address?.slice(0, 8)}...{address?.slice(-4)}
                        </Typography>
                      </DropdownLabel>
                      <DropdownLabel>
                        <Typography
                          style={{
                            fontSize: rem(14),
                            filter: 'brightness(80%)',
                          }}
                        >
                          Connected with {connector?.name}
                        </Typography>
                        <Sprite
                          id={`${connector?.id?.toLowerCase()}-icon`}
                          width={16}
                          height={16}
                        />
                      </DropdownLabel>
                    </DropdownContent>
                  </Section>
                  <Section>
                    <DropdownContent>
                      <DropdownLabel>
                        <Typography fontFamily="medium">
                          Copy Address
                        </Typography>
                        <Sprite
                          id="copy-icon"
                          width={16}
                          height={16}
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            navigator.clipboard.writeText(address || '')
                          }
                        />
                      </DropdownLabel>
                      <DropdownLabel>
                        <Typography
                          style={{
                            fontSize: rem(14),
                            filter: 'brightness(80%)',
                          }}
                        >
                          View on Etherscan
                        </Typography>
                        <Typography
                          tag="a"
                          openInNewTab={true}
                          href="https://goerli.etherscan.io/address/0x671b4709Be7aF1626d033B3e82A508789a5b9B0f#code"
                        >
                          <Sprite id="redirect-icon" width={16} height={16} />
                        </Typography>
                      </DropdownLabel>
                      <Button
                        onClick={() => disconnect()}
                        borderRadius={10}
                        style={{ width: '100%' }}
                      >
                        Disconnect
                        <Sprite id="disconnect-icon" width={16} height={16} />
                      </Button>
                    </DropdownContent>
                  </Section>
                </HeaderDropdown>
              ) : null}
            </DropdownArea>
          ) : (
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <Button onClick={show}>
                    <Sprite id="connect-wallet-black" width={20} height={20} />
                    Connect
                  </Button>
                )
              }}
            </ConnectKitButton.Custom>
          )}
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
