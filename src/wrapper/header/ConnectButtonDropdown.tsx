import { useRef, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { ConnectWalletButton } from '../../common'
import { Button, Sprite, Typography } from '../../components'
import { useOutsideAlerter } from '../../hooks'
import { rem } from '../../utils'
import {
  ConnectedButton,
  DesktopHeaderTab,
  DropdownArea,
  DropdownContent,
  DropdownLabel,
  HeaderDropdown,
  MobileHeaderTab,
  Section,
} from './DropdownStyledComponents'
import STYLES from '../../style/styles.json'

/*
 * Connect Button Dropdown
 * Shows the wallet information, address and a disconnect button when connected
 * Shows the connect button when the user is not connected
 */
const ConnectButtonDropdown = () => {
  // web3 hooks
  const { connector, address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  // state hook
  const [showButtonDropdown, setShowButtonDropdown] = useState(false)

  // hooks written to close the dropdown when clicked outside
  const connectButtonRef = useRef(null)
  useOutsideAlerter(connectButtonRef, () => setShowButtonDropdown(false))

  return isConnected ? (
    <DropdownArea ref={connectButtonRef}>
      <MobileHeaderTab
        onClick={() => setShowButtonDropdown(!showButtonDropdown)}
      >
        <Typography
          fontFamily="medium"
          style={{ display: 'flex', gap: rem(10) }}
        >
          {address?.slice(0, 7)}...{address?.slice(-7)}
        </Typography>
        <Sprite
          id="chevron-down"
          width={12}
          height={12}
          {...(showButtonDropdown
            ? { style: { transform: 'rotate(180deg)', color: STYLES.palette.colors.white } }
            : undefined)}
        />
      </MobileHeaderTab>
      <DesktopHeaderTab>
        <ConnectedButton
          onClick={() => setShowButtonDropdown(!showButtonDropdown)}
        >
          <Typography style={{ lineHeight: '24px' }}>
            {address?.slice(0, 7)}...{address?.slice(-7)}
          </Typography>
          <Sprite
            id="chevron-down"
            width={12}
            height={12}
            {...(showButtonDropdown
              ? { style: { transform: 'rotate(180deg)', color: STYLES.palette.colors.white } }
              : undefined)}
          />
        </ConnectedButton>
      </DesktopHeaderTab>
      {showButtonDropdown ? (
        <HeaderDropdown style={{ gap: rem(2) }} dropdownWidth={250}>
          <Section>
            <DropdownContent>
              <DropdownLabel>
                <Typography fontFamily="medium">
                  {address?.slice(0, 8)}...{address?.slice(-4)}
                </Typography>
              </DropdownLabel>
              <DropdownLabel>
                <Typography
                  style={{
                    fontSize: rem(14),
                    filter: 'brightness(80%)',
                  }}
                >
                  Connected with {connector?.name}
                </Typography>
                <Sprite
                  id={`${connector?.id?.toLowerCase()}-icon`}
                  width={16}
                  height={16}
                />
              </DropdownLabel>
            </DropdownContent>
          </Section>
          <Section>
            <DropdownContent>
              <DropdownLabel>
                <Typography fontFamily="medium">Copy Address</Typography>
                <Sprite
                  id="copy-icon"
                  width={16}
                  height={16}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigator.clipboard.writeText(address || '')}
                />
              </DropdownLabel>
              <DropdownLabel>
                <Typography
                  style={{
                    fontSize: rem(14),
                    filter: 'brightness(80%)',
                  }}
                >
                  View on Etherscan
                </Typography>
                <Typography
                  tag="a"
                  openInNewTab={true}
                  href="https://goerli.etherscan.io/address/0x671b4709Be7aF1626d033B3e82A508789a5b9B0f#code"
                >
                  <Sprite id="redirect-icon" width={16} height={16} />
                </Typography>
              </DropdownLabel>
              <Button
                onClick={() => disconnect()}
                borderRadius={10}
                style={{ width: '100%' }}
              >
                Disconnect
                <Sprite id="disconnect-icon" width={16} height={16} />
              </Button>
            </DropdownContent>
          </Section>
        </HeaderDropdown>
      ) : null}
    </DropdownArea>
  ) : (
    <ConnectWalletButton buttonLabel='Connect' showIcon={true} />
  )
}

export default ConnectButtonDropdown
