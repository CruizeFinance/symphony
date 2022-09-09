import React, { useState } from 'react'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import Typography from '../typography'

interface StyleProps {
  selected?: boolean
}

const OutlinedContainer = styled.div`
  display: inline-flex;
`
const OutlinedTab = styled.div<StyleProps>`
  padding: 16px 48px;
  border-bottom: 4px solid ${STYLES.palette.colors.white};
  filter: brightness(${(props) => (props.selected ? '100%' : '40%')});
  cursor: pointer;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`
const ContainedContainer = styled(OutlinedContainer)`
  border-radius: 16px;
  background: ${STYLES.palette.colors.modalBackground};
`
const ContainedTab = styled(OutlinedTab)`
  border: ${(props) =>
    props.selected ? `1px solid ${STYLES.palette.colors.white}` : 'none'};
  border-radius: 16px;
  padding: 16px 32px;
  filter: brightness(${(props) => (props.selected ? '60%' : '30%')});
`
const FilledTab = styled.div<StyleProps>`
  border-radius: 6px;
  margin: 0px 4px;
  padding: 4px;
  border: ${(props) =>
    props.selected ? `1px solid ${STYLES.palette.colors.white}` : 'none'};
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
  containerStyle?: React.CSSProperties;
  tabStyle?: React.CSSProperties;
}

const Tabs = ({ onClick, type, tabs, fontFamily, containerStyle, tabStyle }: TabsProps) => {
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
                style={{ fontSize: '16px' }}
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
                style={{ fontSize: '16px' }}
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
              style={{ ...tabStyle }}
            >
              <Typography
                tag="label"
                fontFamily={fontFamily || 'bold'}
                style={{ fontSize: '22px' }}
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
