import Navbar from '@/components/Navbar'
import FloatingContact from '@/components/FloatingContact'

import BrandsSection from './home/BrandsSection'
import ContactSection from './home/ContactSection'
import FaqSection from './home/FaqSection'
import Footer from './home/Footer'
import HeroSection from './home/HeroSection'
import ProcessSection from './home/ProcessSection'
import ProofSection from './home/ProofSection'
import StatsSection from './home/StatsSection'
import WhySection from './home/WhySection'

export default function Home() {
  return (
    <div id="top" className="min-h-dvh bg-[#f8fafc] text-black">
      <Navbar />

      <HeroSection />
      <BrandsSection />
      <ProofSection />
      <StatsSection />
      <WhySection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <FloatingContact />
    </div>
  )
}
