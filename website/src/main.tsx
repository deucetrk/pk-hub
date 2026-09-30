import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import App from './App'
import type { RoutePages } from './AppRoutes'
import './index.css'

async function mount() {
  const path = window.location.pathname
  const pages: RoutePages = {}

  // Preload the matched journal route before hydration. The prerendered HTML
  // stays visible while its module downloads, so React hydrates matching markup.
  if (path === '/' || path === '/th' || path === '/en') {
    pages.HomePage = (await import('@/pages/Home')).default
  } else if (path === '/th/join' || path === '/en/join') {
    pages.JoinPage = (await import('@/pages/Join')).default
  } else if (path === '/th/dealer/login' || path === '/en/dealer/login') {
    pages.DealerLoginPage = (await import('@/pages/DealerLogin')).default
  } else if (/^\/th\/blog(?:\/page\/[^/]+)?\/?$/.test(path)) {
    pages.BlogIndexPage = (await import('@/pages/blog/BlogIndex')).default
  } else if (path.startsWith('/th/blog/')) {
    pages.BlogArticlePage = (await import('@/pages/blog/BlogArticle')).default
  }

  const container = document.getElementById('root')!
  const app = (
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        <App {...pages} />
      </LazyMotion>
    </StrictMode>
  )

  if (container.hasChildNodes()) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
  }
}

void mount().catch(() => {
  // The prerendered page is still readable if its route chunk fails to load,
  // but its controls cannot hydrate. Give a native reload path in that case.
  const notice = document.createElement('div')
  notice.className = 'pk-load-error'
  notice.setAttribute('role', 'alert')

  const message = document.createElement('span')
  const reload = document.createElement('a')
  reload.href = window.location.href
  if (window.location.pathname.startsWith('/en')) {
    message.textContent = 'Page controls could not load.'
    reload.textContent = 'Reload page'
  } else {
    message.textContent = 'โหลดการทำงานของหน้าไม่สำเร็จ'
    reload.textContent = 'โหลดหน้าอีกครั้ง'
  }

  notice.append(message, reload)
  document.body.prepend(notice)
})
