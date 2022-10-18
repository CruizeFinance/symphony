import { Sprite, Typography } from '../../components'
import { rem } from '../../utils'
import { useContext, useEffect, useRef, useState } from 'react'
import { fetchRecentOrders } from '../../apis'
import { useAccount } from 'wagmi'
import {
  DesktopHeaderTab,
  DropdownArea,
  DropdownContent,
  DropdownLabel,
  HeaderDropdown,
  MobileHeaderTab,
  Section,
} from './DropdownStyledComponents'
import { useOutsideAlerter } from '../../hooks'
import STYLES from '../../style/styles.json'
import { AppContext } from '../../context'

/*
 * Recent Orders Dropdown
 * Returns the 3 latest transactions that user has made on the protocol
 * Is displayed only when the user is connected on the app
 */
const RecentOrdersDropdown = () => {
  // context hook
  const [state] = useContext(AppContext)

  // web3 hook
  const { address } = useAccount()

  // state hooks
  const [transactions, setTransactions] = useState<
    | {
        amount: string
        asset_name: string
        transaction_hash: string
        type: string
        timestamp: number
      }[]
    | string
  >([])
  const [loadRecentOrders, setLoadRecentOrders] = useState(false)
  const [showRecentOrders, setShowRecentOrders] = useState(false)

  // hooks written to close the dropdown when clicked outside
  const recentOrdersRef = useRef(null)
  useOutsideAlerter(recentOrdersRef, () => setShowRecentOrders(false))

  /*
   * function written to open or close the dropdown and make an api call
   */
  const onNotificationClick = async () => {
    setShowRecentOrders(!showRecentOrders)
    getTransactions()
  }

  /*
   * function written to fetch the recent orders of a user
   */
  const getTransactions = async () => {
    setLoadRecentOrders(true)
    const data = await fetchRecentOrders(address || '')
    setTransactions(data.message)
    setLoadRecentOrders(false)
  }

  /*
   * an effect to call the get transactions function based on account change
   */
  useEffect(() => {
    if (showRecentOrders) getTransactions()
  }, [address])

  return (
    <DropdownArea ref={recentOrdersRef}>
      <MobileHeaderTab onClick={onNotificationClick}>
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
          {...(showRecentOrders
            ? { style: { transform: 'rotate(180deg)' } }
            : undefined)}
        />
      </MobileHeaderTab>
      <DesktopHeaderTab>
        <Sprite
          id="notifications-icon"
          width={42}
          height={42}
          style={{ cursor: 'pointer' }}
          onClick={onNotificationClick}
        />
      </DesktopHeaderTab>
      {showRecentOrders ? (
        <HeaderDropdown>
          <Typography fontFamily="bold" color={STYLES.palette.colors.white60}>
            Recent Orders
          </Typography>
          {loadRecentOrders ? (
            <Section>
              <Typography style={{ fontSize: rem(12) }}>
                Fetching Orders...
              </Typography>
            </Section>
          ) : (
            <>
              {transactions &&
              typeof transactions !== 'string' &&
              transactions.length ? (
                transactions
                  .sort((a,b) => b.timestamp - a.timestamp)
                  .slice(0, 3)
                  .map((transaction) => (
                    <Section key={transaction.transaction_hash}>
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
                            {transaction.type} {state.selectedAsset.label}
                          </Typography>
                          <Typography
                            fontFamily="medium"
                            style={{ fontSize: rem(14) }}
                          >
                            {transaction.amount} {state.selectedAsset.label}
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
                            <Sprite id="redirect-icon" width={12} height={12} />
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
                    No recent orders found
                  </Typography>
                </Section>
              )}
            </>
          )}
        </HeaderDropdown>
      ) : null}
    </DropdownArea>
  )
}

export default RecentOrdersDropdown
