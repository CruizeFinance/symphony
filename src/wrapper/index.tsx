import styled from 'styled-components'
import Header from './header'
import React from 'react'
import Routes from '../routes'
import Footer from './Footer'
import STYLES from '../style/styles.json'
import { rem } from '../utils'

const Container = styled.div`
  height: 100%;
  font-family: ${STYLES.typography.fonts.regular};
  overflow: auto;
`
const Content = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FakeDiv = styled.div`
  height: ${rem(100)};

  @media only screen and (max-width: 1024px) {
    height: ${rem(80)};
  }
`
/*
 * Wrapper
 * Structure for the app
 */
const Wrapper = () => {

  return (
    <Container>
      <Header />
      <FakeDiv />
      <Content>
        <Routes />
      </Content>
      <Footer />
    </Container>
  )
}

export default React.memo(Wrapper)
