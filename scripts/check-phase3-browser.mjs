import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright-core';
import axe from 'axe-core';
import sharp from 'sharp';

const base = new URL(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4321/');
if (!base.pathname.endsWith('/')) base.pathname += '/';
const route = path => new URL(path.replace(/^\/+/, ''), base).href;
const report = { base: base.href, started: new Date().toISOString(), checks: [], axe: [], errors: [] };
const publication=JSON.parse(await readFile('src/data/public-assets.json','utf8'));
const credentialTotal=publication.certificates.length;
const dir = '.tmp/phase3-browser';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PORTFOLIO_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', hasTouch: true });
const page = await context.newPage();
page.on('pageerror', error => report.errors.push(error.message));
const name = path => path.replaceAll('/', '-').replace(/-$/, '') || 'home';

async function check(label, work) {
  try { await work(); report.checks.push({ label, passed: true }); console.log(`PASS ${label}`); }
  catch (error) { report.checks.push({ label, passed: false, message: error.message }); console.error(`FAIL ${label}: ${error.message}`); }
}
async function open(path) {
  const response = await page.goto(route(path), { waitUntil: 'networkidle' });
  assert.ok(response.status() === 200 || (path === '404.html' && response.status() === 404));
  await page.evaluate(async () => { document.querySelectorAll('img').forEach(image => image.loading = 'eager'); await Promise.all([...document.images].map(image => image.decode().catch(() => undefined))); await document.fonts.ready; });
}
async function assertLayout() {
  const layout = await page.evaluate(() => ({
    viewport: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    heading: document.querySelector('h1')?.getBoundingClientRect().toJSON(),
    headings: document.querySelectorAll('h1').length,
    missingImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.currentSrc),
    hiddenContent: [...document.querySelectorAll('h1, [data-project], [data-credential]')].filter(element => !element.closest('[hidden]') && (getComputedStyle(element).visibility === 'hidden' || Number(getComputedStyle(element).opacity) === 0)).length,
  }));
  assert.ok(layout.documentWidth <= layout.viewport + 1 && layout.bodyWidth <= layout.viewport + 1, `Horizontal overflow ${layout.documentWidth}/${layout.bodyWidth} at ${layout.viewport}px`);
  assert.equal(layout.headings, 1);
  assert.ok(layout.heading.width > 0 && layout.heading.x >= -1 && layout.heading.right <= layout.viewport + 1, 'Main title must stay inside the viewport');
  assert.deepEqual(layout.missingImages, []);
  assert.equal(layout.hiddenContent, 0, 'Motion enhancements must never leave hidden core content');
}
async function assertTargets(selectors) {
  const targets = await page.locator(selectors).evaluateAll(elements => elements.filter(element => element.getClientRects().length && !element.closest('[hidden]')).map(element => ({ text: element.textContent.trim().slice(0, 80), width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height })));
  assert.ok(targets.length > 0);
  assert.deepEqual(targets.filter(target => target.width < 43.5 || target.height < 43.5), [], 'Key controls need 44px touch targets');
}
async function assertAxe(label) {
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
  report.axe.push({ label, violations: result.violations.map(violation => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.flatMap(node => node.target) })) });
  assert.deepEqual(result.violations.map(violation => violation.id), []);
}
async function readViewer() {
  await page.waitForFunction(() => document.querySelector('.viewer-image')?.naturalWidth > 0 && !document.querySelector('.image-viewer')?.classList.contains('is-loading'));
}

