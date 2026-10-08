export const GUIDE = [
  {
    id: 'what-is-ats', title: 'What an ATS is and why it matters',
    paragraphs: [
      'An applicant tracking system (ATS) is the software that sits between you and a recruiter. When you apply online, your resume is uploaded to the ATS, converted to plain text, and broken into fields such as name, contact details, job titles, employers, dates, education and skills.',
      'Recruiters then search and filter those fields. If the software cannot read your resume properly, you can look like a weak match even when you are well qualified. Writing for the ATS first and the human second removes that risk.',
    ],
  },
  {
    id: 'how-it-reads', title: 'How an ATS reads your resume',
    paragraphs: ['Most systems follow the same basic steps:'],
    list: [
      'Extract all text from the file in reading order, top to bottom.',
      'Detect section headings (Experience, Education, Skills) to decide which text belongs where.',
      'Pull out the name, email, phone number and location from the top of the page.',
      'Match job titles, employers and date ranges to build a work history.',
      'Compare your wording with the job description to rank how relevant you are.',
    ],
  },
  {
    id: 'formatting', title: 'Formatting rules that keep your resume readable',
    paragraphs: ['Layout tricks that look good to people often scramble the text order for software. Stick to these rules:'],
    list: [
      'Use a single column. Two-column layouts can interleave lines from different sections.',
      'Keep contact details in the page body, not in the header or footer, where some systems ignore them.',
      'Use standard fonts such as Arial, Times New Roman or Courier at 10 to 12 points.',
      'Avoid tables, text boxes, icons, photos, skill bars and star ratings.',
      'Use simple round bullets, not custom symbols.',
      'Write dates in one consistent format, for example Jan 2022 - Mar 2024.',
      'Keep margins between 0.5 and 1 inch so nothing is cut off.',
    ],
  },
  {
    id: 'headings', title: 'Section headings to use',
    paragraphs: ['Use the headings the software expects. Creative names like "My Journey" or "Where I have been" can cause a section to be missed.'],
    list: ['Professional Summary', 'Work Experience (or Experience)', 'Education', 'Skills', 'Certifications', 'Projects'],
  },
  {
    id: 'keywords', title: 'How to use keywords without stuffing',
    paragraphs: [
      'Read the job description and note the skills, tools and responsibilities that repeat. If they genuinely describe your experience, use the same wording in your summary, skills and bullet points. If the posting says "stakeholder management", write that rather than "working with people".',
      'Never paste invisible or repeated keywords. Modern systems and recruiters spot it, and it can get you rejected. Use the keyword match tool in the builder to see which important terms are missing, then add them only where they are true.',
    ],
  },
  {
    id: 'bullets', title: 'Writing bullet points that score well',
    paragraphs: [
      'A strong bullet follows one formula: action verb, what you did, and the measurable result. Numbers make the impact concrete for both the software and the recruiter.',
      'Weak: "Responsible for improving the website." Strong: "Redesigned the checkout flow, cutting cart abandonment by 18% in three months."',
    ],
  },
  {
    id: 'file-format', title: 'Choosing a file format',
    paragraphs: [
      'A PDF with real text is safe with modern systems and keeps your layout intact. Avoid PDFs made from scanned images or screenshots because they contain no readable text. A quick test: open your PDF, select all, copy, and paste into a plain text editor. If the text appears in the right order, an ATS can read it. PDFs made by ResumeHub contain real text and pass this test.',
      'If an employer asks for a Word file or a plain text version, follow their instruction. The builder includes a one-click plain text copy for portals that want you to paste your resume.',
    ],
  },
  {
    id: 'mistakes', title: 'Common ATS mistakes',
    paragraphs: [],
    list: [
      'Putting your name and contact details in the page header.',
      'Using a graphic or Canva design exported as an image.',
      'Using unusual headings or hiding sections in text boxes.',
      'Listing skills only as icons, bars or charts.',
      'Sending one generic resume to every job instead of tailoring the keywords.',
      'Using different date formats or missing dates altogether.',
    ],
  },
  {
    id: 'checklist', title: 'Final checklist before you apply',
    paragraphs: [],
    list: [
      'Single column, standard fonts, no tables or images.',
      'Email and phone number are in the body of the page.',
      'Every bullet starts with an action verb and most include a number.',
      'Keywords from the job post appear naturally in your summary, skills and experience.',
      'The PDF text can be selected and copied in the correct order.',
      'Length is one page, or two for senior roles.',
    ],
  },
];
