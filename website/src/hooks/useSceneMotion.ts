import { useEffect, useRef, useState } from 'react'
import { useInView, useScroll, useTransform } from 'framer-motion'
import { useRevealMotion } from '@/lib/motion'

// Motion is presentation only: it never rotates copy, submits a request or claims live status.
export function useSceneMotion<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { amount: 0.12 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [8, -8])
  const { reduceMotion } = useRevealMotion()
  const [phase, setPhase] = useState(-1)
  const [replay, setReplay] = useState(0)
  const [engaged, setEngaged] = useState(false)
  const [documentVisible, setDocumentVisible] = useState(true)
  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden)
    update(); document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  const running = inView && documentVisible && !reduceMotion && !engaged
  useEffect(() => {
    if (!running) { setPhase(-1); return }
    // Two calm finite demonstrations; user interactions take over immediately.
    const times = [100, 1000, 2000, 3300, 4900, 5800, 6800, 8100]
    const stages = [0, 1, 2, -1, 0, 1, 2, -1]
    const timers = times.map((time, i) => window.setTimeout(() => setPhase(stages[i]), time))
    return () => timers.forEach(window.clearTimeout)
  }, [running, replay])
  return { ref, phase, running, reduceMotion, drift, replay: () => { setEngaged(false); setReplay(n => n + 1) }, engage: () => setEngaged(true) }
}
