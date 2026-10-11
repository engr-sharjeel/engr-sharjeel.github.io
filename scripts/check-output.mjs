import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const root = path.resolve('dist');
const base = (process.env.PORTFOLIO_BASE || '/').replace(/\/+$/, '');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]))).flat();
}
const files = await walk(root);
const reviewed = JSON.parse(await readFile('src/data/public-assets.json', 'utf8'));
for (const record of reviewed.certificates) {
  const source = await readFile(`src/assets/certificates/${record.filename}`);
  assert.equal(createHash('sha256').update(source).digest('hex'), record.sha256, `Certificate changed since privacy review: ${record.filename}`);
  const delivered = files.find(file => path.basename(file).startsWith(record.filename.replace('.png', '.') ) && file.endsWith('.png'));
  assert.ok(delivered, `Reviewed original missing: ${record.filename}`);
  assert.equal(createHash('sha256').update(await readFile(delivered)).digest('hex'), record.sha256, 'Delivered certificate must match reviewed public original');
}
assert.equal(createHash('sha256').update(await readFile(path.join(root, reviewed.resume.path))).digest('hex'), reviewed.resume.sha256, 'Resume changed since privacy/layout review');
const htmlFiles = files.filter(file => file.endsWith('.html'));
const projects = await Promise.all((await readdir('src/content/projects')).filter(f => f.endsWith('.json')).map(async f => JSON.parse(await readFile(`src/content/projects/${f}`, 'utf8'))));
const routes = ['index.html','projects/index.html','experience/index.html','research/index.html','achievements/index.html','education/index.html','certificates/index.html','about/index.html','contact/index.html','404.html',...projects.map(p => `projects/${p.slug}/index.html`)];
for (const route of routes) assert.ok(files.includes(path.join(root, route)), `Missing route: ${route}`);
assert.equal(htmlFiles.length, routes.length, 'Unexpected generated route inventory');
const failures = [];
let references = 0;
const titles = new Set();
const descriptions = new Set();
const production = 'https://engr-sharjeel.github.io';
const sitemap = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${production}${base}/sitemap-index.xml`), 'Incorrect robots sitemap URL');
assert.ok(!sitemap.includes('404.html'), '404 must be excluded from sitemap');
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length - 1, 'Sitemap route inventory');
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Exactly one h1: ${file}`);
  assert.match(html, /<title>[^<]+<\/title>/, `Missing title: ${file}`);
  assert.match(html, /name="description"/, `Missing description: ${file}`);
  assert.ok(!/Everything\/|LinkedIn projects\/|evidenceNotes|provenance|STUDENT_PORTAL|Certificates\.zip/.test(html), `Internal evidence leaked: ${file}`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(!titles.has(title), `Duplicate title: ${file}`); titles.add(title);
  assert.ok(!descriptions.has(description), `Duplicate description: ${file}`); descriptions.add(description);
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const pagePath = relative === 'index.html' ? '/' : relative.replace(/index\.html$/, '');
  const canonical = `${production}${base}/${pagePath.replace(/^\/+/, '')}`;
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `Incorrect canonical: ${file}`);
  if (relative !== '404.html') assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `Route absent from sitemap: ${file}`);
  for (const field of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) assert.ok(html.includes(`property="${field}"`), `Missing ${field}: ${file}`);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), 'Missing social card');
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(image?.startsWith(`${production}${base}/social/`), `Incorrect share image URL: ${file}`);
  await stat(path.join(root, new URL(image).pathname.slice(base.length)));
  const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || 'null');
  assert.equal(jsonLd?.['@context'], 'https://schema.org', 'Invalid JSON-LD');
  if (relative === '404.html') assert.ok(html.includes('content="noindex, follow"'), '404 index policy');
  for (const match of html.matchAll(/\b(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = match[1].split('#')[0].split('?')[0];
    if (/^[a-z][a-z\d+.-]*:|^\/\//i.test(url)) continue;
    references++;
    if (base && url.startsWith('/') && !(url === base || url.startsWith(`${base}/`))) { failures.push(`${path.relative(root,file)}: outside base ${url}`); continue; }
    const local = url.startsWith('/') ? path.join(root, decodeURIComponent(url.slice(base.length))) : path.resolve(path.dirname(file), decodeURIComponent(url));
    if (!local.startsWith(root)) { failures.push(`Outside output: ${url}`); continue; }
    try { const info = await stat(local); if (info.isDirectory()) await stat(path.join(local,'index.html')); } catch { failures.push(`${path.relative(root,file)}: missing ${url}`); }
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) { assert.match(match[0], /\bwidth="\d+"/, 'Image width missing'); assert.match(match[0], /\bheight="\d+"/, 'Image height missing'); assert.match(match[0], /\balt="[^"]+"/, 'Image alt missing'); }
}
for (const file of files) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  assert.ok(!/\.(docx|pptx|zip|rar)$/i.test(file), `Private document in output: ${file}`);
  if (file.endsWith('.pdf')) assert.equal(relative, 'downloads/muhammad-sharjeel-cv.pdf', 'Only the reviewed public resume may be delivered');
}
assert.deepEqual(failures, [], failures.join('\n'));
console.log(`Output verified: ${htmlFiles.length} HTML routes, ${references} local page/asset references, image dimensions/alt, metadata, and public-asset boundary. Base: ${base || '/'}.`);
