# Phase 2 handoff

## Implemented

- Preserved Astro 7.3.8, TypeScript, local Manrope, custom navy/teal design, MS monogram/optional photo and the owner's contact/featured settings.
- 29 HTML routes: home, catalogue, nineteen project details, Experience, Research, Education, Certificates, Achievements, About, Contact and 404. Static robots/sitemap files are additional outputs.
- Education centralises **CGPA 3.10/4.00**, Fall 2026 report snapshot and **degree in progress**, September 2023–present. Four course focus areas, selected supported A highlights, linked academic projects and earlier Nishat college study provide recruiter-facing context. No raw portal report, exhaustive grades or graduation claim.
- Ten canonical credentials: **4 Courses, 2 Academic Commendations, 2 Organisational Recognition, 2 Internship**. Eight sorted files are exact duplicates of Everything; two distinct internship records add to the total. Full-resolution public previews have flattened privacy masks. Supplied verification URLs remain genuine links without a new independent-verification claim.
- Background navigation connects About/Education/Certificates/Achievements by keyboard/touch/native disclosure; Education/Certificates are also linked from homepage/About/footer. Achievements reuses canonical recognition; experience links canonical internship records.
- Six deeper engineering showcases with supported problems/context, approach/components, constraints, outcomes, lessons, next steps, team context and useful existing galleries. Thirteen shorter works remain modest. REEV remains FYP-1 complete, with no mechanical engine-to-wheel path or achieved range. Hydro is a design study. Transformer 57 VA/approximately 210 VA calculations are distinct iterations; no measured rating or numerical test results.
- Shared accessible viewer: lazy full-resolution reading, captions, previous/next, Escape/close, explicit keyboard focus loop/restoration and natural-size scroll mode. No-JavaScript links use the same privacy-reviewed originals.
- Expanded internship/research context. Published policy paper retains source author order/DOI; EV analysis is one unpublished manuscript; REEV remains a future accepted oral abstract. Official UET evidence corroborates IMC 2026, UET Lahore, 17–18 November; no completed presentation/proceedings claim.
- Reviewed two-page selectable-text public CV on About/Contact, generated from canonical public records. Unique titles/descriptions/canonicals, 28 local share PNGs, Open Graph/Twitter, accurate Person/WebSite/Breadcrumb JSON-LD, sitemap and robots. 404 has noindex and is excluded from sitemap.
- Official GitHub Pages Actions workflow for main/manual dispatch, Node 24/npm lockfile, checks + one static build, artifact upload and deployment with limited permissions.

## Verification and public boundary

Fresh phase-2 verification, not repeated phase-1 reporting:

- Type/content check: zero errors/warnings/hints; nineteen projects, six showcases, thirteen academic entries, exactly four valid distinct selections.
- Production build: **29 HTML routes**, **744 internal page/asset references**; unique title/description, canonical/social/JSON-LD, sitemap/robots, h1/image dimensions/alt and public document boundaries checked.
- Main headless Chrome suite: **131 passed, 0 failed**, direct routes at 390/768/1440px, navigation, four project links, View all, search/categories/reset/empty state, flagship reminder, visible skip/keyboard focus and no-JavaScript access. **Zero axe violations** across tested routes.
- Focused root suite: **16 passed, 0 failed**; education/credential navigation and facts, category filters/anchor recovery, viewer full-resolution loading, captions, arrows/Tab/Escape/close/focus restoration, open-dialog/new-page axe, safe image and CV hashes, no-JavaScript fallbacks. Zero axe violations.
- Deployed-site focused suite: **16 passed, 0 failed**, including full-resolution hashes for all ten certificate originals and the CV, mobile/desktop viewer accessibility and no-JavaScript links. Node used the Windows system certificate store; TLS verification remained enabled.
- All **29 live page URLs** returned the intended title/content/canonical. Social image references, sitemap/robots and the actual missing-route custom 404 were checked. The downloaded Actions artifact contained 201 public files, including 29 HTML pages, ten matching safe certificate originals and the exact reviewed CV; no source archive/private document types were present.
- Subpath /portfolio-check build/output checks and the same focused suite: **16 passed, 0 failed**, including direct refresh of Education/Certificates and diagram/download paths. Final build restored to root configuration.
- Desktop/tablet/phone screenshots and both CV page renders visually inspected. All ten safe certificate inputs inspected at full resolution. PyMuPDF confirmed two CV pages with selectable text and text bounds inside each page.
- The first focus test exposed modal Tab traversal leaving the controls; an explicit wrap fixed it and the suite was rerun successfully. Test assumptions about text whitespace/rendered image width were corrected to inspect the real CGPA text/intrinsic attributes.
- Reviewed public hashes/dimensions are recorded in src/data/public-assets.json; build checks enforce exact delivered large-copy identity. Only the reviewed CV is allowed as a PDF. Original archives/source trees/portal report, raw private documents, extracts and tooling remain ignored and intact. No sensitive originals were tracked in the initial history.
- Local npm dependency installation reported zero vulnerabilities. No arbitrary performance score or external credential-validation success is claimed. Browser/PDF inspection artifacts stay in ignored .tmp. CI runs type/content/output checks; browser and visual checks are local.

