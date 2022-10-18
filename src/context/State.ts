import { AssetDropdownOptions } from '../enums'
import State from './StateModel'

// initial values of the application state
const initialState: State = {
  ethPrice: 0,
  assetPrice: 0,
  selectedAsset: { label: AssetDropdownOptions.ETH },
  chainId: 1,
  assetBalance: '',
  priceFloors: {
    ethereum: 0,
    bitcoin: 0,
  },
  apys: {
    ethereum: 0,
    bitcoin: 0,
  },
  tab: 'protect',
  supportedChains: [5]
}

export default initialState
