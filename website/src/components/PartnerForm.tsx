import { useMemo, useState } from 'react'

import { Loader2 } from 'lucide-react'

import { hasErrors, type PartnerLead, validatePartnerLead } from '@/utils/partnerLead'
import { useLanguage } from '@/i18n/LanguageContext'
import { submitPartnerLead } from '@/services/partnerLeadSubmission'

import Button from './Button'
import BrandSelector from './partner-form/BrandSelector'
import ConsentField from './partner-form/ConsentField'
import SuccessCard from './partner-form/SuccessCard'
import TextAreaField from './partner-form/TextAreaField'
import TextField from './partner-form/TextField'

const BRAND_OPTIONS = ['Apple', 'Samsung', 'Oppo', 'Vivo', 'Realme', 'Xiaomi', 'Honor', 'Infinix']

export default function PartnerForm() {
  const { isThai, language } = useLanguage()
  const [requestId, setRequestId] = useState(() => crypto.randomUUID())
  const [values, setValues] = useState<PartnerLead>({
    shopName: '',
    province: '',
    contactName: '',
    phone: '',
    lineId: '',
    email: '',
    interestedBrands: [],
    note: '',
    consent: false,
  })
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
    setTouched({
      shopName: true,
      province: true,
      contactName: true,
      phone: true,
      lineId: true,
      email: true,
      interestedBrands: true,
      note: true,
      consent: true,
    })
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
      setSubmitError(isThai ? 'ไม่สามารถส่งข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง' : 'Unable to submit right now. Please try again.')
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
          setValues({
            shopName: '',
            province: '',
            contactName: '',
            phone: '',
            lineId: '',
            email: '',
            interestedBrands: [],
            note: '',
            consent: false,
          })
        }}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 rounded-none border-2 border-black bg-white p-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          id="shopName"
          label={isThai ? 'ชื่อร้านค้า' : 'Store name'}
          value={values.shopName}
          onChange={(v) => setField('shopName', v)}
          onBlur={() => setTouched((t) => ({ ...t, shopName: true }))}
          placeholder={isThai ? 'เช่น PK Mobile ชลบุรี' : 'e.g. PK Mobile Chonburi'}
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          id="contactName"
          label={isThai ? 'ชื่อผู้ติดต่อ' : 'Contact name'}
          value={values.contactName}
          onChange={(v) => setField('contactName', v)}
          onBlur={() => setTouched((t) => ({ ...t, contactName: true }))}
          placeholder={isThai ? 'ชื่อ-นามสกุล' : 'Full name'}
          error={showError('contactName') ? errors.contactName : undefined}
        />

        <TextField
          id="phone"
          label={isThai ? 'เบอร์โทร' : 'Phone number'}
          value={values.phone}
          onChange={(v) => setField('phone', v)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          placeholder="08x-xxx-xxxx"
          inputMode="tel"
          error={showError('phone') ? errors.phone : undefined}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          id="lineId"
          label="LINE ID"
          value={values.lineId}
          onChange={(v) => setField('lineId', v)}
          onBlur={() => setTouched((t) => ({ ...t, lineId: true }))}
          placeholder={isThai ? '@pkhub หรือ ไอดี' : '@pkhub or your LINE ID'}
        />
        <TextField
          id="email"
          label={isThai ? 'อีเมล' : 'Email'}
          value={values.email}
          onChange={(v) => setField('email', v)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="you@company.co"
          inputMode="email"
          error={showError('email') ? errors.email : undefined}
        />
      </div>

      <BrandSelector
        options={BRAND_OPTIONS}
        label={isThai ? 'แบรนด์ที่สนใจ' : 'Brands of interest'}
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

      <TextAreaField
        id="note"
        label={isThai ? 'หมายเหตุเพิ่มเติม (ถ้ามี)' : 'Additional notes (optional)'}
        value={values.note}
        onChange={(v) => setField('note', v)}
        onBlur={() => setTouched((t) => ({ ...t, note: true }))}
        placeholder={isThai ? 'โมเดลที่สนใจ ปริมาณโดยประมาณ ฯลฯ' : 'Models, estimated quantities, or other details'}
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

      {submitError ? <div className="text-sm font-semibold text-red-700">{submitError}</div> : null}

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {isThai ? 'กำลังส่งข้อมูล' : 'Submitting'}
            </>
          ) : (
            isThai ? 'ส่งข้อมูลขอรับรายการราคา' : 'Submit price enquiry'
          )}
        </Button>
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center rounded-none border-2 border-black bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-black hover:bg-zinc-100 sm:w-auto transition-colors"
        >
          {isThai ? 'ต้องการคุยด่วน? ดูช่องทางติดต่อ' : 'Need a quick reply? View contact options'}
        </a>
      </div>

      <div className="text-xs text-zinc-600">
        {isThai
          ? 'ข้อมูลของคุณจะถูกส่งให้ทีม PK HUB เพื่อใช้ติดต่อกลับและดูแลคำขอนี้'
          : 'Your details will be sent to the PK HUB team so they can follow up on this enquiry.'}
      </div>
    </form>
  )
}
