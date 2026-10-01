import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getHomeFaqSchema } from "@/content/homeFaqs";
import { useLanguage } from "@/i18n/LanguageContext";

import BrandsSection from "./home/BrandsSection";
import ContactSection from "./home/ContactSection";
import FaqSection from "./home/FaqSection";
import Footer from "./home/Footer";
import HeroSection from "./home/HeroSection";
import ProcessSection from "./home/ProcessSection";
import ProofSection from "./home/ProofSection";
import WhySection from "./home/WhySection";

export default function Home() {
  const { isThai, language } = useLanguage();
  useEffect(() => {
    let schema = document.getElementById("faq-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "faq-schema";
      schema.setAttribute("type", "application/ld+json");
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(getHomeFaqSchema(language));
    return () => {
      schema.remove();
    };
  }, [language]);
  return (
    <div id="top" className="min-h-dvh bg-[var(--pk-white)] text-[#18181b]">
      <a href="#main-content" className="pk-skip-link">
        {isThai ? "ข้ามไปเนื้อหา" : "Skip to content"}
      </a>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <BrandsSection />
        <WhySection />
        <ProofSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
