import { resumeToText } from './resumeText';

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'you', 'your', 'are', 'will', 'have', 'has', 'that', 'this', 'our',
  'from', 'who', 'all', 'can', 'into', 'about', 'their', 'they', 'but', 'not', 'any', 'may', 'such',
  'etc', 'other', 'per', 'what', 'job', 'role', 'work', 'team', 'skills', 'experience', 'years',
  'including', 'would', 'should', 'must', 'also', 'ability', 'strong', 'looking',
]);

export function extractKeywords(text, limit = 30) {
  const words = text.toLowerCase().match(/[a-z][a-z0-9+/#.-]{2,}/g) || [];
  const freq = {};
  words.forEach((raw) => {
    const w = raw.replace(/^[-.]+|[-.]+$/g, '');
    if (!w || STOP_WORDS.has(w)) return;
    freq[w] = (freq[w] || 0) + 1;
  });
  return Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, limit);
}

export function matchKeywords(jobDescription, resume) {
  return matchKeywordsText(jobDescription, resumeToText(resume));
}

export function matchKeywordsText(jobDescription, resumeText) {
  const keywords = extractKeywords(jobDescription);
  const haystack = resumeText.toLowerCase();
  const found = keywords.filter((k) => haystack.includes(k));
  const missing = keywords.filter((k) => !haystack.includes(k));
  const percent = keywords.length ? Math.round((found.length / keywords.length) * 100) : 0;
  return { found, missing, percent, total: keywords.length };
}
