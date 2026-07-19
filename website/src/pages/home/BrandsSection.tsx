import { m } from 'framer-motion'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

import { BRAND_MARQUEE_ITEMS, type BrandMarqueeItem } from './constants'

function BrandTile({ brand }: { brand: BrandMarqueeItem }) {
  return (
    <article className="flex min-h-28 items-center justify-center bg-white px-6 py-6 grayscale transition-all duration-300 hover:grayscale-0">
      {brand.logoSrc ? (
        <div className={`flex items-center justify-center overflow-hidden ${brand.frameClassName ?? 'h-10 w-28 sm:h-12 sm:w-32'}`}>
          <img
            src={brand.logoSrc}
            alt={`${brand.name} logo`}
            loading="lazy"
            className={`h-full w-full origin-center object-contain ${brand.logoClassName ?? ''}`}
          />
        </div>
      ) : (
        <span className={`font-black uppercase ${brand.textClassName ?? 'text-lg tracking-[0.16em] sm:text-xl'}`}>{brand.name}</span>
      )}
    </article>
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
        className="grid grid-cols-2 gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-4"
      >
        {BRAND_MARQUEE_ITEMS.map((brand) => (
          <BrandTile key={brand.name} brand={brand} />
        ))}
      </m.div>
    </Section>
  )
}
