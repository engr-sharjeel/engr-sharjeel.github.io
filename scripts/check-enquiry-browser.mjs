import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import axe from 'axe-core';

// Provider requests are always intercepted. This suite never sends an enquiry
// or triggers a recipient activation email. Submitted values stay in memory.
const base = new URL(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4321/');
if (!base.pathname.endsWith('/')) base.pathname += '/';
const route = path => new URL(path.replace(/^\/+/, ''), base).href;
const endpoint = 'https://formsubmit.co/engr.muhammadsharjeel@gmail.com';
const serviceIds = ['power-systems', 'renewable-energy', 'circuit-pcb', 'embedded-systems', 'matlab-analysis', 'cad-documentation'];
const coreNames = ['service', 'name', 'email', 'preferred_contact', 'phone', 'message'];
const expandedNames = ['project_title', 'organisation', 'timeframe', 'budget_currency', 'budget_estimate', 'reference_url'];
const report = { base: base.href, started: new Date().toISOString(), delivery: 'Provider POSTs mocked; activation and real receipt not tested.', checks: [], axe: [], errors: [] };
await mkdir('.tmp', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PORTFOLIO_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', hasTouch: true });
const page = await context.newPage();
page.on('pageerror', error => report.errors.push(error.message));
const posts = [];
let serviceTitles = new Map();
let providerMode = 'reject';

async function interceptProvider(targetContext) {
  await targetContext.route('https://formsubmit.co/**', async intercepted => {
    const request = intercepted.request();
    if (request.method() !== 'POST' || request.url() !== endpoint) {
      report.errors.push('Unexpected provider request was blocked.');
      await intercepted.abort('blockedbyclient');
      return;
    }
    posts.push(new URLSearchParams(request.postData() || ''));
    if (providerMode === 'network-failure') {
      await intercepted.abort('failed');
      return;
    }
    if (providerMode === 'accept') {
      await intercepted.fulfill({ status: 303, headers: { location: route('contact/thanks/') }, body: '' });
    } else {
      await intercepted.fulfill({ status: 503, contentType: 'text/html', body: '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Mock delivery unavailable</title></head><body><main><h1>Mock delivery unavailable</h1><p>No enquiry was delivered. Use the browser Back action to retry.</p></main></body></html>' });
    }
  });
}
await interceptProvider(context);

async function check(label, work) {
  try { await work(); report.checks.push({ label, passed: true }); console.log(`PASS ${label}`); }
  catch (error) { report.checks.push({ label, passed: false, message: error.message }); console.error(`FAIL ${label}: ${error.message}`); }
}
async function open(path) {
  const response = await page.goto(route(path), { waitUntil: 'networkidle' });
  assert.equal(response?.status(), 200, 'The requested public page must load directly.');
  await page.evaluate(() => document.fonts.ready);
}
function form(targetPage = page) { return targetPage.locator('[data-enquiry-form]'); }
function field(name, targetPage = page) { return form(targetPage).locator(`[name="${name}"]`); }
async function populateCore(targetPage = page, service = 'other') {
  await field('service', targetPage).selectOption(service);
  await field('name', targetPage).fill('Synthetic browser test');
  await field('email', targetPage).fill('synthetic-enquiry@example.invalid');
  await field('preferred_contact', targetPage).selectOption('email');
  await field('message', targetPage).fill('TEST ONLY: review an academic circuit schematic and clarify the scope.');
}
async function assertPayload(payload, { expanded = false, source } = {}) {
  assert.ok(payload, 'A synthetic POST must be intercepted.');
  for (const name of coreNames) assert.ok(payload.has(name), `The delivered record contains ${name}.`);
  assert.ok(payload.get('service') === 'other', 'The selected general-enquiry service is preserved.');
  assert.ok(payload.get('name') === 'Synthetic browser test', 'The entered name is preserved.');
  assert.ok(payload.get('email') === 'synthetic-enquiry@example.invalid', 'The email field is the reply address.');
  assert.ok(payload.get('preferred_contact') === 'email', 'Email is the default contact preference.');
  assert.ok(payload.get('message')?.startsWith('TEST ONLY:'), 'The complete synthetic brief is included.');
  assert.ok(payload.get('source_page')?.toLowerCase().includes(source), 'The delivery includes the originating public page.');
  assert.ok(payload.get('_subject')?.toLowerCase().includes('enquiry'), 'The delivery has a descriptive enquiry subject.');
  assert.equal(payload.get('_template'), 'table');
  assert.equal(payload.get('_honey'), '');
  assert.ok(!payload.has('_cc') && !payload.has('_autoresponse'), 'No additional recipients or automatic visitor emails are configured.');
  assert.ok(!payload.has('_captcha') || payload.get('_captcha') !== 'false', 'Provider spam verification remains available.');
  const next = new URL(payload.get('_next'));
  assert.equal(next.origin, 'https://engr-sharjeel.github.io');
  assert.equal(next.pathname, new URL(route('contact/thanks/')).pathname, 'The absolute return URL respects the configured base.');
  assert.equal(next.search, '', 'No personal input belongs in the return URL.');
  if (expanded) for (const name of expandedNames) assert.ok(payload.has(name), `The expanded record includes optional ${name}.`);
}
async function assertLayout() {
  const state = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    controls: [...document.querySelectorAll('[data-enquiry-form] input:not([type="hidden"]), [data-enquiry-form] select, [data-enquiry-form] textarea, [data-enquiry-form] button[type="submit"]')]
      .filter(element => element.getClientRects().length && !element.closest('[hidden]') && getComputedStyle(element).display !== 'none')
      .map(element => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height, left: element.getBoundingClientRect().left, right: element.getBoundingClientRect().right })),
    textVisible: [...document.querySelectorAll('[data-enquiry-form], table')].every(element => getComputedStyle(element).visibility !== 'hidden' && Number(getComputedStyle(element).opacity) > 0),
  }));
  assert.ok(state.document <= state.viewport + 1 && state.body <= state.viewport + 1, 'The page reflows without horizontal overflow.');
  assert.ok(state.textVisible, 'Forms and services stay visible without optional motion.');
  assert.ok(state.controls.length > 5, 'The enquiry controls remain present.');
  assert.ok(state.controls.every(control => control.width >= 43.5 && control.height >= 43.5 && control.left >= -1 && control.right <= state.viewport + 1), 'Visible controls have usable touch targets and fit the page.');
}
async function axeCheck(label) {
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
  report.axe.push({ label, violations: result.violations.map(violation => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.flatMap(node => node.target) })) });
  assert.deepEqual(result.violations.map(violation => violation.id), []);
}
async function submit() { await form().locator('[data-enquiry-submit]').click({ noWaitAfter: true }); }
async function invalidFields(names) {
  await submit();
  assert.ok(await form().locator('[data-enquiry-errors]').isVisible(), 'Validation exposes an accessible summary.');
  assert.ok(await form().locator('[data-enquiry-errors]').evaluate(element => element === document.activeElement), 'Validation moves focus to the error summary.');
  for (const name of names) {
    assert.equal(await field(name).getAttribute('aria-invalid'), 'true', `The invalid ${name} field is identified.`);
    assert.ok(await form().locator(`[data-field-error="${name}"]`).isVisible(), `A visible error accompanies ${name}.`);
  }
  assert.ok(await form().locator('[data-enquiry-submit]').isEnabled(), 'Validation failures never lock the form.');
}

