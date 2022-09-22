import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'
import { getAssetPrice, getMarketChartData } from '../../apis'
import { MarketChartRangeData } from '../../apis/interfaces'
import { Select, Sprite, Tabs, Typography } from '../../components'
import STYLES from '../../style/styles.json'
import { rem } from '../../utils'

const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${rem(30)};
`
const AssetSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${rem(30)};
  }
`
const DropdownArea = styled(GraphContainer)`
  align-items: flex-start;
  gap: ${rem(10)};
`
const ProtectRewardsInfo = styled.div`
  padding: ${rem(20)};
  border-radius: ${rem(8)};
  border: none;
  background: ${STYLES.palette.colors.inputBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${rem(20)};

  @media only screen and (max-width: 1024px) {
    > svg {
      display: none;
    }
  }
`
const ProtectRewardsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${rem(10)};
`

const options = [
  {
    label: 'Ethereum (ETH)',
  },
  {
    label: 'Wrapped Ethereum (WETH)',
  },
  {
    label: 'Wrapped Bitcoin (WBTC)',
  },
]

const GraphArea = () => {
  const [asset, setAsset] = useState('ethereum')
  const [range, setRange] = useState(1)
  const [chartData, setChartData] = useState<MarketChartRangeData>({
    prices: [],
    error: null,
  })
  const [assetPrice, setAssetPrice] = useState()

  const onRangeChange = (val: string) => {
    switch (val) {
      case '7D':
        setRange(7)
        break
      case '1M':
        setRange(30)
        break
      case '3M':
        setRange(90)
        break
      case '1Y':
        setRange(365)
        break
      default:
        setRange(1)
        break
    }
  }

  const onAssetChange = (val: string) => {
    switch (val) {
      case 'Wrapped Bitcoin (WBTC)':
        setAsset('bitcoin')
        break
      default:
        setAsset('ethereum')
        break
    }
  }

  async function chartApiCall() {
    const data = await getMarketChartData(asset, range)
    if (data.prices.length) setChartData(data)
  }

  async function priceApiCall() {
    const data = await getAssetPrice(asset)
    if (data.price) setAssetPrice(data.price)
  }

  useEffect(() => {
    chartApiCall()
    priceApiCall()
  }, [asset, range])

  const graphData = useMemo(
    () =>
      chartData.prices.map((price) => {
        return {
          eth: price[1],
        }
      }),
    [chartData],
  )

  return (
    <GraphContainer>
      <AssetSection>
        <DropdownArea>
          <Select
            options={options}
            onChange={(val) => onAssetChange(val)}
            pickerStyle={{
              background: 'inherit',
              padding: '0px',
              width: rem(267),
            }}
            labelStyle={{
              fontSize: '32px',
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          />
          <Typography tag="h1" style={{ filter: 'brightness(40%)' }}>
            {assetPrice ? `$${assetPrice}` : '-'}
            {/* hidden for demo */}
            {/* <Typography
              tag="label"
              color={STYLES.palette.colors.green}
              style={{ filter: 'brightness(100%)' }}
            >
              +23%&nbsp;
              <Typography tag="label">(24h)</Typography>
            </Typography> */}
          </Typography>
        </DropdownArea>
        {/* hidden for demo */}
        {/* <Tabs
          onClick={(val) => console.log(val)}
          tabs={[
            {
              label: 'ETH',
              icon: <Sprite id="info-icon" width={15} height={15} />,
            },
            {
              label: 'crETH',
              icon: <Sprite id="info-icon" width={15} height={15} />,
            },
          ]}
          type="contained"
        /> */}
      </AssetSection>
      <ResponsiveContainer
        minHeight={rem(
          window.innerWidth <= 800
            ? 300
            : window.innerWidth <= 1024
            ? 350
            : 400,
        )}
      >
        <AreaChart
          data={graphData}
          style={{ position: 'relative', right: rem(16) }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis style={{ fontSize: rem(12) }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="eth"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          {/* <Area
            type="monotone"
            dataKey="crEth"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
      <Tabs
        onClick={(val) => onRangeChange(val)}
        tabs={[
          {
            label: '1D',
          },
          {
            label: '7D',
          },
          {
            label: '1M',
          },
          {
            label: '3M',
          },
          {
            label: '1Y',
          },
        ]}
        type="filled"
        containerStyle={{ alignSelf: 'end' }}
        tabStyle={{ fontSize: '10px' }}
      />
      <ProtectRewardsInfo>
        <Sprite id="protect-rewards-info-icon" width={200} height={150} />
        <ProtectRewardsContent>
          <Typography fontFamily="bold" style={{ fontSize: '22px' }}>
            Protect Rewards
          </Typography>
          <Typography style={{ filter: 'brightness(60%)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </Typography>
          <Typography
            tag="a"
            style={{
              color: STYLES.palette.colors.linkBlue,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            See more&nbsp;
            <Sprite id="top-right-arrow" width={20} height={20} />
          </Typography>
        </ProtectRewardsContent>
      </ProtectRewardsInfo>
    </GraphContainer>
  )
}

export default GraphArea
