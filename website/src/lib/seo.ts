import { useEffect } from 'react'
import { PRODUCT_SERVICES, type ProductId } from '@/content/productServices'

export const SITE_URL = 'https://pkhub.co'

export type PageMeta = {
  title: string
  robots?: string
  description: string
  canonical: string
  ogType?: 'website' | 'article'
  image?: string
  imageAlt?: string
  locale?: 'th_TH' | 'en_US'
  publishedTime?: string
  modifiedTime?: string
}

export const HOME_META = {
  th: {
    title: 'พาร์ทเนอร์ค้าส่งมือถือทั่วประเทศ ศูนย์ปฏิบัติการฉะเชิงเทรา | PK HUB',
    description:
      'PK HUB ระบบนิเวศค้าส่งมือถือเครื่องศูนย์ไทยและอุปกรณ์เสริมสำหรับร้านค้าทั่วประเทศ ออกใบกำกับภาษีเต็มรูปแบบ พร้อมระบบ Dealer Portal เช็กราคาและสต็อกอ้างอิง',
    canonical: `${SITE_URL}/th`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    imageAlt: 'ศูนย์ปฏิบัติการและสต็อกจริง PK HUB ฉะเชิงเทรา',
    locale: 'th_TH',
  },
  en: {
    title: 'PK HUB | Nationwide Smartphone Wholesale & Retail Partner Ecosystem',
    description:
      'Official multi-brand smartphone and accessory wholesale partner for retailers nationwide. Transparent Dealer Portal, verified stock, and dedicated team based in Chachoengsao.',
    canonical: `${SITE_URL}/en`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    imageAlt: 'PK HUB smartphone wholesale operations and storefront in Chachoengsao',
    locale: 'en_US',
  },
} satisfies Record<'th' | 'en', PageMeta>

export const BLOG_INDEX_META: PageMeta = {
  title: 'บทความมือถือ ธุรกิจร้านมือถือ และเทคโนโลยี | PK HUB',
  description:
    'คู่มือและบทวิเคราะห์สำหรับร้านมือถือจาก PK HUB เรื่องเลือกแหล่งสินค้า จัดสต็อก เอกสาร และการเริ่มขาย',
  canonical: `${SITE_URL}/th/blog`,
  ogType: 'website',
  image: `${SITE_URL}/og-image.jpg`,
  imageAlt: 'บทความมือถือ ธุรกิจร้านมือถือ และเทคโนโลยีจาก PK HUB',
  locale: 'th_TH',
}

export const JOIN_META = {
  th: {
    title: 'สมัครเป็นร้านค้าพาร์ทเนอร์ | PK HUB',
    description: 'สมัครเป็นร้านค้าพาร์ทเนอร์ PK HUB สำหรับเช็กราคาส่ง สต็อก และพูดคุยกับทีมดูแลร้านค้า โดยรอการตรวจสอบก่อนเปิดสิทธิ์ค้าส่ง',
    canonical: `${SITE_URL}/th/join`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    locale: 'th_TH',
  },
  en: {
    title: 'Become a Retail Partner | PK HUB',
    description: 'Apply to become a PK HUB retail partner. Wholesale access is reviewed before activation and our team will contact you with the next step.',
    canonical: `${SITE_URL}/en/join`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    locale: 'en_US',
  },
} satisfies Record<'th' | 'en', PageMeta>

export const DEALER_LOGIN_META = {
  th: {
    title: 'เข้าสู่ระบบตัวแทนจำหน่าย | PK HUB',
    description:
      'เข้าสู่ระบบสำหรับร้านค้าพาร์ทเนอร์ PK HUB การเข้าถึงราคาส่งต้องได้รับการตรวจสอบและอนุมัติก่อนใช้งาน',
    canonical: `${SITE_URL}/th/dealer/login`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    locale: 'th_TH',
  },
  en: {
    title: 'Dealer Login | PK HUB',
    description:
      'Sign in for PK HUB retail partners. Wholesale access requires review and approval before it can be used.',
    canonical: `${SITE_URL}/en/dealer/login`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    locale: 'en_US',
  },
} satisfies Record<'th' | 'en', PageMeta>

export const STOCK_ON_DEMAND_META = {
  th: {
    title: 'Stock on Demand เพิ่มทางเลือกให้ร้านมือถือ | PK HUB',
    description: 'ให้สต็อก PK เป็นส่วนต่อของร้าน เช็กรุ่น สี ความจุ ราคา และรอบส่งกับทีม ก่อนเสนอทางเลือกให้ลูกค้า โดยไม่ต้องสต็อกทุกรุ่น',
    canonical: `${SITE_URL}/th/products/stock-on-demand`,
    ogType: 'website', locale: 'th_TH', robots: 'noindex, follow',
  },
  en: {
    title: 'Stock on Demand | More Options for Your Shop | PK HUB',
    description: 'Extend your shop’s assortment with PK. Confirm models, stock, prices and dispatch with our team before offering customers more options.',
    canonical: `${SITE_URL}/en/products/stock-on-demand`,
    ogType: 'website', locale: 'en_US', robots: 'noindex, follow',
  },
} satisfies Record<'th' | 'en', PageMeta>

