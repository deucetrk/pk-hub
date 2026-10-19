import { useLanguage } from '@/i18n/LanguageContext'

import { ACCESSORY_BRANDS, PHONE_BRANDS, brandSlug, type Brand } from '@/content/brands'

import { productRoute, t } from './site'

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
    <span className={word.doto ? 'v1-doto' : 'v1-brand-word'} style={{ color: word.color, letterSpacing: word.spacing, fontSize: word.size }}>
      {brand.name}
    </span>
  )
}

type RowProps = {
  label: string
  note: string
  brands: Brand[]
  kind: 'phone' | 'accessory'
  reverse?: boolean
  selected?: string | null
  onSelect?: (slug: string | null) => void
}

/**
 * A billboard row: the list scrolls nonstop (duplicated once for a seamless loop), pauses on hover
 * or keyboard focus, and becomes a static wrapped grid when reduced motion is preferred.
 * With `onSelect` the tiles are filter toggles instead of links.
 */
function BrandRow({ label, note, brands, kind, reverse = false, selected, onSelect }: RowProps) {
  const { language } = useLanguage()
  const target = kind === 'phone' ? 'handset-wholesale' : 'accessories'
  const tileClass = `v1-brand-tile ${kind === 'accessory' ? 'v1-brand-tile-line' : ''}`
  const tile = (brand: Brand, copy: boolean) => {
    const slug = brandSlug(brand)
    const label = t(language, `ดูแบรนด์ ${brand.name}`, `See ${brand.name}`)
    if (onSelect) {
      const pressed = selected === slug
      return (
        <button
          type="button"
          className={tileClass}
          aria-pressed={pressed}
          aria-label={copy ? undefined : label}
          tabIndex={copy ? -1 : undefined}
          onClick={() => onSelect(pressed ? null : slug)}
        >
          <BrandMark brand={brand} />
        </button>
      )
    }
    return (
      <a href={`${productRoute(language, target)}?brand=${slug}#v1-brand-filter`} className={tileClass} aria-label={label} tabIndex={copy ? -1 : undefined}>
        <BrandMark brand={brand} />
      </a>
    )
  }
  return (
    <div className="v1-brand-row">
      <div>
        <p className="text-base font-medium">{label}</p>
        <p className="text-sm leading-[22px] text-[var(--v1-muted)]">{note}</p>
      </div>
      <div className={`v1-marquee ${reverse ? 'v1-marquee-reverse' : ''} ${onSelect ? 'v1-marquee-static' : ''}`}>
        <ul className="v1-marquee-track" aria-label={label}>
          {brands.map((brand) => (
            <li key={brand.name}>{tile(brand, false)}</li>
          ))}
          {onSelect
            ? null
            : brands.map((brand) => (
                <li key={`${brand.name}-copy`} aria-hidden="true" className="v1-marquee-copy">
                  {tile(brand, true)}
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}

export default function BrandWall({ selected, onSelect }: { selected?: string | null; onSelect?: (slug: string | null) => void } = {}) {
  const { language } = useLanguage()
  return (
    <div>
      <BrandRow
        label={t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets')}
        note={t(language, '10 แบรนด์', '10 brands')}
        brands={PHONE_BRANDS}
        kind="phone"
        selected={selected}
        onSelect={onSelect}
      />
      <BrandRow
        label={t(language, 'อุปกรณ์เสริม', 'Accessories')}
        note={t(language, 'หูฟัง ลำโพง นาฬิกา ที่ชาร์จ และเคส', 'Audio, watches, chargers and cases')}
        brands={ACCESSORY_BRANDS}
        kind="accessory"
        reverse
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  )
}
