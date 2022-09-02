import { ConnectKitButton } from 'connectkit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Sprite, Typography } from '../components'
import Modal from '../components/modal'
import STYLES from '../style/styles.json'
import { useAccount } from 'wagmi'

const Container = styled.div`
  position: fixed;
  padding: 30px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: -webkit-fill-available;
  background-filter: blur(5px);
`
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`
const Logo = styled.label`
  font-family: ${STYLES.typography.fonts.extraBold};
  color: ${STYLES.palette.colors.logoBlue};
  font-size: 32px;
  cursor: default;
`
const Page = styled.label`
  font-family: ${STYLES.typography.fonts.semiBold};
  color: ${STYLES.palette.colors.white};
  font-size: 20px;
  cursor: default;
  text-transform: capitalize;
`
const FakeDiv = styled(Container)`
  position: static;
  height: 120px;
  padding: 0px;
`
const ModalContent = styled(LogoArea)`
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`

interface HeaderProps {
  location?: string
}

const Header = ({ location }: HeaderProps) => {
  const [openConnectedModal, setOpenConnectedModal] = useState<boolean>(false)
  const { isConnected } = useAccount();

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
          <Logo>Cruize</Logo>
          {location ? <Page>{location}</Page> : null}
        </LogoArea>

        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => {
            return (
              <Button onClick={show}>
                {isConnected ? (
                  ensName ?? truncatedAddress
                ) : (
                  <>
                    <Sprite id="connect-wallet-black" width={20} height={20} />
                    Connect
                  </>
                )}
              </Button>
            )
          }}
        </ConnectKitButton.Custom>
      </Container>
      <FakeDiv />
      <Modal open={openConnectedModal}>
        <ModalContent>
          <Sprite id="wallet-connected-icon" width={120} height={120} />
          <Typography
            tag="label"
            fontFamily="medium"
            style={{ fontSize: '18px' }}
          >
            Connected
          </Typography>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
