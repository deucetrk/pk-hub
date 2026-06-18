import { BadgeCheck, Building2, ReceiptText, Store } from 'lucide-react'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'

export default function TrustSection() {
  const { isThai } = useLanguage()

  return (
    <Section
      id="trust"
      title={isThai ? 'ทำไมร้านค้าถึงเลือก PK HUB' : 'Why retailers choose PK HUB'}
      subtitle={
        isThai
          ? 'ข้อมูลชัดเจน สินค้าตรวจสอบได้ และเอกสารสำหรับธุรกิจที่ต้องการความถูกต้อง'
          : 'Clear information, verifiable stock, and business-ready documents for legitimate buyers.'
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-4 rounded-none border-2 border-black bg-white p-10 transition-colors hover:bg-zinc-50">
          <div className="flex items-start gap-5">
            <Building2 className="mt-1 h-10 w-10 shrink-0 stroke-[1.5]" />
            <div>
              <div className="text-xl font-black">{isThai ? 'ดำเนินธุรกิจมากกว่า 25 ปี' : 'More than 25 years in business'}</div>
              <div className="mt-3 text-base leading-[1.8] text-zinc-600">
                {isThai ? 'มีหน้าร้านจริงในฉะเชิงเทรา และทำธุรกิจในพื้นที่มายาวนาน' : 'A long-standing operator with a physical storefront in Chachoengsao.'}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-none border-2 border-black bg-white p-10 transition-colors hover:bg-zinc-50">
          <div className="flex items-start gap-5">
            <BadgeCheck className="mt-1 h-10 w-10 shrink-0 stroke-[1.5] text-emerald-600" />
            <div>
              <div className="text-xl font-black">{isThai ? 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS' : 'Authorized AIS Distributor'}</div>
              <div className="mt-3 text-base leading-[1.8] text-zinc-600">
                {isThai ? 'ทำงานแบบธุรกิจจริง เอกสารชัดเจน และดูแลหลังการขายในมาตรฐานที่ตรวจสอบได้' : 'Clear documentation and verifiable after-sales support standards.'}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-none border-2 border-black bg-white p-10 transition-colors hover:bg-zinc-50">
          <div className="flex items-start gap-5">
            <ReceiptText className="mt-1 h-10 w-10 shrink-0 stroke-[1.5] text-emerald-600" />
            <div>
              <div className="text-xl font-black">
                {isThai ? 'พร้อมเอกสารบัญชีสำหรับบริษัท ร้านค้าปลีก และเชนร้านค้า' : 'Full tax invoices for companies, retailers, and retail chains'}
              </div>
              <div className="mt-3 text-base leading-[1.8] text-zinc-600">
                {isThai ? 'จดทะเบียน VAT และออกใบกำกับภาษีเต็มรูปแบบ เลขทะเบียน VAT: 0245540000020' : 'VAT registered and able to issue full tax invoices. VAT registration: 0245540000020.'}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-none border-2 border-black bg-white p-10 transition-colors hover:bg-zinc-50">
          <div className="flex items-start gap-5">
            <Store className="mt-1 h-10 w-10 shrink-0 stroke-[1.5]" />
            <div>
              <div className="text-xl font-black">{isThai ? 'ดูแลร้านค้าพาร์ทเนอร์มากกว่า 180 ร้าน' : 'Supporting more than 180 retail partners'}</div>
              <div className="mt-3 text-base leading-[1.8] text-zinc-600">
                {isThai ? 'ดูแลทั้งร้านออนไลน์และหน้าร้าน พร้อมแพ็กและส่งทุกวันทำการ' : 'Serving online and physical retailers with packing and dispatch every business day.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
