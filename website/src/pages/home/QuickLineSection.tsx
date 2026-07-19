import { MessageCircle } from 'lucide-react'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'

import { CONTACT } from './constants'

export default function QuickLineSection() {
  const { isThai } = useLanguage()

  return (
    <section className="bg-zinc-50 pb-16 sm:pb-24">
      <Container>
        <div className="flex flex-col gap-6 rounded-none border-2 border-black bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <div className="text-sm font-semibold text-zinc-500">
              {isThai ? 'อยากได้ราคาไว' : 'Need prices fast?'}
            </div>
            <div className="font-display mt-1 text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
              {isThai ? 'ไม่ต้องกรอกฟอร์ม Inbox LINE มาเลย' : 'Skip the form. Inbox us on LINE.'}
            </div>
            <div className="mt-2 text-sm leading-6 text-zinc-600">
              {isThai
                ? 'บอกแบรนด์หรือรุ่นที่อยากได้ ทีมขายช่วยเช็กราคา สต็อก และรอบส่งให้ทันทีในเวลาทำการ'
                : 'Tell us the brands or models you need. Sales can check prices, stock, and dispatch rounds during business hours.'}
            </div>
          </div>
          <a
            href={CONTACT.LINE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#06c755] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#05b34c]"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            Inbox LINE
          </a>
        </div>
      </Container>
    </section>
  )
}
