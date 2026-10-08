import { emptyResume, newEntry } from '../data/defaultResume';

/* Heuristic resume parser: turns plain resume text into the builder's data shape.
   It is deliberately forgiving. The user reviews and edits the result in the builder. */

const MONTH = '(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)';
const DATE = `(?:${MONTH}\\.?,?\\s+\\d{4}|\\d{1,2}\\/\\d{4}|\\d{4})`;
const NOW = '(?:present|current|now|ongoing|till date|to date|today)';
const RANGE = new RegExp(`(${DATE})\\s*(?:-|\u2013|\u2014|to|until)\\s*(${DATE}|${NOW})`, 'i');
const NOW_RE = new RegExp(`^${NOW}$`, 'i');
const BULLET = /^\s*[-*\u2022\u00B7\u25AA\u25CF\u25E6\u2023\u2043>]+\s*/;

const HEADINGS = [
  ['summary', /^((professional|career|executive|personal)\s+)?(summary|profile|objective|overview|statement)$|^about\s*me$/i],
  ['experience', /^((work|professional|relevant|employment|career)\s+)?(experience|history)$|^employment$|^work\s+experience\s*&?\s*internships?$/i],
  ['education', /^education(\s*(&|and)\s*(training|qualifications|certifications?))?$|^academic(\s+(background|qualifications|profile))?$|^qualifications$/i],
  ['skills', /^((technical|key|core|professional|relevant)\s+)?skills$|^(core\s+)?competencies$|^skills\s*(&|and)\s*(tools|technologies|abilities)$|^technologies$|^tools$/i],
  ['certifications', /^(certifications?|certificates?|licen[sc]es?|courses|training|certifications?\s*(&|and)\s*(licen[sc]es?|training))$/i],
  ['projects', /^((personal|academic|selected|key|notable)\s+)?projects$/i],
  ['other', /^(languages?|interests?|hobbies|references?|awards?|honou?rs|volunteer(ing)?(\s+experience)?|publications|achievements|activities|extracurriculars?)$/i],
];

const JOB_WORDS = /(manager|engineer|developer|analyst|designer|intern|lead|director|specialist|consultant|officer|assistant|coordinator|executive|administrator|architect|nurse|teacher|accountant|associate|representative|supervisor|technician|scientist|writer|editor|head|president|owner|founder|programmer|tester|agent|clerk|trainer|instructor|lecturer)/i;
const DEGREE = /\b(bachelor|master|b\.?\s?sc?\.?|m\.?\s?sc?\.?|b\.?\s?a\.?|m\.?\s?a\.?|b\.?\s?tech|m\.?\s?tech|b\.?\s?e\.?|m\.?\s?b\.?\s?a|ph\.?\s?d|doctorate|diploma|associate degree|high school|intermediate|matric|a-levels?|degree|bba|bs|ms|bsc|msc)\b/i;
const SCHOOL = /\b(university|college|institute|school|academy|polytechnic|universit[a\u00e4]t)\b/i;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/;
const URL = /((?:https?:\/\/)?(?:www\.)?(?:linkedin\.com|github\.com|behance\.net|dribbble\.com|gitlab\.com)\/[^\s|,;]+|(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:com|io|dev|me|net|org|co|app)\/?[^\s|,;]*)/i;

const clean = (s) => s.replace(/\s+/g, ' ').trim();
const wc = (s) => s.split(/\s+/).filter(Boolean).length;
const stripBullet = (s) => s.replace(BULLET, '').trim();
const isBullet = (s) => BULLET.test(s);
const titleCase = (s) => (s === s.toUpperCase() ? s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : s);
const digits = (s) => (s.match(/\d/g) || []).length;

function headingKey(line) {
  const t = line.replace(/[:\-_=*\u2022|]+$/g, '').replace(/^[\s*\-_=\u2022|]+/g, '').trim();
  if (!t || t.length > 42 || wc(t) > 5) return null;
  const hit = HEADINGS.find(([, re]) => re.test(t));
  return hit ? hit[0] : null;
}

