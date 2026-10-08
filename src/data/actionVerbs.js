export const ACTION_VERBS = {
  Leadership: ['Led', 'Directed', 'Managed', 'Supervised', 'Mentored', 'Coordinated', 'Spearheaded', 'Oversaw', 'Delegated', 'Championed', 'Guided', 'Orchestrated'],
  Communication: ['Presented', 'Negotiated', 'Authored', 'Persuaded', 'Facilitated', 'Advised', 'Collaborated', 'Communicated', 'Briefed', 'Articulated'],
  Technical: ['Developed', 'Engineered', 'Programmed', 'Automated', 'Architected', 'Deployed', 'Debugged', 'Integrated', 'Configured', 'Migrated', 'Optimized'],
  'Achievement and impact': ['Achieved', 'Increased', 'Reduced', 'Improved', 'Generated', 'Delivered', 'Exceeded', 'Accelerated', 'Boosted', 'Maximized', 'Saved'],
  'Creativity and strategy': ['Designed', 'Created', 'Launched', 'Pioneered', 'Conceptualized', 'Innovated', 'Devised', 'Strategized', 'Established', 'Formulated'],
  Analysis: ['Analyzed', 'Evaluated', 'Researched', 'Audited', 'Diagnosed', 'Forecasted', 'Investigated', 'Assessed', 'Identified', 'Quantified'],
};

export const ACTION_VERBS_FLAT = Array.from(new Set([
  ...Object.values(ACTION_VERBS).flat().map((v) => v.toLowerCase()),
  'led', 'built', 'drove', 'executed', 'trained', 'streamlined', 'initiated', 'resolved',
]));
