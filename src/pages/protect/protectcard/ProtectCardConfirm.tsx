import { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { DetailComponent } from '../../../common'
import { Button, Sprite, Typography } from '../../../components'
import { AppContext } from '../../../context'
import STYLES from '../../../style/styles.json'
import { rem } from '../../../utils'

// confirm style props to open the confirm card
interface ConfirmStyleProps {
  open: boolean
}

// arrow style props to give each arrow an id
interface ArrowStyleProps {
  arrowId: number
}

const Container = styled.div<ConfirmStyleProps>`
  position: absolute;
  width: ${(props) => (props.open ? '100%' : '0px')};
  height: 100%;
  overflow: hidden;
  background: ${STYLES.palette.colors.cardBackground};
  right: 0;
  transition: width ease 0.3s;
  border-radius: ${rem(20)};
  
  @media only screen and (min-width: 1024px) {
    top: 0;
  }
`
const Content = styled.div`
  padding: ${rem(9.5)} ${rem(20)};
  height: 100%;
  width: 100%;
`
const Summary = styled.div`
  padding: ${rem(24)} ${rem(20)};
  background: ${STYLES.palette.colors.black};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${rem(20)};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: ${rem(4)};
`
const GraphicArea = styled(Summary)`
  background: inherit;
  height: auto;
  width: 100%;
`
const AssetTransferArea = styled(Summary)`
  padding: 0;
  background: inherit;
  height: auto;
  width: 100%;
  flex-direction: row;
`
const AssetGraphic = styled.div`
  height: ${rem(82)};
  width: ${rem(82)};
  position: relative;
`
const slide = keyframes`
    0% { opacity:0; }	
   33% { opacity:1; }	
   67% { opacity:1; }	
  100% { opacity:0; }
`
const ArrowAnimation = styled.div`
  width: ${rem(45)};
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Arrow = styled.div<ArrowStyleProps>`
  width: ${rem(13)};
  height: ${rem(13)};
  svg {
    position: absolute;
    animation: ${slide} 2.1s linear infinite;
    ${(props) =>
      props.arrowId !== 1
        ? `
    animation-delay: ${(props.arrowId - 1) * 0.7}s;
  `
        : ''}
  }
`
const DetailArea = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${rem(8)};
  width: 100%;
`
const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  p {
    display: flex;
    align-items: center;
    gap: ${rem(4)};
  }
`

// props for the protect card
interface ProtectCardConfirmProps {
  open: boolean
  hide: () => void
  onConfirm: () => void
  receiveValue: React.ReactNode
  usdValue: string
  priceFloor: string
  totalCost: string
  inputValue: string
}

/*
 * Protect Card Confirm
 * A confirm card displayed for user to see info and confirm protection or withdrawal
 */
const ProtectCardConfirm = ({
  open,
  hide,
  onConfirm,
  receiveValue,
  usdValue,
  priceFloor,
  totalCost,
  inputValue,
}: ProtectCardConfirmProps) => {
  /* context hook */
  const [state] = useContext(AppContext)

  return (
    <Container open={open}>
      <Content>
        <Summary>
          <Header>
            <Sprite
              id="chevron-down"
              height={20}
              width={20}
              style={{ transform: 'rotate(90deg)', cursor: 'pointer', color: STYLES.palette.colors.white }}
              onClick={hide}
            />
            <Typography fontFamily="bold">Summary</Typography>
          </Header>
          <GraphicArea>
            <AssetTransferArea
              {...(state.tab === 'withdraw'
                ? { style: { flexDirection: 'row-reverse' } }
                : undefined)}
            >
              <AssetGraphic>
                <Sprite
                  id={`asset-protect-container-icon`}
                  width={82}
                  height={82}
                />
                <Sprite
                  id={`${state.selectedAsset.label.toLowerCase()}-asset-icon`}
                  width={state.selectedAsset.label === 'WBTC' ? 40 : 25}
                  height={40}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: `-${rem(20)}`,
                    marginLeft: `-${rem(
                      state.selectedAsset.label === 'WBTC' ? 20 : 12.5,
                    )}`,
                  }}
                />
              </AssetGraphic>
              <ArrowAnimation>
                {[1, 2, 3].map((n) => (
                  <Arrow arrowId={n} key={n}>
                    <Sprite id="right-filled-arrow" width={13} height={13} />
                  </Arrow>
                ))}
              </ArrowAnimation>
              <Sprite id={'protect-lock-icon'} width={82} height={82} />
            </AssetTransferArea>
            <Typography
              style={{ fontSize: rem(24), textAlign: 'center' }}
              fontFamily="semiBold"
            >
              {state.tab === 'protect' ? 'Protecting' : 'Withdrawing'}
              <br />
              <Typography
                tag="span"
                color={STYLES.palette.colors.green}
                style={{ marginLeft: rem(8), fontSize: rem(24) }}
                fontFamily="semiBold"
              >
                {inputValue} {state.selectedAsset.label}
              </Typography>
            </Typography>
          </GraphicArea>
          <DetailArea>
            <Typography
              style={{
                width: '100%',
                textAlign: 'left',
                marginBottom: rem(8),
              }}
            >
              Transaction Details
            </Typography>
            <DetailComponent label="You will receive" value={receiveValue} />
            <DetailComponent label="USD value" value={usdValue} />
            <DetailComponent label="Price floor" value={priceFloor} />
            <DetailComponent label="Network Fee" value={totalCost} />
          </DetailArea>
          <Button
            buttonType="protect"
            borderRadius={100}
            style={{ marginTop: 'auto' }}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Summary>
      </Content>
    </Container>
  )
}

export default ProtectCardConfirm
