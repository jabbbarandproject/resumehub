export const FAQ_GROUPS = [
  {
    group: 'About ATS',
    items: [
      { q: 'What is an ATS?', a: 'An applicant tracking system is software employers use to collect, parse, store and rank job applications. It turns your resume into structured data (name, contact details, job titles, dates, skills) that recruiters can search and filter.' },
      { q: 'What does ATS-friendly mean?', a: 'It means the software can read every word in the right order. That requires a single-column layout, real text (not images), standard section headings, common fonts and no tables, text boxes or graphics for key content.' },
      { q: 'Do all employers use an ATS?', a: 'Most mid-size and large employers do, and many small ones use a lightweight version through their job board. Assuming your resume will be parsed by software is the safe approach.' },
      { q: 'Is a high ATS score a guarantee of an interview?', a: 'No. A score only tells you how readable and well-matched your resume is. A recruiter still decides. Treat the score as a way to remove avoidable problems, then tailor the content to the job.' },
    ],
  },
  {
    group: 'Using the builder',
    items: [
      { q: 'Is ResumeHub really free?', a: 'Yes. There is no account, paywall or watermark. The site may show ads to cover running costs.' },
      { q: 'How is the ATS score calculated?', a: 'It is a transparent checklist, not a black box. It checks contact details, numbers in your bullets, action verbs, length, standard sections, experience and skills. Each check is pass or fail and tells you how to fix it.' },
      { q: 'How do I download my resume as a PDF?', a: 'Click Download PDF in the builder. The file is generated in your browser with real selectable text, so ATS software can read it. No browser header or footer is added.' },
      { q: 'Can I edit a resume after I download it?', a: 'Yes. Every resume you save or download is kept in My Resumes on your device. Open it from there, change anything, and download again.' },
      { q: 'Which template should I choose?', a: 'Classic and Modern suit most jobs. Choose Compact if you need to fit more on one page, Academic for research or education roles, and Tech if you are applying for developer jobs. All ten are ATS-safe.' },
      { q: 'How long should my resume be?', a: 'One page for under ten years of experience, two pages at most for senior roles. The preview shows page breaks so you can see how it will print.' },
    ],
  },
  {
    group: 'Privacy and data',
    items: [
      { q: 'Is my resume uploaded anywhere?', a: 'No. Your resume is created and stored in your own browser using localStorage. There is no account and no server that receives your resume content.' },
      { q: 'What happens if I clear my browser data?', a: 'Saved resumes live in your browser, so clearing site data removes them. Use Export backup on the My Resumes page to keep a copy as a file you can import later.' },
      { q: 'Why does the site show a cookie banner?', a: 'We ask permission before loading optional analytics and advertising scripts. The builder works the same whether you accept or decline.' },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
