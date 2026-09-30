import { useEffect, useRef } from 'react'
import { Send } from 'lucide-react'

import type { PartnerLead } from '@/utils/partnerLead'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from '@/pages/home/constants'

export default function SuccessCard({ values, onReset, isApplication = false }: { values: PartnerLead; onReset: () => void; isApplication?: boolean }) {
  const { isThai } = useLanguage()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="grid gap-6 border border-zinc-200 bg-white p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <Send className="mt-1 h-8 w-8 shrink-0 text-[#2457d6]" aria-hidden="true" />
        <div className="grid gap-2">
          <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-black text-zinc-900 focus:outline-2 focus:outline-offset-4 focus:outline-[#2457d6]">
            {isApplication
              ? (isThai ? 'ส่งใบสมัครจากอุปกรณ์นี้แล้ว' : 'The application was sent from this device')
              : (isThai ? 'ส่งคำขอจากอุปกรณ์นี้แล้ว' : 'The request was sent from this device')}
          </h3>
          <div className="text-base leading-[1.8] text-zinc-600">{isThai ? 'ส่งข้อมูลจากเบราว์เซอร์แล้ว แต่หน้านี้ตรวจสอบไม่ได้ว่าปลายทางบันทึกข้อมูลสำเร็จ หากต้องการยืนยัน ให้ทัก LINE พร้อมชื่อร้าน การสมัครยังไม่เปิดสิทธิ์ค้าส่งทันที' : 'Your browser sent the request, but this page cannot confirm that it was recorded. To check, message PK on LINE with your store name. Applying does not unlock wholesale access immediately.'}</div>
        </div>
      </div>
      <div className="grid gap-4 border-y border-zinc-200 py-5 text-base">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{isThai ? 'ชื่อร้านค้า' : 'Store'}</div>
            <div className="mt-1 font-bold text-zinc-900">{values.shopName}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{isThai ? 'จังหวัด' : 'Province'}</div>
            <div className="mt-1 font-bold text-zinc-900">{values.province}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{isThai ? 'เบอร์โทร' : 'Phone'}</div>
            <div className="mt-1 font-bold text-zinc-900">{values.phone}</div>
          </div>
        </div>
        <div className="border-t border-zinc-200 pt-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{isThai ? 'แบรนด์ที่สนใจ' : 'Brands of interest'}</div>
          <div className="mt-1 font-bold text-zinc-900">{values.interestedBrands.join(', ')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center bg-[#06c755] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#05b34c]"
        >
          {isThai ? 'Inbox LINE ต่อเลย' : 'Inbox LINE now'}
        </a>
        <button
          type="button"
          className="inline-flex items-center justify-center border border-zinc-300 bg-white px-6 py-4 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900"
          onClick={onReset}
        >
          {isApplication
            ? (isThai ? 'สมัครร้านอื่น' : 'Apply for another store')
            : (isThai ? 'ฝากข้อมูลร้านอื่น' : 'Send another store')}
        </button>
      </div>
    </div>
  )
}
