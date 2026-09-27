import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { BRAND_MARQUEE_ITEMS } from './constants'

function BrandGrid() {
  return (
    <div className="pk-brand-grid">
      {BRAND_MARQUEE_ITEMS.map((brand, index) => (
        <span key={brand.name} className="pk-brand-grid-item">
          <span className="pk-brand-logo-stage">
            <img
              src={brand.logoSrc}
              alt={brand.name}
              width={brand.logoKind === 'symbol' ? 32 : 112}
              height={28}
              loading="lazy"
              decoding="async"
              className={`pk-brand-logo pk-brand-logo-${brand.logoKind} ${brand.logoClassName ?? ''}`}
            />
          </span>
          {index < BRAND_MARQUEE_ITEMS.length - 1 && <span className="pk-brand-grid-divider" aria-hidden="true">/</span>}
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
            <p className="pk-eyebrow">01 / แบรนด์มือถือ</p>
            <h2 className="mt-2 text-base font-semibold">{isThai ? 'แบรนด์มือถือที่คุยกับเราได้' : 'Talk to us about these brands'}</h2>
          </div>
          <a href="#contact" className="text-sm text-zinc-600 underline underline-offset-4">
            {isThai ? 'เช็กรุ่นและสต็อกกับทีม PK' : 'Check models and availability with PK'}
          </a>
        </div>

        <div className="pk-brand-list mt-7" role="region" aria-label={isThai ? 'รายชื่อแบรนด์มือถือ' : 'Mobile phone brands'}>
          <BrandGrid />
        </div>

        <p className="mt-4 text-xs leading-6 text-zinc-500">
          {isThai ? 'รายชื่อแบรนด์สำหรับคุยรุ่นและความต้องการของร้าน — เช็กข้อมูลปัจจุบันกับทีม PK ก่อนสั่งซื้อ' : 'Brands to start a conversation about models and store needs — ask PK to confirm current details before ordering.'}
        </p>
      </Container>
    </section>
  )
}
