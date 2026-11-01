// Single source of truth for contact wiring — every CTA/link reads from here.
export const CONTACT = {
  LINE_URL: 'https://lin.ee/VEgW6qG',
  LINE_ID: '@pkhub',
  PHONE_TEL: 'tel:0892480888',
  PHONE_DISPLAY: '089-248-0888',
  FACEBOOK_URL: 'https://www.facebook.com/pkmedia168',
  // Google Business Profile "PKHub by PK Media" (owner, 2026-11-01); the cid link survives renames.
  MAPS_URL: 'https://www.google.com/maps?cid=325354172230912396',
  REVIEW_URL: 'https://g.page/r/CYzJA1bl44MEEBM/review',
  VAT_NUMBER: '0245540000020',
} as const

export const BRANDS = ['Apple', 'Samsung', 'Oppo', 'Vivo', 'Realme', 'Xiaomi', 'Honor', 'Infinix']

export type BrandItem = {
  name: string
  logoSrc: string
  logoKind: 'symbol' | 'wordmark'
  logoClassName?: string
}

export const BRAND_ITEMS: BrandItem[] = [
  {
    name: 'Apple',
    logoSrc: '/brands/normalized/apple.png',
    logoKind: 'symbol',
  },
  {
    name: 'Samsung',
    logoSrc: '/brands/normalized/samsung.png',
    logoKind: 'wordmark',
  },
  {
    name: 'Oppo',
    logoSrc: '/brands/normalized/oppo.png',
    logoKind: 'wordmark',
  },
  {
    name: 'Vivo',
    logoSrc: '/brands/normalized/vivo.png',
    logoKind: 'wordmark',
  },
  {
    name: 'Realme',
    logoSrc: '/brands/normalized/realme.png',
    logoKind: 'wordmark',
  },
  {
    name: 'Xiaomi',
    logoSrc: '/brands/normalized/xiaomi.png',
    logoKind: 'symbol',
  },
  {
    name: 'Honor',
    logoSrc: '/brands/normalized/honor.png',
    logoKind: 'wordmark',
    logoClassName: 'pk-brand-logo-honor',
  },
  {
    name: 'Infinix',
    // Official Infinix footer artwork; invert its white artwork to match the monochrome rail.
    logoSrc: '/brands/normalized/infinix.png',
    logoKind: 'wordmark',
    logoClassName: 'pk-brand-logo-infinix',
  },
]

export const EASTERN_PROVINCES = ['ชลบุรี', 'ระยอง', 'ฉะเชิงเทรา', 'จันทบุรี', 'ตราด', 'สระแก้ว', 'ปราจีนบุรี']
