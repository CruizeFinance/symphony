import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { DROPDOWN_OPTIONS, rem } from '../../utils'
import { AssetDropdown, Typography } from '..'
import { memo, useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
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
  background: ${STYLES.palette.colors.maxButtonBackground};
  cursor: pointer;
  color: ${STYLES.palette.colors.maxButtonFont};
  border-radius: ${rem(4)};
`
const AssetSection = styled(InputSection)`
  align-items: flex-end;
  gap: ${rem(8)};
`

// input field props
interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant?: 'default' | 'asset'
  label?: string
  error?: string
  onInputChange: (val: string) => void
  onAssetChange?: (val: string) => void
  inputValue?: string
  showBalance?: boolean
  onMaxClick?: (val: string) => void
  cruizeBalanceData?: string
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

/*
 * Input
 * Used to enter the amount for an asset the user would like to protect or withdraw
 * Enables asset selection and a max button
 * Displays price in USD and balance for a particular asset
 */
const Input = ({
  variant,
  label,
  error,
  inputValue,
  onInputChange,
  onAssetChange,
  onMaxClick,
  cruizeBalanceData,
  ...props
}: InputFieldProps) => {
  // context
  const [state] = useContext(AppContext)

  // web3 hook
  const { isConnected } = useAccount()

  // state hook
  const [input, setInputValue] = useState<string | undefined>('')

  /*
   * function to handle asset changes
   * returns the selected asset id to the parent component
   */
  const handleAssetChange = (val: string) => {
    switch (val) {
      case 'WBTC':
        onAssetChange && onAssetChange('wrapped-bitcoin')
        break
      case 'WETH':
        onAssetChange && onAssetChange('weth')
        break
      default:
        onAssetChange && onAssetChange('ethereum')
        break
    }
  }

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onInputChange(nextUserInput)
      setInputValue(nextUserInput)
    }
  }

  /*
   * effect to set the input value on change
   */
  useEffect(() => {
    setInputValue(inputValue)
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
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            pattern="^[0-9]*[.,]?[0-9]*$"
            maxLength={10}
            size={10}
            type={'text'}
            value={input || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              enforcer(e.target.value)
            }}
            placeholder="0"
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
              ? `~$${(state.assetPrice * parseFloat(input || '0.0')).toFixed(
                  4,
                )}`
              : '-'}
          </Typography>
        </InputSection>
        <AssetSection>
          <AssetDropdown
            options={DROPDOWN_OPTIONS}
            onChange={(val) => handleAssetChange(val)}
            labelStyle={{
              width: '5ch',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          />
          {isConnected ? (
            <Typography
              tag="p"
              fontFamily="medium"
              style={{
                fontSize: rem(12),
                color: STYLES.palette.colors.inputLabel,
              }}
            >
              <>
                {state.tab === 'withdraw' ? 'Limit' : 'Balance'}:{' '}
                {state.tab === 'withdraw'
                  ? cruizeBalanceData?.slice(0, 10)
                  : state.assetBalance?.slice(0, 10) || '-'}
              </>
              <MaxButton
                onClick={() => {
                  onMaxClick &&
                    onMaxClick(
                      (
                        Number(
                          state.tab === 'withdraw'
                            ? cruizeBalanceData
                            : state.assetBalance || 0,
                        ) *
                        (state.selectedAsset.label === 'ETH' &&
                        state.tab === 'protect'
                          ? 0.9
                          : 1)
                      )
                        .toString()
                        ?.slice(0, 10) ?? '0.0',
                    )
                  setInputValue(
                    (
                      Number(
                        state.tab === 'withdraw'
                          ? cruizeBalanceData
                          : state.assetBalance || 0,
                      ) *
                      (state.selectedAsset.label === 'ETH' &&
                      state.tab === 'protect'
                        ? 0.9
                        : 1)
                    )
                      .toString()
                      ?.slice(0, 10) ?? '0.0',
                  )
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

export default memo(Input)
