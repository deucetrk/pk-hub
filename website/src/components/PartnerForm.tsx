import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

import { CONTACT, route, t } from '@/components/v1/site'
import { PROVINCES } from '@/content/provinces'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { PartnerLeadSubmissionError, submitPartnerLead, type PartnerLeadReceipt } from '@/services/partnerLeadSubmission'
import { captureAcquisitionContext } from '@/utils/acquisitionContext'
import { generateRequestId, normalizePhone, validatePartnerLead, type PartnerLead, type PartnerLeadErrors } from '@/utils/partnerLead'
import { normalizeReferralCode } from '@/utils/referralAttribution'

const BRAND_OPTIONS = ['Apple', 'Samsung', 'OPPO', 'vivo', 'Xiaomi', 'HONOR', 'HUAWEI', 'realme', 'NOTHING', 'TECNO']
const NOTE_LIMIT = 1500

const EMPTY_LEAD: PartnerLead = {
  shopName: '',
  province: '',
  contactName: '',
  phone: '',
  lineId: '',
  email: '',
  socialContact: '',
  address: '',
  taxId: '',
  interestedBrands: [],
  note: '',
  consent: false,
}

type FieldKey = keyof PartnerLead | 'referral'
type Failure = 'retry' | 'rate-limited' | 'unavailable'

const FIELD_ORDER: FieldKey[] = ['shopName', 'province', 'contactName', 'phone', 'email', 'referral', 'consent']

function maskPhone(phone: string) {
  const digits = normalizePhone(phone)
  return digits.length >= 9 ? `${digits.slice(0, 3)}-XXX-${digits.slice(-4)}` : digits
}

function shortReference(requestId: string) {
  const hex = requestId.replace(/-/g, '').slice(0, 8).toUpperCase()
  return `${hex.slice(0, 4)}-${hex.slice(4)}`
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="v1-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="v1-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function Success({ receipt, phone, onReset }: { receipt: PartnerLeadReceipt; phone: string; onReset: () => void }) {
  const { language } = useLanguage()
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
    heading.current?.scrollIntoView({ block: 'center' })
  }, [])
  const received = new Intl.DateTimeFormat(language === 'th' ? 'th-TH' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(receipt.receivedAt))
  return (
    <section className="grid gap-6 rounded-3xl p-[clamp(28px,3vw,40px)] text-white" style={{ background: 'var(--v1-dusk)' }} aria-labelledby="partner-result-heading" data-receipt-id={receipt.requestId}>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2457d6]" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28">
          <path d="M6 14.5l5.5 5.5L22 9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="grid gap-2.5">
        <h3 id="partner-result-heading" ref={heading} tabIndex={-1} className="v1-h3 outline-none" style={{ fontSize: 'clamp(30px, 2.8vw, 40px)' }}>
          {t(language, 'ได้รับข้อมูลร้านแล้ว', 'We have your store details')}
        </h3>
        <p className="text-[17px] leading-7 text-[#dbdfe8]">
          {t(
            language,
            `ทีม PK HUB จะโทรกลับที่เบอร์ ${maskPhone(phone)} เพื่อคุยรายละเอียด ยังไม่ใช่การอนุมัติเป็นคู่ค้า`,
            `The PK HUB team will call ${maskPhone(phone)} to talk through the details. This is not yet partner approval.`,
          )}
        </p>
        {receipt.duplicate ? (
          <p className="text-[15px] text-[#c9cdd6]">{t(language, 'พบข้อมูลที่ส่งไว้แล้ว ระบบไม่ได้สร้างซ้ำ', 'This was already received; no duplicate was created.')}</p>
        ) : null}
      </div>
      <dl className="flex flex-wrap gap-8 border-y border-white/15 py-4">
        <div className="grid gap-0.5">
          <dt className="text-[13px] text-[#c9cdd6]">{t(language, 'เลขอ้างอิง', 'Reference')}</dt>
          <dd className="font-display text-xl font-medium tracking-[0.06em]" title={receipt.requestId}>
            {shortReference(receipt.requestId)}
          </dd>
        </div>
        <div className="grid gap-0.5">
          <dt className="text-[13px] text-[#c9cdd6]">{t(language, 'ได้รับเมื่อ', 'Received')}</dt>
          <dd className="text-[17px] leading-7">{received}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-3">
        <a href={route(language, '/products')} className="v1-btn v1-btn-white v1-btn-md">
          {t(language, 'ดูบริการทั้งหมด', 'See all services')}
        </a>
        <a href={CONTACT.LINE_URL} target="_blank" rel="noreferrer" className="v1-btn v1-btn-ghost-light v1-btn-md">
          {t(language, `ทัก LINE ${CONTACT.LINE_ID} ↗`, `LINE ${CONTACT.LINE_ID} ↗`)}
        </a>
        <button type="button" onClick={onReset} className="v1-link px-2 text-[#dbdfe8]">
          {t(language, 'ส่งข้อมูลร้านอื่น', 'Send another store')}
        </button>
      </div>
    </section>
  )
}

