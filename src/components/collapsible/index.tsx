import styled from 'styled-components'
import { rem } from '../../utils'

interface StyleProps {
  open: boolean
  maxHeight?: number
}

const Container = styled.div<StyleProps>`
  ${(props) => props.open ? '' : 'overflow: hidden;'}
  width: 100%;
  transition: all 0.7s ease-in-out;
  max-height: ${(props) =>
    props.open ? (props.maxHeight ? `${rem(props.maxHeight)}` : rem(500)) : '0px'};
`

interface CollapsibleProps extends StyleProps {
  children: React.ReactNode
}

const Collapsible = ({ children, open, maxHeight }: CollapsibleProps) => {
  return (
    <Container open={open} maxHeight={maxHeight}>
      {children}
    </Container>
  )
}

export default Collapsible
