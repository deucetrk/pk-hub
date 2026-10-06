import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const read = (route) => readFileSync(resolve(dist, route, 'index.html'), 'utf8')

for (const lang of ['th', 'en']) {
  for (const suffix of ['', '/join', '/dealer/login', '/products/partner-marketing']) {
    const route = lang + suffix
    const html = read(route)
    assert(html.includes(`<html lang="${lang}"`), `${route}: language`)
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one H1`)
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${route}: one canonical`)
    assert(
      html.includes(`rel="canonical" href="https://pkhub.co/${route}"`),
      `${route}: canonical destination`,
    )
    assert(/<title>[^<]+<\/title>/.test(html), `${route}: title`)
    assert(/name="description"\s+content="[^"]+"/.test(html), `${route}: description`)
    for (const match of html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    )) {
      JSON.parse(match[1])
    }
    if (suffix === '/join' || suffix === '' || suffix === '/products/partner-marketing') {
      for (const alternate of ['th', 'en']) {
        assert(
          html.includes(`hreflang="${alternate}" href="https://pkhub.co/${alternate}${suffix}"`),
          `${route}: alternate ${alternate}`,
        )
      }
    }
  }

  const html = read(lang)
  const body = html.split('<body>')[1]
  assert(!/opacity:\s*0(?:;|")/.test(body), `${lang}: prerendered content visible`)
  assert(/fetchPriority="high"/i.test(body), `${lang}: hero image priority`)
  assert(html.includes('rel="preload" as="image" href="/pkhub-v7/brands/logo.png"'))
  for (const match of body.matchAll(/<img\b[^>]*>/g)) {
    assert(/\bwidth="/.test(match[0]) && /\bheight="/.test(match[0]), `${lang}: image dimensions on ${match[0]}`)
    assert(/\balt="/.test(match[0]), `${lang}: image alternative text on ${match[0]}`)
    const src = match[0].match(/\bsrc="([^"]+)"/)?.[1]
    if (src?.startsWith('/'))
      assert(existsSync(resolve(dist, src.slice(1))), `${lang}: missing image ${src}`)
  }
  for (const match of body.matchAll(/href="#([^"]+)"/g)) {
    assert(body.includes(`id="${match[1]}"`), `${lang}: broken section link ${match[1]}`)
  }
  assert(body.includes(`href="/${lang}/join"`), `${lang}: partner CTA`)
  assert(body.includes('href="https://lin.ee/VEgW6qG"'), `${lang}: LINE CTA`)
  assert(body.includes('id="v4-brands"') && body.includes('id="v4-stock"') && body.includes('id="v4-customer"') && body.includes('id="v6-growth"') && body.includes('id="v4-start"'), `${lang}: V7 sections present`)
  assert(body.includes('/pkhub-v7/brands/logo.png'), `${lang}: V7 authentic logo asset`)
  assert(!body.includes('PK INTELLIGENCE'), `${lang}: speculative services removed`)
}
const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8')
const { rewrites } = JSON.parse(readFileSync('vercel.json', 'utf8'))
for (const match of sitemap.matchAll(/<loc>https:\/\/pkhub.co\/([^<]+)<\/loc>/g)) {
  assert(
    existsSync(resolve(dist, match[1], 'index.html')),
    `Sitemap has no rendered page: ${match[1]}`,
  )
  const path = '/' + match[1]
  const rule = rewrites.find(({ source }) =>
    new RegExp('^' + source.replace(/:[a-z]+/g, '[^/]+') + '$').test(path),
  )
  assert(rule, `No hosting route for ${path}`)
  const params = rule.source.match(/:[a-z]+/g) ?? []
  const values = path.match(new RegExp('^' + rule.source.replace(/:[a-z]+/g, '([^/]+)') + '$'))
  let destination = rule.destination
  params.forEach((param, index) => {
    destination = destination.replace(param, values[index + 1])
  })
  assert.equal(destination, path + '/index.html', `Wrong hosted HTML for ${path}`)
}
assert(
  !rewrites.some(({ destination }) => destination === '/index.html'),
  'No homepage catch-all for unknown routes',
)
const missingPage = readFileSync(resolve(dist, '404.html'), 'utf-8')
for (const language of ['th', 'en']) {
  const application = readFileSync(resolve(dist, language, 'join', 'index.html'), 'utf-8')
  assert(
    application.includes('inert="" data-pk-bootstrap-form=""'),
    'Static forms wait for hydration',
  )
  assert(
    application.includes('data-pk-bootstrap-notice=""'),
    'Static forms retain a native contact path',
  )
}
assert(
  missingPage.includes('data-pk-not-found=""'),
  'Static 404 must hydrate its exact recovery document',
)
assert.equal((missingPage.match(/<h1\b/g) ?? []).length, 1, 'Static 404 has one main heading')
assert(
  missingPage.includes('name="robots" content="noindex, follow"'),
  'Missing pages are not indexed',
)
for (const href of ['/th', '/en', '/th/blog'])
  assert(missingPage.includes(`href="${href}"`), 'Static recovery links work without JavaScript')
console.log(
  'PASS: locale metadata, canonical/hreflang, visible prerendering, V7 ecosystem, images, CTA anchors, bootstrap form containment, static 404 and sitemap routes',
)
