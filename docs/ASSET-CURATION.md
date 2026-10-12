# Approved public assets: Prompt 5 refinements

Prompt 4 explicitly authorised publication of the supplied certificate originals, replacement CV, portrait and internship photographs, including printed signatures, seals, identifiers and other document content. Prompt 5 retains that scope, replaces the portrait with the current owner source and authorises an orientation-only IESCO certificate derivative. These decisions supersede the earlier certificate-redaction/generated-CV scope; historical notes below describe prior decisions rather than current publication rules. Raw trees, archives, transcript and unrelated originals stay ignored and intact.

## Current source-to-public mapping

The actual root source folders are IESCO, Power china internship, Profile Picture, Certificates and CV. Every organised certificate subfolder was audited: Courses, Internship certificates, IELTS, Appreciation, Campus Ambassador and Organisational. Twelve distinct credentials remain after content/issuer/title/term deduplication: four courses, two internships, one IELTS Academic, two commendations and three community records. The earlier ten records are retained; alternate Everything scans and old masked copies do not create additional credentials.

| Owner source | Stable public original | Format |
| --- | --- | --- |
| `Certificates/Courses/Coursera 2_page-0001.jpg` | `public/credentials/electric-industry-operations-markets/original.jpg` | Original image |
| `Certificates/Courses/Coursera 1_page-0001.jpg` | `public/credentials/renewable-energy-fundamentals/original.jpg` | Original image |
| `Certificates/Courses/Alison_Certificate-6483-50990454_page-0001.jpg` | `public/credentials/nfpa70e-workplace-safety/original.jpg` | Original image |
| `Certificates/Courses/WhatsApp Image 2025-08-06 at 12.37.28 PM.jpeg` | `public/credentials/electrical-safety-essentials/original.jpeg` | Original image |
| `Certificates/Internship certificates/Internship Certificate (IESCO).pdf` | `public/credentials/iesco-internship-2025/original.pdf` | Upright orientation-only PDF derivative, 1 page |
| `Certificates/Internship certificates/Internship Certificate (Power China).pdf` | `public/credentials/powerchina-sepco1-internship-2024/original.pdf` | PDF, 1 page |
| `Certificates/IELTS/IELTS Result PK01526504295-03-08-2026-ETRF.pdf` | `public/credentials/ielts-academic-2026/original.pdf` | PDF, 1 page |
| `Certificates/Appreciation/WhatsApp Image 2026-07-19 at 7.54.18 PM.jpeg` | `public/credentials/air-university-commendation-fall2025/original.jpeg` | Original image |
| `Certificates/Appreciation/Certificate.jpeg` | `public/credentials/air-university-commendation-spring2025/original.jpeg` | Original image |
| `Certificates/Campus Ambassador/Muhammad Sharjeel_Campus Ambassador_SA.pdf` | `public/credentials/scholars-avenue-campus-ambassador-2026/original.pdf` | PDF, 1 page |
| `Certificates/Organisational/IEEE Certificate_page-0001.jpg` | `public/credentials/ieee-recognition-2025-26/original.jpg` | Original image |
| `Certificates/Organisational/WhatsApp Image 2026-07-19 at 7.46.13 PM.jpeg` | `public/credentials/ece-farewell-appreciation-2026/original.jpeg` | Original image |

Eleven certificate public originals match source SHA-256 hashes. The eight JPEG/image previews use identical source bytes before responsive delivery. All four certificate PDFs are one page, with complete faithful PNG previews and full-document access. The IESCO public PDF is the explicit orientation-only exception detailed below; its complete preview is newly rendered upright. No signatures, seals, identifiers, text, margins or colours are edited. All ten obsolete masked source PNGs remain absent from application assets. The explicit version-2 manifest validates public paths/hashes/formats/page counts, preview hashes/dimensions and approved portrait/photo copies, recording separate source/public information for IESCO; builds continue to reject unlisted documents and obsolete masked outputs.

## IESCO upright publication derivative

Visual inspection establishes a 90° counterclockwise correction: source PDF page rotation metadata is 90°, and the public derivative changes it to 0°. The page is landscape 842 × 595 points; the new full-page preview is 1684 × 1190px. This is PDF page-rotation correction, not CSS rotation, cropping, raster replacement or document recreation. Card, viewer and PDF presentation therefore agree without a second rotation.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| Untouched local supplied PDF | `f4cad91578537542d9bc1e835a613b2847c56bf4acae232f92108e3509063b94` | 68,358 |
| Published upright PDF | `65035e71638adce66b08ac3c9847f92298e993657ea0d01c54291fdd97e9e22d` | 67,890 |

