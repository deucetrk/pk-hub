---
task: PKHUB-BLOG-SEO-001
status: in_progress
validation: local_passed
updated: 2026-10-20
---
# Active goal: make the blog rank and get cited (PKHUB-BLOG-SEO-001)

Owner request 2026-10-20: improve the current blog and propose a blog strategy. Branch
`claude/pkhub-blog-seo`: FAQs with schema and repaired internal links on the six published guides,
plus [the strategy](docs/BLOG_STRATEGY.md). Merging deploys pkhub.co and waits for the owner's
go-ahead. Open owner choices: cadence and who approves articles, the utility track, the model and
price source for the shortlist articles, and a named author.

Next action: owner go-ahead to merge the blog PR, then request indexing for the six guides in
Search Console; first new articles follow the strategy's topic table once the owner picks cadence.

# Previous goal: rank pkhub.co for Thai wholesale-phone searches (SEO/AEO/GEO)

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

## Outcome

PR #21 merged as `dfbe776d1353a33cadb74fcbce1816cb94714041` at 2026-10-20T16:13:05Z; pkhub.co
served it at 2026-10-20T16:14:14Z (`/revision.json`). Live check: new home and product titles,
released product pages indexable, sign-in noindex, `llms.txt` 200, sitemap 21 URLs, home FAQPage
schema, 24-brand copy.

## Next action

Owner: Search Console URL inspection → Request indexing for `/th`, `/en`,
`/th/products/handset-wholesale`, `/th/products/accessories`, `/th/products/ais-sim`; submit
`sitemap.xml`; import into Bing Webmaster Tools; set up the Google Business Profile. Then recheck
the ranking table in the [evidence](docs/evidence/PKHUB-SEO-20261020.md) in about two weeks.
