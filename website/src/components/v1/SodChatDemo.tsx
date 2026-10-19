import { useEffect, useRef, useState } from 'react'

import { useLanguage } from '@/i18n/LanguageContext'

import { t } from './site'

const LAST_STEP = 5
// step 1: customer asks · 2: store typing · 3: request sent · 4: PK typing · 5: PK reply
const TIMELINE = [0, 650, 1500, 2150, 3050]

/**
 * Illustrative Stock on Demand chat. Bubbles arrive one at a time when the demo scrolls into view
 * and replay when another sample question is chosen. All text stays in the DOM (only opacity
 * changes), the prerendered and reduced-motion state is the finished conversation, and nothing
 * here quotes, reserves stock or places an order.
 */
export default function SodChatDemo({ tone = 'dark' }: { tone?: 'dark' | 'glass' }) {
  const { language } = useLanguage()
  const samples = [
    {
      chip: 'Galaxy',
      ask: t(language, '“มี Galaxy รุ่นนี้สีม่วงไหม?”', '“Do you have this Galaxy in purple?”'),
      request: t(language, 'Galaxy · สีม่วง · 1 เครื่อง', 'Galaxy · purple · 1 unit'),
    },
    {
      chip: 'iPhone',
      ask: t(language, '“iPhone รุ่นนี้ 256GB สีดำ มีไหม?”', '“This iPhone in 256GB black?”'),
      request: t(language, 'iPhone · 256GB · สีดำ · 1 เครื่อง', 'iPhone · 256GB · black · 1 unit'),
    },
    {
      chip: 'OPPO',
      ask: t(language, '“ขอ OPPO รุ่นนี้ 2 เครื่องได้ไหม?”', '“Can I get two of this OPPO?”'),
      request: t(language, 'OPPO · 2 เครื่อง', 'OPPO · 2 units'),
    },
  ]
  const [sample, setSample] = useState(0)
  const [step, setStep] = useState(LAST_STEP)
  const [run, setRun] = useState(0)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = root.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setRun((value) => value + 1)
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!run) return
    setStep(0)
    const timers = TIMELINE.map((delay, index) => window.setTimeout(() => setStep(index + 1), delay))
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [run, sample])

  const choose = (index: number) => {
    setSample(index)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setRun((value) => value + 1)
  }

  const current = samples[sample]
  const on = (n: number) => ({ 'data-on': step >= n })
  return (
    <div ref={root} className={`v1-sod-demo ${tone === 'glass' ? 'v1-sod-demo-glass' : ''}`}>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t(language, 'เลือกคำถามตัวอย่าง', 'Choose a sample question')}>
        <span className="text-[13px] text-[#bebebe]">{t(language, 'ลองถาม:', 'Try:')}</span>
        {samples.map((item, index) => (
          <button key={item.chip} type="button" className="v1-sod-chip" aria-pressed={sample === index} onClick={() => choose(index)}>
            {item.chip}
          </button>
        ))}
      </div>
      <div className="v1-chat" aria-live="polite">
        <div className="v1-msg grid gap-1.5 justify-self-start" {...on(1)}>
          <p className="v1-bubble">{current.ask}</p>
          <p className="pl-1.5 text-[13px] leading-5 text-[#bebebe]">{t(language, 'ลูกค้าที่หน้าร้าน', 'Customer at the counter')}</p>
        </div>
        <span className="v1-typing justify-self-end" data-on={step === 1 || step === 2} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="v1-msg v1-bubble v1-bubble-out grid gap-1" {...on(3)}>
          <span className="text-[13px] text-[#dce5ff]">{t(language, 'คำขอจากร้าน → PK HUB', 'Store request → PK HUB')}</span>
          <span>{current.request}</span>
        </div>
        <span className="v1-typing justify-self-start" data-on={step === 3 || step === 4} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="v1-msg v1-bubble-card" {...on(5)}>
          <p className="text-sm text-[#a9bef7]">{t(language, 'PK เช็กแล้ว (ตัวอย่าง)', 'PK checked (example)')}</p>
          <div>
            <span>{t(language, 'มีสินค้า', 'In stock')}</span>
            <span aria-hidden="true">✓</span>
          </div>
          <div>
            <span>{t(language, 'ราคาส่ง + ค่าจัดส่ง', 'Wholesale + shipping')}</span>
            <span>{t(language, 'คิดตามจริง', 'Actual cost')}</span>
          </div>
          <div>
            <span>{t(language, 'เตรียม · ส่ง', 'Prepare · ship')}</span>
            <span>{t(language, '1–2 วัน · 1–2 วัน', '1–2 days · 1–2 days')}</span>
          </div>
        </div>
      </div>
      <p className="text-[13px] leading-5 text-[#bebebe]">
        {t(language, 'คำขอยังไม่ใช่การยืนยันสินค้าและออเดอร์ ร้านยืนยันก่อนสั่งซื้อทุกครั้ง', 'A request does not confirm stock or an order; you always confirm before ordering.')}
      </p>
    </div>
  )
}
