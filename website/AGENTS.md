# PK HUB website agent contract

Read the [root contract](../AGENTS.md), [goal](../GOAL.md) and [index](../docs/INDEX.md).
This scoped file adds implementation guidance. Commands below run from `website/` on Node 24.

| Task | Command |
| --- | --- |
| Develop | `npm run dev` |
| Type check | `npm run check` |
| Lint | `npm run lint` |
| Intake tests | `npm test` |
| Build client, SSR and prerendered routes | `npm run build` |
| SEO/truth contract after build | `npm run seo:validate` |

## Actual architecture and intake

React/Vite/TypeScript/Tailwind; [AppRoutes.tsx](src/AppRoutes.tsx) owns bilingual Home, Join,
Dealer gateway, products/services and Thai blog routes. Prerender and hydration must remain aligned.
Use the installed versions in [package.json](package.json); no framework migration is authorized.
Locale comes from the URL via LanguageContext. Reuse existing components and `cn()`.

[partnerLeadSubmission.ts](src/services/partnerLeadSubmission.ts) uses a CORS JSON request and
validates status, matching requestId, receivedAt and duplicate. It rejects missing configuration,
legacy Apps Script and known test endpoints. Configuration is read from VITE_PARTNER_INTAKE_URL
(with the legacy endpoint variable as fallback) and VITE_PARTNER_LEAD_PUBLIC_KEY. Never put a
secret/service key in a VITE variable. Missing configuration fails when submitting; preserve
truthful failure/recovery. [Tests](scripts/test-partner-lead.mjs) exercise the contract.
A verified intake receipt does not establish downstream contact, commercial approval or delivery.

## Design and validation

Read [DESIGN.md](DESIGN.md) and the
[V7 design lock](planning/2026-10-06-pkhub-v7-approved-design/DESIGN_LOCK.md) before UI work.
Owner-approved metrics/composition retain their exact meanings. Cobalt, carbon, white and approved
assets remain the public language. Do not invent stock, pricing, credit or delivery promises.
Public narrative and protected Dealer transactions have different owning contracts.

Run check, lint, test, build and seo:validate, then inspect relevant rendered desktop/mobile
states, keyboard, loading, failure/recovery, Thai copy and reduced motion. Source review alone
is not rendered proof. Do not send real leads for testing without current authorization.
SEO metadata is in src/lib/seo.ts, shared FAQ content in src/content/homeFaqs.ts, site JSON-LD in
index.html and article schema in the article component. Keep prerender output consistent.
Images need dimensions; lazy load below-fold media. Preserve the existing PostCSS configuration.
