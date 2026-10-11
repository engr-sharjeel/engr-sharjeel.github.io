export interface SkillGroup {
  title: string;
  context: string;
  items: string[];
}

export const softwareTools = [
  'MATLAB',
  'SCADA systems',
  'Proteus',
  'PCB design',
  'SolidWorks',
  'ModelSim',
];

export const engineeringSkills = [
  'Power-system design',
  'Single-line diagrams',
  'Grid testing and calculations',
  'Renewable energy fundamentals',
  'Electrical safety',
  'Sensor integration',
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Power engineering',
    context: 'Applied through academic design, fabrication and utility internship exposure.',
    items: [...engineeringSkills.slice(0, 5), 'Transformer calculations and testing', 'Micro hydropower design', 'Substation fundamentals'],
  },
  {
    title: 'Embedded systems',
    context: 'Used in semester prototypes and circuit-based academic work.',
    items: [engineeringSkills[5]!, 'Arduino UNO / ATmega328P', '8051 microcontrollers', 'Embedded C / C++', 'PWM and motor control'],
  },
  {
    title: 'Software and tools',
    context: 'Academic computation, circuit work, drawing and exposure to utility monitoring systems.',
    items: softwareTools,
  },
  {
    title: 'Programming foundations',
    context: 'Used in academic programming and embedded-system projects.',
    items: ['C++', 'Object-oriented programming', 'Embedded C'],
  },
];
