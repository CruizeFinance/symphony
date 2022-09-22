import styled from 'styled-components'
import Wrapper from './wrapper'
import STYLES from './style/styles.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, createClient, chain } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const AppContainer = styled.div`
  height: 100%;
  margin: auto;
  background: ${STYLES.palette.colors.black};
`

const alchemyId = process.env.REACT_APP_ALCHEMY_ID

const chains = [chain.mainnet, chain.goerli]

function App(): JSX.Element {
  const client = createClient(
    getDefaultClient({
      appName: 'Your App Name',
      alchemyId,
      chains,
    }),
  )
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <AppContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Wrapper />} />
            </Routes>
          </BrowserRouter>
        </AppContainer>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
