import { PropsWithChildren } from 'react'

interface ModalProps {
  title: string
  open: boolean
  onClose: () => void
}

const Modal = ({
  title = '',
  open = false,
  children,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  return open ? (
    <div className="fixed inset-0 z-50 flex h-80 w-64 flex-col overflow-y-auto overflow-x-hidden border-2 border-black bg-orange-700 p-2 shadow-lg outline-none focus:outline-none">
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <button className="border-1 cursor-pointer font-bold" onClick={onClose}>
          X
        </button>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  ) : undefined
}

export default Modal
