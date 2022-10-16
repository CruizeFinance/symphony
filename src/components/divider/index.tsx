import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { rem } from '../../utils'
import { Sprite, Typography } from '..'
import { CSSProperties } from 'react'

// style interface
interface StyleProps {
  thickness?: number
  type?: 'dashed' | 'dotted' | 'solid'
  color?: string
  dividerWidth?: string
}

const Container = styled.div<StyleProps>`
  position: relative;
  width: ${(props) => props.dividerWidth || '100%'};
  display: flex;
  align-items: center;
`

const HR = styled.hr<StyleProps>`
  border: none;
  border-top: ${(props) =>
      props.thickness ? `${rem(props.thickness)}` : rem(1)}
    ${(props) => props.type || 'solid'}
    ${(props) => props.color || STYLES.palette.colors.dividerStroke};
  width: 100%;
`

// divider label interface
interface LabelOptions extends StyleProps {
  label?: string
  labelAlign?: 'left' | 'right' | 'center'
  dropdown?: boolean
  dropdownOpen?: boolean
  fontFamily?: 'extraBold' | 'bold' | 'semiBold' | 'medium' | 'regular'
  color?: string
  fontSize?: number
}

const LabelContainer = styled.div<LabelOptions>`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.labelAlign || 'left'};

  label {
    padding: ${rem(4)} ${rem(16)};
    backdrop-filter: brightness(0);
    border: ${rem(1)} solid
      ${(props) => props.color || STYLES.palette.colors.dividerStroke};
    border-radius: ${rem(4)};
    display: flex;
    align-items: center;
    gap: ${rem(10)};
    cursor: ${(props) => (props.dropdown ? 'pointer' : 'default')};
  }
`

// divider interface
interface DividerProps extends StyleProps {
  onClick?: () => void
  labelOptions?: LabelOptions
  style?: CSSProperties
}

/*
 * Divider
 * Can work as a standard hr tag
 * Can also work as a clickable label
 */
const Divider = ({
  onClick,
  labelOptions,
  thickness,
  type,
  color,
  style
}: DividerProps) => {
  if (labelOptions && labelOptions.label) {
    return (
      <Container onClick={onClick} style={{ ...style }}>
        <LabelContainer
          labelAlign={labelOptions.labelAlign}
          dropdown={labelOptions.dropdown}
        >
          <Typography
            tag="label"
            fontFamily={labelOptions.fontFamily}
            color={labelOptions.color}
            style={{ fontSize: rem(labelOptions.fontSize || 14) }}
          >
            {labelOptions.label}
            {labelOptions.dropdown ? (
              <Sprite
                id="chevron-down"
                width={12}
                height={7}
                {...(labelOptions.dropdownOpen
                  ? { style: { transform: 'rotate(180deg)' } }
                  : undefined)}
              />
            ) : null}
          </Typography>
        </LabelContainer>
        <HR thickness={thickness} type={type} color={color} />
      </Container>
    )
  }

  return (
    <HR thickness={thickness} type={type} color={color} onClick={onClick} style={{ ...style }} />
  )
}

export default Divider
