import { ArrowRight, Lock, MessageCircle, Store } from 'lucide-react'

import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import Footer from '@/pages/home/Footer'
import { useLanguage } from '@/i18n/LanguageContext'
import { DEALER_LOGIN_META, usePageMeta } from '@/lib/seo'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { buildDealerPortalUrl, withReferral } from '@/utils/referralAttribution'
import { CONTACT } from '@/pages/home/constants'

const DEALER_PORTAL_BASE_URL =
  import.meta.env.VITE_DEALER_PORTAL_BASE_URL ?? 'https://dealer.pkhub.co'

export default function DealerLogin() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
  usePageMeta(DEALER_LOGIN_META[language])

  const portalUrl = buildDealerPortalUrl(DEALER_PORTAL_BASE_URL, referralCode, '/login')
  const joinUrl = withReferral(`/${language}/join`, referralCode)

  return (
    <div className="min-h-dvh bg-[#f6f2e8] text-[#171916]">
      <Navbar />
      <main>
        <section className="border-b border-stone-300">
          <Container className="py-12 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#5f7d58] text-white">
                <Store className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="mt-6 text-sm font-semibold text-[#587153]">
                {isThai ? 'สำหรับร้านค้าพาร์ทเนอร์ที่ได้รับอนุมัติแล้ว' : 'For approved retail partners'}
              </p>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.1] tracking-[-0.035em] sm:text-5xl">
                {isThai ? 'เข้าสู่ระบบค้าส่ง PK HUB' : 'Sign in to PK HUB Wholesale'}
              </h1>
              <p className="mt-5 text-base leading-7 text-stone-600 sm:text-lg">
                {isThai
                  ? 'การเข้าถึงราคาส่ง สต็อก และเงื่อนไขการสั่งซื้อจำเป็นต้องได้รับการตรวจสอบและอนุมัติจากทีม PK ก่อน หากยังไม่ได้รับสิทธิ์ กรุณาสมัครหรือทัก LINE มา'
                  : 'Wholesale prices, stock, and ordering terms require PK review and approval. If you have not been approved yet, apply or message us on LINE.'}
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <a
                  href={portalUrl}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#5f7d58] px-6 text-sm font-bold text-white transition-colors hover:bg-[#4f6b49]"
                >
                  {isThai ? 'ไปยังหน้าค้าส่ง' : 'Go to wholesale portal'}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CONTACT.LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-stone-300 bg-white px-6 text-sm font-bold text-stone-800 transition-colors hover:border-stone-900"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  {isThai ? 'คุยกับทีม PK' : 'Talk to PK team'}
                </a>
              </div>

              <div className="mt-8 flex items-start justify-center gap-3 text-left text-sm leading-6 text-stone-600">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-stone-500" aria-hidden="true" />
                <span>
                  {isThai
                    ? 'PK HUB Dealer Portal เป็นเว็บไซต์สำหรับร้านค้าพาร์ทเนอร์โดยเฉพาะ และเชื่อมกับระบบ PK Commerce ผ่านช่องทางที่ได้รับการปกป้อง'
                    : 'PK HUB Dealer Portal is a dedicated partner site connected to PK Commerce through protected services.'}
                </span>
              </div>

              <div className="mt-8 border-t border-stone-300 pt-8">
                <p className="text-sm font-semibold text-stone-800">
                  {isThai ? 'ยังไม่ใช่ร้านค้าพาร์ทเนอร์?' : 'Not a retail partner yet?'}
                </p>
                <a
                  href={joinUrl}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#587153] underline decoration-[#587153]/40 underline-offset-4 hover:decoration-[#587153]"
                >
                  {isThai ? 'สมัครเป็นร้านค้าพาร์ทเนอร์' : 'Apply to become a retail partner'}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
