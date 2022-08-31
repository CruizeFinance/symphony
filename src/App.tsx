import styled from 'styled-components'
import Wrapper from './wrapper'
import STYLES from './style/styles.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${STYLES.palette.colors.black};
`

function App(): JSX.Element {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Wrapper />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App
