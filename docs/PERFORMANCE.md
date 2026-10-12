# Prompt 5 delivery and portrait measurements

Fresh paired production-preview measurements compare `b2514ef` (cream baseline at port 4332) with visitor code `6189df2` (restored reference theme and final refinements at port 4334). The existing measurement script and locked dependencies are unchanged. Chrome **154.0.8037.98**, three cold samples per page, cache disabled, **390 × 844 / DPR 2**, **4× CPU slowdown**, **150ms latency**, **200,000 bytes/s download** and **93,750 bytes/s upload** are identical before/after. Timing runs were sequential with browser QA/build work idle. Observation ends after network idle, font readiness and another 1.2 seconds. This is local lab evidence, not Lighthouse or field Core Web Vitals/INP.

| Page | Initial transfer before → after | Median LCP before → after | Median CLS before → after |
| --- | ---: | ---: | ---: |
| Home | 82.9 → 86.3 KiB | 1.664 → 1.536s | 0.00000 → 0.00000 |
| Catalogue | 78.4 → 96.5 KiB | 1.408 → 1.484s | 0.00027 → 0.00000 |
| REEV | 62.5 → 64.2 KiB | 1.436 → 1.716s | 0.00000 → 0.00000 |
| Certificates | 73.3 → 74.9 KiB | 1.824 → 1.600s | 0.00000 → 0.00000 |

All four pages still request **zero external JavaScript** and one **24.5 KiB** local Latin Manrope font. Inline enhancement source grows only 28 bytes per page for the accurately labelled public-document viewer action. CSS transfer is 10.8–13.1 KiB. Grouped SVG contacts increase compressed HTML by approximately 1.1–1.4 KiB. Homepage image transfer grows by approximately 1.5 KiB for the replacement portrait. The catalogue's approximately 18 KiB increase chiefly reflects the owner's hydro-second order: the hydropower illustration replaces the smaller transformer photo in the initial lazy-loading window. It does not reflect eager loading of all nineteen projects or document originals. REEV's modest LCP increase is reported, not hidden; these small samples are variable. One final REEV sample has CLS 0.01241, while its median remains zero.

The source PNG is 2,044,380 bytes and remains unchanged. Initial pages use WebP derivatives rather than that full PNG; icons are local inline SVGs with no font/package/hotlink request. No certificate original or CV loads until requested. Explicit portrait dimensions and 2:3 frames reserve layout: header **48 × 72px** on phones / **60 × 90px** on larger screens, hero capped at **418 × 627px** inside its panel. `contain` preserves head, collar, tie and all visible clothing rather than filling a cropped circle/square.

The untimed slot audit covers four pages × four widths (390/768/1024/1440px) × DPR 1/2/3: **48 combinations**, zero errors. At DPR 2, the 390px header chooses 96px for a 48px slot, and the hero chooses 720px for a 348px slot. At 768px these are 128px/60px and 720px/344px; at 1440px, 128px/60px and 1000px/418px. Candidates never exceed the 1024px source width. Header and hero both use natural 2:3 composition. The new asset hash replaces the old import output; delivered original bytes also match the new source manifest.

Actual timing/slot reports remain ignored in `.tmp/phase3-prompt5-before/`, `.tmp/phase3-prompt5-after/` and `.tmp/phase3-prompt5-slots/`. Screenshot/reference/manual-state evidence is separate in `.tmp/prompt5/visual/`. Existing script commands apply with `--phase=prompt5-before`, `--phase=prompt5-after` and `--phase=prompt5-slots --slots-only`, setting `PORTFOLIO_TEST_URL` to the relevant production preview. Earlier comparisons below are historical.

## Historical Prompt 4 delivery measurements

This fresh comparison uses the Phase 3 baseline `84ecb18d74ca2a4b89708a8014dc86eae968d35f`, built in `.tmp/prompt4-baseline`, and the final visitor code `6a57ca652bd78d6543f3ee17c4f74a5370e17f7c`. Both are actual production previews on the same Windows machine. Existing dependencies and the measurement script are unchanged. The new portrait, originals and credential inventory are intentional changes in content, so this is a delivery-budget comparison rather than an identical-content benchmark.

