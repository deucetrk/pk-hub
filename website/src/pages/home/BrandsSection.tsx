import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'

import { BRAND_MARQUEE_ITEMS, type BrandMarqueeItem } from './constants'

function BrandTile({ brand }: { brand: BrandMarqueeItem }) {
  return (
    <article className="brand-rail__item">
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
      <div className="brand-rail">
        <div className="brand-rail__track">
          <div className="brand-rail__group">
            {BRAND_MARQUEE_ITEMS.map((brand) => (
              <BrandTile key={`${brand.name}-primary`} brand={brand} />
            ))}
          </div>

          <div className="brand-rail__group" aria-hidden="true">
            {BRAND_MARQUEE_ITEMS.map((brand) => (
              <BrandTile key={`${brand.name}-duplicate`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
