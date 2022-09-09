import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import Sprite from '../sprite'

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
  border: 1px solid ${STYLES.palette.colors.black};
  cursor: pointer;

  &:hover {
    background: ${STYLES.palette.colors.black};
    border: 1px solid ${STYLES.palette.colors.white};
    color: ${STYLES.palette.colors.white};

    svg {
      fill: ${STYLES.palette.colors.white};
    }
  }
`

const ProtectButton = styled(ButtonContainer)`
  background: ${STYLES.palette.colors.logoBlue};
  color: ${STYLES.palette.colors.white};
  border: 1px solid ${STYLES.palette.colors.logoBlue};
  padding: 0px;
  width: 100%;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  min-height: 48px;

  &:hover {
    background: ${STYLES.palette.colors.logoBlue};
    filter: brightness(1.2);
  }
`

interface ButtonProps extends StyleProps {
  children: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
  buttonType?: 'protect-small' | 'protect'
}

const Button = ({ children, onClick, borderRadius, style,  buttonType }: ButtonProps) => {
  switch (buttonType) {
    case 'protect':
      return (
        <ProtectButton
          onClick={onClick}
          borderRadius={borderRadius}
          style={{ ...style }}
        >
          {children}
          <Sprite id='protect-button-svg' height={48} width={61} style={{ position: 'absolute', right: '10px' }} />
        </ProtectButton>
      )
    default:
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
  
}

export default Button
