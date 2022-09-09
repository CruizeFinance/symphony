import { useState } from 'react'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import Sprite from '../sprite'
import Typography from '../typography'

const AssetDetails = styled.div`
  background: ${STYLES.palette.colors.assetBackground};
  padding: 4px 8px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
`
const Options = styled.div`
  max-width: 300px;
  background: ${STYLES.palette.colors.modalBackground};
  position: absolute;
  max-height: 250px;
  overflow-y: scroll;
  z-index: 9;
  border-radius: 8px;
  top: 40px;
  left: 0;
`
const Option = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  filter: brightness(60%);

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
  pickerStyle?: React.CSSProperties
  optionsStyle?: React.CSSProperties
}

const Select = ({ options, onChange, pickerStyle, optionsStyle }: SelectOptions) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option>({
    icon: options[0].icon,
    label: options[0].label,
  })

  const handleClick = (val: Option) => {
    setSelectedOption(val)
    onChange(val.label)
  }

  return (
    <AssetDetails onClick={() => setShowOptions(!showOptions)} style={{ ...pickerStyle }}>
      {selectedOption?.icon ? (
        <Sprite id={selectedOption.icon} width={25} height={25} />
      ) : null}
      <Typography fontFamily="semiBold" style={{ fontSize: '24px' }}>
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
      {showOptions ? (
        <Options style={{ ...optionsStyle }}>
          {options.map((option, index) => (
            <Option
              key={`${index} - ${option.label}`}
              onClick={() => handleClick(option)}
            >
              {option.icon ? (
                <Sprite id={option.icon} height={20} width={20} />
              ) : null}
              <Typography fontFamily="regular" style={{ fontSize: '20px' }}>
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
