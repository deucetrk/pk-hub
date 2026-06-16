import type { PartnerLeadSubmission } from '@/utils/partnerLead'

const ENDPOINT = import.meta.env.VITE_PARTNER_LEAD_ENDPOINT?.trim()
const REQUEST_TIMEOUT_MS = 12_000

export async function submitPartnerLead(payload: PartnerLeadSubmission) {
  if (!ENDPOINT) {
    throw new Error('Partner lead endpoint is not configured')
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams({
        shopName: payload.shopName.trim(),
        province: payload.province.trim(),
        contactName: payload.contactName.trim(),
        phone: payload.phone.trim(),
        lineId: payload.lineId.trim(),
        email: payload.email.trim(),
        interestedBrands: payload.interestedBrands.join(', '),
        note: payload.note.trim(),
        consent: String(payload.consent),
        language: payload.language,
        sourcePage: payload.sourcePage,
        requestId: payload.requestId,
        website: payload.website,
      }),
      signal: controller.signal,
    })
  } finally {
    window.clearTimeout(timeout)
  }
}
