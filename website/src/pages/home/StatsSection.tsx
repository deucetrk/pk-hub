import { m } from 'framer-motion'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

export default function StatsSection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()
  const stats = isThai
    ? [
        { value: '25+', label: 'ปีที่ดำเนินธุรกิจในฉะเชิงเทรา' },
        { value: '180+', label: 'ร้านค้าที่เราดูแล' },
        { value: '฿100M+', label: 'ยอดขายในปี 2026' },
        { value: 'ทุกวัน', label: 'รอบแพ็กและจัดส่ง' },
      ]
    : [
        { value: '25+', label: 'Years in business in Chachoengsao' },
        { value: '180+', label: 'Retail partners supported' },
        { value: '฿100M+', label: 'Sales in 2026' },
        { value: 'Daily', label: 'Packing and dispatch rounds' },
      ]

  return (
    <section id="stats" className="bg-[#111827] py-16 text-white sm:py-20">
      <Container>
        <div className="mb-10 max-w-xl text-sm leading-7 text-slate-400">
          {isThai ? 'ตัวเลขจริงจากทีมค้าส่งมือถือในฉะเชิงเทรา' : 'Real numbers from the Chachoengsao smartphone wholesale team'}
        </div>
        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid gap-px bg-slate-800 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <m.div
              key={stat.label}
              variants={item}
              className="bg-[#111827] py-7 sm:px-7 lg:min-h-44 lg:px-8"
            >
              <div className="font-display text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl xl:text-7xl">
                {stat.value}
              </div>
              <div className="mt-5 text-sm leading-6 text-slate-400">{stat.label}</div>
            </m.div>
          ))}
        </m.div>
      </Container>
    </section>
  )
}
