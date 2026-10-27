/**
 * Tell IndexNow search engines (Bing, which feeds ChatGPT search and Copilot, plus Yandex,
 * Naver and Seznam) which pkhub.co pages changed. Google does not take IndexNow; it reads the
 * sitemap. The key is public by design: it only proves we control the host.
 *
 * Usage: node scripts/indexnow.mjs [--wait-for <git sha>] [--all]
 *   --wait-for  poll /revision.json until the live site serves that commit (max 15 min)
 *   --all       submit every sitemap URL instead of those with a lastmod in the last 14 days
 *               (a draft dated when it was written may be merged days later)
 */
import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://pkhub.co'
const args = process.argv.slice(2)
const waitFor = args.includes('--wait-for') ? args[args.indexOf('--wait-for') + 1] : null
const submitAll = args.includes('--all')

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public')
const keyFile = readdirSync(publicDir).find((name) => /^[a-f0-9]{32}\.txt$/.test(name))
if (!keyFile) throw new Error('IndexNow key file missing from public/')
const key = readFileSync(resolve(publicDir, keyFile), 'utf8').trim()

if (waitFor) {
  const deadline = Date.now() + 15 * 60_000
  for (;;) {
    const live = await fetch(`${SITE}/revision.json?t=${Date.now()}`).then((r) => r.json()).catch(() => ({}))
    if (live.revision === waitFor) break
    if (Date.now() > deadline) throw new Error(`pkhub.co still serves ${live.revision ?? 'unknown'}, not ${waitFor}`)
    await new Promise((r) => setTimeout(r, 20_000))
  }
  console.log(`pkhub.co serves ${waitFor}`)
}

const liveKey = await fetch(`${SITE}/${key}.txt`).then((r) => (r.ok ? r.text() : ''))
if (liveKey.trim() !== key) throw new Error('Live IndexNow key file does not match; deploy it first')

const since = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok' }).format(new Date(Date.now() - 14 * 86_400_000))
const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text())
const urlList = sitemap
  .split('<url>')
  .slice(1)
  .map((entry) => [entry, entry.match(/<loc>([^<]+)<\/loc>/)?.[1], entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]])
  .filter(([, loc, lastmod]) => loc && (submitAll || (lastmod && lastmod >= since)))
  .map(([, loc]) => loc)
if (urlList.length === 0) {
  console.log(`No sitemap URL modified since ${since}; nothing to submit`)
  process.exit(0)
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'pkhub.co', key, keyLocation: `${SITE}/${key}.txt`, urlList }),
})
console.log(`IndexNow ${response.status} for ${urlList.length} URLs:\n${urlList.join('\n')}`)
if (!response.ok && response.status !== 202) process.exit(1)
