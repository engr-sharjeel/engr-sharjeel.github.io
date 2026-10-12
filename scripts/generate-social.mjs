import { readFile, readdir, mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import ts from 'typescript';
import vm from 'node:vm';
const priorityModule = { exports: {} };
vm.runInNewContext(ts.transpile(await readFile('src/lib/project-priority.ts', 'utf8'), { module: ts.ModuleKind.CommonJS }), { module: priorityModule, exports: priorityModule.exports });
const siteModule = ts.transpile(await readFile('src/data/site.ts', 'utf8'), { module: ts.ModuleKind.CommonJS });
const module = { exports: {} };
vm.runInNewContext(siteModule, {module, exports: module.exports, require: specifier => {
  if (/^\.\.\/assets\/.+\.(png|jpe?g|webp|svg)$/i.test(specifier)) return {};
  if (specifier === '../lib/project-priority') return priorityModule.exports;
  throw new Error(`Unexpected site configuration dependency: ${specifier}`);
}});
const { site } = module.exports;
const pages = JSON.parse(await readFile('src/data/page-meta.json', 'utf8'));
for (const filename of await readdir('src/content/projects')) {
  if (!filename.endsWith('.json')) continue;
  const project = JSON.parse(await readFile(`src/content/projects/${filename}`, 'utf8'));
  pages[project.slug] = {title: project.title, label: `${project.category} · ${project.status}`};
}
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
const wrap = (value, max) => {
  const lines = [''];
  for (const word of value.split(/\s+/)) {
    const last = lines.length - 1;
    if (lines[last] && `${lines[last]} ${word}`.length > max) lines.push(word);
    else lines[last] += `${lines[last] ? ' ' : ''}${word}`;
  }
  return lines;
};
await mkdir('public/social', {recursive: true});
for (const [key, page] of Object.entries(pages)) {
  const lines = wrap(page.title, 34);
  const fontSize = lines.length > 3 ? 48 : 60;
  const title = lines.map((line, index) => `<tspan x="76" dy="${index ? fontSize + 10 : 0}">${escape(line)}</tspan>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0B1220"/><path d="M76 118H1124M76 514H1124" stroke="#344255"/><rect x="1050" y="32" width="74" height="64" rx="8" fill="#142033"/><path d="m1091 43-18 25h14l-4 18 20-28h-15z" fill="#55CDB5"/><text x="76" y="78" fill="#55CDB5" font-family="Arial,sans-serif" font-size="23" letter-spacing="2">${escape(site.name.toUpperCase())}</text><text x="76" y="220" fill="#F4F5F2" font-family="Arial,sans-serif" font-size="${fontSize}" font-weight="700">${title}</text><text x="76" y="469" fill="#AAB6C5" font-family="Arial,sans-serif" font-size="23">${escape(page.label)}</text><text x="76" y="560" fill="#AAB6C5" font-family="Arial,sans-serif" font-size="21">${escape(site.program)} · In progress</text><text x="76" y="597" fill="#AAB6C5" font-family="Arial,sans-serif" font-size="19">${escape(site.university)}</text><text x="1124" y="565" text-anchor="end" fill="#55CDB5" font-family="Arial,sans-serif" font-size="21">engr-sharjeel.github.io</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`public/social/${key}.png`);
}
console.log(`Generated ${Object.keys(pages).length} local social images from public titles and site configuration.`);
