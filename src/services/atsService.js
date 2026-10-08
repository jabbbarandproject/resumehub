import { ACTION_VERBS_FLAT } from '../data/actionVerbs';
import { getBulletLines, resumeToText, countWords } from './resumeText';

export function runAtsCheck(resume) {
  const bullets = getBulletLines(resume);
  const text = resumeToText(resume);
  const words = countWords(text);

  const quantified = bullets.filter((l) => /\d/.test(l)).length;
  const withVerb = bullets.filter((l) => {
    const first = (l.split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z]/g, '');
    return ACTION_VERBS_FLAT.includes(first);
  }).length;

  const sections = [
    Boolean(resume.summary),
    resume.experience.some((e) => e.jobTitle || e.bullets),
    resume.education.some((e) => e.degree || e.school),
    resume.skills.length > 0,
  ].filter(Boolean).length;

  const checks = [
    {
      label: 'Email and phone number are present',
      pass: Boolean(resume.personal.email && resume.personal.phone),
      tip: 'Add both an email and a phone number so recruiters and parsers can read your contact details.',
    },
    {
      label: 'Bullets include numbers or percentages',
      pass: bullets.length > 0 && quantified / bullets.length >= 0.3,
      tip: 'Add numbers to at least a third of your bullets, for example "increased sales by 20%" or "managed a team of 5".',
    },
    {
      label: 'Bullets start with strong action verbs',
      pass: bullets.length > 0 && withVerb / bullets.length >= 0.5,
      tip: 'Start bullets with verbs like Led, Built or Increased instead of "Responsible for". The verb library can help.',
    },
    {
      label: 'Length is between 150 and 800 words',
      pass: words >= 150 && words <= 800,
      tip: words < 150
        ? `Your resume is short (${words} words). Add more detail to your experience and summary.`
        : `Your resume is long (${words} words). Trim it to your most relevant, recent work.`,
    },
    {
      label: 'Uses standard sections (summary, experience, education, skills)',
      pass: sections >= 3,
      tip: 'Fill in at least three of: Summary, Experience, Education and Skills. ATS tools look for these labels.',
    },
    {
      label: 'Clean single-column layout with no tables or images',
      pass: true,
      tip: '',
    },
    {
      label: 'At least one detailed work experience entry',
      pass: resume.experience.some((e) => e.jobTitle && e.bullets),
      tip: 'Add a job title with bullet points that describe your impact.',
    },
    {
      label: 'At least three skills listed',
      pass: resume.skills.length >= 3,
      tip: 'List three to five relevant skills. ATS keyword matching leans on them heavily.',
    },
  ];

  const passed = checks.filter((c) => c.pass).length;
  return { score: Math.round((passed / checks.length) * 100), checks, words };
}

export function completeness(resume) {
  const p = resume.personal;
  const steps = [
    p.fullName, p.email, p.phone, p.jobTitle, resume.summary,
    resume.experience.some((e) => e.jobTitle && e.bullets),
    resume.education.some((e) => e.degree),
    resume.skills.length >= 3,
  ];
  return Math.round((steps.filter(Boolean).length / steps.length) * 100);
}