The source remains intact in the ignored `Certificates/Internship certificates/` folder. PyMuPDF comparison confirms unchanged page content and all 22 raw embedded-image streams, alongside the single preserved page. The optional manifest `orientationCorrection` records source and published hashes plus preservation evidence; the public PDF and upright preview retain independent allowlist hashes/dimensions. The legacy public filename `original.pdf` stays stable for existing links, but the public action is accurately labelled **Open upright PDF**. It is not described as a byte-identical unmodified original. Other certificate documents and the supplied CV remain unchanged.

## Supplied CV

Only one owner CV exists in the root CV tree: `CV/Muhammad_Sharjeel_ATS_CV (2).pdf`. Both pages were visually reviewed. The unchanged two-page, 90,991-byte PDF is published at `public/downloads/muhammad-sharjeel-cv.pdf`; SHA-256 `36817b31517fdc188c7d8a6df4453803ea685c6d52112b1d8311542f7c777a44`. The old generated CV is replaced and `generate:resume` is guarded/retired so it cannot overwrite the supplied PDF.

Source conflicts: the supplied final CV retains historical two-seater wording on both pages and a printed phone that differs from the current number explicitly supplied in Prompt 4. Its email matches the configured email. The PDF is deliberately unchanged under the owner's explicit instruction. Current website HTML, research summaries, metadata and social graphics use the corrected limited-charging/REEV-conversion direction; Contact/footer/Person data use the requested current phone. A revised owner PDF would resolve these document-only conflicts. PCB design is explicitly named in this CV, resolving the owner's ECB wording to PCB design; SCADA systems is separately owner-supplied.

## Portrait and internship images

| Source | Application copy | Pixels / use |
| --- | --- | --- |
| `Profile Picture/Polished studio portrait with side-swept hair.png` | `src/assets/profile/muhammad-sharjeel-portrait.png` | 1024 × 1536; complete 2:3 hero and vertical header derivatives |
| `IESCO/WhatsApp Image 2026-10-11 at 2.59.36 PM.jpeg` | `src/assets/experience/iesco-grid-station-portrait.jpeg` | 900 × 1600; first IESCO gallery image, contained full portrait |
| `Power china internship/1967127-image-1557165140.jpg.jpeg` | `src/assets/experience/powerchina-project-dam-context.jpeg` | 800 × 600; project context |
| `Power china internship/6175ce88e6f10.jpg.jpeg` | `src/assets/experience/powerchina-project-construction-context.jpeg` | 1024 × 768; construction context |
| `Power china internship/images.jpg.jpeg` | `src/assets/experience/powerchina-project-night-context.jpeg` | 516 × 387; further context |

The current portrait source SHA-256 is `b144d7394e8c96e7cd56545c023522d9d8f025c5cbc27012c4510877e9bde259`, and the application copy retains those exact bytes/dimensions. It replaces the earlier Prompt 4 `Realistic studio portrait in blazer and tie.png` mapping. The source remains local and intact; no AI generation, face/clothing/background alteration, extension or upscaling is applied. Both hero and header use `contain` at the source's 2:3 ratio, preserving head, collar, tie knot and visible clothing rather than using a square/circular crop. Header frames are 48 × 72px on phones and 60 × 90px otherwise; the hero panel caps at 420px with a 418px inner image slot. Imported-byte changes produce new Astro derivative URLs instead of reusing the former portrait.

The four internship-image copies remain unchanged, with full framing available through the viewer and source-capped delivery. Existing battery-bank/transformer-yard photographs follow the owner IESCO photo. POWERCHINA images establish context only, not a specific assignment, photographer, commissioning or personal construction contribution.

IELTS Academic: test 3 August 2026, issued 4 August 2026, overall 7.5/9 and printed CEFR C1; Listening 8.5, Reading 7.5, Writing 6.5 and Speaking 6.5. The actual source remains the unchanged one-page PDF with SHA-256 `dac3883224253cb55aa8ba87864352ca7a314b93a1f951dbc06401e86af0e147`. Its canonical credential now supplies structured result data to the compact Education panel immediately after the degree overview; there is no additional credential or duplicated score record, inferred expiry or independent-verification claim. The Certificates page's order, groups, dates, issuer information, filters and verification destinations are retained.