Measured on 11 October 2026 with Chrome **154.0.8037.98**, Playwright/Performance APIs, three cold samples per page, cache disabled, **390 × 844**, **DPR 2**, **4× CPU slowdown**, **150ms latency**, **200,000 bytes/s download**, **93,750 bytes/s upload** and 1.2 seconds observation after network idle/font readiness. Timed runs were sequential, with other browser/build checks idle. Resource latency is asserted. This is local lab evidence, not field Core Web Vitals, field INP or a Lighthouse score.

| Page | Requests before → final | Transfer before → final | Median LCP before → final | Median CLS before → final |
| --- | ---: | ---: | ---: | ---: |
| Home | 6 → 7 | 59.5 → 82.9 KiB | 2.604 → 3.388s | 0.00010 → 0.00148 |
| Catalogue | 5 → 7 | 91.6 → 78.4 KiB | 3.020 → 3.700s | 0.00010 → 0.00000 |
| REEV | 5 → 6 | 59.9 → 62.5 KiB | 1.760 → 2.632s | 0.00010 → 0.00000 |
| Certificates | 7 → 7 | 91.8 → 73.2 KiB | 2.372 → 3.332s | 0.00010 → 0.00000 |

The supplied portrait adds approximately **23.4 KiB** to the homepage's initial transfer. The small header derivative transfers about **2 KiB** rather than the 2 MiB source PNG. Catalogue image transfer falls as the approved order brings the transformer into the first lazy-loading window; this is not a claim that all nineteen images have become smaller. Certificate preview transfer is lower and original PDFs/images remain on demand. No full-resolution certificate, source portrait PNG or CV is requested in these initial timed views.

All four final pages transfer **zero external JavaScript** and one **24.5 KiB** local Latin Manrope font. CSS transfer remains **10.4–12.8 KiB**, compared with **10.5–12.7 KiB** before. Inline enhancement source is 4,099 / 5,229 / 4,099 / 5,621 bytes for Home/Catalogue/REEV/Certificates; only certificate search/original/verifier handling grows materially, by 541 source bytes. No animation framework, new runtime dependency, preload or caching layer was introduced.

The LCP medians are slower in this final run, so no overall speed improvement is claimed. Attribution identifies headings/introductory text rather than the large originals as LCP. Extra portrait/identity/document markup is a deliberate presentation cost; request inspection found no duplicate fonts, eager original-document loads or newly introduced reveal delay to remove. Timing varies substantially: final home samples span **2.752–3.720s**, catalogue **2.192–4.408s**, REEV **2.308–2.848s**, and Certificates **3.228–3.808s**. A preceding diagnostic after-run varied up to 5.35s and is not substituted for the final measurements. These short local samples cannot isolate every CPU/paint variance or establish a field regression. Initial layout is stable: final median CLS is at most 0.00148; one home sample has a 0.01133 shift and one REEV sample has a 0.01310 text/font shift, recorded rather than hidden. There is no return of the deferred header/filter collapse.

The separate untimed image-slot audit visits four pages at **390/768/1024/1440px** and **DPR 1/2/3** (48 page/width/DPR combinations). It checks selected candidates against true delivered pixel dimensions. At DPR 2, the 390px header uses 96px for a 48px slot; the hero uses 720px for a 348px slot. At 1440px the hero uses the 1024px source cap for a 533px slot, and the header uses 128px for a 60px slot. Course documents use 720px for 322px mobile slots and up to 1248px for 505px desktop slots. Portrait/document aspect ratios are preserved, candidate widths never exceed their source, and technical diagrams remain contained. Existing context-specific sizing is retained.

Reproduce with production previews running separately:

```powershell
$env:PORTFOLIO_TEST_URL='http://127.0.0.1:4323/'
npm.cmd run measure:performance -- --phase=prompt4-before
$env:PORTFOLIO_TEST_URL='http://127.0.0.1:4324/'
npm.cmd run measure:performance -- --phase=prompt4-final
npm.cmd run measure:performance -- --phase=prompt4-slots --slots-only
```

