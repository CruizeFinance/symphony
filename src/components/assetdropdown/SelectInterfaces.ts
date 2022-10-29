// option interface
export interface Option {
    icon?: string
    label: string
    pickerLabel?: string
  }
  
// asset dropdown interface
export interface AssetDropdownOptions {
    options: Option[]
    onChange?: (val: string) => void
    pickerStyle?: IconDimesions
    optionsStyle?: IconDimesions
    labelStyle?: React.CSSProperties
    hidePickerIcon?: boolean
    selectedAsset?: Option
  }
  
// option icon interface
export interface IconDimesions extends React.CSSProperties {
    iconWidth?: number
    iconHeight?: number
  }