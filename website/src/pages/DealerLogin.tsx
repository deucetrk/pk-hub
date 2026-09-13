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
    <div className="min-h-dvh bg-[#f7f7f8] text-[#18181b]">
      <Navbar />
      <main>
        <section className="border-b border-zinc-300">
          <Container className="py-12 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#2457d6] text-white">
                <Store className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="mt-6 text-sm font-semibold text-[#2457d6]">
                {isThai ? 'สำหรับร้านค้าพาร์ทเนอร์ที่ได้รับอนุมัติแล้ว' : 'For approved retail partners'}
              </p>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.1] tracking-[-0.035em] sm:text-5xl">
                {isThai ? 'เข้าสู่ระบบค้าส่ง' : 'Sign in to wholesale'}
              </h1>
              <p className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg">
                {isThai
                  ? 'การเข้าถึงราคาส่ง สต็อก และเงื่อนไขการสั่งซื้อจำเป็นต้องได้รับการตรวจสอบและอนุมัติจากทีม PK ก่อน หากยังไม่ได้รับสิทธิ์ กรุณาสมัครหรือทัก LINE มา'
                  : 'Wholesale prices, stock, and ordering terms require PK review and approval. If you have not been approved yet, apply or message us on LINE.'}
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <a
                  href={portalUrl}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#2457d6] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1946b8]"
                >
                  {isThai ? 'ไปยังหน้าค้าส่ง' : 'Go to wholesale portal'}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CONTACT.LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-zinc-300 bg-white px-6 text-sm font-bold text-zinc-800 transition-colors hover:border-zinc-900"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  {isThai ? 'คุยกับทีม PK' : 'Talk to PK team'}
                </a>
              </div>

              <div className="mt-8 flex items-start justify-center gap-3 text-left text-sm leading-6 text-zinc-600">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
                <span>
                  {isThai
                    ? 'ราคาและคำสั่งซื้อของร้านแสดงเฉพาะบัญชีที่ผ่านการอนุมัติ ใช้บัญชีที่ทีม PK เปิดสิทธิ์ให้เพื่อเข้าใช้งาน'
                    : 'Your store’s prices and orders are available only through an approved account. Sign in with the account activated by the PK team.'}
                </span>
              </div>

              <div className="mt-8 border-t border-zinc-300 pt-8">
                <p className="text-sm font-semibold text-zinc-800">
                  {isThai ? 'ยังไม่ใช่ร้านค้าพาร์ทเนอร์?' : 'Not a retail partner yet?'}
                </p>
                <a
                  href={joinUrl}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#2457d6] underline decoration-[#2457d6]/40 underline-offset-4 hover:decoration-[#2457d6]"
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
