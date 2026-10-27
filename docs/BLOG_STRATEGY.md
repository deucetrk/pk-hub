# PK HUB blog strategy

Owner request 2026-10-20. Search data: [keyword evidence](evidence/PKHUB-SEO-20261020.md) (Google
Ads volume, Thailand, Thai, pulled through treg). Publishing boundary: an article ships only after
the owner approves it (`website/src/content/blog/articles.ts`), and it never invents prices, stock,
rebates or terms.

## Why the blog exists

1. **Catch the questions the homepage cannot.** Product pages rank for "ขายส่ง…". Shop owners
   also search questions ("เปิดร้านมือถือ ต้องเตรียมอะไร", "เช็คประกัน iPhone"). Each answered
   question is another way into pkhub.co.
2. **Get quoted by AI answers (AEO/GEO).** ChatGPT, Gemini, Perplexity and Google AI Overviews
   cite pages that answer directly, show sources and carry FAQ structure. The blog is where
   PK HUB earns those citations.
3. **Topical authority.** A cluster of related guides that link to the product pages tells Google
   that pkhub.co is the expert on phone wholesale. This lifts the product pages as well.
4. **Sales enablement.** The team can answer a prospect in LINE with a link instead of retyping
   ("document checklist", "how the first order works"). Guides also onboard new partners.
5. **Trust.** Real process, VAT/tax-invoice facts, address and sources show that PK HUB is a real,
   accountable wholesaler before anyone calls.
6. **Content for other channels.** One article supplies 3–5 Facebook, TikTok or LINE OA posts.
7. **Links from other sites.** Useful checklists get linked from Pantip, groups and partner shops,
   and those links raise every page's ranking.
8. **A compounding asset.** Ads stop when the budget stops. A ranked guide keeps bringing visitors
   for years, and its Search Console queries show what to sell and write next.

## What the data says (monthly Google searches, Thailand)

| Track | Examples | Volume |
| --- | --- | --- |
| Partner (buyer intent) | ขายส่งมือถือ 2,900 · ขายส่ง iphone 1,300 · ขายส่ง ipad 480 · ขายส่งแท็บเล็ต 260 · ขายส่งซิม 210 · ขายมือถือออนไลน์ 210 · ขายส่ง oppo 140 | small, high value |
| Shop-owner utility | เช็คประกัน iphone 6,600 · เช็คประกัน samsung 4,400 · เช็ค imei 1,000 · เช็ค imei iphone 880 | large, medium value |
| Model shortlists | มือถือ ราคาไม่เกิน 5000 5,400 · ราคาไม่เกิน 10000 2,400 | large, high competition |
| Avoid | iphone 17 ราคา 27,100 (consumer price news) | huge, but no buyers and needs live prices |

Long phrases such as "เปิดร้านมือถือ ลงทุนเท่าไหร่" show no measurable volume, but they are the
exact questions AI assistants receive. Answer them inside the cluster articles and their FAQs
instead of giving each its own article.

## Two tracks, one cluster

- **Partner track (≈60%)**: for shop owners deciding where to buy. Ends with a LINE or join CTA
  and links to `/th/products/handset-wholesale`, `accessories` or `ais-sim`.
- **Utility track (≈40%)**: questions that shop owners and their customers both search
  (warranty and IMEI checks, Thai-market vs grey import, model shortlists). These bring traffic
  and brand recall. Softer CTA ("ร้านค้าที่อยากมีรุ่นเหล่านี้ไว้ขาย…").

## Cadence

- **Months 1–3: 2 articles a week** (1 partner + 1 utility), about 24 articles. That gives the
  cluster depth quickly, which matters more than the exact frequency.
- **After that: 1 new article a week, plus 1 refresh a month** of an article that Search Console
  shows on page 2. Update the facts, add a FAQ and change `modifiedAt`.
- Consistency beats bursts. One accurate, owner-checked article is worth more than three thin ones.
  Never publish to hit a quota.

## Article template

