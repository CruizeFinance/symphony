import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Divider, Modal, Sprite, Typography } from '../components'
import ProtectCard from '../pages/protect/ProtectCard'
import STYLES from '../style/styles.json'
import { vw } from '../utils'

const Container = styled.div`
  padding: ${vw(30)} ${vw(60)};
  border-top: ${vw(1)} solid ${STYLES.palette.colors.dividerStroke};
  background: ${STYLES.palette.colors.black};
  position: sticky;
  top: 100%;

  @media only screen and (max-width: 500px) {
    padding: ${vw(48)} ${vw(16)} ${vw(16)};
  }
`

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 500px) {
    align-items: flex-start;
    justify-content: flex-start;
    gap: 48px;
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(10)};

  #mobile-section-header {
    display: none;
  }

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${vw(12)};

    #mobile-section-header {
      display: block;
    }
    &:first-child {
      display: none;
    }
    &:nth-child(2) {
      width: 50%;
    }
    &:nth-child(3) {
      width: 50%;
    }
    a {
      filter: brightness(60%);
    }
  }
`

const MobileArea = styled.div`
  display: none;

  @media only screen and (max-width: 500px) {
    display: flex;
    margin: ${vw(48)} 0 0;
    flex-direction: column;
    gap: ${vw(32)};
  }
`

const ProtectArea = styled.div`
  display: none;

  @media only screen and (max-width: 500px) {
    display: contents;
  }
`
const ProtectPad = styled.div`
  position: fixed;
  bottom: 0;
  width: -webkit-fill-available;
  background: ${STYLES.palette.colors.black};
  display: flex;
  align-items: center;
  padding: ${vw(20)} ${vw(16)};
  gap: ${vw(26)};
`

const FakeFooter = styled.div`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
    height: ${vw(80)};
    width: 100%;
  }
`

const Footer = () => {
  const location = useLocation()

  const [openProtectModal, setOpenProtectModal] = useState(false)

  return (
    <>
      <Container>
        <Links>
          <Section>
            <Sprite id="cruize-footer-icon" width={42} height={22} />
            <Typography tag="h1" fontFamily="extraBold">
              Cruize
            </Typography>
          </Section>
          <Section>
            <Typography
              tag="label"
              fontFamily="semiBold"
              style={{ fontSize: vw(14) }}
              id={'mobile-section-header'}
            >
              Product
            </Typography>
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
              tag="label"
              fontFamily="semiBold"
              style={{ fontSize: vw(14) }}
              id={'mobile-section-header'}
            >
              Socials
            </Typography>
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
        </Links>
        <MobileArea>
          <Divider />
          <Typography
            fontFamily="extraBold"
            tag="h1"
            color={STYLES.palette.colors.logoBlue}
          >
            Cruize
          </Typography>
          <Typography fontFamily="regular" tag="label">
            © 2022 Cruize Inc. All rights reserved.
          </Typography>
        </MobileArea>
        {location.pathname.includes('protect') ? <FakeFooter /> : null}
      </Container>
      {location.pathname.includes('protect') ? (
        <ProtectArea>
          <ProtectPad>
            <Typography
              fontFamily="semiBold"
              style={{ filter: 'brightness(60%)', width: '50%' }}
            >
              Protect your assets with Cruize 🚢
            </Typography>
            <Button
              buttonType="protect-small"
              style={{ width: '50%' }}
              onClick={() => setOpenProtectModal(true)}
            >
              Protect
            </Button>
          </ProtectPad>
        </ProtectArea>
      ) : null}
      <Modal open={openProtectModal} hide={() => setOpenProtectModal(false)} modalContentStyle={{ padding: vw(0) }}>
        <ProtectCard />
      </Modal>
    </>
  )
}

export default Footer
