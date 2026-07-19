import { m } from 'framer-motion'
import { BadgeCheck, MessageCircle, ReceiptText } from 'lucide-react'

import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'
import { CONTACT } from '@/pages/home/constants'

const HERO_STATS = [
  { th: { label: 'ร้านค้าที่ดูแล', value: '180+' }, en: { label: 'Retail partners', value: '180+' } },
  { th: { label: 'สินค้า', value: 'ศูนย์ไทย 100%' }, en: { label: 'Products', value: '100% Thai official' } },
  { th: { label: 'จัดส่ง', value: 'ส่งทุกวัน' }, en: { label: 'Dispatch', value: 'Daily' } },
  { th: { label: 'เอกสารธุรกิจ', value: 'VAT พร้อม' }, en: { label: 'Business docs', value: 'VAT ready' } },
]

export default function HeroSection() {
  const { isThai } = useLanguage()
  const { container, item, reduceMotion } = useRevealMotion()

  return (
    <section className="bg-[#090909] text-white">
      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-7">
            <div className="flex items-center gap-4">
              <span className="inline-block bg-white px-2 py-1">
                <LogoMark className="h-8" />
              </span>
              <div className="text-sm font-semibold tracking-wide text-zinc-400">
                {isThai ? 'AIS Partner • ฉะเชิงเทรา' : 'AIS Partner • Chachoengsao'}
              </div>
            </div>
            <h1 className="font-display text-5xl font-black leading-[1.24] tracking-[-0.025em] text-white sm:text-6xl sm:leading-[1.22] lg:text-7xl lg:leading-[1.2]">
              {isThai ? 'พาร์ทเนอร์ตัวแทนจำหน่าย AIS ในจังหวัดฉะเชิงเทรา' : 'AIS distributor partner in Chachoengsao'}
            </h1>
            <p className="text-xl font-bold leading-snug text-zinc-200 sm:text-2xl">
              {isThai
                ? 'เครื่องศูนย์ไทย ซิม AIS และบริการหลังการขาย — พร้อมรอบส่งในฉะเชิงเทรา'
                : 'Thai official devices, AIS SIMs, and after-sales support — with dispatch rounds in Chachoengsao'}
            </p>
            <p className="max-w-xl text-base leading-[1.8] text-zinc-400 sm:text-lg">
              {isThai
                ? 'PK Hub ดูแลเครื่องศูนย์ไทย ซิม AIS และบริการหลังการขายสำหรับร้านค้ามือถือในพื้นที่ ร้านที่ต้องการรับเครื่องไปขายต่อสามารถทักมาเช็กสต็อก ราคา และรอบส่งกับทีมในพื้นที่ได้โดยตรง'
                : 'PK Hub supports local phone retailers with Thai official devices, AIS SIMs, and after-sales coordination. Retail partners can message us directly to check stock, prices, and dispatch rounds.'}
            </p>
            <div className="mt-1 flex flex-col gap-4 sm:flex-row">
              <m.a
                href={CONTACT.LINE_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 bg-[#06c755] px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-white shadow-md transition-all hover:bg-[#05b34c] hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4 fill-current transition-transform motion-safe:group-hover:translate-x-0.5" />
                {isThai ? 'ทัก LINE เช็กของและราคา' : 'Check stock and prices on LINE'}
              </m.a>
              <a
                href="#reviews"
                className="inline-flex items-center justify-center border border-zinc-600 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-white transition-all hover:border-zinc-400 hover:bg-zinc-900 active:scale-[0.98]"
              >
                {isThai ? 'ดูงานแพ็กจริง' : 'See real packing'}
              </a>
            </div>
            <m.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-3 sm:grid-cols-2"
            >
              <m.div variants={item} className="flex min-h-16 items-center gap-3 border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold leading-6 text-white">
                <BadgeCheck className="h-5 w-5 shrink-0 text-zinc-300" />
                <span>{isThai ? 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS' : 'Authorized AIS Distributor'}</span>
              </m.div>
              <m.div variants={item} className="flex min-h-16 items-center gap-3 border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold leading-6 text-white">
                <ReceiptText className="h-5 w-5 shrink-0 text-zinc-300" />
                <span>{isThai ? 'จดทะเบียน VAT • ออกใบกำกับภาษีเต็มรูปแบบ' : 'VAT registered • Full tax invoices'}</span>
              </m.div>
            </m.div>
            <div className="mt-2 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-4">
              {HERO_STATS.map((stat) => {
                const copy = isThai ? stat.th : stat.en
                return (
                  <div key={copy.label} className="border-l-2 border-zinc-700 pl-4">
                    <div className="text-xs font-semibold text-zinc-500">{copy.label}</div>
                    <div className="mt-1 text-base font-bold text-white">{copy.value}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <m.figure
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="border-2 border-white/20 bg-zinc-900"
          >
            <img
              src="/proof/storefront-entrance.webp"
              alt={isThai ? 'หน้าร้าน PK HUB ในตัวเมืองฉะเชิงเทรา' : 'PK HUB storefront in Mueang Chachoengsao'}
              className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[460px]"
              loading="eager"
            />
            <figcaption className="flex items-center justify-between gap-4 border-t-2 border-white/20 px-5 py-4">
              <span className="text-sm font-semibold text-white">
                {isThai ? 'หน้าร้านจริง • ถ.สุขประยูร เมืองฉะเชิงเทรา' : 'Real storefront • Sukprayoon Rd, Chachoengsao'}
              </span>
              <a
                href={CONTACT.MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-sm font-semibold text-zinc-400 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white"
              >
                {isThai ? 'เปิดแผนที่' : 'Open map'}
              </a>
            </figcaption>
          </m.figure>
        </div>
      </Container>
    </section>
  )
}
