import styled from 'styled-components'
import Header from './Header'
import React from 'react'
import Routes from '../routes'
import Footer from './Footer'

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
  return (
    <Container>
      <Header />
      <Content>
        <Routes />
      </Content>
      <Footer />
    </Container>
  )
}

export default React.memo(Wrapper)
