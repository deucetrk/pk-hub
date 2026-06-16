import Navbar from '@/components/Navbar'
import FloatingContact from '@/components/FloatingContact'

import AboutSection from './home/AboutSection'
import AreaSection from './home/AreaSection'
import BrandsSection from './home/BrandsSection'
import ContactSection from './home/ContactSection'
import FaqSection from './home/FaqSection'
import Footer from './home/Footer'
import FormSection from './home/FormSection'
import HeroSection from './home/HeroSection'
import ProcessSection from './home/ProcessSection'
import ProofSection from './home/ProofSection'
import QuickLineSection from './home/QuickLineSection'
import ReviewsSection from './home/ReviewsSection'
import StatsSection from './home/StatsSection'
import TrustSection from './home/TrustSection'

export default function Home() {
  return (
    <div id="top" className="min-h-dvh bg-white text-black">
      <Navbar />

      <HeroSection />
      <BrandsSection />
      <StatsSection />
      <TrustSection />
      <ProofSection />
      <ReviewsSection />
      <ProcessSection />
      <AreaSection />
      <QuickLineSection />
      <FaqSection />
      <FormSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingContact />
    </div>
  )
}
