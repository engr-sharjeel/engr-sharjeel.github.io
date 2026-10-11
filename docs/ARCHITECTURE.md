# Architecture

## Static foundation

Astro 7.3.8, strict TypeScript and custom CSS generate a static multipage website. Small progressive scripts enhance navigation, catalogue/certificate filters and a native-dialog image viewer. HTML contains the complete content without JavaScript. No backend, database, admin interface or contact-submission service is required.

## Routes and navigation

29 HTML routes: home, Projects, nineteen generated project details, Experience, Research, Education, Certificates, Achievements, About, Contact and 404. Static robots.txt and sitemap files are additional non-page outputs.

The header has Projects, Experience, Research, an accessible Background disclosure (About, Education, Certificates, Achievements) and Contact. Education/Certificates also appear on About, homepage previews and footer. Background uses native details/summary for keyboard/touch/no-JavaScript support.

Project detail routes use getStaticPaths() from the single validated collection. Six showcases receive supported deeper sections; thirteen additional academic entries remain concise. The homepage's exactly four selections come from src/data/site.ts; REEV is the single flagship.

## Authoritative records

src/content.config.ts uses Astro's content-layer glob() loader for project JSON. Fields cover identity/category/summary/status/flagship/featuredOrder, technologies, overview/approach/components/outcomes, metric bases, credits, image kind/alt/caption/focal point, provenance and optional links. Optional problem/context/constraints/lessons/nextSteps support differentiated case studies.

Typed src/data/education.ts centralises current CGPA/scale/report snapshot, in-progress status, course groupings/highlights and earlier study. src/data/certificates.ts supplies ten canonical records, including issuer/platform/category/date precision, safe image metadata, optional verification links, original printed-name metadata and internal provenance. Achievements derives selected recognition from that collection; experience links by experienceId. Public templates never serialize evidence notes or private source paths.

Site settings centralise identity/contact/photo/CV path and featured selection. Other typed data owns experience, research and skills. Resume generation reads the same records, omitting asset imports and private evidence. Social graphics derive public project titles/status and page label data.

## Public asset boundary

Original archives, extracted trees, grade report and analysis tools/text remain ignored. Certificates are flattened privacy-redacted PNGs in src/assets/certificates; responsive WebP previews and full-size viewer/no-JavaScript links all derive from those safe copies. There is no unredacted original download. The public resume is the only allowed PDF in dist.

src/data/public-assets.json stores reviewed certificate dimensions/hashes and the public CV hash. Build/output checks compare the source and delivered originals to that review manifest, check metadata/local URLs and reject private document types. A modified document requires renewed visual/privacy review before updating its manifest hash.

Astro image() schema and astro:assets manage project dimensions, responsive widths/WebP and loading. Raw large safe images are only requested when a viewer or original link is opened. The dialog supports captions, previous/next, Escape/close, an explicit Tab loop, focus restoration and a scrollable natural-size reading mode. Native modal semantics make the background inert; original image anchors are no-JavaScript fallbacks.

Phase 3 centralises media-slot sizes in `src/lib/image-sizes.ts`: cards, the wide tablet selection, flagship, full-width covers/galleries, experience pairs, height-capped document previews and optional portrait each follow actual CSS gutters/breakpoints. Original assets and review hashes are unchanged. More closely spaced WebP candidates improve selection without upscaling source files.

CSS has explicit reset/base/components/responsive/navigation/viewer layers. Finite decorative motion and pointer/focus states need no animation library or additional motion JavaScript. The existing navigation script initializes inline after header markup to prevent deferred-collapse layout shifts; its no-JavaScript fallback stays complete. Viewer header/toolbar remain outside a scrollable reading body, with load/error status and a reviewed-original fallback.

Catalogue and credential controls have stable initial HTML geometry. Adjacent native `noscript` styles hide inactive controls without JavaScript; all projects, credentials and reviewed-original links remain available. The TypeScript filtering logic and result announcements are preserved.

## SEO and deployment

Production site is https://engr-sharjeel.github.io/ with root base because this is the confirmed username repository. PORTFOLIO_BASE remains available for subpath verification. src/lib/urls.ts prefixes internal/public paths; Astro manages imported assets. Directory routes support direct navigation and refresh.

Layout generates unique supplied title/description, canonical URL, Open Graph/Twitter metadata, local 1200×630 share image, and accurate Person/WebSite/Breadcrumb JSON-LD with less-than and Unicode line separators escaped. No employer, awarded degree, rating or invented credential appears in structured data. 404 is noindex and excluded from sitemap. @astrojs/sitemap emits sitemap-index.xml/sitemap-0.xml; static robots.txt points to the configured production sitemap.

.github/workflows/deploy.yml uses the committed npm lockfile and Node 24, official checkout/setup-node/configure-pages/upload-pages-artifact/deploy-pages actions, push-to-main/manual triggers and Pages concurrency. Build has read permissions; deployment alone has pages:write/id-token:write. Checks and one build precede upload/deployment. CI uses reviewed committed assets, never ignored sources or local parsers.

Repository Pages is configured through GitHub Actions when authenticated owner permissions permit. Live status and deployed commit/run are recorded in PROGRESS.md after direct verification.

## Phase boundaries

1. Completed evidence/source protection, responsive foundation, catalogue and initial pages.
2. Dedicated education/credentials, deeper supported case studies/galleries, experience/research/recognition, reviewed CV, SEO and Pages deployment.
3. Refine established typography/spacing, restrained effects/motion, image delivery/performance and final accessibility/live checks; preserve architecture and factual distinctions.

Official implementation references: [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [Astro images](https://docs.astro.build/en/guides/images/), [Astro sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [Astro GitHub deployment](https://docs.astro.build/en/guides/deploy/github/), [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [GitHub Pages API](https://docs.github.com/en/rest/pages/pages). Versions are recorded in the lockfile.
