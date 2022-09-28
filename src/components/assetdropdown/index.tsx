import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { Sprite, Typography } from '..'
import { rem } from '../../utils'
import { AssetDropdownOptions, Option } from './SelectInterfaces'
import { AppContext } from '../../context'
import { Actions } from '../../context/Action'

const AssetDetails = styled.div`
  position: relative;
`
const Picker = styled.div`
  background: ${STYLES.palette.colors.assetBackground};
  padding: ${rem(4)} ${rem(8)};
  border-radius: ${rem(100)};
  display: flex;
  align-items: center;
  gap: ${rem(10)};
  cursor: pointer;
`
const Options = styled.div`
  min-width: ${rem(180)}
  max-width: ${rem(300)};
  padding: ${rem(16)};
  background: ${STYLES.palette.colors.black};
  position: absolute;
  max-height: ${rem(250)};
  overflow-y: scroll;
  z-index: 9;
  border-radius: ${rem(8)};
  top: ${rem(40)};
  left: 0;
`
const OptionComponent = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: ${rem(4)} ${rem(8)};
  display: flex;
  align-items: center;
  gap: ${rem(10)};
  filter: brightness(60%);
  cursor: pointer;
  &:hover {
    filter: brightness(100%);
  }
`

const AssetDropdown = ({
  options,
  onChange,
  pickerStyle,
  optionsStyle,
  labelStyle,
  hidePickerIcon,
}: AssetDropdownOptions) => {
  const [state, dispatch] = useContext(AppContext)
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option>({
    icon: options[0].icon,
    label: options[0].label,
    pickerLabel: options[0].pickerLabel,
  })

  const handleClick = (val: Option) => {
    setSelectedOption(val)
    onChange && onChange(val.label)
    setShowOptions(false)
    dispatch({ type: Actions.STORE_SELECTED_ASSET, payload: val })
  }

  useEffect(() => {
    setSelectedOption({
      icon: options.filter(o => o.label === state.selectedAsset.label)[0].icon,
      label: options.filter(o => o.label === state.selectedAsset.label)[0].label,
      pickerLabel: options.filter(o => o.label === state.selectedAsset.label)[0].pickerLabel
    })
  }, [state.selectedAsset])

  return (
    <AssetDetails>
      <Picker
        onClick={() => setShowOptions(!showOptions)}
        style={{ ...pickerStyle }}
      >
        {!hidePickerIcon && selectedOption.icon ? (
          <Sprite
            id={selectedOption.icon}
            width={pickerStyle?.iconWidth || 25}
            height={pickerStyle?.iconHeight || 25}
          />
        ) : null}
        <Typography
          fontFamily="semiBold"
          style={{ ...labelStyle, fontSize: rem(labelStyle?.fontSize || 24) }}
        >
          {selectedOption.pickerLabel || selectedOption.label}
        </Typography>
        <Sprite
          id="chevron-down"
          width={12}
          height={7}
          {...(showOptions
            ? { style: { transform: 'rotate(180deg)' } }
            : undefined)}
        />
      </Picker>
      {showOptions ? (
        <Options style={{ ...optionsStyle }}>
          {options.map((option, index) => (
            <OptionComponent
              key={`${index} - ${option.label}`}
              onClick={() => handleClick(option)}
            >
              {option.icon ? (
                <Sprite
                  id={option.icon}
                  height={optionsStyle?.iconHeight || 24}
                  width={optionsStyle?.iconWidth || 24}
                />
              ) : null}
              <Typography
                fontFamily="regular"
                style={{ fontSize: rem(optionsStyle?.fontSize || 18) }}
              >
                {option.label}
              </Typography>
            </OptionComponent>
          ))}
        </Options>
      ) : null}
    </AssetDetails>
  )
}

export default AssetDropdown
