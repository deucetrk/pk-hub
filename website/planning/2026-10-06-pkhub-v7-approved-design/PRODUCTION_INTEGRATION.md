# PK HUB V7 production integration

The owner requested production publication on 2026-10-06 after the reviewed V7 checkpoint was committed and pushed. This release merges reviewed commit b2e8f42de8eb61d9e6cba1e857ccbd95d1581621 into production main at 4b3dc929000c12b9ca49c869a7b6d9eeb6a72726.

## Preserved production behavior

Current application intake, submitted-draft review, duplicate and pending guards, form bootstrap containment, hydration handling, route loading/error recovery, static 404, journal claim restrictions and revision.json remain from main. V7 navigation and compact footer apply to Home and Partner Marketing; other public routes retain their established navigation/footer presentation. Route recovery uses the established header. Journal and pre-hydration contact links now target the new homepage sections; the former proof-section link invites a conversation about operating evidence instead of pointing at a removed section.

The approved white homepage, product imagery, services and simultaneous Marketing counters retain the reviewed V7 composition and owner-confirmed numeric meanings. Provider operations, protected Dealer/Commerce surfaces and backend configuration are unchanged.

## Pre-release validation

Typecheck, lint, build and SEO validation passed. The SEO check retains production assertions for inert prerendered forms and the bilingual static 404. All 55 rendered cross-page fragment links resolve to actual section IDs. Thai/English Home and Marketing, Thai Join, Journal and static 404 were checked at desktop and 390px with one H1 and contained page width; loaded images were intact. The first Join desktop measurement returned a transient 390px width and was repeated after viewport observation, confirming 1440px without overflow.

Release evidence is retained locally under /Users/deuce/.codex/visualizations/2026/10/05/01a10b14-c276-78e0-88be-8f73ac73e959/production-v7/. Hosted acceptance requires the production revision to match the resulting merge commit and live route/content/browser checks after Vercel is ready. No real lead is submitted during release verification.

## Rollback

Prior main is 4b3dc929000c12b9ca49c869a7b6d9eeb6a72726. Revert the release merge with its first parent and use the same connected pipeline if rollback becomes necessary; do not overwrite unrelated repository history.
