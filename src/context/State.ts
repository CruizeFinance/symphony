import { AssetDropdownOptions } from '../enums'
import State from './StateModel'

// initial values of the application state
const initialState: State = {
  ethPrice: 0,
  assetPrice: 0,
  selectedAsset: { label: AssetDropdownOptions.WETH },
  chainId: 1,
  assetBalance: '',
  priceFloors: {
    ethereum: 0,
    bitcoin: 0,
  },
  tab: 'protect',
  supportedChains: [5],
  loadingInitialAPIs: true,
  cruizeContract: null,
  assetContract: null,
  mintContract: null,
  cruizeAssetContract: null,
  tokenApproved: false
}

export default initialState
