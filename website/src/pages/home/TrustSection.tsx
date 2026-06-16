import { Building2, MessageCircle, ShieldCheck, Truck } from 'lucide-react'

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
          ? 'ข้อมูลชัดเจน สินค้าตรวจสอบได้ และทีมขายที่ดูแลหลังการขายจริง'
          : 'Clear information, verifiable stock, and a sales team that stays with you after the order.'
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
            <ShieldCheck className="mt-1 h-10 w-10 shrink-0 stroke-[1.5]" />
            <div>
              <div className="text-xl font-black">{isThai ? 'AIS Authorized Distribution Partner' : 'AIS Authorized Distribution Partner'}</div>
              <div className="mt-3 text-base leading-[1.8] text-zinc-600">
                {isThai ? 'ทำงานแบบธุรกิจจริง เอกสารชัดเจน และดูแลหลังการขายในมาตรฐานที่ตรวจสอบได้' : 'Clear documentation and verifiable after-sales support standards.'}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-none border-2 border-black bg-white p-10 transition-colors hover:bg-zinc-50">
          <div className="flex items-start gap-5">
            <MessageCircle className="mt-1 h-10 w-10 shrink-0 stroke-[1.5]" />
            <div>
              <div className="text-xl font-black">{isThai ? 'ดูแลร้านค้าพาร์ทเนอร์มากกว่า 180 ร้าน' : 'Supporting more than 180 retail partners'}</div>
              <div className="mt-3 text-base leading-[1.8] text-zinc-600">
                {isThai ? 'ดูแลทั้งร้านออนไลน์และหน้าร้าน ด้วยทีมที่เข้าใจงานค้าส่งมือถือ' : 'Serving online and physical retailers with a team that understands wholesale.'}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-none border-2 border-black bg-white p-10 transition-colors hover:bg-zinc-50">
          <div className="flex items-start gap-5">
            <Truck className="mt-1 h-10 w-10 shrink-0 stroke-[1.5]" />
            <div>
              <div className="text-xl font-black">{isThai ? 'แพ็กและส่งทุกวันทำการ' : 'Packed and dispatched every business day'}</div>
              <div className="mt-3 text-base leading-[1.8] text-zinc-600">
                {isThai ? 'ออเดอร์ที่ยืนยันทันรอบจัดส่งจะออกภายในวันเดียวกัน' : 'Orders confirmed before cutoff can leave the same day.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
