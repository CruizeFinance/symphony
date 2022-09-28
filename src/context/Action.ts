export interface Action {
  type: string
  payload: any
}

export enum Actions {
  STORE_ASSET_PRICE = 'STORE_ASSET_PRICE',
  STORE_SELECTED_ASSET = 'STORE_SELECTED_ASSET',
  STORE_PRICE_FLOOR = 'STORE_PRICE_FLOOR'
}
