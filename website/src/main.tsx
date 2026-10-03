import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import App from './App'
import type { RoutePages } from './AppRoutes'
import NotFound from '@/pages/NotFound'
import HydrationReady from '@/components/HydrationReady'
import './index.css'

const container = document.getElementById('root')!
container.setAttribute('aria-busy', 'true')
const waitingForms = Array.from(container.querySelectorAll('form')).filter(
  (form) => !form.hasAttribute('inert'),
)
waitingForms.forEach((form) => form.setAttribute('inert', ''))
// A prerendered form must not fall back to native GET submission before React
// owns it. Keep reading/navigation available while its page module downloads.
const holdSubmission = (event: Event) => {
  event.preventDefault()
  event.stopImmediatePropagation()
}
document.addEventListener('submit', holdSubmission, true)
let loadingNotice: HTMLDivElement | undefined
const english = window.location.pathname.startsWith('/en')
const noticeTimer = window.setTimeout(() => {
  loadingNotice = document.createElement('div')
  loadingNotice.className = 'pk-load-error'
  loadingNotice.setAttribute('role', 'status')
  loadingNotice.textContent = english ? 'Loading page controls…' : 'กำลังเปิดการทำงานของหน้า…'
  document.body.prepend(loadingNotice)
}, 500)

function finishBootstrap() {
  window.clearTimeout(noticeTimer)
  loadingNotice?.remove()
  container.removeAttribute('aria-busy')
  document.removeEventListener('submit', holdSubmission, true)
}

async function mount() {
  const path = window.location.pathname
  const pages: RoutePages = {}

  // Preload the matched journal route before hydration. The prerendered HTML
  // stays visible while its module downloads, so React hydrates matching markup.
  if (container.hasAttribute('data-pk-not-found')) {
    // The static 404 is bilingual and independent of the requested URL.
    // Hydrate that exact document, rather than a mismatching route fallback.
  } else if (path === '/' || path === '/th' || path === '/en') {
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

  const app = (
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        {container.hasAttribute('data-pk-not-found') ? <NotFound /> : <App {...pages} />}
        <HydrationReady onReady={finishBootstrap} />
      </LazyMotion>
    </StrictMode>
  )

  // Remove our temporary DOM attribute before React compares the server markup.
  // The capturing submit guard remains until the first committed effect.
  waitingForms.forEach((form) => form.removeAttribute('inert'))
  if (container.hasChildNodes()) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
  }
}

void mount().catch(() => {
  // The prerendered page is still readable if its route chunk fails to load,
  // but its controls cannot hydrate. Give a native reload path in that case.
  window.clearTimeout(noticeTimer)
  loadingNotice?.remove()
  container.removeAttribute('aria-busy')
  container
    .querySelectorAll<
      HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >('button, input, select, textarea')
    .forEach((control) => {
      control.disabled = true
    })
  const notice = document.createElement('div')
  notice.className = 'pk-load-error'
  notice.setAttribute('role', 'alert')
  notice.tabIndex = -1

  const message = document.createElement('span')
  const reload = document.createElement('a')
  reload.href = window.location.href
  reload.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.location.reload()
  })
  if (window.location.pathname.startsWith('/en')) {
    message.textContent = 'Page controls could not load.'
    reload.textContent = 'Reload page'
  } else {
    message.textContent = 'โหลดการทำงานของหน้าไม่สำเร็จ'
    reload.textContent = 'โหลดหน้าอีกครั้ง'
  }

  notice.append(message, reload)
  document.body.prepend(notice)
  notice.focus({ preventScroll: true })
})
