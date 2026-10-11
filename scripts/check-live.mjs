import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const origin = new URL(process.env.PORTFOLIO_LIVE_URL || 'https://engr-sharjeel.github.io/');
const report = {origin:origin.href,checked:new Date().toISOString(),pages:[],shareImages:0};
async function walk(directory){return (await Promise.all((await readdir(directory,{withFileTypes:true})).map(entry=>entry.isDirectory()?walk(path.join(directory,entry.name)):[path.join(directory,entry.name)]))).flat();}
const pages=(await walk('dist')).filter(file=>file.endsWith('.html'));
async function get(relative){const response=await fetch(new URL(relative,origin),{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});return response;}
// A small concurrent batch verifies the actual public documents, not source files.
for(let index=0;index<pages.length;index+=4) await Promise.all(pages.slice(index,index+4).map(async file=>{
  const relative=path.relative('dist',file).replaceAll(path.sep,'/');
  const route=relative==='index.html'?'':relative.replace(/index\.html$/,'');
  const response=await get(route);assert.equal(response.status,200,`Live page ${route}`);
  const html=await response.text(),local=await readFile(file,'utf8');
  const title=local.match(/<title>([^<]+)<\/title>/)[1];assert.ok(html.includes(`<title>${title}</title>`),`Live content differs: ${route}`);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);
  const canonical=local.match(/rel="canonical" href="([^"]+)"/)[1];assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
  const image=html.match(/property="og:image" content="([^"]+)"/)[1];const imageResponse=await fetch(image,{signal:AbortSignal.timeout(20000)});assert.equal(imageResponse.status,200);assert.match(imageResponse.headers.get('content-type'),/image\/png/);report.shareImages++;
  assert.ok(!/STUDENT_PORTAL|Everything\/|evidenceNotes|provenance/.test(html));
  report.pages.push({route:route||'/',status:response.status,title});
}));
const robots=await get('robots.txt');assert.equal(robots.status,200);assert.ok((await robots.text()).includes(`${origin.href}sitemap-index.xml`));
for(const filename of ['sitemap-index.xml','sitemap-0.xml']){const response=await get(filename);assert.equal(response.status,200);const text=await response.text();assert.ok(!text.includes('404.html'));if(filename==='sitemap-0.xml')assert.equal((text.match(/<loc>/g)||[]).length,pages.length-1);}
const missing=await get('phase2-route-that-does-not-exist/');assert.equal(missing.status,404);assert.ok((await missing.text()).includes('A different'));
await writeFile('.tmp/live-report.json',JSON.stringify(report,null,2)+'\n');
console.log(`Live verified: ${report.pages.length} intended pages, ${report.shareImages} social image references, canonical URLs, sitemap/robots and custom 404.`);
