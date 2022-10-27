// return type of asset price
export interface AssetPrice {
  price: number | null
  error: unknown
}

// return type of deposit dydx
export interface DepositToDyDx {
  message: {
    id: string
    type: string
    debitAsset: string
    creditAsset: string
    debitAmount: string
    creditAmount: string
    transactionHash: string | null
    status: string
    createdAt: string
    confirmedAt: string | null
    clientId: string
    fromAddress: string | null
    toAddress: string | null
  } | null
  error: unknown
}

// return type of fetch transactions
export interface FetchTransactions {
  message: {
    type: string
    amount: string
    transaction_hash: string
    timestamp: number
    asset_name: string
    user_address: string
  }[] | string
  error: unknown
}

// return type of store transactions
export interface StoreTransactions {
  message: string
  error: unknown
}

// return type of price floors
export interface PriceFloors {
  result: {
    ethereum: number
    bitcoin: number
  } | null
  error: unknown
}
