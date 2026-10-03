import { useEffect, useRef } from 'react'

import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
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
    <div className="min-h-dvh bg-[var(--pk-white)] text-[var(--pk-black)]">
      <a href="#not-found" className="pk-skip-link">
        ข้ามไปเนื้อหา · Skip to content
      </a>
      <header className="border-b border-zinc-300">
        <Container className="py-3">
          <a className="inline-flex" href="/th" aria-label="PK HUB">
            <LogoMark className="h-11 w-auto" />
          </a>
        </Container>
      </header>
      <main id="not-found" tabIndex={-1} className="pk-route-feedback">
        <Container>
          <div className="pk-route-feedback-copy">
            <p className="pk-route-feedback-label">PK HUB · 404</p>
            <h1 ref={heading} tabIndex={-1} lang="th" className="focus:outline-none">
              ไม่พบหน้าที่ต้องการ
              <span className="block mt-3 text-[0.6em]" lang="en">
                Page not found
              </span>
            </h1>
            <p lang="th">ลิงก์นี้อาจเปลี่ยนไปแล้ว เลือกกลับหน้าหลักหรืออ่านบทความสำหรับร้านค้า</p>
            <p lang="en">This link may have changed. Return home or browse our retailer journal.</p>
            <div className="pk-route-feedback-actions">
              <a className="pk-action pk-action-primary" href="/th" lang="th">
                หน้าหลักภาษาไทย
              </a>
              <a className="pk-action pk-action-secondary" href="/en" lang="en">
                English home
              </a>
              <a className="pk-action pk-action-secondary" href="/th/blog">
                บทความร้านค้า · Journal
              </a>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
