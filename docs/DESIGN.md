# Design: restored navy/teal engineering portfolio

Prompt 6 extends this system with a captioned service table, mobile labelled service records and shared project-enquiry forms. About's offering follows its background and precedes academic detail. Contact gives the brief the larger column and puts direct methods alongside; mobile stacks the form first. Navy inputs use 1rem text, 50px control heights, readable hints, teal focus outlines and warm error text/borders. Errors are visible beside fields and in a focusable summary; disabled/submitting states retain readable text. The optional return page shares the same rhythm and does not imply an inbox receipt from a direct visit. No additional decorative motion or runtime dependency is introduced. Structure/delivery decisions are recorded in [ENQUIRIES.md](ENQUIRIES.md).

Prompt 5 supersedes Prompt 4's cream theme and transformer-second project order. The real Phase 3 reference is `84ecb18d74ca2a4b89708a8014dc86eae968d35f`, immediately before the first cream commit `fea7fa0ee368ac4eaa4842dc5e82bfa1b75dad9a`. The reference's existing styles and visual assets are restored selectively, preserving current content and functionality rather than resetting/reverting the repository. The same local variable Manrope, measured long-title widths, 15–16px reading copy, readable functional labels, fluid spacing, 4/8/12px radii, button treatment, fine borders and restrained effects remain the visual vocabulary.

| Token | Exact reference value / use |
| --- | --- |
| Ink | `#0B1220`, page background |
| Surface | `#142033`, panels and controls |
| Soft surface | `#101B2B`, quieter panels |
| State surface | `#19283B`, interaction feedback |
| Text | `#F4F5F2`, primary copy |
| Muted | `#AAB6C5`, supporting copy |
| Teal accent | `#55CDB5`, links, selected controls and focus |
| Divider | `#2A384B`, decorative separation |
| Strong boundary | `#5A6D83`, identifiable controls on ink/surface/soft backgrounds |
| Document matte | `#F4F5F2`, full-image technical/document framing |

Existing CSS cascade layers own the restored theme; native controls use `color-scheme: dark`. The newer direct masthead, discovery cards, tools/skills panels, expanded credentials and contact methods use those reference surfaces, borders, spacing and states. No new dark palette, framework, icon dependency or animation library is introduced. White certificate/CV pages remain original document content rather than theme surfaces to recolour.

The two-row masthead retains recognisable portrait/name/BS Electrical (Power) Engineering/Air University, Islamabad identity with CV/Contact, then seven direct principal destinations. Mobile navigation is labelled and touch/keyboard/no-JavaScript usable, with early initialization preserving layout stability. The Background dropdown stays retired; MS branding does not return. Favicon/social generation uses navy/teal name/program/university/simple electrical-icon graphics.

Home keeps identity and the exact owner brief, then the four selected projects in owner order: REEV, micro hydropower, navigation robot and Single-Phase Center-Tapped Transformer. IESCO-first internship previews precede the four Education/Certificates/Achievements/About discovery cards, concise engineering research and two central tools/skills groups. Those groups immediately precede the contact invitation. REEV remains the distinct Final Year Project, with series architecture, FYP-1-complete status and future conversion-startup ambition separated from current work.

The replacement `Polished studio portrait with side-swept hair.png` is 1024 × 1536px. Both placements preserve its complete 2:3 composition with `contain` and central alignment, showing face, collar, tie knot and clothing. The header uses softly rounded vertical 48 × 72px/60 × 90px frames; the hero panel caps at 420px with a 418px inner image slot. Geometry follows the source rather than forcing a square/circular crop. Astro derivatives reserve dimensions, cap at source pixels and use actual slot sizes. No face/background/clothing alteration or AI generation is involved; the old portrait bytes are replaced in the imported asset so derivative URLs change.

Each Contact/Home/Footer phone, WhatsApp and email action groups a local decorative SVG with its own label, value and link. Gmail and WhatsApp marks supplement readable text; LinkedIn/GitHub also have recognisable icons. A group remains intact when email wraps and never attaches an Email label to the preceding phone. Compact groups have at least 72px height, and full records provide generous focus/touch areas; no messaging or application launch occurs until a user follows a link.

Education's compact Language qualification panel sits immediately after degree/current snapshot and before academic focus/coursework. It reads the canonical IELTS record (Academic, overall 7.5/9, test 3 August 2026, printed C1) and links to the certificate anchor. The degree and in-progress engineering identity keep the main emphasis. The component breakdown remains in the full credential; no expiry or independent verification is inferred.

The Certificates page retains all twelve records, its existing order, five groups, filters and verification/full-document actions. Complete contained previews remain on light mattes. IESCO alone uses an owner-authorised upright PDF derivative and newly rendered landscape preview: rotation metadata 90° → 0° (90° counterclockwise), with text/images/signatures/seals/margins unchanged. The public action says Open upright PDF; other original documents and the owner CV remain unchanged. Internship/gallery photos and technical imagery retain full framing, with the owner IESCO photograph first and POWERCHINA images presented as context.

Calculated token contrast across ink/surface/soft/state backgrounds is 13.63–17.11:1 for primary text, 7.25–9.10:1 for muted text and 7.66–9.62:1 for teal. Reference strong boundaries are 3.08–3.52:1 on ink/surface/soft backgrounds; against the state surface their 2.81:1 is insufficient for a required boundary, so accent feedback/focus supplies clear state identification where necessary. Decorative dividers remain distinct from required controls. Actual hover/selected/disabled/error states, keyboard focus, axe and representative visual inspection supplement token calculations; fresh results belong in [PROGRESS.md](PROGRESS.md), not historical counts below.

Short viewer entrances, arrow feedback and 2px fine-pointer/focus card emphasis remain finite and restrained. Content is visible before JavaScript; no observer reveals, scroll hijacking or continuous decoration is added. Changing reduced-motion preferences disables optional effects through CSS. Native-dialog semantics, persistent 44px controls, loading/error feedback, focus containment/restoration and safe no-JavaScript links are preserved. Preview/filter/navigation geometry stays stable; large originals load on request and below-fold images remain lazy.

## Historical Prompt 4 decision, now superseded

Prompt 4 temporarily introduced a white/light-cream/emerald system and transformer-second ordering. Prompt 5 explicitly restores the Phase 3 navy/teal reference and owner-selected first-four order, while retaining the portrait/direct-navigation/content/original-publication improvements. Previous cream contrast figures and visual-review claims describe that former build, not this release.

The earlier phase notes below are historical. Their monogram, Background menu, redacted-document and frozen-asset conventions remain superseded; only the selected Phase 3 visual language is restored.

## Historical design notes


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
