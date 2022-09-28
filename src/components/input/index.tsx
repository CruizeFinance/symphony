import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { rem, WBTC_TESTNET_CONTRACT_ADDRESS, WETH_TESTNET_CONTRACT_ADDRESS } from '../../utils'
import { AssetDropdown, Typography } from '..'
import { useContext, useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { AppContext } from '../../context'

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

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant?: 'default' | 'asset'
  label?: string
  error?: string
  onInputChange?: (val: string) => void
  onAssetChange?: (val: string) => void
  inputValue?: string
  showBalance?: boolean
  onMaxClick?: (val: string) => void
}

const Input = ({
  variant,
  label,
  error,
  inputValue,
  onInputChange,
  onAssetChange,
  showBalance,
  onMaxClick,
  ...props
}: InputFieldProps) => {
  const [input, setInputValue] = useState<string>('0.0')
  const [selectedAsset, setSelectedAsset] = useState<string>('ethereum')
  const [state] = useContext(AppContext)
  const { isConnected } = useAccount()
  const { address } = useAccount()
  const balance = useBalance({
    addressOrName: address,
    watch: true,
    ...(selectedAsset !== 'ethereum'
      ? {
          token:
            selectedAsset === 'weth'
              ? WETH_TESTNET_CONTRACT_ADDRESS
              : WBTC_TESTNET_CONTRACT_ADDRESS,
        }
      : undefined),
  })

  const handleAssetChange = (val: string) => {
    switch (val) {
      case 'WBTC':
        setSelectedAsset('wrapped-bitcoin')
        onAssetChange && onAssetChange('wrapped-bitcoin')
        break
      case 'WETH':
        setSelectedAsset('weth')
        onAssetChange && onAssetChange('weth')
        break
      default:
        setSelectedAsset('ethereum')
        onAssetChange && onAssetChange('ethereum')
        break
    }
  }

  useEffect(() => {
    setInputValue(inputValue || '0.0')
  }, [inputValue])

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
          <InputField
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value)
              onInputChange && onInputChange(e.target.value)
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
            {state.assetPrice
              ? `~$${(state.assetPrice * parseFloat(input || '0.0')).toFixed(4)}`
              : '-'}
          </Typography>
        </InputSection>
        <AssetSection>
          <AssetDropdown
            options={options}
            onChange={(val) => handleAssetChange(val)}
            labelStyle={{
              width: '4ch',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          />
          {isConnected && showBalance ? (
            <Typography
              tag="p"
              fontFamily="medium"
              style={{
                fontSize: rem(12),
                color: STYLES.palette.colors.inputLabel,
              }}
            >
              <>Balance: {balance.data?.formatted.slice(0, 10) || '-'}</>
              <MaxButton
                onClick={() =>{
                  onMaxClick && onMaxClick(balance.data?.formatted.slice(0, 10) ?? '0.0')
                  setInputValue(balance.data?.formatted.slice(0, 10) ?? '0.0')
                }}
              >
                MAX
              </MaxButton>
            </Typography>
          ) : null}
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
