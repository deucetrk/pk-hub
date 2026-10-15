import { buildDealerPortalUrl } from '@/utils/referralAttribution'

/** Existing partners go directly to the transactional portal, retaining referral attribution. */
export function dealerLoginUrl(referralCode: string | null) {
  return buildDealerPortalUrl(import.meta.env.VITE_DEALER_PORTAL_BASE_URL ?? 'https://dealer.pkhub.co', referralCode, '/login')
}
