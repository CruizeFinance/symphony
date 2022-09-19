import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'
import { Select, Sprite, Tabs, Typography } from '../../components'
import STYLES from '../../style/styles.json'
import { vw } from '../../utils'

const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${vw(30)};
`
const AssetSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${vw(30)};
  }
`
const DropdownArea = styled(GraphContainer)`
  align-items: flex-start;
  gap: ${vw(10)};
`
const ProtectRewardsInfo = styled.div`
  padding: ${vw(20)};
  border-radius: ${vw(8)};
  border: none;
  background: ${STYLES.palette.colors.inputBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(20)};

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
  gap: ${vw(10)};
`

const data = [
  {
    name: 'Page A',
    eth: 4000,
    crEth: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    eth: 3000,
    crEth: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    eth: 2000,
    crEth: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    eth: 2780,
    crEth: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    eth: 1890,
    crEth: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    eth: 2390,
    crEth: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    eth: 3490,
    crEth: 4300,
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
            pickerStyle={{
              background: 'inherit',
              padding: '0px',
            }}
            labelStyle={{
              fontSize: '32px',
              width: '15ch',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          />
          <Typography tag="h1" style={{ filter: 'brightness(40%)' }}>
            $1,566.00&nbsp;
            <Typography
              tag="label"
              color={STYLES.palette.colors.green}
              style={{ filter: 'brightness(100%)' }}
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
              icon: <Sprite id="info-icon" width={15} height={15} />,
            },
            {
              label: 'crETH',
              icon: <Sprite id="info-icon" width={15} height={15} />,
            },
          ]}
          type="contained"
        />
      </AssetSection>
      <ResponsiveContainer
        minHeight={
          window.innerWidth <= 800
            ? 300
            : window.innerWidth === 1024
            ? 350
            : 400
        }
      >
        <AreaChart data={data} style={{ position: 'relative', right: '10px' }}>
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
          <XAxis dataKey="name" style={{ fontSize: '0.75rem' }} />
          <YAxis style={{ fontSize: '0.75rem' }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="eth"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="crEth"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
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