Campus Ambassador: Scholars Avenue participation at Air University, Islamabad, 27 July–8 October 2026. Neither record adds an engineering internship or professional licence. The Fall 2025 award/report discrepancy and all other deferred engineering facts remain unresolved. Verification URLs are source links, not newly claimed independent verification.

## Historical asset decisions

The following Phase 1–3 publication restrictions and initial seating/portrait descriptions are historical. The current approved scope and owner corrections above take precedence; they do not undo unrelated project-image sanitization or permit raw source trees/transcript publication.

Phase 2 adds ten **privacy-redacted public credential PNGs** and a newly generated, reviewed **two-page public CV**. The full mappings/redaction decisions are in [PHASE2-SOURCE-AUDIT.md](PHASE2-SOURCE-AUDIT.md), with public review hashes in `src/data/public-assets.json`. Original scans, portal report and source CVs remain private and ignored. The phase-1 decisions below are historical; only the reviewed public derivatives are new application inputs. Twenty-eight local social PNGs contain public names/titles/status rather than source documents.

All 18 JPEGs in `LinkedIn projects`, all nine JPEGs in `Everything/Internship Pictures`, and the three supporting transformer images in `Everything/EM Project` were inspected visually. The application receives 15 selected project images and two internship context images. Originals remain intact in their ignored source trees. No document scan, certificate scan, identity image, CV or acceptance/payment letter is a public asset.

Copies retain their original pixel dimensions. A fresh JPEG encoding at quality 97 removes source EXIF and other embedded metadata. This is a local sanitization step; it creates no new hardware or technical evidence. Astro should produce responsive delivery sizes from these curated sources. Small source diagrams cannot gain genuine detail by enlargement.

## Exact project mapping

Source paths below are relative to `LinkedIn projects/`; curated paths are relative to `src/assets/projects/`. `Cover` marks the provisional card-image choice, not another source of project facts.

| Project/source | Curated path | Pixels | Kind | Cover |
| --- | --- | --- | --- | --- |
| `FYP/1791017339497.jpg` | `range-extended-electric-vehicle/reev-concept-illustration.jpg` | 1280 × 720 | Concept illustration | Yes |
| `FYP/1791017338280.jpg` | `range-extended-electric-vehicle/series-architecture.jpg` | 1191 × 896 | Architecture diagram | No |
| `FYP/1791017338295.jpg` | `range-extended-electric-vehicle/soc-control-flowchart.jpg` | 1264 × 843 | Conceptual flowchart | No |
| `Hydro Power plant/1784472239089.jpg` | `micro-hydropower-plant/hydropower-system-illustration.jpg` | 603 × 224 | System illustration | Yes |
| `Hydro Power plant/1784472238828.jpg` | `micro-hydropower-plant/site-design-illustration.jpg` | 592 × 195 | Site/design illustration | No |
| `Autonomous Multi-Sensor Navigation Robot/1772576642824.jpg` | `autonomous-navigation-robot/robot-side-view.jpg` | 1280 × 960 | Hardware photograph | Yes |
| `Autonomous Multi-Sensor Navigation Robot/1772576642957.jpg` | `autonomous-navigation-robot/robot-top-view.jpg` | 1280 × 960 | Hardware photograph | No |
| `Electronic Voting Machine/1769793422440.jpg` | `electronic-voting-machine/voting-machine-prototype.jpg` | 1156 × 867 | Hardware photograph | Yes |
| `Electronic Voting Machine/1769793422406.jpg` | `electronic-voting-machine/push-button-hardware.jpg` | 800 × 1066 | Hardware photograph | No |
| `Electronic Voting Machine/1769793422313.jpg` | `electronic-voting-machine/voting-machine-schematic.jpg` | 629 × 346 | Proteus schematic | No |
| `Single-Phase Center-Tapped Transformer/1769332272585.jpg` | `center-tapped-transformer/fabricated-transformer.jpg` | 429 × 418 | Sanitized hardware photograph | Yes |
| `Single-Phase Center-Tapped Transformer/1769332272157.jpg` | `center-tapped-transformer/transformer-grid-context.jpg` | 621 × 189 | Educational diagram | No |
| `Single-Phase Center-Tapped Transformer/1769332272472.jpg` | `center-tapped-transformer/transformer-principle.jpg` | 633 × 352 | Educational diagram | No |
| `Single-Phase Center-Tapped Transformer/1769332272479.jpg` | `center-tapped-transformer/transformer-design-flowchart.jpg` | 666 × 464 | Design flowchart | No |
| `Smart Access & Monitoring System (SAMS)/1769501887093.jpg` | `smart-access-monitoring-system/sams-proteus-schematic.jpg` | 1280 × 699 | Sanitized Proteus schematic | Yes |

