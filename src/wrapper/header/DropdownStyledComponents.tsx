import styled from 'styled-components'
import { rem } from '../../utils'
import STYLES from '../../style/styles.json'

// common styled components used in different dropdowns

// dropdown interface
interface DropdownProps {
  dropdownWidth?: number
}

export const DropdownArea = styled.div`
  position: relative;

  @media only screen and (max-width: 1024px) {
    padding: ${rem(20)};
    width: 100%;
    border-top: ${rem(1)} solid ${STYLES.palette.colors.dividerStroke};
  }
`
export const HeaderDropdown = styled.div<DropdownProps>`
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
export const Section = styled.div`
  border-radius: ${rem(4)};
  background: ${STYLES.palette.colors.notificationBackground};
  display: flex;
  align-items: flex-start;
  gap: ${rem(8)};
  padding: ${rem(4)};
  width: 100%;
`
export const DropdownContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${rem(8)};
  width: 100%;
`
export const DropdownLabel = styled(DropdownContent)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
export const MobileHeaderTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`
export const DesktopHeaderTab = styled.div`
  display: block;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`
export const ConnectedButton = styled.div`
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
