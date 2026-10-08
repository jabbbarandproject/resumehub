import { useEffect, useState } from 'react';
import { EVENT, getConsent } from '../services/consentService';

// null until the client has read the stored choice (keeps server and client markup identical)
export default function useConsent() {
  const [consent, setConsent] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => { setConsent(getConsent()); setReady(true); };
    read();
    window.addEventListener(EVENT, read);
    return () => window.removeEventListener(EVENT, read);
  }, []);
  return { consent, ready };
}
