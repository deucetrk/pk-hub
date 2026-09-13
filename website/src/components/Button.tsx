import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline'

export default function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457d6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'border-transparent bg-[#2457d6] text-white hover:bg-[#1946b8]',
        variant === 'outline' && 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400',
        className,
      )}
    >
      {children}
    </button>
  )
}
