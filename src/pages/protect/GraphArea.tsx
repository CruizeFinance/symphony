import { useContext, useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import styled from 'styled-components'
import { getMarketChartData } from '../../apis'
import { MarketChartRangeData } from '../../apis/interfaces'
import { AssetDropdown, Sprite, Tabs, Typography } from '../../components'
import { AppContext } from '../../context'
import { Actions } from '../../context/Action'
import { AssetDropdownOptions } from '../../enums'
import STYLES from '../../style/styles.json'
import { ASSET_GRAPH_API_PARAMS, DROPDOWN_OPTIONS, rem } from '../../utils'

const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${rem(30)};
  width: 60%;

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
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
const GraphLoadingArea = styled.div`
  height: ${rem(400)};
  width: 100%;
  position: relative;

  @media only screen and (max-width: 1024px) {
    height: ${rem(350)};
  }

  @media only screen and (max-width: 800px) {
    height: ${rem(300)};
  }
`
const GraphLoading = styled.div`
  &:before {
    content: '';
    background: ${STYLES.palette.colors.black};
    box-shadow: 0px ${rem(3.57333)} ${rem(7.14667)} rgba(245, 205, 82, 0.4);
    height: ${rem(40)};
    transform: skewY(-2deg);
    position: absolute;
    left: 0;
    right: 0;
    top: ${rem(-20)};
  }

  position: relative;
  top: 50%;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.1) 19.5%,
    rgba(255, 255, 255, 0.024) 100%
  );
`

const GraphArea = () => {
  const [state, dispatch] = useContext(AppContext)
  const [asset, setAsset] = useState(
    ASSET_GRAPH_API_PARAMS[
      state.selectedAsset.label as keyof typeof ASSET_GRAPH_API_PARAMS
    ],
  )
  const [range, setRange] = useState(1)
  const [chartData, setChartData] = useState<MarketChartRangeData>({
    prices: [],
    error: null,
  })
  const [loadingGraph, setLoadingGraph] = useState(false)

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
      case AssetDropdownOptions.WBTC:
        setAsset('bitcoin')
        break
      default:
        setAsset('ethereum')
        break
    }
  }

  async function chartApiCall() {
    setLoadingGraph(true)
    const data = await getMarketChartData(asset, range)
    if (data.prices.length) setChartData(data)
    setLoadingGraph(false)
  }

  useEffect(() => {
    onAssetChange(state.selectedAsset.label)
  }, [state.selectedAsset])

  useEffect(() => {
    chartApiCall()
  }, [asset, range])

  const graphData = useMemo(() => {
    const prices = chartData.prices.map((price) => price[1])
    const priceFloor = Math.max(...prices) * 0.85
    dispatch({ type: Actions.STORE_PRICE_FLOOR, payload: priceFloor })
    return chartData.prices.map((price) => {
      return {
        eth: price[1],
      }
    })
  }, [chartData])

  return (
    <GraphContainer>
      <AssetSection>
        <DropdownArea>
          <AssetDropdown
            options={DROPDOWN_OPTIONS.map((option) => {
              return {
                ...option,
                pickerLabel:
                  option.label === AssetDropdownOptions.ETH
                    ? 'Ethereum (ETH)'
                    : option.label === AssetDropdownOptions.WETH
                    ? 'Wrapped Ethereum (WETH)'
                    : 'Wrapped Bitcoin (WBTC)',
              }
            })}
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
            hidePickerIcon={true}
          />
          <Typography tag="h1" style={{ filter: 'brightness(40%)' }}>
            {state.assetPrice ? `$${state.assetPrice?.toFixed(2)}` : '-'}
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
      {loadingGraph ? (
        <GraphLoadingArea>
          <GraphLoading />
          <Typography
            style={{
              fontSize: '12px',
              position: 'absolute',
              top: '60%',
              left: '50%',
            }}
          >
            Loading...
          </Typography>
        </GraphLoadingArea>
      ) : (
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
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
          </AreaChart>
        </ResponsiveContainer>
      )}
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
      {/* Hidden for demo */}
      {/* <ProtectRewardsInfo>
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
      </ProtectRewardsInfo> */}
    </GraphContainer>
  )
}

export default GraphArea
