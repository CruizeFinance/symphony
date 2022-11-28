import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import ProtectCard from './protectcard'
import { rem } from '../../utils'
import HowItWorks from './HowItWorks'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

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
  top: ${rem(120)};
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

/*
 * Protect page of the dApp
 * This is where the protection and withdrawals happen
 */
const Protect = () => {
  //context hook
  const [state] = useContext(AppContext)

  //web3 hook
  const { isConnected } = useAccount()

  // react router dom hook
  const navigate = useNavigate()

  /*
   * an effect to perform action after confirming whether the user is holder of the CRUIZE PRIVATE BETA PASS
   */
  useEffect(() => {
    if (!isConnected || !state.isHolder) {
      navigate('/')
    }
  }, [isConnected, state.isHolder])

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
