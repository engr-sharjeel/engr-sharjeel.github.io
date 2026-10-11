# Phase 3 delivery measurements

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
