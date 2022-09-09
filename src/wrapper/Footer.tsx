import styled from 'styled-components'
import { Sprite, Typography } from '../components'
import STYLES from '../style/styles.json'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 60px;
  border-top: 1px solid ${STYLES.palette.colors.white};
  background: ${STYLES.palette.colors.black};
  position: sticky;
  top: 100%;
`

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Footer = () => {
  return (
    <Container>
      <Section>
        <Sprite id="cruize-footer-icon" width={42} height={22} />
        <Typography tag="h1" fontFamily="extraBold">
          Cruize
        </Typography>
      </Section>
      <Section>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          Home
        </Typography>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          About
        </Typography>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          Blog
        </Typography>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          FAQ
        </Typography>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          Docs
        </Typography>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          Privacy
        </Typography>
      </Section>
      <Section>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          Discord
        </Typography>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          Twitter
        </Typography>
        <Typography
          tag="a"
          fontFamily="regular"
          href="https://cruize.org"
          openInNewTab={true}
        >
          Contact
        </Typography>
      </Section>
    </Container>
  )
}

export default Footer
