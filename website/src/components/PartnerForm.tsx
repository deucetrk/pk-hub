import { useMemo, useState } from 'react'

import { Loader2, MessageCircle } from 'lucide-react'

import { hasErrors, type PartnerLead, validatePartnerLead } from '@/utils/partnerLead'
import { useLanguage } from '@/i18n/LanguageContext'
import { submitPartnerLead } from '@/services/partnerLeadSubmission'
import { CONTACT } from '@/pages/home/constants'

import Button from './Button'
import BrandSelector from './partner-form/BrandSelector'
import ConsentField from './partner-form/ConsentField'
import SuccessCard from './partner-form/SuccessCard'
import TextField from './partner-form/TextField'

const BRAND_OPTIONS = ['Apple', 'Samsung', 'Oppo', 'Vivo', 'Realme', 'Xiaomi', 'Honor', 'Infinix']

const EMPTY_LEAD: PartnerLead = {
  shopName: '',
  province: '',
  contactName: '',
  phone: '',
  lineId: '',
  email: '',
  interestedBrands: [],
  note: '',
  consent: false,
}

export default function PartnerForm() {
  const { isThai, language } = useLanguage()
  const [requestId, setRequestId] = useState(() => crypto.randomUUID())
  const [values, setValues] = useState<PartnerLead>(EMPTY_LEAD)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [submitError, setSubmitError] = useState<string>('')

  const errors = useMemo(() => validatePartnerLead(values, language), [language, values])

  const setField = <K extends keyof PartnerLead>(key: K, next: PartnerLead[K]) => {
    setValues((v) => ({ ...v, [key]: next }))
  }

  const showError = (key: keyof PartnerLead) => Boolean(touched[String(key)] && errors[key])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const website = String(new FormData(e.currentTarget as HTMLFormElement).get('website') ?? '')
    setTouched({ shopName: true, province: true, phone: true, interestedBrands: true, consent: true })
    setSubmitError('')

    if (hasErrors(errors)) return

    try {
      setStatus('submitting')
      await submitPartnerLead({
        ...values,
        language,
        sourcePage: window.location.href,
        requestId,
        website,
      })
      setStatus('success')
    } catch {
      setStatus('idle')
      setSubmitError(isThai ? 'ส่งฟอร์มไม่สำเร็จตอนนี้ ทัก LINE มาได้เลย ทีมขายช่วยเช็กราคาให้' : 'The form could not be submitted right now. Message us on LINE and our sales team can help.')
    }
  }

  if (status === 'success') {
    return (
      <SuccessCard
        values={values}
        onReset={() => {
          setStatus('idle')
          setTouched({})
          setRequestId(crypto.randomUUID())
          setValues(EMPTY_LEAD)
        }}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl bg-white p-6 shadow-xl shadow-black/20 sm:p-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          id="shopName"
          label={isThai ? 'ชื่อร้าน / ชื่อเพจ' : 'Store or page name'}
          value={values.shopName}
          onChange={(v) => setField('shopName', v)}
          onBlur={() => setTouched((t) => ({ ...t, shopName: true }))}
          placeholder={isThai ? 'เช่น ร้านมือถือชลบุรี หรือชื่อเพจ' : 'e.g. PK Mobile Chonburi or page name'}
          error={showError('shopName') ? errors.shopName : undefined}
        />

        <TextField
          id="province"
          label={isThai ? 'จังหวัด' : 'Province'}
          value={values.province}
          onChange={(v) => setField('province', v)}
          onBlur={() => setTouched((t) => ({ ...t, province: true }))}
          placeholder={isThai ? 'เช่น ชลบุรี' : 'e.g. Chonburi'}
          error={showError('province') ? errors.province : undefined}
        />
      </div>

      <TextField
        id="phone"
        label={isThai ? 'เบอร์โทรที่ให้ทีมทักกลับ' : 'Phone number for our team to call back'}
        value={values.phone}
        onChange={(v) => setField('phone', v)}
        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
        placeholder="08x-xxx-xxxx"
        inputMode="tel"
        error={showError('phone') ? errors.phone : undefined}
      />

      <BrandSelector
        options={BRAND_OPTIONS}
        label={isThai ? 'แบรนด์ที่สนใจ (แตะเลือกได้หลายแบรนด์)' : 'Brands of interest (tap to select)'}
        selected={values.interestedBrands}
        error={touched.interestedBrands ? errors.interestedBrands : undefined}
        onToggle={(brand, checked) => {
          setTouched((t) => ({ ...t, interestedBrands: true }))
          setValues((v) => ({
            ...v,
            interestedBrands: checked ? [...v.interestedBrands, brand] : v.interestedBrands.filter((x) => x !== brand),
          }))
        }}
      />

      <ConsentField
        checked={values.consent}
        isThai={isThai}
        error={showError('consent') ? errors.consent : undefined}
        onChange={(next) => {
          setTouched((t) => ({ ...t, consent: true }))
          setField('consent', next)
        }}
      />

      {submitError ? <div className="text-sm font-semibold text-red-600">{submitError}</div> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          className="w-full rounded-xl border-transparent bg-[#06c755] text-white shadow-md hover:bg-[#05b34c] hover:shadow-lg sm:w-auto"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {isThai ? 'กำลังส่งให้ทีมขาย' : 'Sending to sales'}
            </>
          ) : (
            isThai ? 'ฝากข้อมูลให้ทีมเช็กราคา' : 'Send details for a price check'
          )}
        </Button>
        <a
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 sm:w-auto"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          {isThai ? 'ด่วนกว่า? Inbox LINE' : 'Faster? Inbox LINE'}
        </a>
      </div>
    </form>
  )
}
