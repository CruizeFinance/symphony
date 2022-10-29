import { Action, Actions } from './Action'
import State from './StateModel'

/*
 * app reducer to store a value based on the executed action
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.STORE_ETH_PRICE:
      return {
        ...state,
        ethPrice: action.payload,
      }
    case Actions.STORE_ASSET_PRICE:
      return {
        ...state,
        assetPrice: action.payload,
      }
    case Actions.STORE_SELECTED_ASSET:
      return {
        ...state,
        selectedAsset: action.payload,
      }
    case Actions.STORE_PRICE_FLOORS:
      return {
        ...state,
        priceFloors: action.payload,
      }
    case Actions.STORE_CHAIN_ID:
      return {
        ...state,
        chainId: action.payload,
      }
    case Actions.STORE_ASSET_BALANCE:
      return {
        ...state,
        assetBalance: action.payload,
      }
    case Actions.STORE_INITIAL_APIS_LOADING_STATUS:
      return {
        ...state,
        loadingInitialAPIs: action.payload,
      }
    case Actions.STORE_TAB:
      return {
        ...state,
        tab: action.payload,
      }
    case Actions.STORE_HOLDER_BOOLEAN:
      return {
        ...state,
        isHolder: action.payload,
      }
    default:
      return state
  }
}

export default reducer
