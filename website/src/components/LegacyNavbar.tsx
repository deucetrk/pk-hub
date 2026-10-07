import ProductNavigation from './navigation/ProductNavigation'
import { useEffect, useMemo, useRef, useState } from "react";

import { Menu, Store, X } from "lucide-react";
import { useLocation } from "react-router-dom";

import { publishedBlogSlugs } from "@/content/blog/publishedManifest";
import { useReferralAttribution } from "@/hooks/useReferralAttribution";
import { withReferral } from "@/utils/referralAttribution";
import { CONTACT } from "@/pages/home/constants";

import Container from "./Container";
import LanguageSwitch from "./LanguageSwitch";
import LogoMark from "./LogoMark";
import { useLanguage } from "@/i18n/LanguageContext";

type NavItem = { href: string; label: string };

export default function LegacyNavbar() {
  const [open, setOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const { isThai, language } = useLanguage();
  const location = useLocation();
  const referralCode = useReferralAttribution();
  const homePath = `/${language}`;
  const joinPath = withReferral(`/${language}/join`, referralCode);
  const dealerLoginPath = withReferral(
    `/${language}/dealer/login`,
    referralCode,
  );

  const items = useMemo<NavItem[]>(
    () =>
      isThai
        ? [
            { href: `${homePath}/products`, label: "สินค้าและบริการ" },
            { href: `${homePath}#v4-stock`, label: "โอกาสของร้านคุณ" },
            { href: `${homePath}#v4-start`, label: "ทีมช่วยดูแล" },
            ...(publishedBlogSlugs.length
              ? [{ href: "/th/blog", label: "บทความ" }]
              : []),
          ]
        : [
            { href: `${homePath}/products`, label: "Products & services" },
            { href: `${homePath}#v4-stock`, label: "Stock on Demand" },
            { href: `${homePath}#v4-start`, label: "Partner Team" },
          ],
    [homePath, isThai],
  );

  const primaryItems = useMemo<NavItem[]>(
    () => items.slice(0, isThai && publishedBlogSlugs.length ? 4 : 3),
    [isThai, items],
  );

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
    <header className="pk-glass-header sticky top-0 z-50 border-b border-zinc-300 bg-[var(--pk-white)]">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <a
            href={location.pathname === homePath ? "#top" : homePath}
            className="flex shrink-0 items-center"
            aria-label="PK HUB"
          >
            <LogoMark className="h-11 sm:h-12 w-auto shrink-0" />
          </a>

          <nav
            className="hidden items-center gap-5 xl:gap-7 xl:flex"
            aria-label={isThai ? "เมนู" : "Navigation"}
          >
            {primaryItems.map((it, index) => index === 0 ? <ProductNavigation key={it.href} /> : (
              <a
                key={it.href}
                href={it.href}
                className="whitespace-nowrap border-b-2 border-transparent pb-1 text-[0.95rem] font-bold text-zinc-700 transition-colors duration-150 hover:border-black hover:text-black"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitch />
            </div>
            <a
              href={joinPath}
              className="pk-action pk-action-primary hidden whitespace-nowrap lg:inline-flex"
            >
              {isThai ? "สมัครพาร์ทเนอร์" : "Become a partner"}
            </a>
            <a
              href={dealerLoginPath}
              className="hidden min-h-11 items-center justify-center gap-1.5 whitespace-nowrap px-2 text-sm font-bold text-zinc-700 transition-colors hover:text-zinc-950 xl:inline-flex"
            >
              <Store className="h-4 w-4" />
              {isThai ? "เข้าระบบค้าส่ง" : "Dealer login"}
            </a>
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-zinc-300 bg-[var(--pk-white)] text-[#18181b] transition-colors hover:bg-white xl:hidden"
              aria-label={
                open
                  ? isThai
                    ? "ปิดเมนู"
                    : "Close menu"
                  : isThai
                    ? "เปิดเมนู"
                    : "Open menu"
              }
              aria-controls="pkhub-mobile-navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="pkhub-mobile-navigation"
            className="grid max-h-[80vh] gap-2 overflow-y-auto xl:hidden"
            aria-label={isThai ? "เมนูมือถือ" : "Mobile navigation"}
          >
            <div className="mt-3 grid gap-2 rounded-md border border-zinc-300 bg-[var(--pk-white)] p-3">
              <div className="px-4 py-2 sm:hidden">
                <LanguageSwitch onChange={closeMenuAndRestoreFocus} />
              </div>
              {items.map((it, index) => index === 0 ? <ProductNavigation key={it.href} mobile onNavigate={() => setOpen(false)} /> : (
                <a
                  key={it.href}
                  href={it.href}
                  className="px-4 py-3 text-[0.95rem] font-semibold text-zinc-700 hover:bg-white hover:text-[#18181b]"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              ))}
              <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
                <a
                  href={CONTACT.LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pk-action border border-[#06c755] bg-[#06c755] text-white hover:border-[#05b34c] hover:bg-[#05b34c]"
                  onClick={() => setOpen(false)}
                >
                  {isThai ? "Inbox LINE มาเลย" : "Inbox us on LINE"}
                </a>
                <a
                  href={joinPath}
                  className="inline-flex items-center justify-center border border-zinc-300 bg-white px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-zinc-900 transition-colors hover:border-zinc-900"
                  onClick={() => setOpen(false)}
                >
                  {isThai ? "สมัครเป็นร้านค้าพาร์ทเนอร์" : "Become a retailer"}
                </a>
                <a
                  href={dealerLoginPath}
                  className="inline-flex items-center justify-center gap-1.5 border border-zinc-300 bg-white px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-zinc-900 transition-colors hover:border-zinc-900 sm:col-span-2"
                  onClick={() => setOpen(false)}
                >
                  <Store className="h-4 w-4" />
                  {isThai ? "เข้าระบบค้าส่ง" : "Dealer login"}
                </a>
              </div>
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
