import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'big' | 'normal'
}

const Button = ({ children, size = 'normal' }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'border-2 border-black bg-orange-700 text-black hover:bg-orange-900 focus:outline-none focus:ring-orange-400',
        size === 'normal' ? 'px-2 py-2.5' : 'px-6 py-8'
      )}
    >
      {children}
    </button>
  )
}

export default Button
