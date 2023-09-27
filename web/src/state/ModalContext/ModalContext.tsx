import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'

import { Toaster } from '@redwoodjs/web/dist/toast'

import Modal from 'src/components/Modal/Modal'

interface ModalContext {
  openModal: (content: ReactNode, title: string) => void
  closeModal: () => void
}

interface ModalProps {
  title: string
  content: ReactNode
}

const ModalContext = createContext<ModalContext | null>(null)

export const useModal = () => useContext(ModalContext)

const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modalProps, setModalProps] = useState<ModalProps>(undefined)

  const openModal = (content: ReactNode, title: string) =>
    setModalProps({ content, title })

  const closeModal = () => setModalProps(undefined)

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      {modalProps && (
        <Modal title={modalProps.title} onClose={closeModal}>
          {modalProps.content}
        </Modal>
      )}
      <Toaster />
    </ModalContext.Provider>
  )
}

export default ModalContextProvider
