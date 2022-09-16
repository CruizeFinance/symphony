import React, { useState } from 'react'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { Typography } from '..'
import { vw } from '../../utils'

interface StyleProps {
  selected?: boolean
}

const OutlinedContainer = styled.div`
  display: inline-flex;
`
const OutlinedTab = styled.div<StyleProps>`
  padding: ${vw(16)} ${vw(48)};
  border-bottom: ${vw(4)} solid ${STYLES.palette.colors.white};
  filter: brightness(${(props) => (props.selected ? '100%' : '40%')});
  cursor: pointer;

  label {
    display: flex;
    align-items: center;
    gap: ${vw(10)};
  }
`
const ContainedContainer = styled(OutlinedContainer)`
  border-radius: ${vw(16)};
  background: ${STYLES.palette.colors.modalBackground};
`
const ContainedTab = styled(OutlinedTab)`
  border: ${(props) =>
    props.selected ? `${vw(1)} solid ${STYLES.palette.colors.white}` : 'none'};
  border-radius: ${vw(16)};
  padding: ${vw(16)} ${vw(32)};
  filter: brightness(${(props) => (props.selected ? '60%' : '30%')});
`
const FilledTab = styled.div<StyleProps>`
  border-radius: ${vw(6)};
  margin: ${vw(0)} ${vw(4)};
  padding: ${vw(4)};
  border: ${(props) =>
    props.selected ? `${vw(1)} solid ${STYLES.palette.colors.white}` : 'none'};
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

interface TabsProps extends StyleProps {
  tabs: { label: string; icon?: React.ReactNode }[]
  onClick: (tab: React.ReactNode) => void
  type?: 'outlined' | 'filled' | 'contained'
  fontFamily?: 'extraBold' | 'bold' | 'semiBold' | 'medium' | 'regular'
  containerStyle?: React.CSSProperties
  tabStyle?: React.CSSProperties
}

const Tabs = ({
  onClick,
  type,
  tabs,
  fontFamily,
  containerStyle,
  tabStyle,
}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].label || '')

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
                style={{ fontSize: vw(tabStyle?.fontSize || 16) }}
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
                style={{ fontSize: vw(tabStyle?.fontSize || 16) }}
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
              style={{ fontSize: vw(tabStyle?.fontSize || 16) }}
            >
              <Typography
                tag="label"
                fontFamily={fontFamily || 'bold'}
                style={{ fontSize: vw(22) }}
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
