import { readFile, readdir, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import ts from 'typescript';
import vm from 'node:vm';

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
assert.equal(records.length, 19, 'The supported inventory contains nineteen projects');
assert.equal(records.filter(p => p.group === 'showcase').length, 6, 'Six supported showcases required');
assert.equal(records.filter(p => p.group === 'academic').length, 13, 'Thirteen concise academic entries required');
const priorityText = await readFile('src/lib/project-priority.ts', 'utf8');
const priorityArray = priorityText.split('export const projectPriority = [')[1]?.split('] as const')[0];
assert.ok(priorityArray, 'Explicit project priority required');
const priorities = [...priorityArray.matchAll(/'([a-z0-9-]+)'/g)].map(match => match[1]);
assert.equal(new Set(priorities).size, records.length, 'Priority must contain every project exactly once');
assert.deepEqual([...priorities].sort(), records.map(record => record.slug).sort(), 'Priority must match the supported inventory');
assert.equal(priorities[0], 'range-extended-electric-vehicle', 'The FYP leads the catalogue');
assert.ok(priorities.slice(0, 6).every(slug => records.find(record => record.slug === slug)?.group === 'showcase'), 'Showcases precede concise academic work');
for (const { provenance, evidenceNotes, ...publicContent } of records) {
  assert.ok(!/two[\s-]seater/i.test(JSON.stringify(publicContent)), 'Public project content must use the corrected REEV scope');
  assert.ok(!Object.hasOwn(publicContent, 'featuredOrder'), 'Use the shared priority instead of competing per-project ranks');
}
const siteText = await readFile('src/data/site.ts', 'utf8');
assert.match(siteText, /export const featuredProjects = projectPriority\.slice\(0, 4\)/, 'Homepage selections must derive from the canonical priority');
const featured = priorities.slice(0, 4);
assert.equal(featured.length, 4, 'Exactly four homepage selections required');
assert.equal(new Set(featured).size, 4, 'Homepage selections must be distinct');
assert.deepEqual(featured, ['range-extended-electric-vehicle', 'micro-hydropower-plant', 'autonomous-navigation-robot', 'center-tapped-transformer'], 'Homepage and catalogue follow the owner-selected order');
assert.ok(featured.includes('range-extended-electric-vehicle'), 'Homepage must contain the flagship');
featured.forEach(slug => assert.ok(records.some(p => p.slug === slug), `Missing selected project: ${slug}`));
const serviceModule = { exports: {} };
vm.runInNewContext(ts.transpile(await readFile('src/data/services.ts', 'utf8'), { module: ts.ModuleKind.CommonJS }), { module: serviceModule, exports: serviceModule.exports });
const { services } = serviceModule.exports;
assert.equal(services.length, 6, 'Six evidence-grounded service definitions');
assert.equal(new Set(services.map(service => service.id)).size, services.length, 'Service IDs must be unique');
for (const service of services) {
  assert.match(service.id, /^[a-z][a-z0-9-]+$/);
  assert.ok(service.title && service.support && service.deliverables.length && service.examples.length, 'Complete service definition required');
  for (const example of service.examples) assert.ok(records.some(project => project.slug === example.slug), `Unsupported service example: ${example.slug}`);
}
console.log(`Content verified: ${records.length} projects, ${records.filter(p => p.group === 'showcase').length} showcases, ${records.filter(p => p.group === 'academic').length} academic entries, 4 selections, ${services.length} supported services.`);
