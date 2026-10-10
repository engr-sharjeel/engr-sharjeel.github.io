import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const base = (process.env.PORTFOLIO_BASE || '/').replace(/\/+$/, '');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]))).flat();
}
const files = await walk(root);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const projects = await Promise.all((await readdir('src/content/projects')).filter(f => f.endsWith('.json')).map(async f => JSON.parse(await readFile(`src/content/projects/${f}`, 'utf8'))));
const routes = ['index.html','projects/index.html','experience/index.html','research/index.html','achievements/index.html','about/index.html','contact/index.html','404.html',...projects.map(p => `projects/${p.slug}/index.html`)];
for (const route of routes) assert.ok(files.includes(path.join(root, route)), `Missing route: ${route}`);
assert.equal(htmlFiles.length, routes.length, 'Unexpected generated route inventory');
const failures = [];
let references = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Exactly one h1: ${file}`);
  assert.match(html, /<title>[^<]+<\/title>/, `Missing title: ${file}`);
  assert.match(html, /name="description"/, `Missing description: ${file}`);
  assert.ok(!/Everything\/|LinkedIn projects\/|evidenceNotes|provenance|\.pdf(?:"|<)/.test(html), `Internal evidence leaked: ${file}`);
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
for (const file of files) assert.ok(!/\.(pdf|docx|pptx|zip|rar)$/i.test(file), `Private document in output: ${file}`);
assert.deepEqual(failures, [], failures.join('\n'));
console.log(`Output verified: ${htmlFiles.length} HTML routes, ${references} local page/asset references, image dimensions/alt, metadata, and public-asset boundary. Base: ${base || '/'}.`);
