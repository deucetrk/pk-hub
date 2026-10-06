import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import Navbar from '@/components/Navbar'
import ServiceDialog, { type ServiceDetail } from '@/components/pkhub-v7/ServiceDialog'

import BrandsSection from './home/BrandsSection'
import Footer from './home/Footer'
import HeroSection from './home/HeroSection'
import OneCustomerSection from './home/OneCustomerSection'
import PartnerStartSection from './home/PartnerStartSection'
import StockOnDemandSection from './home/StockOnDemandSection'
import StorePotentialSection from './home/StorePotentialSection'

export default function Home() {
  const { isThai } = useLanguage()
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null)
  const [activeTrigger, setActiveTrigger] = useState<HTMLElement | null>(null)

  const handleOpenService = (service: ServiceDetail, triggerEl?: HTMLElement) => {
    setActiveTrigger(triggerEl ?? (document.activeElement as HTMLElement) ?? null)
    setActiveService(service)
  }

  const handleCloseService = () => {
    setActiveService(null)
  }

  return (
    <div id="pk-home-v7" className="min-h-dvh bg-white text-[#252720]">
      <a href="#main-content" className="pk-skip-link">
        {isThai ? "ข้ามไปเนื้อหา" : "Skip to content"}
      </a>

      <div id="top" className="v4-page">
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <BrandsSection />
          <StockOnDemandSection />
          <OneCustomerSection />
          <StorePotentialSection onOpenServiceDialog={handleOpenService} />
          <PartnerStartSection />
        </main>

        <Footer />
      </div>

      <ServiceDialog
        service={activeService}
        triggerEl={activeTrigger}
        onClose={handleCloseService}
      />
    </div>
  )
}
