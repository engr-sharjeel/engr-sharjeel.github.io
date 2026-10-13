import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const phase = process.argv.find(arg => arg.startsWith('--phase='))?.slice(8) || 'after';
assert.match(phase, /^[a-z0-9-]+$/, 'Use a simple report label');
const base = new URL(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4323/');
if (!base.pathname.endsWith('/')) base.pathname += '/';
const artifactDir = `.tmp/phase3-${phase}`;
await mkdir(artifactDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PORTFOLIO_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const conditions = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, cpuSlowdown: 4, latencyMs: 150, downloadBytesPerSecond: 200000, uploadBytesPerSecond: 93750, samples: 3, postLoadObservationMs: 1200 };
const report = { phase, origin: base.href, date: new Date().toISOString(), chrome: browser.version(), conditions, samples: [], summary: [], screenshots: [], imageSlots: [], errors: [] };
const route = path => new URL(path.replace(/^\/+/, ''), base).href;
const label = path => path.replaceAll('/', '-').replace(/-$/, '') || 'home';
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const selectedPages = process.argv.find(arg => arg.startsWith('--pages='))?.slice(8);
const pages = selectedPages ? selectedPages.split(',').map(page => {
  assert.match(page, /^(?:home|[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?)$/, 'Measure only local page paths');
  return page === 'home' ? '' : `${page.replace(/\/+$/, '')}/`;
}) : ['', 'projects/', 'projects/range-extended-electric-vehicle/', 'certificates/'];
report.pages = pages;
const assetDimensions = new Map();

try {
  for (const path of process.argv.includes('--slots-only') ? [] : pages) {
    for (let sample = 1; sample <= conditions.samples; sample++) {
      const context = await browser.newContext({ viewport: conditions.viewport, deviceScaleFactor: conditions.deviceScaleFactor, reducedMotion: 'no-preference' });
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push({ path, sample, message: error.message }));
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      // Empty URLPattern applies global throttling; '*' alone is not an absolute URLPattern.
      await cdp.send('Network.emulateNetworkConditionsByRule', { offline: false, matchedNetworkConditions: [{ urlPattern: '', latency: conditions.latencyMs, downloadThroughput: conditions.downloadBytesPerSecond, uploadThroughput: conditions.uploadBytesPerSecond }] });
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: conditions.cpuSlowdown });
      await page.addInitScript(() => {
        window.portfolioLab = { lcp: null, lcpElement: null, shifts: [] };
        new PerformanceObserver(list => {
          const entry = list.getEntries().at(-1);
          if (entry) { window.portfolioLab.lcp = entry.startTime; window.portfolioLab.lcpElement = entry.element?.tagName + '.' + entry.element?.className; }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.portfolioLab.shifts.push({ time: entry.startTime, value: entry.value, sources: entry.sources.map(source => ({ element: source.node?.tagName + '.' + source.node?.className, previous: source.previousRect.toJSON(), current: source.currentRect.toJSON() })) });
        }).observe({ type: 'layout-shift', buffered: true });
      });
      const response = await page.goto(route(path), { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(conditions.postLoadObservationMs);
      const state = await page.evaluate(() => {
        const entries = [...performance.getEntriesByType('navigation'), ...performance.getEntriesByType('resource')].map(entry => ({ name: entry.name, initiatorType: entry.entryType === 'navigation' ? 'document' : entry.initiatorType, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, decodedBodySize: entry.decodedBodySize, duration: entry.duration }));
        const groups = { document: 0, javascript: 0, css: 0, fonts: 0, images: 0, other: 0 };
        for (const entry of entries) {
          const path = new URL(entry.name).pathname;
          const group = entry.initiatorType === 'document' ? 'document' : /\.m?js$/.test(path) ? 'javascript' : /\.css$/.test(path) ? 'css' : /\.(woff2?|ttf)$/.test(path) ? 'fonts' : /\.(webp|png|jpe?g|svg|avif)$/.test(path) ? 'images' : 'other';
          groups[group] += entry.transferSize;
        }
        let cls = 0, windowValue = 0, windowStart = 0, previous = 0;
        for (const shift of window.portfolioLab.shifts) {
          if (shift.time - previous > 1000 || shift.time - windowStart > 5000) { windowValue = 0; windowStart = shift.time; }
          windowValue += shift.value; cls = Math.max(cls, windowValue); previous = shift.time;
        }
        const inlineJavaScriptBytes = [...document.scripts].filter(script => !script.src && script.type !== 'application/ld+json').reduce((sum, script) => sum + new TextEncoder().encode(script.textContent).length, 0);
        const navigation = performance.getEntriesByType('navigation')[0];
        return { lcpMs: window.portfolioLab.lcp, lcpElement: window.portfolioLab.lcpElement, cls, shifts: window.portfolioLab.shifts, responseWaitMs: navigation.responseStart - navigation.requestStart, requestCount: entries.length, transferBytes: entries.reduce((sum, entry) => sum + entry.transferSize, 0), transferByType: groups, inlineJavaScriptBytes, resources: entries, images: [...document.images].map(image => ({ alt: image.alt, slotWidth: Math.round(image.getBoundingClientRect().width), slotHeight: Math.round(image.getBoundingClientRect().height), naturalWidth: image.naturalWidth, declaredWidth: Number(image.getAttribute('width')), currentSrc: image.currentSrc, sizes: image.sizes, srcset: image.srcset, loading: image.loading, fetchPriority: image.fetchPriority, visible: image.getBoundingClientRect().top < innerHeight && image.getBoundingClientRect().bottom > 0 })) };
      });
      const result = { page: path || '/', sample, ...state };
      report.samples.push(result);
      assert.ok(state.lcpMs > 0, 'LCP observation must exist');
      const stylesheetDurations = state.resources.filter(resource => /\.css$/.test(new URL(resource.name).pathname)).map(resource => resource.duration);
      assert.ok(stylesheetDurations.length && stylesheetDurations.every(duration => duration >= conditions.latencyMs - 5), 'Configured network latency must actually apply to resource requests');
      console.log(`${phase} ${path || '/'} ${sample}: ${state.requestCount} requests, ${(state.transferBytes / 1024).toFixed(1)} KiB, LCP ${state.lcpMs.toFixed(0)} ms, CLS ${state.cls.toFixed(5)}`);
      await context.close();
    }
    const samples = report.samples.filter(sample => sample.page === (path || '/'));
    report.summary.push({ page: path || '/', requestCount: median(samples.map(s => s.requestCount)), transferBytes: median(samples.map(s => s.transferBytes)), lcpMs: median(samples.map(s => s.lcpMs)), cls: median(samples.map(s => s.cls)), inlineJavaScriptBytes: median(samples.map(s => s.inlineJavaScriptBytes)), transferByType: Object.fromEntries(Object.keys(samples[0].transferByType).map(type => [type, median(samples.map(s => s.transferByType[type]))])) });
  }
  await writeFile(`${artifactDir}/performance-timing.json`, JSON.stringify(report, null, 2) + '\n');
  if (report.samples.length) console.log('Timed samples complete; optional image-slot and screenshot inspection follows.');

  if (process.argv.includes('--slots') || process.argv.includes('--slots-only')) {
    for (const dpr of [1, 2, 3]) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: dpr, reducedMotion: 'reduce' });
      const page = await context.newPage();
      for (const width of [390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const path of pages) {
          await page.goto(route(path), { waitUntil: 'networkidle' });
          await page.evaluate(async () => { document.querySelectorAll('img').forEach(image => image.loading = 'eager'); await Promise.all([...document.images].map(image => image.decode())); });
          const slots = await page.evaluate(async () => Promise.all([...document.images].map(async image => {
            const candidate = new Image(); candidate.src = image.currentSrc; await candidate.decode();
            const rect = image.getBoundingClientRect();
            const fit = getComputedStyle(image).objectFit;
            const ratio = candidate.naturalWidth / candidate.naturalHeight;
            const visibleWidth = fit === 'contain' ? Math.min(rect.width, rect.height * ratio) : rect.width;
            return { alt: image.alt, boxWidth: Math.round(rect.width), boxHeight: Math.round(rect.height), visibleWidth: Math.round(visibleWidth), candidateWidth: candidate.naturalWidth, candidateHeight: candidate.naturalHeight, sizes: image.sizes, fit, candidate: new URL(image.currentSrc).pathname, loading: image.loading, fetchPriority: image.fetchPriority };
          })));
          for (const image of slots) {
            let dimensions = assetDimensions.get(image.candidate);
            if (!dimensions) {
              const response = await context.request.get(new URL(image.candidate, base).href);
              assert.equal(response.status(), 200);
              const metadata = await sharp(await response.body()).metadata();
              dimensions = { width: metadata.width, height: metadata.height };
              assetDimensions.set(image.candidate, dimensions);
            }
            assert.equal(image.candidateWidth, dimensions.width, 'Inspect true source pixels, not density-adjusted image naturalWidth');
            assert.equal(image.candidateHeight, dimensions.height);
          }
          report.imageSlots.push({ page: path || '/', width, dpr, images: slots });
        }
      }
      await context.close();
    }
  }

  if (process.argv.includes('--screenshots') || process.argv.includes('--viewer-screenshots')) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const representative = process.argv.includes('--screenshots') ? ['', 'projects/', 'projects/range-extended-electric-vehicle/', 'projects/micro-hydropower-plant/', 'projects/autonomous-navigation-robot/', 'projects/electronic-voting-machine/', 'projects/smart-access-monitoring-system/', 'projects/center-tapped-transformer/', 'projects/digital-logic-clock/', 'education/', 'certificates/', 'experience/', 'research/', 'achievements/', 'about/', 'contact/', '404.html'] : ['certificates/'];
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      for (const path of representative) {
        const response = await page.goto(route(path), { waitUntil: 'networkidle' });
        assert.ok(response.status() === 200 || (path === '404.html' && response.status() === 404));
        await page.evaluate(async () => { document.querySelectorAll('img').forEach(image => image.loading = 'eager'); await Promise.all([...document.images].map(image => image.decode().catch(() => undefined))); await document.fonts.ready; });
        const filename = `${artifactDir}/${width}-${label(path)}.png`;
        await page.screenshot({ path: filename, fullPage: true });
        report.screenshots.push(filename);
        if (path === 'certificates/') {
          await page.locator('[data-image-viewer]').first().click();
          await page.locator('.viewer-image').evaluate(image => image.decode());
          await page.waitForFunction(() => document.querySelector('.viewer-image')?.naturalWidth > 800 && !document.querySelector('.image-viewer').classList.contains('is-loading'));
          const viewerFilename = `${artifactDir}/${width}-certificate-viewer.png`;
          await page.screenshot({ path: viewerFilename }); report.screenshots.push(viewerFilename);
          await page.keyboard.press('Escape');
        }
      }
    }
    for (const width of process.argv.includes('--screenshots') ? [320, 768, 1024] : []) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of pages) {
        await page.goto(route(path), { waitUntil: 'networkidle' });
        await page.evaluate(async () => { document.querySelectorAll('img').forEach(image => image.loading = 'eager'); await Promise.all([...document.images].map(image => image.decode().catch(() => undefined))); await document.fonts.ready; });
        const filename = `${artifactDir}/${width}-${label(path)}.png`;
        await page.screenshot({ path: filename, fullPage: true }); report.screenshots.push(filename);
      }
    }
    await context.close();
  }
  report.documentManifestSha256 = createHash('sha256').update(await readFile('src/data/public-assets.json')).digest('hex');
  assert.deepEqual(report.errors, []);
} finally {
  await browser.close();
  await writeFile(`${artifactDir}/performance.json`, JSON.stringify(report, null, 2) + '\n');
}
