import { useEffect, useRef } from 'react'

type CountUpProps = { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number }

const format = (value: number, decimals: number) =>
  value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/**
 * Counts an owner-confirmed figure up from zero the first time it scrolls into view. The final
 * value is rendered on the server and reserves its width (an invisible copy shares the grid cell),
 * so counting never shifts layout; reduced motion keeps the final value.
 */
export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1200 }: CountUpProps) {
  const live = useRef<HTMLSpanElement>(null)
  const final = `${prefix}${format(to, decimals)}${suffix}`

  useEffect(() => {
    const node = live.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return
    let frame = 0
    node.textContent = `${prefix}${format(0, decimals)}${suffix}`
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          node.textContent = `${prefix}${format(to * eased, decimals)}${suffix}`
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      node.textContent = final
    }
  }, [decimals, duration, final, prefix, suffix, to])

  return (
    <span className="inline-grid tabular-nums">
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {final}
      </span>
      <span ref={live} className="col-start-1 row-start-1">
        {final}
      </span>
    </span>
  )
}
