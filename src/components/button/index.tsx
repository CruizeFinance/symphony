import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { rem } from '../../utils'
import { Sprite } from '..'

interface StyleProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  borderRadius?: number
}

const ButtonContainer = styled.button<StyleProps>`
  border-radius: ${(props) =>
    props.borderRadius ? `${rem(props.borderRadius)}` : rem(100)};
  padding: ${rem(16)} ${rem(32)};
  font-family: ${STYLES.typography.fonts.semiBold};
  font-size: ${rem(16)};
  color: ${STYLES.palette.colors.black};
  background: ${STYLES.palette.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${rem(10)};
  border: ${rem(1)} solid ${STYLES.palette.colors.black};
  filter: brightness(${(props) => (props.disabled ? '20%' : '100%')});
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${(props) =>
    !props.disabled
      ? `&:hover {
    background: ${STYLES.palette.colors.black};
    border: ${rem(1)} solid ${STYLES.palette.colors.white};
    color: ${STYLES.palette.colors.white};

    svg {
      fill: ${STYLES.palette.colors.white};
    }
  }`
      : ''}
`

const ProtectButton = styled(ButtonContainer)`
  background: ${STYLES.palette.colors.logoBlue};
  color: ${STYLES.palette.colors.white};
  border: ${rem(1)} solid ${STYLES.palette.colors.logoBlue};
  padding: 0px;
  width: 100%;
  justify-content: center;
  border-radius: ${(props) =>
    props.borderRadius ? `${rem(props.borderRadius)}` : rem(100)};
  position: relative;
  min-height: ${rem(48)};

  ${(props) =>
    !props.disabled
      ? `&:hover {
    background: ${STYLES.palette.colors.logoBlue};
    filter: brightness(1.2);
  }`
      : ''}
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
  disabled,
}: ButtonProps) => {
  console.log(children, disabled)

  switch (buttonType) {
    case 'protect':
      return (
        <ProtectButton
          {...(!disabled ? { onClick: onClick } : undefined)}
          borderRadius={borderRadius}
          style={{ ...style }}
          disabled={disabled}
        >
          {children}
          <Sprite
            id="protect-button-svg"
            height={48}
            width={61}
            style={{ position: 'absolute', right: rem(24) }}
          />
        </ProtectButton>
      )
    case 'protect-small':
      return (
        <ProtectButton
          {...(!disabled ? { onClick: onClick } : undefined)}
          borderRadius={borderRadius}
          style={{ ...style }}
          disabled={disabled}
        >
          {children}
        </ProtectButton>
      )
    default:
      return (
        <ButtonContainer
          {...(!disabled ? { onClick: onClick } : undefined)}
          borderRadius={borderRadius}
          style={{ ...style }}
          disabled={disabled}
        >
          {children}
        </ButtonContainer>
      )
  }
}

export default Button
