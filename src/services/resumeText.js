// Splits a textarea into clean bullet lines (strips any typed "-", "*" or bullet marker)
export function parseBullets(text) {
  return (text || '')
    .split('\n')
    .map((l) => l.trim().replace(/^[-*\u2022]\s*/, ''))
    .filter(Boolean);
}

export function getBulletLines(resume) {
  return resume.experience.flatMap((e) => parseBullets(e.bullets));
}

export function resumeToText(r) {
  const p = r.personal;
  const parts = [p.fullName, p.jobTitle, p.email, p.phone, p.location, p.linkedin];
  if (r.summary) parts.push('Professional Summary', r.summary);
  if (r.experience.some((e) => e.jobTitle || e.company || e.bullets)) {
    parts.push('Work Experience');
    r.experience.forEach((e) => parts.push(e.jobTitle, e.company, e.startDate, e.endDate, e.bullets));
  }
  if (r.education.some((e) => e.degree || e.school)) {
    parts.push('Education');
    r.education.forEach((e) => parts.push(e.degree, e.school, e.eduYear, e.eduExtra));
  }
  if (r.skills.length) parts.push('Skills', r.skills.join(' '));
  r.certifications.forEach((c) => parts.push(c.certName, c.certIssuer, c.certYear));
  r.projects.forEach((c) => parts.push(c.projectName, c.projectYear, c.projectDesc));
  return parts.filter(Boolean).join('\n');
}

export const countWords = (text) => (text || '').trim().split(/\s+/).filter(Boolean).length;

export function hasAnyContent(r) {
  return Boolean(
    r.personal.fullName || r.personal.email || r.summary || r.skills.length ||
    r.experience.some((e) => e.jobTitle || e.company || e.bullets) ||
    r.education.some((e) => e.degree || e.school) ||
    r.certifications.some((c) => c.certName) || r.projects.some((p) => p.projectName)
  );
}
