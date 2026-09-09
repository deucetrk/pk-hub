import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { readReferralCode } from '@/utils/referralAttribution'

export function useReferralAttribution() {
  const location = useLocation()
  const [referralCode, setReferralCode] = useState<string | null>(null)

  useEffect(() => {
    const session = typeof window !== 'undefined' ? window.sessionStorage : undefined
    const local = typeof window !== 'undefined' ? window.localStorage : undefined
    setReferralCode(readReferralCode(location.search, session, local))
  }, [location.search])

  return referralCode
}

