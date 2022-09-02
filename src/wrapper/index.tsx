import styled from 'styled-components'
import Header from './Header'
import React from 'react'
import Routes from '../routes'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  height: 100%;
`
const Content = styled.div`
  height: calc(100% - 120px);

  > div {
    height: 100%;
  }
`

const Wrapper = () => {
  const location = useLocation()
  const pathnameArray = location.pathname.split('/')

  return (
    <Container>
      <Header location={pathnameArray[pathnameArray.length - 1]} />
      <Content>
        <Routes />
      </Content>
      <Footer />
    </Container>
  )
}

export default React.memo(Wrapper)
