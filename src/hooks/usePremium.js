import { useEffect, useState } from 'react';
import { LICENSE_EVENT, getLicense, revalidate } from '../services/licenseService';

// Reads the stored license after mount, so server and client markup match.
export default function usePremium() {
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => { setActive(Boolean(getLicense())); setReady(true); };
    read();
    revalidate();
    window.addEventListener(LICENSE_EVENT, read);
    return () => window.removeEventListener(LICENSE_EVENT, read);
  }, []);
  return { active, ready };
}
