import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import ProtectCard from './ProtectCard'
import { rem } from '../../utils'
import HowItWorks from './HowItWorks'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: ${rem(64)};
  color: ${STYLES.palette.colors.white};
  padding: ${rem(30)} ${rem(60)};
  width: 100%;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(20)} ${rem(16)};
  }
`
const ProtectArea = styled.div`
  display: block;
  position: sticky;
  top: ${rem(120)};
  max-width: ${rem(456)};
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

/*
 * Protect page of the dApp
 * This is where the protection and withdrawals happen
 */
const Protect = () => {

  return (
    <Container id="protect-container">
      <HowItWorks />
      <ProtectArea>
        <ProtectCard />
      </ProtectArea>
    </Container>
  )
}

export default Protect
