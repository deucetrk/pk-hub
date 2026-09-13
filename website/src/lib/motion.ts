import { useReducedMotion, type Variants } from 'framer-motion'

const visible = { opacity: 1, y: 0 }

export function useRevealMotion() {
  const reduceMotion = useReducedMotion()

  const container: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }

  const item: Variants = reduceMotion
    ? { hidden: visible, show: visible }
    : {
        // Content is readable before hydration and without JavaScript.
        hidden: visible,
        show: { opacity: [0.4, 1], y: [18, 0], transition: { duration: 0.55, ease: 'easeOut' } },
      }

  return { container, item, reduceMotion }
}

export const revealViewport = { once: true, margin: '-80px' }
