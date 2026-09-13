import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { BRAND_MARQUEE_ITEMS } from './constants'

export default function BrandsSection() {
  const { isThai } = useLanguage()
  return (
    <section id="brands" className="scroll-mt-24 border-b border-zinc-300 bg-[#f7f7f8] py-9 sm:py-12">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-base font-semibold">{isThai ? 'แบรนด์มือถือที่คุยกับเราได้' : 'Talk to us about these brands'}</h2>
          <a href="#contact" className="text-sm text-zinc-600 underline underline-offset-4">{isThai ? 'เช็กรุ่นและสต็อกกับทีม PK' : 'Check models and availability with PK'}</a>
        </div>
        <ul className="mt-7 grid grid-cols-4 items-center gap-x-5 gap-y-8 md:grid-cols-8">
          {BRAND_MARQUEE_ITEMS.map((brand) => (
            <li key={brand.name} className="flex h-12 items-center justify-center mix-blend-multiply grayscale">
              {brand.logoSrc ? (
                <div className={`flex max-w-full items-center justify-center overflow-hidden ${brand.frameClassName ?? 'h-10 w-28'}`}>
                  <img src={brand.logoSrc} alt={brand.name} width={128} height={48} loading="lazy" decoding="async" className={`h-full w-full object-contain ${brand.logoClassName ?? ''}`} />
                </div>
              ) : <span className="text-sm font-bold">{brand.name}</span>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
