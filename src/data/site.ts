import type { ImageMetadata } from 'astro';

export const site = {
  name: 'Muhammad Sharjeel',
  role: 'Electrical (Power) Engineering undergraduate',
  university: 'Air University, Islamabad',
  location: 'Islamabad, Pakistan',
  email: 'engr.muhammadsharjeel@gmail.com',
  linkedin: 'https://www.linkedin.com/in/engr-muhammad-sharjeel/',
  github: 'https://github.com/engr-sharjeel',
  description: 'Power engineering, electric mobility and embedded systems. Academic design studies and practical prototypes by Muhammad Sharjeel, an Electrical (Power) Engineering undergraduate at Air University, Islamabad.',
  // Import a reviewed photo from src/assets/profile/ and assign it here.
  profileImage: undefined as ImageMetadata | undefined,
  profileAlt: 'Muhammad Sharjeel',
};

// Exactly four selections; order after the flagship follows this list.
export const featuredProjects = [
  'range-extended-electric-vehicle',
  'micro-hydropower-plant',
  'autonomous-navigation-robot',
  'center-tapped-transformer',
] as const;
