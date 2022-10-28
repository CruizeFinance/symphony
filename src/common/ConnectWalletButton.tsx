import { ConnectKitButton } from 'connectkit'
import { Button, Sprite } from '../components'
import { rem } from '../utils'

// Connect Wallet Button Props
interface ConnectWalletButtonProps {
  buttonLabel?: string
  showIcon?: boolean
  style?: React.CSSProperties
}

/*
 * Connect Wallet Button Component
 * A simple button that can be reused to connect wallet
 */
const ConnectWalletButton = ({
  buttonLabel,
  showIcon,
  style
}: ConnectWalletButtonProps) => (
  <ConnectKitButton.Custom>
    {({ show }) => {
      return (
        <Button onClick={show} style={{ padding: `${rem(8)} ${rem(16)}`, ...style }}>
          {showIcon ? (
            <Sprite id="connect-wallet-black" width={16} height={16} />
          ) : null}
          {buttonLabel || 'Connect Wallet'}
        </Button>
      )
    }}
  </ConnectKitButton.Custom>
)

export default ConnectWalletButton
