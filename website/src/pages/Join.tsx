import { ArrowDown, MessageCircle } from "lucide-react";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import PartnerForm from "@/components/PartnerForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { JOIN_META, usePageMeta } from "@/lib/seo";
import Footer from "@/pages/home/Footer";
import { CONTACT } from "@/pages/home/constants";

export default function Join() {
  const { isThai, language } = useLanguage();
  usePageMeta(JOIN_META[language]);

  const steps = isThai
    ? [
        "กรอกข้อมูลร้านและช่องทางติดต่อที่สะดวก",
        "ทีม PK ตรวจสอบข้อมูลและสิทธิ์ร้านค้าส่ง",
        "ทีมงานติดต่อกลับเพื่อยืนยันขั้นตอนถัดไป",
      ]
    : [
        "Share your store and preferred contact details.",
        "PK reviews the application for wholesale access.",
        "Our team contacts you to confirm the next step.",
      ];

  return (
    <div className="min-h-dvh bg-[var(--pk-white)] text-[#18181b]">
      <a href="#main-content" className="pk-skip-link">
        {isThai ? "ข้ามไปเนื้อหา" : "Skip to content"}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="relative isolate overflow-hidden bg-[#1b1c19] text-white">
          <figure className="pk-join-media absolute inset-0 -z-10">
            <img
              src="/proof/storefront.jpg"
              alt={
                isThai
                  ? "พื้นที่ต้อนรับภายในร้าน PK HUB ฉะเชิงเทรา"
                  : "Reception area inside the PK HUB store in Chachoengsao"
              }
              width={1425}
              height={1430}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-[center_40%] lg:object-[center_45%]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#1b1c19]/95 via-[#1b1c19]/80 to-[#1b1c19]/30"
              aria-hidden="true"
            />
          </figure>
          <Container className="relative py-12 sm:py-16 lg:py-20">
            <div className="pk-join-intro max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/80">
                PK HUB · {isThai ? "สำหรับร้านค้าพาร์ทเนอร์" : "Retail partners"}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.6rem,5.2vw,5rem)] font-black leading-[1.08] tracking-[-0.04em]">
                {isThai ? (
                  <>
                    สมัครเป็นพาร์ทเนอร์<span className="block">กับ PK HUB</span>
                  </>
                ) : (
                  <>
                    Become a<span className="block">PK partner</span>
                  </>
                )}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/85">
                {isThai
                  ? "กรอกข้อมูลร้านและช่องทางติดต่อ เพื่อให้ทีม PK ตรวจสอบใบสมัครของคุณ"
                  : "Share your store and contact details for PK to review your application."}
              </p>
              <a
                href="#partner-application-form"
                className="mt-7 inline-flex min-h-12 items-center gap-3 bg-white px-5 py-3 text-sm font-bold text-[#1b1c19] transition-colors hover:bg-[#eaf0ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {isThai ? "ไปที่แบบฟอร์มสมัคร" : "Go to the application form"}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Container>
        </section>

        <Container className="grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,0.85fr)] lg:gap-16">
          <section
            id="partner-application-form"
            className="min-w-0 scroll-mt-24"
            aria-labelledby="application-heading"
          >
            <div className="mb-7 border-b border-zinc-300 pb-5">
              <p className="pk-eyebrow">
                {isThai ? "ข้อมูลสำหรับทีม PK" : "Details for the PK team"}
              </p>
              <h2
                id="application-heading"
                className="mt-3 font-display text-3xl font-black tracking-[-0.03em]"
              >
                {isThai ? "ใบสมัครร้านค้า" : "Store application"}
              </h2>
            </div>
            <PartnerForm isApplication />
            <p className="mt-5 text-xs leading-6 text-zinc-600">
              {isThai
                ? "ข้อมูลจะถูกใช้เพื่อติดต่อเกี่ยวกับการสมัครร้านค้าและการค้าส่งเท่านั้น"
                : "Your details are used only to contact you about the retailer application and wholesale relationship."}
            </p>
          </section>

          <aside
            className="min-w-0 border-t-2 border-[#2457d6] pt-6 lg:sticky lg:top-28"
            aria-labelledby="application-steps-heading"
          >
            <h2 id="application-steps-heading" className="font-display text-xl font-bold">
              {isThai ? "ขั้นตอนการสมัคร" : "Application steps"}
            </h2>
            <ol className="mt-5 divide-y divide-zinc-300 border-b border-zinc-300">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4 py-5">
                  <span className="shrink-0 font-display text-2xl font-bold tabular-nums text-[#2457d6]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-zinc-700">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-7 text-zinc-600">
              {isThai
                ? "การส่งใบสมัครยังไม่เปิดสิทธิ์ราคาส่งทันที ทีม PK จะตรวจสอบข้อมูลและติดต่อกลับก่อน ร้านไม่ต้องส่งเอกสารเครดิตหรือ KYC ในขั้นตอนนี้"
                : "Submitting an application does not instantly unlock wholesale access. PK reviews the details and contacts you first; credit or full KYC documents are not required here."}
            </p>
            <a
              href={CONTACT.LINE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#2457d6] underline underline-offset-4"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {isThai
                ? "ต้องการคุยก่อน? ทักทีม PK ทาง LINE"
                : "Want to talk first? Message PK on LINE"}
            </a>
          </aside>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
