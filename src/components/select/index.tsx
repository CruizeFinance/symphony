import { useState } from 'react'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { Sprite, Typography } from '..'
import { rem } from '../../utils'

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
  max-width: ${rem(300)};
  background: ${STYLES.palette.colors.modalBackground};
  position: absolute;
  max-height: ${rem(250)};
  overflow-y: scroll;
  z-index: 9;
  border-radius: ${rem(8)};
  top: ${rem(40)};
  left: 0;
`
const Option = styled.div`
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

interface Option {
  icon?: string
  label: string
}

interface SelectOptions {
  options: Option[]
  onChange: (val: string) => void
  pickerStyle?: IconDimesions
  optionsStyle?: IconDimesions
  labelStyle?: React.CSSProperties
}

interface IconDimesions extends React.CSSProperties {
  iconWidth?: number
  iconHeight?: number
}

const Select = ({
  options,
  onChange,
  pickerStyle,
  optionsStyle,
  labelStyle,
}: SelectOptions) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option>({
    icon: options[0].icon,
    label: options[0].label,
  })

  const handleClick = (val: Option) => {
    setSelectedOption(val)
    onChange(val.label)
    setShowOptions(false)
  }

  return (
    <AssetDetails>
      <Picker
        onClick={() => setShowOptions(!showOptions)}
        style={{ ...pickerStyle }}
      >
        {selectedOption?.icon ? (
          <Sprite id={selectedOption.icon} width={pickerStyle?.iconWidth || 25} height={pickerStyle?.iconHeight || 25} />
        ) : null}
        <Typography
          fontFamily="semiBold"
          style={{ ...labelStyle, fontSize: rem(labelStyle?.fontSize || 24) }}
        >
          {selectedOption.label}
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
            <Option
              key={`${index} - ${option.label}`}
              onClick={() => handleClick(option)}
            >
              {option.icon ? (
                <Sprite id={option.icon} height={optionsStyle?.iconHeight || 20} width={optionsStyle?.iconWidth || 20} />
              ) : null}
              <Typography
                fontFamily="regular"
                style={{ fontSize: rem(optionsStyle?.fontSize || 20) }}
              >
                {option.label}
              </Typography>
            </Option>
          ))}
        </Options>
      ) : null}
    </AssetDetails>
  )
}

export default Select
