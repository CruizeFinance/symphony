import { createContext, useEffect, useReducer } from 'react'
import {
  useAccount,
  useBalance,
  useNetwork,
  chain as allChains,
  useContractRead,
} from 'wagmi'
import { fetchPriceFloors, getAssetPrice } from '../apis'
import { useOnceCall } from '../hooks'
import { BETA_ACCESS_NFT_CONTRACT, CONTRACTS_CONFIG } from '../utils'
import { Action, Actions } from './Action'
import reducer from './Reducer'
import initialState from './State'
import State from './StateModel'
import BETAACESSABI from '../abis/beta_access_nft.json'

// Context props
interface ProviderProps {
  children: React.ReactNode
}

// creating app context to support a redux structure
export const AppContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
])

/*
 * App Context Provider
 * Used to store certain values that can be used throughout the application in unrelated components
 */
export const AppContextProvider = ({ children }: ProviderProps) => {
  // context hook
  const [state, dispatch] = useReducer(reducer, initialState)

  // object for fetching token contracts per chain
  const contractsConfig = CONTRACTS_CONFIG[state.chainId || allChains.goerli.id]

  // web3 hooks
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balanceData } = useBalance({
    addressOrName: address,
    ...(state.selectedAsset.label !== 'ETH'
      ? {
          token:
            contractsConfig[
              state.selectedAsset.label as keyof typeof contractsConfig
            ]?.address,
        }
      : undefined),
    watch: true,
  })
  
  const {
    data: holderData,
    isLoading: checkingHolder,
    isError: holderError,
  } = useContractRead({
    addressOrName: BETA_ACCESS_NFT_CONTRACT,
    contractInterface: BETAACESSABI,
    functionName: 'balanceOf',
    args: [address],
  })

  /*
   * initial api calls to fetch price floors for all supported assets
   */
  const initialAPICalls = async () => {
    dispatch({ type: Actions.STORE_INITIAL_APIS_LOADING_STATUS, payload: true })
    const priceFloors = await fetchPriceFloors()
    dispatch({
      type: Actions.STORE_PRICE_FLOORS,
      payload: priceFloors.result,
    })
    const { price } = await getAssetPrice('ethereum')
    dispatch({ type: Actions.STORE_ETH_PRICE, payload: price })
    dispatch({ type: Actions.STORE_ASSET_PRICE, payload: price })
    dispatch({
      type: Actions.STORE_INITIAL_APIS_LOADING_STATUS,
      payload: false,
    })
  }

  /*
   * hook to make initial api calls just once
   */
  useOnceCall(initialAPICalls)

  /*
   * effect to store the chain id in context
   */
  useEffect(() => {
    dispatch({ type: Actions.STORE_CHAIN_ID, payload: chain?.id })
  }, [chain])

  /*
   * effect to store the asset balance in context
   */
  useEffect(() => {
    dispatch({
      type: Actions.STORE_ASSET_BALANCE,
      payload: balanceData?.formatted,
    })
  }, [balanceData])

  /*
   * an effect to set the value for isHolder boolean
   */
  useEffect(() => {
    if (isConnected && !checkingHolder) {
      const holder = holderData?.toNumber() > 0 || false
      dispatch({
        type: Actions.STORE_HOLDER_BOOLEAN,
        payload: checkingHolder
          ? 'loading'
          : holderError
          ? 'error'
          : holder
          ? 'holder'
          : 'error',
      })
    }
  }, [isConnected, address, holderData])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
