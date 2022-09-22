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
