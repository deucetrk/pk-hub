import { useEffect, useRef } from 'react'

import { applyPageMeta, SITE_URL } from '@/lib/seo'

// Bilingual markup is identical for every unknown URL and the static 404 document.
// Native recovery links also work before hydration or when JavaScript is unavailable.
export default function NotFound() {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    applyPageMeta({
      title: 'ไม่พบหน้าที่ต้องการ · Page not found | PK HUB',
      description: 'กลับไปยังหน้าหลัก PK HUB · Return to PK HUB',
      canonical: `${SITE_URL}/th`,
    })
    const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const previous = existing?.content
    const robots = existing ?? document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, follow'
    if (!existing) document.head.appendChild(robots)
    heading.current?.focus({ preventScroll: true })
    return () => {
      if (existing) robots.content = previous
      else robots.remove()
    }
  }, [])
  return (
    <div className="v1 flex min-h-dvh flex-col bg-[#0b0b0b]">
      <a href="#not-found" className="v1-skip">
        ข้ามไปเนื้อหา · Skip to content
      </a>
      <header className="v1-header">
        <div className="v1-wrap v1-header-row">
          <a className="v1-header-logo inline-flex min-h-11 items-center" href="/th" aria-label="PK HUB">
            <img src="/v1/brands/pkhub.webp" alt="PK HUB" width={360} height={119} />
          </a>
          <a href="/th/join" className="v1-btn v1-btn-primary v1-btn-sm">
            สมัครเป็นคู่ค้า ↗
          </a>
        </div>
      </header>
      <main id="not-found" tabIndex={-1} className="v1-hero flex flex-1 items-center outline-none" style={{ background: 'linear-gradient(164deg, #16171a 8%, #23252b 60%, #3a3e48 120%)', paddingBottom: 'clamp(48px, 6vw, 96px)' }}>
        <div className="v1-wrap v1-hero-grid v1-split-hero" style={{ ['--v1-split' as string]: 'minmax(0,620px) minmax(0,420px)' }}>
          <div className="v1-hero-copy">
            <p className="v1-eyebrow v1-eyebrow-sky">404</p>
            <h1 ref={heading} tabIndex={-1} lang="th" className="v1-h1 outline-none">
              ไม่มีหน้านี้
              <br />
              ที่ PK HUB
              <span className="mt-3 block text-[0.42em] leading-tight text-[#a9bef7]" lang="en">
                Page not found
              </span>
            </h1>
            <p className="v1-lede" lang="th">
              ลิงก์อาจพิมพ์ผิดหรือถูกย้ายไปแล้ว ลองเริ่มจากหน้าเหล่านี้
            </p>
            <p className="text-base text-[#c9cdd6]" lang="en">
              The link may be mistyped or moved. Try one of these pages.
            </p>
            <div className="v1-hero-actions">
              <a className="v1-btn v1-btn-white" href="/th" lang="th">
                กลับหน้าแรก
              </a>
              <a className="v1-btn v1-btn-ghost-light" href="/th/products" lang="th">
                ดูบริการทั้งหมด
              </a>
              <a className="v1-btn v1-btn-ghost-light" href="/en" lang="en">
                English home
              </a>
              <a className="v1-link text-white" href="/th/blog">
                บทความ · Journal
              </a>
            </div>
          </div>
          <svg viewBox="0 0 300 520" className="mx-auto hidden h-auto w-[260px] lg:block" aria-hidden="true">
            <rect x="40" y="10" width="220" height="460" rx="40" fill="#1B1D21" stroke="#fff" strokeWidth="2" />
            <rect x="118" y="30" width="64" height="16" rx="8" fill="#0B0B0B" />
            <text x="150" y="270" textAnchor="middle" fontFamily="Anuphan" fontWeight="300" fontSize="88" fill="#A9BEF7">
              404
            </text>
            <path d="M90 320h120M110 345h80" stroke="rgba(255,255,255,.2)" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="150" cy="500" rx="110" ry="10" fill="rgba(0,0,0,.4)" />
          </svg>
        </div>
      </main>
    </div>
  )
}
