import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Sprite, Typography } from '../../components'
import { rem } from '../../utils'
import STYLES from '../../style/styles.json'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${rem(20)};
  padding: ${rem(20)};
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(10)};

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`

/*
 * Not found page
 * Returns a default not found screen if the user lands on a route that is not defined
 * Enables options to go back or go to the home page
 */
const NotFound = () => {
  // react router dom hook
  const navigate = useNavigate()

  return (
    <Container>
      <Sprite id="error-icon" width={202} height={202} />
      <Typography tag="h1" fontFamily="bold">
        Page not found
      </Typography>
      <Typography
        tag="h2"
        fontFamily="medium"
        color={STYLES.palette.colors.white60}
        style={{ textAlign: 'center' }}
      >
        The page you're looking for doesn't exist.
        <br />
        Here are some helpful links.
      </Typography>
      <ButtonContainer>
        <Button
          buttonType="flip-style"
          borderRadius={8}
          onClick={() => window.history.back()}
        >
          <Sprite id="arrow-left-icon" width={14} height={14} />
          Go Back
        </Button>
        <Button borderRadius={8} onClick={() => navigate('/')}>
          Take me home
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default NotFound
