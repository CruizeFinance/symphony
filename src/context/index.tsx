import { createContext, useEffect, useReducer } from 'react'
import { getAssetPrice } from '../apis'
import { ASSET_PRICE_API_PARAMS } from '../utils'
import { Action, Actions } from './Action'
import reducer from './Reducer'
import initialState from './State'
import State from './StateModel'

interface ProviderProps {
  children: React.ReactNode
}

export const AppContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
])

export const AppContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  async function setAssetPrice(asset: string) {
    const data = await getAssetPrice(
      ASSET_PRICE_API_PARAMS[asset as keyof typeof ASSET_PRICE_API_PARAMS],
    )
    const { price } = data
    dispatch({ type: Actions.STORE_ASSET_PRICE, payload: price })
  }

  useEffect(() => {
    setAssetPrice(state.selectedAsset.label)
  }, [state.selectedAsset])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