try {
  await check('Approved certificate presentations retain hashes and intrinsic dimensions', async () => {
    const manifest = JSON.parse(await readFile('src/data/public-assets.json', 'utf8'));
    assert.equal(manifest.certificates.length, 12);
    for (const certificate of manifest.certificates) {
      const bytes = await readFile(`src/assets/certificates/${certificate.filename}`);
      assert.equal(createHash('sha256').update(bytes).digest('hex'), certificate.sha256);
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.width, certificate.width);
      assert.equal(metadata.height, certificate.height);
      const original=await readFile(`public/${certificate.original.path}`);
      assert.equal(createHash('sha256').update(original).digest('hex'),certificate.original.sha256);
      assert.equal(original.length,certificate.original.byteLength);
    }
    const resume = await readFile(`public/${manifest.resume.path}`);
    assert.equal(createHash('sha256').update(resume).digest('hex'), manifest.resume.sha256);
  });
  await open('projects/');
  const details = await page.locator('main a[href]').evaluateAll(links => [...new Set(links.map(link => link.href).filter(href => /\/projects\/[^/]+\/$/.test(new URL(href).pathname)))]);
  const detailPaths = details.map(href => {
    const path = href.startsWith('http') ? new URL(href).pathname : href;
    return path.slice(base.pathname.length).replace(/^\/+/, '');
  });
  assert.equal(detailPaths.length, 19);
  const routes = ['', 'projects/', ...detailPaths, 'experience/', 'research/', 'education/', 'certificates/', 'achievements/', 'about/', 'contact/', '404.html'];
  assert.equal(routes.length, 29);
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: width === 320 ? 844 : 1000 });
    for (const path of routes) {
      await check(`${width}px ${path || '/'}: complete route, reflow and imagery`, async () => {
        await open(path); await assertLayout();
        await page.screenshot({ path: `${dir}/${width}-${name(path)}.png`, fullPage: true });
      });
    }
  }
  await check('New portrait preserves the complete composition in hero and branding at all requested widths', async () => {
    const portrait = publication.approvedImages.find(image => image.path.includes('/profile/'));
    assert.ok(portrait, 'The selected portrait has an approved source hash and dimensions');
    const bytes = await readFile(portrait.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), portrait.sha256);
    const source = await sharp(bytes).metadata();
    assert.equal(source.width, portrait.width);
    assert.equal(source.height, portrait.height);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 }); await open('');
      for (const selector of ['.brand-portrait', '.identity-art img']) {
        const portraitState = await page.locator(selector).evaluate(image => {
          const style = getComputedStyle(image);
          const box = image.getBoundingClientRect();
          const frame = image.closest('.identity-art, .wordmark').getBoundingClientRect();
          return { fit: style.objectFit, width: box.width, height: box.height, ratio: box.width / box.height,
            intrinsicRatio: Number(image.getAttribute('width')) / Number(image.getAttribute('height')),
            naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, transform: style.transform,
            insideFrame: box.left >= frame.left - 1 && box.right <= frame.right + 1 && box.top >= frame.top - 1 && box.bottom <= frame.bottom + 1,
            candidates: image.srcset.split(',').map(candidate => Number(candidate.trim().match(/\s(\d+)w$/)?.[1])).filter(Boolean) };
        });
        assert.ok(portraitState.fit === 'contain' || Math.abs(portraitState.ratio - source.width / source.height) < .01, `${selector} cannot crop the head/collar/tie composition at ${width}px`);
        assert.ok(portraitState.insideFrame, `${selector} stays visible within its own frame`);
        assert.equal(portraitState.transform, 'none', 'The image is not enlarged into a destructive crop');
        assert.equal(portraitState.intrinsicRatio, source.width / source.height, 'Explicit dimensions preserve the source aspect ratio');
        assert.ok(portraitState.naturalWidth > 0 && portraitState.naturalWidth <= source.width);
        assert.ok(portraitState.candidates.length > 1 && portraitState.candidates.every(candidate => candidate <= source.width), 'Responsive derivatives stay capped at source resolution');
        assert.ok(portraitState.width <= source.width && portraitState.height <= source.height, 'Display does not upscale the supplied source');
      }
      await assertLayout();
      await page.screenshot({ path: `${dir}/${width}-portrait-framing.png`, fullPage: true });
    }
    await page.setViewportSize({ width: 640, height: 900 }); await open('');
    await page.addStyleTag({ content: 'html { font-size: 200%; }' }); await assertLayout();
    assert.ok(await page.locator('.brand-portrait').isVisible());
    assert.ok(await page.locator('.identity-art img').isVisible());
    await page.screenshot({ path: `${dir}/enlarged-text-portrait-framing.png`, fullPage: true });
  });
  const representative = ['', 'projects/', 'projects/range-extended-electric-vehicle/', 'certificates/'];
  for (const width of [640, 641, 800, 801, 940, 941, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of representative) await check(`${width}px ${path || '/'}: grid/navigation breakpoint`, async () => { await open(path); await assertLayout(); await page.screenshot({ path: `${dir}/${width}-${name(path)}.png`, fullPage: true }); });
  }
  await check('640px enlarged text reflows every long-title/content page type', async () => {
    await page.setViewportSize({ width: 640, height: 900 });
    for (const path of ['', 'projects/range-extended-electric-vehicle/', 'education/', 'certificates/', 'research/', 'about/', 'contact/']) {
      await open(path);
      await page.addStyleTag({ content: 'html { font-size: 200%; }' });
      await assertLayout();
      await page.screenshot({ path: `${dir}/enlarged-text-${name(path)}.png`, fullPage: true });
    }
  });
  await check('Phone controls preserve 44px targets and keyboard focus', async () => {
    await page.setViewportSize({ width: 320, height: 844 });
    for (const path of ['', 'projects/', 'certificates/', 'contact/']) {
      await open(path); await assertTargets('.wordmark, .menu-toggle, .button, .filter-list button, .project-card h3 a, .image-view-link');
      await page.locator('.menu-toggle').tap(); await assertTargets('#primary-nav a, #primary-nav summary');
      await page.keyboard.press('Escape');
      assert.ok(await page.locator('.menu-toggle').evaluate(element => document.activeElement === element));
      const focused = await page.locator('.menu-toggle').evaluate(element => { const style = getComputedStyle(element); return style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) >= 2; });
      assert.ok(focused, 'Keyboard focus remains visible');
    }
  });
  await check('Short landscape viewer keeps Close and reading controls reachable', async () => {
    await page.setViewportSize({ width: 667, height: 375 });
    await open('certificates/'); const opener = page.locator('[data-image-viewer]').first();
    await opener.click(); await readViewer();
    for (const selector of ['.viewer-close', '.viewer-zoom', '.viewer-original']) {
      const target = page.locator(selector); await target.focus();
      const box = await target.boundingBox(); assert.ok(box.y >= 0 && box.y + box.height <= 376, `${selector} cannot be reached in short landscape`);
    }
    await assertTargets('.image-viewer button:not(:disabled), .viewer-original');
    await page.screenshot({ path: `${dir}/landscape-viewer.png` });
    await page.keyboard.press('Escape'); assert.ok(await opener.evaluate(element => element === document.activeElement));
  });
  await check('Enlarged-text viewer preserves toolbar, focus loop and close', async () => {
    await page.setViewportSize({ width: 640, height: 800 }); await open('certificates/');
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    const opener = page.locator('[data-image-viewer]').first(); await opener.click(); await readViewer();
    for (let index = 0; index < 12; index++) { await page.keyboard.press('Tab'); assert.ok(await page.evaluate(() => document.activeElement.closest('.image-viewer'))); }
    await page.locator('.viewer-close').focus(); await page.keyboard.press('Enter'); assert.ok(await opener.evaluate(element => element === document.activeElement));
  });
  await check('Full-resolution image failure leaves a safe usable fallback', async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await open('certificates/');
    const opener = page.locator('[data-image-viewer]').first(); const href = new URL(await opener.getAttribute('href'), base).href;
    await page.route(href, request => request.abort('failed'));
    await opener.click();
    await page.waitForFunction(() => document.querySelector('.image-viewer')?.classList.contains('is-error') || /could not load/i.test(document.querySelector('#viewer-caption')?.textContent || ''));
    assert.equal(await page.locator('.viewer-original').getAttribute('href'), href);
    assert.ok(await page.locator('.viewer-original').isVisible());
    assert.equal(await page.locator('.viewer-zoom').isEnabled(), false, 'Natural-size reading must wait for a successfully loaded image');
    assert.equal(await page.locator('.viewer-image').isVisible(), false, 'Failure feedback should not expose a broken-image frame');
    assert.equal(await page.locator('.image-viewer').evaluate(element => element.classList.contains('is-loading')), false);
    await page.keyboard.press('Escape'); assert.ok(await opener.evaluate(element => element === document.activeElement));
    await page.unroute(href);
    await opener.click(); await readViewer(); assert.equal(await page.locator('.viewer-zoom').isEnabled(), true); await page.locator('.viewer-close').click();
  });
  await check('Credential originals load on demand while previews remain responsive', async () => {
    await open('certificates/');
    assert.equal(await page.locator('.viewer-image').count(), 0);
    const originalPaths=publication.certificates.map(record=>new URL(record.original.path,base).href);
    assert.deepEqual(await page.evaluate(paths => performance.getEntriesByType('resource').filter(entry => paths.includes(entry.name)).map(entry => entry.name),originalPaths), [], 'Full-resolution owner originals must load only on request');
    const opener = page.locator('[data-image-viewer]').first(); const href = new URL(await opener.getAttribute('href'), base).href;
    await opener.click(); await readViewer();
    assert.equal(await page.locator('.viewer-image').getAttribute('src'), href);
    await page.keyboard.press('Escape');
  });
  await check('Reduced-motion preference changes and browser history keep content usable', async () => {
    await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.setViewportSize({ width: 390, height: 844 }); await open('');
    assert.equal(await page.locator('h1').isVisible(), true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(50);
    assert.deepEqual(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').map(animation => animation.constructor.name)), []);
    await assertLayout();
    await page.getByRole('link', { name: /^View all projects/ }).click(); await page.waitForURL(route('projects/'));
    await page.goBack({ waitUntil: 'networkidle' }); await assertLayout();
    assert.equal(await page.locator('.selected-grid .project-card').count(), 3);
  });
  for (const path of ['', 'projects/', 'projects/range-extended-electric-vehicle/', 'education/', 'certificates/', 'experience/', 'research/', 'about/', 'contact/']) {
    await check(`390px ${path || '/'}: final accessibility`, async () => { await page.setViewportSize({ width: 390, height: 844 }); await open(path); await assertAxe(`390px ${path || '/'}`); });
  }
  await check('Open viewer accessibility remains intact at 320px', async () => { await page.setViewportSize({ width: 320, height: 844 }); await open('certificates/'); await page.locator('[data-image-viewer]').first().click(); await readViewer(); await assertAxe('320px viewer'); await page.keyboard.press('Escape'); });
  await check('No-JavaScript documents and catalogue keep full content and original links', async () => {
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } }); const fallback = await noJs.newPage();
    try {
      await fallback.goto(route('projects/'), { waitUntil: 'networkidle' }); assert.equal(await fallback.locator('[data-project]:visible').count(), 19);
      await fallback.goto(route('certificates/'), { waitUntil: 'networkidle' }); assert.equal(await fallback.locator('[data-credential]:visible').count(), credentialTotal); assert.equal(await fallback.locator('[data-image-viewer]').count(), credentialTotal);assert.equal(await fallback.locator('[data-credential-original]').count(),credentialTotal);
      await fallback.locator('#primary-nav').getByRole('link', { name: 'Education', exact: true }).click(); await fallback.waitForURL(route('education/'));
      assert.match(await fallback.locator('main').innerText(), /3\.10\s*\/\s*4\.00/);
    } finally { await noJs.close(); }
  });
  await check('No Phase 3 interaction script errors occurred', async () => assert.deepEqual(report.errors, []));
} finally {
  await context.close(); await browser.close();
  await writeFile(`${dir}/report.json`, JSON.stringify(report, null, 2) + '\n');
}
const failures = report.checks.filter(check => !check.passed);
console.log(`Phase 3 browser checks: ${report.checks.length - failures.length} passed, ${failures.length} failed.`);
if (failures.length) process.exitCode = 1;