function splitHead(text) {
  return text.split(/\s+\|\s+|\s+[\u2013\u2014-]\s+|\s*\u2022\s*|\s+at\s+|\s+@\s+|,\s+(?=[A-Z])/).map(clean).filter(Boolean);
}

function pickTitleCompany(parts) {
  if (parts.length === 0) return { title: '', company: '' };
  if (parts.length === 1) return { title: parts[0], company: '' };
  const idx = parts.findIndex((p) => JOB_WORDS.test(p));
  if (idx === -1) return { title: parts[0], company: parts.slice(1).join(', ') };
  return { title: parts[idx], company: parts.filter((_, i) => i !== idx).join(', ') };
}

/* ---------- header ---------- */
function parseHeader(lines) {
  const out = { fullName: '', jobTitle: '', email: '', phone: '', location: '', linkedin: '' };
  const L = lines.filter(Boolean);
  const all = L.join(' | ');
  out.email = (all.match(EMAIL) || [''])[0];
  const phone = L.join(' ').match(/(\+?\(?\d[\d\s().-]{8,}\d)/);
  if (phone && digits(phone[0]) >= 9 && digits(phone[0]) <= 15) out.phone = clean(phone[0]);
  const url = all.replace(EMAIL, ' ').match(URL);
  if (url) out.linkedin = url[0].replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/[.,;]$/, '');

  const nameIdx = L.findIndex((l) => !EMAIL.test(l) && digits(l) === 0 && wc(l) >= 1 && wc(l) <= 6 && !l.includes('|') && !URL.test(l) && !JOB_WORDS.test(l));
  const nameIdxFallback = nameIdx === -1 ? L.findIndex((l) => !EMAIL.test(l) && digits(l) === 0 && wc(l) <= 6) : nameIdx;
  if (nameIdxFallback !== -1) out.fullName = titleCase(clean(L[nameIdxFallback]));

  const segments = L.flatMap((l, i) => (i === nameIdxFallback ? [] : l.split(/\s*[|\u2022\u00B7]\s*/))).map(clean).filter(Boolean);
  const isContact = (s) => EMAIL.test(s) || URL.test(s) || digits(s) >= 6 || /^(email|phone|tel|mobile|linkedin|address)\b/i.test(s);
  out.location = segments.find((s) => !isContact(s) && /^[A-Za-z.'\- ]+,\s*[A-Za-z.'\- ]{2,}$/.test(s) && !JOB_WORDS.test(s)) || '';
  out.jobTitle = titleCase(segments.find((s) => !isContact(s) && s !== out.location && wc(s) <= 8 && !/[.!?]$/.test(s)) || '');
  return out;
}

/* ---------- skills ---------- */
function parseSkills(lines) {
  const seen = new Set();
  const skills = [];
  lines.filter(Boolean).forEach((raw) => {
    let l = stripBullet(raw);
    const colon = l.indexOf(':');
    if (colon > 0 && wc(l.slice(0, colon)) <= 4) l = l.slice(colon + 1);
    l.split(/[,;|\u2022\u00B7]|\s{2,}/).map(clean).forEach((s) => {
      const k = s.toLowerCase();
      if (s.length >= 1 && s.length <= 40 && !seen.has(k)) { seen.add(k); skills.push(s); }
    });
  });
  return skills.slice(0, 40);
}

