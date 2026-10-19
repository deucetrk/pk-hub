import type { ReactNode } from 'react'

import { useLanguage } from '@/i18n/LanguageContext'

import CtaBand from './CtaBand'
import FloatingContact from './FloatingContact'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import StickyJoin from './StickyJoin'
import { useReveal } from './useReveal'

type PageShellProps = {
  children: ReactNode
  cta?: boolean
  className?: string
}

/** Shared v1 chrome: skip link, sticky header, page content, joining band, footer and contact buttons. */
export default function PageShell({ children, cta = true, className }: PageShellProps) {
  const { language } = useLanguage()
  useReveal(language)
  return (
    <div id="top" className={`v1 min-h-dvh ${className ?? ''}`}>
      <a href="#main-content" className="v1-skip">
        {language === 'th' ? 'ข้ามไปเนื้อหา' : 'Skip to content'}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
        {cta ? <CtaBand /> : null}
      </main>
      <SiteFooter />
      {cta ? <StickyJoin /> : null}
      <FloatingContact />
    </div>
  )
}
