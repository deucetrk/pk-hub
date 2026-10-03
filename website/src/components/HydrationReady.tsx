import { useEffect } from 'react'

export default function HydrationReady({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady])
  return null
}
