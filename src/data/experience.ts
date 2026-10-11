import type { ImageMetadata } from 'astro';
import batteryBank from '../assets/experience/iesco-battery-bank.jpg';
import transformerYard from '../assets/experience/iesco-transformer-yard.jpg';
import iescoPortrait from '../assets/experience/iesco-grid-station-portrait.jpeg';
import damContext from '../assets/experience/powerchina-project-dam-context.jpeg';
import constructionContext from '../assets/experience/powerchina-project-construction-context.jpeg';
import nightContext from '../assets/experience/powerchina-project-night-context.jpeg';

export interface ExperienceImage {
  src: ImageMetadata;
  kind: 'photo';
  alt: string;
  caption: string;
  focalPoint: string;
}

export interface ExperienceRecord {
  id: string;
  organization: string;
  role: string;
  period: string;
  summary: string;
  activities: string[];
  learning: string[];
  areas: string[];
  images: ExperienceImage[];
  provenance: string[];
}

export const experience: ExperienceRecord[] = [
  {
    id: 'iesco',
    organization: 'Islamabad Electric Supply Company (IESCO)',
    role: 'Engineering intern',
    period: 'July–September 2025',
    summary: 'A utility internship connecting power-engineering coursework with grid-station equipment, maintenance, protection and safe working practices.',
    activities: [
      'Observed and assisted work associated with Substation and Transmission Lines (SS&TL) and Protection and Instrumentation (P&I).',
      'Studied the roles of power transformers, circuit breakers, isolators, current transformers and potential transformers in station operation and protection.',
      'Gained guided exposure to transformer testing, including turns/voltage ratio, insulation and winding-resistance test practices; this was internship learning rather than independent commissioning responsibility.',
      'Observed maintenance documentation, shift handover and permit-to-work procedures, connecting equipment work with operational coordination.',
      'Learned about battery banks, battery chargers and auxiliary supplies used for substation control and protection.',
    ],
    learning: [
      'Protection and measurement equipment link the high-voltage plant to the control and monitoring functions studied in class.',
      'Safe isolation, permits, grounding and protective equipment are integral to maintenance work in a high-voltage environment.',
      'Station DC supplies and battery systems support control and protection functions alongside the main power circuit.',
    ],
    areas: ['Substations', 'Maintenance', 'Protection and testing', 'Battery systems', 'Electrical safety'],
    images: [
      {
        src: iescoPortrait,
        kind: 'photo',
        alt: 'Muhammad Sharjeel at a grid-station site, with electrical yard equipment visible behind him.',
        caption: 'At a grid-station site during the IESCO internship, alongside the electrical yard equipment.',
        focalPoint: '50% 50%',
      },
      {
        src: batteryBank,
        kind: 'photo',
        alt: 'Two-tier substation battery bank with connected lead-acid cells on a steel rack.',
        caption: 'A station battery bank observed during the IESCO internship, providing context for learning about substation auxiliary systems.',
        focalPoint: '50% 50%',
      },
      {
        src: transformerYard,
        kind: 'photo',
        alt: 'Outdoor substation yard containing power transformers, bushings and electrical connections.',
        caption: 'Power transformers and yard connections observed during the IESCO internship.',
        focalPoint: '50% 50%',
      },
    ],
    provenance: ['Owner-supplied internship description', 'Private IESCO internship certificate', 'Everything/Internship Pictures/Internship Report.pdf'],
  },
  {
    id: 'powerchina-sepco1',
    organization: 'POWERCHINA SEPCO1',
    role: 'Engineering intern',
    period: 'July–September 2024',
    summary: 'An introduction to the coordination behind engineering delivery, with exposure to project management, procurement and planning.',
    activities: [
      'Observed project-management and planning processes in an engineering organization.',
      'Gained exposure to procurement workflows and their relationship to project execution.',
    ],
    learning: [
      'Engineering delivery depends on coordinating project planning and procurement as well as technical design.',
      'The placement provided an early introduction to how organizational processes support engineering projects.',
    ],
    areas: ['Project management', 'Procurement', 'Planning'],
    images: [
      { src: damContext, kind: 'photo', alt: 'Project-context view of a large dam and surrounding landscape.', caption: 'Owner-supplied POWERCHINA project-context photograph. This view does not establish a specific site assignment or personal construction contribution.', focalPoint: '50% 50%' },
      { src: constructionContext, kind: 'photo', alt: 'Project-context view of large civil works and construction equipment.', caption: 'Construction context supplied for the POWERCHINA SEPCO1 internship; the exact project and individual construction responsibilities are not established by the photograph.', focalPoint: '50% 50%' },
      { src: nightContext, kind: 'photo', alt: 'Illuminated engineering project seen at night.', caption: 'A further owner-supplied POWERCHINA project-context view. Internship learning concerned project management, procurement and planning.', focalPoint: '50% 50%' },
    ],
    provenance: ['Owner-supplied internship description', 'Supplied CV records', 'Everything/Documents/Scanned PDF/Internship Certificate (Power China).pdf'],
  },
];
