import { CONTACT } from '@/pages/home/constants'

/**
 * Cookie-free visitor counting with Vercel Web Analytics (audit 2026-11-10, item 5).
 * No package: the ~1 KB script is served by Vercel at /_vercel/insights/script.js once Web
 * Analytics is enabled for the project. It loads only on the live domain, after the page has
 * loaded and the browser is idle, so it never delays first paint (PERF-001). It records page
 * views without cookies or personal data. Custom events need the Vercel Pro plan; on Hobby they
 * are dropped silently.
 */
type VercelAnalytics = (command: 'event', payload: { name: string; data?: Record<string, string> }) => void

declare global {
  interface Window {
    va?: VercelAnalytics
    vaq?: unknown[]
  }
}

const LIVE_HOSTS = new Set(['pkhub.co', 'www.pkhub.co'])

export function track(name: string, data?: Record<string, string>): void {
  window.va?.('event', data ? { name, data } : { name })
}

/** Names a click on a contact link, or null for any other click. */
export function contactClickName(href: string | null): string | null {
  if (!href) return null
  if (href === CONTACT.LINE_URL) return 'line_click'
  if (href.startsWith('tel:')) return 'call_click'
  return null
}

export function startAnalytics(): void {
  if (!LIVE_HOSTS.has(window.location.hostname)) return
  window.va ??= (...args) => {
    ;(window.vaq ??= []).push(args)
  }
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a')
      const name = contactClickName(link?.getAttribute('href') ?? null)
      if (name) track(name, { page: window.location.pathname })
    },
    { capture: true, passive: true },
  )
  const load = () => {
    const script = document.createElement('script')
    script.src = '/_vercel/insights/script.js'
    script.defer = true
    document.head.appendChild(script)
  }
  const idle = () => {
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(load, { timeout: 4000 })
    else setTimeout(load, 2000)
  }
  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
}
