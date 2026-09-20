# PK HUB Public Design Direction

Status: canonical public-site design direction
Owner accepted: 2026-09-20
Last verified: 2026-09-20 local desktop and 390px public acceptance; production release not performed

This document governs the public PK HUB website only. Dealer Portal and PK Commerce remain separate
products and deployments. Public PK HUB explains the relationship, shows real operating proof, and
routes a retailer into application or conversation. It does not own protected commerce truth.

## Visual thesis

**A Thai wholesale trade journal with the clarity of a premium B2B marketplace.** Warm paper,
carbon ink, one cobalt action accent, authentic PK photography, thin dividers, and editorial scale
should make the site feel established and human. It must not resemble a generic SaaS page, consumer
phone store, or speculative technology pitch.

## Reference interpretation

| Reference | Borrow | Do not copy |
| --- | --- | --- |
| [Faire](https://mobbin.com/screens/63f8c31f-e379-484b-bfe5-37615064fc25) | Product-led wholesale promise, editorial image hierarchy, category discovery, simple conversion path | Fashion palette, consumer merchandising, marketplace claims |
| [Klook Partner](https://mobbin.com/screens/ed33965d-0fcd-4084-b7a4-8fec6cf27d44) | Partner explanation, proof before application, understandable journey | Unsupported reach, scale, or partner-benefit claims |
| [Airtasker](https://mobbin.com/screens/279eb3cd-59e0-4169-b80a-883e65f4313b) | Short benefit-led sections and product explanation beside a concrete visual | Marketplace metrics, pricing, or service mechanics |

References are pattern evidence, not PK visual identity or business authority.

## Content plan

1. **Hero:** PK HUB, one retailer promise, authentic storefront image, application and LINE actions.
2. **Supply proof:** brands and real operating imagery, with explicit current-information caveats.
3. **Dealer Portal explanation:** approved capabilities only—search, store pricing, reference stock,
   ordering, and status—using illustrative data rather than real commercial values.
4. **Operational proof:** storefront, packing, contact, and location.
5. **Application path:** what the retailer submits, what PK reviews, and when access begins.
6. **FAQ and contact:** answer real acquisition questions and hand off to people.

Do not publish speculative intelligence, financing, credit, delivery, pricing, inventory, or access
capabilities before owner-approved claims and owning contracts exist.

## Interaction thesis

- Hero copy and photography enter once with reduced-motion support.
- Real imagery may gain slight depth on hover-capable devices; no parallax or scroll-jacking.
- The Portal illustration may transition between three truthful tasks. It never displays actual
  price, stock, dealer, or order data.
- Navigation, forms, accordions, and language switching prioritize visible focus and direct state
  changes over decorative animation.

## Page rules

- `/th` and `/en`: poster-like first viewport, then evidence-led sections; one primary conversion
  action per section.
- `/th/join` and `/en/join`: persistent labels, explicit review/approval boundary, no promise that
  submission grants access.
- Dealer login gateway: explain where approved dealers sign in and where new retailers apply; it
  never becomes a second authenticated portal.
- Blog index/article: preserve Trade Journal hierarchy, readable Thai line length, source-aware
  practical content, and a non-obstructive LINE handoff.
- Mobile: no floating control may obscure reading or form actions; imagery crops intentionally;
  tap targets remain at least 44px.

## Removal register

| Item | Decision | Reason |
| --- | --- | --- |
| Homepage `PK Intelligence` concept | Removed from mounted experience | Not a current public service; dilutes the real partner path |
| Homepage financing concepts | Removed from mounted experience | No owner-approved offer, eligibility, or provider contract belongs on the page |
| `StatsSection.tsx` | Deleted with owner approval | Duplicate metric hierarchy did not support the evidence-led page sequence |
| `EditorialInterludeSection.tsx` | Deleted with owner approval | Generated interlude duplicated the real-photo narrative and was never mounted |

## Agent implementation contract

1. Read `AGENTS.md`, this file, `src/pages/Home.tsx`, the affected page, and its current CSS.
2. Verify claims against owner-approved content or existing production truth; fail closed when not
   available.
3. Reuse the palette and type hierarchy; do not introduce another visual system or animation library.
4. Run `npm run check`, `npm run lint`, `npm run build`, and `npm run seo:validate`.
5. Render affected Thai and English routes at desktop and 390px mobile. Check keyboard focus,
   reduced motion, overflow, loading/error/success states, and console errors.
6. Record exact routes, commands, unresolved warnings, and release state. A build is not production
   evidence; production requires the deployed revision and live-route verification.

## Current verification

- `npm run check`, `npm run lint`, `npm run build`, and `npm run seo:validate` pass.
- `/th` renders at desktop and 390px without horizontal overflow. Mobile navigation opens with an
  accessible label, and the three Portal illustration tabs update the selected task and panel.
- Reduced-motion fallbacks exist in `src/index.css` and `src/lib/motion.ts`.
- No production deployment or hosted-route verification was performed for this redesign slice.
