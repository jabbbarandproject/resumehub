const OPENERS = {
  formal: (role, org) => `I am writing to apply for the ${role} position at ${org}.`,
  friendly: (role, org) => `I was excited to see the ${role} opening at ${org}, and I would love to be considered.`,
  confident: (role, org) => `I am the ${role} that ${org} is looking for, and I would like to show you why.`,
};

export function buildCoverLetter({ name, currentTitle, jobTitle, company, achievement, skills, tone = 'formal', hiringManager }) {
  const role = (jobTitle || '').trim() || 'the open position';
  const org = (company || '').trim() || 'your company';
  const who = (name || '').trim() || 'Your Name';
  const current = (currentTitle || '').trim() ? `a ${currentTitle.trim()}` : 'a motivated professional';
  const opener = (OPENERS[tone] || OPENERS.formal)(role, org);

  const proof = (achievement || '').trim()
    ? `For example, I ${achievement.trim().replace(/^i\s+/i, '')}, which reflects the kind of impact I aim to bring to every role.`
    : 'Throughout my career I have focused on delivering measurable results and going beyond what was expected.';
  const skillLine = (skills || '').trim() ? ` My strengths include ${skills.trim()}.` : '';

  return [
    `Dear ${(hiringManager || '').trim() || 'Hiring Manager'},`,
    `${opener} As ${current} with a track record of delivering results, I am confident I can add real value to your team.`,
    `${proof}${skillLine} I am drawn to ${org} because of its reputation for excellence, and I would be glad to contribute my skills and experience.`,
    'I would welcome the chance to discuss how my background fits your goals. Thank you for your time and consideration.',
    `Sincerely,\n${who}`,
  ].join('\n\n');
}

// Used by the builder's Extras tab (takes the resume for name and title)
export const generateCoverLetter = ({ resume, jobTitle, company, achievement }) =>
  buildCoverLetter({
    name: resume.personal.fullName, currentTitle: resume.personal.jobTitle,
    jobTitle, company, achievement, skills: resume.skills.slice(0, 4).join(', '),
  });
