import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import AppRoutes from '@/AppRoutes'
import Home from '@/pages/Home'
import Join from '@/pages/Join'
import Contact from '@/pages/Contact'
import Privacy from '@/pages/Privacy'
import DealerLogin from '@/pages/DealerLogin'
import BlogArticle from '@/pages/blog/BlogArticle'
import BlogIndex from '@/pages/blog/BlogIndex'
import ServiceProductPage from '@/pages/products/ServiceProductPage'
import ProductsIndexPage from '@/pages/products/ProductsIndexPage'
import { PRODUCT_SERVICES, SERVICE_PRODUCT_IDS, type ProductId } from '@/content/productServices'
import StockOnDemandPage from '@/pages/products/StockOnDemandPage'
import PartnerMarketingPage from '@/pages/products/PartnerMarketingPage'
export { getHomeFaqSchema } from '@/content/homeFaqs'
import { getPublishedArticle, getPublishedBlogPaths, publishedArticles } from '@/content/blog/articles'
import {
  BLOG_INDEX_META,
  CONTACT_META,
  DEALER_LOGIN_META,
  getBlogIndexMeta,
  getProductMeta,
  getProductsIndexMeta,
  HOME_META,
  JOIN_META,
  PARTNER_MARKETING_META,
  PRIVACY_META,
  STOCK_ON_DEMAND_META,
  SITE_URL,
  type PageMeta,
} from '@/lib/seo'

export function render(url: string) {
  return renderToString(
    <StrictMode>
        <StaticRouter location={url}>
          <AppRoutes
            HomePage={Home}
            JoinPage={Join}
            ContactPage={Contact}
            PrivacyPage={Privacy}
            DealerLoginPage={DealerLogin}
            BlogArticlePage={BlogArticle}
            BlogIndexPage={BlogIndex}
            PartnerMarketingPage={PartnerMarketingPage}
            StockOnDemandPage={StockOnDemandPage}
            ServiceProductPage={ServiceProductPage}
            ProductsIndexPage={ProductsIndexPage}
          />
        </StaticRouter>
    </StrictMode>,
  )
}

export function getPrerenderRoutes() {
  return [
    '/th',
    '/en',
    '/th/join',
    '/en/join',
    '/th/contact',
    '/en/contact',
    '/th/privacy',
    '/en/privacy',
    '/th/dealer/login',
    '/en/dealer/login',
    '/th/products/stock-on-demand',
    '/en/products/stock-on-demand',
    '/th/products/partner-marketing',
    '/en/products/partner-marketing',
    '/th/products',
    '/en/products',
    ...SERVICE_PRODUCT_IDS.flatMap(id => [`/th/products/${id}`, `/en/products/${id}`]),
    ...getPublishedBlogPaths(),
  ]
}

export function getPageMeta(url: string): PageMeta {
  if (url === '/en') return HOME_META.en
  if (url === '/th/join') return JOIN_META.th
  if (url === '/en/join') return JOIN_META.en
  if (url === '/th/contact') return CONTACT_META.th
  if (url === '/en/contact') return CONTACT_META.en
  if (url === '/th/privacy') return PRIVACY_META.th
  if (url === '/en/privacy') return PRIVACY_META.en
  if (url === '/th/dealer/login') return DEALER_LOGIN_META.th
  if (url === '/en/dealer/login') return DEALER_LOGIN_META.en
  if (url === '/th/products/stock-on-demand') return STOCK_ON_DEMAND_META.th
  if (url === '/en/products/stock-on-demand') return STOCK_ON_DEMAND_META.en
  if (url === '/th/products/partner-marketing') return PARTNER_MARKETING_META.th
  if (url === '/en/products/partner-marketing') return PARTNER_MARKETING_META.en
  if (/^\/(th|en)\/products$/.test(url)) return getProductsIndexMeta(url.startsWith('/en') ? 'en' : 'th')
  const productId = url.split('/').pop() as ProductId
  if (/^\/(th|en)\/products\//.test(url) && PRODUCT_SERVICES.some(p => p.id === productId)) return getProductMeta(productId, url.startsWith('/en') ? 'en' : 'th')
  if (url === '/th/blog') return BLOG_INDEX_META
  if (url.startsWith('/th/blog/page/')) {
    return getBlogIndexMeta(Number(url.split('/').pop() ?? 1))
  }
  if (url.startsWith('/th/blog/')) {
    const article = getPublishedArticle(url.split('/').pop() ?? '')
    if (article) {
      return {
        title: article.seoTitle,
        description: article.metaDescription,
        canonical: `${SITE_URL}${url}`,
        ogType: 'article',
        image: `${SITE_URL}${article.recommendedImage}`,
        imageAlt: article.imageAlt,
        locale: 'th_TH',
        publishedTime: `${article.publishedAt}T00:00:00+07:00`,
        modifiedTime: `${article.modifiedAt}T00:00:00+07:00`,
      }
    }
  }
  return HOME_META.th
}

export function getRouteLastModified(url: string) {
  if (url === '/th/blog') {
    return publishedArticles.map((article) => article.modifiedAt).sort().at(-1)
  }
  if (!url.startsWith('/th/blog/')) return undefined
  return getPublishedArticle(url.split('/').pop() ?? '')?.modifiedAt
}
