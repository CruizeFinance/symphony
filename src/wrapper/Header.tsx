import { ConnectKitButton } from 'connectkit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Select, Sprite, Typography } from '../components'
import { Modal } from '../components'
import STYLES from '../style/styles.json'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { vw } from '../utils'

const Container = styled.div`
  position: fixed;
  padding: ${vw(30)} ${vw(60)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: -webkit-fill-available;
  backdrop-filter: blur(${vw(8)});
  z-index: 9999;

  @media only screen and (max-width: 500px) {
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

  @media only screen and (max-width: 500px) {
    display: none;
  }
`
const Page = styled.label`
  font-family: ${STYLES.typography.fonts.semiBold};
  color: ${STYLES.palette.colors.white};
  font-size: ${vw(20)};
  cursor: default;
  text-transform: capitalize;

  @media only screen and (max-width: 500px) {
    display: none;
  }
`
const ModalContent = styled(LogoArea)`
  justify-content: center;
  flex-direction: column;
  gap: ${vw(10)};
`

const Hamburger = styled.div`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
  }
`

interface HeaderProps {
  location?: string
}

const Header = ({ location }: HeaderProps) => {
  const [openConnectedModal, setOpenConnectedModal] = useState<boolean>(false)
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
          <Sprite id="notifications-icon" width={42} height={42} />
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
