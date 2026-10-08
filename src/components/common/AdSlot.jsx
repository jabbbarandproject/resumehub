import { useEffect, useRef } from 'react';
import useConsent from '../../hooks/useConsent';
import { loadAds } from '../../services/consentService';
import { ADSENSE_CLIENT, ADSENSE_SLOT } from '../../data/siteConfig';

// Renders nothing until VITE_ADSENSE_CLIENT is set AND the visitor has accepted cookies.
export default function AdSlot({ slot = ADSENSE_SLOT }) {
  const { consent } = useConsent();
  const pushed = useRef(false);
  const active = Boolean(ADSENSE_CLIENT) && consent === 'granted';

  useEffect(() => {
    if (!active || pushed.current) return;
    loadAds();
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); pushed.current = true; } catch { /* ignore */ }
  }, [active]);

  if (!active) return null;
  return (
    <aside className="ad-slot no-print" aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
