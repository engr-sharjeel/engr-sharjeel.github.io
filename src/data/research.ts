export interface ResearchRecord {
  id: string;
  title: string;
  status: 'Published paper' | 'Manuscript' | 'Accepted abstract';
  year: string;
  summary: string;
  context: string;
  authors?: string[];
  publication?: string;
  link?: { label: string; url: string };
  projectSlug?: string;
  provenance: string[];
}

export const research: ResearchRecord[] = [
  {
    id: 'engineering-graduates-policy',
    title: 'Strategic Policy Interventions for Enhancing the Future of Engineering Graduates in Pakistan',
    status: 'Published paper',
    year: '2025',
    summary: 'A coauthored paper examining policy interventions related to the future of engineering graduates in Pakistan.',
    context: 'Published in 2025 in the International Journal of Social Sciences Bulletin.',
    authors: ['Sobia Nasir Shafiq', 'Bushra Javed', 'Muhammad Sharjeel'],
    publication: 'International Journal of Social Sciences Bulletin',
    link: { label: 'Read the published paper', url: 'https://doi.org/10.5281/zenodo.16811464' },
    provenance: ['Everything/Certifications/Research Paper/IJSSB-V3I8202532.pdf', 'Owner-supplied publication details'],
  },
  {
    id: 'ev-charging-voltage-stability',
    title: 'Impact of Electric Vehicle Charging Infrastructure on Distribution Network Voltage Stability',
    status: 'Manuscript',
    year: '',
    summary: 'A manuscript focused on the relationship between electric-vehicle charging infrastructure and voltage stability in distribution networks.',
    context: 'Unpublished research manuscript.',
    authors: ['Muhammad Sharjeel', 'Muhammad Zikyas Babar', 'Mashhood Un Nabi Butt'],
    provenance: ['Everything/Paper/Conference_Paper.pdf', 'Everything/Paper/Conferece Paper Impact of Electric Vehicle Charging Infrastructure on Distribution Network Voltage Stability.pdf'],
  },
  {
    id: 'reev-chassis-power-train-abstract',
    title: 'Design and Integration of Chassis and Power-train for a Range Extended Electric Vehicle',
    status: 'Accepted abstract',
    year: '2026',
    summary: 'An abstract from the two-seater REEV academic project, accepted for a future oral presentation.',
    context: 'Accepted for a forthcoming oral presentation.',
    projectSlug: 'range-extended-electric-vehicle',
    provenance: ['Everything/Paper/acceptance-letter-CONF-MECHANICAL-023 (1).pdf', 'Owner-supplied status clarification'],
  },
];
