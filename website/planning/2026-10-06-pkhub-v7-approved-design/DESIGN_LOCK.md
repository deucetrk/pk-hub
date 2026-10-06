# PK HUB V7 approved design

V7 is the owner-approved visual reference for the public homepage and the reviewed Partner Marketing composition. The intended result is a premium Partner ecosystem on a pure white canvas, with useful product interfaces and motion. Preserve the reference's hierarchy and proportions when translating it into React components.

## Identity and surfaces

| Token | Value | Use |
| --- | --- | --- |
| Page and section background | `#FFFFFF` | Every section and the hero |
| Primary ink | `#22242A` | Brand-compatible headings and primary CTA |
| Muted text | `#73767D` | Supporting copy |
| Thin structural rule | `#E7E8EC` | Dividers and quiet controls |
| PK accent | `#3155C6` | Active branch, selected controls and small emphasis |
| Messenger response blue | `#087FFF` | Dealer replies in the Stock illustration |
| Soft neutral | `#F5F6F8` | Small interface surfaces, not full section washes |

Use the real PK HUB logo with alpha and colored official brand marks. S Leasing uses the supplied navy/orange official logo. Preserve the existing LINE brand treatment where it identifies the actual channel. Do not turn the hero into a blue block, add cream section backgrounds or paint every service a different loud color.

## Type and spacing

Use **Anuphan** for display headings and **IBM Plex Sans Thai** for body/interface text. Preserve the reference's 400/500/600 weights. Do not substitute a font with different Thai metrics.

The desktop section container is 1240px. The desktop header is 80px high with 5% horizontal padding; mobile uses a 64px header. Main mobile content uses 22px horizontal gutters. Follow the reference's responsive rules around 699px and 360px; production pages use available width rather than shipping the preview's device selector or its optional 390px frame.

The hero heading uses `clamp(42px, 4vw, 59px)` on desktop; the mobile heading is 37px, falling to 31px at the narrowest breakpoint. Section headings are approximately 41–45px desktop and 33–34px mobile. Service row titles are 19px desktop and 16px mobile; body copy is 14–16px, with secondary annotations at least 11px. Marketing counters are a compact two-column pair, capped at 36px and scaled to fit their own columns. Do not restore the previous giant single counter with tabs.

Treat these values as the shared starting tokens and inspect rendered Thai text. Containers must grow with their content. In particular, do not give campaign headings or service bodies a fixed height that lets the headline overlap its caption or action.

## Hero and ecosystem

Keep the centered promise, primary Partner application CTA, secondary LINE action and Panoramic Ecosystem. The desktop diagram connects through PK HUB; selecting a capability updates its description and highlights its path, including the solid/dashed interaction. It does not navigate away merely because a node was selected.

The nine capabilities are smartphone supply, Stock on Demand, accessories, AIS connectivity, top-up, financing, Partner Marketing, after-sales coordination and device care/repair. Keep their conditional service meanings. Repair has no “coming soon” badge in the approved presentation and leads to an inquiry rather than a guaranteed fulfillment promise.

Keep the eight approved device brands: OPPO, vivo, Apple, Xiaomi, realme, HONOR, HUAWEI and Alldocube. Link Up by AIS remains part of the accessory offering. Do not add Samsung or remove a brand during the port.

## Product explanations

Stock on Demand presents a benefit on the left and a layered inventory/chat illustration on the right. The three steps are customer request, checking with PK, and continuing the sale. It preserves a dealer's sale opportunity and inventory flexibility; it does not center accessory attach economics. No actual prices, quantities or availability are invented.

One Customer remains an end-customer journey for a Partner's shop: phones/tablets, accessories, SIM/package and repeat top-up. Use the supplied transparent product assets. Remove no additional product objects from the images and do not redraw them as CSS phone outlines. Images retain their aspect ratios; any CSS crop removes only empty outer margin. The main mobile stage selectors use the approved readable 2×2 arrangement.

## Expandable services

The Store Potential section has a growth metric on the left and four full-width service rows on the right. This replaces the old 2×2 generic tool cards. Default to S Leasing Hub expanded; clicking another row switches the visual explanation, and clicking the open row closes it.

The rows are Accessories, S Leasing Hub, Care/Repair and Partner Marketing. The expanded Finance scene shows PK HUB connected to the actual S Leasing mark and clearly states that PK Hub is a Hub recruiting agents. Accessories reveal a real product set. Care shows an intake/coordination/follow-up diagram. Marketing reveals example campaign posts and links to the approved Marketing composition. All four options stay discoverable.

## Partner Marketing page

Keep the offer on the left and the native Instagram demonstration on the right. Emphasize only the word **ฟรี** with type weight and a thin underline. The service is free for all PK Hub Partners with no minimum purchase; central material can be used or adjusted by the shop.

Show **100,000 ยอดชม** and **1,000 ความคิดเห็น** together with thin blue left rules. Both count up simultaneously; there are no metric tabs. These are owner-confirmed publication figures from `approved-metrics.json`.

Use ABC Mobile, `abc.mobile` and the ABC avatar for the demonstration account. Use the transparent PK HUB mark at the upper-right of each post and the supplied white variant on dark artwork. Keep the nine campaign designs, highlights and local enlargement/close behavior. Describe campaign support and relevant timing; do not publish internal intelligence sources or formulas.

## Motion

| Interaction | Locked behavior |
| --- | --- |
| Hero and section entrance | Readable initial content; short staged motion; no blur or permanent hidden content |
| Stock chat | Incoming grey and outgoing blue bubbles; short typing/reply sequence |
| Customer stage | Intentional product entrance and content update after selection |
| AnimatedNumber | 2000ms count-up; commas; tabular digits; cancel superseded animation; announce the final value only |
| AIS SIM strip | 24s upright seamless horizontal loop; pause on hover/focus, tap and outside viewport |
| Service rows | Local expand/close and staged images; no automatic service switching |
| Hub connection | Small finite traveling dot showing the relationship, not an endless decorative effect |
| Reduced motion | Final numbers, static images and immediate state changes |

Use the existing Framer Motion setup and CSS where appropriate. Preserve native focus. Do not add scroll-jacking, auto-rotating paragraphs, a pause/play control or a new animation dependency.

## Allowed variation

Responsive wrapping, accurate English translation and semantic/accessibility changes may adapt to the actual website. Header, footer, CTA, typography, surfaces, product treatment and motion primitives stay shared. New product pages may use the approved offer-left/visual-right language after their review gate, but the Dealer Portal and PK Commerce are separate products and do not inherit this public homepage layout.
