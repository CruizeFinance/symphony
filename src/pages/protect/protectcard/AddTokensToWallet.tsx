import styled from 'styled-components'
import { rem } from '../../../utils'
import STYLES from '../../../style/styles.json'
import { Button, Collapsible, Sprite, Typography } from '../../../components'
import { useContext, useState } from 'react'
import { useAccount } from 'wagmi'
import { AppContext } from '../../../context'
import { ErrorModal } from '../../../common'

const Container = styled.div`
  border-radius: ${rem(20)};
  padding: ${rem(16)};
  background: ${STYLES.palette.colors.tagBlue};
  margin-bottom: ${rem(16)};
  max-width: ${rem(456)};

  @media only screen and (max-width: 1024px) {
    display: none;
  }
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
  cursor: default;
`
const Buttons = styled(HeaderButton)`
  cursor: default;
  width: 100%;
`

interface AddTokensToWalletProps {
  addToken: (val?: string) => Promise<void>
}

const AddTokensToWallet = ({ addToken }: AddTokensToWalletProps) => {
  // context hook
  const [state] = useContext(AppContext)

  const { connector } = useAccount()

  // state hooks
  const [openButtons, setOpenButtons] = useState(true)
  const [openErrorModal, setOpenErrorModal] = useState(false)

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
