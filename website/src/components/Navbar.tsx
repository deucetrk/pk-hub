import { useEffect, useMemo, useState } from 'react'

import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import Container from './Container'
import LanguageSwitch from './LanguageSwitch'
import LogoMark from './LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'

type NavItem = { href: string; label: string }

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isThai } = useLanguage()

  const items = useMemo<NavItem[]>(
    () =>
      isThai
        ? [
            { href: '#trust', label: 'ความน่าเชื่อถือ' },
            { href: '#brands', label: 'แบรนด์' },
            { href: '#proof', label: 'หน้าร้านจริง' },
            { href: '#process', label: 'ขั้นตอนสั่งซื้อ' },
            { href: '#area', label: 'พื้นที่บริการ' },
            { href: '#form', label: 'ฝากข้อมูลร้าน' },
            { href: '#contact', label: 'ทักทีมขาย' },
          ]
        : [
            { href: '#trust', label: 'Why PK HUB' },
            { href: '#brands', label: 'Brands' },
            { href: '#proof', label: 'Our storefront' },
            { href: '#process', label: 'How to order' },
            { href: '#area', label: 'Service area' },
            { href: '#form', label: 'Store details' },
            { href: '#contact', label: 'Talk to sales' },
          ],
    [isThai],
  )

  const primaryItems = useMemo<NavItem[]>(
    () => items.slice(0, 3),
    [items],
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/50 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <a href="#top" className="flex min-w-0 items-center gap-4" aria-label="PK HUB">
            <LogoMark className="h-10 sm:h-12 w-auto shrink-0" />
            <div className="hidden min-w-0 lg:block">
              <div className="mt-1 text-sm font-semibold text-zinc-500">
                {isThai ? 'เช็กราคาส่งมือถือสำหรับร้านค้า' : 'Wholesale phone prices for retailers'}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 xl:gap-8 lg:flex" aria-label={isThai ? 'เมนู' : 'Navigation'}>
            {primaryItems.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="whitespace-nowrap border-b-2 border-transparent pb-1 text-[0.95rem] font-bold text-zinc-600 transition-colors duration-150 hover:border-black hover:text-black"
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
              href="https://lin.ee/VEgW6qG"
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-12 items-center justify-center whitespace-nowrap rounded-2xl border border-transparent bg-zinc-900 px-6 text-sm font-semibold tracking-tight text-white shadow-sm transition-all active:scale-[0.98] hover:bg-zinc-800 hover:shadow-md lg:inline-flex"
            >
              {isThai ? 'Inbox LINE มาเลย' : 'Inbox us on LINE'}
            </a>
            <a
              href="#contact"
              className="hidden whitespace-nowrap text-sm font-bold text-zinc-600 transition-colors hover:text-black xl:inline-flex"
            >
              {isThai ? 'ทักทีมขาย' : 'Talk to sales'}
            </a>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-sm text-zinc-900 shadow-sm transition-all active:scale-[0.98] hover:bg-zinc-50 lg:hidden"
              aria-label={open ? (isThai ? 'ปิดเมนู' : 'Close menu') : isThai ? 'เปิดเมนู' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            'grid gap-2 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:hidden',
            open ? 'max-h-[80vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="mt-3 grid gap-2 rounded-2xl border border-zinc-200/50 bg-white/80 p-3 shadow-xl backdrop-blur-lg">
            <div className="px-4 py-2 sm:hidden">
              <LanguageSwitch />
            </div>
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="rounded-xl px-4 py-3 text-[0.95rem] font-semibold text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-900"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
            <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
              <a
                href="https://lin.ee/VEgW6qG"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-white shadow-md transition-all hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                {isThai ? 'Inbox LINE มาเลย' : 'Inbox us on LINE'}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white/50 px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-zinc-900 shadow-sm transition-all hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                {isThai ? 'ทักทีมขาย' : 'Talk to sales'}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
