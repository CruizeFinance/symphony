import styled from 'styled-components'
import STYLES from '../../style/styles.json'

interface StyleProps {
  fontFamily?: 'extraBold' | 'bold' | 'semiBold' | 'medium' | 'regular'
  color?: string
}

const H1 = styled.h1<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const H2 = styled.h2<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const H3 = styled.h3<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const H4 = styled.h4<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const H5 = styled.h5<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const H6 = styled.h6<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const P = styled.p<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const Label = styled.label<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
`

const A = styled.a<StyleProps>`
  font-family: ${(props) =>
    STYLES.typography.fonts[props.fontFamily || 'regular']};
  color: ${(props) => props.color || STYLES.palette.colors.white};
  cursor: pointer;
  text-decoration: none;
`

interface TypographyProps extends StyleProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label' | 'a'
  children: React.ReactNode
  style?: React.CSSProperties
  href?: string
  openInNewTab?: boolean
}

const Typography = ({
  fontFamily,
  tag,
  children,
  style,
  href,
  openInNewTab,
}: TypographyProps) => {
  switch (tag) {
    case 'h1':
      return (
        <H1 fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </H1>
      )
    case 'h2':
      return (
        <H2 fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </H2>
      )
    case 'h3':
      return (
        <H3 fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </H3>
      )
    case 'h4':
      return (
        <H4 fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </H4>
      )
    case 'h5':
      return (
        <H5 fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </H5>
      )
    case 'h6':
      return (
        <H6 fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </H6>
      )
    case 'p':
      return (
        <P fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </P>
      )
    case 'label':
      return (
        <Label fontFamily={fontFamily} style={{ ...style }}>
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
        >
          {children}
        </A>
      )
    default:
      return (
        <P fontFamily={fontFamily} style={{ ...style }}>
          {children}
        </P>
      )
  }
}

export default Typography
