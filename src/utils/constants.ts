import { AssetDropdownOptions } from "../enums"

export const WETH_MAINNET_CONTRACT_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

export const WBTC_MAINNET_CONTRACT_ADDRESS = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'

export const WETH_TESTNET_CONTRACT_ADDRESS = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'

export const WBTC_TESTNET_CONTRACT_ADDRESS = '0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05'

export const BTC_MAINNET_PRICE_FEED = '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c'

export const ETH_MAINNET_PRICE_FEED = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'

export const DROPDOWN_OPTIONS = [
  {
    label: AssetDropdownOptions.ETH,
    icon: 'eth-asset-icon'
  },
  {
    label: AssetDropdownOptions.WETH,
    icon: 'weth-asset-icon'
  },
  {
    label: AssetDropdownOptions.WBTC,
    icon: 'wbtc-asset-icon'
  }
]

export const ASSET_PRICE_API_PARAMS = {
  [AssetDropdownOptions.ETH]: ETH_MAINNET_PRICE_FEED,
  [AssetDropdownOptions.WETH]: ETH_MAINNET_PRICE_FEED,
  [AssetDropdownOptions.WBTC]: BTC_MAINNET_PRICE_FEED
}

export const ASSET_GRAPH_API_PARAMS = {
  [AssetDropdownOptions.ETH]: 'ethereum',
  [AssetDropdownOptions.WETH]: 'weth',
  [AssetDropdownOptions.WBTC]: 'wrapped-bitcoin'
}

