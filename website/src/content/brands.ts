export type Brand = {
  name: string
  src?: string
  width?: number
  height?: number
  crop?: boolean
  word?: { color: string; spacing?: string; doto?: boolean; size?: number }
}

/** Phone and tablet brands sold through PK HUB (owner list 2026-10-18; 10 brands). */
export const PHONE_BRANDS: Brand[] = [
  { name: 'Apple', src: '/v1/brands/apple.svg', width: 30, height: 36 },
  { name: 'Samsung', src: '/v1/brands/samsung.svg', width: 88, height: 40, crop: true },
  { name: 'OPPO', src: '/v1/brands/oppo.png', width: 76, height: 28 },
  { name: 'vivo', src: '/v1/brands/vivo.svg', width: 72, height: 28 },
  { name: 'Xiaomi', src: '/v1/brands/xiaomi.png', width: 36, height: 36 },
  { name: 'HONOR', src: '/v1/brands/honor.svg', width: 80, height: 28 },
  { name: 'HUAWEI', src: '/v1/brands/huawei.png', width: 72, height: 32 },
  { name: 'realme', src: '/v1/brands/realme.png', width: 76, height: 30 },
  { name: 'NOTHING', word: { color: '#0a0a0a', doto: true } },
  { name: 'TECNO', src: '/v1/brands/tecno.svg', width: 80, height: 24 },
]

/** Accessory brands shown on the wall (16 accessory brands in total per owner). */
export const ACCESSORY_BRANDS: Brand[] = [
  { name: 'JBL', src: '/v1/brands/jbl.svg', width: 44, height: 26 },
  { name: 'Marshall', src: '/v1/brands/marshall.svg', width: 84, height: 30 },
  { name: 'Sony', src: '/v1/brands/sony.svg', width: 80, height: 34, crop: true },
  { name: 'ANKER', word: { color: '#00a7e1', size: 18 } },
  { name: 'soundcore', src: '/v1/brands/soundcore.png', width: 96, height: 30 },
  { name: 'SHOKZ', word: { color: '#0a0a0a', spacing: '0.08em' } },
  { name: 'Razer', src: '/v1/brands/razer.svg', width: 30, height: 30 },
  { name: 'Garmin', src: '/v1/brands/garmin.svg', width: 92, height: 34, crop: true },
  { name: 'Amazfit', src: '/v1/brands/amazfit.png', width: 92, height: 28 },
  { name: 'imoo', src: '/v1/brands/imoo.svg', width: 64, height: 26 },
  { name: 'WHOOP', src: '/v1/brands/whoop.svg', width: 84, height: 22 },
  { name: 'CMF by Nothing', src: '/v1/brands/cmf.svg', width: 60, height: 36 },
  { name: 'AMAZE ONE', word: { color: '#3a3a3a', size: 15 } },
  { name: 'LINK UP', word: { color: '#3a3a3a', size: 15 } },
]
