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
  [AssetDropdownOptions.WETH]: 'ethereum',
  [AssetDropdownOptions.WBTC]: 'bitcoin',
}

// contracts config to update automatically when changing network
export const CONTRACTS_CONFIG = {
  [chain.goerli.id]: {
    CRUIZE: {
      address: '0xE3aA7826348EE5559bcF70FE626a3ca6962ffBdC',
      cruizeAddress: '',
      decimals: 0,
    },
    'CRUIZE-USDC': {
      address: '',
      cruizeAddress: '0x8D49213C586Dc6D38dC219DC404713336d88d1af',
      decimals: 6
    },
    [AssetDropdownOptions.WETH]: {
      address: '0xCCa7d1416518D095E729904aAeA087dBA749A4dC',
      cruizeAddress: '0x0716e8f8F5D85a112aeA660b9D4a4fa17a159f1f',
      decimals: 18,
    },
    [AssetDropdownOptions.WBTC]: {
      address: '0xf4423F4152966eBb106261740da907662A3569C5',
      cruizeAddress: '0x208Da915D297d74625888Ff22b3704782b41Dd30',
      decimals: 8,
    },
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
    title: 'Debt',
    description: `Your staked ETH is added to Aave to collateralise USDC debt needed to hedge your assets using short perps. Using USDC debt provides the collateral needed to execute a short hedge while enabling capital efficient exposure to the upside of ETH.`,
  },
  {
    key: 2,
    title: 'Short Hedge',
    description: `The USDC debt is used as collateral on dYdX to buy a short perpetual contract on your asset at the price floor. This enables the hedge against price drops below the floor. The algorithm dynamically manages the position against price fluctuations and prevents liquidation.`,
  },
  {
    key: 3,
    title: 'Exercise',
    description:
      'Because of the long exposure as well as the short hedge, if ETH rises, your crETH rises with it and can be redeemed for ETH above the floor. If ETH falls below the floor, you can exercise your protection and receive the notional value of the floor in USDC.',
  },
]

// price floors mapping to set the floor dynamically on asset change
export const PRICE_FLOORS_RESPONSE_MAPPING = {
  [AssetDropdownOptions.WETH]: 'ethereum',
  [AssetDropdownOptions.WBTC]: 'bitcoin',
}

// nft contract for airdropping entry passes to access CRUIZE BETA
export const BETA_ACCESS_NFT_CONTRACT =
  '0x2FFCdD8a057b121e44f9Fe7A1A9C714e987b1c53'
