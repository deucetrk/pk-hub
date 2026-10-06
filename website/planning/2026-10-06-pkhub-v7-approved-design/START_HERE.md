# PK HUB V7 implementation handoff

Implement the owner-approved V7 public homepage in the existing website. The owner approved all designs shown so far on 2026-10-06 and explicitly confirmed that the current headline metrics are real figures to use, rather than prototype metrics. Preserve the approved appearance, interactions and copy while connecting application and contact actions to the existing website.

The approved Partner Marketing composition is the only secondary page included as a destination for the homepage CTA. Build the homepage first and review its rendered implementation before expanding the design to other product pages. Deployment is a separate action and is not authorized by this handoff.

## Working directory and required reading

Work in `/Users/deuce/Desktop/PK Media/applications/website`.

Read these files in order:

1. `AGENTS.md` and the dated V7 override in `DESIGN.md`.
2. This file, `DESIGN_LOCK.md`, `OWNER_APPROVAL.md` and `approved-metrics.json` in this directory.
3. `reference/approved-v7.fragment.html` and open `reference/approved-v7.html` in a browser. Exercise every journey, service row and the Partner Marketing view. These are the approved visual and interaction references.
4. `src/pages/Home.tsx`, `src/components/Navbar.tsx`, `src/pages/home/constants.ts`, `src/index.css`, `src/lib/motion.ts`, `src/AppRoutes.tsx`, `src/entry-server.tsx` and `scripts/prerender.mjs`.
5. The affected homepage sections, the referral helper, existing Join flow and existing SEO validator.

The older T15b architecture package remains a reference for factual meanings and operational boundaries. V7 supersedes older visual instructions for the homepage and the approved Partner Marketing composition. Do not reinstate the customer portrait hero, a blue hero background, cream section backgrounds or the old four-card service grid.

## Preserve the current checkout

The checkout was already dirty when this handoff was prepared. Its observed branch is `codex/pkhub-editorial-redesign`, with HEAD `74f8b53bc85865275485aecd079bd93ad06c372f`. See `checkout-baseline.json` for the file snapshot. Recheck before editing; another agent may have continued work.

Keep the existing uncommitted work. Do not reset the checkout, restore the deleted files, remove another agent's files or reformat unrelated modules. Integrate through bounded edits to the current homepage components. The handoff itself changes documentation and copies reference assets; it does not implement the application.

Markdown planning files and `.agents/rules/*.md` are ignored by the repository's current `*.md` rule. They are available locally to Antigravity. The portable ZIP includes them; do not broadly change `.gitignore`. If a later task explicitly requests a documentation commit, add only the intended files with scoped force-adds.

## Approved page composition

Homepage: **Hero → Device portfolio → Stock on Demand → One Customer → Open your store's potential → Partner start → Footer**.

| Section | Required result | Current code starting point |
| --- | --- | --- |
| Hero and navigation | White centered promise, authentic PK HUB logo, Panoramic Ecosystem, primary Partner application and secondary LINE quote action | `HeroSection.tsx`, `Navbar.tsx` |
| Device portfolio | Colored official brand assets; spacious brand row; broad assortment copy | `BrandsSection.tsx`, `constants.ts` |
| Stock on Demand | Benefit on the left; layered inventory explanation and Messenger-like customer chat on the right; three local steps | `StockOnDemandSection.tsx` |
| One Customer | Four stages using transparent phones/tablets, accessories, official AIS SIM loop and a top-up counter | `OneCustomerSection.tsx` |
| Store potential | One growth metric at a time on the left; four expandable service rows on the right; default S Leasing Hub expanded | New `StorePotentialSection.tsx` using shared primitives |
| Partner start | Concise white closing section; real LINE, Join and existing Dealer gateway links | `ContactSection.tsx`, existing contact/referral helpers |
| Footer | Approved compact white footer with real PK HUB identity | `Footer.tsx` |
| Partner Marketing | Approved separate composition: offer left, ABC Mobile Instagram demonstration right, two counters together without tabs | Refactor `MarketingSection.tsx` into reusable `PartnerMarketingContent` and its page shell |

`Home.tsx` currently mounts Why, Proof, Process, FAQ and the full Marketing section. Replace the mounted homepage sequence with V7. Preserve their files if still used elsewhere. The homepage must not accumulate these older sections beneath the approved design. Reconcile homepage FAQ schema if FAQ content is no longer rendered; do not retain schema for invisible questions.

## Shared components and data

Use the existing React, Tailwind, Lucide and Framer Motion dependencies. No new UI kit or animation library is needed.

Create or reuse a small shared set: `SectionShell`, `SectionHeading`, `PartnerAction`, `AnimatedNumber`, `ServiceAccordion`, `ProductStage`, `CampaignPost` and the existing `LogoMark`. Share tokens, spacing and motion settings. The Partner Marketing page uses the same typography, CTA, counter and gallery primitives as the homepage.

Read `approved-metrics.json` into an appropriate typed content module. Preserve the values and semantic labels. The owner confirmation is the publication authority for these figures; do not replace them with fabricated alternatives, zero placeholders or demo warnings. Do not claim they came from a new analytics integration. The ABC Mobile profile and campaign artwork remain demonstrations of how a merchant can use the service; they are not a claim that PK owns that account or that every pictured promotion is currently on sale.

