import { useEffect, useState } from 'react';
import { BsGem, BsX } from 'react-icons/bs';
import { activateLicense, checkoutUrl, premiumConfigured } from '../../services/licenseService';
import { PRICE_LABEL } from '../../data/siteConfig';
import useToast from '../../hooks/useToast';

export default function UnlockModal({ open, onClose }) {
  const toast = useToast();
  const [key, setKey] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const url = checkoutUrl();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg('');
    const r = await activateLicense(key);
    setBusy(false);
    if (r.ok) { toast('Premium unlocked'); onClose(); } else setMsg(r.message);
  };

  return (
    <div className="modal-backdrop no-print" onClick={onClose}>
      <div className="modal glass-solid" role="dialog" aria-modal="true" aria-label="Unlock Premium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2><BsGem aria-hidden="true" /> Unlock Premium</h2>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}><BsX /></button>
        </div>
        <p className="muted">One payment of <strong>{PRICE_LABEL}</strong> unlocks every premium resume: edit them freely and download as many PDFs as you like.</p>
        {url
          ? <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">Buy Premium for {PRICE_LABEL}</a>
          : <p className="help">The checkout link is not set yet (see README).</p>}
        <hr />
        <form onSubmit={submit}>
          <label className="label" htmlFor="licenseKey">Already purchased? Enter your license key</label>
          <div className="inline-add">
            <input id="licenseKey" className="input" value={key} onChange={(e) => setKey(e.target.value)} placeholder="XXXX-XXXX-XXXX-XXXX" autoComplete="off" />
            <button type="submit" className="btn btn-soft" disabled={busy}>{busy ? 'Checking...' : 'Unlock'}</button>
          </div>
          {msg && <p className="help error-text" role="alert">{msg}</p>}
          {!premiumConfigured() && <p className="help">License checking is not configured on this site yet.</p>}
        </form>
      </div>
    </div>
  );
}
