import Section from '@/components/Section'
import { motion, type Variants } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageContext'

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}

export default function ProcessSection() {
  const { isThai } = useLanguage()
  const steps = isThai ? TH_STEPS : EN_STEPS

  return (
    <Section
      id="process"
      title={isThai ? 'สั่งยังไง? เริ่มจากทัก LINE' : 'How to order? Start with LINE.'}
      subtitle={isThai ? 'ไม่ต้องรู้ทุกรุ่นก่อนก็ได้ บอกงบหรือรุ่นที่สนใจ แล้วทีมช่วยไล่ราคาให้' : 'You do not need every model planned. Tell us your budget or target models and our team will help.'}
    >
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((s) => (
          <motion.div variants={itemVariants} key={s.n} className="rounded-3xl border border-zinc-200/60 bg-white/60 p-10 shadow-sm backdrop-blur-md transition-all ease-out hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-bold text-white shadow-sm">
              {s.n}
            </div>
            <div className="mt-8 text-[1.15rem] font-bold tracking-tight text-zinc-900">{s.t}</div>
            <div className="mt-4 text-base leading-[1.8] text-zinc-600">{s.d}</div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
