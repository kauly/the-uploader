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
    <div className="absolute inset-0 left-1/2 top-1/2 z-50 flex max-h-80 w-64 -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto overflow-x-hidden border-2 border-black bg-orange-700 p-2 shadow-lg outline-none focus:outline-none">
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
