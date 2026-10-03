// Actual public build, synthetic loopback lead transport only. Never use a hosted origin.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const origin = process.env.PUBLIC_ORIGIN ?? 'http://127.0.0.1:8870';
assert.equal(origin, 'http://127.0.0.1:8870');
const revision = process.env.PUBLIC_REVISION;
assert(revision);
const output = process.env.QA_OUTPUT ?? '/tmp/pkhub-acquisition-077';
await fs.mkdir(output, { recursive: true });
const pin = async () => {
  const response = await fetch(origin + '/revision.json');
  assert(response.ok);
  assert.equal((await response.json()).revision, revision);
};
await pin();
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
let delivery = 'ok';
const requests = [];
const pending = [];
const server = http.createServer(async (req, res) => {
  assert.equal(req.method, 'POST');
  assert.equal(req.url, '/lead');
  let body = '';
  for await (const chunk of req) body += chunk;
  requests.push(Object.fromEntries(new URLSearchParams(body)));
  if (delivery === 'fail') return res.destroy();
  res.statusCode = 204;
  if (delivery === 'hold') pending.push(res);
  else res.end();
});
await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(8871, '127.0.0.1', resolve);
});
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_PATH,
});
const results = [];
let active;
const fill = async (page, shop = 'QA Public Store') => {
  for (const [id, value] of Object.entries({
    contactName: 'QA Contact',
    shopName: shop,
    province: 'QA Province',
    phone: '0999999999',
  }))
    await page.locator('#' + id).fill(value);
  await page
    .locator('#interested-brands')
    .getByRole('button', { name: 'Apple', exact: true })
    .click();
  await page.locator('#partner-consent').check();
};
const waitRequest = async (count) => {
  for (let i = 0; requests.length < count && i < 200; i++)
    await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(requests.length, count);
};
const screenshot = async (page, name) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(output, name + '.png'), fullPage: true });
};
const focused = async (page, id) =>
  page.waitForFunction((id) => document.activeElement?.id === id, id);
