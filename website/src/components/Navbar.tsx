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
            { href: `${homePath}#why`, label: 'ทำไม PK HUB' },
            { href: `${homePath}#brands`, label: 'แบรนด์' },
            { href: `${homePath}#proof`, label: 'งานจริง' },
            ...(publishedArticles.length ? [{ href: '/th/blog', label: 'บทความ' }] : []),
            { href: `${homePath}#process`, label: 'ขั้นตอนสั่งซื้อ' },
            { href: `${homePath}#faq`, label: 'คำถามที่พบบ่อย' },
            { href: `${homePath}#contact`, label: 'ทักทีมขาย' },
          ]
        : [
            { href: `${homePath}#why`, label: 'Why PK HUB' },
            { href: `${homePath}#brands`, label: 'Brands' },
            { href: `${homePath}#proof`, label: 'Real work' },
            { href: `${homePath}#process`, label: 'How to order' },
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <a href={location.pathname === homePath ? '#top' : homePath} className="flex min-w-0 items-center gap-4" aria-label="PK HUB">
            <LogoMark className="h-10 sm:h-12 w-auto shrink-0" />
            <div className="hidden min-w-0 lg:block">
              <div className="mt-1 text-sm font-semibold text-slate-500">
                {isThai ? 'เช็กราคาส่งมือถือสำหรับร้านค้า' : 'Wholesale phone prices for retailers'}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 xl:gap-8 lg:flex" aria-label={isThai ? 'เมนู' : 'Navigation'}>
            {primaryItems.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="whitespace-nowrap border-b-2 border-transparent pb-1 text-[0.95rem] font-bold text-slate-600 transition-colors duration-150 hover:border-black hover:text-black"
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
              href={CONTACT.LINE_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-12 items-center justify-center whitespace-nowrap rounded-none bg-[#06c755] px-6 text-sm font-semibold tracking-tight text-white shadow-sm transition-all hover:bg-[#05b34c] active:scale-[0.98] lg:inline-flex"
            >
              {isThai ? 'Inbox LINE มาเลย' : 'Inbox us on LINE'}
            </a>
            <a
              href={joinPath}
              className="hidden min-h-11 items-center justify-center whitespace-nowrap border border-stone-300 px-5 text-sm font-bold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-950 xl:inline-flex"
            >
              {isThai ? 'สมัครเป็นร้านค้าพาร์ทเนอร์' : 'Become a retailer'}
            </a>
            <a
              href={dealerLoginPath}
              className="hidden min-h-11 items-center justify-center gap-1.5 whitespace-nowrap border border-stone-300 px-4 text-sm font-bold text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-950 xl:inline-flex"
            >
              <Store className="h-4 w-4" />
              {isThai ? 'เข้าระบบค้าส่ง' : 'Dealer login'}
            </a>
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors hover:bg-slate-50 lg:hidden"
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
            className="grid max-h-[80vh] gap-2 overflow-y-auto lg:hidden"
            aria-label={isThai ? 'เมนูมือถือ' : 'Mobile navigation'}
          >
            <div className="mt-3 grid gap-2 border border-slate-200 bg-white p-3 shadow-md">
            <div className="px-4 py-2 sm:hidden">
              <LanguageSwitch onChange={() => setOpen(false)} />
            </div>
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="rounded-md px-4 py-3 text-[0.95rem] font-semibold text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
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
                className="inline-flex items-center justify-center rounded-none bg-[#06c755] px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-white shadow-md transition-all hover:bg-[#05b34c]"
                onClick={() => setOpen(false)}
              >
                {isThai ? 'Inbox LINE มาเลย' : 'Inbox us on LINE'}
              </a>
              <a
                href={joinPath}
                className="inline-flex items-center justify-center border border-stone-300 bg-white px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-stone-900 transition-colors hover:border-stone-900"
                onClick={() => setOpen(false)}
              >
                {isThai ? 'สมัครเป็นร้านค้าพาร์ทเนอร์' : 'Become a retailer'}
              </a>
              <a
                href={dealerLoginPath}
                className="inline-flex items-center justify-center gap-1.5 border border-stone-300 bg-white px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-stone-900 transition-colors hover:border-stone-900 sm:col-span-2"
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