What works in [Rocket's blog](https://rocket.in.th/blog), plus what the PK HUB guides already do
well:

- **Title starts with the searched phrase**, then the benefit or year. Example: "เช็คประกัน
  iPhone ยังไง? 3 วิธีเช็กเองใน 1 นาที (2026)". Patterns: "X คืออะไร", "วิธี…", "N ข้อ/วิธี…",
  "… เจ้าไหนดี / เปรียบเทียบ".
- **First 2–3 sentences answer the question directly** (40–60 words). This is the part AI tools quote.
- Quick-reference table near the top (already supported by `quickReference`).
- H2s phrased as the reader's sub-questions; numbered steps; real photos or screenshots with
  `alt` text.
- **3–5 FAQs** at the end (`faqs`, rendered with FAQPage schema).
- 2–3 internal links: one to a product page and one to a related guide. Never to a dead anchor.
- One clear CTA (LINE @pkhub or `/th/join`), plus sources and an updated date.
- 1,200–2,500 Thai words; plain, practical shop-floor tone (the current guides' strength).
- Keep what Rocket lacks: dates, Article schema, author, sources. Avoid what hurts it: a flat
  150-link index, leftover template posts, garbled slugs.

## First 12 topics

| # | Working title | Target keyword (volume) | Track | Needs from owner |
| --- | --- | --- | --- | --- |
| 1 | ขายส่ง iPhone: ร้านค้าต้องรู้อะไรก่อนสั่ง | ขายส่ง iphone (1,300) | Partner | Ordering terms to state |
| 2 | เช็คประกัน iPhone ยังไง ร้านและลูกค้าเช็กเองได้ | เช็คประกัน iphone (6,600) | Utility | — |
| 3 | เช็คประกัน Samsung ทุกวิธี | เช็คประกัน samsung (4,400) | Utility | — |
| 4 | เช็ค IMEI คืออะไร เช็กยังไงก่อนรับเครื่องเข้าร้าน | เช็ค imei (1,000 + 880) | Utility | — |
| 5 | ขายส่ง iPad และแท็บเล็ต สำหรับร้านมือถือ | ขายส่ง ipad (480), ขายส่งแท็บเล็ต (260) | Partner | Tablet brands to name |
| 6 | มือถือราคาไม่เกิน 5,000 ที่ร้านควรมีไว้ขาย (2026) | มือถือ ราคาไม่เกิน 5000 (5,400) | Utility | Owner: feature TECNO; official prices with dates |
| 7 | มือถือราคาไม่เกิน 10,000 ที่ขายง่าย (2026) | ราคาไม่เกิน 10000 (2,400) | Utility | Agent recommends models from data; official prices with dates |
| 8 | ขายซิม AIS ที่ร้าน เริ่มยังไง รีเบตคิดอย่างไร | ขายส่งซิม (210) | Partner | Campaign facts you allow |
| 9 | ขายมือถือออนไลน์ เริ่มยังไงให้ไม่ขาดทุน | ขายมือถือออนไลน์ (210) | Partner | — |
| 10 | เครื่องศูนย์ไทย กับ เครื่องนอก/เครื่องหิ้ว ต่างกันยังไง | AEO question | Utility | — |
| 11 | ขายส่ง OPPO / vivo / Samsung: แบรนด์ไหนเหมาะกับร้านแบบไหน | ขายส่ง oppo (140) | Partner | Brand positioning |
| 12 | คู่มือขายส่งมือถือ 2026 (pillar linking all of the above) | ขายส่งมือถือ (2,900) | Partner | — |

## Workflow per article

Owner decisions and the exact agent steps: [BLOG_DRAFTING.md](BLOG_DRAFTING.md).

1. Research: treg keyword volume plus the Google Thailand top 10 for the target phrase (about $0.10).
2. Outline: questions from the top results, Pantip and Search Console queries.
3. Draft in the article data format (`src/content/blog/published/*.ts`) with sources.
4. Owner or team fact check: anything about PK HUB terms, prices, rebates or policy.
5. Publish by merging. IndexNow notifies Bing and others automatically, and Google finds the page
   through the sitemap and blog index. A Search Console indexing request is optional; it only
   speeds Google up. Share on LINE OA and Facebook.
6. After 4–6 weeks, read the article's Search Console queries; refresh it or add FAQs.

## Measuring it

- Search Console: impressions, clicks and position per article (monthly).
- LINE adds and `/th/join` applications that come from blog CTAs. Add UTM or referral tags
  when the owner wants attribution.
- Quarterly AI-visibility check through treg: is PK HUB mentioned or cited for the target questions?
