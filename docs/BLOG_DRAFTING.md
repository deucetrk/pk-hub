# Blog drafting playbook

How an agent drafts one PK HUB article for owner approval. Strategy, topics and template:
[BLOG_STRATEGY.md](BLOG_STRATEGY.md). A draft is a pull request; **the owner approves by merging**.
An agent never merges a blog draft.

## Owner decisions (2026-10-20)

- Two drafts a week, drafted on a schedule; the owner (ธีรกานต์) reviews each PR and approves by
  merging it.
- Both tracks are approved: partner articles and shop-owner utility articles (warranty and IMEI
  checks, model shortlists).
- Byline: ธีรกานต์ · PK HUB (first name only). It is rendered by `BlogArticle.tsx` for every article.
- "มือถือราคาไม่เกิน 5,000" features TECNO. "ราคาไม่เกิน 10,000" models are the agent's
  recommendation from facts: what people search, official Thai prices, and brands PK HUB lists in
  `src/content/brands.ts`.
- Use web research for outside facts. Ask the owner for PK HUB-specific facts or real insights
  in the PR body, never by guessing in the article.

## Steps

1. **Pick the topic.** Skip a topic if `website/src/content/blog/publishedManifest.ts` already has it
   or an open PR titled `Blog draft:` covers it (`gh pr list --repo deucetrk/pk-hub --state open`).
   Take the next row of the strategy's topic table. When the table is used up, choose a new topic
   from Search Console queries or keyword research and add it to the table in the same PR.
   If two or more `Blog draft:` PRs are already open, do not draft. Report that approval is
   pending instead.
2. **Research.** Use treg (`treg call dataforseo.google.keywords.volume`, location `2764`,
   language `th`) for the target and related phrases. Use `treg.google.serp.organic` (country
   `th`, language `th`) for the top 10 results. Read the top results and relevant Pantip threads
   for the sub-questions people ask. Use official sources for facts: brand Thailand sites,
   AIS, the Revenue Department, DBD. Keep the cost under US$1 per run.
3. **Write** `website/src/content/blog/published/<camelName>.ts`, following an existing article
   such as `supplierChecklist.ts`:
   - `title` starts with the searched phrase. `seoTitle` is at most about 60 characters.
     `metaDescription` is at most about 155 characters. `primaryKeyword` is the target phrase.
   - `introduction` answers the question in its first 2–3 sentences.
   - Include a `quickReference` table, 5–8 `sections` with question-style headings, and a
     `conclusion`.
   - 3–5 `faqs` whose answers restate the article.
   - 2–3 `internalLinks`: one product page (`/th/products/handset-wholesale`, `accessories`,
     `ais-sim`) and one related guide. Every link must exist.
   - `ctaHref` is `https://lin.ee/VEgW6qG` or `/th/join`. List `sources` with an `accessedAt` date.
   - `publishedAt` and `modifiedAt` are the draft date. Set `estimatedReadMinutes` from length
     (about 1,200–2,500 Thai words).
   - Plain, practical shop-floor Thai. No hype, no guarantees.
4. **Respect the facts boundary.** PK HUB facts come only from the published site:
   `src/lib/seo.ts`, `src/content/homeFaqs.ts`, `src/content/productServices.ts`,
   `public/llms.txt`. Never invent PK HUB wholesale prices, stock, minimums, rebate rates,
   delivery times or approval rules. Retail prices are allowed only as official prices with
   source and date, and labelled as such.
5. **Cover image.** Reuse a fitting image from `website/public/blog/`, or generate one through
   treg's image generation as an illustration with no real logos, prices or people. Save it as
   `public/blog/<slug>-cover.png` and set `imageWidth`/`imageHeight` to its real size. Use an
   `imageCaption` such as "ภาพประกอบ…".
6. **Register** the article in `src/content/blog/articles.ts` (import plus `articlesBySlug`) and in
   `src/content/blog/publishedManifest.ts`.
7. **Validate** with Node 24 from `website/`: `npm ci`, `npm run check`, `npm run lint`,
   `npm run build`, `npm run seo:validate`. Fix every failure.
8. **Open the PR.** Use branch `claude/blog-draft-<slug>` from a fresh worktree on `origin/main`,
   and title `Blog draft: <title>`. The body contains:
   - the target keyword and volume, the top 5 competitors, and the angle;
   - the preview path `/th/blog/<slug>`, which Vercel's preview comment links;
   - the sources;
   - **Questions for the owner**: every PK HUB-specific fact or insight that would make the
     article better.

   Never merge it. Never deploy.
