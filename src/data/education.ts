export interface CourseProjectLink {
  slug: string;
  title: string;
}

export interface CourseworkFocusArea {
  title: string;
  description: string;
  courses: string[];
  projects: CourseProjectLink[];
}

export interface CourseHighlight {
  course: string;
  grade: 'A';
  term: string;
  context: string;
}

// The current portal report resolves the older CV CGPA conflict. Its session
// header is a snapshot label; it does not establish Fall 2026 term results.
export const education = {
  institution: 'Air University Islamabad',
  location: 'Islamabad, Pakistan',
  program: 'Electrical (Power) Engineering',
  level: 'Undergraduate',
  status: 'In progress',
  period: 'September 2023–present',
  startDate: '2023-09',
  cgpa: '3.10',
  gpaScale: '4.00',
  reportTerm: 'Fall 2026',
  summary: 'An undergraduate foundation in power and energy systems, embedded electronics, control, and engineering computation, developed through coursework and academic projects.',
  snapshotContext: 'CGPA and selected course grades are taken from a Fall 2026 student-portal snapshot. The report contains results through Spring 2026, including Summer 2025; this is an academic summary, not a certified transcript.',
  provenance: ['Grade Report - STUDENT_PORTAL.pdf', 'Everything/CV/New CV.pdf', 'Owner-supplied program description'],
  evidenceNotes: ['The portal footer states that the report is not valid for academic evaluation.', 'No Fall 2026 course-result table or confirmed graduation date is supplied.', 'GPA scale is supported by the course table: an A carries four grade points per credit.'],
};

export const earlierEducation = {
  institution: 'Nishat College of Science for Boys',
  location: 'Multan, Pakistan',
  program: 'Intermediate studies',
  period: '2021–2023',
  context: 'Earlier college studies before beginning electrical engineering at Air University.',
  provenance: ['Everything/CV/New CV.pdf', 'Supplied owner CV versions'],
};

export const courseworkFocusAreas: CourseworkFocusArea[] = [
  {
    title: 'Power and energy',
    description: 'Electrical machines, generation, distribution and the conversion of electrical energy.',
    courses: ['Electrical Machines', 'Power Distribution and Utilization Systems', 'Power Generation Systems', 'Power Electronics I'],
    projects: [
      { slug: 'center-tapped-transformer', title: 'Single-Phase Center-Tapped Transformer' },
      { slug: 'micro-hydropower-plant', title: '34 kW Micro Hydropower Plant Design' },
    ],
  },
  {
    title: 'Embedded systems and electronics',
    description: 'Microcontroller programming, instrumentation and the design of electronic circuits.',
    courses: ['Microprocessors & Microcontrollers', 'Electrical Measurements and Instrumentation', 'Analog Electronics', 'Electronic Circuit Design', 'Digital Logic Design'],
    projects: [
      { slug: 'electronic-voting-machine', title: 'Electronic Voting Machine' },
      { slug: 'smart-access-monitoring-system', title: 'Smart Access & Monitoring System' },
      { slug: 'autonomous-navigation-robot', title: 'Autonomous Multi-Sensor Navigation Robot' },
    ],
  },
  {
    title: 'Control and signals',
    description: 'System behaviour, signal representation and digital signal analysis.',
    courses: ['Control Systems', 'Signals and Systems', 'Digital Signal Processing'],
    projects: [],
  },
  {
    title: 'Computing and engineering foundations',
    description: 'Programming, technical communication, drawing and the mathematics used in engineering analysis.',
    courses: ['Computer Programming', 'Object Oriented Programming', 'Engineering Drawing', 'Calculus I', 'Multivariable Calculus', 'Linear Algebra and Differential Equation', 'Probability and Random Variables', 'Numerical Methods', 'Technical Report Writing'],
    projects: [
      { slug: 'university-management-system', title: 'University Management System' },
      { slug: 'oop-library-management', title: 'Library Management System' },
      { slug: 'solidworks-engineering-drawing', title: 'Engineering Drawing — SolidWorks' },
    ],
  },
];

export const courseHighlights: CourseHighlight[] = [
  { course: 'Microprocessors & Microcontrollers', grade: 'A', term: 'Fall 2025', context: 'An A in both the course and Microprocessors & Microcontrollers Lab.' },
  { course: 'Power Distribution and Utilization Systems', grade: 'A', term: 'Fall 2025', context: 'Selected coursework in distribution networks and electrical utilisation.' },
  { course: 'Power Generation Systems', grade: 'A', term: 'Spring 2026', context: 'An A in both the course and Power Generation Systems Laboratory.' },
  { course: 'Electronic Circuit Design', grade: 'A', term: 'Spring 2025', context: 'Circuit-design coursework supporting the electronics foundation.' },
  { course: 'Electrical Measurements and Instrumentation', grade: 'A', term: 'Fall 2025', context: 'Measurement and sensing coursework linked to the navigation-robot prototype.' },
  { course: 'Signals and Systems', grade: 'A', term: 'Spring 2025', context: 'Coursework in signal and system analysis.' },
];
