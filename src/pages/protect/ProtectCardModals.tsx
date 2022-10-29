import styled from 'styled-components'
import { ErrorModal } from '../../common'
import { Button, Loader, Modal, Sprite, Typography } from '../../components'
import STYLES from '../../style/styles.json'
import { rem } from '../../utils'

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: ${rem(8)};
`
// protect card modals interface
interface ProtectCardModalsInterface {
  type: 'tutorial' | 'transaction' | 'error'
  tutorialModalOptions: {
    openTutorialVideo: boolean
    setOpenTutorialVideo: (val: boolean) => void
  }
  transactionModalOptions: {
    openTransactionModal: boolean
    setOpenTransactionModal: (val: boolean) => void
    transactionDetails: {
      transactionLoading: boolean
      status: number
      hash: string
    }
  }
  errorModalOptions: {
    openErrorModal: boolean
    setOpenErrorModal: (val: boolean) => void
  }
}

/*
 * Protect Card Modals
 * a component that returns the modals called by the protect card component
 * returns different modals based on different scenarios
 */
const ProtectCardModals = ({
  type,
  tutorialModalOptions,
  transactionModalOptions,
  errorModalOptions,
}: ProtectCardModalsInterface) => {
  switch (type) {
    case 'tutorial':
      return (
        <Modal
          open={tutorialModalOptions.openTutorialVideo}
          hide={() => tutorialModalOptions.setOpenTutorialVideo(false)}
          modalContentStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: rem(24),
            maxWidth: rem(500),
            background: STYLES.palette.colors.notificationBackground,
          }}
        >
          <Typography
            tag="h2"
            fontFamily="extraBold"
            style={{ lineHeight: '36px' }}
          >
            Need any help?
          </Typography>
          <Typography
            tag="h4"
            fontFamily="regular"
            style={{ lineHeight: '28.8px' }}
          >
            To help you get started, we recorded a set of tutorials and a hand
            on guide that can be viewed on youtube.
          </Typography>
          <img src="assets/confused.gif" alt="confused-gif" width={'100%'} />
          <ButtonContainer>
            <Button
              buttonType="protect-small"
              borderRadius={100}
              style={{ width: 'auto', padding: rem(16), lineHeight: '24px' }}
              onClick={() =>
                window.open(
                  'https://docs.cruize.org',
                  '_blank',
                  'noopener noreferrer',
                )
              }
            >
              Tutorial
              <Sprite id="top-right-arrow" width={16} height={16} />
            </Button>
            <Button
              style={{
                background: STYLES.palette.colors.modalBackground,
                color: STYLES.palette.colors.white,
                filter: 'brightness(70%)',
                padding: rem(16),
                borderColor: STYLES.palette.colors.modalBackground,
                lineHeight: '24px',
              }}
              onClick={() => tutorialModalOptions.setOpenTutorialVideo(false)}
            >
              It's fine, I know stuff
            </Button>
          </ButtonContainer>
        </Modal>
      )
    case 'transaction':
      return (
        <Modal
          open={transactionModalOptions.openTransactionModal}
          modalContentStyle={{
            padding: `${rem(36)} ${rem(40)}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: rem(24),
          }}
        >
          {transactionModalOptions.transactionDetails.transactionLoading ? (
            <Loader />
          ) : (
            <Sprite
              id={
                transactionModalOptions.transactionDetails.status === 1
                  ? 'green-check-icon'
                  : 'red-cross-icon'
              }
              width={40}
              height={40}
            />
          )}
          <Typography
            fontFamily="extraBold"
            style={{ fontSize: rem(20), lineHeight: '28.8px' }}
          >
            {transactionModalOptions.transactionDetails.transactionLoading
              ? 'Transaction Pending'
              : transactionModalOptions.transactionDetails.status === 1
              ? `Transaction Successful`
              : `Transaction Failed`}
          </Typography>
          {transactionModalOptions.transactionDetails.hash ? (
            <Typography
              style={{ display: 'flex', alignItems: 'center', gap: rem(10), lineHeight: '24px' }}
              tag="a"
              href={`https://goerli.etherscan.io/tx/${transactionModalOptions.transactionDetails.hash}`}
              openInNewTab={true}
              color={STYLES.palette.colors.linkBlue}
            >
              View on etherscan
              <Sprite id="redirect-icon" width={16} height={16} />
            </Typography>
          ) : null}
          <Button
            borderRadius={8}
            onClick={() =>
              transactionModalOptions.setOpenTransactionModal(false)
            }
          >
            Close
          </Button>
        </Modal>
      )
    default:
      return (
        <ErrorModal
          open={errorModalOptions.openErrorModal}
          hide={() => errorModalOptions.setOpenErrorModal(false)}
          title="Oops, something went wrong."
          description="Our engineers are working on it. 
    Please try again soon."
        />
      )
  }
}

export default ProtectCardModals
