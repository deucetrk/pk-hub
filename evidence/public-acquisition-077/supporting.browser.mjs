import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Supplemental public recovery proof. All non-GET requests are aborted;
// synthetic form values never reach the lead fixture or a provider.
const origin = 'http://127.0.0.1:8870';
const revision = process.env.PUBLIC_REVISION;
assert(revision, 'Pin the reviewed runtime revision');
const output = process.env.QA_OUTPUT;
assert(output, 'Choose a fresh output directory');
await fs.mkdir(output, { recursive: true });
const pin = async () => {
  const response = await fetch(`${origin}/revision.json`, { cache: 'no-store' });
  assert(response.ok);
  assert.equal((await response.json()).revision, revision);
};
await pin();
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH });
const results = [];
try {
  for (const motion of ['no-preference', 'reduce']) for (const width of [1280, 390]) {
    for (const mode of ['missing-article', 'fractional-page', 'past-last-page']) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: motion });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', route => route.request().method() === 'GET' ? route.continue() : route.abort());
      const route = mode === 'missing-article' ? '/th/blog/qa-unpublished-077' : mode === 'fractional-page' ? '/th/blog/page/1.5' : '/th/blog/page/999';
      // Vite's unknown-route fallback is the prerendered Home document, unlike
      // the hosted static 404. Exercise these SPA recovery paths from a valid
      // hydrated journal rather than claiming fallback hydration is hosted proof.
      await page.goto(origin + '/th/blog');
      await page.locator('input[type=search]').waitFor();
      await page.evaluate(route => {
        history.pushState(null, '', route);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, route);
      if (mode === 'missing-article') {
        await page.getByRole('heading', { name: 'ไม่พบบทความนี้', exact: true }).waitFor();
        const recovery = page.getByRole('link', { name: 'ดูบทความทั้งหมด', exact: true });
        await recovery.focus();
        await page.keyboard.press('Enter');
      }
      await page.waitForURL(origin + '/th/blog');
      await page.locator('input[type=search]').waitFor();
      assert.equal(await page.locator('h1').count(), 1);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.deepEqual(errors, []);
      results.push({ mode, width, motion, passed: true });
      await context.close();
    }
    for (const language of ['th', 'en']) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: motion });
      const page = await context.newPage();
      const errors = [];
      let blockedPosts = 0;
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', route => {
        if (route.request().method() === 'GET') return route.continue();
        blockedPosts += 1;
        return route.abort();
      });
      await page.goto(`${origin}/${language}/join`);
      await page.locator('#contactName').fill('QA Contact');
      await page.locator('#shopName').fill('QA Supplemental Store');
      await page.locator('#province').fill('QA Province');
      await page.locator('#phone').fill('0999999999');
      await page.locator('#interested-brands button').first().click();
      await page.locator('#partner-consent').check();
      await page.locator('button[type=submit]').click();
      await page.waitForFunction(() => {
        const element = document.activeElement;
        if (element?.getAttribute('role') !== 'alert') return false;
        const box = element.getBoundingClientRect();
        return box.top >= 76 && box.bottom <= innerHeight;
      });
      const geometry = await page.getByRole('alert').evaluate(element => {
        const box = element.getBoundingClientRect();
        return { top: box.top, bottom: box.bottom, height: box.height };
      });
      assert.equal(blockedPosts, 1);
      assert.deepEqual(errors, []);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (motion === 'no-preference') await page.screenshot({ path: path.join(output, `error-settled-${language}-${width}.png`) });
      results.push({ mode: 'settled-error-focus', width, motion, language, passed: true, geometry, blockedPosts });
      await context.close();
    }
  }
  await pin();
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify({ origin, revision, results }, null, 2));
  console.log(JSON.stringify({ cases: results.length }));
} finally {
  await browser.close();
}
