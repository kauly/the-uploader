import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import Spinner from 'src/components/Spinner'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'big' | 'normal'
  loading?: boolean
  fullWidth?: boolean
}

const Button = ({
  children,
  size = 'normal',
  loading = false,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'flex items-center gap-2 border-2 border-black bg-orange-700 text-black hover:bg-orange-900 focus:outline-none focus:ring-orange-400 active:scale-95 disabled:bg-orange-900 disabled:active:transform-none',
        size === 'normal' ? 'px-2 py-2.5' : 'px-6 py-8',
        fullWidth && 'w-full'
      )}
      disabled={loading || props.disabled}
    >
      {children}
      <span className={clsx(loading ? 'inline' : 'hidden')}>
        <Spinner />
      </span>
    </button>
  )
}

export default Button
