import { ArrowRight, Lock, MessageCircle } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/pages/home/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { DEALER_LOGIN_META, usePageMeta } from "@/lib/seo";
import { useReferralAttribution } from "@/hooks/useReferralAttribution";
import {
  buildDealerPortalUrl,
  withReferral,
} from "@/utils/referralAttribution";
import { CONTACT } from "@/pages/home/constants";

const DEALER_PORTAL_BASE_URL =
  import.meta.env.VITE_DEALER_PORTAL_BASE_URL ?? "https://dealer.pkhub.co";

export default function DealerLogin() {
  const { isThai, language } = useLanguage();
  const referralCode = useReferralAttribution();
  usePageMeta(DEALER_LOGIN_META[language]);

  const portalUrl = buildDealerPortalUrl(
    DEALER_PORTAL_BASE_URL,
    referralCode,
    "/login",
  );
  const joinUrl = withReferral(`/${language}/join`, referralCode);

  return (
    <div className="min-h-dvh bg-[var(--pk-white)] text-[#18181b]">
      <a href="#main-content" className="pk-skip-link">
        {isThai ? "ข้ามไปเนื้อหา" : "Skip to content"}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="grid border-b border-zinc-300 lg:min-h-[calc(100svh-78px)] lg:grid-cols-[1.04fr_0.96fr]">
          <figure className="pk-gateway-media relative min-h-[230px] overflow-hidden bg-[#1b1c19] sm:min-h-[330px] lg:min-h-[660px]">
            <img
              src="/proof/storefront-entrance.webp"
              alt={
                isThai
                  ? "ทางเข้าหน้าร้าน PK HUB ฉะเชิงเทรา"
                  : "PK HUB storefront entrance in Chachoengsao"
              }
              width={1000}
              height={1333}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" aria-hidden="true" />
            <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-12 lg:left-12 lg:right-12">
              <span className="font-display text-2xl font-black tracking-[-0.035em] sm:text-4xl">
                PK HUB<span className="text-[#8eaaf2]">.</span>
              </span>
              <span className="max-w-40 text-right text-xs font-semibold leading-5 sm:max-w-none">
                {isThai ? "หน้าร้านจริง · ฉะเชิงเทรา" : "Our storefront · Chachoengsao"}
              </span>
            </figcaption>
          </figure>

          <div className="flex items-center bg-[var(--pk-white)] px-5 py-9 sm:px-10 sm:py-14 lg:px-[clamp(3rem,6vw,7rem)] lg:py-20">
            <div className="pk-gateway-copy w-full max-w-xl">
              <p className="pk-eyebrow">
                {isThai ? "สำหรับร้านค้าที่ได้รับสิทธิ์แล้ว" : "For approved retail partners"}
              </p>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[clamp(3rem,4.3vw,4.75rem)]">
                {isThai ? "เข้าสู่ระบบค้าส่ง" : "Wholesale access"}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
                {isThai
                  ? "ใช้บัญชีร้านค้าที่ทีม PK อนุมัติแล้ว เพื่อดูราคาของร้าน ตรวจสอบสินค้า และติดตามคำสั่งซื้อ"
                  : "Use the store account approved by PK to view your prices, check products, and follow orders."}
              </p>

              <a
                href={portalUrl}
                className="pk-gateway-primary mt-8 inline-flex min-h-14 w-full items-center justify-between gap-4 bg-[#2457d6] px-6 text-base font-bold text-white hover:bg-[#1946b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2457d6]"
              >
                {isThai ? "ไปยัง Dealer Portal" : "Open Dealer Portal"}
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </a>
              <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-zinc-600">
                <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>
                  {isThai
                    ? "ราคาและคำสั่งซื้อแสดงเฉพาะร้านที่ได้รับการอนุมัติ การสมัครยังไม่เปิดสิทธิ์เข้าใช้งานทันที"
                    : "Prices and orders are shown only to approved stores. Applying does not grant immediate access."}
                </p>
              </div>

              <div className="mt-10 border-t border-zinc-300 pt-7">
                <p className="text-sm font-semibold text-zinc-800">
                  {isThai ? "ยังไม่ได้รับสิทธิ์?" : "Need wholesale access?"}
                </p>
                <a
                  href={joinUrl}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#2457d6] underline decoration-[#2457d6]/40 underline-offset-4 hover:decoration-[#2457d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2457d6]"
                >
                  {isThai ? "สมัครเป็นร้านค้าพาร์ทเนอร์" : "Apply to become a retail partner"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={CONTACT.LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-zinc-700 underline decoration-zinc-400 underline-offset-4 hover:text-zinc-950 hover:decoration-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2457d6]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {isThai ? "หรือคุยกับทีม PK ทาง LINE" : "Or talk to PK on LINE"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
