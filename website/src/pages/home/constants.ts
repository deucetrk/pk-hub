// Single source of truth for contact wiring — every CTA/link reads from here.
export const CONTACT = {
  LINE_URL: 'https://lin.ee/VEgW6qG',
  LINE_ID: '@pkhub',
  PHONE_TEL: 'tel:0892480888',
  PHONE_DISPLAY: '089-248-0888',
  FACEBOOK_URL: 'https://www.facebook.com/pkmedia168',
  MAPS_URL: 'https://www.google.com/maps/search/?api=1&query=72%2F29-30%20%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%A8%E0%B8%B8%E0%B8%82%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A2%E0%B8%B9%E0%B8%A3%20%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%20%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%20%E0%B8%89%E0%B8%B0%E0%B9%80%E0%B8%8A%E0%B8%B4%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B2%2024000',
  VAT_NUMBER: '0245540000020',
} as const

export const BRANDS = ['Apple', 'Samsung', 'Oppo', 'Vivo', 'Realme', 'Xiaomi', 'Honor', 'Infinix']

export type BrandMarqueeItem = {
  name: string
  logoSrc: string
  logoKind: 'symbol' | 'wordmark'
  logoClassName?: string
}

export const BRAND_MARQUEE_ITEMS: BrandMarqueeItem[] = [
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
    logoSrc: '/brands/normalized/honor.webp',
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
