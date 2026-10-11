# Public asset curation — phase 1

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
