// action interface
export interface Action {
  type: string
  payload: any
}

// type of actions that can be carried out
export enum Actions {
  STORE_ETH_PRICE = 'STORE_ETH_PRICE',
  STORE_ASSET_PRICE = 'STORE_ASSET_PRICE',
  STORE_SELECTED_ASSET = 'STORE_SELECTED_ASSET',
  STORE_CHAIN_ID = 'STORE_CHAIN_ID',
  STORE_ASSET_BALANCE = 'STORE_ASSET_BALANCE',
  STORE_PRICE_FLOORS = 'STORE_PRICE_FLOORS',
  STORE_TAB = 'STORE_TAB',
  STORE_INITIAL_APIS_LOADING_STATUS = 'STORE_INITIAL_APIS_LOADING_STATUS',
  STORE_CRUIZE_CONTRACT = 'STORE_CRUIZE_CONTRACT',
  STORE_ASSET_CONTRACT = 'STORE_ASSET_CONTRACT',
  STORE_CRUIZE_ASSET_CONTRACT = 'STORE_CRUIZE_ASSET_CONTRACT',
  STORE_MINT_CONTRACT = 'STORE_MINT_CONTRACT',
  STORE_TOKEN_APPROVED = 'STORE_TOKEN_APPROVED'
}
