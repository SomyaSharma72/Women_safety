import { IncidentReport, PatternSignal, QuickStats, InstitutionItem } from '../types';

// Zero mock reports - Real reports flow from survivor submissions persisted in MongoDB
export const INITIAL_REPORTS: IncidentReport[] = [];

export const INITIAL_PATTERNS: PatternSignal[] = [];
export const PATTERN_ALERTS: PatternSignal[] = [];

export const MOCK_INSTITUTIONS: InstitutionItem[] = [
  // Universities & Colleges
  {
    id: 'vidya_001',
    name: 'Vidya Institute of Technology',
    shortCode: 'VIT',
    type: 'University',
    location: 'Pune, Maharashtra',
    iccStatus: 'Active Statutory ICC',
    activeCasesCount: 0,
    resolvedCasesCount: 42,
    departmentsCount: 14,
    establishedDate: '1984',
    status: 'Verified SafeCampus',
    description: 'Premier engineering and polytechnic research institute with a verified 5-member statutory ICC board and zero-knowledge incident vault under PoSH regulations.',
    designatedContact: {
      name: 'Dr. Ananya Sharma',
      title: 'Presiding Officer & Dean of Student Affairs',
      role: 'Chief ICC Presiding Authority',
      emailDomain: '@vit-edu.in',
    },
    reportingAvailability: {
      anonymousAllowed: true,
      passkeyVault: true,
      retaliationShield: true,
      neutralOmbudsman: true,
    },
    policyLinkText: 'VIT PoSH & Internal Complaints Committee Charter',
  },
  {
    id: 'sharda_001',
    name: 'Sharda Institute of Higher Studies',
    shortCode: 'SIHS',
    type: 'University',
    location: 'Greater Noida, Uttar Pradesh',
    iccStatus: 'Active Statutory ICC',
    activeCasesCount: 0,
    resolvedCasesCount: 38,
    departmentsCount: 18,
    establishedDate: '1996',
    status: 'Verified SafeCampus',
    description: 'Multi-disciplinary campus with proactive safety committees, student welfare advocates, and confidential complaint filing infrastructure.',
    designatedContact: {
      name: 'Dr. Rajesh Menon',
      title: 'ICC Presiding Officer & Senior Professor',
      role: 'ICC Committee Lead',
      emailDomain: '@sharda-edu.in',
    },
    reportingAvailability: {
      anonymousAllowed: true,
      passkeyVault: true,
      retaliationShield: true,
      neutralOmbudsman: true,
    },
    policyLinkText: 'SIHS Code of Conduct & POSH Guidelines',
  },
  {
    id: 'xavier_001',
    name: "St. Xavier's College of Arts & Science",
    shortCode: 'SXCAS',
    type: 'College',
    location: 'Mumbai, Maharashtra',
    iccStatus: 'Active Statutory ICC',
    activeCasesCount: 0,
    resolvedCasesCount: 52,
    departmentsCount: 12,
    establishedDate: '1869',
    status: 'Verified SafeCampus',
    description: 'Autonomous premier college with active Women’s Development Cell (WDC), statutory ICC panel, and neutral external NGO members.',
    designatedContact: {
      name: 'Prof. Sunita Rao',
      title: 'WDC Lead & Associate Professor',
      role: 'ICC Member Secretary',
      emailDomain: '@xaviers-mumbai.edu.in',
    },
    reportingAvailability: {
      anonymousAllowed: true,
      passkeyVault: true,
      retaliationShield: true,
      neutralOmbudsman: true,
    },
    policyLinkText: 'SXCAS Campus Respect, Equal Opportunity & ICC Charter',
  },
  {
    id: 'nidt_001',
    name: 'National Institute of Design & Technology',
    shortCode: 'NIDT',
    type: 'Polytechnic',
    location: 'Ahmedabad, Gujarat',
    iccStatus: 'Compliance Certified',
    activeCasesCount: 0,
    resolvedCasesCount: 29,
    departmentsCount: 10,
    establishedDate: '1979',
    status: 'Tier-1 Monitored',
    description: 'Apex design and technology institute with 24/7 student grievance redressal cells and anonymous submission verification.',
    designatedContact: {
      name: 'Dr. Kavita Deshmukh',
      title: 'Head of Academic Integrity & Student Welfare',
      role: 'Presiding Officer',
      emailDomain: '@nidt-pune.ac.in',
    },
    reportingAvailability: {
      anonymousAllowed: true,
      passkeyVault: true,
      retaliationShield: true,
      neutralOmbudsman: true,
    },
    policyLinkText: 'NIDT Fair Evaluation & Student Safety Charter',
  },

  // Companies & Corporate Campuses
  {
    id: 'tcs_001',
    name: 'Tata Consultancy Services (TCS)',
    shortCode: 'TCS',
    type: 'Corporate Campus',
    location: 'Mumbai / Bengaluru / Hyderabad',
    iccStatus: 'Active Statutory ICC',
    activeCasesCount: 0,
    resolvedCasesCount: 84,
    departmentsCount: 16,
    establishedDate: '1968',
    status: 'Verified SafeCampus',
    description: 'Enterprise IT systems corporate workplace with certified POSH committees, external NGO representatives, and retaliation shield protocols.',
    designatedContact: {
      name: 'Priya Nair',
      title: 'VP of Workplace Dignity & POSH Lead',
      role: 'Corporate ICC Presiding Officer',
      emailDomain: '@tcs.com',
    },
    reportingAvailability: {
      anonymousAllowed: true,
      passkeyVault: true,
      retaliationShield: true,
      neutralOmbudsman: true,
    },
    policyLinkText: 'TCS Workplace POSH Policy & Anti-Retaliation Directive',
  },
  {
    id: 'infosys_001',
    name: 'Infosys Technologies Ltd.',
    shortCode: 'INFY',
    type: 'Corporate Campus',
    location: 'Bengaluru / Pune / Chennai',
    iccStatus: 'Active Statutory ICC',
    activeCasesCount: 0,
    resolvedCasesCount: 76,
    departmentsCount: 15,
    establishedDate: '1981',
    status: 'Verified SafeCampus',
    description: 'Global IT and consulting corporation with dedicated Hearing Committees, external ombudsman routing, and digital evidence vaults.',
    designatedContact: {
      name: 'Meera Kulkarni',
      title: 'Head of Employee Relations & Ethics',
      role: 'ICC Lead Steward',
      emailDomain: '@infosys.com',
    },
    reportingAvailability: {
      anonymousAllowed: true,
      passkeyVault: true,
      retaliationShield: true,
      neutralOmbudsman: true,
    },
    policyLinkText: 'Infosys Code of Business Ethics & POSH Charter',
  },
  {
    id: 'wipro_001',
    name: 'Wipro Enterprises',
    shortCode: 'WIPRO',
    type: 'Corporate Campus',
    location: 'Bengaluru, Karnataka',
    iccStatus: 'Compliance Certified',
    activeCasesCount: 0,
    resolvedCasesCount: 61,
    departmentsCount: 12,
    establishedDate: '1945',
    status: 'Tier-1 Monitored',
    description: 'Technology infrastructure enterprise featuring robust whistleblowing safeguards, legal counsel representation, and prompt inquiry timelines.',
    designatedContact: {
      name: 'Dr. Suresh Varma',
      title: 'Director of Human Resources & Ombuds',
      role: 'External Committee Lead',
      emailDomain: '@wipro.com',
    },
    reportingAvailability: {
      anonymousAllowed: true,
      passkeyVault: true,
      retaliationShield: true,
      neutralOmbudsman: true,
    },
    policyLinkText: 'Wipro Workplace Safety & Respectful Workplace Policy',
  },
];

