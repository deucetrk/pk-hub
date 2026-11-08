# PK HUB brand assets

Owner logo set, received 2026-11-08. The owner's files were flattened PNGs with a checkerboard
baked into the pixels, so these masters were redrawn as clean vectors (SVG) with real transparency.
Use the SVG wherever possible; the PNGs are for places that cannot take SVG.

| File | Use |
| ---- | --- |
| `logo/pk-hub-wordmark.svg` / `.png` | Main logo on light backgrounds (site header and footer) |
| `logo/pk-hub-wordmark-inverse.svg` | Same logo on dark backgrounds: white box with the PK letters cut out |
| `logo/pk-hub-plus-wordmark.svg` / `.png` | PK Hub+ (LINE loyalty) logo |
| `logo/pk-hub-plus-wordmark-inverse.svg` | PK Hub+ on dark backgrounds |
| `logo/pk-mark.svg` / `.png` | Standalone PK mark |
| `logo/pk-icon.svg`, `logo/pk-icon-512.png` | Square PK icon: favicon, Google search result icon, apple-touch-icon, web manifest, Organization `logo` in structured data |
| `app-icons/pk-hub-bold.svg`, `pk-hub-bold-1024.png` | Future PK HUB app icon (no app uses it yet) |
| `app-icons/pk-hub-plus-minimal.svg`, `pk-hub-plus-minimal-1024.png` | Future PK Hub+ app icon (no app uses it yet) |

Colors sampled from the owner's files: navy `#040B1A`, blue `#025EFE` (the plus), white.

The square icon keeps the PK letters inside the central 80% circle, so it survives the round crop
Google search and Android use. Site copies live in `website/public/` (`favicon.ico`, `favicon.svg`,
`favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `logo.png`,
`v1/brands/pkhub.svg`). PK Commerce keeps its own copies in `apps/web/public/brand/` and
`apps/web/src/app/icon.svg`.
