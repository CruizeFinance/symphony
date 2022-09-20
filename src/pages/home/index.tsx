import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Sprite, Typography } from '../../components'
import { rem } from '../../utils'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${rem(40)};

  @media only screen and (max-width: 1024px) {
    padding: ${rem(20)} ${rem(16)};
  }
`
const InfoArea = styled(Container)`
  gap: ${rem(10)};

  @media only screen and (max-width: 1024px) {
    text-align: center;
  }
`

const Home = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Sprite id="homepage-computer-image" width={312} height={261} />
      <InfoArea>
        <Typography tag="h1" fontFamily="bold">
          Protect and earn from your assets
        </Typography>
        <Typography
          tag="p"
          fontFamily="regular"
          style={{ filter: 'brightness(60%)' }}
        >
          Save your assets from market volatility
        </Typography>
        <Button borderRadius={10} onClick={() => navigate('/protect')}>
          Protect your crypto
          <Sprite id="top-right-arrow" width={20} height={20} />
        </Button>
      </InfoArea>
    </Container>
  )
}

export default Home
