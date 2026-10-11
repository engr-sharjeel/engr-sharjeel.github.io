export interface ResearchRecord {
  id: string;
  title: string;
  status: 'Published paper' | 'Manuscript' | 'Accepted abstract';
  year: string;
  summary: string;
  abstract: string;
  focus: string[];
  context: string;
  authors?: string[];
  collaborators?: string[];
  publication?: string;
  link?: { label: string; url: string };
  projectSlug?: string;
  provenance: string[];
}

export const research: ResearchRecord[] = [
  {
    id: 'reev-chassis-power-train-abstract',
    title: 'Design and Integration of Chassis and Power-train Structure for a Range Extended Electric Vehicle (REEV)',
    status: 'Accepted abstract',
    year: '2026',
    summary: 'An abstract on REEV chassis and power-train integration, accepted for a future oral presentation. The prototype direction addresses areas with limited charging infrastructure.',
    abstract: 'The abstract concerns chassis and power-train integration for the series REEV project. It describes an electric motor driving the wheels and an engine-driven generator supporting the electrical system. The academic project remains at FYP-1 complete, with calculations, final sizing and prototype construction assigned to later phases. A future vehicle-conversion startup is a separate longer-term ambition, not a completed project or available service.',
    focus: ['Series REEV prototype', 'Chassis and power-train integration', 'Component identification and methodology'],
    context: 'The supplied letter dated 3 October 2026 accepts the abstract for an oral presentation at the International Multidisciplinary Conference 2026, scheduled for 17–18 November 2026 at UET Lahore. This is accepted-abstract status; a completed presentation or published proceedings is not claimed.',
    collaborators: ['Muhammad Sharjeel', 'Muhammad Zikyas Babar', 'Mashhood Un Nabi Butt'],
    link: { label: 'Official conference information', url: 'https://conferences.uet.edu.pk/imc/2026/' },
    projectSlug: 'range-extended-electric-vehicle',
    provenance: ['Everything/Paper/acceptance-letter-CONF-MECHANICAL-023 (1).pdf', 'Everything/FYP/P 2348.docx', 'Owner-supplied status clarification', 'https://uet.edu.pk/newsannouncement/Event/International-Multidisciplinary-Conference-2026-2026.08.24/?instancedate=1787572740000', 'https://conferences.uet.edu.pk/imc/2026/'],
  },
  {
    id: 'ev-charging-voltage-stability',
    title: 'Impact of Electric Vehicle Charging Infrastructure on Distribution Network Voltage Stability',
    status: 'Manuscript',
    year: '',
    summary: 'An analytical manuscript examining how EV charging demand affects voltage profiles, losses and stability margins on radial distribution feeders.',
    abstract: 'The manuscript reviews charger behaviour and uses a two-bus equivalent to study constant-power EV loads on a resistive feeder. Its closed-form worked example distinguishes the practical voltage limit from the voltage-collapse point, then compares coordinated charging, local charger controls and other mitigation options.',
    focus: ['Constant-power charger behaviour', 'Two-bus feeder analysis', 'Voltage limits and load margin', 'Charging coordination and local control'],
    context: 'Unpublished manuscript, with two supplied versions represented by one record. The worked example is analytical, not a field study or measured network deployment; the single-phase, quasi-steady-state treatment has limits for dynamic and unbalanced systems.',
    authors: ['Muhammad Sharjeel', 'Muhammad Zikyas Babar', 'Mashhood Un Nabi Butt'],
    provenance: ['Everything/Paper/Conference_Paper.pdf', 'Everything/Paper/Conferece Paper Impact of Electric Vehicle Charging Infrastructure on Distribution Network Voltage Stability.pdf'],
  },
  {
    id: 'engineering-graduates-policy',
    title: 'Strategic Policy Interventions for Enhancing the Future of Engineering Graduates in Pakistan',
    status: 'Published paper',
    year: '2025',
    summary: 'A coauthored policy paper examining the relationship between engineering education, practical skills and graduate employment in Pakistan.',
    abstract: 'The paper examines curriculum relevance, practical learning, soft skills, industry–university links and access to engineering education. It discusses policy implementation and international examples, proposing stronger connections between education, industry needs and opportunities for graduates.',
    focus: ['Curriculum and practical learning', 'Industry–university collaboration', 'Policy implementation and monitoring', 'Graduate skills and employability'],
    context: 'Published on 12 August 2025 in Volume 3, Issue 8 of the International Journal of Social Sciences Bulletin. Muhammad Sharjeel is the third coauthor in the published author order.',
    authors: ['Sobia Nasir Shafiq', 'Bushra Javed', 'Muhammad Sharjeel'],
    publication: 'International Journal of Social Sciences Bulletin',
    link: { label: 'Read the published paper', url: 'https://doi.org/10.5281/zenodo.16811464' },
    provenance: ['Everything/Certifications/Research Paper/IJSSB-V3I8202532.pdf', 'Owner-supplied publication details'],
  },
];
