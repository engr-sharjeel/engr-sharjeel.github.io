# Muhammad Sharjeel — engineering portfolio

Astro 7, strict TypeScript and custom CSS generate this static GitHub Pages portfolio. The site has 29 HTML pages, nineteen supported projects (six showcases and thirteen shorter academic entries), dedicated Education and Certificates pages, ten distinct credentials, accessible galleries and a reviewed public CV. The navy/teal design, four selected projects and MS monogram established in phase 1 remain intact.

## Run on Windows

Use Node 24 and the committed npm lockfile. In PowerShell use `npm.cmd` to avoid script-execution-policy restrictions:

```powershell
Set-Location 'C:\Users\harri\OneDrive\Desktop\portfolio'
npm.cmd ci
npm.cmd run dev
```

Development: `http://localhost:4321/`. Production preview:

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --ignore-lock --host 127.0.0.1 --port 4321
```

Open `http://127.0.0.1:4321/`. These commands run in the foreground; stop with **Ctrl+C**. The preview flag keeps Astro 7 in the foreground. Type/content checks validate the project inventory and featured selection. Build checks validate all routes, internal assets/links, unique metadata, canonical URLs, sitemap/robots, JSON-LD and reviewed certificate/CV hashes.

In a restricted shell set `$env:ASTRO_TELEMETRY_DISABLED='1'` if necessary. For npm behind a corporate certificate store, Node 24 supports `$env:NODE_OPTIONS='--use-system-ca'`; preserve certificate validation.

## Owner-editable content

- Identity, email, professional links, CV path, optional hero photo and four featured slugs: `src/data/site.ts`. Keep exactly four valid distinct slugs including `range-extended-electric-vehicle`; layout components need no edits.
- Current CGPA, GPA scale, report snapshot, degree status, coursework and earlier study: `src/data/education.ts`. Update the explicitly reported CGPA, not an average of term SGPAs. Fall 2026 is the snapshot label, not a completed term.
- Canonical credentials: `src/data/certificates.ts`. Achievements and internship links reuse these records.
- Project facts, galleries and evidence: `src/content/projects/<slug>.json`, validated by `src/content.config.ts`. Short work uses `group: "academic"`; detailed work uses `"showcase"`. Optional problem/context/constraints/lessons/nextSteps enrich supported case studies.
- Experience, research and skills: typed files in `src/data/`. Keep published paper, unpublished manuscript and accepted future abstract distinct.
- Design tokens/layout: `src/styles/global.css`; connected pages, navigation and viewer have small separate stylesheets.

New project JSON filenames must match their slugs; detail routes generate automatically. Place privacy-reviewed assets in `src/assets/projects/<slug>/` and include kind, alt, caption and focal point. Put the cover first. Keep provenance/evidence notes free of private values; templates do not publish them. Preserve team attribution and distinguish design estimates from reported prototype results.

## Add a certificate

Review the original locally, then create a flattened public copy under `src/assets/certificates/`. Remove personal identifiers, family details, private contacts/signatures and embedded metadata from every linked resolution. Never mask only a thumbnail while linking an original. Keep legitimate award text and printed names intact.

Import the safe asset into `src/data/certificates.ts` and add one typed record with a unique slug, title, issuer/platform, category, date/term precision, context, preview metadata and genuine optional verification URL. Deduplicate by content, title/issuer/term and hashes. Add source decisions to the audit without private values.

After visually reviewing the full-size public image, add its filename, dimensions and SHA256 to `src/data/public-assets.json`. PowerShell: `(Get-FileHash -Algorithm SHA256 -LiteralPath 'src/assets/certificates/example-public.png').Hash.ToLower()`. The build rejects a changed preview until its review manifest is updated. Run checks/build and the focused browser suite; verify both the preview and viewer/fallback.

## Public CV and share images

`public/downloads/muhammad-sharjeel-cv.pdf` is a two-page selectable-text CV generated from the same public site/education/experience/project/research/credential records, not a copied private CV.

```powershell
npm.cmd run generate:resume
npm.cmd run generate:social
```

CV generation uses installed Chrome through Playwright; set `$env:PORTFOLIO_CHROME` if needed. After any GPA/contact/content change, regenerate the PDF, inspect its page count, layout and selectable text for privacy, then update the resume SHA256 in `src/data/public-assets.json`. Do not approve a hash before review. The download controls exist on About and Contact. Social graphics are local PNGs generated from public project titles/status and `src/data/page-meta.json`; review long headings after regeneration. Generation is local; CI builds reviewed committed assets.

## Add the profile photo

1. Place a reviewed, metadata-cleaned image at `src/assets/profile/muhammad-sharjeel.jpg`.
2. Add `import profilePhoto from '../assets/profile/muhammad-sharjeel.jpg';` to `src/data/site.ts`.
3. Replace `profileImage: undefined as ImageMetadata | undefined` with `profileImage: profilePhoto`; keep `profileAlt` accurate.
4. Run check/build and inspect the hero at phone/tablet/desktop widths. The same frame replaces the monogram with an optimized image; adjust `.identity-art img` object-position if necessary.

Remove the import and restore the undefined setting to return to the monogram.

## Browser verification and base paths

With preview running in another terminal:

```powershell
$env:PORTFOLIO_TEST_URL='http://127.0.0.1:4321/'
npm.cmd run test:browser
npm.cmd run test:phase2
```

After a successful Pages run, `npm.cmd run test:live` checks all built page routes, live canonical/share metadata, sitemap/robots and custom 404 against the root build. Set `$env:PORTFOLIO_TEST_URL='https://engr-sharjeel.github.io/'` for the focused live interaction suite. If the local network uses a corporate CA, set `$env:NODE_OPTIONS='--use-system-ca'` for these Node requests.

The scripts use existing local Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`), Playwright and axe. They exercise routes at 390/768/1440px, navigation/keyboard/no-JavaScript fallbacks, catalogue search/reset/empty states, credential filters/anchors, viewer focus/close/full-resolution reading and reviewed downloads. Reports/screenshots stay ignored in `.tmp/`.

To check project-repository subpath compatibility:

```powershell
$env:PORTFOLIO_BASE='/portfolio-check'
npm.cmd run build
# Preview this build and check /portfolio-check/ URLs if needed.
Remove-Item Env:PORTFOLIO_BASE
npm.cmd run build
```

Restore the root build before publishing. Production is the username repository `engr-sharjeel/engr-sharjeel.github.io`: site `https://engr-sharjeel.github.io/`, root base. Internal/public URLs use the shared base helper; imported assets use Astro.

## Publish subsequent changes

The workflow `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch. Node 24 + `npm ci` + type/content checks + one production build produce `dist`; official Pages actions upload and deploy that static output. Repository Pages must use **GitHub Actions**. Check the Actions run for the pushed commit and verify the live page before calling a release deployed.

Run local checks, review public assets, explicitly stage changed application/documentation paths, inspect the staged diff and commit. Confirm authenticated GitHub login is `engr-sharjeel`, then push normally. Never force push or stage original archives/trees, extracted text, dependencies, builds or secrets.

Read [source audit](docs/SOURCE-AUDIT.md), [phase-2 evidence](docs/PHASE2-SOURCE-AUDIT.md), [case-study review](docs/CASE-STUDY-EVIDENCE.md), [architecture](docs/ARCHITECTURE.md), [design](docs/DESIGN.md) and [handoff](docs/PROGRESS.md). Original source trees and the portal report remain intact and ignored. Only reviewed public copies enter the build. Manrope is locally served under the retained SIL Open Font License.
