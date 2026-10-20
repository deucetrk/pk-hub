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

Branch `claude/pkhub-seo-aeo`. Owner approved on 2026-10-20: release the handset, accessory and AIS
SIM pages for search; ขายส่งมือถือ in the visible hero; a visible home FAQ. Copy reuses facts already
published. Merging to `main` deploys pkhub.co and waits for the owner's go-ahead. Rollback: revert
the merge or Vercel instant rollback to `fb585c8`.

## Acceptance

- Home and released product pages lead with ขายส่ง keywords, carry visible FAQs with FAQPage
  schema, and are in the sitemap; sign-in pages are noindex; `llms.txt` is published.
- Node 24 `check`, `lint`, `build`, `seo:validate` pass; rendered check at desktop and 390px.
- After deploy: Search Console URL inspection and indexing requests, then a recheck of the
  ranking table in the [evidence](docs/evidence/PKHUB-SEO-20261020.md).

## Open owner decisions

1. Google Business Profile for the Chachoengsao location (owner to set up), then its URL and the
   official Instagram/TikTok/YouTube URLs go into the organization schema `sameAs`.
2. Remaining product pages (Stock on Demand, ROM, S Leasing, after-sales, repair) stay noindex
   until their copy is reviewed.

## Next action

After PR #21 is merged and deployed, the owner requests indexing for `/th`, `/th/products/handset-wholesale`,
`/th/products/accessories` and `/th/products/ais-sim` in Search Console.
