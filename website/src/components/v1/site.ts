import type { Language } from '@/i18n/LanguageContext'

export { CONTACT } from '@/pages/home/constants'

/** Verified public social profiles (Instagram checked 2026-10-19; TikTok confirmed by the owner 2026-10-21). */
export const SOCIAL = {
  handle: '@pkmedia168',
  facebook: 'https://www.facebook.com/pkmedia168',
  instagram: 'https://www.instagram.com/pkmedia168/',
  tiktok: 'https://www.tiktok.com/@pkmedia168',
} as const

export const HQ = {
  th: {
    name: 'สำนักงานใหญ่ PK HUB · ฉะเชิงเทรา',
    address: '72/29-30 ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา 24000',
    hours: 'เปิด จันทร์–เสาร์ 8:00–17:00 · ทีมออนไลน์ 24 ชม.',
  },
  en: {
    name: 'PK HUB headquarters · Chachoengsao',
    address: '72/29-30 Na Mueang, Mueang Chachoengsao, Chachoengsao 24000',
    hours: 'Open Mon–Sat 8:00–17:00 · Online team 24 hours',
  },
} as const

export const route = (language: Language, path = '') => `/${language}${path}`

export type ServiceSlug =
  | 'handset-wholesale'
  | 'accessories'
  | 'stock-on-demand'
  | 'ais-sim'
  | 'ais-rom'
  | 'finance'
  | 'after-sales'
  | 'repair'
  | 'partner-marketing'

export const productRoute = (language: Language, slug: ServiceSlug) => `/${language}/products/${slug}`

export const t = (language: Language, th: string, en: string) => (language === 'th' ? th : en)
