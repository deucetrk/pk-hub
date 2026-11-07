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

## Owner answers (2026-10-21, relayed by the parent session)

1. Legal name: บริษัท พี เค มีเดีย บิสซิเนส จำกัด, as on the DBD company certificate issued
   17 Feb 2568 by สำนักงานทะเบียนหุ้นส่วนบริษัทจังหวัดฉะเชิงเทรา. English "PK Media Business Co.,
   Ltd." is from the company seal (the certificate is Thai only). Head office 72/29-30 ถนนศุขประยูร
   ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา. The registration number doubles as the tax ID
   and is deliberately not published.
2. Retention: owner said "practically we keep forever but as you see fit". Agent proposal, accepted
   by that answer: non-partners 2 years after last contact, then delete or anonymise; partners for
   the relationship plus 10 years for accounting, tax and legal claims. Nothing yet enforces this in
   the intake store; deletion is a manual or future automated step.
3. Abroad: stored with Supabase in Japan under the provider's contractual safeguards; may move to
   another country such as Singapore, and the notice will then be updated. A region move is a future
   option only and needs its own production authorization.
4. Privacy request email: pkmediabusiness@gmail.com.
5. DPO: none appointed; requests go to the email above.

No placeholders remain, so the page is indexable and in the sitemap (priority 0.3).

Still for a lawyer: the notice is adapted from PDPC guidance and has not been reviewed by a lawyer,
including whether consent alone is the right basis and whether the Japan transfer safeguard wording
meets PDPA ss. 28–29.

## TikTok

`SOCIAL.tiktok` = https://www.tiktok.com/@pkmedia168: footer icon, contact page row, organization
`sameAs` (Instagram added there too; both are verified profiles). Paper boards not checked: Paper
Desktop was not running.

## Validation (Node 24.21.0)

`npm run check`, `lint`, `test` (16 pass, 0 fail), `build`, `seo:validate` pass. `dist/th/privacy` and
`dist/en/privacy` prerendered without a robots tag and listed in the sitemap; no placeholder text in
`dist`.

Rendered check on the production build (`vite preview`): `/th/privacy` at 1440px and 390px, no
horizontal overflow at 390px, filled retention, transfer, email and DPO sections; `/en/privacy` at
1440px; footer at 390px shows the TikTok icon and
the ความเป็นส่วนตัว link inside the viewport; `/th/join` consent row links to `/th/privacy` in a new
tab (`rel=noopener`, screen-reader hint) and following it does not tick the consent box.
