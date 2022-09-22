export const networks = {
  MAINNET: 1,
  GOERLI: 5,
};
export const contracts = {
  [networks.MAINNET]: "",
  [networks.GOERLI]: "0xD363F02cBa41eDA05e335ADb6A66E9fe66604b36",
};
export const tokens = {
  [networks.MAINNET]: {
    ETH: "",
    WETH: "",
    WBTC: "",
  },
  [networks.GOERLI]: {
    ETH: "",
    WETH: "",
    WBTC: "",
  },
};
export const WETH_MAINNET_CONTRACT_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

export const WBTC_MAINNET_CONTRACT_ADDRESS = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'

export const DEFAULT_NETWORK = 5
