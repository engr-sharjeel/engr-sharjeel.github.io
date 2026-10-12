import type { ImageMetadata } from 'astro';
import renewableEnergy from '../assets/certificates/renewable-energy-fundamentals-original.jpg';
import electricIndustry from '../assets/certificates/electric-industry-operations-markets-original.jpg';
import electricalSafety from '../assets/certificates/electrical-safety-essentials-original.jpeg';
import nfpaSafety from '../assets/certificates/nfpa70e-workplace-safety-original.jpg';
import springCommendation from '../assets/certificates/air-university-commendation-spring2025-original.jpeg';
import fallCommendation from '../assets/certificates/air-university-commendation-fall2025-original.jpeg';
import ieeeRecognition from '../assets/certificates/ieee-recognition-2025-26-original.jpg';
import farewellAppreciation from '../assets/certificates/ece-farewell-appreciation-2026-original.jpeg';
import iescoInternship from '../assets/certificates/iesco-internship-2025-preview-page-1.png';
import powerchinaInternship from '../assets/certificates/powerchina-sepco1-internship-2024-preview-page-1.png';
import ieltsAcademic from '../assets/certificates/ielts-academic-2026-preview-page-1.png';
import campusAmbassador from '../assets/certificates/scholars-avenue-campus-ambassador-2026-preview-page-1.png';

export const credentialCategories = ['Courses', 'Internship', 'Language Qualification', 'Academic Commendations', 'Organisational Recognition'] as const;
export type CredentialCategory = typeof credentialCategories[number];

export interface CredentialImage {
  src: ImageMetadata;
  alt: string;
  caption: string;
  kind: 'certificate';
  focalPoint: string;
}

export interface CredentialRecord {
  slug: string;
  title: string;
  issuer: string;
  platform?: string;
  category: CredentialCategory;
  dateLabel: string;
  datePrecision: 'date' | 'date-range' | 'term' | 'year' | 'year-range' | 'month-range';
  issuedLabel?: string;
  context: string;
  image?: CredentialImage;
  verificationUrl?: string;
  printedName: string;
  original: { path: string; format: 'image' | 'pdf'; pageCount?: number; presentation?: 'upright' };
  previewPages?: CredentialImage[];
  role?: string;
  languageResult?: { testType: string; overallBand: number; scale: number; cefrLevel: string; components: { listening: number; reading: number; writing: number; speaking: number } };
  experienceId?: string;
  provenance: string[];
  evidenceNotes: string[];
}

const preview = (src: ImageMetadata, alt: string, caption: string): CredentialImage => ({ src, alt, caption, kind: 'certificate', focalPoint: '50% 50%' });

