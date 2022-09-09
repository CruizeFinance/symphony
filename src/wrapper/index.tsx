import styled from 'styled-components'
import Header from './Header'
import React from 'react'
import Routes from '../routes'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import STYLES from '../style/styles.json'

const Container = styled.div`
  height: 100%;
  font-family: ${STYLES.typography.fonts.regular};
`
const Content = styled.div`
  height: 100%;
  overflow: auto;
  padding: 120px 0 0;
`

const Wrapper = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')

  return (
    <Container>
      <Header location={pathnameArray[pathnameArray.length - 1]} />
      <Content>
        <Routes />
        <Footer />
      </Content>
    </Container>
  )
}

export default React.memo(Wrapper)
