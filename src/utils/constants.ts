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
      address: '0xd9E758140992192F558620928b6745512c747700',
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
      cruizeAddress: '0x182410CFD75A9b3219F9f3b9b397b88d6960609C',
      decimals: 18,
    },
    [AssetDropdownOptions.WBTC]: {
      address: '0xf4423F4152966eBb106261740da907662A3569C5',
      cruizeAddress: '0xD304ec8304573a58d118e766BD7042BeC54eee25',
      decimals: 8,
    },
    [AssetDropdownOptions.ETH]: {
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      cruizeAddress: '0x2266D6BD43865BAA1C07aCBd77aA990277440153',
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
export const GAS_LIMIT = 30000000

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
    description: `The USDC debt is used as collateral on DyDx to buy a short perpetual contract on your asset at the price floor. This enables the hedge against price drops below the floor. The algorithm dynamically manages the position against price fluctuations and prevents liquidation.`,
  },
  {
    key: 3,
    title: 'Exercise',
    description:
      'Because of the long exposure as well as the short hedge, if ETH rises, your crETH rises with it and can be redeemed for ETH above the floor. If ETH falls below the floor, you can exercise your protection and receive the notional value of the floor in USDC',
  },
]

// price floors mapping to set the floor dynamically on asset change
export const PRICE_FLOORS_RESPONSE_MAPPING = {
  [AssetDropdownOptions.ETH]: 'ethereum',
  [AssetDropdownOptions.WETH]: 'ethereum',
  [AssetDropdownOptions.WBTC]: 'bitcoin',
}

// nft contract for airdropping entry passes to access CRUIZE BETA
export const BETA_ACCESS_NFT_CONTRACT =
  '0x2FFCdD8a057b121e44f9Fe7A1A9C714e987b1c53'
