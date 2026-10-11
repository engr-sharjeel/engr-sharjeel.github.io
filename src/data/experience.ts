import type { ImageMetadata } from 'astro';
import batteryBank from '../assets/experience/iesco-battery-bank.jpg';
import transformerYard from '../assets/experience/iesco-transformer-yard.jpg';

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
    images: [],
    provenance: ['Owner-supplied internship description', 'Supplied CV records', 'Everything/Documents/Scanned PDF/Internship Certificate (Power China).pdf'],
  },
];
