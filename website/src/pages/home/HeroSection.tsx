import { useEffect, useMemo, useState } from 'react'

import { motion } from 'framer-motion'
import { BadgeCheck, Clock, MessageCircle, ReceiptText, ShieldCheck, Truck } from 'lucide-react'

import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

const TH_TYPEWRITER_PHRASES = [
  'เครื่องศูนย์ไทยสำหรับร้านค้า',
  'ซิม AIS และบริการหลังการขาย',
  'เช็กสต็อกกับทีมในพื้นที่',
  'มีรอบส่งในฉะเชิงเทรา',
]

const EN_TYPEWRITER_PHRASES = [
  'Thai official devices for retailers',
  'AIS SIMs and after-sales support',
  'Stock checks with a local team',
  'Dispatch rounds in Chachoengsao',
]

function TypewriterLine({ phrases, reduceMotion }: { phrases: string[]; reduceMotion: boolean | null }) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visibleLength, setVisibleLength] = useState(phrases[0]?.length ?? 0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion || phrases.length <= 1) {
      setPhraseIndex(0)
      setVisibleLength(phrases[0]?.length ?? 0)
      setDeleting(false)
      return
    }

    const phrase = phrases[phraseIndex]
    const doneTyping = !deleting && visibleLength === phrase.length
    const doneDeleting = deleting && visibleLength === 0
    const delay = doneTyping ? 1500 : doneDeleting ? 250 : deleting ? 38 : 68

    const timer = window.setTimeout(() => {
      if (doneTyping) {
        setDeleting(true)
        return
      }

      if (doneDeleting) {
        setDeleting(false)
        setPhraseIndex((current) => (current + 1) % phrases.length)
        return
      }

      setVisibleLength((current) => current + (deleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, phraseIndex, phrases, reduceMotion, visibleLength])

  const currentPhrase = phrases[phraseIndex]
  const visibleText = reduceMotion ? phrases[0] : currentPhrase.slice(0, visibleLength)

  return (
    <div className="mt-5 min-h-[2.6rem] text-2xl font-black tracking-[-0.025em] text-emerald-700 sm:text-3xl lg:min-h-[3.1rem] lg:text-4xl" aria-live="polite">
      <span>{visibleText}</span>
      {!reduceMotion ? <span className="ml-1 inline-block animate-pulse text-zinc-400" aria-hidden="true">|</span> : null}
      <span className="sr-only">{phrases.join(' • ')}</span>
    </div>
  )
}

export default function HeroSection() {
  const { isThai } = useLanguage()
  const { container, item, reduceMotion } = useRevealMotion()
  const typewriterPhrases = useMemo(() => (isThai ? TH_TYPEWRITER_PHRASES : EN_TYPEWRITER_PHRASES), [isThai])

  return (
    <section className="bg-transparent text-zinc-900">
      <Container className="py-20 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-8">
            <div className="flex items-center gap-4">
              <LogoMark className="border-zinc-900/10" />
              <div className="text-sm font-semibold text-zinc-500">
                {isThai ? 'AIS Partner • ฉะเชิงเทรา' : 'AIS Partner • Chachoengsao'}
              </div>
            </div>
            <h1 className="font-display text-5xl font-black leading-[1.24] tracking-[-0.025em] text-zinc-900 sm:text-6xl sm:leading-[1.22] lg:text-7xl lg:leading-[1.2]">
              {isThai ? 'พาร์ทเนอร์ตัวแทนจำหน่าย AIS ในจังหวัดฉะเชิงเทรา' : 'AIS distributor partner in Chachoengsao'}
            </h1>
            <TypewriterLine phrases={typewriterPhrases} reduceMotion={reduceMotion} />
            <p className="max-w-xl text-base leading-[1.8] text-zinc-600 sm:text-lg lg:mt-2">
              {isThai
                ? 'PK Hub ดูแลเครื่องศูนย์ไทย ซิม AIS และบริการหลังการขายสำหรับร้านค้ามือถือในพื้นที่ ร้านที่ต้องการรับเครื่องไปขายต่อสามารถทักมาเช็กสต็อก ราคา และรอบส่งกับทีมในพื้นที่ได้โดยตรง'
                : 'PK Hub supports local phone retailers with Thai official devices, AIS SIMs, and after-sales coordination. Retail partners can message us directly to check stock, prices, and dispatch rounds.'}
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-3 sm:grid-cols-2"
            >
              <motion.div variants={item} className="flex min-h-16 items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-zinc-950">
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>{isThai ? 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS' : 'Authorized AIS Distributor'}</span>
              </motion.div>
              <motion.div variants={item} className="flex min-h-16 items-center gap-3 border border-zinc-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-zinc-950">
                <ReceiptText className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>{isThai ? 'จดทะเบียน VAT • ออกใบกำกับภาษีเต็มรูปแบบ' : 'VAT registered • Full tax invoices'}</span>
              </motion.div>
            </motion.div>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
              <motion.a
                href="https://lin.ee/VEgW6qG"
                target="_blank"
                rel="noreferrer"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4 fill-current transition-transform motion-safe:group-hover:translate-x-0.5" />
                {isThai ? 'ทัก LINE เช็กของและราคา' : 'Check stock and prices on LINE'}
              </motion.a>
              <a
                href="#reviews"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white/50 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-zinc-900 shadow-sm backdrop-blur-sm transition-all active:scale-[0.98] hover:border-zinc-300 hover:bg-zinc-50"
              >
                {isThai ? 'ดูงานแพ็กจริง' : 'See real packing'}
              </a>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-zinc-200/50 pt-8 sm:grid-cols-4">
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'ร้านค้าที่ดูแล' : 'Retail partners'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">180+</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'สินค้า' : 'Products'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'ศูนย์ไทย 100%' : '100% Thai official'}</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'จัดส่ง' : 'Dispatch'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'ส่งทุกวัน' : 'Daily'}</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'เอกสารธุรกิจ' : 'Business docs'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'VAT พร้อม' : 'VAT ready'}</div>
              </div>
            </div>
          </div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 shadow-2xl lg:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 to-transparent"></div>
            <div className="relative mb-8 text-lg font-bold tracking-tight text-white">
              {isThai ? 'อยากเช็กของกับทีมในพื้นที่ เริ่มตรงนี้' : 'Need local stock support? Start here'}
            </div>
            <div className="relative grid gap-8 text-base text-zinc-300">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS' : 'Authorized AIS Distributor'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'คุยกับร้านค้าได้มั่นใจ มีเอกสารและหลักฐานธุรกิจพร้อม' : 'Business documents and proof are ready for retailer checks.'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'แพ็กและส่งทุกวันทำการ' : 'Packed and dispatched every business day'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'เช็กสต็อก สรุปราคา และออกของตามรอบจริง' : 'Check stock, confirm prices, and dispatch on real rounds.'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'ใบกำกับภาษีเต็มรูปแบบสำหรับองค์กร' : 'Full tax invoices for business buyers'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'เลขทะเบียน VAT 0245540000020 พร้อมใช้สำหรับงานบัญชี' : 'VAT registration 0245540000020 for accounting documentation.'}
                  </div>
                </div>
              </div>
            </div>
            <motion.a
              href="https://lin.ee/VEgW6qG"
              target="_blank"
              rel="noreferrer"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-white px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-zinc-900 shadow-sm transition-all hover:bg-zinc-100"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              {isThai ? 'ทักทีมขายเช็กสต็อก' : 'Check stock with sales'}
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
