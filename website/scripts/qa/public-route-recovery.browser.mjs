import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const origin = process.env.PUBLIC_ORIGIN || 'http://127.0.0.1:8870';
assert.equal(new URL(origin).hostname, '127.0.0.1');
const revision = process.env.PUBLIC_REVISION;
assert(revision, 'Pin the actual build revision');
const output = process.env.QA_OUTPUT;
assert(output, 'Choose a fresh owned output directory');
await fs.mkdir(output, { recursive: true });
const pin = async () => {
  const response = await fetch(origin + '/revision.json', { cache: 'no-store' });
  assert(response.ok);
  assert.equal((await response.json()).revision, revision);
};
await pin();
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const results = [];
const modes = [
  'bootstrap-hold',
  'bootstrap-failure',
  'route-hold',
  'route-failure',
  'route-draft',
  'missing-route',
];
const requested = process.env.QA_RECOVERY_MODES?.split(',') || modes;
assert(requested.every((mode) => modes.includes(mode)));
const widths = process.env.QA_WIDTHS?.split(',').map(Number) || [1280, 390];
const preferences = process.env.QA_MOTION ? [process.env.QA_MOTION] : ['no-preference', 'reduce'];
try {
  for (const motion of preferences)
    for (const width of widths)
      for (const language of ['th', 'en'])
        for (const mode of requested) {
          console.log('CASE', width, motion, language, mode);
          const context = await browser.newContext({
            viewport: { width, height: 900 },
            reducedMotion: motion,
          });
          const page = await context.newPage();
          const issues = [];
          const requests = [];
          page.on('pageerror', (error) => issues.push(error.message));
          await page.route('**/*', (route) => {
            requests.push({ method: route.request().method(), url: route.request().url() });
            return route.request().method() === 'GET' ? route.continue() : route.abort();
          });
          let release;
          const target = `/${language}/join?ref=QA-ROUTE-080#application`;
          const chunk = /\/assets\/Join-[^/]+\.js(?:\?.*)?$/;
          if (!['missing-route', 'route-draft'].includes(mode))
            await page.route(chunk, async (route) => {
              if (mode.endsWith('failure')) return route.abort('failed');
              await new Promise((resolve) => {
                release = resolve;
              });
              return route.continue();
            });
          if (mode === 'route-draft') {
            await page.goto(origin + target);
            await page.waitForFunction(
              () => !document.getElementById('root').hasAttribute('aria-busy'),
            );
            await page.locator('#shopName').fill('QA Retained Draft 080');
            await page.evaluate((target) => {
              history.pushState(null, '', target.replace('QA-ROUTE-080', 'QA-QUERY-080'));
              window.dispatchEvent(new PopStateEvent('popstate'));
            }, target);
            if (width === 390)
              await page
                .getByRole('button', {
                  name: language === 'th' ? 'เปิดเมนู' : 'Open menu',
                  exact: true,
                })
                .click();
            await page
              .getByRole('button', { name: language === 'th' ? 'EN' : 'ไทย', exact: true })
              .filter({ visible: true })
              .click();
            await page.waitForFunction(
              (next) => document.documentElement.lang === next,
              language === 'th' ? 'en' : 'th',
            );
            assert.equal(await page.locator('#shopName').inputValue(), 'QA Retained Draft 080');
            assert.equal(new URL(page.url()).searchParams.get('ref'), 'QA-QUERY-080');
            assert.equal(new URL(page.url()).hash, '#application');
          } else if (mode === 'missing-route') {
            for (const suffix of ['qa-unpublished-080', 'qa-unpublished-080.html']) {
              const url = origin + `/${language}/` + suffix;
              const response = await page.goto(url);
              assert.equal(response.status(), 404);
              await page.waitForFunction(
                () => !document.getElementById('root').hasAttribute('aria-busy'),
              );
              assert.equal(page.url(), url);
              assert.equal(await page.locator('h1').count(), 1);
              assert(await page.getByRole('heading', { name: /Page not found/ }).isVisible());
              assert.equal(
                await page.locator('meta[name=robots]').getAttribute('content'),
                'noindex, follow',
              );
              assert.equal(await page.locator('#root').getAttribute('data-pk-not-found'), '');
            }
            await page.screenshot({
              path: path.join(output, `${mode}-${language}-${width}-${motion}.png`),
              fullPage: true,
            });
            const home = page.getByRole('link', {
              name: language === 'en' ? 'English home' : 'หน้าหลักภาษาไทย',
              exact: true,
            });
            await home.focus();
            await page.keyboard.press('Enter');
            await page.waitForURL(origin + '/' + language);
            await page.waitForFunction(
              () => !document.getElementById('root').hasAttribute('aria-busy'),
            );
          } else if (mode.startsWith('bootstrap-')) {
            await page.goto(origin + target, { waitUntil: 'domcontentloaded' });
            if (mode === 'bootstrap-hold') {
              await page
                .getByRole('status')
                .filter({
                  hasText: language === 'en' ? 'Loading page controls' : 'กำลังเปิดการทำงาน',
                })
                .waitFor();
              assert.equal(
                await page.locator('h1').count(),
                1,
                'prerendered content remains readable',
              );
              assert.equal(await page.locator('form').getAttribute('inert'), '');
              await page.locator('form').evaluate((form) => form.requestSubmit());
              assert.equal(
                page.url(),
                origin + target,
                'unhydrated form cannot submit a native GET',
              );
              await page.screenshot({
                path: path.join(output, `${mode}-${language}-${width}-${motion}.png`),
                fullPage: false,
              });
              release();
              await page.waitForFunction(
                () => !document.getElementById('root').hasAttribute('aria-busy'),
              );
              assert.equal(await page.locator('.pk-load-error').count(), 0);
            } else {
              const notice = page
                .getByRole('alert')
                .filter({
                  hasText:
                    language === 'en'
                      ? 'Page controls could not load'
                      : 'โหลดการทำงานของหน้าไม่สำเร็จ',
                });
              await notice.waitFor();
              assert(await notice.evaluate((element) => element === document.activeElement));
              assert.equal(
                await page.locator('form :is(button,input,select,textarea):not(:disabled)').count(),
                0,
              );
              await page.screenshot({
                path: path.join(output, `${mode}-${language}-${width}-${motion}.png`),
                fullPage: false,
              });
              await page.unroute(chunk);
              const reload = notice.getByRole('link', {
                name: language === 'en' ? 'Reload page' : 'โหลดหน้าอีกครั้ง',
                exact: true,
              });
              assert.equal(await reload.getAttribute('href'), origin + target);
              await reload.focus();
              const [navigation] = await Promise.all([
                page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                page.keyboard.press('Enter'),
              ]);
              assert(navigation, 'reload must navigate the document, including fragment URLs');
              await page.waitForFunction(
                () => !document.getElementById('root').hasAttribute('aria-busy'),
              );
              assert.equal(await page.locator('.pk-load-error').count(), 0);
            }
          } else {
            await page.goto(origin + '/' + language);
            await page.waitForFunction(
              () => !document.getElementById('root').hasAttribute('aria-busy'),
            );
            // Exercise React Router's client transition with a cold page module;
            // ordinary anchor document loads are covered by bootstrap cases above.
            await page.evaluate((target) => {
              history.pushState(null, '', target);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }, target);
            const title =
              mode === 'route-hold'
                ? language === 'en'
                  ? 'Opening your page'
                  : 'กำลังเปิดหน้า'
                : language === 'en'
                  ? 'This page could not open'
                  : 'ยังเปิดหน้านี้ไม่ได้';
            const heading = page.getByRole('heading', { name: title, exact: true });
            await heading.waitFor();
            assert.equal(await page.locator('h1').count(), 1);
            assert.equal(await page.getByRole('link', { name: 'PK HUB', exact: true }).count(), 1);
            if (mode === 'route-hold') {
              assert.equal(await page.locator('#route-feedback').getAttribute('aria-busy'), 'true');
              assert.equal(
                await page
                  .locator('.pk-route-progress span')
                  .evaluate((el) => getComputedStyle(el).backgroundColor),
                'rgb(36, 87, 214)',
                'progress uses the existing cobalt token',
              );
              if (motion === 'reduce')
                assert(
                  await page
                    .locator('.pk-route-progress span')
                    .evaluate(
                      (el) => parseFloat(getComputedStyle(el).animationDuration) <= 0.00001,
                    ),
                );
              await page.screenshot({
                path: path.join(output, `${mode}-${language}-${width}-${motion}.png`),
                fullPage: true,
              });
              release();
              await page.locator('#contactName').waitFor();
            } else {
              assert(await heading.evaluate((element) => element === document.activeElement));
              await page.screenshot({
                path: path.join(output, `${mode}-${language}-${width}-${motion}.png`),
                fullPage: true,
              });
              const reload = page.getByRole('link', {
                name: language === 'en' ? 'Reload this page' : 'โหลดหน้านี้อีกครั้ง',
                exact: true,
              });
              assert.equal(await reload.getAttribute('href'), target);
              await page.unroute(chunk);
              await reload.focus();
              const [navigation] = await Promise.all([
                page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                page.keyboard.press('Enter'),
              ]);
              assert(navigation, 'reload must navigate the document, including fragment URLs');
              await page.locator('#contactName').waitFor();
              await page.waitForFunction(
                () => !document.getElementById('root').hasAttribute('aria-busy'),
              );
            }
          }
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
          assert.deepEqual(
            requests.filter((request) => request.method !== 'GET'),
            [],
          );
          assert.deepEqual(issues, []);
          results.push({ width, motion, language, mode, passed: true, issues: 0, writes: 0 });
          await context.close();
        }
  if (requested.includes('missing-route'))
    for (const width of widths)
      for (const language of ['th', 'en']) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          javaScriptEnabled: false,
        });
        const page = await context.newPage();
        await page.route('**/*', (route) =>
          route.request().method() === 'GET' ? route.continue() : route.abort(),
        );
        const response = await page.goto(origin + `/${language}/qa-no-script-080`);
        assert.equal(response.status(), 404);
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(
          await page.locator('meta[name=robots]').getAttribute('content'),
          'noindex, follow',
        );
        await page.screenshot({
          path: path.join(output, `no-script-${language}-${width}.png`),
          fullPage: true,
        });
        const home = page.getByRole('link', {
          name: language === 'en' ? 'English home' : 'หน้าหลักภาษาไทย',
          exact: true,
        });
        await home.focus();
        const [navigation] = await Promise.all([
          page.waitForNavigation(),
          page.keyboard.press('Enter'),
        ]);
        assert.equal(navigation.status(), 200);
        assert.equal(page.url(), origin + '/' + language);
        results.push({ width, language, mode: 'missing-route-no-script', passed: true, writes: 0 });
        await context.close();
      }
} finally {
  await browser.close();
}
await pin();
const files = [
  'src/AppRoutes.tsx',
  'src/main.tsx',
  'src/components/HydrationReady.tsx',
  'src/components/RouteFeedback.tsx',
  'src/pages/NotFound.tsx',
  'src/index.css',
  'scripts/prerender.mjs',
  'vite.config.ts',
  'scripts/qa/public-route-recovery.browser.mjs',
];
const fingerprints = Object.fromEntries(
  await Promise.all(
    files.map(async (file) => [
      file,
      createHash('sha256')
        .update(await fs.readFile(file))
        .digest('hex'),
    ]),
  ),
);
await fs.writeFile(
  path.join(output, 'results.json'),
  JSON.stringify(
    {
      origin,
      revision,
      results,
      fingerprints,
      syntheticNetworkFailures: true,
      productionAcceptance: false,
    },
    null,
    2,
  ),
);
console.log('PASS', results.length);
