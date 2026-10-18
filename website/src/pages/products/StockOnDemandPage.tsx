import { useLanguage } from '@/i18n/LanguageContext'
import { STOCK_ON_DEMAND_META, usePageMeta } from '@/lib/seo'

import { StockOnDemandV1 } from './v1/CareServicePages'

// Illustrations never quote, reserve stock or place orders.
export default function StockOnDemandPage() {
  const { language } = useLanguage()
  usePageMeta(STOCK_ON_DEMAND_META[language])
  return <StockOnDemandV1 />
}
