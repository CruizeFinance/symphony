export const vw = (px: number | string) => {
  return typeof px === 'number'
    ? `${(100 * px) / window.innerWidth}vw`
    : `${(100 * parseInt(px.split('px')[0])) / window.innerWidth}vw`
}
