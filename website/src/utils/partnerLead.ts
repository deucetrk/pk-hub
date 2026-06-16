export type PartnerLead = {
  shopName: string
  province: string
  contactName: string
  phone: string
  lineId: string
  email: string
  interestedBrands: string[]
  note: string
  consent: boolean
}

export type PartnerLeadSubmission = PartnerLead & {
  language: 'th' | 'en'
  sourcePage: string
  requestId: string
  website: string
}

export type PartnerLeadErrors = Partial<Record<keyof PartnerLead, string>>

function normalizePhone(value: string) {
  return value.replace(/\s+/g, '').replace(/-/g, '')
}

function isValidThaiPhone(value: string) {
  const v = normalizePhone(value)
  if (!/^0\d{8,9}$/.test(v)) return false
  return true
}

export function validatePartnerLead(values: PartnerLead, language: 'th' | 'en' = 'th'): PartnerLeadErrors {
  const errors: PartnerLeadErrors = {}
  const message = (th: string, en: string) => (language === 'th' ? th : en)

  if (!values.shopName.trim()) errors.shopName = message('กรุณากรอกชื่อร้านค้า', 'Please enter your store name')
  if (!values.province.trim()) errors.province = message('กรุณากรอกจังหวัด', 'Please enter your province')
  if (!values.contactName.trim()) errors.contactName = message('กรุณากรอกชื่อผู้ติดต่อ', 'Please enter a contact name')

  if (!values.phone.trim()) {
    errors.phone = message('กรุณากรอกเบอร์โทร', 'Please enter a phone number')
  } else if (!isValidThaiPhone(values.phone)) {
    errors.phone = message('รูปแบบเบอร์โทรไม่ถูกต้อง', 'Please enter a valid Thai phone number')
  }

  if (values.email.trim()) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    if (!emailOk) errors.email = message('รูปแบบอีเมลไม่ถูกต้อง', 'Please enter a valid email address')
  }

  if (!values.interestedBrands.length) {
    errors.interestedBrands = message('กรุณาเลือกอย่างน้อย 1 แบรนด์', 'Please select at least one brand')
  }

  if (!values.consent) {
    errors.consent = message('กรุณายืนยันความยินยอมก่อนส่งข้อมูล', 'Please confirm consent before submitting')
  }

  return errors
}

export function hasErrors(errors: PartnerLeadErrors) {
  return Object.keys(errors).length > 0
}
