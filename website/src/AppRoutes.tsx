import { lazy, type ComponentType } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { LanguageProvider } from '@/i18n/LanguageContext'
import { RouteErrorBoundary } from '@/components/RouteFeedback'
import NotFound from '@/pages/NotFound'

// SSR receives every page directly from entry-server. These defaults are used
// only for client-side navigation after the initial route has hydrated.
function ServerPagePlaceholder() {
  return null
}

const DeferredHome = import.meta.env.SSR
  ? ServerPagePlaceholder
  : lazy(() => import('@/pages/Home'))
const DeferredJoin = import.meta.env.SSR
  ? ServerPagePlaceholder
  : lazy(() => import('@/pages/Join'))
const DeferredDealerLogin = import.meta.env.SSR
  ? ServerPagePlaceholder
  : lazy(() => import('@/pages/DealerLogin'))
const DeferredBlogIndex = import.meta.env.SSR
  ? ServerPagePlaceholder
  : lazy(() => import('@/pages/blog/BlogIndex'))
const DeferredBlogArticle = import.meta.env.SSR
  ? ServerPagePlaceholder
  : lazy(() => import('@/pages/blog/BlogArticle'))

export type RoutePages = {
  HomePage?: ComponentType
  JoinPage?: ComponentType
  DealerLoginPage?: ComponentType
  BlogIndexPage?: ComponentType
  BlogArticlePage?: ComponentType
}

function RouteView({ Page, english = false }: { Page: ComponentType; english?: boolean }) {
  const location = useLocation()
  const reloadHref = location.pathname + location.search + location.hash
  return (
    <RouteErrorBoundary Page={Page} english={english} reloadHref={reloadHref}>
      <Page />
    </RouteErrorBoundary>
  )
}

export default function AppRoutes({
  HomePage = DeferredHome,
  JoinPage = DeferredJoin,
  DealerLoginPage = DeferredDealerLogin,
  BlogIndexPage = DeferredBlogIndex,
  BlogArticlePage = DeferredBlogArticle,
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
        <Route path="/th/blog" element={<RouteView Page={BlogIndexPage} />} />
        <Route path="/th/blog/page/:page" element={<RouteView Page={BlogIndexPage} />} />
        <Route path="/th/blog/:slug" element={<RouteView Page={BlogArticlePage} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  )
}
