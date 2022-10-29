import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { rem } from '../../utils'

// style interface
interface StyleProps {
  fontFamily?: 'extraBold' | 'bold' | 'semiBold' | 'medium' | 'regular'
  color?: string
}

const H1 = styled.h1<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(32)};
`

const H2 = styled.h2<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(24)};
`

const H3 = styled.h3<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(19)};
`

const H4 = styled.h4<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(18)};
`

const H5 = styled.h5<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(16)};
`

const H6 = styled.h6<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(13)};
`

const P = styled.p<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(16)};
`

const Label = styled.label<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(16)};
`

const A = styled.a<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) =>
    props.color ? props.color : STYLES.palette.colors.white};
  cursor: pointer;
  text-decoration: none;
  font-size: ${rem(16)};
`

const SPAN = styled.span<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: inherit;
  font-size: ${rem(14)};
`

// typography interface
interface TypographyProps extends StyleProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label' | 'a' | 'span'
  children: React.ReactNode
  style?: React.CSSProperties
  href?: string
  openInNewTab?: boolean
  onClick?: () => void
  id?: string
}

/*
 * Typography
 * Render the standard font tags to display content
 */
const Typography = ({
  fontFamily,
  tag,
  children,
  style,
  href,
  color,
  openInNewTab,
  onClick,
  id,
}: TypographyProps) => {
  switch (tag) {
    case 'h1':
      return (
        <H1
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </H1>
      )
    case 'h2':
      return (
        <H2
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </H2>
      )
    case 'h3':
      return (
        <H3
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </H3>
      )
    case 'h4':
      return (
        <H4
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </H4>
      )
    case 'h5':
      return (
        <H5
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </H5>
      )
    case 'h6':
      return (
        <H6
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </H6>
      )
    case 'label':
      return (
        <Label
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </Label>
      )
    case 'a':
      return (
        <A
          fontFamily={fontFamily}
          style={{ ...style }}
          href={href}
          rel="noopener noreferrer"
          {...(openInNewTab ? { target: '_blank' } : undefined)}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </A>
      )
    case 'span':
      return (
        <SPAN
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </SPAN>
      )
    default:
      return (
        <P
          fontFamily={fontFamily}
          style={{ ...style }}
          color={color}
          onClick={onClick}
          id={id}
        >
          {children}
        </P>
      )
  }
}

export default Typography
