import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const read = (route) => readFileSync(resolve(dist, route, 'index.html'), 'utf8')
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'")

for (const lang of ['th', 'en']) {
  for (const suffix of ['', '/join', '/dealer/login']) {
    const route = lang + suffix
    const html = read(route)
    assert(html.includes(`<html lang="${lang}"`), `${route}: language`)
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one H1`)
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${route}: one canonical`)
    assert(html.includes(`rel="canonical" href="https://pkhub.co/${route}"`), `${route}: canonical destination`)
    assert(/<title>[^<]+<\/title>/.test(html), `${route}: title`)
    assert(/name="description"\s+content="[^"]+"/.test(html), `${route}: description`)
    for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      JSON.parse(match[1])
    }
    if (suffix === '/join' || suffix === '') {
      for (const alternate of ['th', 'en']) {
        assert(html.includes(`hreflang="${alternate}" href="https://pkhub.co/${alternate}${suffix}"`), `${route}: alternate ${alternate}`)
      }
    }
  }

  const html = read(lang)
  const body = html.split('<body>')[1]
  const schema = JSON.parse(html.match(/<script id="faq-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  assert.equal(schema.inLanguage, lang)
  assert.equal(schema.mainEntity.length, (body.match(/<details[ >]/g) ?? []).length)
  for (const question of schema.mainEntity) {
    assert(decode(body).includes(question.name), `${lang}: FAQ question matches rendered text`)
    assert(decode(body).includes(question.acceptedAnswer.text), `${lang}: FAQ answer matches rendered text`)
  }
  assert(!/opacity:\s*0(?:;|")/.test(body), `${lang}: prerendered content visible`)
  assert(/fetchPriority="high"/i.test(body), `${lang}: hero image priority`)
  assert(html.includes('rel="preload" as="image" href="/proof/storefront-building.webp"'))
  for (const match of body.matchAll(/<img\b[^>]*>/g)) {
    assert(/\bwidth="/.test(match[0]) && /\bheight="/.test(match[0]), `${lang}: image dimensions`)
    assert(/\balt="/.test(match[0]), `${lang}: image alternative text`)
    const src = match[0].match(/\bsrc="([^"]+)"/)?.[1]
    if (src?.startsWith('/')) assert(existsSync(resolve(dist, src.slice(1))), `${lang}: missing image ${src}`)
  }
  for (const match of body.matchAll(/href="#([^"]+)"/g)) {
    assert(body.includes(`id="${match[1]}"`), `${lang}: broken section link ${match[1]}`)
  }
  assert(body.includes(`href="/${lang}/join"`), `${lang}: partner CTA`)
  assert(body.includes('href="https://lin.ee/VEgW6qG"'), `${lang}: LINE CTA`)
  assert(body.includes('preload="none"'), `${lang}: video deferred until requested`)
  assert(body.includes('id="dealer-portal"'), `${lang}: Dealer Portal is prerendered`)
  assert(body.includes('01 / TRUSTED SUPPLY') && body.includes('02 / DEALER PORTAL'), `${lang}: ecosystem content`)
  assert(!body.includes('PK INTELLIGENCE') && !body.includes('FINANCING OPTIONS'), `${lang}: speculative services removed`)
  assert(body.includes(lang === 'th' ? 'สิทธิ์ใช้งานเปิดหลังตรวจสอบและอนุมัติ' : 'Access follows review and approval.'), `${lang}: access boundary`)
  assert(body.includes(lang === 'th' ? 'ภาพอธิบายการใช้งานจากโครงสร้าง Portal' : 'Illustration based on the Portal structure'), `${lang}: illustrative UI labelled`)
  assert(body.includes('/logo-transparent.png'), `${lang}: transparent brand asset`)
}
const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8')
const { rewrites } = JSON.parse(readFileSync('vercel.json', 'utf8'))
for (const match of sitemap.matchAll(/<loc>https:\/\/pkhub.co\/([^<]+)<\/loc>/g)) {
  assert(existsSync(resolve(dist, match[1], 'index.html')), `Sitemap has no rendered page: ${match[1]}`)
  const path = '/' + match[1]
  const rule = rewrites.find(({ source }) => new RegExp('^' + source.replace(/:[a-z]+/g, '[^/]+') + '$').test(path))
  assert(rule, `No hosting route for ${path}`)
  const params = rule.source.match(/:[a-z]+/g) ?? []
  const values = path.match(new RegExp('^' + rule.source.replace(/:[a-z]+/g, '([^/]+)') + '$'))
  let destination = rule.destination
  params.forEach((param, index) => { destination = destination.replace(param, values[index + 1]) })
  assert.equal(destination, path + '/index.html', `Wrong hosted HTML for ${path}`)
}
assert(!rewrites.some(({ destination }) => destination === '/index.html'), 'No homepage catch-all for unknown routes')
console.log('PASS: locale metadata, canonical/hreflang, visible prerendering, truthful ecosystem content, FAQ parity, images, CTA anchors, deferred video, and sitemap routes')