## Sanitization decisions

Redactions use coordinates in the original image pixel grid. Sanitized outputs were inspected visually after processing; the removed information is absent and technical labels outside the noted areas remain visible.

- `series-architecture.jpg`: a white rectangle at x=1049, y=707, width=97, height=29 removes a sister-group identifier from the legend. The remaining legend reads that the marked scope is managed by a sister group; no power/control arrow is removed.
- `fabricated-transformer.jpg`: an opaque color-matched patch covers the winding label's handwritten names and registration identifiers. Polygon vertices are (183,210), (310,185), (310,289), (183,313). The patch deliberately hides the label; it does not infer the obscured hardware or create a new component. Core laminations, mounting brackets, winding outline and wire ends remain visible. Verified team credits belong in the written project record.
- `sams-proteus-schematic.jpg`: white rectangles at x=658, y=643, width=244, height=20 and x=906, y=675, width=76, height=17 remove the local filesystem path and timestamp. Circuit wiring, component labels and the drawing title remain visible.

The other selected images require no in-image redaction. No selected photograph contains an identifiable person's face or a private document. Non-personal component values, circuit labels and battery manufacturer's technical markings remain intact.

## Omissions and duplicate handling

- `Electronic Voting Machine/1769793422211.jpg`: omitted as a redundant hardware view, with small unrelated printed paper at the lower edge. The selected overview and button close-up provide clearer evidence.
- `Electronic Voting Machine/1769793422295.jpg`: omitted as a near-duplicate overview; `1769793422440.jpg` supplies the same implemented-hardware context.
- `Hydro Power plant/1784472239613.jpg`: poster inspected but omitted from phase-1 public assets because its student credit strip contains registration identifiers. Its wording also presents output as actual, while owner-supplied facts establish a design study. The two selected illustrations carry the initial page without exposing the poster. Any future derivative needs privacy redaction and a caption explicitly identifying its energy/cost figures as design estimates.
- `Everything/EM Project/WhatsApp Image 2026-01-25 at 1.55.03 PM.jpeg`, `1.55.37 PM.jpeg` and `1.56.27 PM.jpeg`: visually duplicate the selected transformer flowchart, principle diagram and grid-context diagram, respectively. One curated copy of each is sufficient.

## Experience context selection

These assets support internship observation and exposure. They must not be listed as independent designed/commissioned projects or as proof that the owner operated equipment without supervision.

| Source under `Everything/Internship Pictures/` | Curated path | Pixels | Suggested caption |
| --- | --- | --- | --- |
| `WhatsApp Image 2025-08-25 at 9.05.22 AM (1).jpeg` | `src/assets/experience/iesco-battery-bank.jpg` | 4032 × 3024 | Battery systems observed during the IESCO internship. |
| `WhatsApp Image 2025-08-19 at 9.34.32 AM (1).jpeg` | `src/assets/experience/iesco-transformer-yard.jpg` | 4032 × 3024 | Grid-station equipment observed during the IESCO internship. |

Both are equipment-only images, need no in-image redaction, and receive the same metadata-stripping treatment. The remaining seven photos are omitted: additional battery/site views are redundant, a close-up carries an equipment contract plate, and the portrait's identity has not been established for publication. This does not substitute for the profile photo the owner will supply later.

## Framing and evidence limits

Hardware card photos can use restrained cover crops. Suggested focal positions: robot side 58% 57%, voting-machine overview 50% 48%, transformer 48% 50%, transformer-yard context 60% 40%. Show photographs in full on detail pages when practical. All diagrams, schematics, flowcharts and labelled illustrations need `contain` framing with a neutral light matte; preserve their labels and aspect ratios.

The REEV cutaway is a concept illustration of a series architecture, not a photograph of the finished two-seat project vehicle. Its SOC flowchart is a conceptual operating sequence, not evidence of completed embedded control. Hydro site/system imagery illustrates a design and cannot establish construction or commissioning. Transformer grid-context voltages are general educational examples, not the fabricated transformer's output specification. The SAMS image establishes a Proteus schematic, not a physical implementation. Keep these distinctions in public captions and page status.

Local ignored extraction records `.tmp/asset-audit.json` and `.tmp/experience-asset-audit.json` preserve full alt-text, dimensions, focal points and sanitization metadata during the phase. The application content model is the authoritative visitor-facing image metadata source.
