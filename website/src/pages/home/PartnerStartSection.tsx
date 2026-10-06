import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from '@/pages/home/constants'
import { withReferral } from '@/utils/referralAttribution'

export default function PartnerStartSection() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
  const joinPath = withReferral(`/${language}/join`, referralCode)
  const dealerLoginPath = withReferral(`/${language}/dealer/login`, referralCode)

  return (
    <section className="v4-start" id="v4-start" aria-labelledby="v4-start-title">
      <div>
        <p className="v4-eyebrow">LET&apos;S GROW TOGETHER</p>
        <h2 id="v4-start-title">
          {isThai ? 'เริ่มจากสิ่งที่ร้านคุณต้องการ' : 'Start with What Your Store Needs'}
        </h2>
        <p>
          {isThai ? (
            <>
              เช็กรุ่นและราคา หรือให้ทีม PK รู้จักร้านคุณ
              <br />
              มีทีมช่วยเรื่องการสั่งซื้อ จัดส่ง และประสานเคลมตามเงื่อนไข
            </>
          ) : (
            <>
              Check current models and wholesale pricing, or introduce your store to PK.
              <br />
              Dedicated support for ordering, dispatch, and warranty claims under official terms.
            </>
          )}
        </p>
      </div>

      <div className="v4-start-actions">
        <a
          className="v4-primary cursor-interaction"
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} aria-hidden="true" />
          {isThai ? 'คุยกับทีมทาง LINE' : 'Talk with Team on LINE'}
        </a>
        <a className="v4-secondary cursor-interaction" href={joinPath}>
          {isThai ? 'สมัครเป็น PK Hub Partner' : 'Apply as PK Hub Partner'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a className="v4-portal cursor-interaction" href={dealerLoginPath}>
          {isThai ? 'พาร์ทเนอร์เดิม: เข้า Dealer Portal' : 'Existing Partners: Dealer Login'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
