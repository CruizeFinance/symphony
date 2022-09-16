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
`

const Protect = () => {
  return (
      <Container>
        <GraphArea />
        <ProtectCard />
      </Container>
  )
}

export default Protect
