import { useReducedMotion, type Variants } from 'framer-motion'

const visible = { opacity: 1, y: 0 }

export function useRevealMotion() {
  const reduceMotion = useReducedMotion()

  const container: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }

  const item: Variants = reduceMotion
    ? { hidden: visible, show: visible }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { ...visible, transition: { duration: 0.42, ease: 'easeOut' } },
      }

  return { container, item, reduceMotion }
}

export const revealViewport = { once: true, margin: '-80px' }
