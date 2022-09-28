import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Divider, Modal, Sprite, Typography } from '../components'
import ProtectCard from '../pages/protect/ProtectCard'
import STYLES from '../style/styles.json'
import { rem } from '../utils'

const Container = styled.div`
  padding: ${rem(30)} ${rem(60)};
  border-top: ${rem(1)} solid ${STYLES.palette.colors.dividerStroke};
  background: ${STYLES.palette.colors.black};
  position: sticky;
  top: 100%;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(48)} ${rem(16)} ${rem(16)};
  }
`

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 1024px) {
    align-items: flex-start;
    justify-content: flex-start;
    gap: 48px;
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(10)};

  #mobile-section-header {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${rem(12)};

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

  @media only screen and (max-width: 1024px) {
    display: flex;
    margin: ${rem(48)} 0 0;
    flex-direction: column;
    gap: ${rem(32)};
  }
`

const ProtectArea = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
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
  padding: ${rem(20)} ${rem(16)};
  gap: ${rem(26)};
`

const FakeFooter = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;
    height: ${rem(80)};
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
              style={{ fontSize: rem(14) }}
              id={'mobile-section-header'}
            >
              Product
            </Typography>
            <Typography
              tag="a"
              fontFamily="regular"
              href="https://www.cruize.finance/"
              openInNewTab={true}
            >
              Home
            </Typography>
            <Typography
              tag="a"
              fontFamily="regular"
              href="https://www.cruize.finance/about"
              openInNewTab={true}
            >
              About
            </Typography>
            <Typography
              tag="a"
              fontFamily="regular"
              href="https://docs.cruize.org"
              openInNewTab={true}
            >
              Guide
            </Typography>
            <Typography
              tag="a"
              fontFamily="regular"
              href=" https://www.cruize.finance/terms"
              openInNewTab={true}
            >
              Terms
            </Typography>
          </Section>
          <Section>
            <Typography
              tag="label"
              fontFamily="semiBold"
              style={{ fontSize: rem(14) }}
              id={'mobile-section-header'}
            >
              Socials
            </Typography>
            <Typography
              tag="a"
              fontFamily="regular"
              href="https://twitter.com/CruizeFinance"
              openInNewTab={true}
            >
              <Sprite id='twitter-icon' width={24} height={24} />
            </Typography>
            <Typography
              tag="a"
              fontFamily="regular"
              href="https://discord.gg/uM5BGUZpFb"
              openInNewTab={true}
            >
            <Sprite id='discord-icon' width={24} height={24} />
            </Typography>
            <Typography
              tag="a"
              fontFamily="regular"
              href="https://github.com/CruizeFinance"
              openInNewTab={true}
            >
            <Sprite id='github-icon' width={24} height={24} />
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
      <Modal open={openProtectModal} hide={() => setOpenProtectModal(false)} modalContentStyle={{ padding: rem(0) }}>
        <ProtectCard />
      </Modal>
    </>
  )
}

export default Footer
