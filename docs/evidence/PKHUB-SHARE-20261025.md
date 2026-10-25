# Homepage social share artwork — 2026-10-25

Status: locally validated; awaiting current owner approval to publish.
Base: `96d548e` (`origin/main` when work started).
Branch: `codex/pkhub-share-image-20261025`.

## Requested behavior and implementation

The owner supplied a current storefront share preview and the dark homepage hero, then asked to
use artwork like the second image. The home routes now point Open Graph and Twitter metadata to
separate 1200 × 630 JPEGs: [Thai](../../website/public/social/home-th-v1.jpg) and
[English](../../website/public/social/home-en-v1.jpg), approximately 104/101 KB.
New versioned filenames avoid reusing the old image URL. Platform preview cache refresh is a
separate post-release observation; previously sent messages are not proven to update.

Artwork reuses the real homepage hero, assets, fonts and existing copy. Buttons, small descriptive
copy and floating contact controls are omitted; the headline and service collage remain. English
store-card type is fitted for the image without altering the page UI. Only home metadata and the
base HTML fallback change. Article/product metadata and the storefront organization image remain.

The owner screenshot is the composition authority. Mobbin images were visually inspected as
supporting composition references: [Shade](https://mobbin.com/sites/sections/69ee2366-425b-4dda-9c91-e937af4367b0)
(dark background, single headline, image grouping) and
[Readymag](https://mobbin.com/sites/sections/fbdeae79-9c95-4a76-bba0-8efa93b731b2)
(layered image collage). Neither supplies PK business claims.

## Regeneration and verification

Run from `website/` on Node 24:

```sh
npm ci
npm run build
# Playwright is a developer tool, not a production dependency.
# Set PLAYWRIGHT_MODULE to its installed entry point if not locally resolvable.
# Set CHROMIUM_PATH if using an installed browser instead of Playwright Chromium.
node scripts/generate-home-share.mjs
npm run build
npm run seo:validate
```

The generator serves only the local build on an ephemeral loopback port, loads actual brand
fonts and images, freezes motion and captures the hero with temporary image-specific CSS.
Committed JPEGs ship directly; deployment does not require Playwright or external font access
to generate them. Bump image filenames and metadata for a future replacement.

Passed: `npm run check`, `npm run lint`, `npm test` (16), `npm run build`, `npm run seo:validate`.
The SEO validator checks both crawler-visible image tags, 1200 × 630 declarations and emitted
assets. Actual decoded JPEG dimensions were also verified.
Root: `node --test scripts/check-continuity.test.mjs` (19), continuity checker and diff whitespace.
Existing build warning: Browserslist data is seven months old; no build failure.

Rendered Thai/English at 1280 × 844 and 390 × 844: one H1, no horizontal overflow, matching
Open Graph/Twitter images, image HTTP 200 with JPEG MIME, no browser page errors. Hydrated TH → EN
switch selected the English image. Both generated images and a 360px Thai preview were visually
inspected. Existing English page store-card wrapping is outside this metadata change; its share
image is independently fitted. No lead was submitted.

## Publication and rollback

Merge to main triggers production deployment and requires current owner approval under the root
[agent contract](../../AGENTS.md). Before merge, inspect the scoped PR and required CI conclusions.
After publication verify `/revision.json`, the `/` redirect, `/th` and `/en` source metadata and
both `/social/home-*-v1.jpg` URLs (HTTP 200, JPEG, 1200 × 630), then verify a fresh platform preview.
Use the platform's preview-refresh tool when available; do not promise an immediate cache update.

Rollback: revert this scoped commit/merge and redeploy the prior version, or restore the prior
ready Vercel deployment. The original `/og-image.jpg` remains present. No schema, configuration,
credentials, authorization, intake, stock, pricing or money changes are part of this release.

Process review: reusing the real hero kept design work small; stale dirty source was avoided with
a clean main-based worktree. The generator now makes future share-image updates reproducible.
