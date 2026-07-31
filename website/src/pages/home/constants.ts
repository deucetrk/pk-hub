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
  logoSrc?: string
  frameClassName?: string
  logoClassName?: string
  textClassName?: string
}

export const BRAND_MARQUEE_ITEMS: BrandMarqueeItem[] = [
  {
    name: 'Apple',
    logoSrc: '/brands/apple.png',
    frameClassName: 'h-14 w-14 sm:h-16 sm:w-16',
    logoClassName: 'scale-[1.05]',
  },
  {
    name: 'Samsung',
    logoSrc: '/brands/samsung.webp',
    frameClassName: 'h-9 w-[8.75rem] sm:h-10 sm:w-[9.75rem]',
    logoClassName: 'scale-[1.85]',
  },
  {
    name: 'Oppo',
    logoSrc: '/brands/oppo.png',
    frameClassName: 'h-8 w-[5.75rem] sm:h-9 sm:w-[6.5rem]',
    logoClassName: 'scale-[1.65]',
  },
  {
    name: 'Vivo',
    logoSrc: '/brands/vivo.png',
    frameClassName: 'h-8 w-[5.5rem] sm:h-9 sm:w-[6rem]',
    logoClassName: 'scale-[1.32]',
  },
  {
    name: 'Realme',
    logoSrc: '/brands/realme.png',
    frameClassName: 'h-8 w-[6.5rem] sm:h-9 sm:w-[7rem]',
    logoClassName: 'scale-[1.22]',
  },
  {
    name: 'Xiaomi',
    logoSrc: '/brands/xiaomi.webp',
    frameClassName: 'h-12 w-12 sm:h-14 sm:w-14',
    logoClassName: 'scale-[0.92]',
  },
  {
    name: 'Honor',
    logoSrc: '/brands/honor.webp',
    frameClassName: 'h-8 w-[5.75rem] sm:h-9 sm:w-[6.5rem]',
    logoClassName: 'scale-[1.9]',
  },
  {
    name: 'Infinix',
    textClassName: 'text-[1.05rem] tracking-[0.18em] sm:text-[1.2rem]',
  },
]

export const EASTERN_PROVINCES = ['ชลบุรี', 'ระยอง', 'ฉะเชิงเทรา', 'จันทบุรี', 'ตราด', 'สระแก้ว', 'ปราจีนบุรี']
