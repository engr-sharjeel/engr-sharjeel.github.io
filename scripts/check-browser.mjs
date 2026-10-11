import assert from 'node:assert/strict';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import axe from 'axe-core';

const base = new URL(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4321/');
if (!base.pathname.endsWith('/')) base.pathname += '/';
const chromePath = process.env.PORTFOLIO_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const expectedProjects = Number(process.env.PORTFOLIO_EXPECTED_PROJECTS || 19);
const artifacts = path.resolve('.tmp/screenshots');
const report = { base: base.href, expectedProjects, started: new Date().toISOString(), checks: [], pageErrors: [], consoleErrors: [], axe: [] };
const route = (relative = '') => new URL(relative.replace(/^\/+/, ''), base).href;
const routeName = (url) => new URL(url).pathname.slice(base.pathname.length).replace(/\/$/, '').replaceAll('/', '-') || 'home';
await access(chromePath);
await mkdir(artifacts, { recursive: true });

async function check(label, work) {
  try {
    await work();
    report.checks.push({ label, passed: true });
    console.log(`PASS ${label}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    report.checks.push({ label, passed: false, message });
    console.error(`FAIL ${label}: ${message}`);
  }
}

function observe(page) {
  page.on('pageerror', error => report.pageErrors.push({ url: page.url(), message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error') report.consoleErrors.push({ url: page.url(), message: message.text() });
  });
}

async function open(page, url) {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  const status = response?.status();
  assert.ok(status === 200 || (url.endsWith('/404.html') && status === 404), `${url} returned HTTP ${status}`);
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    await Promise.race([
      Promise.all([...document.images].map(image => image.decode().catch(() => undefined))),
      new Promise(resolve => setTimeout(resolve, 12000)),
    ]);
    await document.fonts.ready;
  });
}

async function assertPage(page, width) {
  const state = await page.evaluate(() => ({
    width: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    h1: document.querySelectorAll('h1').length,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    broken: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.currentSrc || image.src),
    missingAlt: [...document.images].filter(image => !image.hasAttribute('alt')).map(image => image.src),
    dimensionless: [...document.images].filter(image => !image.hasAttribute('width') || !image.hasAttribute('height')).map(image => image.src),
  }));
  assert.equal(state.width, width);
  assert.ok(state.documentWidth <= width + 1 && state.bodyWidth <= width + 1, `Horizontal overflow: document ${state.documentWidth}, body ${state.bodyWidth}, viewport ${width}`);
  assert.equal(state.h1, 1, 'Each route should have one h1');
  assert.ok(state.title?.trim() && state.description?.trim(), 'Missing page title or description');
  assert.deepEqual(state.broken, [], `Broken images: ${state.broken.join(', ')}`);
  assert.deepEqual(state.missingAlt, [], 'Every image needs an alt attribute');
  assert.deepEqual(state.dimensionless, [], 'Every image needs intrinsic width and height');
}

async function checkAxe(page, label) {
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] },
  }));
  const serious = results.violations.filter(item => ['serious', 'critical'].includes(item.impact));
  report.axe.push({ label, violations: results.violations.map(item => ({ id: item.id, impact: item.impact, description: item.description, targets: item.nodes.flatMap(node => node.target) })) });
  assert.deepEqual(serious.map(item => `${item.id}: ${item.nodes.flatMap(node => node.target).join(', ')}`), [], 'Axe serious/critical accessibility violations');
}

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  observe(page);
  await open(page, route('projects/'));
  const detailUrls = await page.locator('main a[href]').evaluateAll(links => [...new Set(links
    .map(link => link.href)
    .filter(href => /\/projects\/[^/]+\/$/.test(new URL(href).pathname)))]);
  await check('Catalogue contains the supported 19-project inventory', async () => {
    assert.equal(detailUrls.length, expectedProjects);
    assert.equal(await page.locator('[data-project]').count(), expectedProjects);
    assert.equal(await page.locator('[data-project]:visible').count(), expectedProjects);
    const first = await page.locator('[data-project]').first().getAttribute('class');
    assert.ok(first?.includes('flagship'), 'The default catalogue should present the flagship first');
  });

  const routes = ['', 'projects/', 'experience/', 'research/', 'achievements/', 'education/', 'certificates/', 'about/', 'contact/', '404.html'].map(relative => route(relative));
  const allRoutes = [...routes, ...detailUrls];
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 900 });
    for (const url of allRoutes) {
      const label = `${width}px ${routeName(url)}`;
      await check(`${label}: direct route, layout and images`, async () => {
        await open(page, url);
        await assertPage(page, width);
        await page.screenshot({ path: path.join(artifacts, `${width}-${routeName(url)}.png`), fullPage: true });
      });
      if (width === 1440 || (width === 390 && [route(), route('projects/')].includes(url))) {
        await check(`${label}: accessibility`, () => checkAxe(page, label));
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 900 });
  for (const width of [390, 768]) {
    await check(`${width}px mobile menu: open, Escape and project navigation`, async () => {
      await page.setViewportSize({ width, height: 900 });
      await open(page, route());
      const toggle = page.locator('.menu-toggle');
      const nav = page.locator('#primary-nav');
      assert.ok(await toggle.isVisible());
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.equal(await nav.isVisible(), false);
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      assert.ok(await nav.isVisible());
      await page.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.equal(await nav.isVisible(), false);
      assert.ok(await toggle.evaluate(element => element === document.activeElement), 'Escape should return focus to the menu button');
      await toggle.click();
      await nav.getByRole('link', { name: 'Projects', exact: true }).click();
      await page.waitForURL(route('projects/'));
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    });
  }

  await check('Desktop navigation opens About', async () => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await open(page, route());
    assert.equal(await page.locator('.menu-toggle').isVisible(), false);
    assert.ok(await page.locator('#primary-nav').isVisible());
    await page.locator('#primary-nav summary').click();
    await page.locator('#primary-nav').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForURL(route('about/'));
  });

  await check('Homepage shows exactly four selected projects, each with a working detail link', async () => {
    await page.setViewportSize({ width: 390, height: 900 });
    await open(page, route());
    const selected = await page.locator('main a[href]').evaluateAll(links => [...new Set(links.map(link => link.href).filter(href => /\/projects\/[^/]+\/$/.test(new URL(href).pathname)))]);
    assert.equal(selected.length, 4);
    assert.equal(selected.filter(url => url.includes('/range-extended-electric-vehicle/')).length, 1);
    for (const destination of selected) {
      await open(page, route());
      const target = new URL(destination).pathname;
      await page.locator(`main a[href=${JSON.stringify(target)}]:not([aria-hidden="true"])`).first().click();
      await page.waitForURL(destination);
      assert.equal(await page.locator('h1').count(), 1);
    }
  });

  await check('View all projects opens the catalogue', async () => {
    await open(page, route());
    await page.getByRole('link', { name: /^View all projects/ }).click();
    await page.waitForURL(route('projects/'));
    assert.equal(await page.locator('[data-project]:visible').count(), expectedProjects);
  });

  await check('Catalogue search matches supported content and retains the flagship reminder', async () => {
    await open(page, route('projects/'));
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    assert.ok(await search.isVisible());
    await search.fill(' ARDUINO ');
    const visible = await page.locator('[data-project]:visible').count();
    assert.ok(visible > 0 && visible < expectedProjects);
    assert.ok(await page.locator('[data-project][data-search*="autonomous"]').isVisible());
    assert.ok(await page.locator('.catalogue-status').getByRole('link', { name: /Range Extended Electric Vehicle/ }).isVisible());
    await page.getByRole('button', { name: /^Clear filters/ }).click();
    assert.equal(await search.inputValue(), '');
    assert.equal(await page.locator('[data-project]:visible').count(), expectedProjects);
  });

  await check('Every category filter shows the matching cards and reset restores all work', async () => {
    await open(page, route('projects/'));
    const categories = await page.locator('button[data-filter]').evaluateAll(buttons => buttons.map(button => button.dataset.filter).filter(category => category !== 'all'));
    assert.ok(categories.length >= 3);
    for (const category of categories) {
      const expected = await page.locator('[data-project]').evaluateAll((cards, category) => cards.filter(card => card.dataset.category === category).length, category);
      const filter = page.getByRole('button', { name: category, exact: true });
      await filter.click();
      assert.equal(await filter.getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-project]:visible').count(), expected);
      assert.ok(await page.locator('.catalogue-status').getByRole('link', { name: /Range Extended Electric Vehicle/ }).isVisible());
    }
    await page.getByRole('button', { name: /^Clear filters/ }).click();
    assert.equal(await page.locator('[data-project]:visible').count(), expectedProjects);
    assert.equal(await page.getByRole('button', { name: 'All work', exact: true }).getAttribute('aria-pressed'), 'true');
  });

  await check('No-match state keeps flagship navigation and Show all resets the catalogue', async () => {
    await open(page, route('projects/'));
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    await search.fill('no-matching-project-qqx-95873');
    assert.equal(await page.locator('[data-project]:visible').count(), 0);
    assert.ok(await page.getByRole('heading', { name: 'No projects found.' }).isVisible());
    assert.ok(await page.locator('.catalogue-status').getByRole('link', { name: /Range Extended Electric Vehicle/ }).isVisible());
    await page.getByRole('button', { name: /^Show all projects/ }).click();
    assert.equal(await search.inputValue(), '');
    assert.ok(await search.evaluate(element => element === document.activeElement));
    assert.equal(await page.locator('[data-project]:visible').count(), expectedProjects);
    assert.equal(await page.locator('#empty-state').isVisible(), false);
  });

  await check('Keyboard access starts with the visible skip link and moves focus to main', async () => {
    await open(page, route());
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content', exact: true });
    assert.ok(await skip.evaluate(element => element === document.activeElement));
    const box = await skip.boundingBox();
    assert.ok(box && box.y >= 0 && box.y < 900, 'Focused skip link should be on screen');
    await page.keyboard.press('Enter');
    assert.ok(await page.locator('#main-content').evaluate(element => element === document.activeElement));
    await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => {
      const element = document.activeElement;
      const style = getComputedStyle(element);
      return { tag: element.tagName, visibleFocus: style.outlineStyle !== 'none' || style.boxShadow !== 'none' };
    });
    assert.ok(['A', 'BUTTON', 'INPUT'].includes(focus.tag));
    assert.ok(focus.visibleFocus, 'Keyboard focus should have a visible outline or shadow');
  });

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const noJsPage = await noJsContext.newPage();
  observe(noJsPage);
  await check('JavaScript-disabled mobile navigation and all catalogue content remain accessible', async () => {
    await open(noJsPage, route());
    assert.ok(await noJsPage.locator('#primary-nav').getByRole('link', { name: 'Projects', exact: true }).isVisible());
    assert.equal(await noJsPage.locator('.menu-toggle').isVisible(), false);
    await noJsPage.locator('#primary-nav').getByRole('link', { name: 'Projects', exact: true }).click();
    await noJsPage.waitForURL(route('projects/'));
    assert.equal(await noJsPage.locator('[data-project]').count(), expectedProjects);
    assert.equal(await noJsPage.locator('[data-project]:visible').count(), expectedProjects);
    assert.equal(await noJsPage.locator('#project-controls').isVisible(), false);
    await noJsPage.locator('.flagship').getByRole('link', { name: /^Explore the project/ }).click();
    await noJsPage.waitForURL(route('projects/range-extended-electric-vehicle/'));
    assert.equal(await noJsPage.locator('h1').count(), 1);
    await assertPage(noJsPage, 390);
    await noJsPage.screenshot({ path: path.join(artifacts, '390-no-js-reev.png'), fullPage: true });
  });
  await noJsContext.close();

  await check('No client-side page errors occurred', async () => assert.deepEqual(report.pageErrors, []));
  await check('No unexpected browser console errors occurred', async () => {
    const unexpected = report.consoleErrors.filter(error => !(error.url.endsWith('/404.html') && /404/.test(error.message)));
    assert.deepEqual(unexpected, []);
  });
  await context.close();
} finally {
  await browser.close();
  report.finished = new Date().toISOString();
  report.passed = report.checks.filter(check => check.passed).length;
  report.failed = report.checks.filter(check => !check.passed).length;
  await writeFile(path.resolve('.tmp/browser-report.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(`Browser checks: ${report.passed} passed, ${report.failed} failed. Screenshots: .tmp/screenshots; report: .tmp/browser-report.json`);
if (report.failed) process.exitCode = 1;
