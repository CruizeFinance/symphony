import styled from 'styled-components'
import { AssetDropdown, Sprite, Typography } from '../../components'
import {
  DROPDOWN_OPTIONS,
  HOW_IT_WORKS_CARDS,
  PRICE_FLOORS_RESPONSE_MAPPING,
  rem,
} from '../../utils'
import STYLES from '../../style/styles.json'
import { AssetDropdownOptions } from '../../enums'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context'
import $ from 'jquery'

// interface for a particular timeline item props
interface TimelineItemProps {
  activeCard: number
  cardKey: number
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: ${rem(864)};
`
const HowItWorksHeader = styled.div`
  margin-bottom ${rem(30)};
`
const TimelineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const VerticalTimeline = styled.ul`
  list-style-type: none;
  width: 100%;
`
const TimeLineItem = styled.li<TimelineItemProps>`
  position: relative;
  padding: ${rem(30)} 0 ${rem(90)} ${rem(150)};
  opacity: ${(props) => (props.activeCard === props.cardKey ? '1' : '0.4')};
  &:last-child {
    margin-bottom: 0;
    &::before {
      content: unset;
    }
  }
  p {
    max-width: ${rem(382)};
    &:last-child {
      margin-bottom: 0;
    }
  }
  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: ${rem(75)};
    height: ${rem(75)};
    transition: 0.7s all;
    background: ${STYLES.palette.colors.black};
  }
  &::after {
    content: '';
    position: absolute;
    height: 0;
    width: ${rem(2)};
    background-color: ${STYLES.palette.colors.white};
    left: ${rem(38)};
    top: ${rem(34)};
    z-index: 0;
    transition: 0.7s all;
  }
  &::before {
    content: '';
    position: absolute;
    height: 92%;
    width: ${rem(2)};
    background-color: ${STYLES.palette.colors.white};
    left: ${rem(38)};
    z-index: 0;
  }

  @media only screen and (max-width: 1024px) {
    padding: ${rem(15)} 0 ${rem(60)} ${rem(90)};
    p {
      max-width: 100%;
    }
    &::before {
      height: 97.5%;
    }
  }

  @media only screen and (min-height: 1000px) {
    opacity: 1 !important;
  }
`
const ListItemContent = styled.div`
  display: flex;
  align-items; center;
  justify-content: center;
  gap: ${rem(84)};
  img {
    width: ${rem(200)};
    height: ${rem(250)};
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${rem(20)};
    img {
      width: ${95};
      height: ${120};
    }
    p {
      font-size: 16px !important;
    }
  }
`
const ListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items; flex-start;
  gap: ${rem(8)};
`

/*
 * How It Works
 * a how it works section on the protect page
 * explains the users how the protocol works in steps
 */
const HowItWorks = () => {
  // context hook
  const [state] = useContext(AppContext)

  // state hook
  const [activeCard, setActiveCard] = useState<number>(1)

  /*
   * an effect to highlight the time line item on scroll
   */
  useEffect(() => {
    window.addEventListener(
      'scroll',
      function () {
        function isScrollIntoView(elem: HTMLLIElement, index: number) {
          const docViewTop = $(window).scrollTop()!
          const docViewBottom = docViewTop + $(window).height()!
          const elemTop = $(elem).offset()!.top
          const elemBottom = elemTop + $(window).height()! * 0.5
          if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
            setActiveCard(index + 1)
          }
        }
        const timeline: NodeListOf<HTMLLIElement> = document.querySelectorAll(
          '#timeline-item-1, #timeline-item-2, #timeline-item-3',
        )
        Array.from(timeline).forEach(isScrollIntoView)
      },
      true,
    )
  }, [])

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
          paddingBottom: '0',
          marginBottom: rem(18),
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
        style={{ marginBottom: rem(60), fontSize: rem(20), lineHeight: '24px' }}
      >
        Stake your {state.selectedAsset.label.toUpperCase()} to receive cr
        {state.selectedAsset.label.toUpperCase()} that never falls below the
        price floor. If {state.selectedAsset.label.toUpperCase()} falls below
        the price floor, you can still sell your cr
        {state.selectedAsset.label.toUpperCase()} at the price floor. The
        current cr{state.selectedAsset.label.toUpperCase()} price floor is&nbsp;
        <Typography
          tag="span"
          color={STYLES.palette.colors.white}
          style={{ fontSize: rem(20), lineHeight: '24px' }}
        >
          $
          {state.priceFloors
            ? state.priceFloors[
                (PRICE_FLOORS_RESPONSE_MAPPING[
                  state.selectedAsset
                    .label as keyof typeof PRICE_FLOORS_RESPONSE_MAPPING
                ] as keyof typeof state.priceFloors) || 0
              ].toFixed(2)
            : '0.00'}
        </Typography>
      </Typography>
      <HowItWorksHeader id="how-it-works-header">
        <Typography tag="h1" fontFamily="bold">
          How does it work?
        </Typography>
      </HowItWorksHeader>
      <TimelineContainer>
        <VerticalTimeline>
          {HOW_IT_WORKS_CARDS.map((card) => (
            <TimeLineItem
              key={card.key}
              activeCard={activeCard}
              cardKey={card.key}
              id={`timeline-item-${card.key}`}
            >
              <Sprite id={`timeline-${card.key}-icon`} width={75} height={75} />
              <ListItemContent>
                <img src={`assets/HowItWorks-${card.key}.png`} />
                <ListItemInfo>
                  <Typography
                    tag="h2"
                    style={{ fontSize: rem(28), lineHeight: '28px' }}
                    fontFamily="semiBold"
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: rem(18),
                      lineHeight: '20px',
                    }}
                    color={STYLES.palette.colors.white60}
                  >
                    {card.description.replaceAll(
                      'ETH',
                      state.selectedAsset.label,
                    )}
                  </Typography>
                </ListItemInfo>
              </ListItemContent>
            </TimeLineItem>
          ))}
        </VerticalTimeline>
      </TimelineContainer>
    </Container>
  )
}

export default HowItWorks
