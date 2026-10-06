# AGENTS.md

Single-page B2B website for PK HUB (Thai smartphone wholesaler). All commands run from `applications/website/`.

Read [`DESIGN.md`](DESIGN.md) before changing public hierarchy, palette, motion, page composition, or commercial copy.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Typecheck | `npm run check` (tsc -b --noEmit) |
| Lint | `npm run lint` |
| Production build | `npm run build` (tsc -b + vite client build + vite ssr build + prerender `/th` & `/en`) |
| SEO/truth contract | `npm run seo:validate` (run after `build`) |

No unit-test suite exists. Verify changes with `check`, `lint`, `build`, and `seo:validate`, then
render the affected routes at desktop and 390px mobile.

## Architecture

- **React 18 + Vite 6 + TypeScript ~5.8 + Tailwind CSS 3** — no framework (Next.js etc.)
- **Prerendered SPA**: build emits static `/th/index.html` and `/en/index.html` with full content baked in (so crawlers and AI engines can read it), then React hydrates on top via `hydrateRoot`. See `scripts/prerender.mjs` and `src/entry-server.tsx`
- **Public routes**: `AppRoutes.tsx` serves bilingual Home, Join, and Dealer login gateways, plus Thai blog/index/article routes. Home uses Hero, a static Brands row, Why (trusted supply and an illustrative approved-Dealer Portal flow), Proof, Process, Faq, and Contact. Speculative intelligence/financing, the old Stats section, and the generated editorial interlude are removed. See `DESIGN.md` for current hierarchy, removals, and release boundaries.
- **i18n via URL path**: `/th` and `/en` routes. `LanguageContext` reads `location.pathname` — no i18n library, just `useLanguage()` hook returning `{ language, isThai }`. Add translations inline in components, not in separate files. Locale meta (title, description, canonical, og:url, og:locale) is per-locale in the prerendered HTML; client `useEffect` syncs it on locale switch
- **Path alias**: `@/*` maps to `./src/*` (configured in tsconfig + vite-tsconfig-paths)
- **Form submission**: partner leads POST to a Google Apps Script endpoint (`VITE_PARTNER_LEAD_ENDPOINT` env var) using `fetch` with `mode: 'no-cors'`
- **Fonts**: Google Fonts CDN loads Anuphan (display) and IBM Plex Sans Thai (body) — loaded in `index.html`, no local font files
- **Motion**: framer-motion's `LazyMotion` + `m` components (tree-shaken). See `src/lib/motion.ts` for reveal variants

## Key conventions

- **TypeScript strict mode is OFF** — `strict: false`, `noUnusedLocals: false`, `noUnusedParameters: false`. Don't fight the config
- **Public palette**: cobalt blue `#2457d6`, carbon `#1b1c19`, white, and restrained cool neutrals. LINE retains its own green. Public PK HUB follows the owner-selected Apple-inspired editorial direction with expressive, reduced-motion-safe transitions; the separate Dealer Portal remains a transactional product. Shared rules live in `src/index.css`; `LogoMark` uses `public/logo-transparent.png` with actual alpha.
- **Homepage scope**: communicate current wholesale supply, real proof, the reviewed partner path, and approved Dealer Portal capabilities. Do not advertise speculative intelligence, financing, credit, inventory, pricing, or delivery services before their owning contracts and owner-approved claims exist.
- **Utility function**: `cn()` from `src/lib/utils.ts` wraps `clsx` + `tailwind-merge` — use it for conditional class merging
- **PostCSS config is locked** — `postcss.config.js` has `WARNING: DON'T EDIT THIS FILE` comments; leave it alone
- **Static assets live in `public/`** — brand logos in `public/brands/`, store photos in `public/proof/` and `public/reviews/`

## Owner approved V7 override on 2026-10-06

For the homepage and reviewed Partner Marketing composition, follow
`planning/2026-10-06-pkhub-v7-approved-design/START_HERE.md`, `DESIGN_LOCK.md`,
`OWNER_APPROVAL.md` and `approved-metrics.json` (all four are in that planning directory).
The owner approved all V7 designs shown so far and
explicitly confirmed the current headline figures as real metrics to use. Older visual guidance in
this file and DESIGN.md is superseded within that scope: use a white Panoramic Ecosystem hero,
transparent product imagery, expandable service rows, the real S Leasing logo and PK Hub agent Hub
copy, and the approved simultaneous Marketing counters without tabs. Preserve their exact meanings.

The latest approval does not authorize invented inventory/prices, Tier 2/3 rates, lender approval
guarantees, backend changes or deployment. Keep the current uncommitted work. Implement the real
homepage first, capture rendered desktop/mobile evidence, and use shared primitives for later pages.

## Gotchas

- `src/services/partnerLeadSubmission.ts` throws at runtime if `VITE_PARTNER_LEAD_ENDPOINT` is unset — copy `.env.example` to `.env.local` before running `dev`
- The `vite-plugin-trae-solo-badge` devDependency and `babel-plugin-react-dev-locator` are IDE-specific — ignore them; they don't affect production
- SEO business/site/video JSON-LD lives in `index.html`; homepage FAQ text and matching schema share `src/content/homeFaqs.ts`. Article/breadcrumb schema lives in the article component. Route metadata comes from `src/lib/seo.ts` and prerendering. Run `npm run seo:validate` after builds. `telephone` must be in E.164 form (no placeholders).
- When adding new page sections, follow the pattern: create `src/pages/home/<Name>Section.tsx`, import and place it in `src/pages/Home.tsx`
- For prerender to work cleanly, every `<img>` should have `width`/`height` attributes (prevents CLS in the prerendered HTML) and `loading="lazy"` + `decoding="async"` below the fold. Keep `vite.config.ts` `sourcemap: false` for prod. Original media backups live in `media-originals/` (gitignored)
