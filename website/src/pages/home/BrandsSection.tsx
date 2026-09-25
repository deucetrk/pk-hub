import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { BRAND_MARQUEE_ITEMS } from './constants'

function BrandRail({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="pk-brand-rail" aria-hidden={ariaHidden}>
      {BRAND_MARQUEE_ITEMS.map((brand) => (
        <span key={brand.name} className="pk-brand-rail-item">
          {brand.logoSrc ? (
            <span className={`flex items-center justify-center overflow-hidden ${brand.frameClassName ?? 'h-10 w-28'}`}>
              <img
                src={brand.logoSrc}
                alt={ariaHidden ? '' : brand.name}
                width={128}
                height={48}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-contain ${brand.logoClassName ?? ''}`}
              />
            </span>
          ) : (
            <span className="text-sm font-bold">{brand.name}</span>
          )}
          <span className="pk-brand-rail-dot" aria-hidden="true">/</span>
        </span>
      ))}
    </div>
  )
}

export default function BrandsSection() {
  const { isThai } = useLanguage()

  return (
    <section id="brands" className="pk-brands-section scroll-mt-24 border-b border-zinc-300 bg-[#f7f7f8] py-9 sm:py-12">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="pk-eyebrow">01 / BRANDS</p>
            <h2 className="mt-2 text-base font-semibold">{isThai ? 'แบรนด์มือถือที่คุยกับเราได้' : 'Talk to us about these brands'}</h2>
          </div>
          <a href="#contact" className="text-sm text-zinc-600 underline underline-offset-4">
            {isThai ? 'เช็กรุ่นและสต็อกกับทีม PK' : 'Check models and availability with PK'}
          </a>
        </div>

        <div className="pk-marquee mt-7" role="region" aria-label={isThai ? 'รายชื่อแบรนด์มือถือ' : 'Mobile phone brands'}>
          <div className="pk-marquee-track">
            <BrandRail />
            <BrandRail ariaHidden />
          </div>
        </div>

        <p className="mt-4 text-xs leading-6 text-zinc-500">
          {isThai ? 'รายชื่อแบรนด์สำหรับคุยรุ่นและความต้องการของร้าน — เช็กข้อมูลปัจจุบันกับทีม PK ก่อนสั่งซื้อ' : 'Brands to start a conversation about models and store needs — ask PK to confirm current details before ordering.'}
        </p>
      </Container>
    </section>
  )
}
