import { MarketChartRangeData } from "./interfaces";

export const getMarketChartRange = async (asset: string, days: number) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${asset}/market_chart?vs_currency=usd&days=${days}`,
    {
      headers: {
        accept: 'application/json',
      },
    },
  )
  const data: MarketChartRangeData = await response.json()
  return data;
}
