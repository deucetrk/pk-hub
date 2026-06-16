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
        'inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'border-transparent bg-zinc-900 text-white shadow-md hover:bg-zinc-800 hover:shadow-lg',
        variant === 'outline' && 'border-zinc-200 bg-white/50 backdrop-blur-sm text-zinc-900 shadow-sm hover:bg-zinc-50 hover:border-zinc-300',
        className,
      )}
    >
      {children}
    </button>
  )
}

