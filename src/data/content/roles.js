import { uid } from '../defaultResume';
import { initialSettings } from '../layoutSpec';

const E = (o) => ({ id: uid(), jobTitle: '', company: '', startDate: '', endDate: '', current: false, bullets: '', ...o });
const D = (o) => ({ id: uid(), degree: '', school: '', eduYear: '', eduExtra: '', ...o });
const P = (o) => ({ id: uid(), projectName: '', projectYear: '', projectDesc: '', ...o });
const C = (o) => ({ id: uid(), certName: '', certIssuer: '', certYear: '', ...o });

const sample = (template, data) => ({
  personal: { fullName: '', jobTitle: '', email: '', phone: '', location: '', linkedin: '' },
  summary: '', experience: [], education: [], skills: [], certifications: [], projects: [],
  template, settings: initialSettings(template), ...data,
});

export const ROLES = [
  {
    key: 'frontend', path: '/resume-for-frontend-developer', role: 'Frontend Developer',
    seoTitle: 'Frontend Developer Resume Example and Guide (ATS-Friendly)',
    description: 'A frontend developer resume example with the skills, keywords and bullet points recruiters look for. Free ATS-friendly template and PDF download.',
    h1: 'Frontend developer resume example and writing guide',
    intro: [
      'Frontend hiring managers scan for three things: the stack you use, the quality of what you shipped, and proof that you care about performance and accessibility. An ATS adds a fourth: whether your exact tool names appear on the page.',
      'Use the example below as a model. Replace the details with your own, keep the structure, and keep every bullet tied to a result.',
    ],
    summary: 'Frontend developer with 5 years of experience building fast, accessible React and TypeScript applications. Improved Core Web Vitals across a 2M-user product and led the migration of a legacy codebase to Next.js.',
    skillGroups: [
      { name: 'Languages and frameworks', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Redux'] },
      { name: 'Tooling and testing', items: ['Vite', 'Webpack', 'Git', 'Jest', 'React Testing Library', 'Cypress'] },
      { name: 'Practices', items: ['Responsive design', 'Accessibility (WCAG)', 'Core Web Vitals', 'REST and GraphQL APIs', 'Figma handoff'] },
    ],
    keywords: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'responsive design', 'accessibility', 'performance', 'REST API', 'unit testing', 'Git', 'CI/CD', 'component library'],
    bullets: [
      'Reduced Largest Contentful Paint from 4.1s to 1.8s by code splitting and image optimization.',
      'Built a reusable React component library used by 6 product teams, cutting UI build time by 35%.',
      'Raised Lighthouse accessibility score from 72 to 98 by fixing semantic markup and keyboard navigation.',
      'Migrated a 120-page legacy site to Next.js, improving organic traffic by 40% in six months.',
      'Increased test coverage from 38% to 85% with Jest and Cypress, reducing production bugs by 30%.',
    ],
    tips: [
      { title: 'Lead with your stack', text: 'Put React, TypeScript or whatever the job names in your summary and skills. Recruiters search for tool names first.' },
      { title: 'Show performance and accessibility', text: 'Core Web Vitals and WCAG results are concrete, measurable proof that you ship quality work.' },
      { title: 'Link real work', text: 'Add a GitHub or portfolio URL in the contact line. Plain text URLs are safest for an ATS.' },
      { title: 'Keep it to one page', text: 'Under 8 years of experience fits on one page. Use the Compact or Tech template if you are short on space.' },
    ],
    mistakes: ['Listing every library you ever touched instead of the ones you can discuss in an interview.', 'Describing tasks ("worked on the UI") instead of results.', 'Skill bars or percentage ratings for JavaScript or CSS.', 'A designer-style two-column layout that scrambles when parsed.', 'No link to code or live projects.'],
    template: 'tech',
    faqs: [
      { q: 'Should a frontend resume include a portfolio link?', a: 'Yes. Add your GitHub or portfolio URL as plain text in the contact line so both recruiters and the ATS can read it.' },
      { q: 'Which template is best for a frontend developer?', a: 'Tech, Modern and Compact all work well. Keep a single column and avoid decorative layouts.' },
      { q: 'How many skills should I list?', a: 'Between 10 and 18, grouped by type. Include only tools you could be asked about in an interview.' },
    ],
    sample: sample('tech', {
      personal: { fullName: 'Ayesha Malik', jobTitle: 'Frontend Developer', email: 'ayesha.malik@example.com', phone: '+1 555 010 4421', location: 'Remote', linkedin: 'github.com/ayeshamalik' },
      summary: 'Frontend developer with 5 years of experience building fast, accessible React and TypeScript applications. Improved Core Web Vitals across a 2M-user product and led the migration of a legacy codebase to Next.js.',
      experience: [
        E({ jobTitle: 'Frontend Developer', company: 'Brightline Software', startDate: 'Mar 2022', current: true, bullets: 'Reduced Largest Contentful Paint from 4.1s to 1.8s by code splitting and image optimization\nBuilt a React component library used by 6 product teams, cutting UI build time by 35%\nRaised Lighthouse accessibility score from 72 to 98 by fixing semantic markup and keyboard navigation' }),
        E({ jobTitle: 'Junior Web Developer', company: 'Northwind Digital', startDate: 'Jun 2020', endDate: 'Feb 2022', bullets: 'Migrated a 120-page legacy site to Next.js, improving organic traffic by 40% in six months\nIncreased test coverage from 38% to 85% with Jest and Cypress' }),
      ],
      education: [D({ degree: 'B.S. Computer Science', school: 'State University', eduYear: '2020' })],
      skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Redux', 'Jest', 'Cypress', 'Git', 'Accessibility'],
    }),
  },
  {
    key: 'software', path: '/resume-for-software-engineer', role: 'Software Engineer',
    seoTitle: 'Software Engineer Resume Example and Guide (ATS-Friendly)',
    description: 'A software engineer resume example with skills, keywords and impact-driven bullet points. Free ATS-friendly template with PDF download.',
    h1: 'Software engineer resume example and writing guide',
    intro: [
      'A software engineer resume has to show scope, scale and impact quickly. Name the systems you built, the technology you used, and the result for users or the business.',
      'The example below follows that pattern. Keep your own numbers honest, and mirror the exact technology names used in the job post.',
    ],
    summary: 'Software engineer with 6 years of experience designing backend services in Python and Go. Built APIs serving 5M requests a day and reduced infrastructure costs by 28% through container optimization.',
    skillGroups: [
      { name: 'Languages', items: ['Python', 'Go', 'Java', 'JavaScript', 'SQL'] },
      { name: 'Infrastructure and data', items: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Kafka'] },
      { name: 'Practices', items: ['System design', 'Microservices', 'CI/CD', 'Unit and integration testing', 'Agile', 'Code review'] },
    ],
    keywords: ['Python', 'Java', 'Go', 'microservices', 'REST API', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'CI/CD', 'system design', 'scalability'],
    bullets: [
      'Designed a payments API handling 5M requests a day with 99.95% uptime.',
      'Cut cloud spend by 28% by right-sizing Kubernetes workloads and caching hot queries.',
      'Reduced p95 latency from 800ms to 220ms by adding Redis caching and query indexes.',
      'Led a team of 4 engineers to migrate a monolith to microservices with zero downtime.',
      'Automated deployments with GitHub Actions, shortening release time from 2 hours to 15 minutes.',
    ],
    tips: [
      { title: 'Show scale', text: 'Requests per day, users, data volume and uptime tell a recruiter how serious your systems were.' },
      { title: 'Group your skills', text: 'Split languages, infrastructure and practices. It reads faster and matches how job posts are written.' },
      { title: 'Name the impact', text: 'End each bullet with latency, cost, reliability or time saved rather than a list of technologies.' },
      { title: 'Mirror the job post', text: 'If the job says "Kubernetes" and you used it, say Kubernetes. Do not rely on a synonym.' },
    ],
    mistakes: ['A skills dump with 40 technologies and no context.', 'Bullets that describe duties instead of outcomes.', 'Leaving out numbers for scale, speed or savings.', 'Using a two-column layout with a skills sidebar.', 'Listing outdated technology as your main skills.'],
    template: 'corporate',
    faqs: [
      { q: 'Should I include side projects?', a: 'Yes, if they show skills your jobs did not, or if you have under 3 years of experience. Keep each to one or two lines with the result.' },
      { q: 'How long should a software engineer resume be?', a: 'One page for under 8 years of experience. Two pages is acceptable for senior or staff roles.' },
      { q: 'Do I need a GitHub link?', a: 'It helps if the repositories are active and tidy. Add it as plain text in the contact line.' },
    ],
    sample: sample('corporate', {
      personal: { fullName: 'Daniel Reed', jobTitle: 'Software Engineer', email: 'daniel.reed@example.com', phone: '+1 555 010 7788', location: 'Seattle, WA', linkedin: 'linkedin.com/in/danielreed' },
      summary: 'Software engineer with 6 years of experience designing backend services in Python and Go. Built APIs serving 5M requests a day and reduced infrastructure costs by 28% through container optimization.',
      experience: [
        E({ jobTitle: 'Software Engineer', company: 'Cloudmark Payments', startDate: 'Jan 2021', current: true, bullets: 'Designed a payments API handling 5M requests a day with 99.95% uptime\nReduced p95 latency from 800ms to 220ms by adding Redis caching and query indexes\nCut cloud spend by 28% by right-sizing Kubernetes workloads' }),
        E({ jobTitle: 'Backend Developer', company: 'Harbor Logistics', startDate: 'Jul 2018', endDate: 'Dec 2020', bullets: 'Led a team of 4 engineers to migrate a monolith to microservices with zero downtime\nAutomated deployments with GitHub Actions, shortening release time from 2 hours to 15 minutes' }),
      ],
      education: [D({ degree: 'B.S. Computer Science', school: 'University of Washington', eduYear: '2018' })],
      skills: ['Python', 'Go', 'Java', 'SQL', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Redis', 'CI/CD'],
      certifications: [C({ certName: 'AWS Certified Developer', certIssuer: 'Amazon Web Services', certYear: '2022' })],
    }),
  },
  {
    key: 'graduate', path: '/resume-for-fresh-graduate', role: 'Fresh Graduate',
    seoTitle: 'Fresh Graduate Resume Example: How to Write One With No Experience',
    description: 'How to write a fresh graduate resume with little or no work experience. ATS-friendly example, summary and bullet points, plus a free builder.',
    h1: 'Fresh graduate resume example: how to write one with no experience',
    intro: [
      'You do not need a long work history to write a strong resume. Employers hiring graduates look for potential: your degree, relevant coursework, projects, internships, part-time jobs and the skills they prove.',
      'Put education first, add projects and any work, however short, and describe each with a clear result. The example below uses the Education first section order, which you can switch on in the builder.',
    ],
    summary: 'Recent business graduate with a 3.7 GPA and internship experience in marketing analytics. Skilled in Excel, SQL and presentation design, and eager to apply data-driven thinking to a junior analyst role.',
    skillGroups: [
      { name: 'Technical', items: ['Microsoft Excel', 'SQL', 'Power BI', 'Google Analytics'] },
      { name: 'Professional', items: ['Teamwork', 'Presentation skills', 'Time management', 'Research'] },
      { name: 'Languages', items: ['English (fluent)', 'Urdu (native)'] },
    ],
    keywords: ['entry level', 'internship', 'data analysis', 'Excel', 'communication', 'teamwork', 'research', 'presentation', 'problem solving', 'GPA'],
    bullets: [
      'Analyzed survey data from 400 customers in Excel and presented findings that shaped a new campaign.',
      'Led a team of 4 students to deliver a capstone project, finishing a week ahead of schedule.',
      'Managed social media for a student society, growing followers by 60% in one semester.',
      'Served 80+ customers a day in a part-time retail role while maintaining a full course load.',
      'Built a sales dashboard in Power BI that replaced three manual reports.',
    ],
    tips: [
      { title: 'Education first', text: 'Without long work history, your degree and coursework are your strongest evidence. Place them above experience.' },
      { title: 'Count everything relevant', text: 'Internships, part-time jobs, volunteering, society roles and academic projects all show skills.' },
      { title: 'Quantify small wins', text: 'Even "400 survey responses" or "60% follower growth" gives the recruiter something concrete.' },
      { title: 'Keep it to one page', text: 'A graduate resume should always fit on one page. Use the Compact or Modern template.' },
    ],
    mistakes: ['Writing an "objective" about what you want instead of what you offer.', 'Leaving out projects and part-time work.', 'Listing school activities without any result.', 'Using a photo or a decorative graphic layout.', 'Sending the same resume for every role without matching keywords.'],
    template: 'modern',
    faqs: [
      { q: 'What do I put on a resume with no experience?', a: 'Lead with education, then projects, internships, volunteering and skills. Describe each with an action and a result.' },
      { q: 'Should I include my GPA?', a: 'Include it if it is 3.5 or above, or the job asks for it. Otherwise leave it out and highlight coursework instead.' },
      { q: 'Should I add an objective statement?', a: 'Use a short professional summary instead. Focus on what you can do for the employer, not what you want.' },
    ],
    sample: sample('modern', {
      settings: { ...initialSettings('modern'), sectionOrder: 'graduate' },
      personal: { fullName: 'Maria Lopez', jobTitle: 'Junior Data Analyst', email: 'maria.lopez@example.com', phone: '+1 555 010 3312', location: 'Austin, TX', linkedin: 'linkedin.com/in/marialopez' },
      summary: 'Recent business graduate with a 3.7 GPA and internship experience in marketing analytics. Skilled in Excel, SQL and presentation design, and eager to apply data-driven thinking to a junior analyst role.',
      education: [D({ degree: 'B.B.A. Business Analytics', school: 'University of Texas', eduYear: '2026', eduExtra: 'GPA 3.7. Relevant coursework: Statistics, Database Systems, Marketing Research' })],
      projects: [P({ projectName: 'Capstone: Customer Churn Analysis', projectYear: '2026', projectDesc: 'Led a team of 4 to analyze 12,000 customer records in SQL and Power BI, identifying three churn drivers presented to a local retailer.' })],
      experience: [
        E({ jobTitle: 'Marketing Analytics Intern', company: 'Greenfield Media', startDate: 'Jun 2025', endDate: 'Aug 2025', bullets: 'Analyzed survey data from 400 customers in Excel and presented findings that shaped a new campaign\nBuilt a Power BI dashboard that replaced three manual weekly reports' }),
        E({ jobTitle: 'Sales Associate (part time)', company: 'Urban Books', startDate: 'Sep 2023', endDate: 'May 2025', bullets: 'Served 80+ customers a day while maintaining a full course load' }),
      ],
      skills: ['Microsoft Excel', 'SQL', 'Power BI', 'Google Analytics', 'Presentation', 'Research'],
    }),
  },
];
