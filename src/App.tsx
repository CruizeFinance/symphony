import styled from 'styled-components'
import Wrapper from './wrapper'
import STYLES from './style/styles.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, createClient, chain, configureChains } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { AppContextProvider } from './context'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { InjectedConnector } from 'wagmi/connectors/injected'

const AppContainer = styled.div`
  height: 100%;
  margin: auto;
  background: ${STYLES.palette.colors.black};
`

// chains supported by the app
const supportedChains = [chain.goerli]

/*
 * Cruize dApp
 */
function App(): JSX.Element {
  // creating a simple client to enable web3 hooks
  const { chains, provider, webSocketProvider } = configureChains(supportedChains, [
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_ID!, priority: 0 }),
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID! , priority: 1 }),
    publicProvider({ priority: 2 }),
  ])
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({
        chains,
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
    webSocketProvider
  })
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <AppContextProvider>
          <AppContainer>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<Wrapper />} />
              </Routes>
            </BrowserRouter>
          </AppContainer>
        </AppContextProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
