# Design system

Editorial engineering portfolio: legible technical work, clear hierarchy and restrained effects.

Phase 2 preserves this visual direction. Education uses a degree/CGPA overview, four focus-area panels, selected course rows and a restrained earlier-study entry. Certificates groups ten canonical records in a responsive two-column gallery, with full-image light-matte previews, date/issuer context and genuine actions. Achievements selects academic/organisational records from the same data. The homepage keeps exactly four project selections and adds a small background preview.

The Background navigation disclosure works by keyboard, touch and without JavaScript. Gallery links progressively open a native modal viewer with captions, 44px controls, previous/next, Escape/close, an explicit focus loop/restoration and scrollable natural-size reading. Original links remain usable without JavaScript and point only to reviewed public copies. Larger images load on demand. Public CV/share graphics use the established restrained color hierarchy; no stock project evidence or invented charts are added.

| Token | Value / use |
| --- | --- |
| Ink | `#0B1220`, page background |
| Surface | `#142033`, cards and panels |
| Text | `#F4F5F2`, primary text |
| Muted | `#AAB6C5`, supporting copy |
| Accent | `#55CDB5`, links, selected filters and small details |
| Matte | `#F4F5F2`, diagrams and schematics |
| Width | 1248px maximum; responsive horizontal gutters |
| Radius | 4 / 8 / 12px; restrained, no pill-card styling |

Manrope variable sans-serif is served locally through Fontsource (SIL Open Font License); platform monospace handles technical labels. Large headings use tight tracking and short line lengths; prose stays near 65 characters. Section numbers and fine dividers create an editorial rhythm. The hero pairs identity and engineering focus with an intentional MS monogram inside a restrained engineering-grid composition. An optional local image replaces the monogram without altering hero layout.

The selected-work section has one dominant REEV feature and three supporting cards. The catalogue separates detailed showcases from shorter academic work while preserving shared search/category controls. Typographic category covers communicate missing photography without suggesting fabricated hardware.

Photos can use careful cover framing. Technical diagrams, flowcharts, schematics and posters use contain framing and a warm light matte; captions explain concept/design status. Detail-page technical images are uncropped, sized responsively and link to full-resolution assets. No gradients obscure labels. Asset metadata includes semantic kind, alt text, caption and optional focal point. Image processing does not overwrite source images.

Semantic landmarks, one page h1, ordered headings, skip link, visible focus, real buttons, touch targets of at least 44px and readable contrast are defaults. Mobile menu exposes its expanded state and supports Escape. Catalogue controls appear only when JavaScript is available; content remains complete without it. Results announce count changes; clear/reset restores the full catalogue. Flagship context remains visible during filtering. Reduced-motion preferences disable nonessential transitions. Initial motion is limited to small color/transform transitions.

## Phase 3 audit and direction

The clean, synchronized baseline is `2601253`. An ignored isolated copy of that commit was checked and built for production-preview comparison; it passed with zero diagnostics and 29 HTML routes. Phone/desktop screenshots cover the homepage, catalogue, all six showcases, a concise entry, Education, Certificates/viewer, Experience, Research, Achievements, About, Contact and 404. Core pages also have 320/768/1024px samples. Temporary screenshots remain in `.tmp/`, outside commits and deployment.

The coherent navy/teal composition is retained. The review confirmed small metadata, captions and controls; accumulated introduction/section gaps; and different card/cover slots using one image-size assumption. Long engineering titles need measured widths, and the viewer needs persistent controls in short viewports. Cold mobile measurement also attributed layout shift to the deferred navigation collapse, rather than project imagery.

The chosen refinement uses fluid spacing, deliberate variable weights, comfortable 15–16px reading copy and 12–14px functional context. Shared panels keep an 8px radius, precise borders and light contained-document mattes. Strong functional borders have at least 3:1 contrast against their navy surfaces. Technical imagery remains steady; photos retain their supplied focal points.

Effects are finite and restrained: a decorative orbit entrance, consistent arrow feedback, and 2px card emphasis for fine-pointer hover and keyboard focus. Meaningful hero text, photographs and page content are immediately visible. Reduced-motion preferences remove the effects through CSS, including changes during the session. No animation framework, observer reveal, page-transition system or new dependency is needed.

Navigation initializes immediately after its markup while retaining complete no-JavaScript navigation. The viewer keeps native-dialog semantics and safe original links, with separate scrollable reading content and reachable header/toolbar controls. Context-specific image sizes follow the existing container/grid breakpoints. Reviewed full-resolution certificates, CV, manifest, content records and unresolved factual qualifiers are frozen.

Final refinement also reserves filter-control space before enhancement, avoiding late insertion shifts. The 320px header keeps its name/mark/action in one row, suppressing only the decorative role subtitle. Caption links and project-title links retain 44px targets; dark-matte focus uses a dark green outline for contrast. Viewer loading/error feedback keeps a safe original-image action usable, while Close and reading controls stay reachable in short landscape and enlarged-text layouts.

Fresh final verification is recorded in [PROGRESS.md](PROGRESS.md), with the paired delivery method, results, costs and image-slot examples in [PERFORMANCE.md](PERFORMANCE.md). All 29 route outputs have final 320px/1440px screenshot coverage; the browser checks also cover intermediate breakpoints, enlarged text, reduced-motion preference changes and no-JavaScript access. The ten reviewed certificate originals, public CV and public-asset manifest are unchanged.
