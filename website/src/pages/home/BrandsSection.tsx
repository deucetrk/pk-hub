import { m } from 'framer-motion'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

import { BRAND_MARQUEE_ITEMS, type BrandMarqueeItem } from './constants'

function BrandTile({ brand }: { brand: BrandMarqueeItem }) {
  return (
    <div className="flex min-h-28 w-44 shrink-0 items-center justify-center bg-white px-6 py-6 grayscale sm:w-52">
      {brand.logoSrc ? (
        <div className={`flex items-center justify-center overflow-hidden ${brand.frameClassName ?? 'h-10 w-28 sm:h-12 sm:w-32'}`}>
          <img
            src={brand.logoSrc}
            alt={`${brand.name} logo`}
            width={128}
            height={48}
            loading="lazy"
            decoding="async"
            className={`h-full w-full origin-center object-contain ${brand.logoClassName ?? ''}`}
          />
        </div>
      ) : (
        <span className={`font-black uppercase ${brand.textClassName ?? 'text-lg tracking-[0.16em] sm:text-xl'}`}>{brand.name}</span>
      )}
    </div>
  )
}

export default function BrandsSection() {
  const { isThai } = useLanguage()
  const { item } = useRevealMotion()

  return (
    <Section
      id="brands"
      title={isThai ? 'แบรนด์มือถือที่จัดจำหน่าย' : 'Smartphone brands we supply'}
      subtitle={
        isThai
          ? 'เช็กราคาและสต็อกล่าสุดกับทีมขายโดยตรง ไม่มีการเปิดราคาส่งสาธารณะ'
          : 'Contact our sales team for current wholesale prices and live stock.'
      }
    >
      <m.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="pk-marquee overflow-hidden border-y border-slate-200"
        aria-label={isThai ? 'แบรนด์ที่จัดจำหน่าย' : 'Brands we supply'}
      >
        <div className="pk-marquee-track flex w-max gap-px bg-slate-200">
          {[...BRAND_MARQUEE_ITEMS, ...BRAND_MARQUEE_ITEMS].map((brand, i) => (
            <BrandTile key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </div>
      </m.div>
    </Section>
  )
}
