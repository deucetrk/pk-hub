import type { ReactNode } from 'react'

import { useLanguage } from '@/i18n/LanguageContext'

import ContactBar from './ContactBar'
import CtaBand from './CtaBand'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import { useReveal } from './useReveal'

type PageShellProps = {
  children: ReactNode
  cta?: boolean
  /** Phone contact bar; off on the join page, where the form is the action. */
  contactBar?: boolean
  className?: string
}

/** Shared v1 chrome: skip link, sticky header, page content, joining band, footer and phone contact bar. */
export default function PageShell({ children, cta = true, contactBar = true, className }: PageShellProps) {
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
      {contactBar ? <ContactBar /> : null}
    </div>
  )
}
