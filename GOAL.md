---
task: PKHUB-SEO-001
status: in_progress
validation: local_passed
updated: 2026-10-20
---
# Active goal: rank pkhub.co for Thai wholesale-phone searches (SEO/AEO/GEO)

Owner request 2026-10-20: "the best SEO, AEO, GEO … get discovered and rank first".
[Evidence and keyword data](docs/evidence/PKHUB-SEO-20261020.md).

## Authority and boundary

Branch `claude/pkhub-seo-aeo`: head metadata, sitemap/indexing and `llms.txt` only, using claims
already published. Visible copy, hero, FAQ and the noindex review pages wait for owner decisions
below. Merging to `main` deploys pkhub.co and waits for the owner's go-ahead. Rollback: revert the
merge or Vercel instant rollback to `fb585c8`.

## Acceptance

- Home titles/descriptions use ขายส่งมือถือ; sign-in pages are noindex and out of the sitemap;
  `llms.txt` is published; Node 24 `check`, `lint`, `build`, `seo:validate` pass.
- After deploy: Search Console re-index request for `/th` and a recheck of the ranking table.

## Open owner decisions

1. Release the reviewed product pages (handset wholesale, accessories, AIS SIM) for indexing once
   their copy is approved — they match ขายส่ง iphone / ขายส่งซิม / ขายส่งอุปกรณ์มือถือ.
   Recommended.
2. Put ขายส่งมือถือ in the visible home hero (H1 or the line above it) — changes approved v1 copy.
3. Restore a visible home FAQ with FAQPage schema, using owner-confirmed answers only.
4. Official profile URLs (Google Business Profile, Instagram, TikTok, YouTube) for `sameAs`.

## Next action

Owner go-ahead to merge the branch PR, then request indexing for `https://pkhub.co/th` in Search
Console and answer the open decisions above.
