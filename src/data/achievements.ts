export interface AchievementRecord {
  title: string;
  issuer: string;
  period: string;
  category: 'Academic recognition' | 'Professional community' | 'Course completion';
  description: string;
  provenance: string[];
}

export const achievements: AchievementRecord[] = [
  {
    title: 'Certificate of Commendation',
    issuer: 'Air University',
    period: 'Spring 2025',
    category: 'Academic recognition',
    description: 'Semester academic commendation from the Department of Electrical and Computer Engineering.',
    provenance: ['Everything/Certifications/Certificate.jpeg'],
  },
  {
    title: 'Certificate of Commendation',
    issuer: 'Air University',
    period: 'Fall 2025',
    category: 'Academic recognition',
    description: 'Semester academic commendation from the Department of Electrical and Computer Engineering.',
    provenance: ['Everything/Certifications/WhatsApp Image 2026-07-19 at 7.54.18 PM.jpeg'],
  },
  {
    title: 'Certificate of Recognition',
    issuer: 'IEEE Air University',
    period: '2025–26',
    category: 'Professional community',
    description: 'Recognition for contributions and active engagement in the IEEE Air University community.',
    provenance: ['Everything/Certifications/IEEE Certificate.pdf'],
  },
  {
    title: 'Renewable Energy Technology Fundamentals',
    issuer: 'University of Colorado Boulder via Coursera',
    period: '2 April 2025',
    category: 'Course completion',
    description: 'Completed an online non-credit course in renewable energy fundamentals.',
    provenance: ['Everything/Certifications/Coursera 1.pdf'],
  },
  {
    title: 'Electric Industry Operations and Markets',
    issuer: 'Duke University via Coursera',
    period: '26 March 2025',
    category: 'Course completion',
    description: 'Completed an online non-credit course on electric-industry operations and markets.',
    provenance: ['Everything/Certifications/Coursera 2.pdf'],
  },
  {
    title: 'Essentials of Electrical Safety',
    issuer: 'Alison',
    period: '6 August 2025',
    category: 'Course completion',
    description: 'Completed a course in electrical-safety principles and practices.',
    provenance: ['Everything/Certifications/Alison_Certificate-5273-50990454.pdf'],
  },
  {
    title: 'NFPA 70E (2024) — Navigating Workplace Electrical Safety & Essential Updates',
    issuer: 'Alison',
    period: '11 August 2025',
    category: 'Course completion',
    description: 'Completed an Alison course covering the NFPA 70E workplace electrical-safety standard. This is course completion, not an NFPA-issued qualification or professional licence.',
    provenance: ['Everything/Certifications/Alison_Certificate-6483-50990454.pdf'],
  },
];
