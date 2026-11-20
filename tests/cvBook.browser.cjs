const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.CV_TEST_URL || 'http://127.0.0.1:3012';
const out = process.env.CV_SCREENSHOT_DIR || require('node:path').join(require('node:os').tmpdir(), '3ctrix-cv-qa');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto(`${base}/cv`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.cv-photo-frame img').evaluate(i => i.decode());
  await page.screenshot({ path: `${out}/desktop.png`, fullPage: true });
  assert.equal(await page.locator('.cv-index li').count(), 9);
  const pdf = await page.request.get(`${base}/cv/Beatriz-Ferreira-CV.pdf`);
  assert.equal(pdf.status(), 200);
  assert((await pdf.body()).subarray(0, 5).toString() === '%PDF-');
  let entries = 0, images = 0;
  for (let chapter = 0; chapter < 9; chapter++) {
    await page.locator('.cv-index li button').nth(chapter).click();
    const count = await page.locator('.cv-entry').count();
    for (let entry = 0; entry < count; entry++) {
      const button = page.locator('.cv-entry').nth(entry);
      await button.click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      assert(await page.locator('#cv-detail-title').innerText());
      const gallery = page.locator('.cv-detail-gallery img');
      if (await gallery.count()) {
        await gallery.evaluate(i => i.decode()); images++;
        const next = page.getByRole('button', { name: 'Next photograph', exact: true });
        while (await next.count() && await next.isEnabled()) {
          await next.click(); await gallery.evaluate(i => i.decode()); images++;
        }
      }
      if (chapter === 2 && entry === 0) await page.screenshot({ path: `${out}/story.png`, fullPage: false });
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'detached' });
      assert(await button.evaluate(e => e === document.activeElement), 'Focus must return to the opening entry');
      entries++;
    }
  }
  await page.goto(`${base}/cv#education/masters`);
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  assert((await page.locator('#cv-detail-title').innerText()).includes('Accounting'));
  await page.getByRole('button', { name: 'Close story' }).click();
  await page.locator('.cv-index li button').nth(0).click();
  await page.getByRole('button', { name: 'Next chapter', exact: true }).click();
  await page.locator('.cv-page-turn').screenshot({ path: `${out}/page-turn.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/cv`);
  await page.locator('.cv-photo-frame img').evaluate(i => i.decode());
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No mobile overflow');
  await page.screenshot({ path: `${out}/mobile.png`, fullPage: true });
  await page.locator('.cv-mobile-index select').selectOption('5');
  await page.locator('.cv-entry').first().click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  await page.locator('.cv-detail-gallery img').evaluate(i => i.decode());
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.cv-detail')).opacity === '1');
  await page.screenshot({ path: `${out}/mobile-story.png`, fullPage: false });
  await page.keyboard.press('Escape');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  assert.equal(await page.locator('.cv-page-turn canvas').count(), 0, 'Reduced motion must not initialise WebGL');
  await page.locator('.cv-mobile-index select').selectOption('8');
  await page.locator('.cv-entry').first().click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  const plain = await browser.newPage({ javaScriptEnabled: false });
  await plain.goto(`${base}/cv`);
  assert(await plain.locator('.cv-noscript').isVisible());
  assert((await plain.locator('.cv-noscript').innerText()).includes('Food Bank'));
  const fallback = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await fallback.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(type, ...args) { return type.includes('webgl') ? null : original.call(this, type, ...args); }; });
  await fallback.goto(`${base}/cv`);
  await fallback.locator('.cv-index li button').nth(2).click();
  await fallback.locator('.cv-entry').first().click();
  assert(await fallback.getByRole('dialog').isVisible());
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ chapters: 9, entries, images, errors, pdf: 'OK', deepLinks: 'OK', keyboardAndFocus: 'OK', mobile: 'OK', reducedMotion: 'OK', noWebGL: 'OK', noJavaScript: 'OK' }, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
