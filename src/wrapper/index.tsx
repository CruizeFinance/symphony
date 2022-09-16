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
  overflow: auto;
`
const Content = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FakeDiv = styled.div`
  height: 120px;
`

const Wrapper = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')

  return (
    <Container>
      <Header location={pathnameArray[pathnameArray.length - 1]} />
      <FakeDiv />
      <Content>
        <Routes />
      </Content>
      <Footer />
    </Container>
  )
}

export default React.memo(Wrapper)
