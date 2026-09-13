import { useEffect } from 'react'

export const SITE_URL = 'https://pkhub.co'

export type PageMeta = {
  title: string
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
    title: 'ค้าส่งมือถือฉะเชิงเทรา สำหรับร้านค้า | PK HUB',
    description:
      'PK HUB พาร์ทเนอร์ค้าส่งมือถือในฉะเชิงเทราและภาคตะวันออก หลายแบรนด์ พร้อม Dealer Portal สำหรับร้านที่ได้รับอนุมัติ เช็กราคา สต็อกอ้างอิง และคุยกับทีมโดยตรง',
    canonical: `${SITE_URL}/th`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    imageAlt: 'หน้าร้านและทีมค้าส่งมือถือ PK HUB ในฉะเชิงเทรา',
    locale: 'th_TH',
  },
  en: {
    title: 'PK HUB | Chachoengsao Smartphone Wholesale Partner',
    description:
      'Multi-brand phone wholesale in Chachoengsao and eastern Thailand. Approved retailers can check pricing, reference stock, and orders in the PK HUB Dealer Portal.',
    canonical: `${SITE_URL}/en`,
    ogType: 'website',
    image: `${SITE_URL}/og-image.jpg`,
    imageAlt: 'PK HUB smartphone wholesale storefront in Chachoengsao',
    locale: 'en_US',
  },
} satisfies Record<'th' | 'en', PageMeta>

export const BLOG_INDEX_META: PageMeta = {
  title: 'บทความมือถือ ธุรกิจร้านมือถือ และเทคโนโลยี | PK HUB',
  description:
    'ข่าว อัปเดต บทวิเคราะห์และบทความจาก PK HUB ครอบคลุมมือถือ เทคโนโลยี ราคา สต็อก เอกสาร และธุรกิจร้านมือถือ',
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


export function getBlogIndexMeta(page = 1): PageMeta {
  if (page <= 1) return BLOG_INDEX_META
  return {
    ...BLOG_INDEX_META,
    title: `บทความมือถือ ธุรกิจ และเทคโนโลยี หน้า ${page} | PK HUB`,
    description: `ข่าว อัปเดต บทวิเคราะห์และบทความจาก PK HUB สำหรับร้านมือถือและคนสนใจเทคโนโลยี หน้าที่ ${page}`,
    canonical: `${SITE_URL}/th/blog/page/${page}`,
  }
}

export function applyPageMeta(meta: PageMeta) {
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
