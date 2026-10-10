# Phase 1 handoff

## Implemented

- Astro 7.3.8 static application, strict TypeScript, custom responsive CSS and locally served licensed Manrope. Deep navy, warm off-white and restrained teal establish the editorial design; MS monogram and optional profile image share one hero frame.
- All 27 routes: home, catalogue, 19 generated project details, experience, research, achievements, about, contact and 404. Six showcases have initial scope/components/status/results/images; thirteen additional works have concise CV-supported records and typographic covers. No alternative FYP proposal is represented as completed work.
- Homepage has exactly four projects: REEV flagship, micro hydropower, navigation robot and center-tapped transformer. Catalogue defaults to flagship first and supports text/technology search, all six category filters, reset and empty state. A persistent flagship link remains available during filtering.
- Semantic layouts/components, skip link, visible keyboard focus, accessible mobile menu/Escape, reduced-motion support and complete HTML content without JavaScript. Navigation and contact links work without a backend; email opens the visitor's email application.
- Two careful internship summaries and two IESCO equipment photographs, three distinct research statuses, seven supported text-only recognition/course records, education and evidenced skills. No graduation/licensure, overall CGPA, invented role, achieved vehicle range or commissioned hydro claim.
- One validated project collection and typed supporting data. Images retain kind/alt/caption/focal point and Astro supplies responsive WebP, dimensions and loading behavior. Technical images stay uncropped on a light matte; details link to full-resolution curated inputs.
- Source/audit/design/architecture documentation, owner editing instructions and reproducible content/output/browser checks. Private source trees, archives, secrets, tools, extraction/OCR output, dependencies and builds remain ignored.

## Evidence and source safety

Originals are intact. The initial repository/history tracked only README; no private document needed removal from Git. All 18 LinkedIn images, nine internship photos and relevant report/presentation/certificate material were inspected. Fifteen project images plus two experience images were selected, with metadata stripped. Three derivatives remove registration identifiers or local-path/timestamp information. No raw CV, certificate scan, identity/academic record, internship/funding document or payment-bearing letter enters the app, build or commits. [Asset curation](ASSET-CURATION.md) records exact mapping/omissions; [source audit](SOURCE-AUDIT.md) records evidence and version conflicts.

## Verification

- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints; 19 entries, 6 showcases, 13 academic works, 4 valid distinct homepage selections.
- `npm.cmd run build`: 27 static HTML routes; output checks validate local route/asset references, one h1, title/description, image alt/dimensions and private-document boundaries. Root base and `/portfolio-check` both passed; final output restored to root base.
- Complete headless Chrome runs before and after visual-review fixes: each 123 passed, 0 failed. Direct-route coverage at 390, 768 and 1440px; image loading, horizontal overflow, menu click/Escape, desktop/mobile navigation, four homepage project links, View all, text search, every category, reset/empty state, persistent flagship reminder, keyboard skip/focus and JavaScript-disabled mobile navigation/catalogue/detail access. Axe reported no violations across tested routes.
- Separate `/portfolio-check/` browser smoke passed five direct/refresh routes, images, base-prefixed links, search/reset and flagship navigation. The real repository remains root-hosted; no deployment is implied by this smoke test.
- Screenshots visually reviewed for desktop/mobile/tablet hero, cards, ancillary pages, REEV architecture/flowchart, technical framing and definitions. Fixed heading alignment, stretched education badge and blanket related-card underlining.
- Dependency installation reported 0 npm vulnerabilities. No performance score or live GitHub Pages deployment is claimed. Browser reports/screenshots are local ignored `.tmp/` artifacts, not tracked assets.

## Repository and run state

Verified working directory/Git root: `C:\Users\harri\OneDrive\Desktop\portfolio`. Branch: `main`. Origin: `https://github.com/engr-sharjeel/engr-sharjeel.github.io`. Local commit identity already matched the owner; global identity was not changed. Network-enabled GitHub checks confirmed authenticated account `engr-sharjeel`; the initial restricted check's invalid-token result was misleading. Fetch confirmed the remote is an ancestor of the local work, allowing a normal non-force push.

Milestones: `6dff623` source protection/audit/design; `e44ea58` Astro/content/assets foundation; `658a281` responsive routes/catalogue/details; final verification/handoff commit follows these. Push verification is reported in the phase completion response; use `git status -sb` and `git rev-list --left-right --count origin/main...main` to confirm current synchronization. Deployment workflow and live publication belong to phase 2.

PowerShell production preview:

```powershell
Set-Location 'C:\Users\harri\OneDrive\Desktop\portfolio'
npm.cmd ci
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4321
```

Open `http://127.0.0.1:4321/`. Stop Astro 7 preview with `npm.cmd exec -- astro preview stop`. Read README for development, browser-check and subpath commands. Phase QA servers are stopped at handoff.

## Owner settings and open facts

`src/data/site.ts` owns the four featured slugs, public email, LinkedIn/GitHub links and optional photo. README gives the exact photo import/setting instructions. `src/content/projects` owns project copy and image metadata; `src/data` owns supporting records; `src/styles/global.css` owns design tokens/layout.

Confirm before expansion: transformer secondary output/tap topology and power rating; SAMS physical implementation; robot test conditions; public email preference and overall CGPA if desired; exact conference details and eventual presentation status; other project team credits/individual responsibilities and compatible FYP sizing; the omitted farewell-recognition recipient name variant. Current public records omit uncertain specifications and distinguish design estimates, reported results, manuscripts and future presentation status. A public CV remains absent until sanitized/reviewed.

## Concrete phase 2 next steps

1. Preserve the content collection, base helper, components and existing design. Deepen the six case studies with supported calculations, diagrams, learning and verified team contributions; keep alternative FYP scenarios separate. Add modest galleries without replacing technical contain framing.
2. Resolve the grouped owner facts above. Expand internship/research/achievement context from reviewed evidence. Add a sanitized public CV only if a suitable version is explicitly prepared; use the optional photo setting when supplied.
3. Add comprehensive metadata/canonical URLs, sitemap, social preview images and any verified publication links. Keep the three research statuses distinct and update the abstract only after the event/evidence changes.
4. Add the official Astro GitHub Actions build/upload/deploy workflow, choose GitHub Actions in Pages settings, deploy the static output and verify the real root URL/direct routes/404/assets. Current site/base already match this repository.
5. Run existing check/build/browser scripts after changes. Leave advanced typography/effects/motion, performance tuning and final accessibility/live-deployment review for phase 3; refine the foundation rather than redesigning it.
