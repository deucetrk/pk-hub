import { useEffect } from 'react'

/** Lists whose children arrive one after another instead of fading as one block. */
const STAGGER = '.v1-steps, .v1-faults, .v1-related, .v1-grid-3, .v1-devices-row, .v1-stats, .v1-faq-list'

/**
 * Fades `.v1-reveal` blocks (and staggers the children of STAGGER lists) in as they enter the
 * viewport: opacity plus a 16px rise over ~420ms. Runs only after hydration and only for content
 * still below the fold, so prerendered content stays visible without JavaScript; reduced motion
 * skips it entirely.
 */
export function useReveal(dependency?: unknown) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fold = window.innerHeight * 0.92
    const targets: Array<[HTMLElement, 'reveal' | 'stagger']> = [
      ...Array.from(document.querySelectorAll<HTMLElement>('.v1-reveal:not([data-reveal])')).map((el) => [el, 'reveal'] as [HTMLElement, 'reveal']),
      ...Array.from(document.querySelectorAll<HTMLElement>(STAGGER)).filter((el) => !el.dataset.stagger).map((el) => [el, 'stagger'] as [HTMLElement, 'stagger']),
    ]
    const pending = targets.filter(([el]) => el.getBoundingClientRect().top > fold)
    targets.forEach(([el, kind]) => {
      if (!pending.some(([other]) => other === el)) el.dataset[kind] = 'in'
    })
    if (!pending.length) return
    pending.forEach(([el, kind]) => (el.dataset[kind] = 'pending'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          if (el.dataset.reveal === 'pending') el.dataset.reveal = 'in'
          if (el.dataset.stagger === 'pending') el.dataset.stagger = 'in'
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    pending.forEach(([el]) => observer.observe(el))
    return () => {
      observer.disconnect()
      pending.forEach(([el, kind]) => {
        if (el.dataset[kind] === 'pending') el.dataset[kind] = 'in'
      })
    }
  }, [dependency])
}
