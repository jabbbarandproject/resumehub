// One place for site-wide settings. Override with a .env file (see .env.example).
const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

export const SITE_NAME = 'ResumeHub';
export const SITE_URL = (env.VITE_SITE_URL || 'https://yourdomain.com').replace(/\/$/, '');
export const CONTACT_EMAIL = env.VITE_CONTACT_EMAIL || 'abduljabbar1572817@gmail.com';
export const ADSENSE_CLIENT = env.VITE_ADSENSE_CLIENT || ''; // e.g. ca-pub-1234567890123456
export const ADSENSE_SLOT = env.VITE_ADSENSE_SLOT || '';     // in-article ad unit id
export const GA_ID = env.VITE_GA_ID || '';                    // e.g. G-XXXXXXXXXX

// Premium (paid ready-made resumes)
export const CHECKOUT_URL = env.VITE_CHECKOUT_URL || '';       // Stripe / Gumroad / Lemon Squeezy / Paddle checkout link
export const LICENSE_API = env.VITE_LICENSE_API || '';         // your serverless endpoint that verifies license keys
export const LICENSE_HASHES = (env.VITE_LICENSE_KEY_HASHES || '').split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);
export const PRICE_LABEL = env.VITE_PREMIUM_PRICE || '$9';
export const PRICE_VALUE = env.VITE_PREMIUM_PRICE_VALUE || '9';
export const PRICE_CURRENCY = env.VITE_PREMIUM_CURRENCY || 'USD';
export const UPDATED = 'October 7, 2026';

// Every indexable page. Used by the navbar, footer, related links and the sitemap.
export const PAGES = {
  home: { path: '/', label: 'Home', priority: 1.0 },
  builder: { path: '/ats-resume-builder', label: 'ATS Resume Builder', desc: 'Build an ATS-friendly resume with a live score and PDF download.', priority: 0.95 },
  premium: { path: '/premium', label: 'Premium Resumes', desc: 'Ready-made, designed and ATS-tested resumes you can edit and download.', priority: 0.9 },
  templates: { path: '/resume-templates', label: 'Resume Templates', desc: 'Ten single-column templates that every ATS can read.', priority: 0.9 },
  examples: { path: '/resume-examples', label: 'Resume Examples', desc: 'Summary and bullet point examples you can adapt.', priority: 0.9 },
  score: { path: '/resume-score-checker', label: 'Resume Score Checker', desc: 'Paste your resume and a job post to get an ATS score.', priority: 0.9 },
  guide: { path: '/ats-resume-guide', label: 'ATS Resume Guide', desc: 'How applicant tracking systems read your resume.', priority: 0.9 },
  cover: { path: '/cover-letter-builder', label: 'Cover Letter Builder', desc: 'Write a tailored cover letter and download it as PDF.', priority: 0.85 },
  frontend: { path: '/resume-for-frontend-developer', label: 'Frontend Developer Resume', desc: 'Example, skills and bullet points for frontend roles.', priority: 0.8 },
  software: { path: '/resume-for-software-engineer', label: 'Software Engineer Resume', desc: 'Example, skills and bullet points for engineering roles.', priority: 0.8 },
  graduate: { path: '/resume-for-fresh-graduate', label: 'Fresh Graduate Resume', desc: 'How to write a resume with little or no experience.', priority: 0.8 },
  features: { path: '/features', label: 'Features', desc: 'Everything ResumeHub includes, for free.', priority: 0.6 },
  how: { path: '/how-it-works', label: 'How It Works', desc: 'From blank page to PDF in five steps.', priority: 0.6 },
  faq: { path: '/faq', label: 'FAQ', desc: 'Answers about ATS, privacy and the builder.', priority: 0.6 },
  about: { path: '/about', label: 'About', desc: 'Why ResumeHub exists.', priority: 0.4 },
  contact: { path: '/contact', label: 'Contact', desc: 'Get in touch.', priority: 0.4 },
  privacy: { path: '/privacy-policy', label: 'Privacy Policy', desc: 'How your data is handled.', priority: 0.3 },
  terms: { path: '/terms', label: 'Terms of Use', desc: 'Terms for using ResumeHub.', priority: 0.3 },
};
