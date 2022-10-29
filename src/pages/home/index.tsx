import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Sprite, Typography } from '../../components'
import { rem } from '../../utils'
import STYLES from '../../style/styles.json'
import { ConnectWalletButton, ErrorModal } from '../../common'
import { useAccount } from 'wagmi'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context'

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

/*
 * Landing page for the dApp
 */
const Home = () => {
  // context hook
  const [state] = useContext(AppContext)

  // react router dom hook
  const navigate = useNavigate()

  //web3 hook
  const { isConnected } = useAccount()

  //state hook
  const [openErrorModal, setOpenErrorModal] = useState(false)

  /*
   * an effect to perform action after confirming whether the user is holder of the CRUIZE PRIVATE BETA PASS
   */
  useEffect(() => {
    if (state.isHolder) {
      switch (state.isHolder) {
        case 'loading':
          break
        case 'holder':
          navigate('/protect')
          break
        default:
          setOpenErrorModal(true)
      }
    }
  }, [state.isHolder])

  return (
    <>
      <Container>
        <Sprite id="homepage-image-icon" width={280} height={280} />
        <InfoArea>
          <Typography tag="h1" fontFamily="bold">
            We are currently in private beta.
          </Typography>
          <Typography
            tag="p"
            fontFamily="regular"
            color={STYLES.palette.colors.white60}
          >
            Currently, only holders of our Cruize Entry Pass NFT can access our
            private beta.{' '}
            {!isConnected ? (
              <Typography
                tag="span"
                fontFamily="regular"
                style={{ fontSize: 'inherit' }}
                color={STYLES.palette.colors.white60}
              >
                Connect wallet to continue.
              </Typography>
            ) : null}
          </Typography>
          {!isConnected ? (
            <ConnectWalletButton buttonLabel="Connect Wallet" />
          ) : null}
        </InfoArea>
      </Container>
      <ErrorModal
        open={openErrorModal}
        hide={() => setOpenErrorModal(false)}
        title="Oops! You Don’t Hold the Cruize Entry Pass"
        description="Only the Cruize Entry Pass NFT holders can access the private beta of Cruize. You can ask get it transferred to your wallet from someone who already holds it or let us know that you’re interested in joining our private beta on the #general channel of our Discord server"
        actionLabel="Get Cruize entry pass"
        action={() =>
          window.open(
            'https://discord.gg/cruize',
            '_blank',
            'noopener noreferrer',
          )
        }
      />
    </>
  )
}

export default Home
