# AGENTS.md

Single-page B2B website for PK HUB (Thai smartphone wholesaler). All commands run from `applications/website/`.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Typecheck | `npm run check` (tsc -b --noEmit) |
| Lint | `npm run lint` |
| Production build | `npm run build` (runs tsc -b then vite build) |

No test suite exists. Verify changes by running `check` + `lint`.

## Architecture

- **React 18 + Vite 6 + TypeScript ~5.8 + Tailwind CSS 3** — no framework (Next.js etc.), just client-side SPA
- **Single route**: `App.tsx` renders one `Home` page composed of ~15 section components in `src/pages/home/`
- **i18n via URL path**: `/th` and `/en` routes. `LanguageContext` reads `location.pathname` — no i18n library, just `useLanguage()` hook returning `{ language, isThai }`. Add translations inline in components, not in separate files
- **Path alias**: `@/*` maps to `./src/*` (configured in tsconfig + vite-tsconfig-paths)
- **Form submission**: partner leads POST to a Google Apps Script endpoint (`VITE_PARTNER_LEAD_ENDPOINT` env var) using `fetch` with `mode: 'no-cors'`
- **Fonts**: Google Fonts CDN loads Anuphan (display) and IBM Plex Sans Thai (body) — loaded in `index.html`, no local font files

## Key conventions

- **TypeScript strict mode is OFF** — `strict: false`, `noUnusedLocals: false`, `noUnusedParameters: false`. Don't fight the config
- **Tailwind dark mode uses `class` strategy** but the site is currently light-only; all sections use hardcoded `bg-white text-black`
- **Utility function**: `cn()` from `src/lib/utils.ts` wraps `clsx` + `tailwind-merge` — use it for conditional class merging
- **PostCSS config is locked** — `postcss.config.js` has `WARNING: DON'T EDIT THIS FILE` comments; leave it alone
- **Static assets live in `public/`** — brand logos in `public/brands/`, store photos in `public/proof/` and `public/reviews/`

## Gotchas

- `src/services/partnerLeadSubmission.ts` throws at runtime if `VITE_PARTNER_LEAD_ENDPOINT` is unset — copy `.env.example` to `.env.local` before running `dev`
- The `vite-plugin-trae-solo-badge` devDependency and `babel-plugin-react-dev-locator` are IDE-specific — ignore them; they don't affect production
- SEO structured data (JSON-LD) lives inline in `index.html` — edit there, not in components
- When adding new page sections, follow the pattern: create `src/pages/home/<Name>Section.tsx`, import and place it in `src/pages/Home.tsx`
