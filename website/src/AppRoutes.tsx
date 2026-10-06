import { Suspense, lazy, type ComponentType } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LanguageProvider } from '@/i18n/LanguageContext'

// SSR receives every page directly from entry-server. These defaults are used
// only for client-side navigation after the initial route has hydrated.
function ServerPagePlaceholder() {
  return null
}

const DeferredHome = import.meta.env.SSR ? ServerPagePlaceholder : lazy(() => import('@/pages/Home'))
const DeferredJoin = import.meta.env.SSR ? ServerPagePlaceholder : lazy(() => import('@/pages/Join'))
const DeferredDealerLogin = import.meta.env.SSR ? ServerPagePlaceholder : lazy(() => import('@/pages/DealerLogin'))
const DeferredBlogIndex = import.meta.env.SSR ? ServerPagePlaceholder : lazy(() => import('@/pages/blog/BlogIndex'))
const DeferredBlogArticle = import.meta.env.SSR ? ServerPagePlaceholder : lazy(() => import('@/pages/blog/BlogArticle'))
const DeferredPartnerMarketing = import.meta.env.SSR ? ServerPagePlaceholder : lazy(() => import('@/pages/products/PartnerMarketingPage'))

export type RoutePages = {
  HomePage?: ComponentType
  JoinPage?: ComponentType
  DealerLoginPage?: ComponentType
  BlogIndexPage?: ComponentType
  BlogArticlePage?: ComponentType
  PartnerMarketingPage?: ComponentType
}

function RouteView({ Page, english = false }: { Page: ComponentType; english?: boolean }) {
  return (
    <Suspense fallback={<main role="status">{english ? 'Loading page…' : 'กำลังเปิดหน้า…'}</main>}>
      <Page />
    </Suspense>
  )
}

export default function AppRoutes({
  HomePage = DeferredHome,
  JoinPage = DeferredJoin,
  DealerLoginPage = DeferredDealerLogin,
  BlogIndexPage = DeferredBlogIndex,
  BlogArticlePage = DeferredBlogArticle,
  PartnerMarketingPage = DeferredPartnerMarketing,
}: RoutePages = {}) {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<RouteView Page={HomePage} />} />
        <Route path="/th" element={<RouteView Page={HomePage} />} />
        <Route path="/en" element={<RouteView Page={HomePage} english />} />
        <Route path="/th/join" element={<RouteView Page={JoinPage} />} />
        <Route path="/en/join" element={<RouteView Page={JoinPage} english />} />
        <Route path="/th/dealer/login" element={<RouteView Page={DealerLoginPage} />} />
        <Route path="/en/dealer/login" element={<RouteView Page={DealerLoginPage} english />} />
        <Route path="/th/products/partner-marketing" element={<RouteView Page={PartnerMarketingPage} />} />
        <Route path="/en/products/partner-marketing" element={<RouteView Page={PartnerMarketingPage} english />} />
        <Route
          path="/th/blog"
          element={<RouteView Page={BlogIndexPage} />}
        />
        <Route
          path="/th/blog/page/:page"
          element={<RouteView Page={BlogIndexPage} />}
        />
        <Route
          path="/th/blog/:slug"
          element={<RouteView Page={BlogArticlePage} />}
        />
        <Route path="*" element={<Navigate to="/th" replace />} />
      </Routes>
    </LanguageProvider>
  )
}
