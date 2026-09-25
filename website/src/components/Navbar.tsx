import { useEffect, useMemo, useRef, useState } from 'react'

import { Menu, Store, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { publishedArticles } from '@/content/blog/articles'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'
import { CONTACT } from '@/pages/home/constants'

import Container from './Container'
import LanguageSwitch from './LanguageSwitch'
import LogoMark from './LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'

type NavItem = { href: string; label: string }

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const { isThai, language } = useLanguage()
  const location = useLocation()
  const referralCode = useReferralAttribution()
  const homePath = `/${language}`
  const joinPath = withReferral(`/${language}/join`, referralCode)
  const dealerLoginPath = withReferral(`/${language}/dealer/login`, referralCode)

  const items = useMemo<NavItem[]>(
    () =>
      isThai
        ? [
            { href: `${homePath}#why`, label: 'พาร์ทเนอร์ร้านค้า' },
            { href: `${homePath}#brands`, label: 'แบรนด์' },
            { href: `${homePath}#proof`, label: 'งานจริง' },
            ...(publishedArticles.length ? [{ href: '/th/blog', label: 'บทความ' }] : []),
            { href: `${homePath}#process`, label: 'เริ่มเป็นพาร์ทเนอร์' },
            { href: `${homePath}#faq`, label: 'คำถามที่พบบ่อย' },
            { href: `${homePath}#contact`, label: 'ทักทีมขาย' },
          ]
        : [
            { href: `${homePath}#why`, label: 'Our ecosystem' },
            { href: `${homePath}#brands`, label: 'Brands' },
            { href: `${homePath}#proof`, label: 'Real work' },
            { href: `${homePath}#process`, label: 'Become a partner' },
            { href: `${homePath}#faq`, label: 'FAQ' },
            { href: `${homePath}#contact`, label: 'Talk to sales' },
          ],
    [homePath, isThai],
  )

  const primaryItems = useMemo<NavItem[]>(
    () => items.slice(0, isThai && publishedArticles.length ? 4 : 3),
    [isThai, items],
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => mobileMenuButtonRef.current?.focus())
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-300 bg-[#f7f7f8]">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <a href={location.pathname === homePath ? '#top' : homePath} className="flex shrink-0 items-center" aria-label="PK HUB">
            <LogoMark className="h-11 sm:h-12 w-auto shrink-0" />
          </a>

          <nav className="hidden items-center gap-5 xl:gap-7 xl:flex" aria-label={isThai ? 'เมนู' : 'Navigation'}>
            {primaryItems.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="whitespace-nowrap border-b-2 border-transparent pb-1 text-[0.95rem] font-bold text-zinc-700 transition-colors duration-150 hover:border-black hover:text-black"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitch />
            </div>
            <a
              href={joinPath}
              className="pk-action pk-action-primary hidden whitespace-nowrap lg:inline-flex"
            >
              {isThai ? 'สมัครพาร์ทเนอร์' : 'Become a partner'}
            </a>
            <a
              href={dealerLoginPath}
              className="hidden min-h-11 items-center justify-center gap-1.5 whitespace-nowrap px-2 text-sm font-bold text-zinc-700 transition-colors hover:text-zinc-950 xl:inline-flex"
            >
              <Store className="h-4 w-4" />
              {isThai ? 'เข้าระบบค้าส่ง' : 'Dealer login'}
            </a>
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center border border-zinc-300 bg-[#f7f7f8] text-[#18181b] transition-colors hover:bg-white xl:hidden"
              aria-label={open ? (isThai ? 'ปิดเมนู' : 'Close menu') : isThai ? 'เปิดเมนู' : 'Open menu'}
              aria-controls="pkhub-mobile-navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="pkhub-mobile-navigation"
            className="grid max-h-[80vh] gap-2 overflow-y-auto xl:hidden"
            aria-label={isThai ? 'เมนูมือถือ' : 'Mobile navigation'}
          >
            <div className="mt-3 grid gap-2 border border-zinc-300 bg-[#f7f7f8] p-3">
            <div className="px-4 py-2 sm:hidden">
              <LanguageSwitch onChange={() => setOpen(false)} />
            </div>
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="px-4 py-3 text-[0.95rem] font-semibold text-zinc-700 hover:bg-white hover:text-[#18181b]"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
            <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
              <a
                href={CONTACT.LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="pk-action border border-[#06c755] bg-[#06c755] text-white hover:border-[#05b34c] hover:bg-[#05b34c]"
                onClick={() => setOpen(false)}
              >
                {isThai ? 'Inbox LINE มาเลย' : 'Inbox us on LINE'}
              </a>
              <a
                href={joinPath}
                className="inline-flex items-center justify-center border border-zinc-300 bg-white px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-zinc-900 transition-colors hover:border-zinc-900"
                onClick={() => setOpen(false)}
              >
                {isThai ? 'สมัครเป็นร้านค้าพาร์ทเนอร์' : 'Become a retailer'}
              </a>
              <a
                href={dealerLoginPath}
                className="inline-flex items-center justify-center gap-1.5 border border-zinc-300 bg-white px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-zinc-900 transition-colors hover:border-zinc-900 sm:col-span-2"
                onClick={() => setOpen(false)}
              >
                <Store className="h-4 w-4" />
                {isThai ? 'เข้าระบบค้าส่ง' : 'Dealer login'}
              </a>
            </div>
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  )
}