Actual reports remain ignored in `.tmp/phase3-prompt4-before/`, `.tmp/phase3-prompt4-final/` and `.tmp/phase3-prompt4-slots/`. Visual capture is outside timing. The earlier Phase 3 evidence below is historical and is not presented as fresh Prompt 4 testing.

## Historical Phase 3 delivery measurements

The comparison uses the production output, with the approved Phase 2 commit `260125378313d4c39555218db24c62bda9c0a347` built in an ignored, isolated snapshot. Its preview runs at `http://127.0.0.1:4323/`; the working site's production preview runs separately at port 4324. The original certificate PNGs, review manifest and public CV are unchanged. This is local lab evidence, not field Core Web Vitals, field INP or a Lighthouse score.

## Repeatable method

`scripts/measure-performance.mjs` uses installed Chrome **154.0.8037.98**, Playwright and browser Performance APIs. Each page has three cold samples in a fresh context with cache disabled, a **390 × 844 CSS-pixel viewport**, **DPR 2**, **4× CPU slowdown**, **150ms network latency**, **200,000 bytes/s download (1.6 Mbit/s)** and **93,750 bytes/s upload (0.75 Mbit/s)**. No scrolling or viewer opening happens during timing. Observation ends after network idle, font readiness and a further 1.2 seconds. Before and after use the same settings and machine. Medians reduce ordinary local timing variation; these short runs do not establish universal speed.

Network throttling uses the current CDP `emulateNetworkConditionsByRule` with the empty global URL pattern. The script asserts that stylesheet request durations include the configured latency. A preliminary diagnostic with an incorrect pattern was discarded, rather than included in the comparison.

Transfer bytes come from navigation and resource timing `transferSize`, including response headers and compressed response bodies. Counts include those timed entries; browser-internal requests such as favicon discovery may not appear. External JavaScript is reported separately from inline JavaScript, which is included in the HTML transfer. LCP is observed before interaction; CLS uses the maximum session window (1-second gaps, 5-second maximum) excluding recent user input. These observations cover the initial viewport and observation period.

PowerShell, with a production preview running separately:

```powershell
$env:PORTFOLIO_TEST_URL='http://127.0.0.1:4323/'
node scripts/measure-performance.mjs --phase=before --screenshots
$env:PORTFOLIO_TEST_URL='http://127.0.0.1:4324/'
node scripts/measure-performance.mjs --phase=after --screenshots --slots
```

Reports and screenshots remain ignored under `.tmp/phase3-before/` and `.tmp/phase3-after/`. Screenshot capture is outside timed runs, uses reduced motion, waits for decoded images and completed viewer loading, and includes the requested page types at phone and desktop widths plus core pages at 320/768/1024px.

## Baseline

Measured on 11 October 2026 against the isolated Phase 2 production output:

| Page | Timed requests | Total transfer | CSS | Font | Images | Median LCP | Median CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 6 | 60.0 KiB | 11.2 KiB | 24.5 KiB | 18.2 KiB | 3.884s | 0.11703 |
| Catalogue | 7 | 148.7 KiB | 9.2 KiB | 24.5 KiB | 107.0 KiB | 4.088s | 0.25199 |
| REEV detail | 5 | 58.2 KiB | 9.2 KiB | 24.5 KiB | 18.2 KiB | 3.504s | 0.11594 |
| Certificates | 7 | 89.1 KiB | 11.2 KiB | 24.5 KiB | 46.1 KiB | 3.644s | 0.11703 |

All four pages transfer **zero external JavaScript**. Their inline enhancement sources are 3,308 / 4,438 / 3,308 / 4,250 bytes respectively before HTML compression. Only the local Manrope Latin subset is requested (25,136 transfer bytes), even though Fontsource emits other subsets; there is no duplicate font request or external font service.

The important baseline regression is layout stability. A separate cold-load attribution trace identifies the deferred mobile navigation collapse: `main` shifts from y=188.59 to y=83.0 when the navigation enhancement is applied, reducing header height by 105.59px. The functional menu works, but its late initialization moves the content. Phase 3 moves that existing enhancement before first paint while retaining the visible no-JavaScript navigation.

## Final comparison

