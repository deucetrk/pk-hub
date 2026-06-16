import Section from '@/components/Section'
import { motion, type Variants } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageContext'

const TH_STEPS = [
  { n: '1', t: 'ทัก LINE หรือโทรเข้ามา', d: 'แจ้งว่าคุณเป็นร้านค้า พร้อมระบุแบรนด์หรือรุ่นที่ต้องการเช็ก' },
  { n: '2', t: 'รับราคาและเช็กสต็อก', d: 'ทีมจะส่งรายการราคาล่าสุดและช่วยเช็กความพร้อมของรุ่นที่สนใจ' },
  { n: '3', t: 'ยืนยันออเดอร์กับทีม', d: 'ตกลงรุ่น จำนวน และรอบจัดส่งให้ชัดเจนก่อนแพ็กสินค้า' },
  { n: '4', t: 'แพ็กและส่งภายในวัน / วันถัดไป', d: 'หากยืนยันทันรอบจะจัดส่งวันเดียวกัน หากไม่ทันจะออกในวันถัดไป' },
]

const EN_STEPS = [
  { n: '1', t: 'Message us on LINE or call', d: 'Tell us about your shop and the brands or models you need.' },
  { n: '2', t: 'Receive prices and stock status', d: 'Our team shares the latest wholesale prices and confirms availability.' },
  { n: '3', t: 'Confirm the order with our team', d: 'Agree on models, quantities, payment, and dispatch timing.' },
  { n: '4', t: 'Packed and dispatched', d: 'Orders confirmed before cutoff leave the same day or the following day.' },
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
      title={isThai ? 'กระบวนการสั่งซื้อสำหรับร้านค้า' : 'How retailers order from PK HUB'}
      subtitle={isThai ? 'คุยกับทีมจริง เช็กสต็อกจริง และสรุปออเดอร์ได้เร็ว' : 'Speak with a real team, confirm real stock, and place orders quickly.'}
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
