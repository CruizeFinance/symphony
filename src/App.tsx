import styled from 'styled-components'
import Wrapper from './wrapper'
import STYLES from './style/styles.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WagmiConfig, createClient } from 'wagmi'
import {
  ConnectKitProvider,
  getDefaultClient,
} from 'connectkit'

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${STYLES.palette.colors.black};
`

const alchemyId = process.env.REACT_APP_ALCHEMY_ID

const client = createClient(
  getDefaultClient({
    appName: 'Your App Name',
    alchemyId,
  }),
)

function App(): JSX.Element {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme='midnight'>
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
