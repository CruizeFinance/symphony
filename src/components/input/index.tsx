import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import Select from '../select'
import Typography from '../typography'

const InputArea = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
const InputContainer = styled.div`
  background: ${STYLES.palette.colors.inputBackground};
  border: 1px solid ${STYLES.palette.colors.inputLabel};
  border-radius: 8px;
  padding: 12px 16px 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const InputSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`
const InputField = styled.input`
  width: -webkit-fill-available;
  border: none;
  background: inherit;
  font-size: 16px;
  color: ${STYLES.palette.colors.white};

  &:focus-visible {
    outline: none;
  }
`
const MaxButton = styled.button`
  margin-left: 4px;
  border: none;
  padding: 1px 4px;
  background: ${STYLES.palette.colors.tagBlue};
  filter: brightness(43%);
  cursor: pointer;
  color: ${STYLES.palette.colors.maxButtonFont};
  border-radius: 4px;
`
const AssetSection = styled(InputSection)`
  align-items: flex-end;
`

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant?: 'default' | 'asset'
  label?: string
}

const Input = ({ variant, label, ...props }: InputFieldProps) => {
  const options = [
    {
      label: 'ETH',
      icon: 'eth-asset-icon',
    },
    {
      label: 'WETH',
      icon: 'weth-asset-icon',
    },
    {
      label: 'WBTC',
      icon: 'wbtc-asset-icon',
    },
  ]

  return (
    <InputArea>
      {label ? (
        <Typography
          tag="p"
          fontFamily="bold"
          style={{
            fontSize: '16px',
            color: STYLES.palette.colors.inputLabel,
          }}
        >
          {label}
        </Typography>
      ) : null}
      <InputContainer>
        <InputSection>
          <InputField value={props.value} defaultValue={'0.0'} />
          <Typography
            tag="p"
            fontFamily="medium"
            style={{
              fontSize: '12px',
              color: STYLES.palette.colors.inputLabel,
            }}
          >
            ~$0.0
          </Typography>
        </InputSection>
        <AssetSection>
          <Select
            options={options}
            onChange={(val) => {
              console.log(val)
            }}
          />
          <Typography
            tag="p"
            fontFamily="medium"
            style={{
              fontSize: '12px',
              color: STYLES.palette.colors.inputLabel,
            }}
          >
            Balance: 0.8887
            <MaxButton>MAX</MaxButton>
          </Typography>
        </AssetSection>
      </InputContainer>
    </InputArea>
  )
}

export default Input
