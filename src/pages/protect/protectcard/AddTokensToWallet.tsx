import styled from 'styled-components'
import { CONTRACTS_CONFIG, rem } from '../../../utils'
import STYLES from '../../../style/styles.json'
import { Button, Collapsible, Sprite, Typography } from '../../../components'
import { useContext, useState } from 'react'
import { chain, useAccount } from 'wagmi'
import { AppContext } from '../../../context'
import { ErrorModal } from '../../../common'

const Container = styled.div`
  border-radius: ${rem(20)};
  padding: ${rem(16)};
  background: ${STYLES.palette.colors.tagBlue};
  margin-bottom: ${rem(16)};
  max-width: ${rem(456)};
`
const HeaderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`
const HeaderLabel = styled(HeaderButton)`
  justify-content: center;
  gap: ${rem(14)};
`
const CollapsibleArea = styled(HeaderButton)`
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: ${rem(12)};
  gap: ${rem(16)};
`
const Buttons = styled(HeaderButton)`
  cursor: default;
  width: 100%;
`

const AddTokensToWallet = () => {
  // context hook
  const [state] = useContext(AppContext)

  const { connector } = useAccount()

  // state hooks
  const [openButtons, setOpenButtons] = useState(true)
  const [openErrorModal, setOpenErrorModal] = useState(false)

  // object for fetching token contracts per chain
  const contractsConfig = CONTRACTS_CONFIG[state.chainId || chain.goerli.id]

  /*
   * add token
   * a function written to add wrapped cruize token to metamask against the selected asset
   */
  const addToken = async (type = 'asset') => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address:
              contractsConfig[
                type === 'usdc'
                  ? 'CRUIZE-USDC'
                  : (state.selectedAsset.label as keyof typeof contractsConfig)
              ]?.cruizeAddress || '', // The address that the token is at.
            symbol: type === 'usdc' ? 'USDC' : `cr${state.selectedAsset.label}`, // A ticker symbol or shorthand, up to 5 chars.
            decimals:
              contractsConfig[
                type === 'usdc'
                  ? 'CRUIZE-USDC'
                  : (state.selectedAsset.label as keyof typeof contractsConfig)
              ]?.decimals || '', // The number of decimals in the token
          },
        },
      })
    } catch (error: any) {
      if (error.code !== 4001) {
        setOpenErrorModal(true)
      }
    }
  }

  return connector?.id.toLowerCase() === 'metamask' ? (
    <>
      <Container>
        <HeaderButton onClick={() => setOpenButtons(!openButtons)}>
          <HeaderLabel>
            <Sprite id="metamask-icon" width={16} height={16} />
            <Typography
              fontFamily="medium"
              style={{ fontSize: rem(14) }}
              color={STYLES.palette.colors.logoBlue}
            >
              Add tokens to wallet
            </Typography>
          </HeaderLabel>
          <Sprite
            id="chevron-down"
            width={16}
            height={16}
            style={{
              color: STYLES.palette.colors.logoBlue,
              transform: openButtons ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </HeaderButton>
        <Collapsible open={openButtons}>
          <CollapsibleArea>
            <Typography
              fontFamily="regular"
              style={{ fontSize: rem(14) }}
              color={STYLES.palette.colors.logoBlue}
            >
              To check the balances of respective tokens in your wallet, add
              their individual contracts to your wallet
            </Typography>
            <Buttons>
              <Button
                buttonType="button-light-blue"
                style={{ fontSize: rem(12), padding: `${rem(8)} ${rem(16)}` }}
                onClick={addToken}
              >
                Add cr{state.selectedAsset.label} to Metamask
              </Button>
              <Button
                buttonType="flip-style-blue"
                style={{ fontSize: rem(12), padding: `${rem(8)} ${rem(16)}` }}
                onClick={() => addToken('usdc')}
              >
                Add Test USDC to Metamask
              </Button>
            </Buttons>
          </CollapsibleArea>
        </Collapsible>
      </Container>
      <ErrorModal
        open={openErrorModal}
        hide={() => setOpenErrorModal(false)}
        title="Oops, something went wrong."
        description="Our engineers are working on it. 
        Please try again soon."
      />
    </>
  ) : null
}

export default AddTokensToWallet
