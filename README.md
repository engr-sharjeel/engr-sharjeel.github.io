# Muhammad Sharjeel: engineering portfolio

Astro 7.3.8, strict TypeScript, custom navy/teal CSS and local Manrope generate this static GitHub Pages site. Prompt 5 restores the Phase 3 visual reference at `84ecb18d74ca2a4b89708a8014dc86eae968d35f` while retaining the newer content, direct navigation and owner-approved documents. There are 30 HTML pages, 19 projects (six showcases/thirteen concise academic records), 12 distinct credentials and six evidence-grounded service offerings. Portrait/name branding replaces the earlier MS monogram. About and Contact share a native project-enquiry form; FormSubmit delivers privately after recipient activation.

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

- `src/data/site.ts`: identity, exact owner hero brief, program/university, phone/email/WhatsApp/profiles, supplied portrait/focal point and CV path. Phone links use `tel:+923494247649`; WhatsApp uses `https://wa.me/923494247649`; email uses `mailto:engr.muhammadsharjeel@gmail.com`.
- `src/lib/project-priority.ts`: the single explicit nineteen-project order. Its first four are REEV, micro hydropower, navigation robot and Single-Phase Center-Tapped Transformer. `featuredProjects` in site.ts derives `projectPriority.slice(0, 4)` so homepage, catalogue, filtered results and related subsets cannot drift. Edit this priority array to change the selections/order; keep four distinct supported slugs including the flagship.
- `src/content/projects/*.json`: schema-validated facts, status, teams, metrics and project images. Keep six substantial showcases and thirteen modest academic records; do not invent measured results or personal responsibilities.
- `src/data/education.ts`: current reported CGPA 3.10/4.00, Fall 2026 snapshot, degree-in-progress status and coursework. Do not average term SGPAs.
- `src/data/certificates.ts`: twelve canonical records, unchanged credential order/groups, public document links, faithful previews and verification URLs. Achievements reuses recognition records. The canonical IELTS record also owns structured test/score data used by Education immediately after the degree overview; do not maintain a second score/date copy.
- `src/data/experience.ts`: IESCO first, with its new portrait-format photograph first; POWERCHINA follows with three supplied project-context photographs. Image order also controls gallery order.
- `src/data/skills.ts`: six central tools and six central engineering skills, reused on Home/About. PCB design is supported by the supplied CV; SCADA systems is owner-supplied.
- `src/data/services.ts`: six service IDs/titles, client-oriented support, example deliverables and existing project links, reused by About's table and both enquiry selectors. Keep the offered scope grounded in supported academic work; do not invent prices, client history or licences.
- `src/data/enquiry.ts`: public delivery endpoint derived from the configured recipient, field labels/limits, contact preferences, timeframes/currencies and the absolute base-aware return path. `ProjectEnquiryForm.astro` shares native HTML; `src/scripts/project-enquiry.ts` adds validation and safe service preselection only on form pages.
- `src/styles/`: restored reference navy/teal tokens, shared layout, responsive direct navigation, supporting pages and viewer. `src/lib/image-sizes.ts` must follow actual CSS slots/gutters when layout changes. Shared `ContactMethods.astro` groups each icon/label/value/link independently in Contact, Home and Footer; local SVGs add no icon dependency.

## Replace portrait or CV

The current portrait is copied unchanged from `Profile Picture/Polished studio portrait with side-swept hair.png` (1024 × 1536) to `src/assets/profile/muhammad-sharjeel-portrait.png`. Source SHA-256: `b144d7394e8c96e7cd56545c023522d9d8f025c5cbc27012c4510877e9bde259`. site.ts controls the import/alt/focal point. Both placements use the complete 2:3 composition with `contain`: the header is 48 × 72px on phones and 60 × 90px otherwise; the hero panel caps at 420px (418px image slot after borders). Astro supplies small header and larger hero WebP derivatives with explicit dimensions and source-capped candidates. A replacement requires updating the copied bytes and approved-image manifest, then inspecting face, collar, tie and clothing at 320/390/768/1440px and enlarged text. Change frame geometry when a new source ratio requires it; object-position alone cannot repair a destructive crop. Fallback branding uses the name/simple icon, never MS.

The public CV is an unchanged copy of `CV/Muhammad_Sharjeel_ATS_CV (2).pdf`, at `public/downloads/muhammad-sharjeel-cv.pdf`. It has two pages, but interface labels simply identify PDF rather than assuming future page counts. **`generate:resume` is retired and exits without overwriting the supplied PDF.** To replace it, inspect all pages, copy the chosen original bytes, record its actual SHA-256/byte length/page count in `src/data/public-assets.json`, and run checks/build. Do not regenerate its layout or edit owner document text.

The supplied CV retains historical two-seater wording and a different printed phone; the website uses the corrected REEV scope and current owner-supplied number. A revised owner PDF can resolve these document-only conflicts. See the asset curation note.

## Add an approved certificate

The owner explicitly approved publication of this collection's original documents, including complete signatures, seals, identifiers and printed content. This permission supersedes the earlier masked-preview policy for these selected assets; it does not approve unrelated identity documents, the transcript, payment letters, archives or raw source trees.

