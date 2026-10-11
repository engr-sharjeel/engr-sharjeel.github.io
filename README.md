# Muhammad Sharjeel: engineering portfolio

Astro 7.3.8, strict TypeScript, custom cream/emerald CSS and local Manrope generate this static GitHub Pages site. There are 29 HTML pages, 19 projects (six showcases/thirteen concise academic records) and 12 distinct credentials. Owner-selected portrait, original certificates and supplied CV replace the earlier monogram, masked documents and generated CV.

## Run on Windows

Use the committed lockfile and Node 24. Install once when needed with `npm.cmd ci`; PowerShell uses `npm.cmd` to avoid script execution-policy restrictions.

```powershell
Set-Location 'C:\Users\harri\OneDrive\Desktop\portfolio'
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --ignore-lock --host 127.0.0.1 --port 4321
```

Open http://127.0.0.1:4321/ and stop the foreground preview with **Ctrl+C**. Development uses `npm.cmd run dev`. If a corporate CA is installed locally, use `$env:NODE_OPTIONS='--use-system-ca'`; TLS verification remains enabled.

## Edit content and owner settings

- `src/data/site.ts`: identity, exact owner hero brief, program/university, contact phone/email/profiles, supplied portrait/focal point, CV path and four selected projects.
- `src/lib/project-priority.ts`: one explicit nineteen-project editorial order. The catalogue, filtered results and related subsets reuse it. Homepage selections in site.ts are REEV, transformer, micro hydropower and navigation robot; keep four distinct supported slugs including the flagship.
- `src/content/projects/*.json`: schema-validated facts, status, teams, metrics and project images. Keep six substantial showcases and thirteen modest academic records; do not invent measured results or personal responsibilities.
- `src/data/education.ts`: current reported CGPA 3.10/4.00, Fall 2026 snapshot, degree-in-progress status and coursework. Do not average term SGPAs.
- `src/data/certificates.ts`: twelve canonical records, explicit credential order, groups, original links, faithful previews and verification URLs. Achievements reuses recognition records.
- `src/data/experience.ts`: IESCO first, with its new portrait-format photograph first; POWERCHINA follows with three supplied project-context photographs. Image order also controls gallery order.
- `src/data/skills.ts`: six central tools and six central engineering skills, reused on Home/About. PCB design is supported by the supplied CV; SCADA systems is owner-supplied.
- `src/styles/`: cream tokens, shared layout, responsive direct navigation, supporting pages and viewer. `src/lib/image-sizes.ts` must follow actual CSS slots/gutters when layout changes.

## Replace portrait or CV

The current original portrait is `src/assets/profile/muhammad-sharjeel-portrait.png`; site.ts controls the import, alt text and hero focal point. Astro generates small header and larger hero WebP derivatives with explicit dimensions. Keep the source bytes unchanged, inspect face framing at phone/tablet/desktop sizes and update the approved-image hash/dimensions only after reviewing a replacement. Fallback branding uses the name/simple icon, never MS.

The public CV is an unchanged copy of `CV/Muhammad_Sharjeel_ATS_CV (2).pdf`, at `public/downloads/muhammad-sharjeel-cv.pdf`. It has two pages, but interface labels simply identify PDF rather than assuming future page counts. **`generate:resume` is retired and exits without overwriting the supplied PDF.** To replace it, inspect all pages, copy the chosen original bytes, record its actual SHA-256/byte length/page count in `src/data/public-assets.json`, and run checks/build. Do not regenerate its layout or edit owner document text.

The current supplied CV retains historical two-seater wording; current website copy uses the corrected REEV scope. A revised owner PDF can resolve this document-only conflict. See the asset curation note.

## Add an approved certificate

The owner explicitly approved publication of this collection's original documents, including complete signatures, seals, identifiers and printed content. This permission supersedes the earlier masked-preview policy for these selected assets; it does not approve unrelated identity documents, the transcript, payment letters, archives or raw source trees.

Copy an explicitly approved original unchanged to `public/credentials/<slug>/original.<ext>`. Preserve original PDF bytes/all pages. Put a faithful full-content image preview in `src/assets/certificates/`; PDFs use reviewed raster page previews without cropping, masking, colour changes or orientation alteration. Multi-page documents require all preview pages and a complete original PDF action. Responsive delivery preserves aspect ratio and caps candidates at source size.

Add one typed canonical record with original path/format/page count, preview metadata, factual issuer/date/context and any source-supported verification URL. Add each original/preview to the explicit version-2 manifest with hash, dimensions or page count and byte length. Originals and previews are independently validated; originals load only on request. `.gitattributes` prevents PDF/image line-ending conversion. Deduplicate alternate scans, then update `docs/ASSET-CURATION.md` with filenames/decisions rather than extracted private text. Run the build and focused browser suite before publishing.

## Verify and publish

With a stable production preview running in another terminal:

```powershell
$env:PORTFOLIO_TEST_URL='http://127.0.0.1:4321/'
npm.cmd run test:browser
npm.cmd run test:phase2
npm.cmd run test:phase3
```

Do not rebuild `dist` while these production browser checks are running. Tests cover direct navigation, phone/tablet/desktop routes, project order/search/reset, credential categories/search/empty states, portrait/hero/tools/phone, keyboard/no-JavaScript access, viewer focus/Escape/error handling, contrast via axe and original document hashes. Reports/screenshots stay ignored in `.tmp/`.

```powershell
npm.cmd run measure:performance -- --phase=prompt4-after --screenshots --slots
```

The measurement script records three cold mobile samples for Home, Projects, REEV and Certificates under explicit CPU/network throttling. Keep other browser/build work idle during timing. This is local lab evidence, not field Core Web Vitals, field INP or a Lighthouse score. See `docs/PERFORMANCE.md`.

For the subpath fixture:

```powershell
$env:PORTFOLIO_BASE='/portfolio-check'
npm.cmd run build
# Run preview with the same override; test http://127.0.0.1:4321/portfolio-check/
Remove-Item Env:PORTFOLIO_BASE
npm.cmd run build
```

Restore the root build before publishing. Production stays https://engr-sharjeel.github.io/ at root base. The existing workflow builds/deploys pushes to main or manual dispatch with locked dependencies, checks and one static build. Stage explicit intended application/documentation paths, inspect staged filenames/diffs and original hashes, commit, verify GitHub login engr-sharjeel and push normally. Never force push or stage source trees, archives, dependencies, build output or secrets. `npm.cmd run test:live` checks all deployed routes/metadata/sitemap/robots/custom404. Set `PORTFOLIO_TEST_URL` to the live URL for browser checks of deployed galleries/originals/CV.

Navigation directly exposes Projects, Experience, Education, Certificates, Research, Achievements and About, plus CV/Contact actions; mobile uses a labelled progressive menu with complete no-JavaScript access. All enhancements remain small and reduced-motion-aware. `generate:social` produces cream share graphics with the name, correct program/university and simple electrical icon; it cannot restore MS branding.

Read [asset curation](docs/ASSET-CURATION.md), [content priority](docs/CONTENT-PRIORITY.md), [architecture](docs/ARCHITECTURE.md), [design](docs/DESIGN.md), [performance](docs/PERFORMANCE.md) and [progress](docs/PROGRESS.md). Raw originals stay intact and ignored; only explicitly approved copies enter the build. Local Manrope retains its SIL Open Font License.
