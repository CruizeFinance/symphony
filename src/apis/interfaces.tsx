// return type of asset price
export interface AssetPrice {
  price: number
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
  }
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
  }[]
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
  }
  error: unknown
}

// return type of apys
export interface APYs {
  result: {
    WBTC: number
    LINK: number
    WETH: number
  }
  error: unknown
}
