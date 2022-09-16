import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { vw } from '../../utils'
import { Sprite } from '..'

interface StyleProps {
  borderRadius?: number
}

const ButtonContainer = styled.button<StyleProps>`
  border-radius: ${(props) =>
    props.borderRadius ? `${vw(props.borderRadius)}` : vw(100)};
  padding: ${vw(16)} ${vw(32)};
  font-family: ${STYLES.typography.fonts.semiBold};
  font-size: ${vw(16)};
  color: ${STYLES.palette.colors.black};
  background: ${STYLES.palette.colors.white};
  display: flex;
  align-items: center;
  gap: ${vw(10)};
  border: ${vw(1)} solid ${STYLES.palette.colors.black};
  cursor: pointer;

  &:hover {
    background: ${STYLES.palette.colors.black};
    border: ${vw(1)} solid ${STYLES.palette.colors.white};
    color: ${STYLES.palette.colors.white};

    svg {
      fill: ${STYLES.palette.colors.white};
    }
  }
`

const ProtectButton = styled(ButtonContainer)`
  background: ${STYLES.palette.colors.logoBlue};
  color: ${STYLES.palette.colors.white};
  border: ${vw(1)} solid ${STYLES.palette.colors.logoBlue};
  padding: 0px;
  width: 100%;
  justify-content: center;
  border-radius: ${vw(8)};
  position: relative;
  min-height: ${vw(48)};

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

const Button = ({
  children,
  onClick,
  borderRadius,
  style,
  buttonType,
}: ButtonProps) => {
  switch (buttonType) {
    case 'protect':
      return (
        <ProtectButton
          onClick={onClick}
          borderRadius={borderRadius}
          style={{ ...style }}
        >
          {children}
          <Sprite
            id="protect-button-svg"
            height={48}
            width={61}
            style={{ position: 'absolute', right: vw(10) }}
          />
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
