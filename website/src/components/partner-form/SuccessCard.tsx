import { useEffect, useRef } from 'react'
import { Send } from 'lucide-react'

import type { PartnerLead } from '@/utils/partnerLead'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from '@/pages/home/constants'

export default function SuccessCard({
  values,
  onReset,
  isApplication = false,
}: {
  values: PartnerLead
  onReset: () => void
  isApplication?: boolean
}) {
  const { isThai } = useLanguage()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    heading?.focus({ preventScroll: true })
    heading?.scrollIntoView({ block: 'start', behavior: 'auto' })
  }, [])

  return (
    <section
      className="min-w-0 border-t-2 border-[#2457d6] bg-white py-7"
      aria-labelledby="partner-result-heading"
    >
      <Send className="mb-5 h-8 w-8 text-[#2457d6]" aria-hidden="true" />
      <h3
        id="partner-result-heading"
        ref={headingRef}
        tabIndex={-1}
        className="scroll-mt-24 font-display text-3xl font-black leading-tight tracking-[-0.03em] text-zinc-900 focus:outline-2 focus:outline-offset-4 focus:outline-[#2457d6] sm:text-4xl"
      >
        {isApplication
          ? isThai
            ? 'ส่งใบสมัครจากอุปกรณ์นี้แล้ว'
            : 'The application was sent from this device'
          : isThai
            ? 'ส่งคำขอจากอุปกรณ์นี้แล้ว'
            : 'The request was sent from this device'}
      </h3>
      <p className="mt-5 text-base leading-8 text-zinc-600">
        {isThai
          ? 'ส่งข้อมูลจากเบราว์เซอร์แล้ว แต่หน้านี้ตรวจสอบไม่ได้ว่าปลายทางบันทึกข้อมูลสำเร็จ หากต้องการยืนยัน ให้ทัก LINE พร้อมชื่อร้าน การสมัครยังไม่เปิดสิทธิ์ค้าส่งทันที'
          : 'Your browser sent the request, but this page cannot confirm that it was recorded. To check, message PK on LINE with your store name. Applying does not unlock wholesale access immediately.'}
      </p>
      <dl className="my-7 grid grid-cols-1 gap-x-8 gap-y-5 border-y border-zinc-200 py-6 sm:grid-cols-2">
        {[
          [isThai ? 'ชื่อร้านค้า' : 'Store', values.shopName],
          [isThai ? 'จังหวัด' : 'Province', values.province],
          [isThai ? 'เบอร์โทร' : 'Phone', values.phone],
          [isThai ? 'แบรนด์ที่สนใจ' : 'Brands of interest', values.interestedBrands.join(', ')],
        ].map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-sm text-zinc-600">{label}</dt>
            <dd className="mt-2 break-words font-semibold text-zinc-900">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center bg-[#2457d6] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1946b8]"
        >
          {isThai ? 'Inbox LINE ต่อเลย' : 'Inbox LINE now'}
        </a>
        <button
          type="button"
          className="inline-flex min-h-12 items-center justify-center border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900"
          onClick={onReset}
        >
          {isApplication
            ? isThai
              ? 'สมัครร้านอื่น'
              : 'Apply for another store'
            : isThai
              ? 'ฝากข้อมูลร้านอื่น'
              : 'Send another store'}
        </button>
      </div>
    </section>
  )
}
