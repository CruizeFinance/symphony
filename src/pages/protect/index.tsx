import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import ProtectCard from './ProtectCard'
import { getOffset, rem } from '../../utils'
import HowItWorks from './HowItWorks'
import { useEffect } from 'react'

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
  /*
   * an effect to set a padding bottom on the container for card stacking effect
   */
  useEffect(() => {
    const firstCard = document.getElementById('how-it-works-1')
    const lastCard = document.getElementById('how-it-works-3')
    const container = document.getElementById('protect-container')

    container!.style.paddingBottom = rem(
      Math.abs(
        firstCard!.offsetTop -
          lastCard!.offsetTop +
          (firstCard!.offsetHeight + lastCard!.offsetHeight),
      ) + 'px',
    )
  }, [])

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
