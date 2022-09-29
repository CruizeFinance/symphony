import { Option } from '../components/assetdropdown/SelectInterfaces'

// state interface
export default interface State {
  ethPrice: number
  assetPrice: number
  selectedAsset: Option
  priceFloors: {
    ethereum: number,
    bitcoin: number
  }
  chainId: number
  assetBalance: string
  apys: {
    WBTC: number
    WETH: number
    LINK: number
  }
}
