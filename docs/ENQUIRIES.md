# Services and project enquiries

## Page structure

About keeps its introduction/background, then exposes **Services & project enquiries** at `/about/#services`: a semantic table with six supported service definitions and a compact native form immediately beneath it at `#project-enquiry`. Each service links to actual portfolio evidence. Small-screen records retain the table's caption, column meanings and reading order. The introduction links directly to this section.

Contact opens with the visitor's task, then puts the expanded brief in the larger column and direct contact alongside it. Mobile stacks the form before direct options. Three next-step cards explain review, scope discussion and agreement without promising a response time or booking. A supporting section links services, projects and the supplied CV. The homepage enquiry action follows the unchanged tools/skills section.

The utility `/contact/thanks/` page contains no submitted values. It explicitly distinguishes a submission return from confirmed inbox delivery or a booking, carries `noindex, follow` and is excluded from the sitemap. It reuses Contact's social image.

## Canonical records and evidence

`src/data/services.ts` is the sole source for service IDs, titles, support, deliverables and evidence links; the service table and form selector reuse it. These are preliminary/project-support offerings grounded in academic work and tools, not claims of professional licensure, commercial history or a launched REEV conversion business.

| Service ID | Evidence |
| --- | --- |
| `power-systems` | Substation/distribution design; fabricated transformer |
| `renewable-energy` | Micro hydropower design study |
| `circuit-pcb` | PCB layout practice; Electronic Voting Machine schematic/prototype |
| `embedded-systems` | Navigation robot; SAMS schematic-based design |
| `matlab-analysis` | MATLAB signal-calculator coursework |
| `cad-documentation` | SolidWorks drawing/model practice |

Existing `SOURCE-AUDIT.md`, case-study notes and canonical project records support the scope. Prices, delivery promises, testimonials and expert ratings are omitted. Scope, availability, delivery format and cost are discussed after the brief is reviewed. `other` is available for general enquiries/collaboration.

## Native delivery and progressive validation

Both variants render `ProjectEnquiryForm.astro` using configuration in `src/data/enquiry.ts`. Native `POST` goes to **https://formsubmit.co/engr.muhammadsharjeel@gmail.com**. The endpoint derives from the configured public recipient in `site.ts`; no mail password, API secret or application server is involved.

The integration follows [FormSubmit's native setup](https://formsubmit.co/) and [official field documentation](https://formsubmit.co/documentation): `email` supplies the visitor's reply address; `_subject` gives a descriptive subject; `_template=table`; `_honey` is a hidden honeypot; `_next` is an absolute production/base-aware return URL. Default provider spam verification is retained. No CC, auto-response, public submission list, webhook, uploads or marketing subscription is added. FormSubmit processes the submitted details; the form links its [privacy information](https://formsubmit.co/privacy.pdf).

Core delivered names are `service`, `name`, `email`, `preferred_contact`, `phone`, `message` and `source_page`. Expanded optional fields are `project_title`, `organisation`, `timeframe`, `budget_currency`, `budget_estimate` and `reference_url`. Fields have explicit labels, limits, hints and unique IDs. The source page is a canonical path, never a copy of a query string containing visitor information.

Small page-scoped JavaScript trims/validates required values, email, HTTP(S) reference links and international phone formatting, adds inline errors with an accessible focusable summary, and requires a number for Phone/WhatsApp preferences. It whitelists service query values using actual selector options and safely sets control values. Row actions select the service and focus the local selector. Without JavaScript, all fields/native constraints and normal Email-based POST remain available; visitors are told to provide a number for phone-based preferences.

Only a valid submission locks the submit button; field values remain enabled and are included in the POST. Validation failures and browser `pageshow`/back navigation restore a usable button. There is no optimistic success message or clearing of the brief. The browser/provider handles the normal POST response; after a provider/network failure, visitors can return to retry or use email/WhatsApp. No enquiry values are written to URLs, console, storage, analytics, static files or repository records.

## Activation and real receipt: pending owner check

There was no pre-existing delivery configuration or owner-confirmed receipt in the repository. An activation state cannot be established from static HTML or by reading the public endpoint. No real submission or activation email is sent by implementation/automated tests, and no unrelated mailbox is accessed.

After deployment, the owner must complete these steps:

1. Submit one clearly labelled **TEST** enquiry from the live form.
2. Open the FormSubmit activation email in **engr.muhammadsharjeel@gmail.com** and confirm it. Check spam/junk if necessary.
3. Submit another **TEST** enquiry, verify the complete message arrives, and confirm that replying targets the submitted visitor email.

Interface/build/browser verification and deployed endpoint configuration are separate from recipient activation and confirmed real receipt. The latter two remain pending until the owner reports them. Direct-contact methods work independently of activation.

## Verification and publishing

`npm.cmd run test:enquiry` uses the same `PORTFOLIO_TEST_URL` origin/base override as other browser suites. All FormSubmit requests are intercepted; only synthetic data is used. Test reports contain assertion results, not submitted contact/brief payloads. Temporary screenshots/reports stay ignored. Tests must never send an actual POST to the provider.

Production output checks retain every original portrait/credential/CV safeguard and add explicit native action/method/fields/return checks. All 19 project routes remain; the utility route makes **30 HTML pages**, while sitemap inventory remains **28 indexable pages**. Root and subpath fixtures exercise anchors, preselection and return URLs from HTTP previews. Fresh result counts and deployment SHA/run belong in `PROGRESS.md`.
