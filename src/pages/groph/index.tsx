import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { rem } from '../../utils'
import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import { Typography } from '../../components'

const graphData = [
  {
    time: '2022-09-30',
    signUps: 1,
  },
  {
    time: '2022-10-02',
    signUps: 2,
  },
  {
    time: '2022-10-07',
    signUps: 88,
  },
  {
    time: '2022-10-08',
    signUps: 412,
  },
  {
    time: '2022-10-09',
    signUps: 1319,
  },
  {
    time: '2022-10-10',
    signUps: 3284,
  },
  {
    time: '2022-10-11',
    signUps: 16662,
  },
  {
    time: '2022-10-12',
    signUps: 17025,
  },
  {
    time: '2022-10-13',
    signUps: 17044,
  },
  {
    time: '2022-10-18',
    signUps: 17045,
  },
  {
    time: '2022-10-21',
    signUps: 17047,
  },
  {
    time: '2022-10-26',
    signUps: 17050,
  },
  {
    time: '2022-10-27',
    signUps: 17051,
  },
]

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${rem(30)};
  align-items: flex-end;

  tspan {
    fill: white;
  }

  #sign-ups {
    position: absolute;
    left: -60px;
    top: 40%;
    transform: rotate(270deg);
  }

  #date {
    position: absolute;
    bottom: -30px;
    right: 45%;
  }
`

const Graph = () => {
  return (
    <Container>
      <ResponsiveContainer width={800} height={400}>
        <LineChart
          data={graphData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <YAxis style={{ fontSize: rem(12) }} />
          <XAxis
            style={{ fontSize: rem(12) }}
            dataKey={'time'}
            domain={['dataMin', 'dataMax']}
            interval={4}
          />
          <Line
            type="monotone"
            dataKey="signUps"
            stroke={STYLES.palette.colors.logoBlue}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </LineChart>
      </ResponsiveContainer>
      <Typography id="sign-ups">Sign Ups</Typography>
      <Typography id="date">Date</Typography>
    </Container>
  )
}

export default Graph
