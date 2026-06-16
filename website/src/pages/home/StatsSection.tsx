import { motion } from 'framer-motion'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'

export default function StatsSection() {
  const { isThai } = useLanguage()
  const stats = isThai
    ? [
        { value: 'ทุกวัน', label: 'เช็กอินรอบแพ็กและจัดส่ง' },
        { value: '180+', label: 'ร้านค้าที่เราดูแล' },
        { value: '100%', label: 'มือถือเครื่องศูนย์ไทย' },
        { value: '฿100M+', label: 'ยอดขายในปี 2026' },
      ]
    : [
        { value: 'Daily', label: 'Packing and dispatch check-in' },
        { value: '180+', label: 'Retail partners supported' },
        { value: '100%', label: 'Official Thai-market devices' },
        { value: '฿100M+', label: 'Sales in 2026' },
      ]

  return (
    <section id="stats" className="bg-[#090909] py-16 text-white sm:py-20">
      <Container>
        <div className="mb-10 max-w-xl text-sm leading-7 text-zinc-500">
          {isThai ? 'ตัวเลขจากการดำเนินงานจริงของเรา' : 'Numbers from our day-to-day operation'}
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="bg-[#090909] py-7 sm:px-7 lg:min-h-44 lg:px-8"
            >
              <div className="font-display text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl xl:text-7xl">
                {stat.value}
              </div>
              <div className="mt-5 text-sm leading-6 text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
