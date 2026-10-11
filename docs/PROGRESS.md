# Phase 3 handoff

Completed on 11 October 2026 using the existing Astro 7.3.8 / strict TypeScript / custom CSS implementation. Phase 2's approved engineering accounts and unresolved facts are preserved. Its historical handoff follows below.

## Visible refinement

- Refined fluid typography, reading widths, long titles, functional labels, captions and introductory/section spacing. Shared panels, cards, borders, actions and keyboard states now follow one token system across every page type.
- Kept the navy/teal identity, local Manrope, MS monogram and optional portrait configuration. The hero/flagship, academic covers, education/credential records, internships, research, About, Contact, footer and 404 received responsive polish.
- Added finite decorative orbit/viewer entrances, arrow feedback and gentle 2px card emphasis for fine-pointer hover and focus. Meaningful content is immediately visible; reduced-motion preference changes remove nonessential motion. No animation framework or motion JavaScript was introduced.
- Kept the native dialog/focus loop/Escape/restoration and safe image links. Persistent header/toolbar controls, scrolling reading content and load/error feedback improve short-landscape and enlarged-text use. Full-resolution documents load on demand.
- Context-specific image sizes follow the actual card, flagship, cover, gallery, credential and portrait slots. Original photos/diagrams are preserved, with no upscaling. Early navigation initialization and stable filter-control geometry remove initial mobile shifts while retaining complete no-JavaScript access.

## Fresh verification

- Final content/type checks: zero errors, warnings or hints. Inventory remains **19 projects: 6 showcases + 13 concise entries**, exactly four configured selections, **10 credentials** and **29 HTML pages**.
- Final root production build: 29 routes / 744 local references, with existing metadata, sitemap/robots, public-output and reviewed-document checks passing. No dependency or lockfile change.
- General browser suite: **131 passed / 0 failed**, with **31 axe runs / 0 violations**. Catalogue categories/search/reset/empty state, flagship reminder, project links, keyboard/skip link, navigation and no-JavaScript access pass.
- Phase 3 browser suite: **106 passed / 0 failed**, with **10 axe runs / 0 violations**. All routes at 320/1440px, core pages around grid/navigation breakpoints, enlarged text, 44px key controls, short-landscape viewer, loading failure/recovery, focus restoration, reduced-motion preference changes, history navigation and asset hashes/dimensions pass.
- Isolated `/portfolio-check/` production build and focused suite: **16 passed / 0 failed**, **6 axe runs / 0 violations**, including direct navigation/refresh, galleries, safe originals and CV links. Root production output remains unchanged; the temporary override was confined to the ignored snapshot.
- Deployed focused suite: **16 passed / 0 failed**, **6 axe runs / 0 violations**, including all ten certificate original hashes and CV downloads. An initial Node HTTPS request failed on the local corporate CA; rerunning with `NODE_OPTIONS=--use-system-ca` passed with TLS verification enabled.
- All **29 live page URLs**, their canonical/social metadata, sitemap/robots and actual missing-route custom 404 pass. Five live page types are byte-identical to the final local production output and downloaded deployment artifact: home, catalogue, REEV, Education and Certificates.
- Downloaded final-code Pages artifact: **281 public files**, 29 HTML pages, ten exact reviewed certificate PNGs with matching dimensions, one exact reviewed CV, font license and robots. No source archives/private document formats are included. Source content/data/assets/downloads/manifest are unchanged relative to the approved Phase 2 commit.
- Final production screenshots were visually reviewed at phone/tablet/desktop sizes, including the viewer and all page types; live homepage/catalogue/REEV/Education/Certificates/About/Contact were inspected at 390/1440px. Temporary reports/screenshots stay ignored under `.tmp/`.

## Measured delivery

Paired cold mobile lab measurements use the same Chrome, viewport/DPR, network and CPU conditions, with three samples per page. Catalogue transfer falls from **148.7 to 92.3 KiB**; median initial CLS across the four measured pages falls from **0.116–0.252 to approximately 0.0001**. Median LCP improves in these samples, with local variance explicitly recorded. REEV/Certificates transfer increases by 1.7/2.7 KiB for refined HTML/CSS. See [PERFORMANCE.md](PERFORMANCE.md) for actual medians, method, candidate selection and limitations; no field Core Web Vitals, field INP or Lighthouse score is claimed.

## Commits and verified release

- `c203692` — production audit and design direction.
- `c5bedb2` — typography, page rhythm, navigation and image reading.
- `a855f9c` — responsive image delivery and Phase 3 verification.
- `d7b83c5` — stable filter geometry and mobile candidate correction.

These milestones are pushed to `origin/main`. Final visitor code **d7b83c563005f35845edd72f3ff49dccc786005a** successfully deployed in [Actions run 38130886166](https://github.com/engr-sharjeel/engr-sharjeel.github.io/actions/runs/38130886166), then passed the live checks above at [https://engr-sharjeel.github.io/](https://engr-sharjeel.github.io/). The final source-protection/measurement/handoff commit follows this verified code commit without changing visitor output; its own deployment is watched and reported separately at completion. Normal history, owner authentication and the existing workflow are preserved.

## Owner settings and factual follow-up

`src/data/site.ts` retains contact/profile/portrait/CV settings and the four featured slugs: REEV, micro hydropower, navigation robot and center-tapped transformer. `src/data/education.ts` retains CGPA **3.10/4.00**, the Fall 2026 report snapshot and degree-in-progress status. `src/data/certificates.ts` retains four courses, two academic commendations, two organisational recognitions and two internships. README documents Windows commands, content/settings updates and publishing.

The new root `IESCO/`, `Power china internship/` and `Profile Picture/` source folders are preserved, unopened, ignored and unpublished. This phase does not add a portrait or new factual evidence. Reviewed certificate PNGs, the two-page public CV and `src/data/public-assets.json` remain byte-for-byte unchanged.

Prompt 4 may address the existing Fall 2025 award/report SGPA discrepancy, transformer measured ratings/tests, SAMS physical implementation, robot test conditions, future conference program/presentation/proceedings and unestablished individual project responsibilities. Their current qualifiers remain intact; no answers were requested or inferred during Phase 3. The completed design, routes, evidence boundary and deployment should be retained for any factual follow-up.

## Historical Phase 2 handoff

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

The verification/handoff milestone **18ac54a** was also pushed and successfully built/deployed in [run 38114526256](https://github.com/engr-sharjeel/engr-sharjeel.github.io/actions/runs/38114526256). A final data review corrects Farewell 2026 precision to **year**, rather than an academic term; its printed name, event text and preview are unchanged. This correction is followed by type/content checks and a checked deployment before completion.

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