export const SYSTEM_STATS: QuickStats = {
  totalProtectedReports: 148,
  anonymousRatio: 72,
  patternsIdentified: 14,
  averageResolutionDays: 4.2,
  retaliationCheckInRate: 98,
};

export const COLLEGE_DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Mechanical & Automobile Engineering',
  'Biotechnology & Life Sciences',
  'Management Studies & Finance',
  'Humanities & Social Sciences',
  'Design, Architecture & Fine Arts',
  'Campus Residential Hostel Services',
  'Athletics & Sports Complex',
  'Central Administration & Library',
  'Research Labs & Innovation Centre',
  'Other Campus Department / Section',
];

export const COMPANY_DEPARTMENTS = [
  'Software Engineering & Platform Tech',
  'Sales, Marketing & Business Development',
  'Operations, Facilities & Logistics',
  'Finance, Accounts & Legal',
  'People & Human Resources (HR)',
  'Executive Leadership & Strategy',
  'Customer Support & Client Services',
  'Regional Branch & Delivery Center',
  'IT, Cyber Security & Infrastructure',
  'Off-site Events, Travel & Conferences',
  'Other Corporate Workplace Area',
];

export const DEPARTMENTS = [
  ...COLLEGE_DEPARTMENTS,
  ...COMPANY_DEPARTMENTS,
];

export const VERIFIED_COLLEGES = [
  'Vidya Institute of Technology (VIT)',
  'Sharda Institute of Higher Studies (SIHS)',
  "St. Xavier's College of Arts & Science (SXCAS)",
  'National Institute of Design & Technology (NIDT)',
  'Delhi Institute of Technology (DIT)',
  'Bangalore College of Engineering (BCE)',
  'Other Verified College / University',
];

export const VERIFIED_COMPANIES = [
  'Tata Consultancy Services (TCS)',
  'Infosys Technologies Ltd.',
  'Wipro Enterprises',
  'HCL Technologies',
  'Tech Mahindra',
  'Larsen & Toubro Infotech',
  'Other Verified Corporate Workplace',
];

export const CATEGORIES_METADATA = [
  {
    id: 'verbal_harassment',
    label: 'Verbal Harassment & Innuendo',
    description: 'Inappropriate comments, sexual remarks, derogatory jokes, or verbal belittlement.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    id: 'stalking',
    label: 'Stalking & Unwanted Tracking',
    description: 'Following, watching, waiting outside labs/offices, or repeated unwelcome proximity.',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    id: 'digital_cyber',
    label: 'Digital / Online Harassment',
    description: 'Threatening DMs, non-consensual image sharing, spamming, or Discord/Slack harassment.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    id: 'physical_unwanted_touch',
    label: 'Unwanted Physical Contact',
    description: 'Non-consensual touching, cornering, blocking walkways, or physical coercion.',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
  },
  {
    id: 'intimidation_abuse_of_power',
    label: 'Abuse of Power / Coercion',
    description: 'Demanding personal favors in exchange for grades, project sign-offs, or promotions.',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  {
    id: 'academic_retaliation',
    label: 'Academic / Performance Retaliation',
    description: 'Targeted grading penalties, negative performance reviews, or exclusion from key projects.',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
  },
  {
    id: 'workplace_coercion',
    label: 'Workplace Coercion & Exploitation',
    description: 'Coercive after-hours demands, appraisal withholding, or hostile corporate environments.',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
  },
  {
    id: 'other',
    label: 'Other Inappropriate Incident',
    description: 'Any other safety concern, boundary violation, or hostile conduct.',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
  },
];
