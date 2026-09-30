import { ArrowDown, Check, MessageCircle } from "lucide-react";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import PartnerForm from "@/components/PartnerForm";
import { useReferralAttribution } from "@/hooks/useReferralAttribution";
import { useLanguage } from "@/i18n/LanguageContext";
import { JOIN_META, usePageMeta } from "@/lib/seo";
import Footer from "@/pages/home/Footer";
import { CONTACT } from "@/pages/home/constants";

export default function Join() {
  const { isThai, language } = useLanguage();
  const referralCode = useReferralAttribution();
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
        <section className="border-b border-zinc-300">
          <Container className="grid gap-x-16 gap-y-8 pb-12 lg:grid-cols-[0.82fr_1.18fr] lg:py-20">
            <div className="pk-join-intro self-start lg:col-start-1 lg:row-start-1">
              <figure className="pk-join-media relative -mx-5 mb-8 overflow-hidden bg-[#f4f7fb] sm:mx-0 sm:mb-9">
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
                  className="aspect-[16/9] w-full object-cover object-center lg:aspect-[4/3]"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-4 pt-10 text-xs font-semibold text-white sm:px-6">
                  {isThai ? "PK HUB · ฉะเชิงเทรา" : "PK HUB · Chachoengsao"}
                </figcaption>
              </figure>
              <p className="pk-eyebrow mb-5">
                {isThai
                  ? "สมัครเป็นร้านค้าพาร์ทเนอร์"
                  : "Become a retail partner"}
              </p>
              <h1 className="max-w-xl font-display text-4xl font-black leading-[1.16] tracking-[-0.035em] sm:text-5xl">
                {isThai ? "สมัครเป็นพาร์ทเนอร์กับ PK" : "Become a PK partner"}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg">
                {isThai
                  ? "การส่งใบสมัครยังไม่เปิดสิทธิ์ราคาส่งทันที ทีม PK จะตรวจสอบข้อมูลและติดต่อกลับก่อน ร้านไม่ต้องส่งเอกสารเครดิตหรือ KYC ในขั้นตอนนี้"
                  : "Submitting an application does not instantly unlock wholesale access. PK reviews the details and contacts you first; credit or full KYC documents are not required here."}
              </p>

              <a
                href="#partner-application-form"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-[#2457d6] underline decoration-[#8eaaf2] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2457d6] lg:hidden"
              >
                {isThai ? "ไปที่แบบฟอร์มสมัคร" : "Go to the application form"}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>

              {referralCode ? (
                <div className="mt-7 flex items-start gap-3 bg-[#eaf0ff] px-4 py-4 text-sm leading-6 text-zinc-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#2457d6]" />
                  <span>
                    {isThai
                      ? "ข้อมูลผู้แนะนำถูกเก็บไว้แล้ว และจะถูกส่งพร้อมใบสมัครเพื่อให้ทีม PK ตรวจสอบ"
                      : "Your referral context is retained and will be sent with the application for PK to verify."}
                  </span>
                </div>
              ) : null}

              <a
                href={CONTACT.LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-zinc-800 underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-800"
              >
                <MessageCircle className="h-4 w-4" />
                {isThai
                  ? "ต้องการคุยก่อน? ทักทีม PK ทาง LINE"
                  : "Want to talk first? Message PK on LINE"}
              </a>
            </div>

            <div
              id="partner-application-form"
              className="scroll-mt-20 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            >
              <h2 className="mb-4 font-display text-xl font-bold tracking-tight text-zinc-900">
                {isThai
                  ? "ข้อมูลร้านและผู้ติดต่อ"
                  : "Store and contact details"}
              </h2>
              <PartnerForm isApplication />
              <p className="mt-4 text-xs leading-6 text-zinc-500">
                {isThai
                  ? "ข้อมูลจะถูกใช้เพื่อติดต่อเกี่ยวกับการสมัครร้านค้าและการค้าส่งเท่านั้น"
                  : "Your details are used only to contact you about the retailer application and wholesale relationship."}
              </p>
            </div>
            <div className="border-t border-zinc-300 pt-7 lg:col-start-1 lg:row-start-2">
              <h2 className="text-sm font-bold text-zinc-800">
                {isThai ? "ขั้นตอนการสมัคร" : "Application steps"}
              </h2>
              <ol className="mt-3 divide-y divide-zinc-300 border-y border-zinc-300">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 py-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#8eaaf2] text-sm font-bold text-[#2457d6]">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm font-semibold leading-6 text-zinc-800">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
