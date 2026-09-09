import { m } from 'framer-motion'
import { ArrowRight, LogIn, MessageCircle } from 'lucide-react'

import Container from '@/components/Container'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'
import { CONTACT } from '@/pages/home/constants'
import { withReferral } from '@/utils/referralAttribution'

export default function HeroSection() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
  const { item, reduceMotion } = useRevealMotion()

  const joinUrl = withReferral(`/${language}/join`, referralCode)
  const dealerLoginUrl = withReferral(`/${language}/dealer/login`, referralCode)

  return (
    <section className="border-b border-stone-300 bg-[#f6f2e8] text-[#171916]">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-14">
          <div className="flex flex-col justify-between py-2 lg:py-5">
            <div>
              <p className="text-sm font-semibold text-[#587153]">
                {isThai ? 'เครือข่ายค้าส่งมือถือสำหรับร้านค้าในฉะเชิงเทราและภาคตะวันออก' : 'Smartphone wholesale for retailers in Chachoengsao and eastern Thailand'}
              </p>
              <h1 className="mt-5 font-display text-6xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl lg:text-[6.5rem]">
                PK HUB
              </h1>
              <p className="mt-7 max-w-xl font-display text-3xl font-bold leading-[1.24] tracking-[-0.025em] sm:text-4xl">
                {isThai ? 'โตไปกับพาร์ทเนอร์ที่เข้าใจธุรกิจร้านมือถือจริง' : 'Grow with a partner who understands phone retail'}
              </p>
              <p className="mt-5 max-w-lg text-base leading-8 text-stone-600 sm:text-lg">
                {isThai
                  ? 'ตรวจสอบแบรนด์ สต็อก และเงื่อนไขการสั่งซื้อกับทีม PK โดยตรง พร้อมหน้าร้านและงานแพ็กที่ตรวจสอบได้ ไม่มีขั้นต่ำในการสอบถาม'
                  : 'Check brands, stock, and ordering terms directly with PK, backed by a storefront and packing operation you can verify. No minimum order to inquire.'}
              </p>
            </div>

            <div className="mt-9">
              <div className="flex flex-col gap-3 sm:flex-row">
                <m.a
                  href={CONTACT.LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#5f7d58] px-7 text-sm font-bold text-white transition-colors hover:bg-[#4f6b49]"
                >
                  <MessageCircle className="h-4 w-4" />
                  {isThai ? 'คุยกับทีม PK' : 'Talk to the PK team'}
                </m.a>
                <a
                  href={joinUrl}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-stone-400 px-7 text-sm font-bold text-stone-800 transition-colors hover:border-stone-900"
                >
                  {isThai ? 'สมัครเป็นร้านค้าพาร์ทเนอร์' : 'Become a retail partner'}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-stone-600">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span>{isThai ? 'ร้านค้าที่ได้รับอนุมัติแล้ว:' : 'Already approved?'}</span>
                <a
                  href={dealerLoginUrl}
                  className="font-bold text-[#587153] underline decoration-[#587153]/40 underline-offset-4 hover:decoration-[#587153]"
                >
                  {isThai ? 'เข้าระบบค้าส่ง' : 'Dealer login'}
                </a>
              </div>
              <div className="mt-8 grid border-y border-stone-300 text-sm font-semibold leading-6 text-stone-700 sm:grid-cols-3">
                {(isThai
                  ? ['เครื่องศูนย์ไทย', 'เอกสารภาษีสำหรับธุรกิจ', 'ทีมดูแลร้านค้าโดยตรง']
                  : ['Official Thai-market devices', 'Business tax documentation', 'A team that works directly with retailers']
                ).map((fact) => (
                  <div key={fact} className="border-b border-stone-300 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                    {fact}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <m.figure
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="relative min-h-[420px] overflow-hidden bg-stone-200 lg:min-h-[620px]"
          >
            <img
              src="/proof/storefront-entrance.webp"
              alt={isThai ? 'หน้าร้าน PK HUB ในตัวเมืองฉะเชิงเทรา' : 'PK HUB storefront in Mueang Chachoengsao'}
              width={1200}
              height={1600}
              className="h-full min-h-[420px] w-full object-cover lg:min-h-[620px]"
              loading="eager"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-[#171916]/90 px-5 py-4 text-white">
              <span className="text-sm font-semibold">
                {isThai ? 'หน้าร้านจริง • ถ.สุขประยูร เมืองฉะเชิงเทรา' : 'Real storefront • Sukprayoon Rd, Chachoengsao'}
              </span>
              <a
                href={CONTACT.MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-sm font-semibold text-stone-300 underline decoration-stone-500 underline-offset-4 transition-colors hover:text-white"
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
