export interface ServiceDefinition {
  id: string;
  title: string;
  support: string;
  deliverables: readonly string[];
  examples: readonly { slug: string; label: string }[];
}

// Support grounded in the portfolio's academic projects and demonstrated tools.
// Scope, availability, format and cost are agreed after reviewing an enquiry.
export const services = [
  {
    id: 'power-systems',
    title: 'Power-system calculations & electrical drawings',
    support: 'Preliminary load and sizing calculations, single-line diagrams and clear design documentation.',
    deliverables: ['Calculation sheets', 'Labelled electrical diagrams', 'An assumptions summary'],
    examples: [
      { slug: 'substation-distribution-design', label: 'Substation & distribution design' },
      { slug: 'center-tapped-transformer', label: 'Single-Phase Center-Tapped Transformer' },
    ],
  },
  {
    id: 'renewable-energy',
    title: 'Renewable-energy concept analysis',
    support: 'Micro hydropower sizing, projected energy calculations and preliminary feasibility documentation.',
    deliverables: ['Technical calculations', 'Energy estimates with assumptions', 'A concise concept report'],
    examples: [{ slug: 'micro-hydropower-plant', label: 'Micro hydropower design study' }],
  },
  {
    id: 'circuit-pcb',
    title: 'Circuit simulation & PCB layout',
    support: 'Circuit schematic, Proteus simulation and PCB layout support for a defined design brief.',
    deliverables: ['Schematic or simulation files', 'PCB layout files', 'Design notes'],
    examples: [
      { slug: 'pcb-layout-practice', label: 'PCB layout practice' },
      { slug: 'electronic-voting-machine', label: 'Electronic Voting Machine' },
    ],
  },
  {
    id: 'embedded-systems',
    title: 'Embedded systems & sensor integration',
    support: 'Arduino and 8051 prototype logic, sensor interfaces and embedded control code.',
    deliverables: ['Source code', 'Wiring or schematic information', 'Testing notes'],
    examples: [
      { slug: 'autonomous-navigation-robot', label: 'Autonomous navigation robot' },
      { slug: 'smart-access-monitoring-system', label: 'Smart Access & Monitoring System' },
    ],
  },
  {
    id: 'matlab-analysis',
    title: 'MATLAB engineering analysis',
    support: 'Engineering calculations, scripts, signal plots and interpretation of the results.',
    deliverables: ['Commented scripts', 'Figures', 'Calculation notes'],
    examples: [{ slug: 'matlab-signal-calculator', label: 'MATLAB Signal Calculator' }],
  },
  {
    id: 'cad-documentation',
    title: 'Engineering CAD & technical documentation',
    support: 'SolidWorks component drawings and models, supported by clear engineering documentation.',
    deliverables: ['Drawing or model files', 'A structured technical report'],
    examples: [{ slug: 'solidworks-engineering-drawing', label: 'SolidWorks drawing practice' }],
  },
] as const satisfies readonly ServiceDefinition[];

export type ServiceId = (typeof services)[number]['id'] | 'other';
export function isServiceId(value: string): value is ServiceId {
  return value === 'other' || services.some(service => service.id === value);
}
