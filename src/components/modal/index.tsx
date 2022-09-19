import styled from 'styled-components'
import STYLES from '../../style/styles.json'
import { vw } from '../../utils'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${STYLES.palette.colors.modalBackdrop};
  backdrop-filter: blur(${vw(8)});
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

const ModalContent = styled.div`
  padding: ${vw(24)};
  min-width: ${vw(300)};
  max-width: 100%;
  background-color: ${STYLES.palette.colors.modalBackground};
  border-radius: ${vw(8)};
`

interface ModalProps {
  open: boolean
  hide?: () => void
  children: React.ReactNode
  modalContentStyle?: React.CSSProperties
}

const Modal = ({ open, hide, children, modalContentStyle }: ModalProps) => {
  if (!open) return null

  return (
    <ModalContainer onClick={hide}>
      <ModalContent onClick={(e) => e.stopPropagation()} style={{ ...modalContentStyle }}>
        {children}
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal
