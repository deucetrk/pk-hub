// Run after npm run build. Uses the real prerendered hero and its approved assets.
// Install Playwright locally, or set PLAYWRIGHT_MODULE to an existing module entry point.
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const dist = resolve(root, 'dist')
const output = resolve(root, 'public/social')
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href
  : 'playwright')
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' }
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    const target = resolve(dist, `.${pathname}`, extname(pathname) ? '' : 'index.html')
    assert(target.startsWith(dist + sep))
    assert.equal(req.method, 'GET')
    res.setHeader('Content-Type', types[extname(target)] ?? 'application/octet-stream')
    res.end(await readFile(target))
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
let browser
try {
  browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) })
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  await mkdir(output, { recursive: true })
  for (const lang of ['th', 'en']) {
    await page.goto(`http://127.0.0.1:${server.address().port}/${lang}`, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      await Promise.all([
        document.fonts.load('300 64px Anuphan'),
        document.fonts.load('500 20px "IBM Plex Sans Thai"'),
      ])
      assertFonts()
      function assertFonts() {
        if (!document.fonts.check('300 64px Anuphan') || !document.fonts.check('500 20px "IBM Plex Sans Thai"')) throw new Error('Brand fonts did not load')
      }
      await Promise.all([...document.querySelectorAll('.v1-hero img')].map(img => img.decode()))
      const copy = document.querySelector('.v1-hero-copy')
      copy.querySelectorAll('p:not(.v1-eyebrow), .v1-hero-actions').forEach(el => el.remove())
      const address = document.createElement('p')
      address.className = 'share-address'
      address.textContent = 'pkhub.co'
      copy.append(address)
    })
    await page.addStyleTag({ content: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      body * { visibility: hidden !important; }
      .v1-hero, .v1-hero * { visibility: visible !important; }
      .v1-hero { width: 1200px; height: 630px; padding: 0; border-radius: 0; background: linear-gradient(170deg, #16171a 0%, #252b3d 58%, #4a5a9a 100%); }
      .v1-hero-grid.v1-home-hero { width: 100%; max-width: none; height: 630px; margin: 0; padding: 42px 36px 24px 60px; grid-template-columns: 500px 604px; gap: 0; }
      .v1-hero-copy { gap: 32px; padding: 0; transform: none !important; opacity: 1 !important; }
      .v1-hero-copy .v1-eyebrow { font-size: 17px; line-height: 1.5; letter-spacing: .02em; }
      .v1-hero-copy .v1-h1 { font-size: 66px; line-height: 1.22; letter-spacing: -.025em; }
      html[lang="en"] .v1-hero-copy .v1-h1 { font-size: 64px; }
      html[lang="en"] .v1-collage-inner > div:first-of-type .font-display { font-size: calc(var(--u) * 29) !important; white-space: nowrap; }
      html[lang="en"] .v1-collage-inner > div:first-of-type > div:last-child { font-size: calc(var(--u) * 13) !important; }
      .share-address { font-size: 24px; font-weight: 500; color: #b5c6ff; margin-top: 8px; }
      .v1-collage { width: 604px; margin: 0; }
      .v1-collage-inner { transform: none !important; }
      .v1-glitter { bottom: 0; height: 150px; opacity: .55; }
    ` })
    const hero = page.locator('.v1-hero')
    const box = await hero.boundingBox()
    assert.equal(box.width, 1200)
    assert.equal(box.height, 630)
    const file = resolve(output, `home-${lang}-v1.jpg`)
    await hero.screenshot({ path: file, type: 'jpeg', quality: 92, animations: 'disabled' })
    console.log(`Generated ${file}`)
  }
} finally {
  await browser?.close()
  await new Promise(resolve => server.close(resolve))
}
