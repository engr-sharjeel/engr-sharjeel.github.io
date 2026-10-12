import assert from 'node:assert/strict';
import { access, mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { chromium } from 'playwright-core';
import axe from 'axe-core';

const base = new URL(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4321/');
if (!base.pathname.endsWith('/')) base.pathname += '/';
const chromePath = process.env.PORTFOLIO_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const expectedProjects = Number(process.env.PORTFOLIO_EXPECTED_PROJECTS || 19);
const manifest = JSON.parse(await readFile('src/data/public-assets.json', 'utf8'));
const navigationDestinations = ['Projects', 'Experience', 'Education', 'Certificates', 'Research', 'Achievements', 'About'];
const projectOrder = [
  'range-extended-electric-vehicle', 'micro-hydropower-plant', 'autonomous-navigation-robot', 'center-tapped-transformer', 'smart-access-monitoring-system', 'electronic-voting-machine',
  'substation-distribution-design', 'pcb-layout-practice', 'temperature-monitoring-system', 'water-level-indication', 'matlab-signal-calculator', 'solidworks-engineering-drawing',
  'frequency-band-pass-filter', 'audio-amplifier', 'digital-logic-clock', 'rain-detection-circuit', 'university-management-system', 'oop-library-management', 'traffic-monitoring-ethics',
];
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

async function projectSlugs(page, selector = '[data-project]:visible') {
  return page.locator(selector).evaluateAll(cards => cards.map(card => [...card.querySelectorAll('a[href]')]
    .map(link => new URL(link.href).pathname.match(/\/projects\/([^/]+)\/$/)?.[1]).find(Boolean)));
}

async function assertFilteredPriority(page) {
  const visible = await projectSlugs(page);
  assert.deepEqual(visible, projectOrder.filter(slug => visible.includes(slug)), 'Filtered results retain the approved project order');
}

async function checkAxe(page, label) {
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
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
    assert.deepEqual(await projectSlugs(page), projectOrder, 'Catalogue follows the owner-selected order and preserves remaining records');
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

  await check('Desktop navigation directly exposes all seven destinations and opens About', async () => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await open(page, route());
    assert.equal(await page.locator('.menu-toggle').isVisible(), false);
    assert.ok(await page.locator('#primary-nav').isVisible());
    assert.equal(await page.locator('.background-menu, #primary-nav summary').count(), 0, 'Obsolete Background disclosure is removed');
    for (const destination of navigationDestinations) assert.ok(await page.locator('#primary-nav').getByRole('link', { name: destination, exact: true }).isVisible());
    await page.locator('#primary-nav').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForURL(route('about/'));
  });

  await check('Homepage shows exactly four selected projects, each with a working detail link', async () => {
    await page.setViewportSize({ width: 390, height: 900 });
    await open(page, route());
    const selected = await page.locator('main a[href]').evaluateAll(links => [...new Set(links.map(link => link.href).filter(href => /\/projects\/[^/]+\/$/.test(new URL(href).pathname)))]);
    assert.equal(selected.length, 4);
    assert.deepEqual(selected.map(href => new URL(href).pathname.match(/\/projects\/([^/]+)\/$/)[1]), projectOrder.slice(0, 4));
    assert.equal(selected.filter(url => url.includes('/range-extended-electric-vehicle/')).length, 1);
    for (const destination of selected) {
      await open(page, route());
      const target = new URL(destination).pathname;
      await page.locator(`main a[href=${JSON.stringify(target)}]:not([aria-hidden="true"])`).first().click();
      await page.waitForURL(destination);
      assert.equal(await page.locator('h1').count(), 1);
    }
  });

  await check('Homepage shows the owner brief, portrait, academic identity and discovery links', async () => {
    await open(page, route());
    assert.equal(await page.locator('.hero-brief').innerText(), 'Building a range-extended EV for areas with limited charging , Power Systems, Embedded control, Renewable Energy');
    assert.match(await page.locator('.hero').innerText(), /BS Electrical \(Power\) Engineering/i);
    assert.match(await page.locator('.hero').innerText(), /Air University, Islamabad/);
    assert.match(await page.locator('.hero').innerText(), /In progress/i);
    assert.ok(await page.locator('.brand-portrait').isVisible());
    assert.ok(await page.locator('.identity-art img').isVisible());
    assert.equal(await page.locator('.mark, .monogram').count(), 0, 'Public identity uses the supplied portrait instead of MS branding');
    for (const destination of ['education', 'certificates', 'achievements', 'about']) assert.ok(await page.locator(`.discovery-grid a[href="${new URL(route(`${destination}/`)).pathname}"]`).isVisible());
    const faviconHref = await page.locator('link[rel="icon"]').getAttribute('href');
    const favicon = await context.request.get(new URL(faviconHref, base).href);
    assert.equal(favicon.status(), 200);
    if ((favicon.headers()['content-type'] || '').includes('svg')) assert.doesNotMatch(await favicon.text(), /\bMS\b/, 'Favicon must not restore the old monogram');
  });

  await check('The six tools and six engineering skills immediately precede the contact invitation', async () => {
    await open(page, route());
    const items = selector => page.locator(`${selector} li`).evaluateAll(elements => elements.map(element => element.textContent.replace(/^\s*\d{2}\s*/, '').trim()));
    assert.deepEqual(await items('[data-home-tools]'), ['MATLAB', 'SCADA systems', 'Proteus', 'PCB design', 'SolidWorks', 'ModelSim']);
    assert.deepEqual(await items('[data-home-skills]'), ['Power-system design', 'Single-line diagrams', 'Grid testing and calculations', 'Renewable energy fundamentals', 'Electrical safety', 'Sensor integration']);
    assert.ok(await page.locator('.home-skills').evaluate(element => element.nextElementSibling?.classList.contains('contact-banner')), 'Skills sit directly above Let’s connect');
  });

  await check('IESCO leads internship previews and galleries, and all supplied POWERCHINA views load', async () => {
    await open(page, route());
    const preview = await page.locator('.experience-preview .experience-row').evaluateAll(links => links.map(link => new URL(link.href).hash));
    assert.deepEqual(preview, ['#iesco', '#powerchina-sepco1']);
    await open(page, route('experience/'));
    assert.deepEqual(await page.locator('.timeline-item').evaluateAll(items => items.map(item => item.id)), ['iesco', 'powerchina-sepco1']);
    for (const [id, filenames] of [
      ['iesco', ['iesco-grid-station-portrait', 'iesco-battery-bank', 'iesco-transformer-yard']],
      ['powerchina-sepco1', ['powerchina-project-dam-context', 'powerchina-project-construction-context', 'powerchina-project-night-context']],
    ]) {
      const links = page.locator(`#${id} [data-image-viewer]`);
      assert.equal(await links.count(), filenames.length);
      for (let index = 0; index < filenames.length; index++) {
        const href = await links.nth(index).getAttribute('href');
        assert.ok(href.includes(filenames[index]), 'Gallery sequence uses the intended source view');
        const response = await context.request.get(new URL(href, base).href);
        assert.equal(response.status(), 200);
        const approved = manifest.approvedImages.find(image => image.path.includes(filenames[index]));
        if (approved) assert.equal(createHash('sha256').update(await response.body()).digest('hex'), approved.sha256);
      }
    }
    await page.locator('.experience-gallery img').evaluateAll(async images => {
      images.forEach(image => image.loading = 'eager');
      await Promise.all(images.map(image => image.decode()));
    });
    const emptyFigureSpace = await page.locator('.experience-gallery figure').evaluateAll(figures => figures.map(figure => figure.getBoundingClientRect().bottom - figure.querySelector('figcaption').getBoundingClientRect().bottom));
    assert.ok(emptyFigureSpace.every(space => space < 21), 'Internship figures keep natural heights beside the portrait rather than stretching into empty cards');
  });

  await check('REEV detail preserves FYP-1, series energy flow and future conversion ambition', async () => {
    await open(page, route('projects/range-extended-electric-vehicle/'));
    const content = await page.locator('main').innerText();
    assert.doesNotMatch(content, /two[\s-]seater/i);
    assert.match(content, /limited charging infrastructure/i);
    assert.match(content, /FYP-1 complete|FYP-1 is complete/i);
    assert.match(content, /startup/i);
    assert.match(content, /longer-term|future/i);
    assert.match(content, /electric motor drives the wheels|wheels electrically driven/i);
    assert.match(content, /no direct mechanical connection|no mechanical engine.to.wheel path/i);
    assert.doesNotMatch(await page.locator('meta[name="description"]').getAttribute('content'), /two[\s-]seater/i);
    const related = await page.locator('section[aria-labelledby="related-heading"] a.record.related-record').evaluateAll(links => links.map(link => new URL(link.href).pathname.match(/\/projects\/([^/]+)\/$/)?.[1]));
    assert.equal(related.length, 3);
    assert.ok(!related.includes('range-extended-electric-vehicle'));
    assert.deepEqual(related, projectOrder.filter(slug => related.includes(slug)), 'Related-project subsets share the owner-selected priority');
  });

  await check('Phone, WhatsApp and Gmail remain distinct labelled actions at narrow widths', async () => {
    const methods = [
      ['phone', 'Phone', '+92 349 4247649', 'tel:+923494247649'],
      ['whatsapp', 'WhatsApp', '+92 349 4247649', 'https://wa.me/923494247649'],
      ['email', 'Email', 'engr.muhammadsharjeel@gmail.com', 'mailto:engr.muhammadsharjeel@gmail.com'],
    ];
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const relative of ['', 'contact/']) {
        await open(page, route(relative));
        for (const container of [relative ? 'main' : '.contact-banner', '.site-footer']) {
          for (const [method, label, value, href] of methods) {
            const link = page.locator(`${container} [data-contact-method="${method}"]`);
            assert.equal(await link.count(), 1, `${container} has one ${method} action`);
            assert.equal(await link.getAttribute('href'), href);
            assert.equal((await link.locator('.contact-method-label').innerText()).trim(), label);
            assert.equal((await link.locator('.contact-method-value').innerText()).trim(), value);
            assert.ok(await link.locator('svg[aria-hidden="true"][focusable="false"]').isVisible(), `${method} has a decorative local icon`);
            assert.equal(await link.locator('.contact-method-label').count(), 1, 'Each action owns its label');
            const geometry = await link.evaluate(element => {
              const row = element.getBoundingClientRect();
              return { width: row.width, height: row.height, left: row.left, right: row.right, content: element.scrollWidth, inner: element.clientWidth,
                grouped: [...element.querySelectorAll('.contact-method-label, .contact-method-value')].every(child => { const box = child.getBoundingClientRect(); return box.left >= row.left - 1 && box.right <= row.right + 1; }) };
            });
            assert.ok(geometry.grouped && geometry.content <= geometry.inner + 1 && geometry.left >= -1 && geometry.right <= width + 1, `${method} label/value stay within their own action at ${width}px`);
            assert.ok(geometry.width >= 44 && geometry.height >= 44, 'Contact actions have adequate touch targets');
            await link.focus();
            assert.ok(await link.evaluate(element => element === document.activeElement), 'Every action is keyboard reachable');
            assert.ok(await link.evaluate(element => getComputedStyle(element).outlineStyle !== 'none'), 'Contact focus is visible');
          }
        }
        if (relative) {
          for (const [method, label, href] of [['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/engr-muhammad-sharjeel/'], ['github', 'GitHub', 'https://github.com/engr-sharjeel']]) {
            const link = page.locator(`main [data-contact-method="${method}"]`);
            assert.equal(await link.getAttribute('href'), href);
            assert.equal((await link.locator('.contact-method-label').innerText()).trim(), label);
            assert.ok(await link.locator(`svg[data-contact-icon="${method}"][aria-hidden="true"]`).isVisible());
          }
        }
        await assertPage(page, width);
      }
    }
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    assert.ok(schemas.some(text => text.includes('+923494247649')), 'Person data includes the canonical phone');
  });

  await check('Navy/teal reference identity is restored across representative page types', async () => {
    const expected = { '--ink': '#0b1220', '--surface': '#142033', '--surface-soft': '#101b2b', '--surface-state': '#19283b', '--text': '#f4f5f2', '--muted': '#aab6c5', '--accent': '#55cdb5', '--line': '#2a384b', '--line-strong': '#5a6d83' };
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const relative of ['', 'projects/', 'projects/range-extended-electric-vehicle/', 'education/', 'certificates/', 'contact/', '404.html']) {
      await open(page, route(relative));
      const appearance = await page.evaluate(keys => {
        const root = getComputedStyle(document.documentElement);
        return { tokens: Object.fromEntries(keys.map(key => [key, root.getPropertyValue(key).trim().toLowerCase()])), scheme: root.colorScheme,
          meta: document.querySelector('meta[name="color-scheme"]')?.content, background: getComputedStyle(document.body).backgroundColor,
          font: getComputedStyle(document.body).fontFamily };
      }, Object.keys(expected));
      assert.deepEqual(appearance.tokens, expected, `Reference palette on ${relative || '/'}`);
      assert.equal(appearance.scheme, 'dark');
      assert.equal(appearance.meta, 'dark');
      assert.equal(appearance.background, 'rgb(11, 18, 32)');
      assert.match(appearance.font, /Manrope/);
    }
    await open(page, route('certificates/'));
    await page.locator('[data-image-viewer]').first().click();
    const dialogBackground = await page.locator('.image-viewer').evaluate(element => getComputedStyle(element).backgroundColor);
    assert.equal(dialogBackground, 'rgb(11, 18, 32)', 'Dialog chrome uses the reference navy palette');
    await page.keyboard.press('Escape');
  });

  await check('Transformer uses the requested full display title everywhere it is selected', async () => {
    await open(page, route());
    const card = page.locator('.project-card').filter({ has: page.locator(`a[href="${new URL(route('projects/center-tapped-transformer/')).pathname}"]`) });
    assert.ok(await card.getByRole('heading', { name: 'Single-Phase Center-Tapped Transformer', exact: true }).isVisible());
    await open(page, route('projects/center-tapped-transformer/'));
    assert.equal((await page.locator('h1').innerText()).trim(), 'Single-Phase Center-Tapped Transformer');
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
    await assertFilteredPriority(page);
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
      await assertFilteredPriority(page);
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
    for (const destination of navigationDestinations) assert.ok(await noJsPage.locator('#primary-nav').getByRole('link', { name: destination, exact: true }).isVisible());
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
