import { ADSENSE_CLIENT, GA_ID } from '../data/siteConfig';

const KEY = 'resumehub_consent_v1';
export const EVENT = 'resumehub:consent';

export const getConsent = () => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};

export function setConsent(value) {
  try { localStorage.setItem(KEY, value); } catch { /* ignore */ }
  window.dispatchEvent(new Event(EVENT));
  if (value === 'granted') loadAnalytics();
}

const inject = (src, attrs = {}) => {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement('script');
  s.src = src; s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
};

export function loadAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.__gaLoaded) return;
  window.__gaLoaded = true;
  inject(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

export function loadAds() {
  if (!ADSENSE_CLIENT || typeof window === 'undefined') return;
  inject(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`, { crossorigin: 'anonymous' });
}
