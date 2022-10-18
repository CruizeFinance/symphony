import styled from 'styled-components'
import Wrapper from './wrapper'
import STYLES from './style/styles.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, createClient, chain, configureChains } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { AppContextProvider } from './context'
import { infuraProvider } from 'wagmi/providers/infura'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

const AppContainer = styled.div`
  height: 100%;
  margin: auto;
  background: ${STYLES.palette.colors.black};
`

// alchemy id to configure the chain
const infuraId = process.env.REACT_APP_INFURA_ID

// chains supported by the app
const supportedChains = [chain.goerli]

/*
 * Cruize dApp
 */
function App(): JSX.Element {
  // creating a simple client to enable web3 hooks
  const { chains, provider } = configureChains(supportedChains, [
    infuraProvider({ apiKey: infuraId }),
  ])
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({
        chains,
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'Cruize',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
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
