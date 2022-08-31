import sprite from './icons.svg';

interface SpriteProps {
    height: number,
    width: number,
    id: string,
    style?: React.CSSProperties,
    className?: string
}

const Sprite = ({ height, width, style, className, id }: SpriteProps) => {
    return <svg
      height={`${height}px`}
      width={`${width}px`}
      viewBox={`0 0 ${width} ${height}`}
      style={{ ...style }}
      className={className || ""}
    >
      <use href={`${sprite}#${id}`} />
    </svg>
}

export default Sprite;
