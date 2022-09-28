import { ConnectKitButton } from 'connectkit'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button, Sprite, Typography } from '../components'
import { Modal } from '../components'
import STYLES from '../style/styles.json'
import { chain, useAccount, useDisconnect, useFeeData } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { rem } from '../utils'
import { fetchTransaction } from '../apis'

interface DropdownProps {
  dropdownWidth?: number
}

interface MobileProps {
  open: boolean
}

const Container = styled.div`
  position: fixed;
  padding: ${rem(30)} ${rem(60)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: -webkit-fill-available;
  backdrop-filter: blur(${rem(8)});
  z-index: 9999;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(16)};
  }
`
const ConnectedButton = styled.div`
  background: ${STYLES.palette.colors.assetBackground};
  padding: ${rem(8)} ${rem(16)};
  border-radius: ${rem(100)};
  display: flex;
  align-items: center;
  gap: ${rem(10)};
  cursor: pointer;
  filter: brightness(70%);
  line-height: 20px;
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
const Page = styled.label`
  font-family: ${STYLES.typography.fonts.semiBold};
  color: ${STYLES.palette.colors.white};
  font-size: ${rem(20)};
  cursor: default;
  text-transform: capitalize;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
const ModalContent = styled(LogoArea)`
  justify-content: center;
  flex-direction: column;
  gap: ${rem(10)};
`
const DropdownArea = styled.div`
  position: relative;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(20)};
    width: 100%;
    border-top: ${rem(1)} solid ${STYLES.palette.colors.dividerStroke};
  }
`
const HeaderDropdown = styled.div<DropdownProps>`
  position: absolute;
  right: 0;
  background: ${STYLES.palette.colors.black};
  border: 1px solid ${STYLES.palette.colors.dividerStroke};
  border-radius: ${rem(8)};
  padding: ${rem(8)};
  width: ${(props) => rem(props.dropdownWidth || 300)};
  display: flex;
  flex-direction: column;
  gap: ${rem(8)};
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);

  @media only screen and (max-width: 1024px) {
    position: static;
    width: 100%;
    border: none;
    right: '';
    box-shadow: none;
    margin-top: ${rem(10)};
  }
`
const Section = styled.div`
  border-radius: ${rem(4)};
  background: ${STYLES.palette.colors.notificationBackground};
  display: flex;
  align-items: flex-start;
  gap: ${rem(8)};
  padding: ${rem(4)};
  width: 100%;
`
const DropdownContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${rem(8)};
  width: 100%;
