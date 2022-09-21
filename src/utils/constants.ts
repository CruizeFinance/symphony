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

export const DEFAULT_NETWORK = 5