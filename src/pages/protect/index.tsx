import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import ProtectCard from './ProtectCard'
import GraphArea from './GraphArea'
import { rem } from '../../utils'

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
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

const Protect = () => {
  return (
    <Container>
      <GraphArea />
      <ProtectArea>
        <ProtectCard />
      </ProtectArea>
    </Container>
  )
}

export default Protect
