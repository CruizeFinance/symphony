import styled from 'styled-components'
import { Button, Sprite } from '../components'
import STYLES from '../style/styles.json'

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
  gap: 10px;
`
const Logo = styled.label`
  font-family: ${STYLES.typography.fonts.extraBold};
  color: ${STYLES.palette.colors.logoBlue};
  font-size: 32px;
  cursor: default;
`
const FakeDiv = styled(Container)`
  position: static;
  height: 120px;
  padding: 0px;
`

const Header = () => {
  return (
    <>
      <Container>
        <LogoArea>
          <Logo>Cruize</Logo>
        </LogoArea>
        <Button>
          <Sprite id="connect-wallet" width={20} height={20} />
          Connect
        </Button>
      </Container>
      <FakeDiv />
    </>
  )
}

export default Header
