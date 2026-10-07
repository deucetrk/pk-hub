import { useEffect, useRef } from 'react'
import { Send } from 'lucide-react'

import type { PartnerLeadReceipt } from '@/services/partnerLeadSubmission'
import type { PartnerLead } from '@/utils/partnerLead'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from '@/pages/home/constants'

export default function SuccessCard({
  values,
  onReset,
  isApplication = false,
  receipt,
}: {
  values: PartnerLead
  onReset: () => void
  isApplication?: boolean
  receipt?: PartnerLeadReceipt | null
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
            ? receipt ? 'บันทึกใบสมัครแล้ว' : 'ยังยืนยันการรับใบสมัครไม่ได้'
            : receipt ? 'Your application is recorded' : 'Application receipt is unverified'
          : isThai
            ? receipt ? 'บันทึกข้อมูลร้านแล้ว' : 'ยังยืนยันการรับข้อมูลไม่ได้'
            : receipt ? 'Your enquiry is recorded' : 'Enquiry receipt is unverified'}
      </h3>
      <p className="mt-5 text-base leading-8 text-zinc-600">
        {isThai
          ? receipt ? 'ระบบบันทึกข้อมูลแล้ว ทีม PK จะตรวจสอบและติดต่อกลับ การสมัครยังไม่เปิดสิทธิ์ค้าส่งทันที' : 'ยังยืนยันการรับข้อมูลไม่ได้ กรุณาคุยกับทีม PK ก่อนส่งซ้ำ'
          : receipt ? 'Your details are recorded for PK to review and contact you. Applying does not unlock wholesale access immediately.' : 'Receipt is unverified. Please contact PK before resending.'}
      </p>
      {receipt ? <p className="mt-4 text-xs leading-6 text-zinc-600" data-receipt-id={receipt.requestId}>{isThai ? 'เลขอ้างอิง' : 'Reference'}: <span className="font-mono break-all">{receipt.requestId}</span>{receipt.duplicate ? <span className="block">{isThai ? 'พบคำขอเดิมที่บันทึกแล้ว ไม่มีการสร้างใบสมัครซ้ำ' : 'Existing recorded request; no duplicate application was created.'}</span> : null}</p> : null}
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
