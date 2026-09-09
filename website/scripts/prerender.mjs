/**
 * Prerender script: renders locale homepages plus approved blog routes,
 * applies route-specific metadata, and generates sitemap.xml.
 *
 * Runs after `vite build` (client) + `vite build --ssr` (server bundle).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const { render, getPageMeta, getPrerenderRoutes } = await import(
  resolve(root, 'dist-ssr/entry-server.js')
)

const SITE = 'https://pkhub.co'

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')

function removeTagById(html, id) {
  return html.replace(new RegExp(`\\s*<[^>]+id="${id}"[^>]*>`, 'g'), '')
}

function removeScriptById(html, id) {
  return html.replace(
    new RegExp(`\\s*<script[^>]+id="${id}"[^>]*>[\\s\\S]*?<\\/script>`, 'g'),
    '',
  )
}

function localize(html, route, meta) {
  const isEnglish = route === '/en'
  const isHome = route === '/th' || route === '/en'
  const lang = isEnglish ? 'en' : 'th'
  let page = html
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${meta.description}$2`,
    )
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${meta.title}$2`)
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${meta.description}$2`,
    )
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${meta.canonical}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${meta.ogType ?? 'website'}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${meta.image ?? `${SITE}/og-image.jpg`}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${meta.locale ?? 'th_TH'}$2`)
    .replace(
      /(<meta property="og:locale:alternate" content=")[^"]*(")/,
      `$1${isEnglish ? 'th_TH' : 'en_US'}$2`,
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${meta.canonical}$2`)

  if (!isHome) {
    page = removeTagById(page, 'alternate-th')
    page = removeTagById(page, 'alternate-en')
    page = removeTagById(page, 'alternate-default')
    page = removeTagById(page, 'og-locale-alternate')
    page = removeScriptById(page, 'faq-schema')
    page = removeScriptById(page, 'video-schema')
  }

  return page
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

const routes = getPrerenderRoutes()

for (const route of routes) {
  const appHtml = unhideMotion(render(route))
  const page = localize(template, route, getPageMeta(route)).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )
  const outputDir = resolve(dist, route.slice(1))
  mkdirSync(outputDir, { recursive: true })
  writeFileSync(resolve(outputDir, 'index.html'), page)
  console.log(`prerendered ${route} (${(page.length / 1024).toFixed(0)} KB)`)
}

// Root index.html: serve Thai content (canonical already points to /th);
// client router keeps URL behaviour (/ -> /th) once hydrated.
writeFileSync(
  resolve(dist, 'index.html'),
  readFileSync(resolve(dist, 'th', 'index.html'), 'utf-8'),
)

// sitemap.xml with build-time lastmod
const lastmod = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Bangkok',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date())
const alt = `
    <xhtml:link rel="alternate" hreflang="th" href="${SITE}/th" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/th" />`
const secondaryUrls = routes
  .filter((route) => route.includes('/join') || route.includes('/dealer/login') || route.startsWith('/th/blog'))
  .map((route) => `
  <url>
    <loc>${SITE}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.includes('/join') ? '0.9' : route.includes('/dealer/login') ? '0.8' : route === '/th/blog' ? '0.8' : '0.7'}</priority>
  </url>`)
  .join('')
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
  </url>${secondaryUrls}
</urlset>
`,
)
console.log(`sitemap.xml written (lastmod ${lastmod})`)

// clean up SSR bundle
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('done')
