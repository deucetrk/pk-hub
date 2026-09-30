# PK HUB Public Design Direction

Status: canonical public-site design direction
Owner accepted: 2026-09-20; Apple-inspired layout and expressive motion selected 2026-09-30
Last verified: 2026-09-20 production desktop and 390px public acceptance at `pkhub.co`

This document governs the public PK HUB website only. Dealer Portal and PK Commerce remain separate
products and deployments. Public PK HUB explains the relationship, shows real operating proof, and
routes a retailer into application or conversation. It does not own protected commerce truth.

## Visual thesis

**A Thai wholesale trade journal with Apple-inspired editorial scale and deliberate motion.**
Cobalt `#2457d6`, carbon `#1b1c19`, white, authentic PK photography, thin dividers, and generous
space should make the site feel established and human. This is a complete layout and interaction
redesign across the public journey. Expressive motion emphasizes the hero and editorial transitions,
while remaining readable without animation. Preserve truthful claims and approved conversion
boundaries. Avoid generic SaaS composition, consumer phone-store claims, and speculative services.

## Reference interpretation

| Reference                                                                        | Borrow                                                                                               | Do not copy                                                                             |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Apple Design](https://developer.apple.com/design/)                              | Editorial type and image scale, generous space, purposeful motion, quiet controls                      | Apple marks, assets, product claims, or platform-only UI conventions                      |
| [Ant Design](https://ant.design/docs/spec/values/)                               | Ordered hierarchy, restrained functional color, consistent controls, legible form guidance           | Admin navigation, dashboard cards, or dense enterprise chrome                            |
| [Faire](https://mobbin.com/screens/63f8c31f-e379-484b-bfe5-37615064fc25)         | Product-led wholesale promise, editorial image hierarchy, category discovery, simple conversion path | Fashion palette, consumer merchandising, marketplace claims                             |
| [Klook Partner](https://mobbin.com/screens/ed33965d-0fcd-4084-b7a4-8fec6cf27d44) | Partner explanation, proof before application, understandable journey                                | Unsupported reach, scale, or partner-benefit claims                                     |
| [Airtasker](https://mobbin.com/screens/279eb3cd-59e0-4169-b80a-883e65f4313b)     | Short benefit-led sections and product explanation beside a concrete visual                          | Marketplace metrics, pricing, or service mechanics                                      |

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

- Hero copy and photography enter in a staged sequence with reduced-motion support.
- Real imagery may gain slight depth on hover-capable devices; no parallax or scroll-jacking.
- The Portal illustration may transition between three truthful tasks. It never displays actual
  price, stock, dealer, or order data.
- Navigation, forms, accordions, and language switching prioritize visible focus and direct state
  changes over decorative animation.
- Rework the full prospect journey—navigation, proof order, application steps, field guidance,
  validation, confirmation, and Dealer login handoff—without changing referral attribution,
  application review, account approval, or access rules.

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

| Item                               | Decision                        | Reason                                                                         |
| ---------------------------------- | ------------------------------- | ------------------------------------------------------------------------------ |
| Homepage `PK Intelligence` concept | Removed from mounted experience | Not a current public service; dilutes the real partner path                    |
| Homepage financing concepts        | Removed from mounted experience | No owner-approved offer, eligibility, or provider contract belongs on the page |
| `StatsSection.tsx`                 | Deleted with owner approval     | Duplicate metric hierarchy did not support the evidence-led page sequence      |
| `EditorialInterludeSection.tsx`    | Deleted with owner approval     | Generated interlude duplicated the real-photo narrative and was never mounted  |

## Agent implementation contract

1. Read `AGENTS.md`, this file, `src/pages/Home.tsx`, the affected page, and its current CSS.
2. Verify claims against owner-approved content or existing production truth; fail closed when not
   available.
3. Keep the selected cobalt/black/white palette and editorial type hierarchy; use Apple-inspired
   composition and expressive, meaningful motion. Retain clear labels and feedback. Do not add a
   UI library or animation library.
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
- Release `c7d6375` is production-active through Vercel deployment
  `dpl_2S5UP4zYh6nTfnEEmi2nN5t8dH4z` on `https://pkhub.co` and `https://www.pkhub.co`.
- Live `/th`, `/en`, `/th/join`, `/th/dealer/login`, and `/th/blog` return `200`; an unknown route
  returns `404`; the Thai homepage canonical is `https://pkhub.co/th`.
- Live 390 x 844 acceptance confirms contained document width, completed hero entrance motion, and
  an accessible mobile menu with language, content, LINE, application, and Dealer Portal routes.
- The current full-layout and conversion-flow redesign is local and has not been deployed. On
  2026-09-30, `npm run check`, `npm run lint`, `npm run build`, and `npm run seo:validate` passed;
  Thai/English home, application, and Dealer gateway pages plus the Thai journal were reviewed at
  desktop/mobile widths. The build still reports the existing 530 KB JavaScript chunk warning.
- The homepage hero now places its authentic storefront image beside the partner message within the
  first desktop viewport, then stacks the same content on mobile. Local browser review covered Thai
  and English at 1280px desktop and 390px mobile, plus English at 1024px; each state retained a
  single H1 and had no document overflow. The 2026-09-30 local `check`, `lint`, `build`, and
  `seo:validate` passed after this composition change. The 530 KB chunk warning remains; this is
  local visual and static evidence, not a production release or performance measurement.
- The homepage closing contact section now uses an editorial two-column conversation and enquiry
  layout on desktop and a stacked layout at 390px. Thai and English were inspected in the local
  browser; contact links and the existing partner form remain present, and neither language had
  horizontal overflow at 390px. Local `check`, `lint`, `build`, and `seo:validate` passed. Form
  submission was not exercised because it would create a lead; the 531 KB chunk warning remains.
- On 2026-10-01, the partner form's success and uncertain-result copy was aligned with its existing
  `no-cors` Apps Script transport: a resolved fetch cannot prove that a lead was recorded, while a
  timeout can occur after delivery. The form now advises LINE confirmation before resending an
  uncertain request, announces the error, and uses a sent icon instead of a confirmed-success
  checkmark. Local `check`, `lint`, `build`, and `seo:validate`
  passed; `/th/join` was reviewed at 390px and `/en/join` at 390px and 1280px with no document
  overflow. No form was submitted and neither result message was visually exercised, because that
  would write a lead. The existing 532 KB client chunk warning remains.
- The shared Join/home partner form now opens the optional section when an entered email fails
  validation, exposes its error, and focuses the first invalid field on submit. Thai and English
  `/join` routes were exercised locally with the optional section collapsed; a case with only the
  email invalid focused that field after reopening. No lead request was sent. At 390px the form
  remained within the viewport; English was also inspected at 1280px. `check`, `lint`, `build`, and
  `seo:validate` passed on 2026-10-01. The client chunk warning remains at 532 KB. Prettier on
  `PartnerForm.tsx` reports the file's existing quote/semicolon style difference from repository
  Prettier defaults; the component was not broadly reformatted.
- The public Dealer gateway now uses the real storefront as a full-bleed visual anchor and separates
  approved-account sign-in from a new retailer application. The Portal CTA stays in the first
  390px mobile viewport; Thai/English mobile and Thai desktop rendered with one H1 and no document
  overflow. The English keyboard skip link focused the main content. The links still use the
  existing configured Portal URL and referral-preserving Join URL. Local `check`, `lint`, `build`,
  and `seo:validate` passed on 2026-10-01; the 533 KB chunk warning remains. No Dealer account was
  used, and this checkout is not deployed.
- The Join page now opens with a real PK store-interior image and a shorter application heading.
  On mobile, the form begins in the first viewport and the single application-steps list follows
  it in visual and reading order; desktop keeps the form beside the editorial introduction. Thai
  and English mobile plus Thai desktop were rendered with one H1 and no horizontal overflow. The
  English keyboard skip link focused main content, the form shortcut reached its anchor, and an
  empty submit focused the first invalid field without sending a lead. Local `check`, `lint`,
  Prettier on `Join.tsx`, `build`, and `seo:validate` passed on 2026-10-01. The 534 KB chunk warning
  remains; actual lead delivery and the production page were not verified.
- The shared partner form now labels the Join submission as an application for PK review in Thai
  and English, including its pending and sent-from-device states. Home and article enquiries retain
  their price-check action. The existing endpoint, request ID, referral data, and approval boundary
  did not change. Local browser review covered Join Thai/English CTA and the Thai 390px button,
  plus the distinct Home CTA; no lead was sent. `check`, `lint`, `build`, and `seo:validate` passed
  on 2026-10-01. Prettier still reports the pre-existing quote/semicolon style difference in
  `PartnerForm.tsx` and `SuccessCard.tsx`; neither file was broadly reformatted.
- On 2026-10-01, a local browser route pass covered all 13 mounted public paths at 390 x 844 and
  1280 x 800: Thai/English Home, Join, and Dealer gateway; the Thai Blog index; and all six Thai
  articles. Every route had one H1 and a main landmark, with no document-width overflow or broken
  image among images loaded during the pass. The Blog index and a representative article were also
  visually inspected at both widths; the browser reported no console errors. This closes the
  public-route layout sweep only. It does not verify every article section at every scroll position,
  lead delivery, live production content, or protected Dealer and staff journeys.
- The Blog index and article now expose the same keyboard skip link used by the other public routes.
  The index identifies the selected content group and topic with `aria-pressed`, announces its
  changing result heading, and gives its filter controls at least 44px height. At 390px, Tab/Enter
  focused the skip link and then the main landmark on both routes; the content-group filter exposed
  the pressed state and search retained focus while updating the result count. The Blog index was
  also viewed at 1280px without document overflow. `check`, `lint`, `build`, and `seo:validate`
  passed on 2026-10-01; the existing 535 KB client chunk warning remains. This is local only.
- Before releasing the redesigned journal, review the owner-approved iPhone example in
  `src/content/blog/published/openMobileShop.ts` against current commercial authority. It explicitly
  cites the PK HUB price sheet from 5 August 2026 and Apple retail prices observed on 11 August
  2026. Those figures were not updated during this UI pass and must not be presented as current
  order quotes.
- The dated iPhone pricing example now starts with a prominent historical-example notice before
  either price table and links to the existing LINE contact for a current price/stock check. Its
  numbers and source dates remain unchanged. The section rendered at 390px and desktop without
  overflow, and the link has a 44px target. The rebuilt preview retained the notice; `check`,
  `lint`, `build`, and `seo:validate` passed. Current commercial publication approval remains open.
- The six Thai articles were traversed from top to footer in the local browser at 390 x 844 and
  1280 x 800 on 2026-10-01. Each retained one H1/main, valid contents anchors, sources before its
  contact form, contained document width, and fully loaded images with no broken asset. The only
  wide comparison table was locally scrollable, but its prices were clipped on mobile. That one
  comparison now presents the same sourced rows and derived totals as an unboxed vertical list below
  1024px, retaining the desktop table above that width. The mobile source-price links have 44px
  targets. The commercial figures themselves did not change. `check`, `lint`, `build`, and
  `seo:validate` passed; the existing client bundle warning is about 537 KB. No lead was sent and
  no production deployment occurred.
- The Home, Join, and Dealer gateway opening motion now starts with readable copy instead of fully
  transparent text. The stagger, brand reveal, and photography transition remain. Their immediate
  390px frames and the Home desktop frame were inspected locally without horizontal overflow;
  `check`, `lint`, `build`, and `seo:validate` passed on 2026-10-01. This does not resolve the
  existing 537 KB client chunk warning or prove loaded-page performance.
- Public routes now load their page modules on demand while SSR passes the same components directly
  for all 13 prerendered paths. A small approved-slug manifest lets Home navigation show the Journal
  without importing six full article bodies. The initial client chunk fell from 537.00 KB (152.21 KB
  gzip) to 265.16 KB (88.29 KB gzip); route chunks load in addition as needed. If a route chunk
  cannot load, the prerendered content stays visible and a bilingual reload notice explains why
  controls are unavailable. The production build's 13 routes were inspected at 390px with working
  mobile menus and at 1280px for one H1 and contained width; Home tabs and Journal filters also
  responded after hydration. Browser error/warning logs were empty. `check`, `lint`, `build`,
  `seo:validate`, and `git diff --check` passed on 2026-10-01. No network timing, Core Web Vitals,
  lead delivery, or live production behavior was measured.
- Language switching on the public Dealer gateway now stays on the equivalent Thai/English gateway
  and preserves its query string. The mobile menu uses 44px language targets with visible keyboard
  focus. The local dev view was exercised in both directions at desktop and at 390px mobile, and
  the rebuilt production preview preserved the gateway and query at 390px. The 13 prerendered
  routes passed `check`, `lint`, `build`, and `seo:validate`. This does not exercise the protected
  Dealer Portal after the gateway handoff.
- The shared partner form now focuses its sent-from-device heading when a local submission replaces
  the form, then returns focus to the first field when starting another entry. A synthetic Thai Join
  request was sent only to a localhost 204 responder; the resulting heading received focus. With
  that responder stopped, the retry showed the existing uncertain-delivery alert; restoring it and
  retrying showed the result with focus again. Node 24 `check`, `lint`, `build`, and `seo:validate`
  pass. These observations do not prove Google Apps Script delivery, deduplication, or a 390px and
  desktop rendering of this final focus change. Join's checkbox still describes price and stock
  follow-up while the form presents itself as a partner application; owner-approved consent purpose
  and copy are needed before release.
- On 2026-10-01, the uncertain-delivery alert now receives visible keyboard focus after a failed
  synthetic Join submission to a deliberately unavailable localhost endpoint. Thai at 1280px and
  390px, and English at 390px, showed the alert in view without document overflow; the entered
  values and retry action remained present. Node 24 `check`, `lint`, `build`, and `seo:validate`
  pass. This verifies local error presentation only; no real lead delivery was attempted.
- The hosted Vercel PR #7 preview at `https://pk-omlqr0zzk-deucetrks-projects.vercel.app`
  corresponds to website commit `5493ccd` (deployment `6770938552`), not production. On
  2026-10-01, all 13 mounted public paths were inspected at 390 x 844 and 1280 x 800. Each had
  one H1/main landmark, no document overflow, and loaded images in the initial viewport after
  hydration. At 390px, the mobile menu switched Thai Home to English Home and closed, an empty
  Thai Join submit showed six field errors and focused the first field without sending a lead,
  and Journal search for `VAT` showed one result while retaining search focus; Back returned to
  Home. The Thai Dealer gateway linked to the configured Dealer login and Join routes. This is
  hosted public-preview evidence only: full-page image coverage, lead delivery, protected Dealer
  or staff sessions, commercial publication approval, and production release remain open.
- Journal search now replaces the current history entry as the query changes, so Back leaves the
  search instead of stepping through typed characters. Track and tag selections still create
  navigable history entries. The Thai Journal was exercised locally at 390px with a three-character
  query and at 1280px with a track filter; both showed the expected article count and contained
  document width. Node 24 `check`, `lint`, `build`, and `seo:validate` pass. This is local route
  behavior, not hosted or production acceptance.
