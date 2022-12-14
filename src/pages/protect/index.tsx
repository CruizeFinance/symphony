import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import ProtectCard from './protectcard'
import { rem } from '../../utils'
import HowItWorks from './HowItWorks'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: ${rem(64)};
  color: ${STYLES.palette.colors.white};
  padding: ${rem(30)} ${rem(66)};
  width: 100%;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(20)} ${rem(16)};
  }
`
const ProtectArea = styled.div`
  display: block;
  max-width: ${rem(456)};
  position: sticky;
  top: ${rem(180)};
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
