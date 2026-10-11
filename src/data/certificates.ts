import type { ImageMetadata } from 'astro';
import renewableEnergy from '../assets/certificates/renewable-energy-fundamentals-public.png';
import electricIndustry from '../assets/certificates/electric-industry-operations-markets-public.png';
import electricalSafety from '../assets/certificates/electrical-safety-essentials-public.png';
import nfpaSafety from '../assets/certificates/nfpa70e-workplace-safety-public.png';
import springCommendation from '../assets/certificates/air-university-commendation-spring2025-public.png';
import fallCommendation from '../assets/certificates/air-university-commendation-fall2025-public.png';
import ieeeRecognition from '../assets/certificates/ieee-recognition-2025-26-public.png';
import farewellAppreciation from '../assets/certificates/ece-farewell-appreciation-2026-public.png';
import iescoInternship from '../assets/certificates/iesco-internship-2025-public.png';
import powerchinaInternship from '../assets/certificates/powerchina-sepco1-internship-2024-public.png';

export const credentialCategories = ['Courses', 'Academic Commendations', 'Organisational Recognition', 'Internship'] as const;
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
  datePrecision: 'date' | 'term' | 'year-range' | 'month-range';
  context: string;
  image?: CredentialImage;
  verificationUrl?: string;
  printedName: string;
  publicPreviewLabel?: string;
  experienceId?: string;
  provenance: string[];
  evidenceNotes: string[];
}

const preview = (src: ImageMetadata, alt: string, caption: string): CredentialImage => ({ src, alt, caption, kind: 'certificate', focalPoint: '50% 50%' });
const publicPreviewLabel = 'Privacy-redacted public preview';

