# Privacy notice and TikTok link (2026-10-21)

Branch `claude/pkhub-privacy-tiktok`, base `96d548e`.

## Owner instruction

Owner in chat, 2026-10-21 (relayed by the parent session): "privacy notice just use the official one
you found that seem fully rightful / tiktok handle it's @pkmedia168". Merging deploys pkhub.co and
waits for the owner's go-ahead.

## Source for the notice

- PDPC (สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล), "แนวทางการดำเนินการในการแจ้งวัตถุประสงค์และ
  รายละเอียดในการเก็บรวบรวมข้อมูลส่วนบุคคลจากเจ้าของข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูล
  ส่วนบุคคล พ.ศ. 2562", published 7 Sep 2565 (2022).
  Page: https://www.pdpc.or.th/1365/ ·
  PDF: https://www.pdpc.or.th/wp-content/uploads/2022/09/pdpc-2562-pdpc-Guidelines1.pdf
  (SHA-256 `f7ff9948f14dc0e10db317be5619626aeac80618da0c11579de8a82be8a71272`, retrieved 2026-10-21).
- The PDPC publishes guidance, not a fill-in template. The notice follows the ten items in its
  section 4.1, the rights list with section numbers in its example, and the layered approach in
  section 6.1 (a short summary first, the consent box links to the full notice).
- Not reviewed by a lawyer.

## Facts used and where they come from

| Notice item | Source |
|---|---|
| Fields collected, required/optional | `website/src/components/PartnerForm.tsx`, `website/src/utils/partnerLead.ts` |
| Language, page, UTM, first/last page, request ID | `website/src/utils/acquisitionContext.ts`, `partnerLeadSubmission.ts` |
| Salted IP bucket, raw IP not stored; private service-only storage | PK-Commerce ADR-0037, `supabase/functions/partner-lead-intake/index.ts` |
| Purpose "contact about becoming a partner only"; consent as basis | Form consent text and required consent check |
| Staff and assigned BD access | PK-Commerce `docs/domains/partner-acquisition/README.md` |
| Database in Tokyo (`ap-northeast-1`) | PK-Commerce `docs/evidence/CAT-001-supabase-postgresql.md` |
| Legal name บริษัท พี เค มีเดีย บิสซิเนส จำกัด | Organization schema `legalName` in `website/index.html` |
| HQ address, phone, LINE | `website/src/components/v1/site.ts`, `pages/home/constants.ts` |
| Only Google Fonts as an external resource; no analytics | `website/index.html`, `package.json` |

## Placeholders for the owner (shown on the page in amber)

1. Registered legal name as on the company certificate, and its English form.
2. Retention period for enquiries that do not become partners, and for those that do.
3. Safeguard relied on for storing data in Japan (PDPA ss. 28–29).
4. Email address for privacy requests.
5. DPO name and contact, or a statement that none is appointed.

Also for a lawyer: whether consent alone is the right basis (versus pre-contract steps or legitimate
interest for spam prevention). The page stays `noindex` and out of the sitemap until 1–5 are filled.

## TikTok

`SOCIAL.tiktok` = https://www.tiktok.com/@pkmedia168: footer icon, contact page row, organization
`sameAs` (Instagram added there too; both are verified profiles). Paper boards not checked: Paper
Desktop was not running.

## Validation (Node 24.21.0)

`npm run check`, `lint`, `test` (16 pass, 0 fail), `build`, `seo:validate` pass. `dist/th/privacy` and
`dist/en/privacy` prerendered with `noindex, follow`; sitemap has no privacy URL.

Rendered check on the production build (`vite preview`): `/th/privacy` at 1440px and 390px, no
horizontal overflow at 390px, five placeholders present; footer at 390px shows the TikTok icon and
the ความเป็นส่วนตัว link inside the viewport; `/th/join` consent row links to `/th/privacy` in a new
tab (`rel=noopener`, screen-reader hint) and following it does not tick the consent box.
