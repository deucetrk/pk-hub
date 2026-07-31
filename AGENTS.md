# AGENTS.md

Single-page B2B website for PK HUB (Thai smartphone wholesaler). All commands run from `applications/website/`.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Typecheck | `npm run check` (tsc -b --noEmit) |
| Lint | `npm run lint` |
| Production build | `npm run build` (tsc -b + vite client build + vite ssr build + prerender `/th` & `/en`) |

No test suite exists. Verify changes by running `check` + `lint`.

## Architecture

- **React 18 + Vite 6 + TypeScript ~5.8 + Tailwind CSS 3** — no framework (Next.js etc.)
- **Prerendered SPA**: build emits static `/th/index.html` and `/en/index.html` with full content baked in (so crawlers and AI engines can read it), then React hydrates on top via `hydrateRoot`. See `scripts/prerender.mjs` and `src/entry-server.tsx`
- **Two routes**: `App.tsx` -> `AppRoutes.tsx` renders one `Home` page composed of 8 section components in `src/pages/home/` — Hero, Brands (CSS marquee, keyframes in `src/index.css`), Proof, Stats, Why, Process, Faq, Contact (Contact also hosts the partner form)
- **i18n via URL path**: `/th` and `/en` routes. `LanguageContext` reads `location.pathname` — no i18n library, just `useLanguage()` hook returning `{ language, isThai }`. Add translations inline in components, not in separate files. Locale meta (title, description, canonical, og:url, og:locale) is per-locale in the prerendered HTML; client `useEffect` syncs it on locale switch
- **Path alias**: `@/*` maps to `./src/*` (configured in tsconfig + vite-tsconfig-paths)
- **Form submission**: partner leads POST to a Google Apps Script endpoint (`VITE_PARTNER_LEAD_ENDPOINT` env var) using `fetch` with `mode: 'no-cors'`
- **Fonts**: Google Fonts CDN loads Anuphan (display) and IBM Plex Sans Thai (body) — loaded in `index.html`, no local font files
- **Motion**: framer-motion's `LazyMotion` + `m` components (tree-shaken). See `src/lib/motion.ts` for reveal variants

## Key conventions

- **TypeScript strict mode is OFF** — `strict: false`, `noUnusedLocals: false`, `noUnusedParameters: false`. Don't fight the config
- **Tailwind dark mode uses `class` strategy** but the site is currently light-only; the palette is cool slate — light sections `bg-[#f8fafc]` (slate-50) / muted `bg-slate-100`, dark sections `bg-[#111827]` (slate-900), grays are `slate-*`, LINE green `#06c755` accent
- **Utility function**: `cn()` from `src/lib/utils.ts` wraps `clsx` + `tailwind-merge` — use it for conditional class merging
- **PostCSS config is locked** — `postcss.config.js` has `WARNING: DON'T EDIT THIS FILE` comments; leave it alone
- **Static assets live in `public/`** — brand logos in `public/brands/`, store photos in `public/proof/` and `public/reviews/`

## Gotchas

- `src/services/partnerLeadSubmission.ts` throws at runtime if `VITE_PARTNER_LEAD_ENDPOINT` is unset — copy `.env.example` to `.env.local` before running `dev`
- The `vite-plugin-trae-solo-badge` devDependency and `babel-plugin-react-dev-locator` are IDE-specific — ignore them; they don't affect production
- SEO structured data (JSON-LD) lives inline in `index.html` — edit there, not in components. Schema includes WholesaleStore, FAQPage, and VideoObject. `telephone` must be in E.164 form (no `*` placeholders)
- When adding new page sections, follow the pattern: create `src/pages/home/<Name>Section.tsx`, import and place it in `src/pages/Home.tsx`
- For prerender to work cleanly, every `<img>` should have `width`/`height` attributes (prevents CLS in the prerendered HTML) and `loading="lazy"` + `decoding="async"` below the fold. Keep `vite.config.ts` `sourcemap: false` for prod. Original media backups live in `media-originals/` (gitignored)
