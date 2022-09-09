import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import ProtectCard from './ProtectCard'
import GraphArea from './GraphArea'

const ProtectPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 64px;
  color: ${STYLES.palette.colors.white};
  padding: 30px 60px;
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
