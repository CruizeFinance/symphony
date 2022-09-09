import styled from 'styled-components'

interface StyleProps {
  open: boolean
  maxHeight?: number
}

const Container = styled.div<StyleProps>`
  overflow: hidden;
  width: 100%;
  transition: all 0.7s ease-in-out;
  max-height: ${(props) =>
    props.open ? (props.maxHeight ? `${props.maxHeight}px` : '500px') : '0px'};
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
