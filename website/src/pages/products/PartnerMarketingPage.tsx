import { useLanguage } from '@/i18n/LanguageContext'
import { PARTNER_MARKETING_META, usePageMeta } from '@/lib/seo'

import { PartnerMarketingV1 } from './v1/CareServicePages'

/** Marketing media is announced as coming soon (owner 2026-10-19); no follower or view counts. */
export default function PartnerMarketingPage() {
  const { language } = useLanguage()
  usePageMeta(PARTNER_MARKETING_META[language])
  return <PartnerMarketingV1 />
}
