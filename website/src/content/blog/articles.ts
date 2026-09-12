import { documentsTaxInvoiceArticle } from './published/documentsTaxInvoice'
import { firstWholesaleOrderArticle } from './published/firstWholesaleOrder'
import { inventoryCashflowArticle } from './published/inventoryCashflow'
import { openMobileShopArticle } from './published/openMobileShop'
import { supplierChecklistArticle } from './published/supplierChecklist'
import { thaiMarketPhoneArticle } from './published/thaiMarketPhone'

export type BlogArticleSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  visual?: {
    src: string
    alt: string
    caption: string
    width: number
    height: number
  }
  pricingExamples?: {
    heading: string
    asOf: string
    examples: Array<{
      name: string
      purpose: string
      rows: Array<{ model: string; role: string; wholesalePrice: number }>
      total: number
    }>
    retailComparison?: {
      heading: string
      description: string
      rows: Array<{
        model: string
        wholesalePrice: number
        referenceRetailPrice: number
        sourceLabel: string
        sourceUrl: string
      }>
      note: string
    }
    note: string
  }
}

export type BlogSource = {
  title: string
  publisher: string
  url: string
  accessedAt: string
}

export type PublishedBlogArticle = {
  status: 'published'
  title: string
  slug: string
  seoTitle: string
  metaDescription: string
  summary: string
  primaryKeyword: string
  category: string
  contentTrack: 'retailer' | 'consumer'
  tags: string[]
  publishedAt: string
  modifiedAt: string
  estimatedReadMinutes: number
  recommendedImage: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  imageCaption?: string
  introduction: string[]
  pullQuote?: string
  quickReference?: {
    heading: string
    description?: string
    labelHeading?: string
    detailHeading?: string
    rows: Array<{ label: string; detail: string }>
  }
  sections: BlogArticleSection[]
  conclusion: string[]
  conclusionHeading?: string
  disclaimer?: string
  ctaHeading?: string
  ctaDescription?: string
  ctaLabel: string
  ctaHref: string
  internalLinks: Array<{ label: string; href: string }>
  sources: BlogSource[]
}

// Publication boundary: only explicitly approved articles may be imported here.
// Draft approval packs live outside src/ so Vite cannot bundle or expose them.
export const publishedArticles: PublishedBlogArticle[] = [
  supplierChecklistArticle,
  openMobileShopArticle,
  thaiMarketPhoneArticle,
  inventoryCashflowArticle,
  documentsTaxInvoiceArticle,
  firstWholesaleOrderArticle,
]

export const BLOG_PAGE_SIZE = 9

export const blogTrackLabels = {
  retailer: 'ธุรกิจร้านมือถือ',
  consumer: 'มือถือและเทคโนโลยี',
} satisfies Record<PublishedBlogArticle['contentTrack'], string>

export function getPublishedBlogPageCount() {
  return Math.max(1, Math.ceil(publishedArticles.length / BLOG_PAGE_SIZE))
}

export function getPublishedArticle(slug: string) {
  return publishedArticles.find((article) => article.slug === slug)
}

export function getPublishedBlogPaths() {
  if (publishedArticles.length === 0) return []
  const pagePaths = Array.from(
    { length: Math.max(0, getPublishedBlogPageCount() - 1) },
    (_, index) => `/th/blog/page/${index + 2}`,
  )
  return [
    '/th/blog',
    ...pagePaths,
    ...publishedArticles.map((article) => `/th/blog/${article.slug}`),
  ]
}
