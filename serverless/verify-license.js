// Netlify Function. Save as netlify/functions/verify-license.js, then set VITE_LICENSE_API=/.netlify/functions/verify-license
// Checks a Premium license key with your payment provider so keys cannot be forged.
// NOTE: written against the providers' public license APIs; test it with a real test purchase before launch.
//
// Environment variables:
//   LICENSE_PROVIDER   lemonsqueezy (default) | gumroad
//   LS_STORE_ID        Lemon Squeezy store id   (and optional LS_PRODUCT_ID)
//   GUMROAD_PRODUCT_ID Gumroad product id
//   ALLOWED_ORIGIN     https://yourdomain.com
const headers = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};
const reply = (valid, message) => ({ statusCode: 200, headers, body: JSON.stringify({ valid, message }) });

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: '{}' };

  let key = '';
  try { key = String(JSON.parse(event.body || '{}').key || '').trim(); } catch { /* ignore */ }
  if (!key) return reply(false, 'Enter your license key.');

  try {
    if ((process.env.LICENSE_PROVIDER || 'lemonsqueezy') === 'gumroad') {
      const res = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ product_id: process.env.GUMROAD_PRODUCT_ID || '', license_key: key, increment_uses_count: 'false' }),
      });
      const d = await res.json();
      const p = d.purchase || {};
      return reply(Boolean(d.success) && !p.refunded && !p.chargebacked, 'That license key is not valid.');
    }

    const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ license_key: key }),
    });
    const d = await res.json();
    const storeOk = String(d.meta?.store_id) === String(process.env.LS_STORE_ID);
    const productOk = !process.env.LS_PRODUCT_ID || String(d.meta?.product_id) === String(process.env.LS_PRODUCT_ID);
    return reply(d.valid === true && storeOk && productOk, 'That license key is not valid.');
  } catch {
    return reply(false, 'Could not verify the key right now. Please try again.');
  }
};
