import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { rem } from '../../utils'
import STYLES from '../../style/styles.json'
import styled from 'styled-components'
import { Typography } from '../../components'

const graphData = [
  {
    time: '2022-09-30',
    signUps: 2,
  },
  {
    time: '2022-10-02',
    signUps: 3,
  },
  {
    time: '2022-10-07',
    signUps: 89,
  },
  {
    time: '2022-10-08',
    signUps: 422,
  },
  {
    time: '2022-10-09',
    signUps: 1335,
  },
  {
    time: '2022-10-10',
    signUps: 3499,
  },
  {
    time: '2022-10-11',
    signUps: 21264,
  },
  {
    time: '2022-10-12',
    signUps: 22190,
  },
  {
    time: '2022-10-13',
    signUps: 22526,
  },
  {
    time: '2022-10-14',
    signUps: 22763,
  },
  {
    time: '2022-10-15',
    signUps: 22859,
  },
  {
    time: '2022-10-16',
    signUps: 23078,
  },
  {
    time: '2022-10-17',
    signUps: 24556,
  },
  {
    time: '2022-10-18',
    signUps: 24599,
  },
  {
    time: '2022-10-19',
    signUps: 24628,
  },
  {
    time: '2022-10-20',
    signUps: 50198,
  },
  {
    time: '2022-10-21',
    signUps: 50943,
  },
  {
    time: '2022-10-22',
    signUps: 50954,
  },
  {
    time: '2022-10-23',
    signUps: 50973,
  },
  {
    time: '2022-10-24',
    signUps: 50979,
  },
  {
    time: '2022-10-25',
    signUps: 50989,
  },
  {
    time: '2022-10-26',
    signUps: 51017,
  },
  {
    time: '2022-10-27',
    signUps: 51020,
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
