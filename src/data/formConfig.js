export const EXPERIENCE_FIELDS = [
  { key: 'jobTitle', placeholder: 'Job title (e.g. Marketing Manager)', span: 6 },
  { key: 'company', placeholder: 'Company name', span: 6 },
  { key: 'startDate', placeholder: 'Start (e.g. Jan 2021)', span: 5 },
  { key: 'endDate', placeholder: 'End (e.g. Dec 2023)', span: 5 },
  { key: 'current', type: 'checkbox', label: 'Current', span: 2 },
  {
    key: 'bullets', type: 'textarea', rows: 4, span: 12,
    placeholder: 'One achievement per line, e.g.\nLed a team of 8 engineers and increased engagement by 32%',
    help: 'One bullet per line. Start with an action verb and add numbers where possible.',
  },
];

export const EDUCATION_FIELDS = [
  { key: 'degree', placeholder: 'Degree (e.g. B.S. Computer Science)', span: 6 },
  { key: 'school', placeholder: 'School name', span: 6 },
  { key: 'eduYear', placeholder: 'Graduation year (e.g. 2020)', span: 6 },
  { key: 'eduExtra', placeholder: 'Honors or GPA (optional)', span: 6 },
];

export const CERT_FIELDS = [
  { key: 'certName', placeholder: 'Certification (e.g. PMP)', span: 6 },
  { key: 'certIssuer', placeholder: 'Issuer (e.g. PMI)', span: 4 },
  { key: 'certYear', placeholder: 'Year', span: 2 },
];

export const PROJECT_FIELDS = [
  { key: 'projectName', placeholder: 'Project name', span: 8 },
  { key: 'projectYear', placeholder: 'Year', span: 4 },
  { key: 'projectDesc', type: 'textarea', rows: 2, span: 12, placeholder: 'What you built and the result it had.' },
];
