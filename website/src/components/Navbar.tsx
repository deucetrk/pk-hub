import {useAcquisitionContext} from '@/hooks/useAcquisitionContext'
import ProductNavigation from './navigation/ProductNavigation'
import { isProductRoute } from '@/content/productServices'
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Store, X } from "lucide-react";
import { useLocation } from "react-router-dom";

import { publishedBlogSlugs } from "@/content/blog/publishedManifest";
import { useReferralAttribution } from "@/hooks/useReferralAttribution";
import { withReferral } from "@/utils/referralAttribution";
import LanguageSwitch from "./LanguageSwitch";
import LegacyNavbar from "./LegacyNavbar";
import { useLanguage } from "@/i18n/LanguageContext";

function V7Navbar() {
  const [open, setOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const { isThai, language } = useLanguage();
  const location = useLocation();
  const referralCode = useReferralAttribution();
  const homePath = `/${language}`;
  const isHome =
    location.pathname === homePath ||
    location.pathname === `${homePath}/` ||
    location.pathname === '/' ||
    location.pathname === '';
  const sectionHref = (hash: string) => (isHome ? hash : `${homePath}${hash}`);
  const joinPath = withReferral(`/${language}/join`, referralCode);
  const dealerLoginPath = withReferral(`/${language}/dealer/login`, referralCode);

  function closeMenuAndRestoreFocus() {
    setOpen(false);
    requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenuAndRestoreFocus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header className="v4-header pk-glass-header">
        <a
          href={isHome ? "#top" : homePath}
          className="flex shrink-0 items-center cursor-interaction"
          aria-label="PK HUB"
        >
          <img
            src="/pkhub-v7/brands/logo.png"
            alt="PK HUB"
            width={135}
            height={45}
            className="w-[135px] h-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </a>

        <nav aria-label={isThai ? "เมนู" : "Navigation"}>
          <ProductNavigation />
          <a href={sectionHref("#v4-stock")} className="cursor-interaction">
            {isThai ? "โอกาสของร้านคุณ" : "Stock on Demand"}
          </a>
          <a href={sectionHref("#v4-start")} className="cursor-interaction">
            {isThai ? "ทีมช่วยดูแล" : "Partner Team"}
          </a>
          {isThai && publishedBlogSlugs.length ? (
            <a href="/th/blog" className="cursor-interaction">
              บทความ
            </a>
          ) : null}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          <a
            href={joinPath}
            className="v4-nav-cta cursor-interaction"
          >
            <span>{isThai ? "เริ่มเป็นพาร์ทเนอร์" : "Become a Partner"}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="v4-menu cursor-interaction"
            aria-label={
              open
                ? isThai
                  ? "ปิดเมนู"
                  : "Close menu"
                : isThai
                  ? "เปิดเมนู"
                  : "Open menu"
            }
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="v4-mobile-menu">
          <div className="py-2 mb-2 border-b border-zinc-200/80 sm:hidden">
            <LanguageSwitch onChange={closeMenuAndRestoreFocus} />
          </div>
          <ProductNavigation mobile onNavigate={() => setOpen(false)} />
          <a
            href={sectionHref("#v4-stock")}
            className="cursor-interaction"
            onClick={() => setOpen(false)}
          >
            {isThai ? "โอกาสของร้านคุณ" : "Stock on Demand"}
          </a>
          <a
            href={sectionHref("#v4-start")}
            className="cursor-interaction"
            onClick={() => setOpen(false)}
          >
            {isThai ? "ทีมช่วยดูแล" : "Partner Team"}
          </a>
          {isThai && publishedBlogSlugs.length ? (
            <a
              href="/th/blog"
              className="cursor-interaction"
              onClick={() => setOpen(false)}
            >
              บทความ
            </a>
          ) : null}
          <div className="mt-3 pt-3 border-t border-zinc-200/80 flex flex-col gap-2">
            <a
              href={joinPath}
              className="flex items-center justify-between font-medium text-zinc-900 cursor-interaction"
              onClick={() => setOpen(false)}
            >
              <span>{isThai ? "เริ่มเป็นพาร์ทเนอร์" : "Become a Partner"}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href={dealerLoginPath}
              className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 cursor-interaction pt-1"
              onClick={() => setOpen(false)}
            >
              <Store size={14} aria-hidden="true" />
              <span>{isThai ? "พาร์ทเนอร์เดิม: เข้า Dealer Portal" : "Existing Partners: Dealer Login"}</span>
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function Navbar() {
  useAcquisitionContext();
  const { pathname } = useLocation();
  const isV7Page = pathname === "/" || /^\/(th|en)\/?$/.test(pathname) ||
    isProductRoute(pathname);
  return isV7Page ? <V7Navbar /> : <LegacyNavbar />;
}