Final production code: `d7b83c563005f35845edd72f3ff49dccc786005a`. The paired runs used the method above on 11 October 2026. Intermediate diagnostic runs are excluded from this table.

| Page | Requests before → after | Transfer before → after | Median LCP before → after | Median CLS before → after |
| --- | ---: | ---: | ---: | ---: |
| Home | 6 → 6 | 60.0 → 59.5 KiB | 3.884 → 2.232s | 0.11703 → 0.00010 |
| Catalogue | 7 → 6 | 148.7 → 92.3 KiB | 4.088 → 2.332s | 0.25199 → 0.00010 |
| REEV detail | 5 → 5 | 58.2 → 59.9 KiB | 3.504 → 2.224s | 0.11594 → 0.00010 |
| Certificates | 7 → 7 | 89.1 → 91.8 KiB | 3.644 → 2.380s | 0.11703 → 0.00010 |

The largest transfer saving is the catalogue (approximately 38%). Correct image slots and the stable initial header/filter layout improve delivery without reducing access to the nineteen projects. The filter controls now occupy their final space in the initial HTML; native `noscript` styles remove inactive controls when JavaScript is disabled. This fixes the late filter insertion observed in intermediate runs.

Home CSS transfer grows from 11.2 to 12.7 KiB; catalogue/REEV CSS grows from 9.2 to 10.5 KiB. The refined viewer, typography and interaction states account for this small increase. REEV and Certificates total transfer rises by 1.7 and 2.7 KiB respectively, principally from CSS/HTML; their image transfer is effectively unchanged. These are deliberate presentation costs, with no added dependency or external JavaScript request. Inline enhancements grow by 830 source bytes per page, primarily viewer loading/error/focus feedback; motion adds no JavaScript. The same single 24.5 KiB local Latin font transfer is used in all final samples, with no new preload or duplicate request.

One final home sample had LCP 5.628s, while the other two were 2.196/2.232s. The median is reported rather than concealing this local variance. The result is lab evidence under the stated artificial conditions, not a guarantee for every device/network or field INP. All four final CLS medians are approximately 0.0001 during the observation window; the significant header/filter shifts are removed.

## Responsive image audit

The optional slot pass is separate from timing:

```powershell
node scripts/measure-performance.mjs --phase=slots-after --slots-only
```

It visits Home, Catalogue, REEV and Certificates at 390/768/1024/1440px and DPR 1/2/3, records each displayed box, actual contained graphic width, `sizes`, selected candidate and its true pixel dimensions. Lazy previews are decoded for this inspection; full-resolution originals remain behind their reviewed viewer/fallback links. Certificate/CV hash and certificate-dimension assertions are also part of the Phase 3 browser check.

Measured examples from the paired slot passes:

| Context | Actual final graphic width | Candidate before → after |
| --- | ---: | ---: |
| Catalogue robot, 1440px / DPR 2 | 398px | 1280 → 800px |
| Catalogue SAMS diagram, 1440px / DPR 2 | 370px | 1280 → 800px |
| IEEE portrait preview, 1440px / DPR 2 | 275px | 1500 → 640px |
| POWERCHINA portrait preview, 1440px / DPR 2 | 275px | 1190 → 640px |
| Catalogue flagship, 390px / DPR 2 | 312px | 720 → 640px |
| REEV full-width cover, 1440px / DPR 1 | 1212px | 1280 → 1248px |

The robot's 390px / DPR 2 card retains a 720px candidate for its 348px slot; this intermediate width avoids an unnecessary jump to 800px. Full-width diagrams use cover/gallery sizing instead of card sizing. Smaller original images, including the fabricated-transformer photograph, remain capped at their source resolution rather than being upscaled. The explicit dimensions, contained document sizing and local font fallback were checked in the production browser suite. Full-resolution certificate PNGs are requested only on viewer opening or explicit safe-image navigation; all reviewed originals and the CV retain their approved hashes/dimensions.

Reference documentation: [Chrome DevTools protocol](https://chromedevtools.github.io/devtools-protocol/), [Resource Timing](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming), [Largest Contentful Paint](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint) and [Layout Shift](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift).
