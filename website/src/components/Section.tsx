import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import Container from './Container'

export default function Section({
  id,
  title,
  subtitle,
  children,
  variant = 'default',
}: {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  variant?: 'default' | 'muted' | 'inverse'
}) {
  const sectionClass =
    variant === 'inverse'
      ? 'bg-black text-white'
      : variant === 'muted'
        ? 'bg-zinc-50 text-black'
        : 'bg-white text-black'

  return (
    <section id={id} className={cn('scroll-mt-20 py-16 sm:py-24', sectionClass)}>
      <Container>
        <div className="grid gap-8 sm:gap-12">
          <div className="grid max-w-3xl gap-4">
            <h2 className={cn('font-display text-3xl font-black leading-[1.12] tracking-[-0.035em] sm:text-4xl', variant === 'inverse' && 'text-white')}>
              {title}
            </h2>
            {subtitle ? (
              <p className={cn('text-base leading-[1.8] sm:text-lg', variant === 'inverse' ? 'text-zinc-400' : 'text-zinc-600')}>
                {subtitle}
              </p>
            ) : null}
          </div>
          {children}
        </div>
      </Container>
    </section>
  )
}
