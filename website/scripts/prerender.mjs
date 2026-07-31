/**
 * Prerender script: renders /th and /en to static HTML with per-locale meta,
 * and generates sitemap.xml with a fresh lastmod.
 *
 * Runs after `vite build` (client) + `vite build --ssr` (server bundle).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const SITE = 'https://pkhub.co'

const META = {
  th: {
    lang: 'th',
    ogLocale: 'th_TH',
    ogLocaleAlt: 'en_US',
    title: 'ค้าส่งมือถือฉะเชิงเทรา สำหรับร้านค้า | PK HUB',
    description:
      'PK HUB ขายส่งและค้าส่งมือถือฉะเชิงเทรา สำหรับร้านค้าและตัวแทนจำหน่าย เครื่องศูนย์ไทย มี VAT ใบกำกับภาษี และทีมพื้นที่สำหรับเช็กสต็อก ราคาส่ง และรอบจัดส่ง',
  },
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    ogLocaleAlt: 'th_TH',
    title: 'PK HUB | Chachoengsao Smartphone Wholesale Partner',
    description:
      'PK HUB is a Chachoengsao smartphone wholesale partner and Authorized AIS Distributor supplying official Thai-market phones with VAT invoices.',
  },
}

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')

function localize(html, locale) {
  const m = META[locale]
  const url = `${SITE}/${locale}`
  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${m.lang}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${m.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${m.description}$2`,
    )
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${m.title}$2`)
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${m.description}$2`,
    )
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${m.ogLocale}$2`)
    .replace(
      /(<meta property="og:locale:alternate" content=")[^"]*(")/,
      `$1${m.ogLocaleAlt}$2`,
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
}

// framer-motion SSR renders reveal targets at their "hidden" state (opacity:0,
// translateY). Strip those so prerendered content is visible to crawlers and
// users before hydration.
function unhideMotion(html) {
  return html
    .replace(/opacity:\s*0(?![.\d])/g, 'opacity:1')
    .replace(/transform:\s*translateY\([^)]*\)(?:\s+translateZ\(0(?:px)?\))?;?/g, '')
    .replace(/will-change:\s*(?:transform|opacity)(?:,\s*(?:transform|opacity))?;?/g, '')
    .replace(/ style=""/g, '')
}

for (const locale of ['th', 'en']) {
  const appHtml = unhideMotion(render(`/${locale}`))
  const page = localize(template, locale).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )
  mkdirSync(resolve(dist, locale), { recursive: true })
  writeFileSync(resolve(dist, locale, 'index.html'), page)
  console.log(`prerendered /${locale} (${(page.length / 1024).toFixed(0)} KB)`)
}

// Root index.html: serve Thai content (canonical already points to /th);
// client router keeps URL behaviour (/ -> /th) once hydrated.
writeFileSync(
  resolve(dist, 'index.html'),
  readFileSync(resolve(dist, 'th', 'index.html'), 'utf-8'),
)

// sitemap.xml with build-time lastmod
const lastmod = new Date().toISOString().slice(0, 10)
const alt = `
    <xhtml:link rel="alternate" hreflang="th" href="${SITE}/th" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/th" />`
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE}/th</loc>${alt}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE}/en</loc>${alt}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`,
)
console.log(`sitemap.xml written (lastmod ${lastmod})`)

// clean up SSR bundle
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('done')
