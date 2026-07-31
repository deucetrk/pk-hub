import { m } from 'framer-motion'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

const TH_STEPS = [
  { n: '1', t: 'Inbox LINE มาเลย', d: 'บอกว่าเป็นร้านมือถือ หรือกำลังเริ่มขาย พร้อมรุ่นที่อยากเช็ก' },
  { n: '2', t: 'ทีมเช็กราคาให้', d: 'ส่งราคาส่งล่าสุด เช็กสต็อก และแนะนำรุ่นที่เหมาะกับร้าน' },
  { n: '3', t: 'ถูกใจแล้วค่อยสรุปออเดอร์', d: 'ตกลงรุ่น จำนวน และรอบส่งให้ชัดก่อนแพ็กสินค้า' },
  { n: '4', t: 'แพ็กและส่งตามรอบ', d: 'ยืนยันทันรอบก็ออกของไว ไม่ทันรอบก็สรุปวันส่งถัดไปให้ชัดเจน' },
]

const EN_STEPS = [
  { n: '1', t: 'Inbox us on LINE', d: 'Tell us whether you run a phone shop or are just starting, plus the models you want.' },
  { n: '2', t: 'We check prices for you', d: 'Our team shares current wholesale prices, stock, and starter-friendly model options.' },
  { n: '3', t: 'Confirm only when ready', d: 'Agree on models, quantities, and dispatch timing before packing.' },
  { n: '4', t: 'Packed and dispatched', d: 'Orders go out on the available dispatch round with clear timing from our team.' },
]

export default function ProcessSection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()
  const steps = isThai ? TH_STEPS : EN_STEPS

  return (
    <Section
      id="process"
      variant="inverse"
      title={isThai ? 'สั่งยังไง? เริ่มจากทัก LINE' : 'How to order? Start with LINE.'}
      subtitle={isThai ? 'ไม่ต้องรู้ทุกรุ่นก่อนก็ได้ บอกงบหรือรุ่นที่สนใจ แล้วทีมช่วยไล่ราคาให้' : 'You do not need every model planned. Tell us your budget or target models and our team will help.'}
    >
      <m.ol
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="border-b border-slate-800"
      >
        {steps.map((s, index) => (
          <m.li
            variants={item}
            key={s.n}
            className="grid gap-3 border-t border-slate-800 py-8 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-10 sm:py-10"
          >
            <div className="font-display text-6xl font-black leading-none tracking-[-0.05em] text-white sm:text-7xl">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white sm:text-2xl">{s.t}</div>
              <div className="mt-2 max-w-2xl text-base leading-[1.8] text-slate-400">{s.d}</div>
            </div>
          </m.li>
        ))}
      </m.ol>
    </Section>
  )
}
