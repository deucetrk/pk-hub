import { useLocation } from 'react-router-dom'

import { SERVICE_PRODUCT_IDS, type ServiceProductId } from '@/content/productServices'
import { useLanguage } from '@/i18n/LanguageContext'
import { getProductMeta, usePageMeta } from '@/lib/seo'
import NotFound from '@/pages/NotFound'

import { AfterSalesPage } from './v1/CareServicePages'
import { RomPage, SimPage, SLeasingPage } from './v1/CustomerServicePages'
import DevicesPage from './v1/DevicesPage'

function ServicePage({ id }: { id: ServiceProductId }) {
  const { language } = useLanguage()
  usePageMeta(getProductMeta(id, language))
  switch (id) {
    case 'handset-wholesale':
      return <DevicesPage focus="devices" />
    case 'accessories':
      return <DevicesPage focus="accessories" />
    case 'ais-sim':
      return <SimPage />
    case 'ais-rom':
      return <RomPage />
    case 'finance':
      return <SLeasingPage />
    case 'after-sales':
      return <AfterSalesPage focus="after-sales" />
    case 'repair':
      return <AfterSalesPage focus="repair" />
  }
}

export default function ServiceProductPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/\/$/, '').split('/').pop() as ServiceProductId
  if (!SERVICE_PRODUCT_IDS.includes(slug)) return <NotFound />
  return <ServicePage key={slug} id={slug} />
}
