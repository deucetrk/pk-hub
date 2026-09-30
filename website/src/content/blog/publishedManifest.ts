// The public navigation only needs to know whether a published journal exists.
// Keep its approved routes here so the homepage does not import full article bodies.
export const publishedBlogSlugs = [
  'checklist-choose-mobile-phone-wholesaler',
  'how-to-start-mobile-phone-shop',
  'what-is-thai-market-official-phone',
  'mobile-shop-inventory-cashflow-guide',
  'mobile-phone-reseller-documents-tax-invoice',
  'first-wholesale-mobile-phone-order',
] as const

export type PublishedBlogSlug = (typeof publishedBlogSlugs)[number]
