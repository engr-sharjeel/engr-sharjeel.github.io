import type { ImageMetadata } from 'astro';
import profilePhoto from '../assets/profile/muhammad-sharjeel-portrait.png';
import { projectPriority } from '../lib/project-priority';

export const site = {
  name: 'Muhammad Sharjeel',
  role: 'BS Electrical (Power) Engineering undergraduate',
  program: 'BS Electrical (Power) Engineering',
  degreeStatus: 'In progress',
  university: 'Air University, Islamabad',
  location: 'Islamabad, Pakistan',
  email: 'engr.muhammadsharjeel@gmail.com',
  phoneCanonical: '+923494247649',
  phoneDisplay: '+92 349 4247649',
  whatsapp: 'https://wa.me/923494247649',
  linkedin: 'https://www.linkedin.com/in/engr-muhammad-sharjeel/',
  github: 'https://github.com/engr-sharjeel',
  resumePath: '/downloads/muhammad-sharjeel-cv.pdf',
  description: 'Power systems, renewable energy, embedded control and a range-extended EV prototype for areas with limited charging. Muhammad Sharjeel is a BS Electrical (Power) Engineering undergraduate at Air University, Islamabad.',
  heroBrief: 'Building a range-extended EV for areas with limited charging , Power Systems, Embedded control, Renewable Energy',
  // The owner-selected original is preserved; Astro generates display derivatives.
  profileImage: profilePhoto as ImageMetadata | undefined,
  profileAlt: 'Portrait of Muhammad Sharjeel in a blazer and tie.',
  profileFocalPoint: '50% 50%',
};

// Home and catalogue share the owner-selected first four; the flagship remains first.
export const featuredProjects = projectPriority.slice(0, 4);
