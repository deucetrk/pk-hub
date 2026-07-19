import { m } from 'framer-motion'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

const REVIEW_IMAGES = [
  {
    src: '/reviews/store-team.webp',
    width: 800,
    height: 1758,
    alt: 'ทีมงานและหน้าร้าน PK HUB',
    title: 'หน้าร้านและทีมงานดูแล',
    description: 'ฐานการขายและการดูแลลูกค้าอยู่หน้างานจริง ไม่ใช่หน้าเว็บอย่างเดียว',
    enTitle: 'Storefront and support team',
    enDescription: 'Our sales and customer support operation is based at a real storefront.',
  },
  {
    src: '/reviews/bubble-pack.webp',
    width: 900,
    height: 1200,
    alt: 'การแพ็กสินค้าแบบกันกระแทกก่อนจัดส่ง',
    title: 'แพ็กกันกระแทกก่อนส่ง',
    description: 'ลดความเสี่ยงระหว่างขนส่งและช่วยให้ร้านค้ารับงานต่อได้มั่นใจขึ้น',
    enTitle: 'Protective packing before dispatch',
    enDescription: 'Careful packing reduces transit risk and helps retailers receive stock confidently.',
  },
  {
    src: '/reviews/outbound-boxes.webp',
    width: 900,
    height: 1200,
    alt: 'กล่องสินค้าที่เตรียมจัดส่ง',
    title: 'ออเดอร์เตรียมออก',
    description: 'มีรอบแพ็กและจัดส่งจริง ไม่ใช่เพียงแค่เปิดรับคำถามเรื่องราคา',
    enTitle: 'Orders ready to leave',
    enDescription: 'A real daily packing and dispatch workflow, not simply a price enquiry page.',
  },
  {
    src: '/reviews/oppo-batch.webp',
    width: 900,
    height: 1200,
    alt: 'สินค้าล็อต OPPO ที่เตรียมส่ง',
    title: 'มีหลากหลายแบรนด์',
    description: 'รองรับทั้งรุ่นตลาดหลักและรุ่นที่ร้านค้าต้องการเช็กราคาเป็นรอบๆ',
    enTitle: 'Multi-brand supply',
    enDescription: 'Supporting popular models and additional stock requested by retail partners.',
  },
]

export default function ReviewsSection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()

  return (
    <Section
      id="reviews"
      title={isThai ? 'ดูงานจริงก่อนทักมา' : 'See real work before you message'}
      subtitle={
        isThai
          ? 'วิดีโอและภาพจากรอบแพ็ก สต็อก และออเดอร์ที่เราเตรียมส่งให้ร้านค้า'
          : 'Videos and photos from real packing rounds, stock, and orders prepared for retailers.'
      }
    >
      <m.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <m.div variants={item} className="grid gap-6 rounded-none border-2 border-black bg-white p-4 md:col-span-2 lg:col-span-3 lg:grid-cols-[minmax(280px,420px),minmax(0,1fr)] lg:p-6">
          <div className="overflow-hidden bg-zinc-100 lg:self-start">
            <video
              className="aspect-[9/16] max-h-[500px] w-full bg-black object-cover"
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
          </div>
          <div className="flex flex-col justify-between gap-6 p-2 sm:p-4 lg:p-6">
            <div>
              <div className="font-display text-3xl font-black leading-[1.12] tracking-[-0.035em] text-zinc-950 sm:text-4xl">
                {isThai ? 'รอบแพ็กสินค้าจริงที่ฉะเชิงเทรา' : 'Real packing round in Chachoengsao'}
              </div>
              <div className="mt-5 text-base leading-[1.8] text-zinc-600 sm:text-lg">
                {isThai
                  ? 'รวมบางช่วงจากรอบแพ็กสินค้าจริง มีทั้งสินค้าหลายแบรนด์ การแพ็กกันกระแทก และออเดอร์ที่เตรียมส่งให้ร้านค้าพาร์ทเนอร์'
                  : 'A short highlight from real packing rounds, showing multi-brand stock, protective packing, and orders prepared for retail partners.'}
              </div>
            </div>
            <div className="grid gap-px bg-zinc-200 sm:grid-cols-3 lg:max-w-2xl">
              {(isThai
                ? ['สต็อกจริง', 'แพ็กก่อนส่ง', 'ฐานฉะเชิงเทรา']
                : ['Real stock', 'Packed before dispatch', 'Chachoengsao base']
              ).map((chip) => (
                <div key={chip} className="bg-zinc-50 px-4 py-4 text-sm font-bold text-zinc-900">
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </m.div>

        <m.div variants={item} className="group relative overflow-hidden bg-zinc-100 md:col-span-2 lg:col-span-2">
          <img
            src="/reviews/iphone-lot.webp"
            alt="ล็อตสินค้า iPhone จากงานจริงของ PK HUB"
            width={1100}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[420px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/45 to-zinc-900/10"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <div className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isThai ? 'หลากหลายรุ่น พร้อมปล่อย' : 'Multiple models ready for partners'}
            </div>
            <div className="max-w-lg text-sm leading-[1.6] text-zinc-200 sm:text-base">
              {isThai
                ? 'ภาพจากงานจริงของ PK HUB ยืนยันว่ามีสินค้าเข้า มีการหมุนเวียน และส่งต่อให้ร้านค้าอย่างต่อเนื่อง'
                : 'Real PK HUB stock showing active inventory flow and regular supply to our retail partners.'}
            </div>
          </div>
        </m.div>

        {REVIEW_IMAGES.map((image) => (
          <m.div variants={item} key={image.title} className="group relative overflow-hidden bg-zinc-100">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="h-[280px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[320px] lg:h-[100%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/45 to-zinc-900/10"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="mb-2 text-lg font-bold tracking-tight text-white">{isThai ? image.title : image.enTitle}</div>
              <div className="text-sm leading-[1.6] text-zinc-300">
                {isThai ? image.description : image.enDescription}
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </Section>
  )
}