const visibleFocus = async (page, id) => {
  await focused(page, id);
  await page.waitForFunction((id) => {
    const box = document.getElementById(id).getBoundingClientRect();
    return box.top >= 76 && box.bottom <= window.innerHeight;
  }, id);
};
try {
  for (const motion of ['no-preference', 'reduce'])
    for (const width of [1280, 390])
      for (const language of ['th', 'en'])
        for (const mode of [
          'layout',
          'validation',
          'pending',
          'error-retry',
          'long-record',
          'optional-invalid',
        ]) {
          console.log('CASE', motion, width, language, mode);
          delivery = mode === 'pending' ? 'hold' : mode === 'error-retry' ? 'fail' : 'ok';
          const context = await browser.newContext({
            viewport: { width, height: 900 },
            reducedMotion: motion,
          });
          const page = await context.newPage();
          active = page;
          const errors = [];
          const blocked = [];
          page.on('pageerror', (error) => errors.push(error.name));
          await page.route('**/*', (route) => {
            const req = route.request();
            if (
              req.method() === 'GET' ||
              (req.url() === 'http://127.0.0.1:8871/lead' && req.method() === 'POST')
            )
              return route.continue();
            blocked.push(req.method());
            return route.abort();
          });
          await page.goto(origin + '/' + language + '/join?ref=QA-PUBLIC-077');
          await page.locator('form').waitFor();
          await page.evaluate(() => document.fonts.ready);
          assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1);
          assert.equal(await page.getByRole('main').count(), 1);
          const submit = page.locator('button[type=submit]');
          const before = requests.length;
          if (mode === 'layout') {
            assert.equal(
              await page
                .locator('.pk-join-media img')
                .evaluate((node) => node.complete && node.naturalWidth > 0),
              true,
            );
            await page
              .getByRole('link', {
                name: language === 'th' ? 'ไปที่แบบฟอร์มสมัคร' : 'Go to the application form',
                exact: true,
              })
              .click();
            const box = await page.locator('#application-heading').boundingBox();
            assert(box.y >= 76 && box.y < 900);
            assert(
              await page
                .locator('#partner-application-form')
                .evaluate((node) => node.scrollWidth <= node.clientWidth),
            );
            if (motion === 'no-preference')
              await screenshot(page, 'join-' + language + '-' + width);
          } else if (mode === 'validation') {
            await submit.click();
            assert.equal(await page.getByRole('alert').count(), 6);
            await focused(page, 'contactName');
            assert.equal(
              await page.locator('#partner-consent').getAttribute('aria-describedby'),
              'partner-consent-error',
            );
            assert.equal(requests.length, before);
          } else {
            const shop =
              mode === 'long-record' ? 'QA-' + 'longstore'.repeat(40) : 'QA Public Store';
            await fill(page, shop);
            if (mode === 'optional-invalid') {
              await page.locator('.pk-form-details-summary').click();
              await page.locator('#email').fill('invalid-email');
              await page.locator('.pk-form-details-summary').click();
              await submit.click();
              await page.locator('#email').waitFor();
              await focused(page, 'email');
              assert.equal(requests.length, before);
            } else {
              const review = page.getByRole('region', {
                name:
                  language === 'th' ? 'ข้อมูลที่จะส่งกับใบสมัคร' : 'Application details to send',
                exact: true,
              });
              assert(await review.getByText(shop, { exact: true }).isVisible());
              await review.getByRole('button').click();
              assert(
                await page
                  .locator('#contactName')
                  .evaluate((node) => node === document.activeElement),
              );
              await submit.click();
              await waitRequest(before + 1);
              if (mode === 'pending') {
                assert(await page.locator('#shopName').isDisabled());
                assert(await submit.isDisabled());
                assert(await page.locator('#interested-brands button').first().isDisabled());
                assert(await page.getByRole('status').isVisible());
                await page.locator('form').evaluate((form) => {
                  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                  const input = form.querySelector('#shopName');
                  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(
                    input,
                    'QA Late Edit',
                  );
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                });
                assert.equal(requests.length, before + 1);
                for (const response of pending.splice(0)) response.end();
              }
              if (mode === 'error-retry') {
                await page
                  .getByRole('alert')
                  .filter({
                    hasText:
                      language === 'th' ? 'ยังยืนยันผลการส่งไม่ได้' : 'We cannot confirm delivery',
                  })
                  .waitFor();
                await page.waitForFunction(
                  () => document.activeElement?.getAttribute('role') === 'alert',
                );
                assert.equal(await page.locator('#shopName').inputValue(), shop);
                if (motion === 'no-preference')
                  await page.screenshot({
                    path: path.join(output, 'error-' + language + '-' + width + '.png'),
                  });
                delivery = 'ok';
                await submit.click();
                await waitRequest(before + 2);
                assert.deepEqual(requests[before + 1], requests[before]);
              }
              const heading = page.locator('#partner-result-heading');
              await heading.waitFor();
              await visibleFocus(page, 'partner-result-heading');
              assert(await page.getByText(shop, { exact: true }).isVisible());
              assert.equal(requests[before].shopName, shop);
              assert.equal(requests[before].language, language);
              assert.equal(requests[before].referralCode, 'QA-PUBLIC-077');
              assert.equal(requests[before].acquisitionSource, 'BD_REFERRAL');
              assert.equal(requests[before].website, '');
              assert.equal(requests[before].consent, 'true');
              assert.equal(Object.keys(requests[before]).length, 18);
              assert.equal(requests[before].interestedBrands, 'Apple');
              assert.match(requests[before].requestId, /^[a-f0-9-]{36}$/);
              assert.match(requests[before].sourcePage, /\/join\?ref=QA-PUBLIC-077/);
              assert(
                await page
                  .getByText(
                    language === 'th'
                      ? /หน้านี้ตรวจสอบไม่ได้ว่าปลายทางบันทึกข้อมูลสำเร็จ/
                      : /this page cannot confirm that it was recorded/,
                  )
                  .isVisible(),
              );
              if (mode === 'pending' && motion === 'no-preference')
                await page.screenshot({
                  path: path.join(output, 'result-' + language + '-' + width + '.png'),
                });
              await page
                .getByRole('button', {
                  name: language === 'th' ? 'สมัครร้านอื่น' : 'Apply for another store',
                  exact: true,
                })
                .click();
              assert.equal(await page.locator('#shopName').inputValue(), '');
              await focused(page, 'contactName');
              assert.equal(await page.locator('#partner-consent').isChecked(), false);
              if (mode === 'pending') {
                delivery = 'ok';
                await fill(page, 'QA Another Store');
                await page.locator('button[type=submit]').click();
                await waitRequest(before + 2);
                await visibleFocus(page, 'partner-result-heading');
                assert.notEqual(requests[before + 1].requestId, requests[before].requestId);
                assert.equal(requests[before + 1].shopName, 'QA Another Store');
              }
            }
          }
          assert(
            await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          );
          assert.deepEqual(errors, []);
          assert.deepEqual(blocked, []);
          results.push({
            motion,
            width,
            language,
            mode,
            passed: true,
            localPosts: requests.length - before,
          });
          await context.close();
        }
  for (const width of [1280, 390])
    for (const route of ['/th', '/en', '/th/blog/checklist-choose-mobile-phone-wholesaler']) {
      console.log('ENQUIRY', width, route);
      delivery = 'ok';
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: 'reduce',
      });
      active = page;
      await page.route('**/*', (route) =>
        route.request().method() === 'GET' ||
        (route.request().url() === 'http://127.0.0.1:8871/lead' &&
          route.request().method() === 'POST')
          ? route.continue()
          : route.abort(),
      );
      await page.goto(origin + route);
      await page.locator('form').waitFor();
      const before = requests.length;
      await fill(page);
      await page.locator('button[type=submit]').click();
      await waitRequest(before + 1);
      await visibleFocus(page, 'partner-result-heading');
      assert.equal(await page.getByText('QA Public Store', { exact: true }).count(), 1);
      assert(
        await page
          .getByText(
            route === '/en'
              ? /this page cannot confirm that it was recorded/
              : /หน้านี้ตรวจสอบไม่ได้ว่าปลายทางบันทึกข้อมูลสำเร็จ/,
          )
          .isVisible(),
      );
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
      await page.screenshot({
        path: path.join(output, 'enquiry-' + route.replaceAll('/', '_') + '-' + width + '.png'),
      });
      results.push({ width, route, mode: 'enquiry-result', passed: true, localPosts: 1 });
      await page.close();
    }
  await pin();
  const files = [
    'src/pages/Join.tsx',
    'src/components/PartnerForm.tsx',
    'src/components/partner-form/BrandSelector.tsx',
    'src/components/partner-form/ConsentField.tsx',
    'src/components/partner-form/SuccessCard.tsx',
    'src/services/partnerLeadSubmission.ts',
    'src/utils/partnerLead.ts',
    'src/utils/referralAttribution.ts',
    'scripts/qa/public-acquisition.browser.mjs',
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
        revision,
        origin,
        results,
        fingerprints,
        boundary:
          'Actual public build; synthetic localhost lead endpoint only. No receipt/dedup/consent approval, protected access or production claim.',
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify({ cases: results.length }));
} catch (error) {
  if (active) await active.screenshot({ path: path.join(output, 'failure.png'), fullPage: true });
  throw error;
} finally {
  for (const response of pending.splice(0)) response.destroy();
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
