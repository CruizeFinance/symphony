export interface Option {
    icon?: string
    label: string
    pickerLabel?: string
  }
  
export interface AssetDropdownOptions {
    options: Option[]
    onChange?: (val: string) => void
    pickerStyle?: IconDimesions
    optionsStyle?: IconDimesions
    labelStyle?: React.CSSProperties
    hidePickerIcon?: boolean
    selectedAsset?: Option
  }
  
export interface IconDimesions extends React.CSSProperties {
    iconWidth?: number
    iconHeight?: number
  }