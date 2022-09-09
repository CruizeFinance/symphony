import Tabs from '../../components/tabs'
import {
  Button,
  Collapsible,
  Divider,
  Input,
  Sprite,
  Typography,
} from '../../components'
import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { useState } from 'react'

const ProtectArea = styled.div`
  background: ${STYLES.palette.colors.cardBackground};
  padding: 24px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  max-width: 450px;
`
const DetailArea = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  p {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const ProtectCard = () => {
  const [openTransactionDetails, setOpenTransactionDetails] = useState(false)
  return (
    <ProtectArea>
      <Tabs
        onClick={(val) => console.log(val)}
        tabs={[{ label: 'Protect' }, { label: 'Withdraw' }]}
      />
      <Tabs
        onClick={(val) => console.log(val)}
        tabs={[
          {
            label: 'Standard',
            icon: <Sprite id="info-icon" width={20} height={20} />,
          },
          {
            label: 'Instant',
            icon: <Sprite id="info-icon" width={20} height={20} />,
          },
        ]}
        type="contained"
      />
      <Input label="AMOUNT" />
      <Typography style={{ width: '100%', textAlign: 'left' }}>
        Protection Details
      </Typography>
      <DetailArea>
        <Detail>
          <Typography
            style={{ fontSize: '16px', filter: 'brightness(60%)' }}
            fontFamily="regular"
          >
            Price floor
            <Sprite id="info-icon" width={20} height={20} />
          </Typography>
          <Typography
            style={{ fontSize: '16px', filter: 'brightness(60%)' }}
            fontFamily="regular"
          >
            3000 USDC
          </Typography>
        </Detail>
        <Detail>
          <Typography
            style={{ fontSize: '16px', filter: 'brightness(60%)' }}
            fontFamily="regular"
          >
            Staking Price Limit
            <Sprite id="info-icon" width={20} height={20} />
          </Typography>
          <Typography
            style={{ fontSize: '16px', filter: 'brightness(60%)' }}
            fontFamily="regular"
          >
            3000 USDC
          </Typography>
        </Detail>
        <Detail>
          <Typography
            style={{ fontSize: '16px', filter: 'brightness(60%)' }}
            fontFamily="regular"
          >
            APY
            <Sprite id="info-icon" width={20} height={20} />
          </Typography>
          <Typography
            style={{ fontSize: '16px', filter: 'brightness(60%)' }}
            fontFamily="regular"
          >
            3000 USDC
          </Typography>
        </Detail>
      </DetailArea>
      <Divider
        labelOptions={{
          label: 'Transaction Details',
          labelAlign: 'center',
          dropdown: true,
          dropdownOpen: openTransactionDetails,
        }}
        onClick={() => setOpenTransactionDetails(!openTransactionDetails)}
      />
      <Collapsible open={openTransactionDetails}>
        <DetailArea>
          <Detail>
            <Typography style={{ fontSize: '16px' }} fontFamily="bold">
              Total
              <Sprite id="info-icon" width={20} height={20} />
            </Typography>
            <Typography style={{ fontSize: '16px' }} fontFamily="bold">
              0.10040784ETH ($164.93)
            </Typography>
          </Detail>
          <Detail>
            <Typography
              style={{ fontSize: '16px', filter: 'brightness(60%)' }}
              fontFamily="regular"
            >
              Gas fee
              <Sprite id="info-icon" width={20} height={20} />
            </Typography>
            <Typography
              style={{ fontSize: '16px', filter: 'brightness(60%)' }}
              fontFamily="regular"
            >
              0.0015678 ETH
            </Typography>
          </Detail>
        </DetailArea>
      </Collapsible>
      <Button buttonType="protect">Protect</Button>
      <Typography tag="label" style={{ fontSize: '12px' }}>
        Need help?&nbsp;
        <Typography tag="a" color={STYLES.palette.colors.linkBlue}>
          Learn from video tutorials/docs
        </Typography>
      </Typography>
    </ProtectArea>
  )
}

export default ProtectCard