// These are canonical records, not one record per source copy. Internal
// provenance and evidenceNotes are never rendered by visitor-facing components.
export const certificates: CredentialRecord[] = [
  {
    slug: 'ielts-academic-2026',
    languageResult: { testType: 'IELTS Academic', overallBand: 7.5, scale: 9, cefrLevel: 'C1', components: { listening: 8.5, reading: 7.5, writing: 6.5, speaking: 6.5 } },
    title: 'IELTS Academic — overall band 7.5',
    issuer: 'IELTS',
    category: 'Language Qualification',
    dateLabel: '3 August 2026',
    datePrecision: 'date',
    issuedLabel: '4 August 2026',
    context: 'IELTS Academic test result: overall band 7.5 and printed CEFR level C1. Listening 8.5, Reading 7.5, Writing 6.5 and Speaking 6.5.',
    image: preview(ieltsAcademic, 'IELTS Academic Test Report Form for Muhammad Sharjeel, test date 3 August 2026, overall band 7.5.', 'IELTS Academic Test Report Form. The printed verification service is intended for recognising organisations.'),
    original: { path: '/credentials/ielts-academic-2026/original.pdf', format: 'pdf', pageCount: 1 },
    verificationUrl: 'https://ielts.org/verify',
    printedName: 'MUHAMMAD SHARJEEL',
    provenance: ['Certificates/IELTS/IELTS Result PK01526504295-03-08-2026-ETRF.pdf'],
    evidenceNotes: ['One-page original PDF visually reviewed; test type, scores, CEFR label and test/issue dates are printed.', 'Issuer is represented as IELTS; the listed partnership organisations do not establish a local test-provider assignment.', 'No expiry is inferred. The printed recognising-organisations verification link is not an independent validation claim.'],
  },
  {
    slug: 'scholars-avenue-campus-ambassador-2026',
    title: 'Scholars Avenue Campus Ambassador — Certificate of Participation',
    issuer: 'Scholars Avenue',
    category: 'Organisational Recognition',
    dateLabel: '27 July–8 October 2026',
    datePrecision: 'date-range',
    context: 'Certificate of Participation for working as a Scholars Avenue Campus Ambassador at Air University, Islamabad, from 27 July to 8 October 2026.',
    image: preview(campusAmbassador, 'Scholars Avenue Certificate of Participation awarded to Muhammad Sharjeel for Campus Ambassador service at Air University, Islamabad.', 'Campus Ambassador service, 27 July–8 October 2026. This is a leadership/community contribution.'),
    original: { path: '/credentials/scholars-avenue-campus-ambassador-2026/original.pdf', format: 'pdf', pageCount: 1 },
    printedName: 'Muhammad Sharjeel',
    role: 'Campus Ambassador',
    provenance: ['Certificates/Campus Ambassador/Muhammad Sharjeel_Campus Ambassador_SA.pdf', 'CV/Muhammad_Sharjeel_ATS_CV (2).pdf'],
    evidenceNotes: ['One-page original PDF visually reviewed; holder, issuer, role, institution and service dates are explicit.', 'Service dates are not an issue date; no additional duties or officer title are invented.'],
  },
  {
    slug: 'renewable-energy-fundamentals',
    original: { path: '/credentials/renewable-energy-fundamentals/original.jpg', format: 'image' },
    title: 'Renewable Energy Technology Fundamentals',
    issuer: 'University of Colorado Boulder',
    platform: 'Coursera',
    category: 'Courses',
    dateLabel: '2 April 2025',
    datePrecision: 'date',
    context: 'Completion of an online non-credit course authorised by the University of Colorado Boulder and offered through Coursera.',
    image: preview(renewableEnergy, 'University of Colorado Boulder course certificate for Renewable Energy Technology Fundamentals, awarded to Muhammad Sharjeel on 2 April 2025.', 'Course-completion certificate, with the supplied original content preserved.'),
    verificationUrl: 'https://coursera.org/verify/RNJBNNDWHUU7',
    printedName: 'Muhammad Sharjeel',
    provenance: ['Certificates/Courses/Coursera 1_page-0001.jpg', 'Everything/Certifications/Coursera 1_page-0001.jpg', 'Everything/Certifications/Coursera 1.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'electric-industry-operations-markets',
    original: { path: '/credentials/electric-industry-operations-markets/original.jpg', format: 'image' },
    title: 'Electric Industry Operations and Markets',
    issuer: 'Duke University',
    platform: 'Coursera',
    category: 'Courses',
    dateLabel: '26 March 2025',
    datePrecision: 'date',
    context: 'Completion of an online non-credit Duke University course on electric-industry operations and markets, offered through Coursera.',
    image: preview(electricIndustry, 'Duke University course certificate for Electric Industry Operations and Markets, awarded to Muhammad Sharjeel on 26 March 2025.', 'Course-completion certificate, with the supplied original content preserved.'),
    verificationUrl: 'https://coursera.org/verify/0TPXSEMUSH4V',
    printedName: 'Muhammad Sharjeel',
    provenance: ['Certificates/Courses/Coursera 2_page-0001.jpg', 'Everything/Certifications/Coursera 2_page-0001.jpg', 'Everything/Certifications/Coursera 2.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'electrical-safety-essentials',
    original: { path: '/credentials/electrical-safety-essentials/original.jpeg', format: 'image' },
    title: 'Essentials of Electrical Safety',
    issuer: 'Alison',
    category: 'Courses',
    dateLabel: '6 August 2025',
    datePrecision: 'date',
    context: 'Course completion covering electrical-safety principles and workplace practices.',
    image: preview(electricalSafety, 'Alison certificate for Essentials of Electrical Safety, awarded to Muhammad Sharjeel on 6 August 2025.', 'Alison electrical-safety course-completion certificate.'),
    verificationUrl: 'https://alison.com/certification/check/713535009e',
    printedName: 'MUHAMMAD SHARJEEL',
    provenance: ['Certificates/Courses/WhatsApp Image 2025-08-06 at 12.37.28 PM.jpeg', 'Everything/Certifications/WhatsApp Image 2025-08-06 at 12.37.28 PM.jpeg', 'Everything/Certifications/Alison_Certificate-5273-50990454.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Course completion is not professional licensure or authorisation for regulated work.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'nfpa70e-workplace-safety',
    original: { path: '/credentials/nfpa70e-workplace-safety/original.jpg', format: 'image' },
    title: 'NFPA 70E (2024) - Navigating Workplace Electrical Safety & Essential Updates',
    issuer: 'Alison',
    category: 'Courses',
    dateLabel: '11 August 2025',
    datePrecision: 'date',
    context: 'Completion of an Alison course addressing the NFPA 70E workplace electrical-safety standard and its 2024 updates.',
    image: preview(nfpaSafety, 'Alison certificate for NFPA 70E (2024) - Navigating Workplace Electrical Safety & Essential Updates, awarded to Muhammad Sharjeel on 11 August 2025.', 'Alison course completion, not an NFPA-issued qualification or professional licence.'),
    verificationUrl: 'https://alison.com/certification/check/6cf9f10e3b',
    printedName: 'MUHAMMAD SHARJEEL',
    provenance: ['Certificates/Courses/Alison_Certificate-6483-50990454_page-0001.jpg', 'Everything/Certifications/Alison_Certificate-6483-50990454_page-0001.jpg', 'Everything/Certifications/Alison_Certificate-6483-50990454.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'This is an Alison course-completion certificate, not professional licensure or an NFPA-issued certification.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'air-university-commendation-spring2025',
    original: { path: '/credentials/air-university-commendation-spring2025/original.jpeg', format: 'image' },
    title: 'Air University departmental Certificate of Commendation — Spring 2025',
    issuer: 'Air University, Department of Electrical and Computer Engineering',
    category: 'Academic Commendations',
    dateLabel: 'Spring 2025',
    datePrecision: 'term',
    context: 'Departmental academic commendation recognising dedication, hard work and academic achievement in Spring 2025.',
    image: preview(springCommendation, 'Original Air University Certificate of Commendation for M. Sharjeel, Spring 2025.', 'Spring 2025 departmental commendation, with the original award wording preserved.'),
    printedName: 'M. Sharjeel',
    provenance: ['Certificates/Appreciation/Certificate.jpeg', 'Everything/Certifications/Certificate.jpeg'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'The certificate prints SGPA 3.46, consistent with the portal Spring 2025 result.', 'Award wording does not establish a rank across the entire university.', 'Term label is not an issuance date.'],
  },
  {
    slug: 'air-university-commendation-fall2025',
    original: { path: '/credentials/air-university-commendation-fall2025/original.jpeg', format: 'image' },
    title: 'Air University departmental Certificate of Commendation — Fall 2025',
    issuer: 'Air University, Department of Electrical and Computer Engineering',
    category: 'Academic Commendations',
    dateLabel: 'Fall 2025',
    datePrecision: 'term',
    context: 'Departmental academic commendation recognising dedication, hard work and academic achievement in Fall 2025.',
    image: preview(fallCommendation, 'Original Air University Certificate of Commendation for Muhammad Sharjeel, Fall 2025.', 'Fall 2025 departmental commendation, with the original award wording preserved.'),
    printedName: 'Muhammad Sharjeel',
    provenance: ['Certificates/Appreciation/WhatsApp Image 2026-07-19 at 7.54.18 PM.jpeg', 'Everything/Certifications/WhatsApp Image 2026-07-19 at 7.54.18 PM.jpeg'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'The certificate prints SGPA 3.67 while the current portal report lists Fall 2025 SGPA 3.73; these remain separate source facts.', 'Award wording does not establish a rank across the entire university.', 'No issuance date is inferred from the WhatsApp filename.'],
  },
  {
    slug: 'ieee-recognition-2025-26',
    original: { path: '/credentials/ieee-recognition-2025-26/original.jpg', format: 'image' },
    title: 'IEEE Air University Certificate of Recognition, 2025–26',
    issuer: 'IEEE Air University',
    category: 'Organisational Recognition',
    dateLabel: '2025–26',
    datePrecision: 'year-range',
    context: 'Recognition for contributions, dedication, leadership, active engagement and commitment to the IEEE Air University community.',
    image: preview(ieeeRecognition, 'IEEE Air University Certificate of Recognition for 2025–26, presented to Muhammad Sharjeel.', 'Recognition for contributions and engagement in the IEEE Air University community.'),
    printedName: 'Muhammad Sharjeel',
    provenance: ['Certificates/Organisational/IEEE Certificate_page-0001.jpg', 'Everything/Certifications/IEEE Certificate_page-0001.jpg', 'Everything/Certifications/IEEE Certificate.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'The certificate does not establish a specific officer title.'],
  },
  {
    slug: 'ece-farewell-appreciation-2026',
    original: { path: '/credentials/ece-farewell-appreciation-2026/original.jpeg', format: 'image' },
    title: 'Certificate of Appreciation for organising Farewell 2026, ECE department',
    issuer: 'Air University ECE department / IEEE Air University',
    category: 'Organisational Recognition',
    dateLabel: 'Farewell 2026',
    datePrecision: 'year',
    context: 'Appreciation for contributing to the successful organisation of Farewell 2026 for the Electrical and Computer Engineering department.',
    image: preview(farewellAppreciation, 'Certificate of Appreciation for organising Farewell 2026 in the ECE department; the printed recipient name is Rao Sharjeel.', 'Appreciation for organising ECE Farewell 2026. The original printed recipient name is preserved.'),
    printedName: 'Rao Sharjeel',
    provenance: ['Certificates/Organisational/WhatsApp Image 2026-07-19 at 7.46.13 PM.jpeg', 'Everything/Certifications/WhatsApp Image 2026-07-19 at 7.46.13 PM.jpeg', 'Owner authorisation in website phase 2 instructions'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Owner identifies this sorted credential as their organisational contribution; printed-name variant is preserved without digital replacement.', 'No officer role or exact issuance date is established.'],
  },
  {
    slug: 'iesco-internship-2025',
    original: { path: '/credentials/iesco-internship-2025/original.pdf', format: 'pdf', pageCount: 1, presentation: 'upright' },
    title: 'IESCO Certificate of Internship',
    issuer: 'Islamabad Electric Supply Company (IESCO)',
    category: 'Internship',
    dateLabel: 'July–September 2025',
    datePrecision: 'month-range',
    issuedLabel: '16 September 2025',
    context: 'Completion of an eight-week engineering internship with Substation and Transmission Lines (SS&TL) and Protection and Instrumentation (P&I).',
    image: preview(iescoInternship, 'Upright IESCO internship certificate for Muhammad Sharjeel, documenting the 2025 SS&TL and P&I periods.', 'IESCO internship completion certificate, presented upright with the complete certificate content preserved.'),
    printedName: 'Muhammad Sharjeel',
    experienceId: 'iesco',
    provenance: ['Certificates/Internship certificates/Internship Certificate (IESCO).pdf', 'Everything/Documents/Scanned PDF/Internship Certificate (IESCO).pdf'],
    evidenceNotes: ['Visual review confirms 9 July–19 August 2025 in SS&TL and 20 August–2 September 2025 in P&I; the public summary uses the requested month range.', 'Certificate issue date is 16 September 2025; dateLabel represents internship period, not issuance.', 'Owner-authorised orientation-only public derivative: page rotation metadata changes from 90 degrees to 0, a 90-degree counterclockwise correction. All page-content and image streams are unchanged; the untouched source remains local.'],
  },
  {
    slug: 'powerchina-sepco1-internship-2024',
    original: { path: '/credentials/powerchina-sepco1-internship-2024/original.pdf', format: 'pdf', pageCount: 1 },
    title: 'POWERCHINA SEPCO1 Internship Completion',
    issuer: 'POWERCHINA SEPCO1',
    category: 'Internship',
    dateLabel: 'July–September 2024',
    datePrecision: 'month-range',
    context: 'Internship completion documenting exposure to project management, project procurement and project planning in an engineering power project.',
    image: preview(powerchinaInternship, 'Original POWERCHINA SEPCO1 internship completion letter for Muhammad Sharjeel.', 'POWERCHINA SEPCO1 internship completion record.'),
    printedName: 'Muhammad Sharjeel',
    experienceId: 'powerchina-sepco1',
    provenance: ['Certificates/Internship certificates/Internship Certificate (Power China).pdf', 'Everything/Documents/Scanned PDF/Internship Certificate (Power China).pdf'],
    evidenceNotes: ['Visual review confirms an internship from 1 July to 1 September 2024 and the three stated work areas.', 'This is an internship completion letter, not a course certificate, employment offer or professional licence.'],
  },
];

// One explicit order keeps group previews, filters and related records aligned.
export const credentialOrder = [
  'electric-industry-operations-markets',
  'renewable-energy-fundamentals',
  'nfpa70e-workplace-safety',
  'electrical-safety-essentials',
  'iesco-internship-2025',
  'powerchina-sepco1-internship-2024',
  'ielts-academic-2026',
  'air-university-commendation-fall2025',
  'air-university-commendation-spring2025',
  'scholars-avenue-campus-ambassador-2026',
  'ieee-recognition-2025-26',
  'ece-farewell-appreciation-2026',
] as const;

const priorities = new Map<string, number>(credentialOrder.map((slug, index) => [slug, index]));
export function sortCredentials(records: readonly CredentialRecord[]): CredentialRecord[] {
  return [...records].sort((a, b) => (priorities.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (priorities.get(b.slug) ?? Number.MAX_SAFE_INTEGER) || a.slug.localeCompare(b.slug));
}
