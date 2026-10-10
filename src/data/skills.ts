export interface SkillGroup {
  title: string;
  context: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Power engineering',
    context: 'Applied through academic design, fabrication and utility internship exposure.',
    items: ['Power-system design', 'Transformer calculations and testing', 'Micro hydropower design', 'Substation fundamentals', 'Electrical safety'],
  },
  {
    title: 'Embedded systems',
    context: 'Used in semester prototypes and circuit-based academic work.',
    items: ['Arduino UNO / ATmega328P', '8051 microcontrollers', 'Embedded C / C++', 'Sensor integration', 'PWM and motor control', 'Proteus'],
  },
  {
    title: 'Engineering software',
    context: 'Used for academic computation, programming, drawing and circuit work.',
    items: ['MATLAB', 'C++', 'Object-oriented programming', 'SolidWorks', 'PCB design'],
  },
];
