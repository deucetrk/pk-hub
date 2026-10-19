import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useAcquisitionContext } from '@/hooks/useAcquisitionContext'
import { dealerLoginUrl } from '@/lib/dealerPortal'
import { withReferral } from '@/utils/referralAttribution'

import { route, t } from './site'

export default function SiteHeader() {
  useAcquisitionContext()
  const { language, setLanguage } = useLanguage()
  const { pathname } = useLocation()
  const referralCode = useReferralAttribution()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  const home = route(language)
  const isHome = pathname === home || pathname === `${home}/` || pathname === '/'
  const joinPath = withReferral(route(language, '/join'), referralCode)
  const links = [
    { href: route(language, '/products'), label: t(language, 'สิทธิ์และบริการ', 'Services') },
    { href: isHome ? '#v1-start' : `${home}#v1-start`, label: t(language, 'วิธีเริ่มต้น', 'How to start') },
    ...(language === 'th' ? [{ href: '/th/blog', label: 'บทความ' }] : []),
    { href: route(language, '/contact'), label: t(language, 'ติดต่อ', 'Contact') },
  ]

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButton.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="v1-header" data-scrolled={scrolled || open}>
      <div className="v1-wrap v1-header-row">
        <a href={isHome ? '#top' : home} className="v1-header-logo inline-flex min-h-11 items-center" aria-label="PK HUB">
          <img src="/v1/brands/pkhub.webp" alt="PK HUB" width={360} height={119} loading="eager" decoding="async" />
        </a>
        <nav className="v1-header-nav" aria-label={t(language, 'เมนูหลัก', 'Main menu')}>
          {links.slice(0, 2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="v1-nav-link"
              aria-current={pathname.startsWith(link.href) && link.href !== home ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
          <a href={dealerLoginUrl(referralCode)} className="v1-nav-link v1-nav-muted">
            {t(language, 'เข้าสู่ระบบคู่ค้า', 'Partner login')} <span aria-hidden="true">↗</span>
          </a>
          <a href={joinPath} className="v1-btn v1-btn-primary v1-btn-sm">
            {t(language, 'สมัครเป็นคู่ค้า', 'Become a partner')}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            type="button"
            className="v1-menu-button"
            aria-expanded={open}
            aria-controls="v1-mobile-menu"
            aria-label={open ? t(language, 'ปิดเมนู', 'Close menu') : t(language, 'เปิดเมนู', 'Open menu')}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
      </div>
      {open ? (
        <div id="v1-mobile-menu" className="v1-mobile-menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <span aria-hidden="true">→</span>
            </a>
          ))}
          <a href={dealerLoginUrl(referralCode)}>
            {t(language, 'เข้าสู่ระบบคู่ค้า', 'Partner login')}
            <span aria-hidden="true">↗</span>
          </a>
          <button type="button" onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}>
            {language === 'th' ? 'English' : 'ภาษาไทย'}
            <span aria-hidden="true">{language === 'th' ? 'EN' : 'TH'}</span>
          </button>
        </div>
      ) : null}
    </header>
  )
}
