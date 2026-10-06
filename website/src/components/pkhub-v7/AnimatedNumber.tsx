import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  from: number
  to: number
  durationMs?: number
  className?: string
  dataNumber?: string
  triggerKey?: string | number
}

export default function AnimatedNumber({
  from,
  to,
  durationMs = 2000,
  className,
  dataNumber,
  triggerKey,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState<number>(to)
  const elementRef = useRef<HTMLElement>(null)
  const frameRef = useRef<number>(0)
  const isVisibleRef = useRef<boolean>(false)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const startAnimation = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      }

      if (prefersReducedMotion) {
        setDisplayValue(to)
        return
      }

      setDisplayValue(from)
      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / durationMs)
        // ease-out cubic
        const ease = 1 - Math.pow(1 - t, 3)
        const current = Math.round(from + (to - from) * ease)
        setDisplayValue(current)

        if (t < 1) {
          frameRef.current = requestAnimationFrame(tick)
        } else {
          setDisplayValue(to)
          frameRef.current = 0
        }
      }

      frameRef.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    if (isVisibleRef.current) {
      startAnimation()
    }

    return () => {
      observer.disconnect()
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [from, to, durationMs, triggerKey])

  return (
    <strong
      ref={elementRef}
      data-number={dataNumber}
      className={className}
      aria-hidden="true"
    >
      {displayValue.toLocaleString('en-US')}
    </strong>
  )
}
