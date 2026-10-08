// Single source of truth shared by the live preview and the PDF generator,
// so what you see is what you download. 1 preview px = 1 PDF pt.
export const PAGE = {
  a4: { w: 595.28, h: 841.89, label: 'A4' },
  letter: { w: 612, h: 792, label: 'Letter' },
};

export const MARGIN = { narrow: 36, normal: 54, wide: 72 };

// Only fonts every PDF reader and ATS handles natively.
export const FONTS = {
  sans: { label: 'Sans serif', sample: 'Arial style', pdf: 'helvetica', css: "Helvetica, Arial, sans-serif" },
  serif: { label: 'Serif', sample: 'Times style', pdf: 'times', css: "'Times New Roman', Times, serif" },
  mono: { label: 'Monospace', sample: 'Courier style', pdf: 'courier', css: "'Courier New', Courier, monospace" },
};

// Font-size multipliers relative to the base size
export const SCALE = { name: 2.1, title: 1.15, contact: 0.92, section: 0.95, small: 0.92 };

export const ACCENTS = [
  { name: 'Leaf green', value: '#1a8a52' },
  { name: 'Black', value: '#111111' },
  { name: 'Navy', value: '#1f3a8a' },
  { name: 'Teal', value: '#0f766e' },
  { name: 'Maroon', value: '#9f1239' },
  { name: 'Slate', value: '#475569' },
];

export const DEFAULT_SETTINGS = {
  accent: '#1a8a52',
  fontFamily: 'sans',
  fontSize: 10.5,
  lineHeight: 1.4,
  margin: 'normal',
  headerAlign: 'left',
  headingAlign: 'left',
  headingStyle: 'rule', // rule | none | band | bar
  nameUpper: false,
  headerRule: false,
  pageSize: 'a4',
  sectionOrder: 'standard', // standard | graduate (education and projects first)
};

export const SECTION_ORDERS = {
  standard: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
  graduate: ['summary', 'education', 'projects', 'skills', 'experience', 'certifications'],
};

// Ten templates. Every one is single column, real text, standard fonts,
// no tables, images or icons, so all of them are ATS safe.
export const TEMPLATES = [
  { id: 'classic', bestFor: 'Law, finance, government and traditional employers', name: 'Classic', note: 'Centered serif, black rules',
    settings: { fontFamily: 'serif', headerAlign: 'center', headingStyle: 'rule', accent: '#111111', fontSize: 11, lineHeight: 1.35 } },
  { id: 'modern', bestFor: 'Most corporate and startup roles', name: 'Modern', note: 'Clean sans, green accents',
    settings: { fontFamily: 'sans', headerAlign: 'left', headingStyle: 'rule', accent: '#1a8a52' } },
  { id: 'minimal', bestFor: 'Designers, writers and senior professionals', name: 'Minimal', note: 'Plain headings, wide margins',
    settings: { fontFamily: 'sans', headerAlign: 'left', headingStyle: 'none', accent: '#475569', margin: 'wide', lineHeight: 1.5 } },
  { id: 'executive', bestFor: 'Managers, directors and senior leaders', name: 'Executive', note: 'Serif, capitals, navy',
    settings: { fontFamily: 'serif', headerAlign: 'left', headingStyle: 'rule', accent: '#1f3a8a', nameUpper: true, headerRule: true, fontSize: 11 } },
  { id: 'compact', bestFor: 'Long careers that must fit on one page', name: 'Compact', note: 'Fits more on one page',
    settings: { fontFamily: 'sans', headerAlign: 'left', headingStyle: 'rule', accent: '#0f766e', margin: 'narrow', fontSize: 10, lineHeight: 1.25 } },
  { id: 'banner', bestFor: 'Marketing, sales and operations roles', name: 'Banner', note: 'Tinted section bands',
    settings: { fontFamily: 'sans', headerAlign: 'left', headingStyle: 'band', accent: '#136b40' } },
  { id: 'elegant', bestFor: 'Consulting, hospitality and client-facing roles', name: 'Elegant', note: 'Centered serif, maroon',
    settings: { fontFamily: 'serif', headerAlign: 'center', headingAlign: 'center', headingStyle: 'none', accent: '#9f1239', nameUpper: true, headerRule: true, fontSize: 11, lineHeight: 1.45 } },
  { id: 'tech', bestFor: 'Software, IT and engineering roles', name: 'Tech', note: 'Monospace with side bars',
    settings: { fontFamily: 'mono', headerAlign: 'left', headingStyle: 'bar', accent: '#0f766e', fontSize: 9.5 } },
  { id: 'corporate', bestFor: 'Business, banking and project management', name: 'Corporate', note: 'Navy sans with header line',
    settings: { fontFamily: 'sans', headerAlign: 'left', headingStyle: 'rule', accent: '#1f3a8a', headerRule: true } },
  { id: 'academic', bestFor: 'Research, teaching and graduate applications', name: 'Academic', note: 'Traditional serif, side bars',
    settings: { fontFamily: 'serif', headerAlign: 'left', headingStyle: 'bar', accent: '#111111', fontSize: 11, lineHeight: 1.4 } },
];

export const TEMPLATE_PRESETS = Object.fromEntries(TEMPLATES.map((t) => [t.id, t.settings]));

// Full settings for a template (defaults first so no key is ever missing)
export const initialSettings = (template = 'modern') => ({ ...DEFAULT_SETTINGS, ...(TEMPLATE_PRESETS[template] || {}) });
