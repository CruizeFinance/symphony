import { Contract } from 'ethers'
import { Option } from '../components/assetdropdown/SelectInterfaces'

// state interface
export default interface State {
  ethPrice: number
  assetPrice: number
  selectedAsset: Option
  priceFloors: {
    ethereum: number
    bitcoin: number
  }
  chainId: number
  assetBalance: string
  tab: 'protect' | 'withdraw'
  supportedChains: number[]
  loadingInitialAPIs: boolean
  cruizeContract: Contract | null
  assetContract: Contract | null
  mintContract: Contract | null
  cruizeAssetContract: Contract | null
  tokenApproved: boolean
}
