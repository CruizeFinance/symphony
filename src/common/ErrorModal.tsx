import styled from 'styled-components'
import { Button, Modal, Sprite, Typography } from '../components'
import { rem } from '../utils'

// interface for error modal props
interface ErrorModalProps {
  open: boolean
  hide: () => void
  title: string
  description?: string
  actionLabel?: string
  action?: () => void
  labelIcon?: string
}

const ErrorModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${rem(16)};
`

/*
 * Error Modal
 * A common modal component to display all types of errors
 */
const ErrorModal = ({
  open,
  hide,
  title,
  description,
  actionLabel,
  labelIcon,
  action,
}: ErrorModalProps) => {
  return (
    <Modal
      open={open}
      modalContentStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: rem(400),
      }}
      modalStyle={{ zIndex: 99999 }}
    >
      <ErrorModalHeader>
        <Sprite id="wrong-network-icon" width={56} height={56} />
        <Typography
          fontFamily="medium"
          style={{
            filter: 'brightness(40%)',
            cursor: 'pointer',
            lineHeight: '24px',
          }}
          onClick={hide}
        >
          &#x2715;
        </Typography>
      </ErrorModalHeader>
      <Typography
        style={{ fontSize: rem(24), marginBottom: rem(4), lineHeight: '32px' }}
        fontFamily="bold"
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          style={{
            fontSize: rem(14),
            marginBottom: rem(32),
            filter: 'brightness(60%)',
            lineHeight: '16.48px',
          }}
          fontFamily="regular"
        >
          {description}
        </Typography>
      ) : null}
      {actionLabel ? (
        <Button onClick={() => action?.()} style={{ width: '100%' }}>
          {actionLabel}
          {labelIcon ? <Sprite id={labelIcon} width={16} height={16} /> : null}
        </Button>
      ) : null}
    </Modal>
  )
}

export default ErrorModal
