import { MapPinned, Truck } from 'lucide-react'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'

import { EASTERN_PROVINCES } from './constants'

export default function AreaSection() {
  const { isThai } = useLanguage()
  const provinces = isThai ? EASTERN_PROVINCES : ['Chonburi', 'Rayong', 'Chachoengsao', 'Chanthaburi', 'Trat', 'Sa Kaeo', 'Prachinburi']

  return (
    <Section
      id="area"
      title={isThai ? 'ค้าส่งมือถือฉะเชิงเทรา สำหรับร้านค้าและพาร์ทเนอร์' : 'Smartphone wholesale in Chachoengsao for retail partners'}
      subtitle={
        isThai
          ? 'ฐานหลักของ PK HUB อยู่ในตัวเมืองฉะเชิงเทรา ดูแลร้านค้าในพื้นที่และภาคตะวันออก พร้อมรองรับการส่งต่างจังหวัดตามรอบขนส่ง'
          : 'PK HUB is based in central Chachoengsao, supporting local and Eastern Thailand retailers with nationwide delivery available.'
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-none border-2 border-black bg-white p-10">
          <div className="flex items-center gap-4 text-xl font-black">
            <MapPinned className="h-8 w-8 stroke-[1.5]" />
            {isThai ? 'จังหวัดที่ดูแลเป็นหลัก' : 'Primary service provinces'}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {provinces.map((p) => (
              <div
                key={p}
                className={
                  p === (isThai ? 'ฉะเชิงเทรา' : 'Chachoengsao')
                    ? 'flex items-center justify-center rounded-none border-2 border-black bg-black px-4 py-4 text-base font-bold text-white'
                    : 'flex items-center justify-center rounded-none border-2 border-black/30 bg-zinc-50/40 px-4 py-4 text-base font-bold text-zinc-400'
                }
              >
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-none border-2 border-black bg-white p-10">
          <div className="flex items-center gap-4 text-xl font-black">
            <Truck className="h-8 w-8 stroke-[1.5]" />
            {isThai ? 'ฐานค้าส่งมือถือและการจัดส่ง' : 'Wholesale base and dispatch'}
          </div>
          <div className="mt-4 text-base leading-[1.8] text-zinc-600">
            {isThai
              ? 'ฐานหลักอยู่ที่ 72/29-30 ถนนศุขประยูร ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา 24000 สำหรับเช็กสต็อก แพ็กมือถือเครื่องศูนย์ไทย และประสานงานออเดอร์ร้านค้า'
              : 'Our main operation is at 72/29-30 Sukprayoon Road, Chachoengsao 24000 for stock checks, Thai-market phone packing, and retail partner order coordination.'}
          </div>
          <div className="mt-8 rounded-none border-2 border-black bg-zinc-50 p-6 text-base leading-[1.8] font-bold">
            {isThai
              ? 'ต้องการเช็กคิวหรือระยะเวลาส่ง? ทัก LINE หรือโทรให้ทีมช่วยประเมินตามรอบจริง'
              : 'Need a delivery estimate? Message us on LINE or call for the latest dispatch schedule.'}
          </div>
        </div>
      </div>
    </Section>
  )
}
