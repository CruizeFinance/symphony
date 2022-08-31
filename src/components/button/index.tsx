import styled from 'styled-components'
import STYLES from '../../style/styles.json'

interface StyleProps {
  borderRadius?: number
}

const ButtonContainer = styled.button<StyleProps>`
  border-radius: ${(props) =>
    props.borderRadius ? `${props.borderRadius}px` : '100px'};
  padding: 16px 32px;
  font-family: ${STYLES.typography.fonts.semiBold};
  font-size: 16px;
  color: ${STYLES.palette.colors.black};
  background: ${STYLES.palette.colors.white};
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  cursor: pointer;
`

interface ButtonProps extends StyleProps {
  children: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}

const Button = ({ children, onClick, borderRadius, style }: ButtonProps) => {
  return (
    <ButtonContainer
      onClick={onClick}
      borderRadius={borderRadius}
      style={{ ...style }}
    >
      {children}
    </ButtonContainer>
  )
}

export default Button
