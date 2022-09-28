import { AssetDropdownOptions } from '../enums'
import State from './StateModel'

const initialState: State = {
  assetPrice: 0,
  selectedAsset: { label: AssetDropdownOptions.ETH },
  priceFloor: 0,
}

export default initialState