Copy an explicitly approved original unchanged to `public/credentials/<slug>/original.<ext>`. Preserve original PDF bytes/all pages. Put a faithful full-content image preview in `src/assets/certificates/`; PDFs use reviewed raster page previews without cropping, masking or colour changes. Multi-page documents require all preview pages and a complete public PDF action. Responsive delivery preserves aspect ratio and caps candidates at source size.

The IESCO certificate is the explicit Prompt 5 exception: its public PDF is an orientation-only derivative, changing page rotation metadata from 90° to 0° (90° counterclockwise). Page content and embedded images are unchanged; the untouched supplied PDF remains in the ignored local Certificates folder. The existing public `original.pdf` path is retained for stable links, but the UI accurately says **Open upright PDF**, rather than claiming byte identity. Its newly rendered 1684 × 1190px preview shows the complete landscape page upright. The manifest records source and public hashes separately with the orientation correction; other certificate originals and the owner CV remain unchanged. See [asset curation](docs/ASSET-CURATION.md) for exact hashes and preservation evidence.

Add one typed canonical record with public path/format/page count, preview metadata, factual issuer/date/context and any source-supported verification URL. Add each document/preview to the explicit version-2 manifest with hash, dimensions or page count and byte length. Documents and previews are independently validated; full-resolution files load only on request. An expressly authorised derivative also requires its source hash and a precise transformation/preservation record; do not merely replace a hash to bypass the boundary. `.gitattributes` prevents PDF/image line-ending conversion. Deduplicate alternate scans, then update `docs/ASSET-CURATION.md` with filenames/decisions rather than extracted private text. Run the build and focused browser suite before publishing.

## Verify and publish

With a stable production preview running in another terminal:

```powershell
$env:PORTFOLIO_TEST_URL='http://127.0.0.1:4321/'
npm.cmd run test:browser
npm.cmd run test:phase2
npm.cmd run test:phase3
npm.cmd run test:enquiry
```

Do not rebuild `dist` while these production browser checks are running. Tests cover direct navigation, phone/tablet/desktop routes, owner project order/search/reset, unchanged credential categories/search/empty states, uncropped portrait, grouped contact actions, canonical IELTS placement/anchor, upright IESCO presentation, keyboard/no-JavaScript access, viewer focus/Escape/error handling, reduced-motion changes, contrast via axe and publication hashes. The enquiry suite intercepts every provider request using synthetic data; it never sends a real enquiry or activation email. Fresh results and deployment evidence belong in `docs/PROGRESS.md`; prior phase counts are historical. Reports/screenshots stay ignored in `.tmp/`.

```powershell
npm.cmd run measure:performance -- --phase=prompt5-after --screenshots --slots
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

Navigation directly exposes Projects, Experience, Education, Certificates, Research, Achievements and About, plus CV/Contact actions; mobile uses a labelled progressive menu with complete no-JavaScript access. The old Background dropdown remains retired. All enhancements remain small and reduced-motion-aware. `generate:social` produces navy/teal share graphics with the name, correct program/university and simple electrical icon; it cannot restore MS branding. Native controls use `color-scheme: dark`.

For a downloaded Pages artifact, set `PORTFOLIO_OUTPUT_DIR` to its extracted site folder and run `node scripts/check-output.mjs`. This runs the same route, metadata and approved-asset boundary checks read-only; normal builds use `dist`. Clear the temporary variable afterwards.

## Enquiry delivery and owner activation

Visitors can use `/about/#services` and its compact form, or the full `/contact/#project-enquiry` brief. A Contact link can preselect a known service, for example `/contact/?service=embedded-systems#project-enquiry`; unknown values are ignored. Never put names, emails, phone numbers or briefs in URLs.

Both forms use normal `POST` to `https://formsubmit.co/engr.muhammadsharjeel@gmail.com`, with named reply email, descriptive subject, table delivery, a honeypot, retained provider spam verification and an absolute return URL. The `/contact/thanks/` utility page is noindex/excluded from the sitemap and contains no submitted data. No uploads, automatic visitor emails or public submission records are created. Visitors can use email/WhatsApp if the provider fails. See [enquiry architecture and official documentation](docs/ENQUIRIES.md).

**Recipient activation and real inbox receipt remain pending owner confirmation.** Deployment alone does not verify delivery. Complete this procedure on the live site:

1. Submit one clearly labelled **TEST** enquiry.
2. Open the FormSubmit activation email in **engr.muhammadsharjeel@gmail.com** and confirm it; check spam/junk if necessary.
3. Submit another **TEST** enquiry, verify the complete message arrives, and confirm that replying targets the submitted visitor email.

Do not run real provider submissions from automated tests. The focused suite verifies endpoint/payload/return behavior through mocks without accessing a mailbox or sending messages.

Read [asset curation](docs/ASSET-CURATION.md), [content priority](docs/CONTENT-PRIORITY.md), [architecture](docs/ARCHITECTURE.md), [design](docs/DESIGN.md), [performance](docs/PERFORMANCE.md) and [progress](docs/PROGRESS.md). Raw originals stay intact and ignored; only explicitly approved copies enter the build. Local Manrope retains its SIL Open Font License.
