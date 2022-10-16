import styled from 'styled-components'
import Wrapper from './wrapper'
import STYLES from './style/styles.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, createClient, chain } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { AppContextProvider } from './context'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const AppContainer = styled.div`
  height: 100%;
  margin: auto;
  background: ${STYLES.palette.colors.black};
`

// alchemy id to configure the chain
const alchemyId = process.env.REACT_APP_ALCHEMY_ID

// chains supported by the app
const chains = [chain.goerli]

const apolloClient = new ApolloClient({
  uri: `https://gateway.thegraph.com/api/55b5b3a418f44435c373907fd5966c05/subgraphs/id/84CvqQHYhydZzr2KSth8s1AFYpBRzUbVJXq6PWuZm9U9`,
  cache: new InMemoryCache(),
})

/*
 * Cruize dApp
 */
function App(): JSX.Element {
  // creating a simple client to enable web3 hooks
  const client = createClient(
    getDefaultClient({
      appName: 'Cruize',
      alchemyId,
      chains,
    }),
  )
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <ApolloProvider client={apolloClient}>
          <AppContextProvider>
            <AppContainer>
              <BrowserRouter>
                <Routes>
                  <Route path="/*" element={<Wrapper />} />
                </Routes>
              </BrowserRouter>
            </AppContainer>
          </AppContextProvider>
        </ApolloProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
