# Phase 2 education and credential audit

This supplements [SOURCE-AUDIT.md](SOURCE-AUDIT.md). Originals remain intact in ignored source locations. The current student-portal report and owner-selected certificate organisation resolve specific phase-1 omissions; they do not change the REEV academic project to FYP-2 complete.

## Source protection and review

`Grade Report - STUDENT_PORTAL.pdf`, `Certificates.zip`, `/Certificates/`, and possible directly extracted `/Courses/`, `/Appreciation/` and `/Organisational/` paths are protected by anchored ignores. The archive was extracted into `Certificates/` only after every member's resolved path was checked against that destination. No private original is a public download.

PyMuPDF supplied searchable grade-report text and local rendered review pages. Pillow created flattened RGB PNG public previews at the input resolution, with opaque destructive masks and no retained EXIF or document text layers. All extraction, raw text, inspection images and tooling stay in ignored `.tmp/`. The safe local `.tmp/credentials-audit.json` records source/public hashes, dimensions and redaction rectangles without reproducing private field values.

Each original credential and every resulting public preview was visually inspected. The only image imports available to the credential collection are the reviewed copies in `src/assets/certificates/`. All optimised thumbnails, viewer images and JavaScript-disabled links must derive from those same safe copies. There is no hidden unredacted large image or PDF fallback.

## Education facts and limits

The five-page portal report shows Muhammad Sharjeel at Air University Islamabad with **CGPA 3.10** and header session **Fall 2026**. The four-point scale is supported by its course table: an A carries four grade points per credit. Use this explicitly stated current CGPA; do not average term SGPAs, recompute repeated courses or use the older CV figures.

The report contains seven term records. Its sequential “Semester” numbers include a summer session and are not reinterpreted as conventional academic semesters:

| Term | Reported SGPA |
| --- | --- |
| Fall 2023 | 2.94 |
| Spring 2024 | 2.78 |
| Fall 2024 | 2.65 |
| Spring 2025 | 3.46 |
| Summer 2025 | 2.33 |
| Fall 2025 | 3.73 |
| Spring 2026 | 3.02 |

There is no Fall 2026 results table. The report footer explicitly says the student-portal report is not valid for academic evaluation. It is evidence for the site's selected academic summary, not a certified transcript, awarded degree or graduation confirmation. The public page omits the full grade history and the raw report.

CVs and project sources establish Electrical (Power) Engineering undergraduate study, September 2023–present; no confirmed graduation date is supplied. CVs also support Intermediate studies at Nishat College of Science for Boys, Multan, 2021–2023, without invented grades or board details.

Exact supported course names are centralised in `src/data/education.ts`. Selected A highlights: Microprocessors & Microcontrollers and its Lab; Power Distribution and Utilization Systems; Power Generation Systems and its Laboratory; Electronic Circuit Design; Electrical Measurements and Instrumentation; Signals and Systems. Highlighting these selected courses does not imply that all course grades were A.

Course/project connections have evidence: microcontroller coursework to EVM/SAMS, instrumentation to the robot, Electrical Machines to the transformer, and the hydro poster's explicit Power Generation Systems course heading to the micro-hydro design. Computing/drawing work is linked only to the corresponding supported academic entries. General focus-area groupings are editorial organisation, not new course associations.

## Deduplicated credential inventory

All eight sorted certificate images are **byte-identical SHA256 duplicates** of the corresponding `Everything/Certifications/` images. Their owner-selected folders improve organisation, rather than adding eight credentials. Two distinct internship-completion documents in `Everything/Documents/Scanned PDF/` add two supported Internship records. The canonical total is **10**: **4 Courses, 2 Academic Commendations, 2 Organisational Recognition, 2 Internship**.

