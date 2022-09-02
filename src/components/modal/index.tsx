import styled from 'styled-components'
import STYLES from '../../style/styles.json'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${STYLES.palette.colors.modalBackdrop};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContent = styled.div`
  padding: 24px;
  min-width: 300px;
  max-width: 100%;
  background-color: ${STYLES.palette.colors.modalBackground};
  border-radius: 8px;
`

interface ModalProps {
  open: boolean
  hide?: () => void
  children: React.ReactNode
}

const Modal = ({ open, hide, children }: ModalProps) => {
  if (!open) return null

  return (
    <ModalContainer onClick={hide}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal
