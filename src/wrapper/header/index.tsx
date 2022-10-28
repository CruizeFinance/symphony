import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Sprite, Typography } from '../../components'
import { Modal } from '../../components'
import STYLES from '../../style/styles.json'
import { chain, useAccount, useSwitchNetwork } from 'wagmi'
import { CONTRACTS_CONFIG, rem } from '../../utils'
import RecentOrdersDropdown from './RecentOrdersDropdown'
import NetworkDropdown from './NetworkDropdown'
import ConnectButtonDropdown from './ConnectButtonDropdown'
import { AppContext } from '../../context'
import { ErrorModal } from '../../common'

// mobile interface
interface MobileProps {
  open: boolean
}

const Container = styled.div`
  position: fixed;
  padding: ${rem(20)} ${rem(66)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: -webkit-fill-available;
  backdrop-filter: blur(${rem(8)});
  z-index: 9999;
  border-bottom: 1px solid ${STYLES.palette.colors.dividerStroke};

  @media only screen and (max-width: 1024px) {
    padding: ${rem(16)};
  }
`
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(36)};
`
const DesktopArea = styled(LogoArea)`
  gap: ${rem(10)};

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
const ModalContent = styled(LogoArea)`
  justify-content: center;
  flex-direction: column;
  gap: ${rem(10)};
`
const Hamburger = styled.div`
  display: none;

  @media only screen and (max-width: 1024px) {
    display: block;
    cursor: pointer;
  }
`
const MobileHeader = styled.div<MobileProps>`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: ${(props) => (props.open ? '80vh' : rem(0))};
  top: ${rem(64)};
  left: 0;
  background: ${STYLES.palette.colors.black};
  transition: height ease 0.7s;
  backdrop-filter: blur(${rem(8)});
  ${(props) => (props.open ? `z-index: 9999` : '')};
`
const MobileHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

/*
 * App Header
 * Fixed to the top
 * Enables wallet connection and navigation
 */
const Header = () => {
  // context hook
  const [state] = useContext(AppContext)

  // object for fetching token contracts per chain
  const contractsConfig = CONTRACTS_CONFIG[state.chainId || chain.goerli.id]

  //web3 hook
  const { isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()

  // state hooks
  const [openConnectedModal, setOpenConnectedModal] = useState(false)
  const [openMobileHeader, setOpenMobileHeader] = useState(false)
  const [errorType, setErrorType] = useState<'error' | 'network'>('network')
  const [openErrorModal, setOpenErrorModal] = useState(false)

  /*
   * a function to hide the connected modal after 2 seconds
   */
  const hideModal = () => {
    const timeout = setTimeout(() => {
      setOpenConnectedModal(false)
      clearTimeout(timeout)
    }, 2000)
  }

  /*
   * add token
   * a function written to add wrapped cruize token to metamask against the selected asset
   */
  const addToken = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address:
              contractsConfig[
                state.selectedAsset.label as keyof typeof contractsConfig
              ]?.cruizeAddress || '', // The address that the token is at.
            symbol: `cr${state.selectedAsset.label}`, // A ticker symbol or shorthand, up to 5 chars.
            decimals:
              contractsConfig[
                state.selectedAsset.label as keyof typeof contractsConfig
              ]?.decimals || '', // The number of decimals in the token
          },
        },
      })
    } catch (error: any) {
      if (error.code !== 4001) {
        setErrorType('error')
        setOpenErrorModal(true)
      }
    }
  }

  /*
   * an effect to call the hide modal function
   */
  useEffect(() => {
    if (isConnected) {
      setOpenConnectedModal(true)
      hideModal()
    }
  }, [isConnected])

  /*
   * an effect to set the wrong network boolean
   */
  useEffect(() => {
    setErrorType('network')
    setOpenErrorModal(
      isConnected && !state.supportedChains.includes(state.chainId),
    )
  }, [state.chainId])

  return (
    <>
      <Container>
        <LogoArea>
          <Sprite id="cruize-beta-logo-icon" width={132} height={32} />
          {/* hidden for the beta release */}
          {/* <Typography
            fontFamily="extraBold"
            tag="h1"
            color={STYLES.palette.colors.logoBlue}\
          >
            Cruize
          </Typography> */}
        </LogoArea>
        <DesktopArea>
          {isConnected ? (
            <>
              {state.supportedChains.includes(state.chainId) &&
              state.isHolder === 'holder' ? (
                <>
                  <RecentOrdersDropdown />
                  <Button
                    buttonType="protect"
                    onClick={addToken}
                    style={{
                      fontSize: rem(16),
                      lineHeight: '24px',
                      padding: `${rem(8)} ${rem(16)}`,
                      fontFamily: STYLES.typography.fonts.regular,
                      minHeight: '-webkit-fill-available'
                    }}
                    borderRadius={100}
                  >
                    Add cr{state.selectedAsset.label} to MetaMask{' '}
                    <Sprite id="metamask-icon" width={20} height={20} />
                  </Button>
                </>
              ) : null}
              <NetworkDropdown />
            </>
          ) : null}
          <ConnectButtonDropdown />
        </DesktopArea>
        <Hamburger onClick={() => setOpenMobileHeader(!openMobileHeader)}>
          <Sprite
            id={openMobileHeader ? 'close-icon' : 'hamburger-icon'}
            height={24}
            width={24}
          />
        </Hamburger>
        <MobileHeader open={openMobileHeader}>
          <MobileHeaderContent>
            {isConnected ? (
              <>
                {state.supportedChains.includes(state.chainId) &&
                state.isHolder === 'holder' ? (
                  <>
                    <RecentOrdersDropdown />
                  </>
                ) : null}
                <NetworkDropdown />
              </>
            ) : null}
            <ConnectButtonDropdown />
          </MobileHeaderContent>
        </MobileHeader>
      </Container>
      <Modal open={openConnectedModal}>
        <ModalContent>
          <Sprite id="wallet-connected-icon" width={120} height={120} />
          <Typography
            tag="label"
            fontFamily="medium"
            style={{ fontSize: rem(18), lineHeight: '22px' }}
          >
            Connected
          </Typography>
        </ModalContent>
      </Modal>
      <ErrorModal
        open={openErrorModal}
        hide={() => setOpenErrorModal(false)}
        title={
          errorType === 'error'
            ? 'Oops, something went wrong.'
            : 'Oops, your wallet is not on the right network.'
        }
        description={
          errorType === 'error'
            ? `Our engineers are working on it. 
        Please try again soon.`
            : `It seems your wallet is running on a different network. Please
        manually change the network in your wallet or click on the button
        below.`
        }
        {...(errorType === 'network'
          ? {
              action: () => switchNetwork?.(chain.goerli.id),
              labelIcon: 'switch-network-icon',
              actionLabel: 'Switch Network',
            }
          : undefined)}
      />
    </>
  )
}

export default Header
