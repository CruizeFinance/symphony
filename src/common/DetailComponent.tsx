import { Sprite, Tooltip, Typography } from '../components'
import { rem } from '../utils'
import STYLES from '../style/styles.json'
import styled from 'styled-components'

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  p {
    display: flex;
    align-items: center;
    gap: ${rem(4)};
  }
`

// props that can be passed to the detail component
interface DetailComponentProps {
  label: string
  value: React.ReactNode
  tooltipContent?: string
  style?: React.CSSProperties
}

/*
 * Pure component created to display the protection details
 */
const DetailComponent = ({
  label,
  value,
  tooltipContent,
  style
}: DetailComponentProps) => (
  <Detail style={{ ...style }}>
    <Typography
      fontFamily="regular"
      color={STYLES.palette.colors.white60}
      style={{ lineHeight: '20.8px' }}
    >
      {label}
      {tooltipContent ? (
        <Tooltip content={tooltipContent}>
          <Sprite id="info-icon" width={20} height={20} />
        </Tooltip>
      ) : null}
    </Typography>
    <Typography
      fontFamily="regular"
      color={STYLES.palette.colors.white60}
      style={{
        fontSize: rem(12),
        lineHeight: '15.6px',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {value}
    </Typography>
  </Detail>
)

export default DetailComponent
