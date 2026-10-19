# pkhub.co motion and interactivity — evidence (2026-10-20)

Owner request 2026-10-20: build the motion plan (items 1–6) into the live site. Source intent:
Commerce `docs/evidence/PKHUB-CODEX-DESIGN-REVIEW-20261018.md`, "Motion intent for the build".
Branch `claude/pkhub-motion` from `5a41555`; PR #17.

## What was built

| Item | Implementation |
| --- | --- |
| 1 Brand billboard | Both logo rows scroll nonstop in opposite directions (48s / 56s per loop): the list is duplicated once, the copy is `aria-hidden` and not tabbable, and the edges fade with a mask. The rows pause on hover and on `:focus-within`. Uses CSS transforms only. Each logo links to the devices or accessories page filtered to that brand. |
| 2 Hero entrance | The copy rises in sequence. The headline moves but never starts invisible, because it is the largest paint. The product cards then enter one after another, then float. A ±16px parallax runs only with a fine pointer, at ≥1024px, with motion allowed. |
| 3 Stock on Demand demo | The chat bubbles arrive one at a time, with typing dots, when the demo enters the viewport. Choosing Galaxy, iPhone or OPPO replays it. The text stays in the DOM (only opacity changes). It keeps the line "คำขอยังไม่ใช่การยืนยันสินค้าและออเดอร์" and labels the reply "(ตัวอย่าง)". It is used on the home page and in the Stock on Demand hero. |
| 4 Reveal on scroll | Blocks below the fold fade in and rise 16px over 420ms (IntersectionObserver, after hydration only). Steps, cards, FAQs, stats and related links stagger 70ms per child. Count-ups use owner-confirmed figures only: 500+, 10, 16 (home), and 3%, 1.5%, 30,000+ (ROM). An invisible copy of each final value reserves its width, so counting causes no layout shift. |
| 5 Hover and press | Category tiles and cards lift with a shadow. Buttons, chips, tiles and toggles have a pressed state. The header is solid at the top and frosted glass after 8px of scroll. |
| 6 Interactive extras | Brand filter on the devices and accessories pages: tapping a logo, or arriving via `?brand=`, shows the brand's category and dims the other category cards; "ดูทุกแบรนด์" clears it. A mobile join bar (<640px) appears after the hero and hides at the closing band or footer. It ends at x=310 while the floating buttons start at x=322 (390px viewport), so it never covers them. |

Also: Google Fonts CSS is preloaded and applied without blocking first paint (`media=print` swap, with a `noscript` fallback).

## Reduced motion and accessibility

Checked in headless Chromium with `reducedMotion: 'reduce'` (390px):
- the billboard has no animation, wraps into a grid, and shows 0 duplicate tiles;
- hero cards have opacity 1 at load;
- the chat is complete immediately;
- no reveal is left pending;
- the count shows its final value ("500+").

Keyboard: Tab reaches the logo tiles, the focus outline is `solid`, and the row is `paused` while focused. No content exists only in motion: all text is in the DOM in its final state.

## Measurements

The live "before" was pkhub.co at `5a41555` (Lighthouse 13.5, `/th`): mobile LCP 4.44–4.47s, CLS ≤0.001, TBT 0–7ms; desktop LCP 1.08–1.14s, CLS ≤0.004, TBT 0. The mobile LCP element was the hero glitter, delayed by the render-blocking font CSS.

The Vercel preview is behind Vercel Authentication, so before and after were compared as local production builds (`vite preview`, the same machine). Medians of 3 runs:

| `/th` | LCP | CLS | TBT | Score |
| --- | --- | --- | --- | --- |
| Mobile before (`5a41555`) | 4720 ms | 0.001 | 154 ms | 73 |
| Mobile after | 3417 ms | 0.000 | 0 ms | 90 |
| Desktop before | 1034 ms | 0.004 | 23 ms | 98 |
| Desktop after | 722 ms | 0.001 | 0 ms | 100 |

Interaction latency (worst Event Timing duration; Playwright; mobile with 4× CPU throttle):

| Interaction | Before | After |
| --- | --- | --- |
| Mobile menu open/close | 104 ms | 112 ms |
| Join brand toggles | 88 ms | 96 ms |
| SOD sample chips | n/a | 88 ms |
| Brand filter taps | n/a | 104–120 ms |

The brand filter first measured 312ms. Moving its state into its own component, with dimming done as a class toggle, brought it to the figures above.

## Validation

Node 24: `check`, `lint`, `test` (16 pass), `build` and `seo:validate` all pass. Rendered review in the browser pane at 1440×900 and 390×844 covered:
- home: entrance, billboard, count-up, chat, frosted header;
- Stock on Demand hero demo and replay;
- the `?brand=` filter landing;
- the mobile join bar show/hide.

Not covered: physical devices, screen readers, field (CrUX) data.
