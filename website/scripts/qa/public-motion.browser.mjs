import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Read-only hosted acceptance: never send leads, analytics, or other mutations.
// Use an installed Playwright module and browser; this script installs nothing.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const origin = process.env.PUBLIC_ORIGIN || 'https://pkhub.co';
const expectedRevision = process.env.PUBLIC_REVISION;
if (!expectedRevision) throw new Error('PUBLIC_REVISION must pin the revision under review');
const output = process.env.QA_OUTPUT || '/tmp/pkhub-public-motion';
const motion = process.env.QA_MOTION === 'reduce' ? 'reduce' : 'no-preference';
await fs.mkdir(output, { recursive: true });
const routes = process.env.QA_ROUTES ? process.env.QA_ROUTES.split(',') : ['/th', '/en', '/th/join', '/en/join', '/th/dealer/login', '/en/dealer/login', '/th/blog',
  ...['checklist-choose-mobile-phone-wholesaler', 'how-to-start-mobile-phone-shop',
    'what-is-thai-market-official-phone', 'mobile-shop-inventory-cashflow-guide',
    'mobile-phone-reseller-documents-tax-invoice', 'first-wholesale-mobile-phone-order']
    .map(slug => `/th/blog/${slug}`)];
const report = { origin, expectedRevision, motion, startedAt: new Date().toISOString(), results: [] };
const assert = (value, message) => { if (!value) throw new Error(message); };
async function revision() {
  const response = await fetch(`${origin}/revision.json`, { cache: 'no-store' });
  assert(response.ok, 'Revision request failed');
  const body = await response.json();
  assert(body.revision === expectedRevision, `Revision changed: ${body.revision}`);
  return body.revision;
}
report.beforeRevision = await revision();
const browser = await chromium.launch({ headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
async function test(page, name, run, context) {
  try {
    const details = await run();
    report.results.push({ ...context, name, passed: true, details });
    console.log(`PASS ${context.width} ${context.route} ${name}`);
  } catch (error) {
    report.results.push({ ...context, name, passed: false, error: error.message });
    console.log(`FAIL ${context.width} ${context.route} ${name}: ${error.message}`);
    await page.screenshot({ path: path.join(output,
      `${context.width}-${context.route.replaceAll('/', '_')}-${name.replaceAll(' ', '-')}-failure.png`) });
  }
}
async function settled(page, selector) {
  await page.waitForFunction(selector => {
    const el = document.querySelector(selector);
    if (!el) return false;
    const style = getComputedStyle(el);
    return Number(style.opacity) === 1 && ['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(style.transform);
  }, selector);
}
async function tabs(page, id, child, heading) {
  const panel = page.locator(`#${id}`);
  await panel.scrollIntoViewIfNeeded();
  await settled(page, `#${id} > ${child}`);
  const before = await panel.locator(heading).innerText();
  const tabs = page.locator(`[role=tab][aria-controls=${id}]`);
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  const samples = [];
  // Observe the actual JS-driven transition rather than CSS declarations.
  for (let i = 0; i < 16; i++) {
    samples.push(await panel.evaluate((el, child) => {
      // Resolve the animated child in this same browser task. A retained element
      // handle can detach during AnimatePresence and return empty computed styles.
      const current = el.querySelector(child);
      if (!current) return { pending: true };
      const style = getComputedStyle(current);
      return { opacity: Number(style.opacity), transform: style.transform };
    }, child));
    await page.waitForTimeout(50);
  }
  await settled(page, `#${id} > ${child}`);
  const after = await panel.locator(heading).innerText();
  assert(before !== after, 'Tab did not change content');
  assert(motion === 'reduce' ? samples.every(s => s.pending || (s.opacity === 1 && ['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(s.transform)))
    : samples.some(s => s.opacity < 0.99), `Tab motion does not match preference: ${JSON.stringify(samples)}`);
  assert(await tabs.nth(1).getAttribute('aria-selected') === 'true', 'Wrong selected tab');
  assert(await tabs.nth(1).getAttribute('tabindex') === '0', 'Wrong roving tabindex');
  assert(await tabs.nth(1).evaluate(el => el === document.activeElement), 'Tab focus lost');
  await page.keyboard.press('End');
  await settled(page, `#${id} > ${child}`);
  assert(await tabs.nth(2).getAttribute('aria-selected') === 'true', 'End selection');
  await page.keyboard.press('Home');
  await settled(page, `#${id} > ${child}`);
  assert(await tabs.nth(0).getAttribute('aria-selected') === 'true', 'Home selection');
  assert(await tabs.nth(0).evaluate(el => el === document.activeElement), 'Home focus lost');
  return { before, after, samples };
}
try {
  for (const width of [1280, 390]) for (const route of routes) {
    const context = { width, route };
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: motion });
    const errors = [];
    const aborted = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', request => {
      if (request.request().method() === 'GET') return request.continue();
      aborted.push(request.request().method());
      return request.abort();
    });
    const response = await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
    if (route === '/th' || route === '/en') {
      if (motion !== 'reduce') await test(page, 'hero entrance', async () => {
        const sequence = await page.locator('.pk-hero-copy > *').evaluateAll(elements => elements.map(el => {
          const style = getComputedStyle(el);
          return { name: style.animationName, duration: style.animationDuration, delay: style.animationDelay };
        }));
        assert(sequence.length >= 5 && sequence.every(s => s.name === 'pk-hero-enter'), 'Missing staged sequence');
        const observed = await page.locator('.pk-hero-media > img').evaluate(el => {
          const animation = el.getAnimations()[0];
          if (!animation) return null;
          animation.pause();
          animation.currentTime = 300;
          const style = getComputedStyle(el);
          const sample = { clip: style.clipPath, transform: style.transform };
          animation.play();
          return sample;
        });
        assert(observed && observed.clip !== 'inset(0px)' && observed.transform !== 'matrix(1, 0, 0, 1, 0, 0)', 'Image entrance not rendered');
        await page.waitForTimeout(1500);
        assert(Number(await page.locator('h1').evaluate(el => getComputedStyle(el).opacity)) === 1, 'Entrance did not settle');
        return { sequence, observed };
      }, context);
      await page.waitForLoadState('networkidle');
      if (width === 1280 && motion !== 'reduce') await test(page, 'hero hover depth', async () => {
        await page.mouse.move(0, 0);
        const image = page.locator('.pk-hero-media > img');
        const before = await image.evaluate(el => getComputedStyle(el).transform);
        await page.locator('.pk-hero').hover();
        await page.waitForTimeout(650);
        const after = await image.evaluate(el => getComputedStyle(el).transform);
        assert(before !== after, `Image hover remains ${after}`);
        return { before, after };
      }, context);
      await test(page, 'all brands simultaneously visible', async () => {
        const brands = page.locator('#brands');
        await brands.scrollIntoViewIfNeeded();
        const visible = await brands.locator('img').evaluateAll(images => images.filter(img => {
          const rect = img.getBoundingClientRect();
          return rect.width > 0 && rect.left >= 0 && rect.right <= innerWidth && !img.closest('[aria-hidden=true]');
        }).map(img => img.alt));
        assert(visible.length === 8 && new Set(visible).size === 8, `Only these brands are simultaneously visible: ${visible.join(', ')}`);
        assert(await brands.evaluate(el => !el.getAnimations({ subtree: true }).some(a => a.effect.getComputedTiming().iterations === Infinity)), 'Brand rail continuously animated');
        await page.screenshot({ path: path.join(output, `brands-${route.slice(1)}-${width}.png`) });
        return { visible };
      }, context);
      await test(page, 'portal keyboard transition', () => tabs(page, 'portal-panel', 'div', 'h4'), context);
      await test(page, 'proof keyboard transition', () => tabs(page, 'proof-panel', 'figure', 'h3'), context);
      await test(page, 'FAQ keyboard', async () => {
        const details = page.locator('#faq details').first();
        const summary = details.locator('summary');
        await summary.scrollIntoViewIfNeeded();
        await summary.focus();
        await page.keyboard.press('Enter');
        assert(await details.getAttribute('open') !== null, 'FAQ did not open');
        assert(await details.locator('p').first().isVisible(), 'FAQ answer hidden');
        await page.keyboard.press('Space');
        assert(await details.getAttribute('open') === null, 'FAQ did not close');
        return { focusRetained: await summary.evaluate(el => el === document.activeElement) };
      }, context);
      if (width === 390) await test(page, 'mobile menu and locale', async () => {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        const button = page.locator('button[aria-controls=pkhub-mobile-navigation]');
        await button.click();
        assert(await button.getAttribute('aria-expanded') === 'true', 'Menu did not open');
        await page.keyboard.press('Escape');
        await page.waitForTimeout(50);
        assert(await button.getAttribute('aria-expanded') === 'false', 'Escape did not close');
        assert(await button.evaluate(el => el === document.activeElement), 'Escape focus lost');
        await button.click();
        await page.locator('#pkhub-mobile-navigation button').filter({ hasText: route === '/th' ? 'EN' : 'ไทย' }).click();
        await page.waitForURL(`${origin}${route === '/th' ? '/en' : '/th'}`);
        assert(await button.getAttribute('aria-expanded') === 'false', 'Locale leaves menu open');
        await page.waitForTimeout(100);
        assert(await button.evaluate(el => el === document.activeElement), 'Locale focus lost');
        await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
        await button.click();
        await page.locator(`#pkhub-mobile-navigation a[href="${route}#proof"]`).click();
        await page.waitForURL(`${origin}${route}#proof`);
        await page.waitForTimeout(1000);
        assert(await button.getAttribute('aria-expanded') === 'false', 'Anchor leaves menu open');
        const rect = await page.locator('#proof').boundingBox();
        assert(rect && rect.y >= 60 && rect.y < 200, `Anchor hidden by header: ${JSON.stringify(rect)}`);
        return { anchorTop: rect.y, focus: await page.evaluate(() => document.activeElement.tagName) };
      }, context);
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(output, `home-${route.slice(1)}-${width}.png`) });
    }
    if (route.startsWith('/th/blog/')) await test(page, 'article TOC keyboard', async () => {
      const link = page.locator('#article-toc a').first();
      const href = await link.getAttribute('href');
      await link.scrollIntoViewIfNeeded();
      await link.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      assert(new URL(page.url()).hash === href, 'TOC hash not followed');
      const rect = await page.locator(href).boundingBox();
      assert(rect && rect.y >= 60 && rect.y < 250, `Section hidden by header: ${JSON.stringify(rect)}`);
      return { target: href, top: rect.y };
    }, context);
    if (route === '/th/blog') await test(page, 'journal search recovery', async () => {
      await page.waitForLoadState('networkidle');
      const search = page.getByRole('searchbox');
      await search.fill('qa-no-matching-article');
      await page.getByRole('heading', { name: 'ยังไม่พบบทความที่ตรงกับคำนี้' }).waitFor();
      const clear = page.getByRole('button', { name: 'ล้างตัวกรอง', exact: true });
      await clear.focus();
      await page.keyboard.press('Enter');
      await page.waitForURL(`${origin}/th/blog`);
      await page.waitForFunction(() => document.querySelector('input[type=search]').value === '');
      await page.waitForFunction(() => document.activeElement === document.querySelector('input[type=search]'));
      assert(await search.inputValue() === '', 'Search was not cleared');
      assert(await search.evaluate(el => el === document.activeElement), 'Recovery focus lost');
      return { recovered: true };
    }, context);
    await test(page, 'route readability and assets', async () => {
      assert(response?.status() === 200, `HTTP ${response?.status()}`);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 700) {
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
        await page.waitForTimeout(80);
      }
      await page.waitForTimeout(1000);
      const measured = await page.evaluate(() => ({
        h1Count: document.querySelectorAll('h1').length,
        h1Opacity: getComputedStyle(document.querySelector('h1')).opacity,
        overflow: document.documentElement.scrollWidth > innerWidth,
        missingImages: [...document.images].filter(img => {
          const rect = img.getBoundingClientRect();
          return rect.width > 0 && rect.right > 0 && rect.left < innerWidth && (!img.complete || img.naturalWidth === 0);
        }).map(img => new URL(img.src).pathname),
        reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
      }));
      assert(measured.h1Count === 1 && Number(measured.h1Opacity) === 1, 'Unreadable or missing heading');
      assert(!measured.overflow && measured.reduced === (motion === 'reduce'), `Unexpected layout/preference: ${JSON.stringify(measured)}`);
      if (motion === 'reduce') {
        const reduced = await page.evaluate(() => {
          let maxDuration = 0;
          for (const el of document.querySelectorAll('*')) for (const pseudo of [null, '::before', '::after']) {
            const style = getComputedStyle(el, pseudo);
            for (const times of [style.animationDuration, style.transitionDuration])
              maxDuration = Math.max(maxDuration, ...times.split(',').map(parseFloat));
          }
          return { maxDuration, running: document.getAnimations().filter(a => a.playState === 'running').length,
            scroll: getComputedStyle(document.documentElement).scrollBehavior };
        });
        assert(reduced.maxDuration <= 0.0000101 && reduced.running === 0 && reduced.scroll === 'auto', `Motion not reduced: ${JSON.stringify(reduced)}`);
        measured.reducedMeasurement = reduced;
      }
      assert(measured.missingImages.length === 0, `Broken/unloaded images: ${JSON.stringify(measured.missingImages)}`);
      assert(errors.length === 0, `Page errors: ${JSON.stringify(errors)}`);
      return { status: response.status(), ...measured, abortedMethods: aborted, errors };
    }, context);
    await page.close();
  }
  report.afterRevision = await revision();
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  report.passed = report.results.filter(result => result.passed).length;
  report.failed = report.results.filter(result => !result.passed).length;
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ passed: report.passed, failed: report.failed, output }));
if (report.failed) process.exitCode = 1;
