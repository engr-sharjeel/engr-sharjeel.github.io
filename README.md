# Muhammad Sharjeel — engineering portfolio

Phase-1 static portfolio built with Astro 7, strict TypeScript and custom CSS. It includes 19 supported project entries (six showcases and thirteen shorter academic records), 27 generated pages, curated technical images, responsive navigation, catalogue search/category filters and an MS monogram hero. GitHub Pages deployment follows in phase 2.

## Run on Windows

Use Node 22.12+ (verified with Node 24.18.0) and npm. In PowerShell, use `npm.cmd` to avoid the Windows script-execution-policy restriction:

```powershell
Set-Location 'C:\Users\harri\OneDrive\Desktop\portfolio'
npm.cmd ci
npm.cmd run dev
```

Development: `http://localhost:4321/`. Production preview:

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4321
```

Open `http://127.0.0.1:4321/`. Stop development with Ctrl+C; Astro 7 production preview can be stopped with `npm.cmd exec -- astro preview stop`. Stop the current preview before starting one with a different base/port. The check script validates types/content and the featured selection; the build script also checks generated routes, local links/assets, image attributes, metadata and the public-source boundary. If Astro telemetry configuration is blocked in a restricted environment, set `$env:ASTRO_TELEMETRY_DISABLED='1'` for that shell. When a corporate certificate store requires it for npm, Node 24 supports `$env:NODE_OPTIONS='--use-system-ca'`; never disable certificate validation.

## Owner-editable content

- Identity, public email, professional links and hero photo: `src/data/site.ts`.
- Homepage projects: reorder/replace the four slugs in `featuredProjects` in that same file. Keep exactly four distinct valid slugs including `range-extended-electric-vehicle`. Components require no edits.
- Project facts and images: `src/content/projects/<slug>.json`. The schema in `src/content.config.ts` validates each record. Short works use `group: "academic"`; six detailed entries use `"showcase"`. The single REEV flagship stays first in the default catalogue.
- Experience, research, courses/recognition and skills: typed files in `src/data/`.
- Colors, type and responsive layout: `src/styles/global.css`.

To add a project, create one JSON record matching the existing schema. Keep slug and filename identical; its detail page is generated automatically. Place reviewed assets under `src/assets/projects/<slug>/`, then reference them from JSON with `../../assets/projects/<slug>/<filename>`. Include kind, useful alt text, an accurate caption and focal point. Put cover image first. Keep provenance and evidence notes factual and free of private values; templates never publish those fields. Preserve clear metric bases, team attribution and prototype/design/manuscript distinctions.

## Add the profile photo

1. Place a reviewed, metadata-cleaned image at `src/assets/profile/muhammad-sharjeel.jpg` (create the `profile` directory).
2. Add `import profilePhoto from '../assets/profile/muhammad-sharjeel.jpg';` at the top of `src/data/site.ts`.
3. Replace `profileImage: undefined as ImageMetadata | undefined` with `profileImage: profilePhoto`. Keep `profileAlt` accurate.
4. Run check/build and review the hero. The same frame automatically serves an optimized image in place of the monogram; adjust `.identity-art img` object-position if the portrait needs a different focal point.

Remove the import and restore the undefined setting to return to the monogram. There is no placeholder or broken-image UI.

## Verification

With production preview running in another PowerShell terminal:

```powershell
npm.cmd run test:browser
```

This uses `playwright-core` with existing local Chrome, not a downloaded browser. Default path: `C:/Program Files/Google/Chrome/Application/chrome.exe`. Override with `$env:PORTFOLIO_CHROME`. It tests direct routes at 390/768/1440px, mobile menu/Escape, selected project links, View all, search, categories, reset/empty state, keyboard focus, JavaScript-disabled behavior and axe checks. Screenshots/reports remain ignored in `.tmp/`.

To verify subpath hosting independently of the real root-hosted repository:

```powershell
$env:PORTFOLIO_BASE='/portfolio-check'
npm.cmd run build
Remove-Item Env:PORTFOLIO_BASE
npm.cmd run build
```

The last command restores the intended root build. All internal routes/public assets use the shared base helper; Astro manages imported images. The verified origin is `engr-sharjeel/engr-sharjeel.github.io`, so normal builds use root base and `https://engr-sharjeel.github.io` as site.

## Sources and handoff

Original `Everything/` and `LinkedIn projects/` trees, archives, dependencies, builds, secrets and temporary extraction files are ignored. Leave originals intact. Only visually reviewed curated images are application inputs. No raw CV, certificate, private identity/academic record or payment-bearing letter is published. No CV-download control exists until a safe public version is reviewed.

Read [source audit](docs/SOURCE-AUDIT.md), [asset curation](docs/ASSET-CURATION.md), [architecture](docs/ARCHITECTURE.md), [design](docs/DESIGN.md) and [progress/handoff](docs/PROGRESS.md). Manrope is served locally through Fontsource; its SIL Open Font License is retained in `public/fonts/manrope-license.txt`.