try {
  await check('About offers supported services in a semantic table and a real local enquiry form', async () => {
    await open('about/');
    assert.equal(await page.locator('#services').count(), 1, 'Services have a direct public anchor.');
    const table = page.locator('#services table');
    assert.equal(await table.count(), 1);
    assert.ok(await table.locator('caption').innerText(), 'A service table has a clear caption.');
    assert.ok(await table.locator('thead th').count() >= 4, 'Column headers identify the client-facing service information.');
    const rowIds = await table.locator('[data-service-id]').evaluateAll(rows => rows.map(row => row.dataset.serviceId));
    assert.deepEqual(rowIds, serviceIds);
    serviceTitles = new Map(await table.locator('[data-service-id]').evaluateAll(rows => rows.map(row => [row.dataset.serviceId, row.querySelector('.service-title').textContent.trim()])));
    assert.ok(await page.locator('a[href="#services"]').count() > 0, 'The introduction includes a services action.');
    assert.ok(await page.locator('#project-enquiry [data-enquiry-form]').isVisible());
    for (const id of serviceIds) {
      const row = table.locator(`[data-service-id="${id}"]`);
      assert.ok((await row.innerText()).trim().length > 80, 'Each service gives useful scope and deliverable context.');
      const examples = await row.locator('a[href*="/projects/"]').evaluateAll(links => links.map(link => link.href));
      assert.ok(examples.length > 0, 'Every service has supported portfolio evidence.');
      for (const href of examples) assert.equal((await context.request.get(href)).status(), 200, 'Service examples point to built project pages.');
    }
  });

  for (const [path, variant, id] of [['about/', 'compact', 'about-enquiry'], ['contact/', 'expanded', 'contact-enquiry']]) {
    await check(`${path} uses shared service options, field names and native delivery configuration`, async () => {
      await open(path);
      assert.equal(await form().count(), 1);
      assert.equal(await form().getAttribute('id'), id);
      assert.equal(await form().getAttribute('data-variant'), variant);
      assert.equal((await form().getAttribute('method')).toLowerCase(), 'post');
      assert.equal(await form().getAttribute('action'), endpoint);
      assert.deepEqual(await field('service').locator('option').evaluateAll(options => options.map(option => option.value).filter(Boolean)), [...serviceIds, 'other']);
      for (const serviceId of serviceIds) assert.equal((await field('service').locator(`option[value="${serviceId}"]`).textContent()).trim(), serviceTitles.get(serviceId), 'Service titles agree between the overview and both selectors.');
      for (const name of coreNames) assert.equal(await field(name).count(), 1, `The ${name} field occurs once.`);
      assert.equal(await field('email').getAttribute('type'), 'email');
      assert.equal(await field('email').getAttribute('autocomplete'), 'email');
      assert.equal(await field('phone').getAttribute('autocomplete'), 'tel');
      assert.equal(await field('preferred_contact').inputValue(), 'email');
      assert.equal(await form().locator('input[type="file"]').count(), 0, 'There are no uploads in this version.');
      const associations = await form().evaluate(element => [...element.querySelectorAll('input:not([type="hidden"]), select, textarea')]
        .filter(control => control.name !== '_honey')
        .map(control => ({ id: control.id, label: [...element.querySelectorAll('label')].filter(label => label.htmlFor === control.id).length, limit: control.maxLength, kind: control.tagName })));
      assert.ok(associations.every(control => control.id && control.label === 1), 'Every public control has one visible associated label.');
      assert.equal(new Set(associations.map(control => control.id)).size, associations.length, 'Field IDs are unique within each variant.');
      assert.ok(associations.filter(control => control.kind === 'INPUT' || control.kind === 'TEXTAREA').every(control => control.limit > 0), 'Free-text fields have sensible limits.');
      for (const name of expandedNames) assert.equal(await field(name).count(), variant === 'expanded' ? 1 : 0, 'Only the expanded form contains optional project detail fields.');
      assert.equal(await form().locator('a[href="https://formsubmit.co/privacy.pdf"]').count(), 1, 'The form discloses third-party processing with a privacy link.');
      const returnUrl = new URL(await field('_next').inputValue());
      assert.equal(returnUrl.origin, 'https://engr-sharjeel.github.io');
      assert.equal(returnUrl.pathname, new URL(route('contact/thanks/')).pathname);
    });
  }

  await check('About service actions select only known services and reach the local form', async () => {
    await open('about/');
    for (const id of serviceIds) {
      await page.locator(`[data-service-select="${id}"]`).click();
      assert.equal(await field('service').inputValue(), id);
      assert.equal(new URL(page.url()).hash, '#project-enquiry');
      assert.ok(await field('service').evaluate(element => element === document.activeElement), 'A service action puts keyboard focus in the local form.');
    }
  });
  await check('Contact preselection is whitelisted and query strings never become HTML', async () => {
    for (const id of [...serviceIds, 'other']) {
      await open(`contact/?service=${id}#project-enquiry`);
      assert.equal(await field('service').inputValue(), id);
    }
    for (const value of ['not-a-service', '<img src=x onerror=alert(1)>']) {
      await open(`contact/?service=${encodeURIComponent(value)}#project-enquiry`);
      assert.ok(!await field('service').inputValue() || await field('service').inputValue() === 'other', 'Unknown service values do not become selections.');
      assert.equal(await form().locator('img').count(), 0, 'Untrusted preselection does not insert markup.');
    }
  });

  await check('Required and whitespace-only input exposes focused, linked errors without losing entered values', async () => {
    await open('about/');
    await field('name').fill('   ');
    await field('message').fill('   ');
    await invalidFields(['service', 'name', 'email', 'message']);
    assert.equal(await field('name').inputValue(), '   ', 'Entered values are retained after validation.');
    assert.equal(await field('message').inputValue(), '   ');
    const nameId = await field('name').getAttribute('id');
    await form().locator(`[data-enquiry-error-list] a[href="#${nameId}"]`).click();
    assert.ok(await field('name').evaluate(element => element === document.activeElement), 'Error-summary links focus their fields.');
    await axeCheck('About enquiry error state');
  });
  await check('Malformed email and reference URLs are rejected with recoverable field errors', async () => {
    await open('contact/');await populateCore();
    await field('email').fill('not-an-email');
    await field('reference_url').fill('not-a-valid-url');
    await invalidFields(['email', 'reference_url']);
    assert.ok(await field('name').inputValue() === 'Synthetic browser test', 'Other entered values are preserved.');
    await field('email').fill('synthetic-enquiry@example.invalid');
    await field('reference_url').fill('https://example.invalid/reference');
    assert.ok(await form().evaluate(element => element.checkValidity()), 'Corrected input satisfies native constraints.');
  });
  await check('Phone and WhatsApp preferences request a number while accepting international formatting', async () => {
    await open('contact/');await populateCore();
    for (const method of ['whatsapp', 'phone']) {
      await field('preferred_contact').selectOption(method);
      await field('phone').fill('');
      assert.ok(await field('phone').evaluate(element => element.required));
      await invalidFields(['phone']);
    }
    await field('phone').fill('+44 20 7946 0123');
    assert.ok(await form().evaluate(element => element.checkValidity()), 'International punctuation and prefixes are accepted.');
    providerMode = 'accept';await submit();await page.waitForURL(route('contact/thanks/'));
    assert.ok(posts.at(-1)?.get('preferred_contact') === 'phone', 'The requested phone reply is included in the submitted record.');
    assert.ok(posts.at(-1)?.get('phone') === '+44 20 7946 0123', 'International phone formatting survives the native POST.');
    await open('contact/');await populateCore();
    await field('preferred_contact').selectOption('phone');
    await field('preferred_contact').selectOption('email');
    assert.equal(await field('phone').evaluate(element => element.required), false, 'The number is optional for an email reply.');
    await field('phone').fill('');
    assert.ok(await form().evaluate(element => element.checkValidity()));
  });

  await check('A native About POST sends the complete consistent core record using synthetic data', async () => {
    await open('about/');await populateCore();providerMode = 'accept';
    const previous = posts.length;
    await submit();await page.waitForURL(route('contact/thanks/'));
    assert.equal(posts.length, previous + 1);
    await assertPayload(posts.at(-1), { source: 'about' });
    assert.equal(new URL(page.url()).search, '', 'No visitor data is put in the return URL.');
    assert.equal(await page.locator('[data-enquiry-form]').count(), 0, 'The return page never renders submitted information.');
  });
  await check('An expanded native POST includes optional project fields without making them mandatory', async () => {
    await open('contact/');await populateCore();
    await field('project_title').fill('Synthetic schematic review');
    await field('organisation').fill('Synthetic example organisation');
    const timeframeOptions = await field('timeframe').locator('option').evaluateAll(options => options.map(option => ({ value: option.value, text: option.textContent })));
    const flexible = timeframeOptions.find(option => /flexible|not sure/i.test(option.text));
    assert.ok(flexible, 'Timeframe includes a flexible or uncertain option.');
    await field('timeframe').selectOption(flexible.value);
    const currency = await field('budget_currency').locator('option').evaluateAll(options => options.map(option => option.value).find(value => value === 'USD') || options.map(option => option.value).find(Boolean));
    await field('budget_currency').selectOption(currency);
    await field('budget_estimate').fill('Not sure yet');
    await field('reference_url').fill('https://example.invalid/reference');
    providerMode = 'accept';await submit();await page.waitForURL(route('contact/thanks/'));
    await assertPayload(posts.at(-1), { source: 'contact', expanded: true });
    assert.ok(posts.at(-1).get('project_title') === 'Synthetic schematic review', 'Optional project details are carried into the POST.');
    assert.ok(posts.at(-1).get('reference_url') === 'https://example.invalid/reference', 'The optional reference link is included.');
    await open('contact/');await populateCore();
    for (const name of expandedNames) assert.equal(await field(name).evaluate(element => element.required), false, 'General enquiries do not require optional project or budget information.');
    assert.ok(await form().evaluate(element => element.checkValidity()));
  });
  await check('Valid submission locks repeat clicks once and browser Back restores a usable populated form', async () => {
    await open('contact/');await populateCore();providerMode = 'accept';
    const previous = posts.length;
    // Delay the browser's default navigation for one event, so the old document
    // remains inspectable. Other tests exercise the unmodified native POST.
    await form().evaluate(element => element.addEventListener('submit', event => event.preventDefault(), { once: true }));
    await submit();
    assert.ok(await form().locator('[data-enquiry-submit]').isDisabled(), 'Valid submission locks its button before native navigation.');
    assert.equal(await form().getAttribute('aria-busy'), 'true');
    await field('name').press('Enter');
    const cancelledRepeat = await form().evaluate(element => !element.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    assert.ok(cancelledRepeat, 'A second submit event is cancelled while submission is pending.');
    assert.equal(posts.length, previous, 'Repeat clicks do not send another POST while the first native navigation is delayed.');
    await form().evaluate(element => {
      if (!(element instanceof HTMLFormElement)) throw new Error('Expected the native enquiry form.');
      element.submit();
    });await page.waitForURL(route('contact/thanks/'));
    assert.equal(posts.length, previous + 1, 'The released native navigation sends one POST.');
    await page.goBack({ waitUntil: 'networkidle' });
    assert.equal(new URL(page.url()).pathname, new URL(route('contact/')).pathname);
    assert.ok(await form().locator('[data-enquiry-submit]').isEnabled(), 'Back navigation unlocks the submit control.');
    assert.ok(await field('name').inputValue() === 'Synthetic browser test', 'Back navigation preserves the visitor input.');
    assert.ok((await field('message').inputValue()).startsWith('TEST ONLY:'), 'The brief remains available after Back.');
  });
  await check('Provider rejection shows no local false success and browser Back permits retry without losing the brief', async () => {
    await open('about/');await populateCore();providerMode = 'reject';
    await submit();await page.waitForURL(endpoint);
    assert.match(await page.locator('h1').innerText(), /unavailable/);
    assert.notEqual(new URL(page.url()).pathname, new URL(route('contact/thanks/')).pathname, 'A provider failure does not claim successful submission.');
    await page.goBack({ waitUntil: 'networkidle' });
    assert.ok(await form().locator('[data-enquiry-submit]').isEnabled());
    assert.ok((await field('message').inputValue()).startsWith('TEST ONLY:'), 'A failed native submission keeps the brief for recovery.');
    providerMode = 'accept';await submit();await page.waitForURL(route('contact/thanks/'));
  });
  await check('A blocked provider request retains recovery through browser Back and direct contact', async () => {
    await open('contact/');await populateCore();providerMode = 'network-failure';
    await submit();
    try { await page.waitForURL(endpoint); }
    catch (error) { assert.match(error.message, /net::ERR_FAILED/, 'Only the deliberately mocked network failure is expected.'); }
    await page.waitForFunction(() => location.protocol === 'chrome-error:' && document.readyState === 'complete');
    assert.notEqual(new URL(page.url()).pathname, new URL(route('contact/thanks/')).pathname, 'A failed request cannot become a local success.');
    await page.goBack({ waitUntil: 'networkidle' });
    assert.ok(await form().locator('[data-enquiry-submit]').isEnabled());
    assert.ok((await field('message').inputValue()).startsWith('TEST ONLY:'), 'The brief remains available after network failure.');
    assert.ok(await form().locator('a[href="mailto:engr.muhammadsharjeel@gmail.com"]').isVisible(), 'Email recovery remains beside the form.');
    assert.ok(await form().locator('a[href="https://wa.me/923494247649"]').isVisible(), 'WhatsApp recovery remains beside the form.');
    providerMode = 'accept';
  });

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await interceptProvider(noJs);
  const fallback = await noJs.newPage();
  await check('No-JavaScript Email enquiries use native HTML POST and preserve direct navigation', async () => {
    await fallback.goto(route('about/'), { waitUntil: 'networkidle' });
    assert.ok(await form(fallback).isVisible());
    assert.equal(await form(fallback).evaluate(element => element.noValidate), false, 'Native HTML validation remains enabled without script.');
    assert.equal(await field('preferred_contact', fallback).inputValue(), 'email');
    assert.equal(await field('phone', fallback).evaluate(element => element.required), false);
    await fallback.locator('[data-service-select]').first().click();
    assert.equal(new URL(fallback.url()).hash, '#project-enquiry');
    assert.ok(await form(fallback).isVisible(), 'A service action still reaches the local native form without script.');
    await populateCore(fallback);providerMode = 'accept';
    await form(fallback).locator('[data-enquiry-submit]').click();
    await fallback.waitForURL(route('contact/thanks/'));
    await assertPayload(posts.at(-1), { source: 'about' });
    assert.ok(await fallback.locator('main a[href*="/about/"]').count() > 0, 'The return page offers a services recovery path without script.');
    await fallback.goto(route('contact/'), { waitUntil: 'networkidle' });
    assert.ok(await form(fallback).isVisible());
    assert.equal(await fallback.locator('a[href="mailto:engr.muhammadsharjeel@gmail.com"]').count() > 0, true);
  });
  await noJs.close();

  for (const width of [320, 390, 768, 1440]) {
    for (const path of ['about/', 'contact/']) await check(`${width}px ${path} service/form reflow and touch controls`, async () => {
      await page.setViewportSize({ width, height: width === 320 ? 844 : 1000 });
      await open(path);await assertLayout();
      if (path === 'about/') {
        const table = page.locator('#services table');
        assert.ok(await table.isVisible());
        assert.equal(await table.locator('[data-service-id]').count(), serviceIds.length);
        assert.ok(await table.evaluate(element => element.getBoundingClientRect().right <= innerWidth + 1), 'Service records do not overflow on narrow screens.');
      }
      if ([390, 1440].includes(width)) await axeCheck(`${width}px ${path} enquiry`);
    });
  }
  for (const path of ['about/', 'contact/']) await check(`Short landscape and enlarged text keep ${path} usable`, async () => {
    await page.setViewportSize({ width: 667, height: 375 });await open(path);await assertLayout();
    await page.setViewportSize({ width: 640, height: 900 });await open(path);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });await assertLayout();
  });
  await check('Keyboard labels, error navigation and focus stay usable in the enquiry', async () => {
    await page.setViewportSize({ width: 390, height: 844 });await open('contact/');
    await field('service').focus();
    await page.keyboard.press('Tab');
    assert.ok(await field('name').evaluate(element => element === document.activeElement), 'Keyboard order starts with the main required fields.');
    await page.keyboard.press('Tab');
    assert.ok(await field('email').evaluate(element => element === document.activeElement));
    const focus = await field('email').evaluate(element => ({ outlineStyle: getComputedStyle(element).outlineStyle, outlineWidth: parseFloat(getComputedStyle(element).outlineWidth), boxShadow: getComputedStyle(element).boxShadow }));
    assert.ok((focus.outlineStyle !== 'none' && focus.outlineWidth >= 1) || focus.boxShadow !== 'none', 'Keyboard focus is visibly indicated.');
    await invalidFields(['service', 'name', 'email', 'message']);
  });
  await check('Contact keeps the form first, correct direct links and a clear unbooked follow-up flow', async () => {
    await open('contact/');
    const sequence = await page.locator('main').evaluate(element => {
      const form = element.querySelector('[data-enquiry-form]');
      const contact = element.querySelector('.contact-methods');
      return !!form && !!contact && !!(form.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    assert.ok(sequence, 'The form precedes direct contact in the reading/mobile order.');
    for (const href of ['tel:+923494247649', 'https://wa.me/923494247649', 'mailto:engr.muhammadsharjeel@gmail.com']) assert.ok(await page.locator(`main a[href="${href}"]`).count() > 0);
    const text = await page.locator('main').innerText();
    assert.match(text, /share.*brief/i);assert.match(text, /discuss.*scope/i);assert.match(text, /agree/i);
    assert.doesNotMatch(text, /guaranteed response|booking confirmed|within 24 hours/i);
  });
  await check('Return page is noindex, absent from sitemap and provides truthful navigation without visitor data', async () => {
    await open('contact/thanks/');
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    const canonical = new URL(await page.locator('link[rel="canonical"]').getAttribute('href'));
    assert.equal(canonical.origin, 'https://engr-sharjeel.github.io');
    assert.equal(canonical.pathname, new URL(route('contact/thanks/')).pathname);
    const sitemapResponse = await context.request.get(route('sitemap-0.xml'));
    assert.equal(sitemapResponse.status(), 200);
    assert.doesNotMatch(await sitemapResponse.text(), /\/contact\/thanks\//);
    assert.equal(await page.locator('main h1').count(), 1);
    assert.equal(await page.locator('[data-enquiry-form]').count(), 0);
    assert.doesNotMatch(await page.locator('main').innerText(), /booking.*confirmed|delivery.*guaranteed|already.*read/i);
    assert.ok(await page.locator('main a[href*="/about/"]').count() > 0);
    assert.ok(await page.locator('main a[href*="/projects/"]').count() > 0);
    await axeCheck('Enquiry return page');
  });
  await check('Reduced-motion changes retain accessible content and avoid external form runtime', async () => {
    await open('about/');await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.ok(await form().isVisible());
    assert.ok(await page.locator('#services table').isVisible());
    assert.equal(await page.locator('script[src^="https://"]').count(), 0, 'The form introduces no third-party runtime script.');
  });
  await check('All provider traffic was mocked and no interaction errors occurred', async () => {
    assert.ok(posts.length >= 5, 'The native POST tests exercised both variants and recovery.');
    assert.deepEqual(report.errors, []);
  });
} finally {
  await context.close();await browser.close();
  await writeFile('.tmp/enquiry-browser-report.json', JSON.stringify(report, null, 2) + '\n');
}
const failures = report.checks.filter(check => !check.passed);
console.log(`Enquiry browser checks: ${report.checks.length - failures.length} passed, ${failures.length} failed; ${report.axe.length} accessibility scans.`);
if (failures.length) process.exitCode = 1;