`
const DropdownLabel = styled(DropdownContent)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
const MobileHeaderTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

interface HeaderProps {
  location?: string
}

const Header = ({ location }: HeaderProps) => {
  const [openConnectedModal, setOpenConnectedModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showButtonDropdown, setShowButtonDropdown] = useState(false)
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false)
  const [openMobileHeader, setOpenMobileHeader] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(false)
  const [transactions, setTransactions] = useState<
    {
      amount: string
      asset_name: string
      transaction_hash: string
      type: string
      timestamp: number
    }[]
  >([])
  const { data: gasData } = useFeeData({
    chainId: chain.goerli.id,
    formatUnits: 'gwei',
    watch: true,
  })

  const notificationRef = useRef(null)
  // commenting to fix the logic
  // useOutsideAlerter(notificationRef, () => setShowNotification(false))
  const { connector, address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const navigate = useNavigate()

  const hideModal = () => {
    const timeout = setTimeout(() => {
      setOpenConnectedModal(false)
      clearTimeout(timeout)
    }, 2000)
  }

  const onNotificationClick = async () => {
    setShowNotification(!showNotification)
    setLoadingNotifications(true)
    const data = await fetchTransaction(address || '')
    setTransactions(data.message)
    setLoadingNotifications(false)
  }

  useEffect(() => {
    if (isConnected) {
      setOpenConnectedModal(true)
      hideModal()
    }
  }, [isConnected])

  return (
    <>
      <Container>
        <LogoArea>
          <Typography
            fontFamily="extraBold"
            tag="h1"
            color={STYLES.palette.colors.logoBlue}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            Cruize
          </Typography>
          {location ? <Page>{location}</Page> : null}
        </LogoArea>
        <DesktopArea>
          {isConnected ? (
            <>
              <DropdownArea>
                <Sprite
                  id="notifications-icon"
                  width={42}
                  height={42}
                  style={{ cursor: 'pointer' }}
                  onClick={onNotificationClick}
                />
                {showNotification ? (
                  <HeaderDropdown ref={notificationRef}>
                    <Typography
                      fontFamily="bold"
                      style={{ filter: 'brightness(60%)' }}
                    >
                      Recent Orders
                    </Typography>
                    {loadingNotifications ? (
                      <Section>
                        <Typography style={{ fontSize: rem(12) }}>
                          Fetching Orders...
                        </Typography>
                      </Section>
                    ) : (
                      <>
                        {transactions.length ? (
                          transactions
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .slice(0, 3)
                            .map((transaction) => (
                              <Section>
                                <Sprite
                                  id={`${transaction.type.toLowerCase()}-icon`}
                                  width={16}
                                  height={16}
                                />
                                <DropdownContent>
                                  <DropdownLabel>
                                    <Typography
                                      fontFamily="medium"
                                      style={{ fontSize: rem(14) }}
                                    >
                                      {transaction.type} ETH
                                    </Typography>
                                    <Typography
                                      fontFamily="medium"
                                      style={{ fontSize: rem(14) }}
                                    >
                                      {transaction.amount} ETH
                                    </Typography>
                                  </DropdownLabel>
                                  <DropdownLabel>
                                    <Typography
                                      fontFamily="medium"
                                      style={{
                                        fontSize: rem(10),
                                        filter: 'brightness(80%)',
                                      }}
                                    >
                                      View on etherscan
                                    </Typography>
                                    <Typography
                                      tag="a"
                                      openInNewTab={true}
                                      href={`https://goerli.etherscan.io/tx/${transaction.transaction_hash}`}
                                    >
                                      <Sprite
                                        id="redirect-icon"
                                        width={12}
                                        height={12}
                                      />
                                    </Typography>
                                  </DropdownLabel>
                                </DropdownContent>
                              </Section>
                            ))
                        ) : (
                          <Section>
                            <Typography
                              style={{
                                fontSize: rem(12),
                                justifyContent: 'center',
                              }}
                            >
                              Fetching Orders...
                            </Typography>
                          </Section>
                        )}
                      </>
                    )}
                  </HeaderDropdown>
                ) : null}
              </DropdownArea>
              <DropdownArea>
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
                    {/* <Section>
                      <DropdownContent>
                        <Button borderRadius={10} style={{ width: '100%' }}>
                          Switch Network
                          <Sprite
                            id="arrows-counter-clockwise-icon"
                            width={16}
                            height={16}
                          />
                        </Button>
                      </DropdownContent>
                    </Section> */}
                  </HeaderDropdown>
                ) : null}
              </DropdownArea>
            </>
          ) : null}
          {isConnected ? (
            <DropdownArea>
              <ConnectedButton
                onClick={() => setShowButtonDropdown(!showButtonDropdown)}
              >
                <Typography>
                  {address?.slice(0, 7)}...{address?.slice(-7)}
                </Typography>
                <Sprite
                  id="chevron-down"
                  width={12}
                  height={12}
                  {...(showButtonDropdown
                    ? { style: { transform: 'rotate(180deg)' } }
                    : undefined)}
                />
              </ConnectedButton>
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
                        <Typography fontFamily="medium">
                          Copy Address
                        </Typography>
                        <Sprite
                          id="copy-icon"
                          width={16}
                          height={16}
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            navigator.clipboard.writeText(address || '')
                          }
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
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <Button onClick={show}>
                    <Sprite id="connect-wallet-black" width={20} height={20} />
                    Connect
                  </Button>
                )
              }}
            </ConnectKitButton.Custom>
          )}
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
                <DropdownArea onClick={onNotificationClick}>
                  <MobileHeaderTab>
                    <Typography
                      fontFamily="medium"
                      style={{ display: 'flex', gap: rem(10) }}
                    >
                      <Sprite
                        id="mobile-notification-icon"
                        width={20}
                        height={20}
                        style={{ cursor: 'pointer' }}
                      />
                      Notification
                    </Typography>
                    <Sprite
                      id="chevron-down"
                      width={16}
                      height={16}
                      {...(showNotification
                        ? { style: { transform: 'rotate(180deg)' } }
                        : undefined)}
                    />
                  </MobileHeaderTab>
                  {showNotification ? (
                    <HeaderDropdown ref={notificationRef}>
                      <Typography
                        fontFamily="bold"
                        style={{ filter: 'brightness(60%)' }}
                      >
                        Recent Orders
                      </Typography>
                      {loadingNotifications ? (
                        <Section>
                          <Typography style={{ fontSize: rem(12) }}>
                            Fetching Orders...
                          </Typography>
                        </Section>
                      ) : (
                        <>
                          {transactions.length ? (
                            transactions
                              .sort((a, b) => b.timestamp - a.timestamp)
                              .slice(0, 3)
                              .map((transaction) => (
                                <Section>
                                  <Sprite
                                    id={`${transaction.type.toLowerCase()}-icon`}
                                    width={16}
                                    height={16}
                                  />
                                  <DropdownContent>
                                    <DropdownLabel>
                                      <Typography
                                        fontFamily="medium"
                                        style={{ fontSize: rem(14) }}
                                      >
                                        {transaction.type} ETH
                                      </Typography>
                                      <Typography
                                        fontFamily="medium"
                                        style={{ fontSize: rem(14) }}
                                      >
                                        {transaction.amount} ETH
                                      </Typography>
                                    </DropdownLabel>
                                    <DropdownLabel>
                                      <Typography
                                        fontFamily="medium"
                                        style={{
                                          fontSize: rem(10),
                                          filter: 'brightness(80%)',
                                        }}
                                      >
                                        View on etherscan
                                      </Typography>
                                      <Typography
                                        tag="a"
                                        openInNewTab={true}
                                        href={`https://goerli.etherscan.io/tx/${transaction.transaction_hash}`}
                                      >
                                        <Sprite
                                          id="redirect-icon"
                                          width={12}
                                          height={12}
                                        />
                                      </Typography>
                                    </DropdownLabel>
                                  </DropdownContent>
                                </Section>
                              ))
                          ) : (
                            <Section>
                              <Typography
                                style={{
                                  fontSize: rem(12),
                                  justifyContent: 'center',
                                }}
                              >
                                Fetching Orders...
                              </Typography>
                            </Section>
                          )}
                        </>
                      )}
                    </HeaderDropdown>
                  ) : null}
                </DropdownArea>
                <DropdownArea>
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
                  {showNetworkDropdown ? (
                    <HeaderDropdown style={{ gap: rem(2) }} dropdownWidth={250}>
                      <Section>
                        <DropdownContent>
                          <DropdownLabel>
                            <Typography fontFamily="medium">Goerli</Typography>
                            <Sprite
                              id="eth-asset-icon"
                              width={20}
                              height={20}
                            />
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
                                {gasData?.formatted.gasPrice} wei
                              </>
                            </Typography>
                          </DropdownLabel>
                        </DropdownContent>
                      </Section>
                      {/* <Section>
                        <DropdownContent>
                          <Button borderRadius={10} style={{ width: '100%' }}>
                            Switch Network
                            <Sprite
                              id="arrows-counter-clockwise-icon"
                              width={16}
                              height={16}
                            />
                          </Button>
                        </DropdownContent>
                      </Section> */}
                    </HeaderDropdown>
                  ) : null}
                </DropdownArea>
              </>
            ) : null}
            {isConnected ? (
              <DropdownArea>
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
                      ? { style: { transform: 'rotate(180deg)' } }
                      : undefined)}
                  />
                </MobileHeaderTab>
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
                          <Typography fontFamily="medium">
                            Copy Address
                          </Typography>
                          <Sprite
                            id="copy-icon"
                            width={16}
                            height={16}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              navigator.clipboard.writeText(address || '')
                            }
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
              <ConnectKitButton.Custom>
                {({ show }) => {
                  return (
                    <Button
                      onClick={show}
                      style={{ width: '80%', borderRadius: rem(8) }}
                    >
                      <Sprite
                        id="connect-wallet-black"
                        width={20}
                        height={20}
                      />
                      Connect
                    </Button>
                  )
                }}
              </ConnectKitButton.Custom>
            )}
          </MobileHeaderContent>
        </MobileHeader>
      </Container>
      <Modal open={openConnectedModal}>
        <ModalContent>
          <Sprite id="wallet-connected-icon" width={120} height={120} />
          <Typography
            tag="label"
            fontFamily="medium"
            style={{ fontSize: rem(18) }}
          >
            Connected
          </Typography>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
