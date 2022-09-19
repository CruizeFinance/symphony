import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import ProtectCard from './ProtectCard'
import GraphArea from './GraphArea'
import { vw } from '../../utils'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: ${vw(64)};
  color: ${STYLES.palette.colors.white};
  padding: ${vw(30)} ${vw(60)};

  @media only screen and (max-width: 1024px) {
    padding: ${vw(20)} ${vw(16)};
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
