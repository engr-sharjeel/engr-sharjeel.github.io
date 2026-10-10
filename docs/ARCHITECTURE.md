# Phase 1 architecture

## Foundation

Astro, strict TypeScript and custom CSS generate a static multipage site. No framework runtime, backend, database or contact-form service. HTML contains all content; small progressive scripts enhance mobile navigation and catalogue filtering. Original source trees remain private and ignored; only reviewed images enter `src/assets`.

## Routes

`/`, `/projects/`, `/projects/<slug>/`, `/experience/`, `/research/`, `/achievements/`, `/about/`, `/contact/` and `/404.html`. Project detail routes use `getStaticPaths()` from one schema-validated collection. Short academic entries share the same route model without pretending to be full case studies. The homepage reads exactly four selected slugs from `src/data/site.ts`; the REEV remains the single flagship.

## Content contract

`src/content.config.ts` uses the installed Astro content-layer `glob()` loader for JSON in `src/content/projects`. Fields include slug, title, shortTitle, category, group, summary, status, flagship, featuredOrder, technologies, overview, approach, components, outcomes, metrics with explicit basis, credits, images with kind/alt/caption/focal point, provenance and optional external links. Collection image paths resolve through Astro's `image()` schema and use `astro:assets` for dimensions, responsive WebP output and lazy loading. Internal provenance is never rendered or serialized into client scripts.

Typed site, experience, research and achievement data live in `src/data`. Site identity and email have one authoritative setting. Shared components own headings, links, cards, tags, image framing and metrics. Build checks verify selection integrity and generated local links/assets.

## Hosting decision

Verified Git root: this portfolio directory. Verified origin: `https://github.com/engr-sharjeel/engr-sharjeel.github.io`. Therefore `site` is `https://engr-sharjeel.github.io` and `base` is `/`. `src/lib/urls.ts` prefixes internal routes and public assets with `import.meta.env.BASE_URL`; imported images are handled by Astro. `PORTFOLIO_BASE` supports a subpath verification build. Static directory routes support direct navigation and refresh on GitHub Pages. Basic metadata and a monogram favicon are included now.

Deployment is deferred to phase 2: add the official Astro GitHub Actions build/upload/deploy workflow and select GitHub Actions in repository Pages settings. No workflow or live hosting is claimed in phase 1. Authentication must belong to `engr-sharjeel` before pushing; never force push or use another account.

## Phase boundaries

1. Evidence audit, source protection, design system, responsive route foundation, curated images, full catalogue, concise detail pages and verification.
2. Expand supported case studies/galleries, experience/research/recognition, comprehensive SEO and social cards, Actions deployment.
3. Refine typography, spacing, subtle effects/motion, performance and accessibility; finish live deployment checks. Preserve the established architecture and evidence distinctions.

Official references: [content collections](https://docs.astro.build/en/guides/content-collections/), [images](https://docs.astro.build/en/guides/images/), [GitHub Pages](https://docs.astro.build/en/guides/deploy/github/). Installed versions are pinned by `package-lock.json`.
