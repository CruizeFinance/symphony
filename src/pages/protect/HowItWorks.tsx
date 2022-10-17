import styled from 'styled-components'
import { AssetDropdown, Divider, Typography } from '../../components'
import {
  DROPDOWN_OPTIONS,
  HOW_IT_WORKS_CARDS,
  PRICE_FLOORS_RESPONSE_MAPPING,
  rem,
} from '../../utils'
import STYLES from '../../style/styles.json'
import { AssetDropdownOptions } from '../../enums'
import { useContext } from 'react'
import { AppContext } from '../../context'

// interface for card styling
interface CardStyleProps {
  cardId: number
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: ${rem(864)};
`
const CardContainer = styled.div`
  background: inherit;
  width: 100%;
  height: 100%;
`
const HowItWorksHeader = styled.div`
  position: sticky;
  top: ${rem(120)};
  margin-bottom ${rem(30)};
`
const Card = styled.div<CardStyleProps>`
  padding: ${rem(40)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${rem(1)} solid ${STYLES.palette.colors.dividerStroke};
  border-radius: ${rem(20)};
  background: ${STYLES.palette.colors.black};
  position: sticky;
  top: ${(props) => rem(172 + props.cardId * 30)};
  margin-bottom: ${rem(30)};
  box-shadow: 0px -10px 10px -10px rgba(255, 255, 255, 0.3);

  img {
    padding-right: ${rem(30)};
    border-right: ${rem(1)} solid ${STYLES.palette.colors.dividerStroke};
  }

  @media only screen and (max-width: 1024px) {
    img {
      display: none;
    }
    padding: ${rem(20)};
  }
`

const CardContent = styled.div`
  padding-left: ${rem(30)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media only screen and (max-width: 1024px) {
    padding-left: 0;
  }
`

// interface for card component
interface CardComponentProps {
  title: string
  description: string
  number: number
}

/*
 * Card Component
 * a single card component that will be looped over
 */
const CardComponent = ({ title, description, number }: CardComponentProps) => {
  return (
    <Card id={`how-it-works-${number}`} cardId={number - 1}>
      <img
        src={`assets/HowItWorks-${number}.png`}
        alt={`how-it-works-${number}-icon`}
        height={300}
        width={275}
      />
      <CardContent>
        <Typography
          tag="h3"
          color={STYLES.palette.colors.logoBlue}
          fontFamily="bold"
          style={{
            background: STYLES.palette.colors.tagBlue,
            padding: `${rem(8)} ${rem(8)} ${rem(8)} ${rem(16)}`,
            display: 'flex',
            alignItems: 'center',
            gap: rem(8),
            borderRadius: rem(20),
            marginBottom: rem(32),
          }}
        >
          Step
          <Typography
            color={STYLES.palette.colors.logoBlue}
            fontFamily="bold"
            style={{
              background: STYLES.palette.colors.stepNumberBlue,
              padding: `${rem(5)} ${rem(20)}`,
              borderRadius: rem(40),
            }}
          >
            0{number}
          </Typography>
        </Typography>
        <Typography fontFamily="semiBold" style={{ fontSize: rem(28), marginBottom: rem(8) }}>
          {title}
        </Typography>
        <Typography fontFamily="regular" color={STYLES.palette.colors.white60} style={{ lineHeight: rem(20) }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

/*
 * How It Works
 * a how it works section on the protect page
 * explains the users how the protocol works in steps
 */
const HowItWorks = () => {
  // context hook
  const [state] = useContext(AppContext)

  return (
    <Container>
      <AssetDropdown
        options={DROPDOWN_OPTIONS.map((option) => {
          return {
            ...option,
            pickerLabel:
              option.label === AssetDropdownOptions.ETH
                ? 'Protect ETH'
                : option.label === AssetDropdownOptions.WETH
                ? 'Protect WETH'
                : 'Protect WBTC',
          }
        })}
        pickerStyle={{
          background: 'inherit',
          paddingLeft: '0',
        }}
        labelStyle={{
          fontSize: '32px',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        hidePickerIcon={true}
      />
      <Typography
        tag="p"
        color={STYLES.palette.colors.white60}
        style={{ marginBottom: rem(16) }}
      >
        Stake your {state.selectedAsset.label.toUpperCase()} to receive cr
        {state.selectedAsset.label.toUpperCase()} that never falls below the
        price floor. If {state.selectedAsset.label.toUpperCase()} falls below
        the price floor, you can still sell your cr
        {state.selectedAsset.label.toUpperCase()} at the price floor. The
        current cr{state.selectedAsset.label.toUpperCase()} price floor is&nbsp;
        <Typography tag="span" color={STYLES.palette.colors.white}>
          $
          {state.priceFloors[
            PRICE_FLOORS_RESPONSE_MAPPING[
              state.selectedAsset
                .label as keyof typeof PRICE_FLOORS_RESPONSE_MAPPING
            ] as keyof typeof state.priceFloors
          ] || '-'}
        </Typography>
      </Typography>
      <Divider style={{ marginBottom: rem(32) }} />
      <HowItWorksHeader id="how-it-works-header">
        <Typography tag="h1" fontFamily="bold">
          How does it work?
        </Typography>
      </HowItWorksHeader>
      <CardContainer id="card-container">
        {HOW_IT_WORKS_CARDS.map((card) => (
          <CardComponent
            key={card.key}
            number={card.key}
            title={card.title}
            description={card.description}
          />
        ))}
      </CardContainer>
    </Container>
  )
}

export default HowItWorks
