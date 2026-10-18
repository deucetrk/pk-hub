import { useEffect } from 'react'

/**
 * Fades `.v1-reveal` blocks in as they enter the viewport. Runs only after hydration and only for
 * blocks still below the fold, so prerendered content stays visible without JavaScript.
 */
export function useReveal(dependency?: unknown) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const blocks = Array.from(document.querySelectorAll<HTMLElement>('.v1-reveal:not([data-reveal])'))
    const fold = window.innerHeight * 0.92
    const pending = blocks.filter((block) => block.getBoundingClientRect().top > fold)
    blocks.forEach((block) => {
      if (!pending.includes(block)) block.dataset.reveal = 'in'
    })
    if (!pending.length) return
    pending.forEach((block) => (block.dataset.reveal = 'pending'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const block = entry.target as HTMLElement
          block.dataset.reveal = 'in'
          observer.unobserve(block)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    pending.forEach((block) => observer.observe(block))
    return () => {
      observer.disconnect()
      pending.forEach((block) => {
        if (block.dataset.reveal === 'pending') block.dataset.reveal = 'in'
      })
    }
  }, [dependency])
}
