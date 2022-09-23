import { MarketChartRangeData } from './interfaces'

export const getMarketChartData = async (asset: string, days: number) => {
  const response = await fetch(`/market_data/day/`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      asset,
      vs_currency: 'usd',
      days,
    }),
  })
  const data: MarketChartRangeData = await response.json()
  return data
}

export const getAssetPrice = async (asset: string) => {
  const response = await fetch(`/market_data/asset_price/`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      asset,
      vs_currency: 'usd',
    }),
  })
  const data = await response.json()
  return data
}

export const depositToDyDx = async () => {
  const response = await fetch(`dydx_operations/deposit/test  `, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export const createPositionDyDx = async (orderType: 'buy' | 'sell') => {
  const response = await fetch(`order/create`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "position_id":70, 
      "market":"ETH-USD",
      "side": orderType.toUpperCase(),
      "order_type":"MARKET",
      "post_only":false,
      "size":"1",
      "price":"1716",
      "limit_fee":"0.4",
      "expiration_epoch_seconds":2013988637,
      "time_in_force": "IOC"
    })
  })
  const data = await response.json()
  return data
}
