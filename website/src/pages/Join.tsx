import { Check, MessageCircle } from 'lucide-react'

import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import PartnerForm from '@/components/PartnerForm'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useLanguage } from '@/i18n/LanguageContext'
import { JOIN_META, usePageMeta } from '@/lib/seo'
import Footer from '@/pages/home/Footer'
import { CONTACT } from '@/pages/home/constants'

export default function Join() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
  usePageMeta(JOIN_META[language])

  const steps = isThai
    ? [
        'กรอกข้อมูลร้านและช่องทางติดต่อที่สะดวก',
        'ทีม PK ตรวจสอบข้อมูลและสิทธิ์ร้านค้าส่ง',
        'ทีมงานติดต่อกลับเพื่อยืนยันขั้นตอนถัดไป',
      ]
    : [
        'Share your store and preferred contact details.',
        'PK reviews the application for wholesale access.',
        'Our team contacts you to confirm the next step.',
      ]

  return (
    <div className="min-h-dvh bg-[#f6f2e8] text-[#171916]">
      <Navbar />
      <main>
        <section className="border-b border-stone-300">
          <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:py-20">
            <div className="self-start lg:sticky lg:top-28">
              <p className="mb-5 text-sm font-semibold text-[#587153]">
                {isThai ? 'สมัครเป็นร้านค้าพาร์ทเนอร์' : 'Become a retail partner'}
              </p>
              <h1 className="max-w-xl font-display text-4xl font-black leading-[1.16] tracking-[-0.035em] sm:text-5xl">
                {isThai ? 'เริ่มความสัมพันธ์กับ PK ด้วยข้อมูลเท่าที่จำเป็น' : 'Start with PK using only the details we need'}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
                {isThai
                  ? 'การส่งใบสมัครยังไม่เปิดสิทธิ์ราคาส่งทันที ทีม PK จะตรวจสอบข้อมูลและติดต่อกลับก่อน ร้านไม่ต้องส่งเอกสารเครดิตหรือ KYC ในขั้นตอนนี้'
                  : 'Submitting an application does not instantly unlock wholesale access. PK reviews the details and contacts you first; credit or full KYC documents are not required here.'}
              </p>

              <ol className="mt-9 grid gap-0 border-y border-stone-300">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 border-b border-stone-300 py-5 last:border-b-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#7c9a72] text-sm font-bold text-[#587153]">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm font-semibold leading-6 text-stone-800">{step}</span>
                  </li>
                ))}
              </ol>

              {referralCode ? (
                <div className="mt-7 flex items-start gap-3 bg-[#edf2e8] px-4 py-4 text-sm leading-6 text-stone-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#587153]" />
                  <span>
                    {isThai
                      ? 'ข้อมูลผู้แนะนำถูกเก็บไว้แล้ว และจะถูกส่งพร้อมใบสมัครเพื่อให้ทีม PK ตรวจสอบ'
                      : 'Your referral context is retained and will be sent with the application for PK to verify.'}
                  </span>
                </div>
              ) : null}

              <a
                href={CONTACT.LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-stone-800 underline decoration-stone-400 underline-offset-4 hover:decoration-stone-800"
              >
                <MessageCircle className="h-4 w-4" />
                {isThai ? 'ต้องการคุยก่อน? ทักทีม PK ทาง LINE' : 'Want to talk first? Message PK on LINE'}
              </a>
            </div>

            <div>
              <PartnerForm className="shadow-[0_18px_50px_rgba(43,45,38,0.08)]" />
              <p className="mt-4 text-xs leading-6 text-stone-500">
                {isThai
                  ? 'ข้อมูลจะถูกใช้เพื่อติดต่อเกี่ยวกับการสมัครร้านค้าและการค้าส่งเท่านั้น'
                  : 'Your details are used only to contact you about the retailer application and wholesale relationship.'}
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
