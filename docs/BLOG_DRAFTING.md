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

## Owner-confirmed business facts

Drafts may state these, in addition to the published site files listed in step 4:

- 2026-10-22 (amended 2026-10-31): PK HUB iPhones are Thai-market units from AIS and
  Synnex (the only two suppliers, confirmed 2026-11-07), with Apple Thailand warranty. Wholesale sells both unactivated and activated ("แอค") units
  at different prices; activated units are usually newly launched iPhones that must be activated
  before dispatch. Retail units are never activated before handover. Serial numbers can be listed on the tax invoice on request. For
  after-sales, partners contact LINE or phone, and PK HUB coordinates the claim, files it, or in some
  cases swaps the unit.
- 2026-10-27: orders start at **1 unit** with **no deposit**; one model or mixed models get the same
  wholesale pricing. Best sellers are Apple (every iPhone series sells, most repeat orders; see the 2026-10-31 entry for the top models), then vivo, OPPO
  and Samsung. High-value phones usually ship with transport insurance; nearby shops can send a
  messenger such as Lalamove, or pick up at the Chachoengsao store.
- 2026-10-31: the iPhone models partner shops order most are the latest flagship and the previous
  generation (N-1). Shop owners mostly ask whether a colour and capacity is available, the
  activated versus unactivated price, and the price. Wholesale orders are photographed while packed
  (no per-unit inspection); retail sales are unboxed in front of the customer. Real photos:
  `website/public/blog/iphone-retail-unboxing.jpg`, `wholesale-packing-bubble-wrap.jpg`.
- 2026-10-31: Samsung units are also bought through AIS. Most units sold in store are not activated;
  units sold at an "activated" price are known to the buyer as already activated. For after-sales,
  customers can use any Samsung service centre, or the partner can leave the unit with PK HUB to
  claim. IMEI can be listed on the tax invoice. PK HUB does not sell Samsung Care+ (it mostly uses
  AIS Care Plus). The best-selling Samsung models are the Galaxy A series. Partners mostly ask about
  price and stock; no real photos are available yet, so generated covers are fine.
- 2026-11-02: IMEI or serial can be listed on the tax invoice for **every brand**. PK HUB does not
  compare IMEIs when packing (it checks the model). If a partner finds a problem, they can ask the
  team; PK HUB logs every step and reconciles. PK HUB does not take trade-in or used phones. The
  owner knows of no official AIS/NBTC channel for checking a reported-lost IMEI. No real photos (they
  would show IMEIs), so generated covers stay.
- 2026-11-07: do not mention the "Unbrick within 7 days" rule in articles; it applies only around
  a new iPhone series launch and is too complex for a guide. "Hi อี่มี่ครับ" meant "ให้ IMEI ครับ":
  PK HUB lists the IMEI.

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
4. **Respect the facts boundary.** PK HUB facts come only from the owner-confirmed facts above and the published site:
   `src/lib/seo.ts`, `src/content/homeFaqs.ts`, `src/content/productServices.ts`,
   `public/llms.txt`. Never invent PK HUB wholesale prices, stock, minimums, rebate rates,
   delivery times or approval rules. Retail prices are allowed only as official prices with
   source and date, and labelled as such.
5. **Cover image.** Reuse a fitting image from `website/public/blog/`, or generate one through
   treg's image generation as an illustration with no real logos, prices or people. Save it as
   `public/blog/<slug>-cover.png` and set `imageWidth`/`imageHeight` to its real size. Use an
   `imageCaption` such as "ภาพประกอบ…".
   5a. **Internal links into the new article.** Edit 2–4 existing published articles, and the most
   relevant product page if it has a place for one, so that each links to the new article with
   descriptive Thai anchor text in a sentence where it helps the reader. Add a link in body text or
   `internalLinks`, never a bare "อ่านต่อ". Bump each edited article's `modifiedAt`. Don't change
   facts in the articles you edit.
6. **Register** the article in `src/content/blog/articles.ts` (import plus `articlesBySlug`) and in
   `src/content/blog/publishedManifest.ts`.
7. **Validate** with Node 24 from `website/`: `npm ci`, `npm run check`, `npm run lint`,
   `npm run build`, `npm run seo:validate`. Fix every failure.
   7a. **Critic pass.** Before opening the PR, reread the draft as a separate reviewer and list:
   - every PK HUB claim that is not in the owner-confirmed facts or the published site files;
   - every number, price, date or policy without a dated official source;
   - missing or broken FAQ, quick reference or internal links, and any sentence that guarantees
     an outcome.

   Fix what you can. Put the remaining list in the PR body under **Critic findings** (write "none"
   if it is empty).

8. **Open the PR.** Use branch `claude/blog-draft-<slug>` from a fresh worktree on `origin/main`,
   and title `Blog draft: <title>`. The body contains:
   - the target keyword and volume, the top 5 competitors, and the angle;
   - the preview path `/th/blog/<slug>`, which Vercel's preview comment links;
   - the sources;
   - **Questions for the owner**: every PK HUB-specific fact or insight that would make the
     article better.

   Never merge it. Never deploy.

## Weekly ranking report (scheduled `pkhub-seo-weekly`, Mondays)

The task runs `/Users/deuce/Desktop/PK Media/seo-reports/run-weekly.py`. It checks Google Thailand
positions for the tracked keywords below through `dataforseo.google.serp.organic` (location `2764`,
language `th`, depth 100), and pkhub.co's backlink summary through
`dataforseo.web.backlinks.summary`. Do not use the routed `treg.google.serp.organic` for ranking: it
can return far fewer than 100 results, so a missing site would look unranked when it was never
checked. DataForSEO hides most URLs behind `google.com/goto`, so the script finds the site from each
result's breadcrumb, and the recorded URL is approximate.

The script appends one row per keyword to `rankings.csv` (date, keyword, position or blank, ranking
URL) only after every call succeeds, writes `report-<date>.md` beside it, and caches each answer so a
killed run resumes. Tuesday and Wednesday runs are catch-ups that exit once the week is recorded.
Those files stay on the owner's Mac on purpose: they are operational data, not repository knowledge.
Spend stays under US$0.75 a run (about US$0.02 a keyword).

Tracked keywords: ขายส่งมือถือ, ขายส่งไอโฟน, ขายส่ง iphone, ขายส่งโทรศัพท์มือถือ, ขายส่งซิม,
ขายส่ง ipad, ขายส่งแท็บเล็ต, ขายส่งอุปกรณ์มือถือ, ขายส่งเคสมือถือ, แหล่งขายส่งมือถือ,
เช็คประกัน iphone, เช็คประกัน samsung, เช็ค imei, มือถือเครื่องศูนย์ไทย, เปิดร้านมือถือ, pk hub.
Add the target keyword of every newly published article.

## Monthly refresh (scheduled `pkhub-blog-refresh`, first Wednesday)

From `rankings.csv`, pick the published article whose target keyword sits closest to page 1 (best
position 8–40, at least 4 weeks old). Open a `Blog refresh: <title>` PR that updates its facts and
sources, adds 1–2 FAQs from the current top results, strengthens its internal links and bumps
`modifiedAt`. Apply the same facts boundary, critic pass and validation as a draft. Never merge it.
If nothing qualifies yet, report that and open no PR.
