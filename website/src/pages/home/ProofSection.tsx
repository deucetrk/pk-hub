import { m } from 'framer-motion'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

import { CONTACT } from './constants'

const PROOF_IMAGES = [
  {
    src: '/proof/storefront-building.webp',
    width: 1600,
    height: 1200,
    alt: 'อาคารและหน้าร้าน PK HUB ในฉะเชิงเทรา',
    title: 'หน้าร้านจริงในตัวเมืองฉะเชิงเทรา',
    enTitle: 'A real storefront in central Chachoengsao',
  },
  {
    src: '/reviews/iphone-lot.webp',
    width: 1100,
    height: 600,
    alt: 'ล็อตสินค้า iPhone จากงานจริงของ PK HUB',
    title: 'สต็อกจริง หมุนเวียนทุกวัน',
    enTitle: 'Real stock, moving daily',
  },
  {
    src: '/reviews/bubble-pack.webp',
    width: 900,
    height: 1200,
    alt: 'การแพ็กสินค้าแบบกันกระแทกก่อนจัดส่ง',
    title: 'แพ็กกันกระแทกก่อนส่ง',
    enTitle: 'Protective packing before dispatch',
  },
  {
    src: '/reviews/outbound-boxes.webp',
    width: 900,
    height: 1200,
    alt: 'กล่องสินค้าที่เตรียมจัดส่ง',
    title: 'ออเดอร์เตรียมออกทุกวันทำการ',
    enTitle: 'Orders out every business day',
  },
]

export default function ProofSection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()

  return (
    <section id="proof" className="scroll-mt-20 bg-[#f8fafc] py-16 sm:py-24">
      <Container>
        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid gap-8 sm:gap-12"
        >
          <m.div variants={item} className="grid max-w-3xl gap-4">
            <h2 className="font-display text-3xl font-black leading-[1.12] tracking-[-0.035em] sm:text-4xl">
              {isThai ? 'หน้าร้านจริง งานแพ็กจริง ตรวจสอบได้' : 'A real storefront and real packing you can verify'}
            </h2>
            <p className="text-base leading-[1.8] text-slate-600 sm:text-lg">
              {isThai
                ? 'ค้าส่งมือถือฉะเชิงเทราที่มีหน้าร้านและพื้นที่แพ็กของจริง ดูงานก่อนทักมาได้เลย'
                : 'A Chachoengsao smartphone wholesaler with a real storefront and packing area — see the work before you message us.'}
            </p>
          </m.div>

          <div className="grid gap-4 lg:grid-cols-3">
            <m.div variants={item} className="overflow-hidden bg-slate-100">
              <video
                className="aspect-[9/16] max-h-[560px] w-full bg-black object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/reviews/packing-highlight-reel-poster.jpg"
                aria-label={
                  isThai
                    ? 'วิดีโอไฮไลต์การแพ็กสินค้าจริงก่อนส่งให้ร้านค้าพาร์ทเนอร์'
                    : 'Highlight video of real packing before dispatch to retail partners'
                }
              >
                <source src="/reviews/packing-highlight-reel.mp4" type="video/mp4" />
                {isThai ? 'เบราว์เซอร์ของคุณไม่รองรับวิดีโอ' : 'Your browser does not support video playback.'}
              </video>
            </m.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {PROOF_IMAGES.map((image) => (
                <m.figure key={image.src} variants={item} className="group relative overflow-hidden bg-slate-100">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                    className="h-[260px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[280px]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
                  <figcaption className="absolute bottom-0 left-0 p-5 text-base font-bold tracking-tight text-white">
                    {isThai ? image.title : image.enTitle}
                  </figcaption>
                </m.figure>
              ))}
            </div>
          </div>

          <m.div variants={item} className="flex justify-end border-b border-slate-200 pb-8 text-sm leading-6 text-slate-500">
            <a
              href={CONTACT.MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950"
            >
              {isThai ? 'เปิดหน้าร้านใน Google Maps' : 'Open the storefront in Google Maps'}
            </a>
          </m.div>
        </m.div>
      </Container>
    </section>
  )
}
