import { useRef, useState } from 'react'
import { chain, useFeeData } from 'wagmi'
import { Sprite, Typography } from '../../components'
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

/*
 * Network Dropdown
 * Shows the network the user is currently connected to along with the gas price on the network
 * Is displayed only when the user is connected on the app
 */
const NetworkDropdown = () => {
  // web3 hook
  const { data: gasData } = useFeeData({
    chainId: chain.goerli.id,
    formatUnits: 'gwei',
    watch: true,
  })

  // state hook
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false)

  // hooks written to close the dropdown when clicked outside
  const networkRef = useRef(null)
  useOutsideAlerter(networkRef, () => setShowNetworkDropdown(false))

  return (
    <DropdownArea ref={networkRef}>
      <MobileHeaderTab
        onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
      >
        <Typography
          fontFamily="medium"
          style={{ display: 'flex', gap: rem(10) }}
        >
          <Sprite id="eth-asset-icon" width={20} height={20} />
          Goerli
        </Typography>
        <Sprite
          id="chevron-down"
          width={12}
          height={12}
          {...(showNetworkDropdown
            ? { style: { transform: 'rotate(180deg)' } }
            : undefined)}
        />
      </MobileHeaderTab>
      <DesktopHeaderTab>
        <ConnectedButton
          onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
        >
          <Sprite id="eth-asset-icon" width={20} height={20} />
          <Typography>Goerli</Typography>
          <Sprite
            id="chevron-down"
            width={12}
            height={12}
            {...(showNetworkDropdown
              ? { style: { transform: 'rotate(180deg)' } }
              : undefined)}
          />
        </ConnectedButton>
      </DesktopHeaderTab>
      {showNetworkDropdown ? (
        <HeaderDropdown style={{ gap: rem(2) }} dropdownWidth={250}>
          <Section>
            <DropdownContent>
              <DropdownLabel>
                <Typography fontFamily="medium">Goerli</Typography>
                <Sprite id="eth-asset-icon" width={20} height={20} />
              </DropdownLabel>
              <DropdownLabel>
                <Typography
                  style={{
                    fontSize: rem(14),
                    filter: 'brightness(80%)',
                    display: 'flex',
                  }}
                >
                  <>
                    <Sprite
                      id="gas-icon"
                      width={16}
                      height={16}
                      style={{ marginRight: rem(8) }}
                    />
                    {gasData?.formatted.gasPrice} gwei
                  </>
                </Typography>
              </DropdownLabel>
            </DropdownContent>
          </Section>
        </HeaderDropdown>
      ) : null}
    </DropdownArea>
  )
}

export default NetworkDropdown