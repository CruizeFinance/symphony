import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { rem } from '../../utils'
import { Select, Typography } from '..'

const InputArea = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: ${rem(8)};
  width: 100%;
`
const InputContainer = styled.div`
  background: ${STYLES.palette.colors.inputBackground};
  border: ${rem(1)} solid ${STYLES.palette.colors.inputLabel};
  border-radius: ${rem(8)};
  padding: ${rem(12)} ${rem(16)} ${rem(8)};
  width: 100%;
  display: -webkit-box;
  align-items: center;
  justify-content: space-between;
`
const InputSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
`
const InputField = styled.input`
  width: -webkit-fill-available;
  border: none;
  background: inherit;
  font-size: ${rem(20)};
  color: ${STYLES.palette.colors.white};

  &:focus-visible {
    outline: none;
  }
`
const MaxButton = styled.button`
  margin-left: ${rem(4)};
  border: none;
  padding: ${rem(1)} ${rem(4)};
  background: ${STYLES.palette.colors.tagBlue};
  filter: brightness(43%);
  cursor: pointer;
  color: ${STYLES.palette.colors.maxButtonFont};
  border-radius: ${rem(4)};
`
const AssetSection = styled(InputSection)`
  align-items: flex-end;
  gap: ${rem(8)};
`

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant?: 'default' | 'asset'
  label?: string
  error?: string
}

const Input = ({ variant, label, error, ...props }: InputFieldProps) => {
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
            fontSize: rem(16),
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
              fontSize: rem(12),
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
            labelStyle={{
              width: '4ch',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          />
          <Typography
            tag="p"
            fontFamily="medium"
            style={{
              fontSize: rem(12),
              color: STYLES.palette.colors.inputLabel,
            }}
          >
            Balance: 0.8887
            <MaxButton>MAX</MaxButton>
          </Typography>
        </AssetSection>
      </InputContainer>
      {error ? (
        <Typography
          color={STYLES.palette.colors.red}
          style={{ fontSize: rem(12), width: '100%', textAlign: 'center' }}
          fontFamily="medium"
        >
          {error}
        </Typography>
      ) : null}
    </InputArea>
  )
}

export default Input