## Git and deployment

Working directory/Git root: C:\Users\harri\OneDrive\Desktop\portfolio. Branch main; origin https://github.com/engr-sharjeel/engr-sharjeel.github.io. Authenticated GitHub login engr-sharjeel was checked before pushing. No global author identity, visibility, custom domain or branch protection was changed; all pushes are normal.

Phase-2 milestones so far:

- de67df8 — protected new sources, verified education, canonical credentials and reviewed previews.
- 718d27b — expanded supported case studies, experience and research context.
- 89f2d83 — Education/Certificates, connected pages/navigation, accessible galleries, public CV, metadata and verification scripts.
- d30d661 — official Pages Actions workflow and phase-2 architecture/editing/verification handoff.

All four milestones were pushed to the correct origin. Pages was changed from legacy builds to **GitHub Actions** using the authorised owner account. [Run 38114268068](https://github.com/engr-sharjeel/engr-sharjeel.github.io/actions/runs/38114268068) successfully built and deployed **d30d661dbf5ac4fd7d21632447efbfc32da2ca0f** on 11 October 2026. Its logs independently confirm zero type diagnostics and 29 routes/744 references. Pages reports built; [https://engr-sharjeel.github.io/](https://engr-sharjeel.github.io/) was directly verified with the intended portfolio, new routes, galleries, downloads and metadata. A final verification/handoff commit follows without changing visitor content; the latest run for that final commit is checked before phase completion.

Historical phase-1 baseline: 6dff623, e44ea58, 658a281, b7bdf60; 27 routes/123 browser checks were phase-1 results, superseded by the fresh checks above.

## Owner settings and run commands

src/data/site.ts owns public contact/profile links, optional photo, CV path and exactly four featured slugs: **REEV, micro hydropower, navigation robot, center-tapped transformer**. src/data/education.ts owns current academic data; src/data/certificates.ts owns all credentials. README describes content/photo/certificate updates, public-asset re-review and subsequent Actions publishing.

```powershell
Set-Location 'C:\Users\harri\OneDrive\Desktop\portfolio'
npm.cmd ci
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --ignore-lock --host 127.0.0.1 --port 4321
```

Open http://127.0.0.1:4321/; stop the foreground preview with **Ctrl+C**. Run test:browser/test:phase2 in a second terminal with PORTFOLIO_TEST_URL set to that origin. Phase-2 temporary preview processes are stopped after testing; unrelated pre-existing processes are preserved.

## Remaining evidence and phase 3

- Historical Fall 2025 commendation prints SGPA 3.67; current portal lists 3.73. Preserve both sources; current overall CGPA is resolved at 3.10/4.00.
- Transformer measured output/tap values, tested apparent-power rating and numerical open-/short-circuit readings remain absent. Its documented design tap is not evidence of equal secondary halves.
- SAMS physical-hardware implementation remains unestablished; public figure is a Proteus schematic.
- Robot reported prototype metrics lack supplied formal conditions/sample sizes.
- Future conference final program, presentation completion and eventual proceedings publication remain unestablished; event name/date/venue are now corroborated.
- Project-team outcomes do not establish individual task ownership. Older incompatible FYP sizing/proposals stay outside the public specification.

Phase 3 should refine this completed site: typography/spacing and responsive rhythm, restrained effects/motion with reduced-motion support, image delivery/performance, final contrast/keyboard/accessibility and live checks. Preserve the design system, architecture, nineteen-project/ten-credential inventory, editable selections and evidence boundaries; no redesign or invented metrics.
