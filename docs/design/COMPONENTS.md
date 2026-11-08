# PK HUB component inventory

Search this list before creating a component. A new reusable component is added here in the same
PR ([design loop DESIGN-001](https://github.com/deucetrk/PK-Commerce/blob/main/docs/foundations/DESIGN-001-PRODUCT-DESIGN-LOOP.md)).
Paths are under `website/src/components/`. The `v1/` set is current; the top-level files are
older shared pieces still in use.

| Component                     | Path                     | Use                                                |
| ----------------------------- | ------------------------ | -------------------------------------------------- |
| `PageShell`                   | `v1/PageShell.tsx`       | Page frame: header, footer, floating contact       |
| `SiteHeader`                  | `v1/SiteHeader.tsx`      | Top navigation, frosted after scroll               |
| `SiteFooter`                  | `v1/SiteFooter.tsx`      | Footer links and social                            |
| `ServiceHero` and blocks      | `v1/ServiceBlocks.tsx`   | Service page hero and content blocks               |
| `CtaBand`                     | `v1/CtaBand.tsx`         | Closing call-to-action band                        |
| `StickyJoin`                  | `v1/StickyJoin.tsx`      | Mobile join bar under 640 px                       |
| `BrandMark` and brand wall    | `v1/BrandWall.tsx`       | Brand logos and billboard rows                     |
| `CountUp`                     | `v1/CountUp.tsx`         | Owner-confirmed figures with reserved width        |
| `SodChatDemo`                 | `v1/SodChatDemo.tsx`     | Stock on Demand chat demo (labelled as an example) |
| `FloatingContact`             | `v1/FloatingContact.tsx` | LINE and phone floating buttons                    |
| `useReveal`                   | `v1/useReveal.ts`        | Reveal-on-scroll hook with reduced-motion guard    |
| Icons (`LineIcon` and others) | `v1/icons.tsx`           | Brand icons not in lucide-react                    |
| `PartnerForm`                 | `PartnerForm.tsx`        | Partner lead form and its states                   |
| `RouteFeedback`               | `RouteFeedback.tsx`      | Loading, error and not-found feedback for routes   |
| `WebpImage`                   | `WebpImage.tsx`          | WebP image with fallback and size hints            |
| `Container`                   | `Container.tsx`          | Width-limited content container                    |
| `HydrationReady`              | `HydrationReady.tsx`     | Marks hydration so motion starts only after it     |