/* ---------- experience ---------- */
function mergeBullets(lines) {
  const out = [];
  lines.forEach((raw) => {
    if (!raw.trim()) return;
    const bulleted = isBullet(raw);
    const l = stripBullet(raw);
    if (!l) return;
    const prev = out[out.length - 1];
    if (!bulleted && prev && !/[.!?;:]$/.test(prev) && /^[a-z(]/.test(l)) out[out.length - 1] = `${prev} ${l}`;
    else out.push(l);
  });
  return out;
}

function parseExperience(lines) {
  const L = lines.map((l) => l.trim());
  const anchors = [];
  L.forEach((l, i) => { if (l && !isBullet(l) && RANGE.test(l)) anchors.push(i); });

  if (!anchors.length) {
    const bullets = mergeBullets(L);
    return bullets.length ? [{ ...newEntry('experience'), bullets: bullets.join('\n') }] : [];
  }

  const metas = anchors.map((i, k) => {
    const m = RANGE.exec(L[i]);
    const rest = clean(L[i].replace(m[0], ' ').replace(/[()]/g, ' ').replace(/^[\s|,\u2013\u2014-]+|[\s|,\u2013\u2014-]+$/g, ''));
    const lastAnchor = k > 0 ? anchors[k - 1] : -1;
    let j = i - 1;
    while (j > lastAnchor && !L[j]) j -= 1;
    const prevOk = j > lastAnchor && L[j] && !isBullet(L[j]) && wc(L[j]) <= 9 && !/[.!?]$/.test(L[j]) && !headingKey(L[j]);

    const stripLoc = (c) => c.replace(/,\s*[A-Z][A-Za-z .]+,\s*[A-Z]{2}$/, '').replace(/,\s*[A-Z]{2}$/, '');
    let parts = splitHead(rest);
    let start = i;
    let direct = null;
    if (!parts.length && prevOk) {
      // Title and company on their own lines above a date-only line
      let j2 = j - 1;
      while (j2 > lastAnchor && !L[j2]) j2 -= 1;
      const second = j2 > lastAnchor && L[j2] && !isBullet(L[j2]) && wc(L[j2]) <= 7 && digits(L[j2]) === 0
        && !/[.!?]$/.test(L[j2]) && !headingKey(L[j2]) && (JOB_WORDS.test(L[j2]) || JOB_WORDS.test(L[j]));
      if (second) {
        const titleFirst = JOB_WORDS.test(L[j2]) || !JOB_WORDS.test(L[j]);
        direct = titleFirst ? { title: L[j2], company: stripLoc(L[j]) } : { title: L[j], company: stripLoc(L[j2]) };
        start = j2;
      } else { parts = splitHead(L[j]); start = j; }
    } else if (parts.length === 1 && prevOk) {
      const prevParts = splitHead(L[j]);
      parts = JOB_WORDS.test(parts[0]) && !JOB_WORDS.test(L[j]) ? [parts[0], ...prevParts] : [...prevParts, parts[0]];
      start = j;
    }
    const { title, company } = direct || pickTitleCompany(parts);
    return { i, start, title: titleCase(title), company, startDate: clean(m[1]), endDate: NOW_RE.test(m[2]) ? '' : clean(m[2]), current: NOW_RE.test(m[2]) };
  });

  return metas.map((m, k) => {
    const end = k + 1 < metas.length ? metas[k + 1].start : L.length;
    const bullets = mergeBullets(L.slice(m.i + 1, end));
    return { ...newEntry('experience'), jobTitle: m.title, company: m.company, startDate: m.startDate, endDate: m.endDate, current: m.current, bullets: bullets.join('\n') };
  });
}

/* ---------- education ---------- */
function parseEducation(lines) {
  const L = lines.map((l) => l.trim());
  let groups = [];
  let cur = [];
  L.forEach((l) => { if (!l) { if (cur.length) groups.push(cur); cur = []; } else cur.push(l); });
  if (cur.length) groups.push(cur);

  if (groups.length === 1) {
    const g = groups[0];
    const idx = g.map((l, i) => (DEGREE.test(l) ? i : -1)).filter((i) => i >= 0);
    if (idx.length > 1) groups = idx.map((s, k) => g.slice(s, idx[k + 1] ?? g.length));
  }

  return groups.map((g) => {
    const lines2 = g.map(stripBullet);
    let degree = lines2.find((l) => DEGREE.test(l)) || lines2[0] || '';
    let school = lines2.find((l) => l !== degree && SCHOOL.test(l)) || '';
    if (!school && SCHOOL.test(degree)) {
      const parts = splitHead(degree);
      const sIdx = parts.findIndex((p) => SCHOOL.test(p));
      if (sIdx !== -1) { school = parts[sIdx]; degree = parts.filter((_, i) => i !== sIdx).join(', ') || degree; }
    }
    if (!school) school = lines2.find((l) => l !== degree && !/(gpa|cgpa|honou?rs|\b(19|20)\d{2}\b)/i.test(l)) || '';
    const years = g.join(' ').match(/\b(19|20)\d{2}\b/g) || [];
    const extra = lines2.find((l) => l !== degree && l !== school && /(gpa|cgpa|honou?rs|cum laude|distinction|first class|coursework)/i.test(l)) || '';
    const stripYear = (s) => clean(s.replace(/\(?\b(19|20)\d{2}\b\)?(\s*[-\u2013\u2014]\s*\(?\b(19|20)\d{2}\b\)?)?/g, '').replace(/[|,\u2013\u2014-]+\s*$/g, ''));
    return { ...newEntry('education'), degree: stripYear(degree), school: stripYear(school), eduYear: years[years.length - 1] || '', eduExtra: extra };
  }).filter((e) => e.degree || e.school);
}

/* ---------- certifications and projects ---------- */
function parseCertifications(lines) {
  return lines.filter(Boolean).map(stripBullet).filter((l) => l.length > 2).slice(0, 15).map((l) => {
    const year = (l.match(/\b(19|20)\d{2}\b/) || [''])[0];
    const parts = clean(l.replace(/\(?\b(19|20)\d{2}\b\)?/g, '').replace(/[\s\-\u2013\u2014|,]+$/g, '')).split(/\s+[-\u2013\u2014|]\s+|,\s+/).map(clean).filter(Boolean);
    return { ...newEntry('certifications'), certName: parts[0] || '', certIssuer: parts.slice(1).join(', '), certYear: year };
  });
}

function parseProjects(lines) {
  const projects = [];
  lines.filter(Boolean).forEach((raw) => {
    const l = stripBullet(raw);
    const startsNew = !isBullet(raw) && wc(l) <= 14 && !/[.!?]$/.test(l) && (!projects.length || /^[A-Z0-9]/.test(l));
    if (startsNew) {
      const year = (l.match(/\b(19|20)\d{2}\b/) || [''])[0];
      const base = l.replace(/\(?\b(19|20)\d{2}\b\)?/g, '').trim();
      const [name, ...desc] = base.split(/\s+[-\u2013\u2014:]\s+|:\s+/);
      projects.push({ ...newEntry('projects'), projectName: clean(name), projectYear: year, projectDesc: clean(desc.join(' - ')) });
    } else if (projects.length) {
      const p = projects[projects.length - 1];
      p.projectDesc = clean(`${p.projectDesc} ${l}`).slice(0, 320);
    }
  });
  return projects.slice(0, 8);
}

/* ---------- main ---------- */
export function parseResumeText(raw) {
  const lines = (raw || '').replace(/\r/g, '').split('\n').map((l) => l.replace(/\t/g, ' ').replace(/[ \u00A0]{2,}/g, '  ').trim());

  const sections = [];
  let cur = { key: 'header', lines: [] };
  lines.forEach((l) => {
    const key = l ? headingKey(l) : null;
    if (key) { sections.push(cur); cur = { key, lines: [] }; } else cur.lines.push(l);
  });
  sections.push(cur);
  const get = (k) => sections.filter((s) => s.key === k).flatMap((s) => s.lines);

  const base = emptyResume();
  const personal = parseHeader(get('header').slice(0, 12));
  const summary = clean(get('summary').filter(Boolean).join(' '));
  const experience = parseExperience(get('experience'));
  const education = parseEducation(get('education'));
  const skills = parseSkills(get('skills'));
  const certifications = parseCertifications(get('certifications'));
  const projects = parseProjects(get('projects'));

  const warnings = [];
  if (!personal.fullName) warnings.push('We could not detect your name.');
  if (!personal.email) warnings.push('No email address was found.');
  if (!personal.phone) warnings.push('No phone number was found.');
  if (!experience.length) warnings.push('No work experience section was found. Add it in the Content tab.');
  if (!education.length) warnings.push('No education section was found.');
  if (!skills.length) warnings.push('No skills section was found.');

  const resume = {
    ...base,
    personal,
    summary,
    experience: experience.length ? experience : base.experience,
    education: education.length ? education : base.education,
    skills, certifications, projects,
  };
  return { resume, warnings };
}
