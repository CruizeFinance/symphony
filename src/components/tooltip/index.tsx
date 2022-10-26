import { useState } from 'react'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { rem } from '../../utils'

// style interface
interface StyleProps {
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const Container = styled.span`
  display: inline-block;
  position: relative;
  top: ${rem(2)};
`

const TooltipArea = styled.span<StyleProps>`
  background: ${STYLES.palette.colors.inputBackground};
  color: ${STYLES.palette.colors.white};
  padding: ${rem(12)};
  border-radius: ${rem(8)};
  position: absolute;
  font-size: ${rem(12)};
  line-height: 1;
  z-index: 100;
  white-space: nowrap;
  cursor: pointer;
  ${(props) =>
    props.position === 'top'
      ? `
    bottom: 100%;
  `
      : props.position === 'left'
      ? `
    bottom: -150%;
    right: 100%;
  `
      : props.position === 'right'
      ? `
    bottom: -150%;
    left: 100%;
  `
      : `top: 100%;`}
`

// tooltip interface
interface TooltipProps extends StyleProps {
  children: React.ReactNode
  content: React.ReactNode
  style?: React.CSSProperties
}

/*
 * Tooltip
 * Used to display extra information to explain jargons or a particular term
 */
const Tooltip = ({ children, content, position, style }: TooltipProps) => {
  // state hook
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Container
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip ? (
        <TooltipArea style={{ ...style }} position={position || 'bottom'}>
          {content}
        </TooltipArea>
      ) : null}
    </Container>
  )
}

export default Tooltip
