import { m } from 'framer-motion'
import { BadgeCheck, MapPinned, ReceiptText } from 'lucide-react'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

import { CONTACT } from './constants'

export default function ProofSection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()

  return (
    <section id="proof" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <Container>
        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:items-end"
        >
          <m.div variants={item} className="max-w-xl">
            <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {isThai ? 'หน้าร้านจริง ธุรกิจจริง ตรวจสอบได้' : 'A real storefront and a business you can verify'}
            </h2>
            <p className="mt-6 text-base leading-8 text-zinc-600 sm:text-lg">
              {isThai
                ? 'เราอยู่ในตัวเมืองฉะเชิงเทรา มีหน้าร้านและพื้นที่แพ็กของจริง ร้านค้าสามารถเช็กที่อยู่ เอกสาร และงานส่งของเราได้'
                : 'We are based in central Chachoengsao with a real storefront and packing area, so retailers can verify our address, documents, and dispatch work.'}
            </p>
          </m.div>
          <m.div variants={container} className="grid gap-4 border-y border-zinc-200 py-6 sm:grid-cols-2 lg:grid-cols-3">
            <m.div variants={item} className="flex gap-4">
              <MapPinned className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <div className="font-bold">{isThai ? 'ที่อยู่ตรวจสอบได้' : 'Verifiable address'}</div>
                <div className="mt-2 text-sm leading-6 text-zinc-500">
                  {isThai ? '72/29-30 ถ.ศุขประยูร อ.เมือง ฉะเชิงเทรา' : '72/29-30 Sukprayoon Road, Chachoengsao'}
                </div>
              </div>
            </m.div>
            <m.div variants={item} className="flex gap-4">
              <BadgeCheck className="mt-1 h-6 w-6 shrink-0 text-zinc-900" />
              <div>
                <div className="font-bold">{isThai ? 'ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS' : 'Authorized AIS Distributor'}</div>
                <div className="mt-2 text-sm leading-6 text-zinc-500">
                  {isThai ? 'คุยงานขายส่งได้มั่นใจ มีเอกสารให้ตรวจสอบ' : 'Wholesale buyers can verify business documentation.'}
                </div>
              </div>
            </m.div>
            <m.div variants={item} className="flex gap-4">
              <ReceiptText className="mt-1 h-6 w-6 shrink-0 text-zinc-900" />
              <div>
                <div className="font-bold">{isThai ? 'ออกใบกำกับภาษีเต็มรูปแบบ' : 'Full tax invoices'}</div>
                <div className="mt-2 text-sm leading-6 text-zinc-500">
                  {isThai ? `เลขทะเบียน VAT: ${CONTACT.VAT_NUMBER}` : `VAT registration: ${CONTACT.VAT_NUMBER}`}
                </div>
              </div>
            </m.div>
          </m.div>
        </m.div>

        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid gap-4 lg:grid-cols-[1.55fr,0.75fr]"
        >
          <m.figure variants={item} className="group overflow-hidden rounded-none bg-zinc-100">
            <img
              src="/proof/storefront-building.webp"
              alt={isThai ? 'อาคารและหน้าร้าน PK HUB ในฉะเชิงเทรา' : 'PK HUB building and storefront in Chachoengsao'}
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015] lg:aspect-[16/10]"
            />
          </m.figure>
          <m.figure variants={item} className="group overflow-hidden rounded-none bg-zinc-100">
            <img
              src="/proof/storefront-entrance.webp"
              alt={isThai ? 'ทางเข้าหน้าร้าน PK HUB' : 'PK HUB storefront entrance'}
              width={1000}
              height={1333}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015] lg:aspect-auto"
            />
          </m.figure>
        </m.div>

        <div className="mt-5 flex flex-col gap-3 border-b border-zinc-200 pb-8 text-sm leading-6 text-zinc-500 sm:flex-row sm:items-center sm:justify-end">
          <a
            href={CONTACT.MAPS_URL}
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
