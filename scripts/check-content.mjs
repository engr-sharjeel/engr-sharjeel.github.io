import { readFile, readdir, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

const directory = 'src/content/projects';
const records = await Promise.all((await readdir(directory)).filter(name => name.endsWith('.json')).map(async name => {
  const record = JSON.parse(await readFile(path.join(directory, name), 'utf8'));
  assert.equal(name, `${record.slug}.json`, `Slug and filename must match: ${name}`);
  for (const image of record.images || []) {
    const file = path.resolve(directory, image.src);
    assert.ok(file.startsWith(path.resolve('src/assets/projects') + path.sep), `Uncurated project image: ${image.src}`);
    assert.ok((await stat(file)).isFile(), `Missing image: ${image.src}`);
  }
  return record;
}));
assert.equal(new Set(records.map(p => p.slug)).size, records.length, 'Unique project slugs required');
assert.equal(records.filter(p => p.flagship).length, 1, 'Exactly one flagship required');
assert.equal(records.find(p => p.flagship)?.slug, 'range-extended-electric-vehicle');
const siteText = await readFile('src/data/site.ts', 'utf8');
const selection = siteText.split('export const featuredProjects = [')[1]?.split(']')[0];
assert.ok(selection, 'Featured-project configuration missing');
const featured = [...selection.matchAll(/'([a-z0-9-]+)'/g)].map(match => match[1]);
assert.equal(featured.length, 4, 'Exactly four homepage selections required');
assert.equal(new Set(featured).size, 4, 'Homepage selections must be distinct');
assert.ok(featured.includes('range-extended-electric-vehicle'), 'Homepage must contain the flagship');
featured.forEach(slug => assert.ok(records.some(p => p.slug === slug), `Missing selected project: ${slug}`));
console.log(`Content verified: ${records.length} projects, ${records.filter(p => p.group === 'showcase').length} showcases, ${records.filter(p => p.group === 'academic').length} academic entries, 4 selections.`);
