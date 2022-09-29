import React, { useState } from 'react'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { Typography } from '..'
import { rem } from '../../utils'

// style props
interface StyleProps {
  selected?: boolean
}

const OutlinedContainer = styled.div`
  display: inline-flex;
`
const OutlinedTab = styled.div<StyleProps>`
  padding: ${rem(16)} ${rem(48)};
  border-bottom: ${rem(4)} solid ${STYLES.palette.colors.white};
  filter: brightness(${(props) => (props.selected ? '100%' : '40%')});
  cursor: pointer;

  label {
    display: flex;
    align-items: center;
    gap: ${rem(10)};
  }
`
const ContainedContainer = styled(OutlinedContainer)`
  border-radius: ${rem(16)};
  background: ${STYLES.palette.colors.modalBackground};
`
const ContainedTab = styled(OutlinedTab)`
  border: ${(props) =>
    props.selected ? `${rem(1)} solid ${STYLES.palette.colors.white}` : 'none'};
  border-radius: ${rem(16)};
  padding: ${rem(16)} ${rem(32)};
  filter: brightness(${(props) => (props.selected ? '60%' : '30%')});
`
const FilledTab = styled.div<StyleProps>`
  border-radius: ${rem(6)};
  margin: ${rem(0)} ${rem(4)};
  padding: ${rem(4)};
  border: ${(props) =>
    props.selected ? `${rem(1)} solid ${STYLES.palette.colors.white}` : 'none'};
  background: ${(props) =>
    props.selected
      ? STYLES.palette.colors.white
      : STYLES.palette.colors.modalBackground};
  cursor: pointer;

  label {
    color: ${(props) =>
      props.selected
        ? STYLES.palette.colors.black
        : STYLES.palette.colors.unfilledTabFont};

    svg {
      fill: ${(props) =>
        props.selected
          ? STYLES.palette.colors.black
          : STYLES.palette.colors.unfilledTabFont};
    }
  }
`

// tabs interface
interface TabsProps extends StyleProps {
  tabs: { label: string; icon?: React.ReactNode }[]
  onClick: (tab: string) => void
  type?: 'outlined' | 'filled' | 'contained'
  fontFamily?: 'extraBold' | 'bold' | 'semiBold' | 'medium' | 'regular'
  containerStyle?: React.CSSProperties
  tabStyle?: React.CSSProperties
}

/*
 * Tabs
 * Works like any tab but styled
 * Can render different look based on the choice
 * Returns the selected tab to the parent component
 */
const Tabs = ({
  onClick,
  type,
  tabs,
  fontFamily,
  containerStyle,
  tabStyle,
}: TabsProps) => {
  // state hook
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].label || '')

  /*
   * function to highlight the selected tab and return it tothe parent component
   */
  const onTabClicked = (tab: string) => {
    setSelectedTab(tab)
    onClick(tab)
  }

  switch (type) {
    case 'contained':
      return (
        <ContainedContainer style={{ ...containerStyle }}>
          {tabs.map((tab, index) => (
            <ContainedTab
              key={`${tab} - ${index}`}
              selected={selectedTab === tab.label}
              onClick={() => onTabClicked(tab.label)}
              style={{ ...tabStyle }}
            >
              <Typography
                tag="label"
                fontFamily={fontFamily || 'semiBold'}
                style={{ fontSize: rem(tabStyle?.fontSize || 16) }}
              >
                {tab.label}
                {tab.icon}
              </Typography>
            </ContainedTab>
          ))}
        </ContainedContainer>
      )
    case 'filled':
      return (
        <OutlinedContainer style={{ ...containerStyle }}>
          {tabs.map((tab, index) => (
            <FilledTab
              key={`${tab} - ${index}`}
              selected={selectedTab === tab.label}
              onClick={() => onTabClicked(tab.label)}
              style={{ ...tabStyle }}
            >
              <Typography
                tag="label"
                fontFamily={fontFamily || 'semiBold'}
                style={{ fontSize: rem(tabStyle?.fontSize || 16) }}
              >
                {tab.label}
                {tab.icon}
              </Typography>
            </FilledTab>
          ))}
        </OutlinedContainer>
      )
    default:
      return (
        <OutlinedContainer style={{ ...containerStyle }}>
          {tabs.map((tab, index) => (
            <OutlinedTab
              key={`${tab} - ${index}`}
              selected={selectedTab === tab.label}
              onClick={() => onTabClicked(tab.label)}
              style={{ fontSize: rem(tabStyle?.fontSize || 16) }}
            >
              <Typography
                tag="label"
                fontFamily={fontFamily || 'bold'}
                style={{ fontSize: rem(22) }}
              >
                {tab.label}
                {tab.icon}
              </Typography>
            </OutlinedTab>
          ))}
        </OutlinedContainer>
      )
  }
}

export default Tabs