type PartnerFormProps = {
  className?: string
  /** Full application on /join; the compact enquiry is used inside articles. */
  isApplication?: boolean
}

export default function PartnerForm({ className, isApplication = false }: PartnerFormProps) {
  const { language } = useLanguage()
  const attributedReferral = useReferralAttribution()
  const [values, setValues] = useState<PartnerLead>(EMPTY_LEAD)
  const [referral, setReferral] = useState('')
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [failure, setFailure] = useState<Failure | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [receipt, setReceipt] = useState<PartnerLeadReceipt | null>(null)
  const requestId = useRef(generateRequestId())
  const lastAttempt = useRef<string | null>(null)
  const submitting = useRef(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const failureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (attributedReferral) setReferral((current) => current || attributedReferral)
  }, [attributedReferral])

  const errors = useMemo(() => {
    const base: PartnerLeadErrors & { referral?: string } = validatePartnerLead(values, language)
    if (referral.trim() && !normalizeReferralCode(referral)) {
      base.referral = t(language, 'รหัสแนะนำใช้ได้เฉพาะ A–Z ตัวเลข - และ _ (3–64 ตัว)', 'Referral codes use A–Z, digits, - and _ (3–64 characters)')
    }
    return base
  }, [language, referral, values])

  const errorFor = (key: FieldKey) => (touched[key] ? (errors as Record<string, string | undefined>)[key] : undefined)
  const invalid = FIELD_ORDER.filter((key) => (errors as Record<string, string | undefined>)[key])

  useEffect(() => {
    if (failure) failureRef.current?.focus()
  }, [failure])

  const set = <K extends keyof PartnerLead>(key: K, value: PartnerLead[K]) => {
    if (submitting.current) return
    setValues((current) => ({ ...current, [key]: value }))
  }
  const blur = (key: FieldKey) => () => setTouched((current) => ({ ...current, [key]: true }))

  const fieldLabels: Record<string, string> = {
    shopName: t(language, 'ชื่อร้าน', 'Store name'),
    province: t(language, 'จังหวัด', 'Province'),
    contactName: t(language, 'ชื่อผู้ติดต่อ', 'Contact name'),
    phone: t(language, 'เบอร์โทรศัพท์', 'Phone'),
    email: t(language, 'อีเมล', 'Email'),
    referral: t(language, 'รหัสแนะนำ', 'Referral code'),
    consent: t(language, 'การยินยอม', 'Consent'),
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    setTouched(Object.fromEntries(FIELD_ORDER.map((key) => [key, true])))
    setFailure(null)
    if (invalid.length) {
      setShowSummary(true)
      requestAnimationFrame(() => {
        summaryRef.current?.scrollIntoView({ block: 'center' })
        const first = invalid[0] === 'consent' ? 'partner-consent' : invalid[0] === 'referral' ? 'referralCode' : invalid[0]
        form.querySelector<HTMLElement>(`#${first}`)?.focus({ preventScroll: true })
      })
      return
    }
    setShowSummary(false)

    const referralCode = normalizeReferralCode(referral) ?? ''
    const submitted = { ...values, interestedBrands: [...values.interestedBrands] }
    const fingerprint = JSON.stringify([submitted, referralCode])
    // A retry of the same details reuses the request ID so intake returns the original receipt;
    // edited details get a new ID so they are never rejected as a conflicting replay.
    if (lastAttempt.current !== null && lastAttempt.current !== fingerprint) requestId.current = generateRequestId()
    lastAttempt.current = fingerprint

    submitting.current = true
    setStatus('submitting')
    try {
      const persisted = await submitPartnerLead({
        ...submitted,
        language,
        sourcePage: window.location.href,
        requestId: requestId.current,
        website: String(new FormData(form).get('website') ?? ''),
        referralCode,
        acquisitionSource: referralCode ? 'BD_REFERRAL' : 'ORGANIC',
        acquisitionContext: captureAcquisitionContext(window.location.href, window.sessionStorage),
      })
      setReceipt(persisted)
      setStatus('success')
    } catch (error) {
      const code = error instanceof PartnerLeadSubmissionError ? error.code : 'NETWORK'
      if (code === 'REQUEST_ID_CONFLICT') {
        requestId.current = generateRequestId()
        lastAttempt.current = null
      }
      setFailure(code === 'RATE_LIMITED' ? 'rate-limited' : code === 'INTAKE_NOT_CONFIGURED' ? 'unavailable' : 'retry')
      setStatus('idle')
    } finally {
      submitting.current = false
    }
  }

  if (status === 'success' && receipt) {
    return (
      <Success
        receipt={receipt}
        phone={values.phone}
        onReset={() => {
          requestId.current = generateRequestId()
          lastAttempt.current = null
          setValues(EMPTY_LEAD)
          setTouched({})
          setReceipt(null)
          setStatus('idle')
          requestAnimationFrame(() => document.getElementById('shopName')?.focus())
        }}
      />
    )
  }

  const busy = status === 'submitting'
  const input = (key: FieldKey) => ({
    'aria-invalid': Boolean(errorFor(key)) || undefined,
    'aria-describedby': errorFor(key) ? `${key === 'referral' ? 'referralCode' : key}-error` : undefined,
    onBlur: blur(key),
    className: 'v1-input',
  })

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={busy} className={cn('grid gap-8', className)}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {showSummary && invalid.length ? (
        <div ref={summaryRef} className="v1-alert" role="alert">
          <span className="v1-alert-icon" aria-hidden="true">
            !
          </span>
          <span className="grid gap-0.5">
            <span className="font-medium">{t(language, `ยังส่งไม่ได้ มี ${invalid.length} ช่องที่ต้องแก้`, `Not sent yet: ${invalid.length} field${invalid.length > 1 ? 's' : ''} to fix`)}</span>
            <span className="text-[15px]">{invalid.map((key) => fieldLabels[key]).join(' · ')}</span>
          </span>
        </div>
      ) : null}

      <fieldset disabled={busy} className="grid min-w-0 gap-8 disabled:opacity-60">
        <legend className="v1-sr">{isApplication ? t(language, 'ใบสมัครคู่ค้า', 'Partner application') : t(language, 'ฝากข้อมูลร้าน', 'Store details')}</legend>
        <div className="grid gap-5">
          {isApplication ? (
            <div className="grid gap-1.5">
              <h3 className="font-display text-[28px] leading-10">{t(language, 'ข้อมูลร้าน', 'Store details')}</h3>
              <p className="v1-small">{t(language, 'ช่องที่มี * ต้องกรอก', 'Fields marked * are required')}</p>
            </div>
          ) : null}
          <div className="v1-grid-2">
            <Field id="shopName" label={t(language, 'ชื่อร้าน *', 'Store name *')} error={errorFor('shopName')}>
              <input id="shopName" autoComplete="organization" maxLength={160} placeholder={t(language, 'เช่น ร้านมือถือสมใจ', 'e.g. Somjai Mobile')} value={values.shopName} onChange={(e) => set('shopName', e.target.value)} {...input('shopName')} />
            </Field>
            <Field id="province" label={t(language, 'จังหวัด *', 'Province *')} error={errorFor('province')}>
              <select id="province" autoComplete="address-level1" value={values.province} onChange={(e) => set('province', e.target.value)} {...input('province')}>
                <option value="">{t(language, 'เลือกจังหวัด', 'Choose a province')}</option>
                {PROVINCES.map(([th, en]) => (
                  <option key={th} value={th}>
                    {language === 'th' ? th : en}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          {isApplication ? (
            <Field id="address" label={t(language, 'ที่อยู่ร้าน (ไม่บังคับ)', 'Store address (optional)')}>
              <input id="address" autoComplete="street-address" maxLength={600} placeholder={t(language, 'เลขที่ ถนน ตำบล อำเภอ', 'Number, road, district')} value={values.address} onChange={(e) => set('address', e.target.value)} className="v1-input" />
            </Field>
          ) : null}
        </div>

        <div className={cn('grid gap-5', isApplication && 'border-t border-[#e5e5e5] pt-7')}>
          {isApplication ? <h3 className="font-display text-[22px] leading-8">{t(language, 'ผู้ติดต่อ', 'Contact')}</h3> : null}
          <div className="v1-grid-2">
            <Field id="contactName" label={t(language, 'ชื่อผู้ติดต่อ *', 'Contact name *')} error={errorFor('contactName')}>
              <input id="contactName" autoComplete="name" maxLength={160} placeholder={t(language, 'ชื่อ-นามสกุล หรือชื่อเล่น', 'Full name or nickname')} value={values.contactName} onChange={(e) => set('contactName', e.target.value)} {...input('contactName')} />
            </Field>
            <Field id="phone" label={t(language, 'เบอร์โทรศัพท์ *', 'Phone *')} error={errorFor('phone') ? t(language, 'ใส่เบอร์ 9–10 หลัก ขึ้นต้นด้วย 0 เช่น 081-234-5678', 'Enter 9–10 digits starting with 0, e.g. 081-234-5678') : undefined}>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={30}
                placeholder="08X-XXX-XXXX"
                value={values.phone}
                onChange={(e) => set('phone', e.target.value)}
                {...input('phone')}
              />
            </Field>
          </div>
          {isApplication ? (
            <>
              <div className="v1-grid-2">
                <Field id="lineId" label={t(language, 'LINE ID (ไม่บังคับ)', 'LINE ID (optional)')}>
                  <input id="lineId" maxLength={100} placeholder={t(language, '@ หรือ ID ส่วนตัว', '@ or personal ID')} value={values.lineId} onChange={(e) => set('lineId', e.target.value)} className="v1-input" />
                </Field>
                <Field id="email" label={t(language, 'อีเมล (ไม่บังคับ)', 'Email (optional)')} error={errorFor('email')}>
                  <input id="email" type="email" inputMode="email" autoComplete="email" maxLength={180} placeholder="name@example.com" value={values.email} onChange={(e) => set('email', e.target.value)} {...input('email')} />
                </Field>
              </div>
              <Field id="socialContact" label={t(language, 'Facebook หรือ TikTok ของร้าน (ไม่บังคับ)', 'Store Facebook or TikTok (optional)')}>
                <input id="socialContact" maxLength={250} placeholder={t(language, 'ลิงก์เพจหรือชื่อบัญชี', 'Page link or account name')} value={values.socialContact} onChange={(e) => set('socialContact', e.target.value)} className="v1-input" />
              </Field>
            </>
          ) : null}
        </div>

        {isApplication ? (
          <div className="grid gap-4 border-t border-[#e5e5e5] pt-7">
            <div className="grid gap-1">
              <h3 className="font-display text-[22px] leading-8" id="brands-label">
                {t(language, 'แบรนด์ที่สนใจ', 'Brands of interest')}
              </h3>
              <p className="v1-small">{t(language, 'เลือกได้หลายแบรนด์ หรือข้ามไปก่อนก็ได้', 'Pick any number, or skip for now')}</p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="brands-label">
              {[...BRAND_OPTIONS, t(language, 'อุปกรณ์เสริม', 'Accessories'), t(language, 'ซิมและเติมเงิน AIS', 'AIS SIM and top-up')].map((brand) => {
                const pressed = values.interestedBrands.includes(brand)
                return (
                  <button
                    key={brand}
                    type="button"
                    className="v1-toggle"
                    aria-pressed={pressed}
                    onClick={() => set('interestedBrands', pressed ? values.interestedBrands.filter((item) => item !== brand) : [...values.interestedBrands, brand])}
                  >
                    {pressed ? <span aria-hidden="true">✓</span> : null}
                    {brand}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        {isApplication ? (
          <div className="grid gap-5 border-t border-[#e5e5e5] pt-7">
            <Field id="note" label={t(language, 'อยากให้ทีมรู้อะไรก่อนโทร (ไม่บังคับ)', 'Anything the team should know before calling (optional)')}>
              <textarea
                id="note"
                maxLength={NOTE_LIMIT}
                placeholder={t(language, 'เช่น ขายมือถือมือหนึ่งอยู่แล้ว อยากเพิ่มอุปกรณ์เสริม', 'e.g. We already sell new phones and want to add accessories')}
                value={values.note}
                onChange={(e) => set('note', e.target.value)}
                className="v1-input"
                aria-describedby="note-count"
              />
              <span id="note-count" className="text-right text-[13px] text-[#606060]">
                {values.note.length} / {NOTE_LIMIT}
              </span>
            </Field>
            <div className="sm:max-w-[316px]">
              <Field id="referralCode" label={t(language, 'รหัสแนะนำ (ถ้ามี)', 'Referral code (if any)')} error={errorFor('referral')}>
                <input id="referralCode" maxLength={64} placeholder={t(language, 'เช่น BD-SOMCHAI', 'e.g. BD-SOMCHAI')} value={referral} onChange={(e) => setReferral(e.target.value)} {...input('referral')} />
              </Field>
            </div>
          </div>
        ) : null}

        <div className={cn('grid gap-5', isApplication && 'border-t border-[#e5e5e5] pt-7')}>
          <div className="grid gap-1">
            <label className="flex cursor-pointer items-start gap-3.5">
              <input
                id="partner-consent"
                type="checkbox"
                className="v1-check"
                checked={values.consent}
                onChange={(e) => {
                  set('consent', e.target.checked)
                  setTouched((current) => ({ ...current, consent: true }))
                }}
                aria-invalid={Boolean(errorFor('consent')) || undefined}
                aria-describedby={errorFor('consent') ? 'partner-consent-error' : undefined}
              />
              <span className="text-[15px] leading-[26px] text-[#3a3a3a]">
                {t(language, 'ยินยอมให้ PK HUB ใช้ข้อมูลนี้เพื่อติดต่อกลับเรื่องการเป็นคู่ค้าเท่านั้น *', 'I agree PK HUB may use these details only to contact me about becoming a partner *')}
              </span>
            </label>
            {errorFor('consent') ? (
              <p id="partner-consent-error" className="v1-error pl-[38px]">
                {t(language, 'ต้องยินยอมก่อนส่ง เพื่อให้ทีมติดต่อกลับได้', 'Please agree so the team can contact you')}
              </p>
            ) : null}
          </div>

          {failure ? (
            <div ref={failureRef} tabIndex={-1} className="v1-alert v1-alert-warn outline-none" role="alert">
              <span className="v1-alert-icon" aria-hidden="true">
                !
              </span>
              <span className="grid gap-0.5">
                {failure === 'rate-limited' ? (
                  <span className="font-medium">{t(language, 'ส่งหลายครั้งในเวลาสั้นๆ กรุณารอสักครู่แล้วลองใหม่', 'Too many attempts in a short time. Please wait a moment and try again.')}</span>
                ) : failure === 'unavailable' ? (
                  <>
                    <span className="font-medium">{t(language, 'ตอนนี้ส่งแบบฟอร์มออนไลน์ไม่ได้', 'Online sending is unavailable right now')}</span>
                    <span className="text-[15px]">{t(language, `ติดต่อทีมได้ที่ ${CONTACT.PHONE_DISPLAY} หรือ LINE ${CONTACT.LINE_ID}`, `Reach the team on ${CONTACT.PHONE_DISPLAY} or LINE ${CONTACT.LINE_ID}`)}</span>
                  </>
                ) : (
                  <>
                    <span className="font-medium">{t(language, 'ยังส่งไม่สำเร็จ ข้อมูลที่กรอกยังอยู่ครบ', 'Not sent yet. Your details are still here.')}</span>
                    <span className="text-[15px]">{t(language, 'กดส่งอีกครั้งได้เลย ระบบจะไม่สร้างข้อมูลซ้ำ', 'Press send again. It will not create a duplicate.')}</span>
                  </>
                )}
              </span>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-[340px] text-sm leading-[22px] text-[#606060]">
              {t(language, 'การส่งข้อมูลยังไม่ใช่การอนุมัติเป็นคู่ค้า ทีมจะติดต่อกลับเพื่อคุยรายละเอียด', 'Sending is not partner approval. The team will call you to talk through the details.')}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {failure ? <span className="text-[15px] text-[#3a3a3a]">{t(language, `หรือโทร ${CONTACT.PHONE_DISPLAY}`, `or call ${CONTACT.PHONE_DISPLAY}`)}</span> : null}
              <button type="submit" className="v1-btn v1-btn-primary" disabled={busy}>
                {busy ? (
                  <>
                    <span className="v1-spinner" aria-hidden="true" />
                    <span role="status">{t(language, 'กำลังส่ง…', 'Sending…')}</span>
                  </>
                ) : (
                  <>
                    {failure === 'retry' ? t(language, 'ส่งอีกครั้ง', 'Send again') : t(language, 'ส่งข้อมูลร้าน', 'Send store details')}
                    <ArrowRight size={20} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
