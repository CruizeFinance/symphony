import styled, { keyframes } from 'styled-components'
import { rem } from '../../utils'
import STYLES from '../../style/styles.json'

const loading = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`
const Component = styled.div`
  display: inline-block;
  width: ${rem(40)};
  height: ${rem(40)};
  border: ${rem(3)} solid ${STYLES.palette.colors.white};
  border-radius: 50%;
  border-top-color: ${STYLES.palette.colors.logoBlue};
  animation: ${loading} 1s linear infinite;
`

/*
 * Loader
 * Returns a loader
 */
const Loader = () => <Component />

export default Loader
