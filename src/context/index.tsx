import { createContext, useEffect, useReducer } from 'react'
import {
  useAccount,
  useNetwork,
  chain as allChains,
  useSigner,
  erc20ABI,
} from 'wagmi'
import { fetchPriceFloors, getAssetPrice } from '../apis'
import { useOnceCall } from '../hooks'
import { CONTRACTS_CONFIG } from '../utils'
import { Action, Actions } from './Action'
import reducer from './Reducer'
import initialState from './State'
import State from './StateModel'
import { BigNumber, Contract, ethers, Signer } from 'ethers'
import testnet_abi from '../abis/testnet_cruize_abi.json'
import weth_mint_abi from '../abis/weth_minting_abi.json'

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

  /*
   * hook to fetch signer
   */
  const { data: signer } = useSigner()

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
   * an effect to load all contract if the user is on the right chain and is a holder of the beta pass
   */
  useEffect(() => {
    if (signer &&
      state.supportedChains.includes(state.chainId)
    ) {
      const cruizeContract: Contract = new ethers.Contract(
        contractsConfig['CRUIZE'].address,
        testnet_abi,
        signer as Signer,
      )
      dispatch({ type: Actions.STORE_CRUIZE_CONTRACT, payload: cruizeContract })
      const assetContract: Contract = new ethers.Contract(
        contractsConfig[
          state.selectedAsset.label as keyof typeof contractsConfig
        ]!.address,
        erc20ABI,
        signer as Signer,
      )
      dispatch({ type: Actions.STORE_ASSET_CONTRACT, payload: assetContract })
      const mintContract: Contract = new ethers.Contract(
        contractsConfig[
          state.selectedAsset.label as keyof typeof contractsConfig
        ]!.address,
        weth_mint_abi,
        signer as Signer,
      )
      dispatch({ type: Actions.STORE_MINT_CONTRACT, payload: mintContract })
      const cruizeAssetContract: Contract = new ethers.Contract(
        contractsConfig[
          state.selectedAsset.label as keyof typeof contractsConfig
        ]!.cruizeAddress,
        erc20ABI,
        signer as Signer,
      )
      dispatch({
        type: Actions.STORE_CRUIZE_ASSET_CONTRACT,
        payload: cruizeAssetContract,
      })
      checkAllowance(assetContract)
    }
  }, [signer, state.selectedAsset, address, state.chainId])

  /*
   * function to check token allowance
   */
  const checkAllowance = async (contract: Contract) => {
    try {
      const data: BigNumber = await contract.allowance(
        address!,
        contractsConfig['CRUIZE'].address,
      )
      dispatch({
        type: Actions.STORE_TOKEN_APPROVED,
        payload: BigNumber.from(data).gt(BigNumber.from('0')),
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
