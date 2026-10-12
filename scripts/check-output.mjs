import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';
import sharp from 'sharp';

// The same boundary checks can inspect a downloaded Pages artifact read-only.
const root = path.resolve(process.env.PORTFOLIO_OUTPUT_DIR || 'dist');
const base = (process.env.PORTFOLIO_BASE || '/').replace(/\/+$/, '');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]))).flat();
}
const files = await walk(root);
const reviewed = JSON.parse(await readFile('src/data/public-assets.json', 'utf8'));
assert.equal(reviewed.version, 2, 'Explicit original-publication manifest version required');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const allowedOriginals = new Map([reviewed.resume, ...reviewed.certificates.map(record => record.original)].map(record => [record.path, record]));
assert.equal(allowedOriginals.size, reviewed.certificates.length + 1, 'Duplicate public original paths');

// The reviewed PDFs use ordinary page dictionaries, with one supplied report
// storing them inside a Flate-compressed object stream. Decode object streams
// for page-count checks; images/content streams are never interpreted as pages.
function pdfPageCount(bytes) {
  const raw = bytes.toString('latin1');
  assert.ok(raw.startsWith('%PDF-'), 'Published PDF must have a PDF header');
  let pageObjects = raw;
  for (const match of raw.matchAll(/\d+\s+\d+\s+obj\b((?:(?!\bendobj\b)[\s\S])*?)stream\r?\n/g)) {
    const dictionary = match[1];
    if (!/\/Type\s*\/ObjStm\b/.test(dictionary)) continue;
    assert.match(dictionary, /\/FlateDecode\b/, 'Unsupported reviewed PDF object-stream encoding');
    const length = Number(dictionary.match(/\/Length\s+(\d+)\s*(?:\/|>>)/)?.[1]);
    assert.ok(Number.isInteger(length) && length > 0, 'Object stream requires an explicit length');
    const start = match.index + match[0].length;
    pageObjects += '\n' + inflateSync(bytes.subarray(start, start + length)).toString('latin1');
  }
  return (pageObjects.match(/\/Type\s*\/Page\b/g) || []).length;
}

function checkOrientationDerivative(bytes, record) {
  const correction = record.orientationCorrection;
  assert.equal(record.path, 'credentials/iesco-internship-2025/original.pdf', 'Only the approved IESCO rotation derivative is allowed');
  assert.equal(correction.sourcePageRotationDegrees, 90);
  assert.equal(correction.publishedPageRotationDegrees, 0);
  assert.equal(correction.clockwiseDegrees, 270);
  assert.notEqual(correction.sourceSha256, record.sha256, 'An orientation derivative must retain separate source and publication hashes');
  const raw = bytes.toString('latin1');
  const objects = [...raw.matchAll(/\d+\s+\d+\s+obj\b([\s\S]*?)endobj/g)];
  const page = objects.find(match => /\/Type\s*\/Page\b/.test(match[1]));
  assert.ok(page, 'Upright PDF requires a page dictionary');
  assert.match(page[1], /\/Rotate\s+0\b/, 'Upright PDF must have zero page rotation');
  assert.match(page[1], /\/MediaBox\s*\[\s*0\s+0\s+842\s+595\s*\]/, 'Complete landscape page must retain its source dimensions');
  const streamHashes = [];
  for (const match of objects) {
    const stream = /stream\r?\n/.exec(match[1]);
    if (!stream) continue;
    const dictionary = match[1].slice(0, stream.index);
    const length = Number(dictionary.match(/\/Length\s+(\d+)\b/)?.[1]);
    assert.ok(length > 0, 'Reviewed PDF streams must have explicit lengths');
    const headerLength = match[0].indexOf(match[1]);
    const start = match.index + headerLength + stream.index + stream[0].length;
    streamHashes.push(hash(bytes.subarray(start, start + length)));
  }
  assert.equal(correction.pageContentRawSha256.length, 1);
  assert.equal(correction.embeddedImageRawSha256.length, 22);
  for (const digest of [...correction.pageContentRawSha256, ...correction.embeddedImageRawSha256]) assert.ok(streamHashes.includes(digest), 'Orientation-only PDF must preserve each reviewed content/image stream');
}

