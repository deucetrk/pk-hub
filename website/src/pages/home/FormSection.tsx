import { motion } from 'framer-motion'

import PartnerForm from '@/components/PartnerForm'
import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

export default function FormSection() {
  const { isThai } = useLanguage()
  const { item, reduceMotion } = useRevealMotion()

  return (
    <Section
      id="form"
      title={isThai ? 'ฝากข้อมูลร้านไว้ ให้ทีมเช็กราคาให้' : 'Leave your store details for a price check'}
      subtitle={
        isThai
          ? 'เหมาะสำหรับร้านที่อยากให้ทีมแนะนำรุ่น เช็กสต็อก และติดต่อกลับแบบเป็นเรื่องเป็นราว'
          : 'Best for retailers who want our team to recommend models, check stock, and follow up clearly.'
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr,420px] lg:items-start">
        <PartnerForm />
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid gap-8 rounded-[2rem] border border-zinc-200/50 bg-zinc-100 p-10 shadow-sm"
        >
          <div className="grid gap-3">
            <div className="text-xl font-bold tracking-tight">{isThai ? 'เหมาะกับใคร?' : 'Who is this for?'}</div>
            <div className="text-sm sm:text-base leading-[1.8] text-zinc-600">
              {isThai
                ? 'ร้านมือถือหน้าร้าน ร้านออนไลน์ และคนที่เพิ่งเริ่มขาย แต่อยากได้ของศูนย์ไทยจากทีมที่คุยง่าย'
                : 'Physical phone shops, online sellers, and new retailers who want official Thai stock from a team that is easy to talk to.'}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="text-xs font-bold text-zinc-400">{isThai ? 'ก่อนทักมา' : 'Before you message'}</div>
            <div className="grid gap-3">
              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold shadow-sm border border-zinc-100">{isThai ? 'LINE ตอบไวสุด' : 'LINE gets the fastest reply'}</div>
              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold shadow-sm border border-zinc-100">{isThai ? 'บอกงบหรือรุ่นที่อยากเริ่มได้' : 'Tell us your budget or starter models'}</div>
              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold shadow-sm border border-zinc-100">{isThai ? 'เริ่มคุยได้แม้สั่งไม่เยอะ' : 'You can start small'}</div>
            </div>
          </div>
          <motion.a
            href="https://lin.ee/VEgW6qG"
            target="_blank"
            rel="noreferrer"
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="mt-2 inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-6 py-4 text-sm font-bold tracking-wide text-white transition-colors hover:bg-zinc-800"
          >
            {isThai ? 'Inbox LINE เช็กราคา' : 'Inbox LINE for prices'}
          </motion.a>
        </motion.div>
      </div>
    </Section>
  )
}