| Canonical public record / filename stem | Sorted source | Original source mapping | Date precision and decision |
| --- | --- | --- | --- |
| `renewable-energy-fundamentals` | `Courses/Coursera 1_page-0001.jpg` | Same image and `Coursera 1.pdf` | University of Colorado Boulder through Coursera, 2 April 2025; online non-credit course completion. |
| `electric-industry-operations-markets` | `Courses/Coursera 2_page-0001.jpg` | Same image and `Coursera 2.pdf` | Duke University through Coursera, 26 March 2025; online non-credit course completion. |
| `electrical-safety-essentials` | `Courses/WhatsApp Image 2025-08-06 at 12.37.28 PM.jpeg` | Same image and corresponding Alison PDF | Alison, 6 August 2025; course completion, not professional licensure. |
| `nfpa70e-workplace-safety` | `Courses/Alison_Certificate-6483-50990454_page-0001.jpg` | Same image and corresponding Alison PDF | Alison, 11 August 2025; preserve original title punctuation. An Alison course, not NFPA-issued certification or regulated-work authorisation. |
| `air-university-commendation-spring2025` | `Appreciation/Certificate.jpeg` | Same image | Spring 2025 term label, not an inferred issuance date; certificate SGPA 3.46 agrees with portal. |
| `air-university-commendation-fall2025` | `Appreciation/WhatsApp Image 2026-07-19 at 7.54.18 PM.jpeg` | Same image | Fall 2025 term label; certificate SGPA 3.67 remains printed, while current portal reports 3.73. Do not infer issue date from filename. |
| `ieee-recognition-2025-26` | `Organisational/IEEE Certificate_page-0001.jpg` | Same image and `IEEE Certificate.pdf` | 2025–26 recognition period; contributions, dedication, leadership and engagement, with no specific officer title established. |
| `ece-farewell-appreciation-2026` | `Organisational/WhatsApp Image 2026-07-19 at 7.46.13 PM.jpeg` | Same image | Farewell 2026 event label; the phase-2 owner instruction authorises inclusion. Printed recipient **Rao Sharjeel** is preserved as a name variant, not digitally replaced. No officer role or exact issue date inferred. |
| `iesco-internship-2025` | Not in the sorted archive | `Internship Certificate (IESCO).pdf` | July–September 2025 internship; scan supports 9 July–2 September, eight weeks and SS&TL/P&I periods. Issue date is a separate 16 September 2025 fact. |
| `powerchina-sepco1-internship-2024` | Not in the sorted archive | `Internship Certificate (Power China).pdf` | July–September 2024 internship; document supports 1 July–1 September and project management, procurement and planning. |

Sorted paths are relative to `Certificates/`; original same-image/course-PDF paths are relative to `Everything/Certifications/`. Internship original paths are relative to `Everything/Documents/Scanned PDF/`. Each public asset uses the descriptive stem above plus `-public.png`.

## Public preview privacy decisions

- Both commendations: opaque masks cover the entire parent-name and registration fields, including handwriting descenders, and issuer-signature areas. Award heading, recipient, term and original SGPA remain visible. These do not establish an institution-wide rank.
- Coursera course copies: issuer signatures are masked; university/platform credits, course titles, recipient, dates and supplied public verification URLs remain readable.
- Alison course copies: account/course-number blocks, unreviewed QR payloads and issuer signatures are masked. The owner-approved plain verification links remain readable. Course titles and award dates are preserved.
- IEEE and Farewell copies: issuer signatures are masked; legitimate award prose and the original recipient names remain intact. Recognition does not establish an officer role.
- IESCO: orient the sideways scan, then mask family detail, signature, certificate identifier and contact/address block. Internship wording, recipient and dates remain readable.
- POWERCHINA SEPCO1: mask signature, signatory's personal phone number and office-address footer. Preserve professional signatory credit and supported internship wording. This is an internship-completion letter, not an offer letter or course certificate.

These are clearly labelled **Privacy-redacted public previews**, with masks flattened into every linked image. No original CV, portal report, private source letter, identity/school record, recommendation, funding/payment record or raw internship report is published by this credential work.

## Verification-link check and unresolved facts

The four public verification URLs were compared visually with the certificate text and retained exactly as supplied. On 11 October 2026 the available web tool could not fetch either Coursera page (cache miss) and rejected access to both Alison check pages. Therefore the site offers “Verify credential” links without claiming that the credentials were independently verified during implementation.

The Fall 2025 certificate/report SGPA difference remains unresolved: the historical award image prints 3.67; the current portal reports 3.73. The current overall CGPA is resolved at 3.10/4.00, and the owner has resolved inclusion of the Rao Sharjeel Farewell name variant. There is no reason to ask those resolved questions again. Transformer measured ratings/tests, SAMS hardware status, robot test conditions, conference details and unestablished individual contributions remain separate project/research evidence questions.