Use `asset-manifest.json` to copy the actual files from `assets/` into a scoped public directory such as `public/pkhub-v7/`. Use file URLs in React. Preserve transparency and original product proportions. Do not ship the reference's base64 asset object, `window.openai`, Tweak controls, Desktop/Mobile selectors or Homepage/Product Hero/Marketing preview selectors.

## Implementation tasks

| Task | Work | Done when |
| --- | --- | --- |
| V7-01 | Capture current diff, inspect the approved reference, establish tokens and asset mappings | Existing changes preserved; reference understood; shared primitives use `DESIGN_LOCK.md` |
| V7-02 | Port the approved homepage composition and owner-confirmed metrics | All six sections match V7, desktop and mobile; old sections are not appended |
| V7-03 | Port all interaction and motion behavior | Hero paths, three Stock steps, four customer stages, counters, SIM loop, accordion, dialogs and CTA actions work |
| V7-04 | Review the real homepage at all required widths and correct drift | Full and focused screenshots, interaction checks and project checks pass; owner can inspect actual React output |
| V7-05 | Complete the already-approved Partner Marketing page as the homepage CTA destination | Native route, profile/gallery, both counters and return/navigation behavior work; no dead links |
| V7-06 | Deliver a bounded implementation walkthrough | Changed files, checks, screenshots, remaining issues and exact local preview routes recorded; no deployment claimed |

V7-05 may reuse content components prepared during V7-02, but the homepage is the first visual checkpoint. Do not start additional Wholesale, Finance, Repair, SIM or ROM pages during these tasks. The Stock Product Hero reference is approved reusable composition for the later product-page wave, not an instruction to implement every product now.

## Route and CTA wiring

- Partner application uses the existing `/${language}/join` route through `withReferral`; submission remains subject to PK review and approval.
- LINE actions read `CONTACT.LINE_URL`, currently `https://lin.ee/VEgW6qG`, and `CONTACT.LINE_ID`, currently `@pkhub`. Replace the reference's local feedback messages with real anchors. Do not send a message while verifying a link.
- Existing Partners use the current `/${language}/dealer/login` gateway and its referral-preserving behavior.
- Service rows expand locally. Finance and Repair open concise inquiry details with a real LINE CTA. The Finance copy includes **PK Hub เป็น Hub รับสมัครตัวแทน S Leasing**; retain the provider's eligibility/area condition without inventing rates or approval guarantees.
- The approved Partner Marketing page uses `/th/products/partner-marketing` as the target architecture path. Add it consistently to routing, SSR page registration, prerendering and metadata when V7-05 is complete. Do not point a public CTA at an unimplemented route.
- `/en` must remain functional and use the same shared homepage composition with accurate English copy. Do not create an English-only dead link to a nonexistent translated product page. Preserve working Join, Dealer and Journal navigation.

No backend, inventory/pricing contract, authentication, application intake, attribution or Dealer Portal changes belong to this task. Stock and chat components explain the service; they do not become a fake live inventory application.

## Visual and interaction acceptance

Render the actual React implementation at **1440, 1280, 390 and 320px**. Also check English home at desktop and mobile. Capture full-page screenshots after traversing the page and focused screenshots of Hero, portfolio, Stock, every customer stage, every expanded service, Partner start/footer and Partner Marketing. Use JPEG evidence and make the local route explicit.

Check all nine ecosystem nodes, the solid/dashed active connection, all Stock stages, customer previous/next controls, the financing disclosure, both growth choices, all four accordion rows including close/reopen, Finance/Repair inquiries, Partner Marketing navigation, nine posts, story highlights, Escape/close/focus return, mobile navigation, language switching and every application/LINE/Dealer link. Exercise link destinations without creating a lead or sending a message.

Counters count up in two seconds with comma formatting and tabular digits; the screen reader receives only the final number. Both Marketing counters appear together and run together. The SIM strip is upright, seamless and 24 seconds per cycle; it pauses on hover/focus, tap and outside the viewport. No pause/play button is added. Reduced-motion mode shows final numbers and static SIM imagery.

There must be no document overflow, clipped labels, logo/headline overlap, rectangular image backgrounds or hard fixed-height marketing boxes. Keep native focus styles and approximately 44px touch targets. All page section backgrounds are white.

Run the repository checks after implementation:

```sh
npm run check
npm run lint
npm run build
npm run seo:validate
git diff --check
```

Update SEO assertions and schema to the approved new content when required; retain useful validation instead of disabling the validator. Passing these commands does not establish visual quality. If browser access fails, record rendered review as incomplete and preserve the implementation for owner inspection.

## Delivery and next gate

Return a walkthrough with the exact local preview URL, the changed-file list, validation results, the complete screenshot set and any unresolved defect. Separate implementation results from design approval and deployment. After the homepage implementation passes owner visual review, use the same locked components for the remaining product pages, starting with one representative page and checking homepage regression after shared-component changes.

The approved V7 reference and the package's metric confirmation are sufficient to begin. Do not ask the owner to reconfirm the same design or numbers. Ask only for a new decision that materially changes the approved scope or needs missing business information.
