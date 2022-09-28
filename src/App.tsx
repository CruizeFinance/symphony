import styled from 'styled-components'
import Wrapper from './wrapper'
import STYLES from './style/styles.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, createClient, chain } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { AppContextProvider } from './context'

const AppContainer = styled.div`
  height: 100%;
  margin: auto;
  background: ${STYLES.palette.colors.black};
`
const alchemyId = process.env.REACT_APP_ALCHEMY_ID

const chains = [chain.goerli]

function App(): JSX.Element {
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
