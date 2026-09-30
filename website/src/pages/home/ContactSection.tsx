import { m } from "framer-motion";
import {
  ArrowUpRight,
  Facebook,
  MapPinned,
  MessageCircle,
  Phone,
} from "lucide-react";

import PartnerForm from "@/components/PartnerForm";
import Container from "@/components/Container";
import { useLanguage } from "@/i18n/LanguageContext";
import { revealViewport, useRevealMotion } from "@/lib/motion";

import { CONTACT, EASTERN_PROVINCES } from "./constants";

export default function ContactSection() {
  const { isThai } = useLanguage();
  const { container, item } = useRevealMotion();

  const provinces = isThai
    ? EASTERN_PROVINCES
    : [
        "Chonburi",
        "Rayong",
        "Chachoengsao",
        "Chanthaburi",
        "Trat",
        "Sa Kaeo",
        "Prachinburi",
      ];

  const contacts = [
    {
      label: isThai ? "โทรศัพท์" : "Phone",
      value: CONTACT.PHONE_DISPLAY,
      href: CONTACT.PHONE_TEL,
      icon: Phone,
    },
    {
      label: "Facebook",
      value: isThai ? "เพจธุรกิจ" : "Business page",
      href: CONTACT.FACEBOOK_URL,
      icon: Facebook,
    },
    {
      label: isThai ? "ที่อยู่" : "Address",
      value: isThai
        ? "72/29-30 ถ.ศุขประยูร ฉะเชิงเทรา"
        : "72/29-30 Sukprayoon Rd, Chachoengsao",
      href: CONTACT.MAPS_URL,
      icon: MapPinned,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-20 overflow-hidden bg-[#18181b] py-20 text-white sm:py-28"
    >
      <Container>
        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24"
        >
          <div className="min-w-0">
            <m.p
              variants={item}
              className="mb-7 text-xs font-bold uppercase tracking-[0.2em] text-[#90aaff]"
            >
              {isThai ? "เริ่มต้นคุยกัน" : "Start a conversation"}
            </m.p>
            <m.h2
              variants={item}
              className="max-w-[11ch] font-display text-[clamp(3.25rem,6vw,6rem)] font-black leading-[1.03] tracking-[-0.055em]"
            >
              {isThai
                ? "มีรุ่นที่หาอยู่? คุยกับทีม PK HUB"
                : "Looking for a model? Talk to PK HUB."}
            </m.h2>
            <m.p
              variants={item}
              className="mt-7 max-w-[34rem] text-base leading-[1.8] text-zinc-300 sm:text-lg"
            >
              {isThai
                ? "บอกแบรนด์หรือรุ่นที่อยากได้ ทีมขายช่วยเช็กราคา สต็อก และรอบส่งในเวลาทำการ"
                : "Tell us the brands or models you need and sales will check prices, stock, and dispatch rounds during business hours."}
            </m.p>

            <m.a
              variants={item}
              href={CONTACT.LINE_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 flex min-h-24 items-center justify-between gap-6 bg-[#2457d6] px-6 py-5 text-white transition-colors hover:bg-[#1d49ba] focus-visible:outline-offset-4 sm:px-8"
            >
              <span className="flex min-w-0 items-center gap-4">
                <MessageCircle
                  className="h-7 w-7 shrink-0 stroke-[1.5]"
                  aria-hidden="true"
                />
                <span className="grid min-w-0 gap-1">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                    LINE
                  </span>
                  <span className="break-words text-2xl font-black tracking-[-0.03em]">
                    {CONTACT.LINE_ID}
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="h-7 w-7 shrink-0 transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </m.a>

            <m.div variants={item} className="mt-8 border-t border-white/20">
              {contacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={
                      contact.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="group flex min-h-20 items-center justify-between gap-5 border-b border-white/20 py-4 text-white transition-colors hover:text-[#a8bbff]"
                  >
                    <span className="flex shrink-0 items-center gap-3 text-sm font-bold sm:text-base">
                      <Icon
                        className="h-5 w-5 stroke-[1.5]"
                        aria-hidden="true"
                      />
                      {contact.label}
                    </span>
                    <span className="min-w-0 text-right text-sm leading-6 text-zinc-300 group-hover:text-white">
                      {contact.value}
                    </span>
                  </a>
                );
              })}
            </m.div>

            <m.p
              variants={item}
              className="mt-8 max-w-[35rem] text-sm leading-7 text-zinc-400"
            >
              {isThai ? "พื้นที่ที่ดูแลเป็นหลัก: " : "Primary service area: "}
              <span className="text-zinc-200">{provinces.join(" · ")}</span>
              {isThai
                ? " และจัดส่งทั่วประเทศตามรอบขนส่ง"
                : " — plus nationwide delivery by dispatch round."}
            </m.p>
          </div>

          <m.div
            variants={item}
            className="min-w-0 self-start bg-white p-5 text-[#18181b] sm:p-8 xl:p-10"
          >
            <div className="mb-8 border-b border-zinc-200 pb-7">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#2457d6]">
                {isThai ? "ฝากข้อมูลร้าน" : "Store enquiry"}
              </p>
              <h3 className="font-display text-2xl font-black leading-[1.2] tracking-[-0.035em] sm:text-3xl">
                {isThai ? "ไม่สะดวกทักตอนนี้?" : "No time to chat now?"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base">
                {isThai
                  ? "ฝากข้อมูลร้านไว้ ทีมขายจะเช็กราคาและติดต่อกลับให้"
                  : "Leave your store details. Our sales team will check prices and get back to you."}
              </p>
            </div>
            <PartnerForm className="border-0 !p-0" />
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}
