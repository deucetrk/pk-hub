import { CheckCircle2 } from 'lucide-react'

import type { PartnerLead } from '@/utils/partnerLead'
import { useLanguage } from '@/i18n/LanguageContext'

export default function SuccessCard({ values, onReset }: { values: PartnerLead; onReset: () => void }) {
  const { isThai } = useLanguage()

  return (
    <div className="grid gap-6 rounded-none border-2 border-black bg-white p-8">
      <div className="flex items-start gap-4">
        <CheckCircle2 className="mt-1 h-8 w-8 text-black" />
        <div className="grid gap-2">
          <div className="text-2xl font-black">{isThai ? 'รับข้อมูลแล้ว เดี๋ยวทีมเช็กราคาให้' : 'Got it. Our team will check prices for you.'}</div>
          <div className="text-base leading-[1.8] text-zinc-600">{isThai ? 'ถ้ารีบใช้ราคา ทัก LINE ซ้ำได้เลย ทีมขายจะเห็นเร็วกว่า' : 'If you need prices urgently, message us on LINE for the fastest reply.'}</div>
        </div>
      </div>
      <div className="grid gap-4 rounded-none bg-zinc-50 p-6 text-base">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{isThai ? 'ชื่อร้านค้า' : 'Store'}</div>
            <div className="mt-1 font-bold">{values.shopName}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{isThai ? 'จังหวัด' : 'Province'}</div>
            <div className="mt-1 font-bold">{values.province}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{isThai ? 'ผู้ติดต่อ' : 'Contact'}</div>
            <div className="mt-1 font-bold">{values.contactName}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{isThai ? 'เบอร์โทร' : 'Phone'}</div>
            <div className="mt-1 font-bold">{values.phone}</div>
          </div>
        </div>
        <div className="mt-2 border-t-2 border-black/10 pt-4">
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{isThai ? 'แบรนด์ที่สนใจ' : 'Brands of interest'}</div>
          <div className="mt-1 font-bold">{values.interestedBrands.join(', ')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="https://lin.ee/VEgW6qG"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-none border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
        >
          {isThai ? 'Inbox LINE ต่อเลย' : 'Inbox LINE now'}
        </a>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-none border-2 border-black bg-white px-6 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-zinc-100"
          onClick={onReset}
        >
          {isThai ? 'ฝากข้อมูลร้านอื่น' : 'Send another store'}
        </button>
      </div>
    </div>
  )
}
