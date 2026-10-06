# PK HUB V7 independent implementation review

Reviewed locally on 2026-10-06, Asia/Bangkok. The implementation is close to the approved V7 homepage, but the following regressions need correction before final visual acceptance. The approved designs and owner-confirmed figures remain accepted. This review did not change application source or deploy anything.

The real application was opened at `http://127.0.0.1:5173/th` and its Partner Marketing route. The browser tab at `http://127.0.0.1:5184/` is the older “Pkhub Visual Reset” prototype and must not be used as implementation evidence.

## Findings requiring correction

### High priority Restore the Partner Marketing headline

The implemented Marketing headline renders at **16px** on both 1440px desktop and 390px mobile. V7 uses an approximately 43px desktop / 34px mobile display heading. `PartnerMarketingPage.tsx:94` correctly promotes the heading to an H1, but `src/styles/pkhub-v7.css:129`, `:255` and the responsive copy at `:797` still style only `.v4-marketing h2`. The heading therefore loses its hierarchy and looks smaller than its supporting copy.

Keep one semantic H1 on the page and explicitly apply the approved heading styling to it. Recheck Thai and English at all four requested widths; do not switch back to a semantic H2 merely to inherit the old selector.

### High priority Restore the shared counter styling

The Marketing counters render at **16px**, rather than the approved compact display size of up to 36px. The top-up number also renders at **16px**, rather than 52px desktop / 46px mobile.

`src/components/pkhub-v7/AnimatedNumber.tsx:97-104` introduces an extra `<span className="inline-contents">` around the strong and live status. The class has no matching style. `.v6-social-stat > strong` at `src/styles/pkhub-v7.css:539` no longer matches, and `.v6-topup-number > span` at `:647` treats the counter wrapper as the small currency unit. The shared `[data-number]` type rule at `:574` is also skipped because the new strong has no such attribute.

Give the counter an explicit presentation contract that survives the React wrapper. Distinguish numeric output from the THB/unit label and preserve tabular digits, font family, sizing and reserved width. Keep a real measurable element for IntersectionObserver; changing the observed wrapper to `display: contents` can remove its layout box. Preserve the owner-approved values and working count-up behavior.

### Medium priority Restore shared Marketing navigation

The Marketing route has **zero header elements**. `src/pages/products/PartnerMarketingPage.tsx:73-86` starts directly with the backbar and never mounts Navbar. The approved Marketing composition retains the same PK HUB header, brand mark, language controls and Partner action as the homepage.

Reuse the shared header. Ensure its homepage section links resolve to the homepage when used from this route; simply adding Navbar with local `#v4-brands` / `#v4-stock` anchors would create dead destinations on Marketing. Preserve Join/referral behavior and both language routes.

### Medium priority Correct modal keyboard focus

Reproduction on Marketing: click post 0. Focus remains on the background post. Pressing Tab moves to post 1 behind the modal; it does not enter or stay within the dialog. Escape closes the preview, but opening it never focuses the close control and the page behind it remains keyboard reachable. See `src/pages/products/PartnerMarketingPage.tsx:46-65` and its conditional `role="dialog"` rendering.

Reproduction on the homepage: open the S Leasing inquiry and press Escape. The dialog disappears, but focus falls back to the page/body instead of returning to the inquiry CTA. `src/components/pkhub-v7/ServiceDialog.tsx:21-51` unmounts the dialog when service becomes null without maintaining an explicit trigger/focus-return contract.

Use a shared accessible dialog behavior: initial focus inside, containment while open, Escape and close behavior, and reliable focus return to the invoking control. Verify all service inquiries and all campaign posts, including story-highlight triggers.

### Medium priority Expose the growth counter announcement

The growth counter's `role="status"` has an `aria-hidden="true"` ancestor. `src/pages/home/StorePotentialSection.tsx:138-147` places the whole AnimatedNumber inside the hidden numeric line, so the live status created by the component is hidden too. Its final result is not available through the intended announcement.

Keep the decorative visual digits hidden if desired, but place the live announcement outside the hidden subtree. Announce only the final value, as required by the approved interaction contract.

## Checks completed

- `npm run check`, `npm run lint`, `npm run build`, `npm run seo:validate` and `git diff --check` passed during this review.
- Thai homepage was inspected at 1440, 1280, 390 and 320px: one H1, the approved section sequence, no document overflow and no overflowing block headings/copy in the sampled states.
- English homepage was checked at 1440 and 390px with no document overflow or broken visible images.
- All nine ecosystem selections, all three Stock steps, all four customer stages and all four service choices updated their states.
- Both approved Marketing counters ran and reached their approved targets; their typography is the regression, not their approved numeric values.
- Marketing was inspected at desktop and mobile. Its missing header and headline/counter sizes were confirmed from both rendered pixels and computed styles.
- Gallery Tab escape, initial-focus failure, service Escape/focus return and the hidden growth announcement were reproduced.

No lead was submitted, no LINE message was sent and no protected Dealer/Commerce operation was performed. OS reduced-motion emulation and a production deployment were not part of this pass.

## Next implementation pass

Correct only these regressions while preserving V7 and the existing uncommitted work. Reuse the current dependencies, keep the approved figures, and do not redesign the page or expand to other product pages.

After the fixes, rerun the five project checks and capture fresh rendered screenshots at 1440, 1280, 390 and 320px. Confirm the Marketing H1 and counter scale against the approved reference, verify the top-up numeral size, test header destinations and language switching, and test keyboard focus/announcements in every affected component. Return the local routes, screenshots and results for the final independent review; deployment remains a separate action.

Evidence files are in `/Users/deuce/.codex/visualizations/2026/10/05/01a10b14-c276-78e0-88be-8f73ac73e959/implementation-review/`: `marketing-1440.jpg`, `marketing-390.jpg`, `home-layout.json` and `interactions.json`.
