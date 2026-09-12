const REFERRAL_STORAGE_KEY = 'pkhub.referral-code'

export function normalizeReferralCode(value: string | null | undefined) {
  const normalized = value?.trim() ?? ''
  return /^[A-Za-z0-9][A-Za-z0-9_-]{2,63}$/.test(normalized) ? normalized : null
}

function readStored(storage: Storage | undefined) {
  try {
    return normalizeReferralCode(storage?.getItem(REFERRAL_STORAGE_KEY))
  } catch {
    return null
  }
}

export function readReferralCode(search: string, session?: Storage, local?: Storage) {
  const fromUrl = normalizeReferralCode(new URLSearchParams(search).get('ref'))
  const fromSession = readStored(session)
  const fromLocal = readStored(local)

  // First valid source wins: URL > session > local; write back to both stores.
  const referralCode = fromUrl ?? fromSession ?? fromLocal
  if (referralCode) {
    try {
      session?.setItem(REFERRAL_STORAGE_KEY, referralCode)
    } catch {
      // ignore storage write failure
    }
    try {
      local?.setItem(REFERRAL_STORAGE_KEY, referralCode)
    } catch {
      // ignore storage write failure
    }
  }

  return referralCode
}

export function withReferral(href: string, referralCode: string | null) {
  if (!referralCode || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href
  }

  const [pathAndSearch, hash = ''] = href.split('#', 2)
  const separator = pathAndSearch.includes('?') ? '&' : '?'
  return `${pathAndSearch}${separator}ref=${encodeURIComponent(referralCode)}${hash ? `#${hash}` : ''}`
}

export function buildDealerPortalUrl(
  baseUrl: string,
  referralCode: string | null,
  redirectPath = '/login',
) {
  const separator = baseUrl.includes('?') ? '&' : '?'
  const normalized = baseUrl.replace(/\/$/, '')
  const url = `${normalized}${redirectPath}`
  if (!referralCode) return url
  return `${url}${separator}ref=${encodeURIComponent(referralCode)}`
}
