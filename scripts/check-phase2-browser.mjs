import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright-core';
import axe from 'axe-core';
const base = new URL(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4322/');
const url = path => new URL(path.replace(/^\/+/, ''), base).href;
const results = { base: base.href, checks: [], axe: [], errors: [] };
const manifest=JSON.parse(await readFile('src/data/public-assets.json','utf8'));
const credentialTotal=manifest.certificates.length;
await mkdir('.tmp/screenshots', {recursive: true});
const browser = await chromium.launch({executablePath: process.env.PORTFOLIO_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true});
const context = await browser.newContext({reducedMotion: 'reduce', hasTouch:true, viewport:{width:1440,height:1000}});
const page = await context.newPage();
page.on('pageerror', error => results.errors.push(error.message));
async function check(label, work) { try { await work(); results.checks.push({label,passed:true}); console.log(`PASS ${label}`); } catch(error) { results.checks.push({label,passed:false,message:error.message}); console.error(`FAIL ${label}: ${error.message}`); } }
async function open(path) { const response=await page.goto(url(path),{waitUntil:'networkidle'}); assert.equal(response.status(),200); }
async function axeCheck(label) {
  await page.addScriptTag({content:axe.source});
  const report = await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']}}));
  results.axe.push({label,violations:report.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.flatMap(n=>n.target)}))});
  assert.deepEqual(report.violations.map(v=>v.id),[]);
}
async function readViewer() {
  await page.locator('.viewer-image').evaluate(async image=>{await image.decode();});
  await page.waitForFunction(()=>{const image=document.querySelector('.viewer-image');return image?.naturalWidth>800 && Number(image.getAttribute('width'))===image.naturalWidth;});
}
try {
  for (const width of [390,768,1440]) {
    await check(`${width}px direct navigation reaches Education and Certificates`,async()=>{
      await page.setViewportSize({width,height:1000});
      for(const destination of ['education','certificates']) {
        await open('');
        if(width<941) await page.locator('.menu-toggle').tap();
        const link=page.locator('#primary-nav').getByRole('link',{name:destination==='education'?'Education':'Certificates',exact:true});
        await link.focus();
        await link.click(); await page.waitForURL(url(`${destination}/`));
        await page.reload({waitUntil:'networkidle'});
        assert.ok(await page.locator('h1').isVisible());
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      }
      if(width<941) {await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');assert.ok(await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement));assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
      assert.equal(await page.locator('.background-menu').count(),0);
    });
  }
  await page.setViewportSize({width:1440,height:1000});
  await check('Education and About use current CGPA and in-progress status',async()=>{
    for(const path of ['education/','about/']) {await open(path);assert.match(await page.locator('main').innerText(),/3\.10\s*\/\s*4\.00/);assert.match(await page.locator('main').innerText(),/In progress/);assert.match(await page.locator('main').innerText(),/Fall 2026/);}
  });
  await check('Certificate categories, reset and deep-link recovery show the canonical inventory',async()=>{
    await open('certificates/');
    assert.equal(await page.locator('[data-credential]:visible').count(),credentialTotal);
    for(const [category,count] of [['Courses',4],['Internship',2],['Language Qualification',1],['Academic Commendations',2],['Organisational Recognition',3]]) {
      const button=page.locator(`button[data-certificate-filter="${category}"]`);
      await button.click(); assert.equal(await button.getAttribute('aria-pressed'),'true'); assert.equal(await page.locator('[data-credential]:visible').count(),count);
      assert.match(await page.locator('#certificate-count').innerText(),new RegExp(`Showing ${count} credential`));
    }
    await page.locator('[data-certificate-filter="Courses"]').click();
    await page.locator('.credential-summary a[href="#academic-commendations"]').click();
    await page.waitForFunction(()=>document.querySelector('[data-certificate-group="Academic Commendations"]').hidden===false);
    assert.equal(await page.locator('[data-credential]:visible').count(),2);
    await page.locator('[data-certificate-filter="all"]').click(); assert.equal(await page.locator('[data-credential]:visible').count(),credentialTotal);
    assert.equal(await page.locator('.credential-actions').getByRole('link',{name:/Verify credential/}).count(),5);
    await page.getByRole('searchbox',{name:'Search certificates'}).fill('not-a-credential-xyz');
    assert.equal(await page.locator('[data-credential]:visible').count(),0);assert.ok(await page.locator('#certificate-empty-state').isVisible());
    await page.getByRole('button',{name:/Show all credentials/}).click();assert.equal(await page.locator('[data-credential]:visible').count(),credentialTotal);
    await page.getByRole('searchbox',{name:'Search certificates'}).fill('IELTS');assert.equal(await page.locator('[data-credential]:visible').count(),1);
    await page.getByRole('button',{name:/Clear filters/}).click();assert.equal(await page.locator('[data-credential]:visible').count(),credentialTotal);
  });
  for(const width of [390,1440]) {
    for(const path of ['education/','certificates/']) await check(`${width}px ${path} accessibility`,async()=>{await page.setViewportSize({width,height:1000}); await open(path); await axeCheck(`${width} ${path}`);});
    await check(`${width}px certificate viewer is lazy, readable and keyboard accessible`,async()=>{
      await open('certificates/');
      assert.equal(await page.locator('.viewer-image').count(),0);
      const opener=page.locator('[data-image-viewer]').first();
      const original=await opener.getAttribute('href');
      await opener.click(); await readViewer();
      assert.ok(await page.locator('.viewer-close').evaluate(el=>el===document.activeElement));
      assert.equal(await page.locator('.viewer-original').getAttribute('href'),new URL(original,base).href);
      assert.equal(await page.locator('.viewer-verify').getAttribute('href'),'https://coursera.org/verify/0TPXSEMUSH4V');
      assert.equal(await page.locator('.viewer-position').innerText(),'1 / 4');
      await page.keyboard.press('ArrowRight'); await readViewer();assert.equal(await page.locator('.viewer-position').innerText(),'2 / 4');
      await page.keyboard.press('ArrowLeft');await readViewer();assert.equal(await page.locator('.viewer-position').innerText(),'1 / 4');
      for(let i=0;i<9;i++){await page.keyboard.press('Tab'); assert.ok(await page.evaluate(()=>!!document.activeElement.closest('.image-viewer')));}
      await page.locator('.viewer-zoom').click();assert.equal(await page.locator('.viewer-zoom').getAttribute('aria-pressed'),'true');
      assert.ok(await page.locator('.viewer-stage').evaluate(el=>el.scrollWidth>el.clientWidth || el.scrollHeight>el.clientHeight));
      await page.locator('.viewer-stage').focus();await page.keyboard.press('ArrowDown');
      await page.locator('.viewer-zoom').click();assert.equal(await page.locator('.viewer-zoom').getAttribute('aria-pressed'),'false');
      await axeCheck(`${width} certificate viewer`);
      await page.screenshot({path:`.tmp/screenshots/${width}-certificate-viewer.png`});
      await page.keyboard.press('Escape');assert.equal(await page.locator('.image-viewer').isVisible(),false);assert.ok(await opener.evaluate(el=>el===document.activeElement));
      assert.equal(await page.locator('.viewer-image').count(),0);
      await opener.click();await readViewer();await page.locator('.viewer-close').click();assert.ok(await opener.evaluate(el=>el===document.activeElement));
    });
  }
  await check('Every faithful preview and owner original delivers the approved bytes',async()=>{
    await open('certificates/');
    const manifest=JSON.parse(await readFile('src/data/public-assets.json','utf8'));
    const links=await page.locator('[data-credential]').evaluateAll(cards=>cards.map(card=>({slug:card.id,href:card.querySelector('[data-image-viewer]').href,original:card.querySelector('[data-credential-original]').href})));
    assert.equal(links.length,credentialTotal);
    for(const item of links){const record=manifest.certificates.find(record=>record.slug===item.slug);for(const [href,expected] of [[item.href,record.sha256],[item.original,record.original.sha256]]){const response=await context.request.get(href);assert.equal(response.status(),200);const bytes=await response.body();assert.equal(createHash('sha256').update(bytes).digest('hex'),expected);if(href===item.original){assert.equal(bytes.length,record.original.byteLength);if(record.original.format==='pdf')assert.equal(bytes.subarray(0,5).toString(),'%PDF-');}}}
  });
  await check('Project diagram viewer has captions, full-size reading and focus restoration',async()=>{
    await open('projects/range-extended-electric-vehicle/');
    const opener=page.locator('[data-image-viewer]').nth(1);await opener.click();await readViewer();
    assert.match(await page.locator('#viewer-caption').innerText(),/series|architecture|engine/i);
    await page.locator('.viewer-next').click();await readViewer();
    assert.equal(await page.locator('.viewer-position').innerText(),'3 / 3');
    await page.keyboard.press('Escape');assert.ok(await opener.evaluate(el=>el===document.activeElement));
  });
  await check('Reviewed PDF download is reachable from About and Contact',async()=>{
    const manifest=JSON.parse(await readFile('src/data/public-assets.json','utf8'));
    for(const path of ['about/','contact/']){await open(path);const link=page.locator('main').getByRole('link',{name:/Download CV/});assert.ok(await link.isVisible());const response=await context.request.get(new URL(await link.getAttribute('href'),base).href);assert.equal(response.status(),200);const bytes=await response.body();assert.ok(bytes.subarray(0,5).toString()==='%PDF-');assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.resume.sha256);assert.equal(bytes.length,manifest.resume.byteLength);}
  });
  const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:1000}});const fallback=await noJs.newPage();
  await check('No-JavaScript direct navigation and certificate originals remain usable',async()=>{
    await fallback.goto(url('certificates/'),{waitUntil:'networkidle'});assert.equal(await fallback.locator('[data-credential]:visible').count(),credentialTotal);assert.equal(await fallback.locator('#certificate-filters').isVisible(),false);assert.equal(await fallback.locator('[data-image-viewer]').count(),credentialTotal);assert.equal(await fallback.locator('[data-credential-original]').count(),credentialTotal);
    await fallback.locator('#primary-nav').getByRole('link',{name:'Education',exact:true}).click();await fallback.waitForURL(url('education/'));assert.equal(await fallback.locator('h1').count(),1);
    await fallback.goto(url('projects/range-extended-electric-vehicle/'));assert.equal(await fallback.locator('[data-image-viewer]').count(),3);const href=await fallback.locator('[data-image-viewer]').nth(1).getAttribute('href');assert.equal((await noJs.request.get(new URL(href,base).href)).status(),200);
  });await noJs.close();
  await check('No interaction script errors occurred',async()=>assert.deepEqual(results.errors,[]));
} finally {await context.close();await browser.close();await writeFile('.tmp/phase2-browser-report.json',JSON.stringify(results,null,2)+'\n');}
const failures=results.checks.filter(c=>!c.passed);console.log(`Phase 2 browser checks: ${results.checks.length-failures.length} passed, ${failures.length} failed.`);if(failures.length)process.exitCode=1;
