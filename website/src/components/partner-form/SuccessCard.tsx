import { CheckCircle2 } from 'lucide-react'

import type { PartnerLead } from '@/utils/partnerLead'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from '@/pages/home/constants'

export default function SuccessCard({ values, onReset }: { values: PartnerLead; onReset: () => void }) {
  const { isThai } = useLanguage()

  return (
    <div className="grid gap-6 rounded-2xl bg-white p-6 shadow-xl shadow-black/20 sm:p-8">
      <div className="flex items-start gap-4">
        <CheckCircle2 className="mt-1 h-8 w-8 shrink-0 text-[#06c755]" />
        <div className="grid gap-2">
          <div className="text-2xl font-black text-slate-900">{isThai ? 'รับข้อมูลแล้ว เดี๋ยวทีมเช็กราคาให้' : 'Got it. Our team will check prices for you.'}</div>
          <div className="text-base leading-[1.8] text-slate-600">{isThai ? 'ถ้ารีบใช้ราคา ทัก LINE ซ้ำได้เลย ทีมขายจะเห็นเร็วกว่า' : 'If you need prices urgently, message us on LINE for the fastest reply.'}</div>
        </div>
      </div>
      <div className="grid gap-4 rounded-xl bg-slate-50 p-5 text-base">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{isThai ? 'ชื่อร้านค้า' : 'Store'}</div>
            <div className="mt-1 font-bold text-slate-900">{values.shopName}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{isThai ? 'จังหวัด' : 'Province'}</div>
            <div className="mt-1 font-bold text-slate-900">{values.province}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{isThai ? 'เบอร์โทร' : 'Phone'}</div>
            <div className="mt-1 font-bold text-slate-900">{values.phone}</div>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{isThai ? 'แบรนด์ที่สนใจ' : 'Brands of interest'}</div>
          <div className="mt-1 font-bold text-slate-900">{values.interestedBrands.join(', ')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[#06c755] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#05b34c]"
        >
          {isThai ? 'Inbox LINE ต่อเลย' : 'Inbox LINE now'}
        </a>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
          onClick={onReset}
        >
          {isThai ? 'ฝากข้อมูลร้านอื่น' : 'Send another store'}
        </button>
      </div>
    </div>
  )
}
