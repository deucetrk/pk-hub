import { useMemo, useState } from 'react'

import { Loader2, MessageCircle } from 'lucide-react'

import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { cn } from '@/lib/utils'
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
  socialContact: '',
  address: '',
  taxId: '',
  interestedBrands: [],
  note: '',
  consent: false,
}

type PartnerFormProps = {
  className?: string
}

export default function PartnerForm({ className }: PartnerFormProps) {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
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
    setTouched({ shopName: true, province: true, contactName: true, phone: true, interestedBrands: true, consent: true })
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
        referralCode: referralCode ?? '',
        acquisitionSource: referralCode ? 'BD_REFERRAL' : 'ORGANIC',
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
    <form onSubmit={onSubmit} className={cn('grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 border border-zinc-200 bg-white p-6 sm:p-8', className)}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TextField
        id="contactName"
        label={isThai ? 'ชื่อผู้ติดต่อ' : 'Contact name'}
        value={values.contactName}
        onChange={(v) => setField('contactName', v)}
        onBlur={() => setTouched((t) => ({ ...t, contactName: true }))}
        placeholder={isThai ? 'ชื่อคนที่ทีม PK ติดต่อได้' : 'Who should the PK team contact?'}
        error={showError('contactName') ? errors.contactName : undefined}
      />

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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          id="lineId"
          label={isThai ? 'LINE ID (ไม่บังคับ)' : 'LINE ID (optional)'}
          value={values.lineId}
          onChange={(v) => setField('lineId', v)}
          onBlur={() => setTouched((t) => ({ ...t, lineId: true }))}
          placeholder="LINE ID"
        />
        <TextField
          id="email"
          label={isThai ? 'อีเมล (ไม่บังคับ)' : 'Email (optional)'}
          value={values.email}
          onChange={(v) => setField('email', v)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="name@example.com"
          inputMode="email"
          error={showError('email') ? errors.email : undefined}
        />
      </div>

      <TextField
        id="socialContact"
        label={isThai ? 'เพจร้านหรือช่องทางติดต่ออื่น (ไม่บังคับ)' : 'Store page or another contact (optional)'}
        value={values.socialContact}
        onChange={(v) => setField('socialContact', v)}
        onBlur={() => setTouched((t) => ({ ...t, socialContact: true }))}
        placeholder={isThai ? 'เช่น Facebook หรือ TikTok ของร้าน' : 'e.g. store Facebook or TikTok'}
      />

      <TextField
        id="address"
        label={isThai ? 'ที่อยู่ร้าน (ไม่บังคับ)' : 'Store address (optional)'}
        value={values.address}
        onChange={(v) => setField('address', v)}
        onBlur={() => setTouched((t) => ({ ...t, address: true }))}
        placeholder={isThai ? 'อำเภอ / ที่อยู่สำหรับติดต่อ' : 'District or contact address'}
      />

      <TextField
        id="taxId"
        label={isThai ? 'เลขประจำตัวผู้เสียภาษี (ถ้ามี)' : 'Tax ID (if available)'}
        value={values.taxId}
        onChange={(v) => setField('taxId', v)}
        onBlur={() => setTouched((t) => ({ ...t, taxId: true }))}
        inputMode="numeric"
      />

      <TextField
        id="note"
        label={isThai ? 'งบประมาณหรือรุ่นที่สนใจ (ไม่บังคับ)' : 'Budget or models of interest (optional)'}
        value={values.note}
        onChange={(v) => setField('note', v)}
        onBlur={() => setTouched((t) => ({ ...t, note: true }))}
        placeholder={isThai ? 'เช่น งบเริ่มต้น 50,000 บาท หรือ Samsung รุ่น A' : 'e.g. THB 50,000 starting budget or Samsung A series'}
      />

      {referralCode ? (
        <div className="border-l-2 border-[#8eaaf2] bg-[#eaf0ff] px-4 py-3 text-sm leading-6 text-zinc-700">
          {isThai
            ? 'ระบบเก็บข้อมูลผู้แนะนำไว้แล้ว ทีม PK จะตรวจสอบพร้อมใบสมัครของคุณ'
            : 'Your PK referral context is retained and will be reviewed with this application.'}
        </div>
      ) : null}

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
          className="w-full border-transparent bg-[#2457d6] text-white hover:bg-[#1946b8] sm:w-auto"
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-900 sm:w-auto"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          {isThai ? 'ด่วนกว่า? Inbox LINE' : 'Faster? Inbox LINE'}
        </a>
      </div>
    </form>
  )
}
