import { MapPinned, ShieldCheck } from 'lucide-react'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'

export default function ProofSection() {
  const { isThai } = useLanguage()

  return (
    <section id="proof" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {isThai ? 'หน้าร้านจริง ธุรกิจจริง ตรวจสอบได้' : 'A real storefront and a business you can verify'}
            </h2>
            <p className="mt-6 text-base leading-8 text-zinc-600 sm:text-lg">
              {isThai
                ? 'ฐานปฏิบัติการของเราอยู่ในตัวเมืองฉะเชิงเทรา ใช้ดูแลสต็อก แพ็กสินค้า และประสานงานกับร้านค้าพาร์ทเนอร์ทุกวัน'
                : 'Our Chachoengsao operation supports stock handling, packing, dispatch, and daily partner communication.'}
            </p>
          </div>
          <div className="grid gap-4 border-y border-zinc-200 py-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <MapPinned className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <div className="font-bold">{isThai ? 'ที่อยู่ตรวจสอบได้' : 'Verifiable address'}</div>
                <div className="mt-2 text-sm leading-6 text-zinc-500">
                  {isThai ? '72/29-30 ถ.ศุขประยูร อ.เมือง ฉะเชิงเทรา' : '72/29-30 Sukprayoon Road, Chachoengsao'}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <div className="font-bold">{isThai ? 'AIS Authorized Distribution Partner' : 'AIS Authorized Distribution Partner'}</div>
                <div className="mt-2 text-sm leading-6 text-zinc-500">
                  {isThai ? 'เอกสารธุรกิจและหลักฐานออเดอร์พร้อมตรวจสอบ' : 'Business documentation and order evidence available.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.55fr,0.75fr]">
          <figure className="group overflow-hidden bg-zinc-100">
            <img
              src="/proof/storefront-building.jpg"
              alt={isThai ? 'อาคารและหน้าร้าน PK HUB ในฉะเชิงเทรา' : 'PK HUB building and storefront in Chachoengsao'}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015] lg:aspect-[16/10]"
            />
          </figure>
          <figure className="group overflow-hidden bg-zinc-100">
            <img
              src="/proof/storefront-entrance.jpg"
              alt={isThai ? 'ทางเข้าหน้าร้าน PK HUB' : 'PK HUB storefront entrance'}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015] lg:aspect-auto"
            />
          </figure>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-b border-zinc-200 pb-8 text-sm leading-6 text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{isThai ? 'ภาพหน้าร้านและอาคารจากสถานที่ดำเนินงานจริง' : 'Storefront and building photographed at our real operation.'}</span>
          <a
            href="https://maps.google.com/?q=72/29-30+ถนนศุขประยูร+ต.หน้าเมือง+อ.เมือง+จ.ฉะเชิงเทรา+24000"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
          >
            {isThai ? 'เปิดใน Google Maps' : 'Open in Google Maps'}
          </a>
        </div>
      </Container>
    </section>
  )
}
