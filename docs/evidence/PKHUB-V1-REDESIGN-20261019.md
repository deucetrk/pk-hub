# pkhub.co v1 redesign — implementation evidence (2026-10-19)

Source design: Paper `01M574A45Y9KY0KNPKJGP83B4Z`, boards 01–15 (owner-approved 2026-10-19).
Branch `claude/pkhub-v1-redesign` from `77c4f18`.

## Route mapping

| Board | Route | Notes |
| --- | --- | --- |
| 01 Home | `/th`, `/en` | sections `v1-brands`, `v1-growth`, `v1-stock`, `v1-marketing`, `v1-care`, `v1-start` |
| 02 Products | `/(th\|en)/products` | orbit becomes a pill list below 640px |
| 03 Devices | `/products/handset-wholesale`, `/products/accessories` | existing slugs kept (same template, different heading) |
| 04 Stock on Demand | `/products/stock-on-demand` | |
| 05 AIS SIM | `/products/ais-sim` | |
| 06 Online top-up (ROM) | `/products/ais-rom` | |
| 07 S Leasing | `/products/finance` | |
| 08 After-sales | `/products/after-sales`, `/products/repair` | |
| 09 Marketing (coming soon) | `/products/partner-marketing` | no follower/view counts |
| 10–11 Join + states | `/(th\|en)/join` | validation summary, sending, received, failed/retry, rate-limited, unavailable |
| 12 Contact | `/(th\|en)/contact` | new route, sitemap + rewrites |
| 13 Blog | `/th/blog` | existing index restyled |
| 14 Privacy | not shipped | design is a placeholder; needs approved legal text |
| 15 404 | static `404.html` + client route | bilingual |

## Deliberate deviations

- Hero chip "มีสื่อพร้อมใช้ มีทีมพร้อมคุย" became "มีทีมพร้อมคุยทุกวัน": marketing media is coming soon.
- FAQ questions whose answers are not owner-confirmed were removed (ROM minimum top-up, S Leasing
  customer documents, duplicate SOD question). Others answer only with confirmed facts.
- TikTok link omitted (handle unverified); Facebook and Instagram `@pkmedia168` verified.
- Consent text no longer references a privacy notice because none is published.

## Validation (Node 24.21.0)

`npm run check`, `npm run lint` (0 problems), `npm test` (pass), `npm run build`,
`npm run seo:validate` (PASS). Rendered review on the dev server at 1440×900 and 375×812: every
route above, Thai and English home, mobile menu, no horizontal overflow. Join states exercised
against a local mocked endpoint only (no real lead sent): retry reused the same request ID and
produced one receipt view with masked phone and short reference.

Not covered: physical devices, screen readers, real intake delivery.

## Release observation

PR #15 checks: GitHub `verify` and the Vercel pk-hub, website and applications previews all passed.
The PR merged as `3eecd30d17047d08fd120c93e8a99ef102ff4df9`. At 2026-10-18T19:37:53Z,
`https://pkhub.co/revision.json` returned that SHA. Production HTTP 200 for:
`/th`, `/en`, `/th/products` and its 9 service routes, `/th|en/join`, `/th|en/contact` and
`/th/blog`. `/th/nope` returned 404. The home HTML contains all six v1 section ids. A browser
check of `https://pkhub.co/th` at 1440px rendered the v1 hero. Rollback: Vercel instant rollback
to `77c4f18`, or revert the merge.
