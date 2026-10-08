import { CHECKOUT_URL, LICENSE_API, LICENSE_HASHES } from '../data/siteConfig';

const KEY = 'resumehub_license_v1';
export const LICENSE_EVENT = 'resumehub:license';

export const premiumConfigured = () => Boolean(LICENSE_API || LICENSE_HASHES.length);
export const checkoutUrl = () => CHECKOUT_URL;

export const getLicense = () => {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
};

const store = (value) => {
  try { if (value) localStorage.setItem(KEY, JSON.stringify(value)); else localStorage.removeItem(KEY); } catch { /* ignore */ }
  window.dispatchEvent(new Event(LICENSE_EVENT));
};

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Checks a key with your verification endpoint, or against hashed keys. */
export async function verifyKey(key) {
  const k = (key || '').trim();
  if (!k) return { ok: false, message: 'Enter your license key.' };

  if (LICENSE_API) {
    try {
      const res = await fetch(LICENSE_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: k }) });
      const data = await res.json();
      return data.valid ? { ok: true } : { ok: false, message: data.message || 'That license key is not valid.' };
    } catch {
      return { ok: false, message: 'Could not reach the license server. Please try again.' };
    }
  }
  if (LICENSE_HASHES.length) {
    const ok = LICENSE_HASHES.includes(await sha256(k));
    return ok ? { ok: true } : { ok: false, message: 'That license key is not valid.' };
  }
  return { ok: false, message: 'Premium purchases are not open yet.' };
}

export async function activateLicense(key) {
  const result = await verifyKey(key);
  if (result.ok) store({ key: key.trim(), activatedAt: Date.now(), checkedAt: Date.now() });
  return result;
}

export const clearLicense = () => store(null);

/** Re-checks an API-verified license at most once a day, so refunded keys stop working. */
export async function revalidate() {
  const lic = getLicense();
  if (!lic || !LICENSE_API || Date.now() - (lic.checkedAt || 0) < 86400000) return;
  const result = await verifyKey(lic.key);
  if (result.ok) store({ ...lic, checkedAt: Date.now() });
  else if (result.message !== 'Could not reach the license server. Please try again.') store(null);
}
