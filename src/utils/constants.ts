import { chain } from 'wagmi'
import { AssetDropdownOptions } from '../enums'

// chainlink price feed contracts
export const BTC_MAINNET_PRICE_FEED =
  '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c'
export const ETH_MAINNET_PRICE_FEED =
  '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'

// dropdown options for assets
export const DROPDOWN_OPTIONS = [
  {
    label: AssetDropdownOptions.ETH,
    icon: 'eth-asset-icon',
  },
  {
    label: AssetDropdownOptions.WETH,
    icon: 'weth-asset-icon',
  },
  {
    label: AssetDropdownOptions.WBTC,
    icon: 'wbtc-asset-icon',
  },
]

// parameters to pass in the api for fetching price for a selected asset
export const ASSET_PRICE_API_PARAMS = {
  [AssetDropdownOptions.ETH]: 'ethereum',
  [AssetDropdownOptions.WETH]: 'ethereum',
  [AssetDropdownOptions.WBTC]: 'bitcoin',
}

// contracts config to update automatically when changing network
export const CONTRACTS_CONFIG = {
  [chain.goerli.id]: {
    CRUIZE: {
      address: '0x19d27BCdCcA7584bf5f10a9fE0cF00C76abB03c2',
      cruizeAddress: '',
      decimals: 0,
    },
    [AssetDropdownOptions.WETH]: {
      address: '0xCCa7d1416518D095E729904aAeA087dBA749A4dC',
      cruizeAddress: '0x7610126F923E7b88f717B1170e477f6867af9100',
      decimals: 18,
    },
    [AssetDropdownOptions.WBTC]: {
      address: '0xf4423F4152966eBb106261740da907662A3569C5',
      cruizeAddress: '0xC67599c74C3Bb76ed0A98c03fDA71B762a0d2514',
      decimals: 8,
    },
    [AssetDropdownOptions.ETH]: {
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      cruizeAddress: '0x334AD29958E8976Db4Dd3bFF5612C4c785A76709',
      decimals: 18,
    }, // dummy value
  },
  [chain.mainnet.id]: {
    CRUIZE: { address: '', cruizeAddress: '', decimals: 0 },
    [AssetDropdownOptions.WETH]: {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      cruizeAddress: '',
      decimals: 18,
    },
    [AssetDropdownOptions.WBTC]: {
      address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      cruizeAddress: '',
      decimals: 8,
    },
    [AssetDropdownOptions.ETH]: {
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      cruizeAddress: '',
      decimals: 18,
    }, // dummy value
  },
}

// base url for apis
export const BASE_URL = 'https://test.trident.cruize.finance'

// gas limit for interacting with contracts
export const GAS_LIMIT = 1000000

// how it works cards content
export const HOW_IT_WORKS_CARDS = [
  {
    key: 1,
    title: 'Stake',
    description:
      'Start by staking your ETH to receive crETH, a downside protected derivative of ETH that remains protected with a permanent price floor. Capture the upside of the market while completely limiting the downside.',
  },
  {
    key: 2,
    title: 'Use across DeFi',
    description:
      'Use your crETH as volatility protected assets across DeFi. Wanna borrow or go long on an asset? Using crETH as the collateral means it will never get liquidated as it never falls below the floor.',
  },
  {
    key: 3,
    title: 'Withdrawal',
    description:
      'If ETH rises, your crETH rises with it and can be redeemed for ETH above the floor. If ETH falls below the floor, you can exercise your protection and receive the notional value of the floor in USDC',
  },
]

// page links for navigation
export const PAGE_LINKS = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Protect',
    url: '/protect',
  },
  /* {
    label: 'Portfolio',
    url: '/portfolio',
  }, */
]

// price floors mapping to set the floor dynamically on asset change
export const PRICE_FLOORS_RESPONSE_MAPPING = {
  [AssetDropdownOptions.ETH]: 'ethereum',
  [AssetDropdownOptions.WETH]: 'ethereum',
  [AssetDropdownOptions.WBTC]: 'bitcoin',
}

// apys mapping to set the floor dynamically on asset change
export const APYS_RESPONSE_MAPPING = {
  [AssetDropdownOptions.ETH]: 'ethereum',
  [AssetDropdownOptions.WETH]: 'ethereum',
  [AssetDropdownOptions.WBTC]: 'bitcoin',
}
