import { BadgeCheck, Clock, ReceiptText, ShieldCheck, Truck } from 'lucide-react'

import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'

export default function HeroSection() {
  const { isThai } = useLanguage()

  return (
    <section className="bg-transparent text-zinc-900">
      <Container className="py-20 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-8">
            <div className="flex items-center gap-4">
              <LogoMark className="border-zinc-900/10" />
              <div className="text-sm font-semibold text-zinc-500">
                {isThai ? 'ราคาส่งมือถือ • ฉะเชิงเทรา / ภาคตะวันออก' : 'Wholesale phones • Eastern Thailand'}
              </div>
            </div>
            <h1 className="font-display flex flex-col gap-3 text-5xl font-black leading-[1.24] tracking-[-0.025em] sm:text-6xl sm:leading-[1.22] lg:text-7xl lg:leading-[1.2]">
              <span className="text-zinc-900">{isThai ? 'ค้าส่งมือถือ' : 'Official smartphones'}</span>
              <span className="text-zinc-900">{isThai ? 'เครื่องศูนย์ไทย' : 'for retail partners'}</span>
              <span className="text-zinc-400">{isThai ? 'สำหรับร้านค้า' : 'across Thailand'}</span>
            </h1>
            <p className="max-w-xl text-base leading-[1.8] text-zinc-600 sm:text-lg lg:mt-2">
              {isThai
                ? 'มีหน้าร้านหรือเพิ่งเริ่มขายมือถือ ทัก LINE มาเช็กราคาส่งได้เลย ทีม PK HUB ช่วยดูรุ่น เช็กสต็อก และแนะนำรอบส่งให้'
                : 'Own a phone shop or just starting out? Message PK HUB on LINE for wholesale prices, live stock, and dispatch guidance.'}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex min-h-16 items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-zinc-950">
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>{isThai ? 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS' : 'Authorized AIS Distributor'}</span>
              </div>
              <div className="flex min-h-16 items-center gap-3 border border-zinc-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-zinc-950">
                <ReceiptText className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>{isThai ? 'จดทะเบียน VAT • ออกใบกำกับภาษีเต็มรูปแบบ' : 'VAT registered • Full tax invoices'}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://lin.ee/VEgW6qG"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-white shadow-md transition-all active:scale-[0.98] hover:bg-zinc-800 hover:shadow-lg"
              >
                {isThai ? 'Inbox LINE มาเลย' : 'Inbox us on LINE'}
              </a>
              <a
                href="#reviews"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white/50 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-zinc-900 shadow-sm backdrop-blur-sm transition-all active:scale-[0.98] hover:border-zinc-300 hover:bg-zinc-50"
              >
                {isThai ? 'ดูงานแพ็กจริง' : 'See real packing'}
              </a>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-zinc-200/50 pt-8 sm:grid-cols-4">
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'ร้านค้าที่ดูแล' : 'Retail partners'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">180+</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'สินค้า' : 'Products'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'ศูนย์ไทย 100%' : '100% Thai official'}</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'จัดส่ง' : 'Dispatch'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'ส่งทุกวัน' : 'Daily'}</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'เอกสารธุรกิจ' : 'Business docs'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'VAT พร้อม' : 'VAT ready'}</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 shadow-2xl lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 to-transparent"></div>
            <div className="relative mb-8 text-lg font-bold tracking-tight text-white">
              {isThai ? 'อยากได้ราคาส่ง เริ่มตรงนี้' : 'Need wholesale prices? Start here'}
            </div>
            <div className="relative grid gap-8 text-base text-zinc-300">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS' : 'Authorized AIS Distributor'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'คุยกับร้านค้าได้มั่นใจ มีเอกสารและหลักฐานธุรกิจพร้อม' : 'Business documents and proof are ready for retailer checks.'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'แพ็กและส่งทุกวันทำการ' : 'Packed and dispatched every business day'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'เช็กสต็อก สรุปราคา และออกของตามรอบจริง' : 'Check stock, confirm prices, and dispatch on real rounds.'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'ใบกำกับภาษีเต็มรูปแบบสำหรับองค์กร' : 'Full tax invoices for business buyers'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'เลขทะเบียน VAT 0245540000020 พร้อมใช้สำหรับงานบัญชี' : 'VAT registration 0245540000020 for accounting documentation.'}
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://lin.ee/VEgW6qG"
              target="_blank"
              rel="noreferrer"
              className="relative mt-8 inline-flex items-center justify-center rounded-2xl border border-transparent bg-white px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-zinc-900 shadow-sm transition-all active:scale-[0.98] hover:bg-zinc-100"
            >
              {isThai ? 'ทักทีมขายตอนนี้' : 'Talk to sales now'}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
