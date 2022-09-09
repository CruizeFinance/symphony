import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts'
import styled from 'styled-components'
import { Select, Sprite, Tabs, Typography } from '../../components'
import STYLES from '../../style/styles.json'

const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`
const AssetSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const DropdownArea = styled(GraphContainer)`
  align-items: flex-start;
  gap: 10px;
`
const ProtectRewardsInfo = styled.div`
  padding: 20px;
  border-radius: 8px;
  border: none;
  background: ${STYLES.palette.colors.inputBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`
const ProtectRewardsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]
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
  return (
    <GraphContainer>
      <AssetSection>
        <DropdownArea>
          <Select
            options={options}
            onChange={(val) => console.log(val)}
            pickerStyle={{ background: 'inherit' }}
          />
          <Typography tag="h1" style={{ filter: 'brightness(40%)' }}>
            $1,566.00&nbsp;
            <Typography
              tag="label"
              color={STYLES.palette.colors.green}
              style={{ fontSize: '16px', filter: 'brightness(100%)' }}
            >
              +23%&nbsp;
              <Typography tag="label">(24h)</Typography>
            </Typography>
          </Typography>
        </DropdownArea>
        <Tabs
          onClick={(val) => console.log(val)}
          tabs={[
            {
              label: 'ETH',
              icon: <Sprite id="info-icon" width={20} height={20} />,
            },
            {
              label: 'crETH',
              icon: <Sprite id="info-icon" width={20} height={20} />,
            },
          ]}
          type="contained"
        />
      </AssetSection>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
      <Tabs
        onClick={(val) => console.log(val)}
        tabs={[
          {
            label: '1H',
          },
          {
            label: '1D',
          },
          {
            label: '3D',
          },
          {
            label: '1M',
          },
          {
            label: '1Y',
          },
        ]}
        type="filled"
        containerStyle={{ alignSelf: 'end' }}
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
