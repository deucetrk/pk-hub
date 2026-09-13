import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'

import AppRoutes from '@/AppRoutes'
export { getHomeFaqSchema } from '@/content/homeFaqs'
import { getPublishedArticle, getPublishedBlogPaths } from '@/content/blog/articles'
import { BLOG_INDEX_META, DEALER_LOGIN_META, getBlogIndexMeta, HOME_META, JOIN_META, SITE_URL, type PageMeta } from '@/lib/seo'

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </LazyMotion>
    </StrictMode>,
  )
}

export function getPrerenderRoutes() {
  return ['/th', '/en', '/th/join', '/en/join', '/th/dealer/login', '/en/dealer/login', ...getPublishedBlogPaths()]
}

export function getPageMeta(url: string): PageMeta {
  if (url === '/en') return HOME_META.en
  if (url === '/th/join') return JOIN_META.th
  if (url === '/en/join') return JOIN_META.en
  if (url === '/th/dealer/login') return DEALER_LOGIN_META.th
  if (url === '/en/dealer/login') return DEALER_LOGIN_META.en
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
  if (!url.startsWith('/th/blog/')) return undefined
  return getPublishedArticle(url.split('/').pop() ?? '')?.modifiedAt
}
