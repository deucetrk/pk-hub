import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/i18n/LanguageContext'
import { STOCK_ON_DEMAND_META, usePageMeta } from '@/lib/seo'
import Footer from '@/pages/home/Footer'
import PartnerStartSection from '@/pages/home/PartnerStartSection'
import { StockHero, StockConnectedJourney, StockCapitalStory, StockFulfillmentStory, StockDemandStory, StockProofStory, StockRelatedStory } from '@/components/pkhub-v7/StockStorySections'
import '@/styles/stock-on-demand.css'

// Owner-reviewed local page. Illustrations never quote, reserve stock or place orders.
export default function StockOnDemandPage() {
  const { language, isThai } = useLanguage()
  usePageMeta(STOCK_ON_DEMAND_META[language])
  return <div id="pk-home-v7" className="is-stock-product bg-white">
    <a href="#main-content" className="pk-skip-link">{isThai ? 'ข้ามไปเนื้อหา' : 'Skip to content'}</a>
    <div id="top" className="v4-page">
      <Navbar />
      <div className="sd-backbar">
        <a className="v4-text-action cursor-interaction" href={`/${language}/products`}><ArrowLeft size={15} aria-hidden="true" />{isThai ? 'สินค้าและบริการ' : 'Products & services'}</a>
        <span>PK HUB / Stock on Demand</span>
      </div>
      <main id="main-content" tabIndex={-1}>
        <StockHero />
        <StockConnectedJourney />
        <StockCapitalStory />
        <StockFulfillmentStory />
        <StockDemandStory />
        <StockProofStory />
        <StockRelatedStory />
        <PartnerStartSection />
      </main>
      <Footer />
    </div>
  </div>
}
