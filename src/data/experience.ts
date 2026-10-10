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
    summary: 'Grid-station and substation exposure connected power-engineering coursework with utility maintenance, protection and safe working practices.',
    activities: [
      'Observed and assisted work associated with Substation and Transmission Lines (SS&TL) and Protection and Instrumentation (P&I).',
      'Gained exposure to substation maintenance, protection equipment and testing practices under the guidance of utility personnel.',
      'Learned about station battery systems and the safety procedures used around electrical equipment.',
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
    areas: ['Project management', 'Procurement', 'Planning'],
    images: [],
    provenance: ['Owner-supplied internship description', 'Supplied CV records'],
  },
];
