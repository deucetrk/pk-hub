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
    logoSrc: '/brands/honor.jpg',
    frameClassName: 'h-8 w-[5.75rem] sm:h-9 sm:w-[6.5rem]',
    logoClassName: 'scale-[1.9]',
  },
  {
    name: 'Infinix',
    textClassName: 'text-[1.05rem] tracking-[0.18em] sm:text-[1.2rem]',
  },
]

export const EASTERN_PROVINCES = ['ชลบุรี', 'ระยอง', 'ฉะเชิงเทรา', 'จันทบุรี', 'ตราด', 'สระแก้ว', 'ปราจีนบุรี']