// These are canonical records, not one record per source copy. Internal
// provenance and evidenceNotes are never rendered by visitor-facing components.
export const certificates: CredentialRecord[] = [
  {
    slug: 'renewable-energy-fundamentals',
    title: 'Renewable Energy Technology Fundamentals',
    issuer: 'University of Colorado Boulder',
    platform: 'Coursera',
    category: 'Courses',
    dateLabel: '2 April 2025',
    datePrecision: 'date',
    context: 'Completion of an online non-credit course authorised by the University of Colorado Boulder and offered through Coursera.',
    image: preview(renewableEnergy, 'University of Colorado Boulder course certificate for Renewable Energy Technology Fundamentals, awarded to Muhammad Sharjeel on 2 April 2025.', 'Course-completion certificate. The issuer signature is redacted in this public copy.'),
    verificationUrl: 'https://coursera.org/verify/RNJBNNDWHUU7',
    printedName: 'Muhammad Sharjeel',
    publicPreviewLabel,
    provenance: ['Certificates/Courses/Coursera 1_page-0001.jpg', 'Everything/Certifications/Coursera 1_page-0001.jpg', 'Everything/Certifications/Coursera 1.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'electric-industry-operations-markets',
    title: 'Electric Industry Operations and Markets',
    issuer: 'Duke University',
    platform: 'Coursera',
    category: 'Courses',
    dateLabel: '26 March 2025',
    datePrecision: 'date',
    context: 'Completion of an online non-credit Duke University course on electric-industry operations and markets, offered through Coursera.',
    image: preview(electricIndustry, 'Duke University course certificate for Electric Industry Operations and Markets, awarded to Muhammad Sharjeel on 26 March 2025.', 'Course-completion certificate. The issuer signature is redacted in this public copy.'),
    verificationUrl: 'https://coursera.org/verify/0TPXSEMUSH4V',
    printedName: 'Muhammad Sharjeel',
    publicPreviewLabel,
    provenance: ['Certificates/Courses/Coursera 2_page-0001.jpg', 'Everything/Certifications/Coursera 2_page-0001.jpg', 'Everything/Certifications/Coursera 2.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'electrical-safety-essentials',
    title: 'Essentials of Electrical Safety',
    issuer: 'Alison',
    category: 'Courses',
    dateLabel: '6 August 2025',
    datePrecision: 'date',
    context: 'Course completion covering electrical-safety principles and workplace practices.',
    image: preview(electricalSafety, 'Alison certificate for Essentials of Electrical Safety, awarded to Muhammad Sharjeel on 6 August 2025.', 'Alison course-completion certificate. Account identifiers and the issuer signature are redacted.'),
    verificationUrl: 'https://alison.com/certification/check/713535009e',
    printedName: 'MUHAMMAD SHARJEEL',
    publicPreviewLabel,
    provenance: ['Certificates/Courses/WhatsApp Image 2025-08-06 at 12.37.28 PM.jpeg', 'Everything/Certifications/WhatsApp Image 2025-08-06 at 12.37.28 PM.jpeg', 'Everything/Certifications/Alison_Certificate-5273-50990454.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Course completion is not professional licensure or authorisation for regulated work.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'nfpa70e-workplace-safety',
    title: 'NFPA 70E (2024) - Navigating Workplace Electrical Safety & Essential Updates',
    issuer: 'Alison',
    category: 'Courses',
    dateLabel: '11 August 2025',
    datePrecision: 'date',
    context: 'Completion of an Alison course addressing the NFPA 70E workplace electrical-safety standard and its 2024 updates.',
    image: preview(nfpaSafety, 'Alison certificate for NFPA 70E (2024) - Navigating Workplace Electrical Safety & Essential Updates, awarded to Muhammad Sharjeel on 11 August 2025.', 'Alison course completion, not an NFPA-issued qualification. Account identifiers and the issuer signature are redacted.'),
    verificationUrl: 'https://alison.com/certification/check/6cf9f10e3b',
    printedName: 'MUHAMMAD SHARJEEL',
    publicPreviewLabel,
    provenance: ['Certificates/Courses/Alison_Certificate-6483-50990454_page-0001.jpg', 'Everything/Certifications/Alison_Certificate-6483-50990454_page-0001.jpg', 'Everything/Certifications/Alison_Certificate-6483-50990454.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'This is an Alison course-completion certificate, not professional licensure or an NFPA-issued certification.', 'Verification URL is printed on the supplied certificate; the link is not an independent verification claim.'],
  },
  {
    slug: 'air-university-commendation-spring2025',
    title: 'Air University departmental Certificate of Commendation — Spring 2025',
    issuer: 'Air University, Department of Electrical and Computer Engineering',
    category: 'Academic Commendations',
    dateLabel: 'Spring 2025',
    datePrecision: 'term',
    context: 'Departmental academic commendation recognising dedication, hard work and academic achievement in Spring 2025.',
    image: preview(springCommendation, 'Air University Certificate of Commendation for Spring 2025, with private fields removed from the public copy.', 'Spring 2025 departmental commendation. Personal fields and signatures are redacted; the original award wording is preserved.'),
    printedName: 'M. Sharjeel',
    publicPreviewLabel,
    provenance: ['Certificates/Appreciation/Certificate.jpeg', 'Everything/Certifications/Certificate.jpeg'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'The certificate prints SGPA 3.46, consistent with the portal Spring 2025 result.', 'Award wording does not establish a rank across the entire university.', 'Term label is not an issuance date.'],
  },
  {
    slug: 'air-university-commendation-fall2025',
    title: 'Air University departmental Certificate of Commendation — Fall 2025',
    issuer: 'Air University, Department of Electrical and Computer Engineering',
    category: 'Academic Commendations',
    dateLabel: 'Fall 2025',
    datePrecision: 'term',
    context: 'Departmental academic commendation recognising dedication, hard work and academic achievement in Fall 2025.',
    image: preview(fallCommendation, 'Air University Certificate of Commendation for Fall 2025, with private fields removed from the public copy.', 'Fall 2025 departmental commendation. Personal fields and signatures are redacted; the original award wording is preserved.'),
    printedName: 'Muhammad Sharjeel',
    publicPreviewLabel,
    provenance: ['Certificates/Appreciation/WhatsApp Image 2026-07-19 at 7.54.18 PM.jpeg', 'Everything/Certifications/WhatsApp Image 2026-07-19 at 7.54.18 PM.jpeg'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'The certificate prints SGPA 3.67 while the current portal report lists Fall 2025 SGPA 3.73; these remain separate source facts.', 'Award wording does not establish a rank across the entire university.', 'No issuance date is inferred from the WhatsApp filename.'],
  },
  {
    slug: 'ieee-recognition-2025-26',
    title: 'IEEE Air University Certificate of Recognition, 2025–26',
    issuer: 'IEEE Air University',
    category: 'Organisational Recognition',
    dateLabel: '2025–26',
    datePrecision: 'year-range',
    context: 'Recognition for contributions, dedication, leadership, active engagement and commitment to the IEEE Air University community.',
    image: preview(ieeeRecognition, 'IEEE Air University Certificate of Recognition for 2025–26, presented to Muhammad Sharjeel.', 'Recognition for community contributions and engagement. Issuer signatures are redacted in this public copy.'),
    printedName: 'Muhammad Sharjeel',
    publicPreviewLabel,
    provenance: ['Certificates/Organisational/IEEE Certificate_page-0001.jpg', 'Everything/Certifications/IEEE Certificate_page-0001.jpg', 'Everything/Certifications/IEEE Certificate.pdf'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'The certificate does not establish a specific officer title.'],
  },
  {
    slug: 'ece-farewell-appreciation-2026',
    title: 'Certificate of Appreciation for organising Farewell 2026, ECE department',
    issuer: 'Air University ECE department / IEEE Air University',
    category: 'Organisational Recognition',
    dateLabel: 'Farewell 2026',
    datePrecision: 'term',
    context: 'Appreciation for contributing to the successful organisation of Farewell 2026 for the Electrical and Computer Engineering department.',
    image: preview(farewellAppreciation, 'Certificate of Appreciation for organising Farewell 2026 in the ECE department; the printed recipient name is Rao Sharjeel.', 'Appreciation for organising ECE Farewell 2026. The original printed recipient name is preserved; issuer signatures are redacted.'),
    printedName: 'Rao Sharjeel',
    publicPreviewLabel,
    provenance: ['Certificates/Organisational/WhatsApp Image 2026-07-19 at 7.46.13 PM.jpeg', 'Everything/Certifications/WhatsApp Image 2026-07-19 at 7.46.13 PM.jpeg', 'Owner authorisation in website phase 2 instructions'],
    evidenceNotes: ['Sorted image and original image are exact SHA256 duplicates.', 'Owner identifies this sorted credential as their organisational contribution; printed-name variant is preserved without digital replacement.', 'No officer role or exact issuance date is established.'],
  },
  {
    slug: 'iesco-internship-2025',
    title: 'IESCO Certificate of Internship',
    issuer: 'Islamabad Electric Supply Company (IESCO)',
    category: 'Internship',
    dateLabel: 'July–September 2025',
    datePrecision: 'month-range',
    context: 'Completion of an eight-week engineering internship with Substation and Transmission Lines (SS&TL) and Protection and Instrumentation (P&I).',
    image: preview(iescoInternship, 'IESCO internship certificate for Muhammad Sharjeel, showing the 2025 SS&TL and P&I periods with personal information redacted.', 'Internship completion certificate. Family details, signature, contact details and certificate identifier are redacted in the public copy.'),
    printedName: 'Muhammad Sharjeel',
    publicPreviewLabel,
    experienceId: 'iesco',
    provenance: ['Everything/Documents/Scanned PDF/Internship Certificate (IESCO).pdf'],
    evidenceNotes: ['Visual review confirms 9 July–19 August 2025 in SS&TL and 20 August–2 September 2025 in P&I; the public summary uses the requested month range.', 'Certificate issue date is 16 September 2025; dateLabel represents internship period, not issuance.', 'The original scan is sideways; the public preview is oriented without changing award text.'],
  },
  {
    slug: 'powerchina-sepco1-internship-2024',
    title: 'POWERCHINA SEPCO1 Internship Completion',
    issuer: 'POWERCHINA SEPCO1',
    category: 'Internship',
    dateLabel: 'July–September 2024',
    datePrecision: 'month-range',
    context: 'Internship completion documenting exposure to project management, project procurement and project planning in an engineering power project.',
    image: preview(powerchinaInternship, 'POWERCHINA SEPCO1 internship completion letter for Muhammad Sharjeel, with private signature and contact details removed.', 'Internship completion record. The signature, personal contact number and office-address footer are redacted in the public copy.'),
    printedName: 'Muhammad Sharjeel',
    publicPreviewLabel,
    experienceId: 'powerchina-sepco1',
    provenance: ['Everything/Documents/Scanned PDF/Internship Certificate (Power China).pdf'],
    evidenceNotes: ['Visual review confirms an internship from 1 July to 1 September 2024 and the three stated work areas.', 'This is an internship completion letter, not a course certificate, employment offer or professional licence.'],
  },
];