export const PARTNER_MARKETING_META = {
  th: {
    title: 'Partner Marketing สื่อการตลาดฟรีสำหรับพาร์ทเนอร์ | PK HUB',
    description:
      'สื่อการตลาดและแคมเปญโปรโมชั่นฟรีสำหรับร้านค้าพาร์ทเนอร์ PK HUB ทุกร้าน ไม่มีขั้นต่ำยอดซื้อ พร้อมตัวอย่างการนำสื่อไปใช้จริง',
    canonical: `${SITE_URL}/th/products/partner-marketing`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    imageAlt: 'สื่อการตลาดฟรีสำหรับพาร์ทเนอร์ PK HUB',
    locale: 'th_TH',
  },
  en: {
    title: 'Free Partner Marketing Media & Campaigns | PK HUB',
    description:
      'Free promotional marketing assets and campaigns for all PK HUB retail partners with zero minimum order. Ready to use for storefronts and social media.',
    canonical: `${SITE_URL}/en/products/partner-marketing`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    imageAlt: 'Free marketing assets for PK HUB retail partners',
    locale: 'en_US',
  },
} satisfies Record<'th' | 'en', PageMeta>


export function getProductMeta(id: ProductId, language: 'th' | 'en'): PageMeta {
  if (id === 'stock-on-demand') return STOCK_ON_DEMAND_META[language]
  if (id === 'partner-marketing') return PARTNER_MARKETING_META[language]
  const service = PRODUCT_SERVICES.find(p => p.id === id)!
  return {
    title: `${language === 'th' ? service.title : service.titleEn} | PK HUB`,
    description: language === 'th' ? service.description : service.descriptionEn,
    canonical: `${SITE_URL}/${language}/products/${id}`,
    ogType: 'website', locale: language === 'th' ? 'th_TH' : 'en_US',
    robots: 'noindex, follow',
  }
}

export function getProductsIndexMeta(language: 'th' | 'en'): PageMeta {
  return {
    title: language === 'th' ? 'สินค้าและบริการสำหรับร้านค้าพาร์ทเนอร์ | PK HUB' : 'Products & Services for Your Shop | PK HUB',
    description: language === 'th' ? 'สำรวจสินค้าและบริการ PK HUB ตั้งแต่มือถือ อุปกรณ์เสริม Stock on Demand ซิม เติมเงิน S Leasing Marketing และการดูแลหลังการขาย' : 'Explore PK HUB smartphones, accessories, Stock on Demand, SIMs, top-up, S Leasing, Marketing and after-sales support.',
    canonical: `${SITE_URL}/${language}/products`,
    ogType: 'website', locale: language === 'th' ? 'th_TH' : 'en_US', robots: 'noindex, follow',
  }
}

export function getBlogIndexMeta(page = 1): PageMeta {
  if (page <= 1) return BLOG_INDEX_META
  return {
    ...BLOG_INDEX_META,
    title: `บทความมือถือ ธุรกิจ และเทคโนโลยี หน้า ${page} | PK HUB`,
    description: `คู่มือและบทวิเคราะห์จาก PK HUB สำหรับร้านมือถือ เรื่องสินค้า สต็อก เอกสาร และการเริ่มขาย หน้าที่ ${page}`,
    canonical: `${SITE_URL}/th/blog/page/${page}`,
  }
}

export function applyPageMeta(meta: PageMeta) {
  const robots = document.querySelector('meta[name="robots"]')
  if (meta.robots) {
    const tag = robots ?? document.createElement('meta')
    tag.setAttribute('name', 'robots')
    tag.setAttribute('content', meta.robots)
    if (!robots) document.head.appendChild(tag)
  } else {
    robots?.remove()
  }
  document.title = meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.canonical)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', meta.canonical)
  document.querySelector('meta[property="og:type"]')?.setAttribute('content', meta.ogType ?? 'website')
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', meta.image ?? `${SITE_URL}/og-image.jpg`)
  document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', meta.imageAlt ?? meta.title)
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', meta.locale ?? 'th_TH')
  document
    .querySelector('meta[property="og:locale:alternate"]')
    ?.setAttribute('content', (meta.locale ?? 'th_TH') === 'en_US' ? 'th_TH' : 'en_US')
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title)
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description)
  document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', meta.image ?? `${SITE_URL}/og-image.jpg`)
  document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute('content', meta.imageAlt ?? meta.title)

  document.querySelector('meta[property="article:published_time"]')?.remove()
  document.querySelector('meta[property="article:modified_time"]')?.remove()
  if (meta.publishedTime) {
    const published = document.createElement('meta')
    published.setAttribute('property', 'article:published_time')
    published.setAttribute('content', meta.publishedTime)
    document.head.appendChild(published)
  }
  if (meta.modifiedTime) {
    const modified = document.createElement('meta')
    modified.setAttribute('property', 'article:modified_time')
    modified.setAttribute('content', meta.modifiedTime)
    document.head.appendChild(modified)
  }
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => applyPageMeta(meta), [meta])
}
