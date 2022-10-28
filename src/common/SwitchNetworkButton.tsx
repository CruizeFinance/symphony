import { chain, useSwitchNetwork } from 'wagmi'
import { Button, Sprite } from '../components'
import { rem } from '../utils'

// Switch Network Button Props
interface SwitchNetworkButtonProps {
  style?: React.CSSProperties
}

/*
 * Switch Network Button
 * a common component to switch network back to supported network
 */
const SwitchNetworkButton = ({ style }: SwitchNetworkButtonProps) => {
  //web3 hook
  const { switchNetwork } = useSwitchNetwork()

  return (
    <Button
      borderRadius={8}
      style={{ padding: `${rem(8)} ${rem(16)}`, width: '100%', ...style }}
      onClick={() => switchNetwork?.(chain.goerli.id)}
    >
      Switch Network
      <Sprite id="switch-network-icon" width={16} height={16} />
    </Button>
  )
}

export default SwitchNetworkButton
