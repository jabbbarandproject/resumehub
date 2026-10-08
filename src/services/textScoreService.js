import { ACTION_VERBS_FLAT } from '../data/actionVerbs';
import { countWords } from './resumeText';
import { matchKeywordsText } from './keywordService';

const BULLET = /^\s*[-*\u2022\u25CF\u25AA]\s*/;

// Heuristic ATS check for any pasted resume text
export function scoreResumeText(text, jobDescription = '', meta = null) {
  const t = text || '';
  const lower = t.toLowerCase();
  const words = countWords(t);
  const lines = t.split('\n').map((l) => l.trim()).filter(Boolean);
  const bullets = lines.filter((l) => BULLET.test(l)).map((l) => l.replace(BULLET, ''));
  const body = bullets.length ? bullets : lines.filter((l) => l.split(/\s+/).length >= 6);

  const withNumber = body.filter((l) => /\d/.test(l)).length;
  const withVerb = body.filter((l) => ACTION_VERBS_FLAT.includes((l.split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z]/g, ''))).length;
  const has = (re) => re.test(lower);
  const years = (t.match(/\b(19|20)\d{2}\b/g) || []).length;
  const fillers = (lower.match(/responsible for|duties included|worked on|helped with/g) || []).length;

  const checks = [
    { label: 'Email address found', pass: /[\w.+-]+@[\w-]+\.[\w.-]+/.test(t), tip: 'Add a professional email address in the body of the resume, not in a header or image.' },
    { label: 'Phone number found', pass: /(\+?\d[\d\s().-]{7,}\d)/.test(t), tip: 'Add a phone number with the country or area code.' },
    { label: 'Work experience section found', pass: has(/\b(work experience|professional experience|experience|employment history)\b/), tip: 'Add a heading called "Work Experience" or "Experience" so the ATS can find your history.' },
    { label: 'Education section found', pass: has(/\beducation\b|\bdegree\b|\buniversity\b|\bcollege\b/), tip: 'Add an "Education" heading with your degree, school and year.' },
    { label: 'Skills section found', pass: has(/\bskills\b|\bcompetencies\b|\btechnologies\b/), tip: 'Add a "Skills" heading and list your key tools and strengths.' },
    { label: 'Dates are present', pass: years >= 2, tip: 'Add start and end dates to each role and your education, in one consistent format.' },
    { label: 'Bullets include numbers or results', pass: body.length > 0 && withNumber / body.length >= 0.3, tip: 'Add numbers, for example "increased sales by 20%", to at least a third of your bullets.' },
    { label: 'Bullets start with action verbs', pass: body.length > 0 && withVerb / body.length >= 0.5, tip: 'Start bullets with verbs like Led, Built or Reduced.' },
    { label: 'Avoids weak phrases', pass: fillers <= 1, tip: 'Replace "responsible for" and "worked on" with a verb that shows what you achieved.' },
    { label: 'Length is 250 to 900 words', pass: words >= 250 && words <= 900, tip: words < 250 ? `Your text is short (${words} words). Add more detail on results.` : `Your text is long (${words} words). Trim to the most relevant experience.` },
  ];

  if (meta?.kind === 'pdf') {
    checks.unshift({ label: 'PDF text can be read (not a scanned image)', pass: words >= 40, tip: 'The PDF contains little readable text. Export it again from your editor as a text PDF, not a scan or screenshot.' });
  }
  if (meta?.pages) {
    checks.push({ label: `Length is 1 or 2 pages (yours: ${meta.pages})`, pass: meta.pages <= 2, tip: 'Cut the resume to two pages at most. Keep the most recent and relevant experience.' });
  }

  const passed = checks.filter((c) => c.pass).length;
  const keywordResult = jobDescription.trim() ? matchKeywordsText(jobDescription, t) : null;
  return { score: Math.round((passed / checks.length) * 100), checks, words, keywordResult };
}

export const SAMPLE_RESUME_TEXT = `Jane Doe
Marketing Manager
jane.doe@email.com | +1 555 123 4567 | Austin, TX

Professional Summary
Marketing manager with 7 years of experience leading digital campaigns for B2B software brands.

Work Experience
Marketing Manager, Acme Corp, Jan 2021 - Present
- Led a team of 6 to launch 12 campaigns, increasing qualified leads by 140%
- Reduced cost per lead by 28% by shifting budget to high-performing channels
- Responsible for the weekly newsletter

Education
B.A. Communications, State University, 2017

Skills
SEO, Google Analytics, HubSpot, Email marketing, Content strategy`;
