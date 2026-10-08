import { uid } from '../defaultResume';
import { initialSettings } from '../layoutSpec';

const E = (o) => ({ id: uid(), jobTitle: '', company: '', startDate: '', endDate: '', current: false, bullets: '', ...o });
const D = (o) => ({ id: uid(), degree: '', school: '', eduYear: '', eduExtra: '', ...o });
const C = (o) => ({ id: uid(), certName: '', certIssuer: '', certYear: '', ...o });
const base = { skills: [], certifications: [], projects: [], experience: [], education: [] };

const make = (id, title, role, blurb, template, tweak, data) => ({
  id, title, role, blurb, template,
  data: { ...base, template, premiumId: id, settings: { ...initialSettings(template), ...tweak }, ...data },
});

export const PREMIUM_RESUMES = [
  make('pro-software-engineer', 'Senior Software Engineer', 'Engineering', 'Impact-led layout with navy accents and a clean header rule.', 'corporate', { accent: '#1f3a8a', nameUpper: true }, {
    personal: { fullName: 'Daniel Reed', jobTitle: 'Senior Software Engineer', email: 'daniel.reed@example.com', phone: '+1 555 010 7788', location: 'Seattle, WA', linkedin: 'linkedin.com/in/danielreed' },
    summary: 'Senior software engineer with 8 years of experience building high-traffic backend platforms in Go and Python. Led the design of a payments platform processing $1.2B a year and mentored 9 engineers.',
    experience: [
      E({ jobTitle: 'Senior Software Engineer', company: 'Cloudmark Payments', startDate: 'Jan 2021', current: true, bullets: 'Architected a payments API handling 5M requests a day with 99.95% uptime\nCut p95 latency from 800ms to 220ms with Redis caching and query tuning\nReduced cloud spend by 28% by right-sizing Kubernetes workloads\nMentored 9 engineers and introduced design reviews that cut incidents by 35%' }),
      E({ jobTitle: 'Backend Developer', company: 'Harbor Logistics', startDate: 'Jul 2018', endDate: 'Dec 2020', bullets: 'Migrated a monolith to 14 microservices with zero downtime\nShortened release time from 2 hours to 15 minutes with CI/CD automation' }),
    ],
    education: [D({ degree: 'B.S. Computer Science', school: 'University of Washington', eduYear: '2018' })],
    skills: ['Go', 'Python', 'Java', 'SQL', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Kafka', 'System design'],
    certifications: [C({ certName: 'AWS Certified Solutions Architect', certIssuer: 'Amazon Web Services', certYear: '2023' })],
  }),
  make('pro-product-manager', 'Product Manager', 'Product', 'Fresh green accents and bold capitals for a confident first impression.', 'modern', { accent: '#0f766e', nameUpper: true, headerRule: true }, {
    personal: { fullName: 'Priya Nair', jobTitle: 'Senior Product Manager', email: 'priya.nair@example.com', phone: '+1 555 010 2290', location: 'Austin, TX', linkedin: 'linkedin.com/in/priyanair' },
    summary: 'Product manager with 7 years of experience launching B2B SaaS features used by 400K users. Grew activation by 31% and annual recurring revenue by $4.2M through data-led prioritization.',
    experience: [
      E({ jobTitle: 'Senior Product Manager', company: 'Northstar Software', startDate: 'Feb 2022', current: true, bullets: 'Led a team of 12 across design and engineering to ship a self-serve onboarding flow, lifting activation by 31%\nDefined a pricing change that added $4.2M in annual recurring revenue\nCut churn by 18% by prioritizing a customer-requested reporting suite' }),
      E({ jobTitle: 'Product Manager', company: 'Brightpath', startDate: 'Jun 2019', endDate: 'Jan 2022', bullets: 'Launched 6 features from discovery to release, each hitting its adoption target\nRan 40+ customer interviews a year to shape the roadmap' }),
    ],
    education: [D({ degree: 'MBA', school: 'University of Texas', eduYear: '2019' })],
    skills: ['Roadmapping', 'A/B testing', 'SQL', 'Jira', 'User research', 'Go-to-market', 'Stakeholder management'],
  }),
  make('pro-marketing-manager', 'Marketing Manager', 'Marketing', 'Tinted section bands give structure while staying fully readable by ATS.', 'banner', { accent: '#9f1239' }, {
    personal: { fullName: 'Olivia Grant', jobTitle: 'Marketing Manager', email: 'olivia.grant@example.com', phone: '+1 555 010 6614', location: 'Chicago, IL', linkedin: 'linkedin.com/in/oliviagrant' },
    summary: 'Marketing manager with 8 years of experience leading digital campaigns for B2B brands. Grew qualified leads by 140% and managed a $1.2M budget and a team of six.',
    experience: [
      E({ jobTitle: 'Marketing Manager', company: 'Acme Corp', startDate: 'Jan 2021', current: true, bullets: 'Led 12 campaigns that increased qualified leads by 140% in two years\nCut cost per lead by 28% by shifting spend to the best-performing channels\nBuilt an email program that raised trial-to-paid conversion from 9% to 14%' }),
      E({ jobTitle: 'Digital Marketing Specialist', company: 'Pixelworks', startDate: 'May 2017', endDate: 'Dec 2020', bullets: 'Grew organic traffic by 75% with a new content and SEO plan\nManaged a $300K paid media budget across search and social' }),
    ],
    education: [D({ degree: 'B.A. Communications', school: 'University of Illinois', eduYear: '2017' })],
    skills: ['SEO', 'Google Analytics', 'HubSpot', 'Email marketing', 'Content strategy', 'Paid media', 'Brand messaging'],
  }),
  make('pro-data-analyst', 'Data Analyst', 'Data', 'Compact one-page layout that fits a lot of evidence without feeling crowded.', 'compact', { accent: '#0f766e' }, {
    personal: { fullName: 'Marcus Webb', jobTitle: 'Data Analyst', email: 'marcus.webb@example.com', phone: '+1 555 010 3321', location: 'Denver, CO', linkedin: 'linkedin.com/in/marcuswebb' },
    summary: 'Data analyst with 4 years of experience turning complex data into decisions. Built dashboards used by 40 managers and uncovered a pricing issue that recovered $120K a year.',
    experience: [
      E({ jobTitle: 'Data Analyst', company: 'Summit Retail', startDate: 'Mar 2022', current: true, bullets: 'Built a Tableau dashboard used by 40 managers, replacing 6 manual reports\nIdentified a pricing error that recovered $120K in annual revenue\nAutomated weekly reporting in Python, saving 10 hours a week' }),
      E({ jobTitle: 'Junior Analyst', company: 'Metric Labs', startDate: 'Jul 2020', endDate: 'Feb 2022', bullets: 'Cleaned and modeled 2M+ rows of sales data in SQL\nPresented monthly insights to the leadership team' }),
    ],
    education: [D({ degree: 'B.S. Statistics', school: 'Colorado State University', eduYear: '2020' })],
    skills: ['SQL', 'Python', 'Tableau', 'Power BI', 'Excel', 'A/B testing', 'Data modeling'],
  }),
  make('pro-ux-designer', 'UX Designer', 'Design', 'Minimal, airy layout with a violet side bar. Still plain text throughout.', 'minimal', { accent: '#6d28d9', headingStyle: 'bar', margin: 'normal' }, {
    personal: { fullName: 'Hannah Ortiz', jobTitle: 'UX Designer', email: 'hannah.ortiz@example.com', phone: '+1 555 010 8842', location: 'Portland, OR', linkedin: 'behance.net/hannahortiz' },
    summary: 'UX designer with 6 years of experience designing web and mobile products. Redesigned a checkout flow that cut abandonment by 18% and built a design system adopted by 5 teams.',
    experience: [
      E({ jobTitle: 'Senior UX Designer', company: 'Fieldnote', startDate: 'Apr 2021', current: true, bullets: 'Redesigned checkout and reduced cart abandonment by 18% in three months\nBuilt a design system used by 5 product teams, cutting design time by 30%\nRan usability tests with 60+ participants to guide the roadmap' }),
      E({ jobTitle: 'UX Designer', company: 'Studio Kite', startDate: 'Aug 2018', endDate: 'Mar 2021', bullets: 'Delivered 14 client projects on time across web and mobile\nImproved task success from 71% to 93% in a booking app redesign' }),
    ],
    education: [D({ degree: 'B.F.A. Interaction Design', school: 'Portland State University', eduYear: '2018' })],
    skills: ['Figma', 'User research', 'Prototyping', 'Design systems', 'Accessibility', 'Information architecture'],
  }),
  make('pro-registered-nurse', 'Registered Nurse', 'Healthcare', 'Traditional centered serif layout with teal rules, ideal for healthcare employers.', 'classic', { accent: '#0f766e' }, {
    personal: { fullName: 'Emily Carter', jobTitle: 'Registered Nurse', email: 'emily.carter@example.com', phone: '+1 555 010 5567', location: 'Columbus, OH', linkedin: '' },
    summary: 'Registered nurse with 6 years of experience in medical-surgical and emergency care. Manages 5 to 6 patients per shift and trained 14 new nurses with a 100% first-year retention rate.',
    experience: [
      E({ jobTitle: 'Registered Nurse, Emergency Department', company: 'Riverside Medical Center', startDate: 'Mar 2021', current: true, bullets: 'Triage and treat 40+ patients per shift in a Level II trauma center\nReduced patient wait times by 15% by redesigning the triage workflow\nPrecepted 14 new nurses with a 100% first-year retention rate' }),
      E({ jobTitle: 'Staff Nurse, Medical-Surgical Unit', company: 'St. Mary Hospital', startDate: 'Jun 2018', endDate: 'Feb 2021', bullets: 'Delivered care for 5 to 6 patients per shift with a 97% satisfaction score\nLed a fall-prevention program that lowered incidents by 22%' }),
    ],
    education: [D({ degree: 'B.S. Nursing', school: 'Ohio State University', eduYear: '2018' })],
    skills: ['Patient assessment', 'IV therapy', 'Electronic health records', 'Triage', 'Patient education', 'Team leadership'],
    certifications: [C({ certName: 'RN License (Ohio)', certIssuer: 'Ohio Board of Nursing', certYear: '2018' }), C({ certName: 'BLS and ACLS', certIssuer: 'American Heart Association', certYear: '2024' })],
  }),
  make('pro-financial-analyst', 'Financial Analyst', 'Finance', 'Serif capitals and a navy header rule for banking and corporate finance.', 'executive', { accent: '#1f3a8a' }, {
    personal: { fullName: 'James Whitfield', jobTitle: 'Financial Analyst', email: 'james.whitfield@example.com', phone: '+1 555 010 9910', location: 'New York, NY', linkedin: 'linkedin.com/in/jameswhitfield' },
    summary: 'Financial analyst with 5 years of experience in forecasting, budgeting and variance analysis. Built a rolling forecast model that improved accuracy to within 2% and saved 12 hours each month.',
    experience: [
      E({ jobTitle: 'Financial Analyst', company: 'Harmon Capital', startDate: 'Sep 2021', current: true, bullets: 'Built a rolling forecast model that improved accuracy to within 2% of actuals\nIdentified $850K in annual cost savings through vendor spend analysis\nAutomated month-end reporting, saving 12 hours each month' }),
      E({ jobTitle: 'Junior Analyst', company: 'Beacon Advisory', startDate: 'Jul 2019', endDate: 'Aug 2021', bullets: 'Prepared budgets for 8 business units totaling $60M\nSupported 3 acquisitions with valuation models' }),
    ],
    education: [D({ degree: 'B.B.A. Finance', school: 'Baruch College', eduYear: '2019' })],
    skills: ['Financial modeling', 'Forecasting', 'Excel', 'SQL', 'Power BI', 'Variance analysis', 'GAAP'],
    certifications: [C({ certName: 'CFA Level II Candidate', certIssuer: 'CFA Institute', certYear: '2025' })],
  }),
  make('pro-operations-manager', 'Operations Manager', 'Operations', 'Warm amber bands with a straightforward layout for operations and logistics.', 'banner', { accent: '#b45309' }, {
    personal: { fullName: 'Sofia Mendes', jobTitle: 'Operations Manager', email: 'sofia.mendes@example.com', phone: '+1 555 010 4408', location: 'Atlanta, GA', linkedin: 'linkedin.com/in/sofiamendes' },
    summary: 'Operations manager with 9 years of experience improving warehouse and delivery performance. Cut order errors by 35% and delivery delays by 30% while leading a team of 40.',
    experience: [
      E({ jobTitle: 'Operations Manager', company: 'Freightline Logistics', startDate: 'Jan 2020', current: true, bullets: 'Lead 40 staff across two distribution centers shipping 12,000 orders a week\nReduced delivery delays by 30% by redesigning the dispatch schedule\nNegotiated supplier contracts that saved $85K a year' }),
      E({ jobTitle: 'Operations Coordinator', company: 'Peachtree Supply', startDate: 'Jun 2016', endDate: 'Dec 2019', bullets: 'Cut order errors by 35% with a new picking checklist and training\nTrained 20 staff on inventory software with zero downtime' }),
    ],
    education: [D({ degree: 'B.S. Supply Chain Management', school: 'Georgia Tech', eduYear: '2016' })],
    skills: ['Process improvement', 'Inventory management', 'Supplier negotiation', 'Lean Six Sigma', 'SAP', 'Team leadership'],
  }),
];
