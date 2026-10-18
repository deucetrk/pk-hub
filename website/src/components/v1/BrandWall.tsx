import { useLanguage } from '@/i18n/LanguageContext'

import { ACCESSORY_BRANDS, PHONE_BRANDS, type Brand } from '@/content/brands'

import { t } from './site'

export function BrandMark({ brand }: { brand: Brand }) {
  if (brand.src) {
    return (
      <img
        src={brand.src}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        loading="lazy"
        decoding="async"
        className={brand.crop ? 'v1-crop' : undefined}
        style={{ width: brand.width, height: brand.height }}
      />
    )
  }
  const word = brand.word!
  return (
    <span
      className={word.doto ? 'v1-doto' : 'v1-brand-word'}
      style={{ color: word.color, letterSpacing: word.spacing, fontSize: word.size }}
    >
      {brand.name}
    </span>
  )
}

export default function BrandWall() {
  const { language } = useLanguage()
  return (
    <div>
      <div className="v1-brand-row">
        <div>
          <p className="text-base font-medium">{t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets')}</p>
          <p className="text-sm leading-[22px] text-[var(--v1-muted)]">{t(language, '10 แบรนด์', '10 brands')}</p>
        </div>
        <ul className="v1-brand-tiles v1-fit" aria-label={t(language, 'แบรนด์มือถือ', 'Phone brands')}>
          {PHONE_BRANDS.map((brand) => (
            <li key={brand.name} className="v1-brand-tile">
              <BrandMark brand={brand} />
            </li>
          ))}
        </ul>
      </div>
      <div className="v1-brand-row">
        <div>
          <p className="text-base font-medium">{t(language, 'อุปกรณ์เสริม', 'Accessories')}</p>
          <p className="text-sm leading-[22px] text-[var(--v1-muted)]">
            {t(language, 'หูฟัง ลำโพง นาฬิกา ที่ชาร์จ และเคส', 'Audio, watches, chargers and cases')}
          </p>
        </div>
        <ul className="v1-brand-tiles" aria-label={t(language, 'แบรนด์อุปกรณ์เสริม', 'Accessory brands')}>
          {ACCESSORY_BRANDS.map((brand) => (
            <li key={brand.name} className="v1-brand-tile v1-brand-tile-line">
              <BrandMark brand={brand} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
