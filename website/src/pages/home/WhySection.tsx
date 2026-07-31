import { m } from 'framer-motion'
import { BadgeCheck, MessageCircle, ReceiptText } from 'lucide-react'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

export default function WhySection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()

  const blocks = [
    {
      icon: BadgeCheck,
      th: {
        title: 'เลิกลุ้นเครื่องนอก',
        body: 'ทุกเครื่องเป็นของศูนย์ไทย 100% จาก AIS Authorized Distributor อย่างเป็นทางการ — เครื่องใหม่มือหนึ่ง ประกันศูนย์ไทย ตรวจสอบได้',
      },
      en: {
        title: 'Stop gambling on grey-market stock',
        body: 'Every unit is a brand-new official Thai-market device from an authorized AIS Distributor, with Thai warranty you can verify.',
      },
    },
    {
      icon: MessageCircle,
      th: {
        title: 'เลิกเสียเวลารอเช็กราคา',
        body: 'ทัก LINE ทีมพื้นที่ตอบไว เช็กสต็อกและราคาส่งล่าสุดให้ทันที ยืนยันทันรอบก็แพ็กส่งในวันเดียวกัน',
      },
      en: {
        title: 'Stop waiting for price checks',
        body: 'Message us on LINE and the local team replies fast with live stock and wholesale prices — confirm before the cutoff and we dispatch the same day.',
      },
    },
    {
      icon: ReceiptText,
      th: {
        title: 'เลิกปวดหัวเรื่องเอกสาร',
        body: 'จดทะเบียน VAT ออกใบกำกับภาษีเต็มรูปแบบให้บริษัท ร้านค้าปลีก และเชนร้านค้า เอกสารบัญชีถูกต้องครบ',
      },
      en: {
        title: 'Stop fighting with paperwork',
        body: 'VAT registered with full tax invoices for companies, retailers, and retail chains — proper accounting documents, every order.',
      },
    },
  ]

  return (
    <Section
      id="why"
      variant="muted"
      title={isThai ? 'ทำไมร้านค้าเลือก PK HUB' : 'Why retailers choose PK HUB'}
      subtitle={
        isThai
          ? 'ทีมค้าส่งมือถือภายใต้ PK Media ที่ดูแลร้านค้าในฉะเชิงเทราและภาคตะวันออกมากว่า 25 ปี'
          : 'The smartphone wholesale team under PK Media, serving Chachoengsao and Eastern Thailand retailers for over 25 years.'
      }
    >
      <m.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid gap-6 md:grid-cols-3"
      >
        {blocks.map((block) => {
          const Icon = block.icon
          const copy = isThai ? block.th : block.en
          return (
            <m.div
              key={block.en.title}
              variants={item}
              className="grid content-start gap-4 rounded-none border-2 border-black bg-white p-8 transition-all hover:bg-slate-50 hover:shadow-md motion-safe:hover:-translate-y-0.5"
            >
              <Icon className="h-10 w-10 shrink-0 stroke-[1.5]" />
              <div className="text-xl font-black">{copy.title}</div>
              <div className="text-base leading-[1.8] text-slate-600">{copy.body}</div>
            </m.div>
          )
        })}
      </m.div>
    </Section>
  )
}
