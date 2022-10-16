import { BASE_URL, fetchWrapper } from '../utils'
import {
  APYs,
  AssetPrice,
  DepositToDyDx,
  FetchTransactions,
  PriceFloors,
  StoreTransactions,
} from './interfaces'

/*
 * Used to fetch the asset's current price
 */
export const getAssetPrice = async (asset: string) => {
  try {
    const data: AssetPrice = await fetchWrapper.get(
      `${BASE_URL}/market_data/asset_price?asset_name=${asset}`,
    )
    return data
  } catch (e) {
    return {
      price: null,
      error: e,
    }
  }
}

/*
 * Used to deposit funds to dydx on successful protection
 */
export const depositToDyDx = async () => {
  try {
    const data: DepositToDyDx = await fetchWrapper.post(
      `${BASE_URL}/dydx_operations/deposit/test`,
    )
    return data
  } catch (e) {
    return {
      message: null,
      error: e,
    }
  }
}

/*
 * Used to store user transaction details... protection or withdrawal
 */
export const storeTransaction = async (
  wallet_address: string,
  transaction_hash: string,
  asset_name: string,
  amount: string,
  type: string,
) => {
  try {
    const data: StoreTransactions = await fetchWrapper.post(
      `${BASE_URL}/cruize_operations/transaction/save`,
      JSON.stringify({
        wallet_address,
        transaction_hash,
        asset_name,
        amount,
        type,
      }),
    )
    return data
  } catch (e) {
    return {
      message: null,
      error: e,
    }
  }
}

/*
 * Used to fetch user transaction details
 */
export const fetchRecentOrders = async (user_address: string) => {
  try {
    const data: FetchTransactions = await fetchWrapper.get(
      `${BASE_URL}/cruize_operations/transaction/fetch?wallet_address=${user_address}`,
    )
    return data
  } catch (e) {
    return {
      message: null,
      error: e,
    }
  }
}

/*
 * Used to fetch all assets price floors
 */
export const fetchPriceFloors = async () => {
  try {
    const data: PriceFloors = await fetchWrapper.get(
      `${BASE_URL}/cruize_operations/price_floor`,
    )
    return data
  } catch (e) {
    return {
      result: null,
      error: e,
    }
  }
}

/*
 * Used to fetch all assets AAVE APYs
 */
export const fetchAPYs = async () => {
  try {
    const data: APYs = await fetchWrapper.get(
      `${BASE_URL}/cruize_operations/apy`,
    )
    return data
  } catch (e) {
    return {
      result: null,
      error: e,
    }
  }
}
