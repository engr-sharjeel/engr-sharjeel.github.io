import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import { chromium } from 'playwright-core';

// Read the same public typed records used by Astro. Asset imports are omitted
// because this text-only resume does not embed photographs or source documents.
const portfolioRoot = process.cwd();
const dataDirectory = path.resolve(portfolioRoot, 'src/data');
const assetDirectory = path.resolve(portfolioRoot, 'src/assets');
const loaded = new Map();
function loadData(filename) {
  const resolved = path.resolve(filename);
  if (!resolved.startsWith(dataDirectory + path.sep)) throw new Error('Resume data must be inside src/data.');
  if (loaded.has(resolved)) return loaded.get(resolved);
  const source = readFileSync(resolved, 'utf8');
  const compiled = transpileModule(source, { compilerOptions: { module: ModuleKind.CommonJS, target: ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  loaded.set(resolved, module.exports);
  const requirePublicRecord = (specifier) => {
    if (!specifier.startsWith('.')) throw new Error(`Unexpected dependency in resume data: ${specifier}`);
    const dependency = path.resolve(path.dirname(resolved), specifier);
    if (dependency.startsWith(assetDirectory + path.sep) && /\.(png|jpe?g|webp|svg)$/i.test(dependency)) return {};
    return loadData(dependency.endsWith('.ts') ? dependency : dependency + '.ts');
  };
  vm.runInNewContext(compiled, { module, exports: module.exports, require: requirePublicRecord }, { filename: resolved });
  return module.exports;
}

const { site, featuredProjects } = loadData(path.join(dataDirectory, 'site.ts'));
const { education, earlierEducation } = loadData(path.join(dataDirectory, 'education.ts'));
const { experience } = loadData(path.join(dataDirectory, 'experience.ts'));
const { research } = loadData(path.join(dataDirectory, 'research.ts'));
const { skillGroups } = loadData(path.join(dataDirectory, 'skills.ts'));
const { certificates } = loadData(path.join(dataDirectory, 'certificates.ts'));
const projects = await Promise.all(featuredProjects.map(async slug => JSON.parse(await readFile(path.join('src/content/projects', slug + '.json'), 'utf8'))));
const astroConfig = await readFile('astro.config.mjs', 'utf8');
const website = astroConfig.match(/site:\s*['"]([^'"]+)['"]/)?.[1];
if (!website) throw new Error('The production website URL is missing from Astro configuration.');
const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const displayUrl = url => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const list = values => values.map(value => escape(value)).join(' · ');
const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(site.name)} — Public CV</title><style>
@page { size: A4; }
* { box-sizing: border-box; }
body { margin: 0; color: #142033; font-family: Arial, 'Segoe UI', sans-serif; font-size: 10pt; line-height: 1.38; }
h1, h2, h3, p { margin: 0; }
h1 { font-size: 27pt; line-height: 1.15; letter-spacing: -.6pt; }
h2 { text-transform: uppercase; letter-spacing: 1.2pt; font-size: 9pt; color: #236858; border-bottom: 1px solid #c5cfcb; padding-bottom: 5pt; margin: 12pt 0 8pt; }
h3 { font-size: 10.4pt; line-height: 1.4; }
p { color: #40505d; }
a { color: #205e50; text-decoration: none; }
.role { color: #205e50; font-size: 11pt; margin-top: 6pt; }
.contact { display: flex; flex-wrap: wrap; column-gap: 14pt; row-gap: 4pt; font-size: 8.8pt; margin-top: 10pt; }
.profile { margin-top: 10pt; font-size: 9.5pt; max-width: 95%; }
.record { margin-bottom: 8pt; break-inside: avoid; }
.record p { margin-top: 4pt; }
.meta { color: #586876; font-size: 8.8pt; }
.heading-row { display: flex; align-items: baseline; justify-content: space-between; gap: 14pt; }
.heading-row .meta { text-align: right; flex-shrink: 0; }
.projects { display: grid; grid-template-columns: 1fr 1fr; gap: 12pt 18pt; }
.project { break-inside: avoid; }
.project p { margin-top: 4pt; font-size: 9.3pt; }
.project .meta { margin-top: 5pt; font-size: 8.4pt; }
.page-two { break-before: page; }
.continued { display: flex; justify-content: space-between; border-bottom: 1px solid #c5cfcb; padding-bottom: 8pt; align-items: baseline; }
.continued h1 { font-size: 16pt; }
.continued p { font-size: 8.8pt; }
.research p { font-size: 9.3pt; }
.credentials { display: grid; grid-template-columns: 1fr 1fr; gap: 9pt 18pt; }
.credential { break-inside: avoid; }
.credential h3 { font-size: 9.2pt; }
.credential p { font-size: 8.7pt; margin-top: 3pt; }
.skills .record { margin-bottom: 7pt; }
.skills p { font-size: 9.3pt; }
.note { font-size: 8.5pt; margin-top: 12pt; }
</style></head><body>
<section class="resume-page">
<header><h1>${escape(site.name)}</h1><p class="role">${escape(site.role)}</p><div class="contact"><span>${escape(site.location)}</span>${link('mailto:' + site.email, site.email)}${link(website, displayUrl(website))}${link(site.linkedin, displayUrl(site.linkedin))}${link(site.github, displayUrl(site.github))}</div><p class="profile">Power systems, embedded control and electric mobility, developed through undergraduate design studies, practical prototypes and industry learning.</p></header>
<h2>Education</h2><article class="record"><div class="heading-row"><h3>${escape(education.program)} — ${escape(education.institution)}</h3><span class="meta">${escape(education.period)}</span></div><p>${escape(education.level)} · ${escape(education.status)} · Current reported CGPA ${escape(education.cgpa)}/${escape(education.gpaScale)} (${escape(education.reportTerm)} report snapshot).</p><p class="meta">${escape(earlierEducation.program)}, ${escape(earlierEducation.institution)}, ${escape(earlierEducation.location)} · ${escape(earlierEducation.period)}.</p></article>
<h2>Internship experience</h2>${experience.map(record => `<article class="record"><div class="heading-row"><h3>${escape(record.organization)}</h3><span class="meta">${escape(record.period)}</span></div><p class="meta">${escape(record.role)}</p><p>${escape(record.summary)}</p><p>${record.activities.slice(0, 1).map(escape).join(' ')}</p></article>`).join('')}
<h2>Selected academic projects</h2><div class="projects">${projects.map(project => `<article class="project"><h3>${link(website + '/projects/' + project.slug + '/', project.title)}</h3><p class="meta">${escape(project.status)} · ${escape(project.category)}</p><p>${escape(project.summary)}</p></article>`).join('')}</div>
</section>
<section class="resume-page page-two"><header class="continued"><h1>${escape(site.name)}</h1><p>Research, engineering skills & additional learning</p></header>
<h2>Research and writing</h2><div class="research">${research.map(record => `<article class="record"><h3>${escape(record.title)}</h3><p class="meta">${escape(record.status)}${record.year ? ' · ' + escape(record.year) : ''}${record.publication ? ' · ' + escape(record.publication) : ''}</p>${record.authors?.length ? `<p class="meta">${list(record.authors)}</p>` : ''}<p>${escape(record.summary)}</p>${record.status === 'Published paper' && record.link ? `<p class="meta">${link(record.link.url, record.link.url)}</p>` : ''}</article>`).join('')}</div>
<h2>Engineering skills and tools</h2><div class="skills">${skillGroups.map(group => `<article class="record"><h3>${escape(group.title)}</h3><p>${list(group.items)}</p></article>`).join('')}</div>
<h2>Relevant course completion</h2><div class="credentials">${certificates.filter(record => record.category === 'Courses').map(record => `<article class="credential"><h3>${escape(record.title)}</h3><p>${escape(record.issuer)}${record.platform ? ' via ' + escape(record.platform) : ''} · ${escape(record.dateLabel)}</p></article>`).join('')}</div>
<h2>Academic and organisational recognition</h2><div class="credentials">${certificates.filter(record => ['Academic Commendations', 'Organisational Recognition'].includes(record.category)).map(record => `<article class="credential"><h3>${escape(record.title)}</h3></article>`).join('')}</div>
<p class="note">Project outcomes are academic work. REEV is at FYP-1 complete; hydro generation and payback figures are design estimates. Course certificates record completion and do not confer professional licensure. Full project and credential context: ${link(website, displayUrl(website))}.</p>
</section></body></html>`;

await mkdir('.tmp/resume', { recursive: true });
await mkdir('public/downloads', { recursive: true });
await writeFile('.tmp/resume/public-resume.html', html);
const chromePath = process.env.PORTFOLIO_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
if (!existsSync(chromePath)) throw new Error('Set PORTFOLIO_CHROME to an installed Chrome/Chromium executable before generating the CV.');
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: 'public/downloads/muhammad-sharjeel-cv.pdf', format: 'A4', printBackground: true,
    margin: { top: '14mm', right: '15mm', bottom: '16mm', left: '15mm' },
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: `<div style="font-family:Arial,sans-serif;font-size:8px;color:#586876;width:100%;padding:0 15mm;display:flex;justify-content:space-between"><span>${escape(site.name)} · Public CV</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  });
  console.log('Generated public/downloads/muhammad-sharjeel-cv.pdf from canonical public data. Review its text and printed layout before publishing.');
} finally { await browser.close(); }
