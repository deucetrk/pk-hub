import { m } from 'framer-motion'
import { BadgeCheck, MessageCircle, ReceiptText, Smartphone } from 'lucide-react'

import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'
import { CONTACT } from '@/pages/home/constants'

export default function HeroSection() {
  const { isThai } = useLanguage()
  const { container, item, reduceMotion } = useRevealMotion()

  const chips = [
    {
      icon: BadgeCheck,
      th: 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS',
      en: 'Authorized AIS Distributor',
    },
    {
      icon: ReceiptText,
      th: 'จดทะเบียน VAT • ออกใบกำกับภาษีเต็มรูปแบบ',
      en: 'VAT registered • Full tax invoices',
    },
    {
      icon: Smartphone,
      th: 'มือถือเครื่องศูนย์ไทย 100%',
      en: '100% official Thai-market devices',
    },
  ]

  return (
    <section className="bg-[#111827] text-white">
      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-7">
            <div className="flex items-center gap-4">
              <span className="inline-block bg-white px-2 py-1">
                <LogoMark className="h-8" />
              </span>
              <div className="text-sm font-semibold tracking-wide text-slate-400">
                {isThai ? 'AIS Partner • ฉะเชิงเทรา' : 'AIS Partner • Chachoengsao'}
              </div>
            </div>
            <h1 className="font-display text-5xl font-black leading-[1.24] tracking-[-0.025em] text-white sm:text-6xl sm:leading-[1.22] lg:text-7xl lg:leading-[1.2]">
              {isThai ? 'ค้าส่งมือถือฉะเชิงเทรา สำหรับร้านค้าและตัวแทนจำหน่าย' : 'Smartphone wholesale in Chachoengsao for retail partners'}
            </h1>
            <p className="max-w-xl text-xl font-bold leading-snug text-slate-200 sm:text-2xl">
              {isThai
                ? 'เครื่องศูนย์ไทย ราคาส่ง ส่งทุกวัน — ทัก LINE เช็กสต็อกและราคาได้เลย'
                : 'Official Thai-market devices at wholesale prices, dispatched daily — check stock and prices on LINE.'}
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
                href="#proof"
                className="inline-flex items-center justify-center border border-slate-600 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-white transition-all hover:border-slate-400 hover:bg-slate-900 active:scale-[0.98]"
              >
                {isThai ? 'ดูงานแพ็กจริง' : 'See real packing'}
              </a>
            </div>
            <m.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-3 sm:grid-cols-3"
            >
              {chips.map((chip) => {
                const Icon = chip.icon
                return (
                  <m.div
                    key={chip.en}
                    variants={item}
                    className="flex min-h-16 items-center gap-3 border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold leading-6 text-white"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-slate-300" />
                    <span>{isThai ? chip.th : chip.en}</span>
                  </m.div>
                )
              })}
            </m.div>
          </div>

          <m.figure
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="border-2 border-white/20 bg-slate-900"
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
                className="shrink-0 text-sm font-semibold text-slate-400 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white"
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