for (const [relative, record] of allowedOriginals) {
  assert.ok(!relative.startsWith('/') && !relative.split('/').includes('..'), 'Original path must stay within public output');
  const source = await readFile(path.join('public', relative));
  const delivered = await readFile(path.join(root, relative));
  assert.equal(hash(source), record.sha256, `Approved original changed: ${relative}`);
  assert.equal(hash(delivered), record.sha256, `Delivered original differs: ${relative}`);
  assert.equal(source.length, record.byteLength, `Original byte length: ${relative}`);
  if (record.format === 'pdf') {
    assert.equal(pdfPageCount(source), record.pageCount, `Original PDF page count: ${relative}`);
    if (record.orientationCorrection) checkOrientationDerivative(source, record);
  } else {
    const metadata = await sharp(source).metadata();
    assert.equal(metadata.width, record.width, `Original width: ${relative}`);
    assert.equal(metadata.height, record.height, `Original height: ${relative}`);
  }
}

const previewNames = new Set(reviewed.certificates.map(record => record.filename));
assert.deepEqual(new Set(await readdir('src/assets/certificates')), previewNames, 'Only approved faithful credential previews belong in the application');
for (const record of reviewed.certificates) {
  const source = await readFile(`src/assets/certificates/${record.filename}`);
  assert.equal(hash(source), record.sha256, `Faithful preview changed: ${record.filename}`);
  const metadata = await sharp(source).metadata();
  assert.equal(metadata.width, record.width, `Preview width: ${record.filename}`);
  assert.equal(metadata.height, record.height, `Preview height: ${record.filename}`);
  const extension = path.extname(record.filename);
  const stem = path.basename(record.filename, extension);
  const delivered = files.find(file => path.basename(file).startsWith(`${stem}.`) && file.endsWith(extension));
  assert.ok(delivered, `Full-resolution faithful preview missing: ${record.filename}`);
  assert.equal(hash(await readFile(delivered)), record.sha256, 'Delivered full-resolution preview must preserve its approved bytes');
}
for (const record of reviewed.approvedImages) {
  const source = await readFile(record.path);
  assert.equal(hash(source), record.sha256, `Owner image original changed: ${record.path}`);
  const metadata = await sharp(source).metadata();
  assert.equal(metadata.width, record.width, `Owner image width: ${record.path}`);
  assert.equal(metadata.height, record.height, `Owner image height: ${record.path}`);
  const extension = path.extname(record.path);
  const stem = path.basename(record.path, extension);
  const originals = files.filter(file => path.basename(file).startsWith(`${stem}.`) && file.endsWith(extension));
  assert.equal(originals.length, 1, `One current owner image original required: ${record.path}`);
  assert.equal(hash(await readFile(originals[0])), record.sha256, `Delivered owner image differs: ${record.path}`);
}
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
  assert.doesNotMatch(html, /two[\s-]seater|class="monogram"|MS \/ Electrical/i, `Obsolete owner scope/branding: ${file}`);
  assert.ok(html.includes('name="color-scheme" content="dark"'), `Reference dark color scheme required: ${file}`);
  assert.ok(!/Everything\/|LinkedIn projects\/|Profile Picture\/|Power china internship\/|evidenceNotes|provenance|STUDENT_PORTAL|Certificates\.zip/.test(html), `Internal evidence leaked: ${file}`);
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
  if (file.toLowerCase().endsWith('.pdf')) assert.ok(allowedOriginals.get(relative)?.format === 'pdf', `PDF is not an approved owner original: ${relative}`);
  if (relative.startsWith('credentials/') || relative.startsWith('downloads/')) assert.ok(allowedOriginals.has(relative), `Unapproved public document: ${relative}`);
  if (/^(?:Everything|LinkedIn projects|Certificates|CV|IESCO|Power china internship|Profile Picture)\//i.test(relative)) assert.equal(relative, 'certificates/index.html', `Raw source tree in output: ${relative}`);
  assert.ok(!/-public\.[^.]+\.(?:png|webp)$/i.test(relative), `Obsolete masked credential delivered: ${relative}`);
}
assert.deepEqual(failures, [], failures.join('\n'));
console.log(`Output verified: ${htmlFiles.length} HTML routes, ${references} local page/asset references, image dimensions/alt, metadata, and public-asset boundary. Base: ${base || '/'}.`);
