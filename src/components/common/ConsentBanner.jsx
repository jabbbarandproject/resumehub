import { Link } from 'react-router-dom';
import useConsent from '../../hooks/useConsent';
import { setConsent } from '../../services/consentService';

export default function ConsentBanner() {
  const { consent, ready } = useConsent();
  if (!ready || consent) return null;
  return (
    <div className="consent glass-solid no-print" role="dialog" aria-label="Cookie preferences">
      <p>
        We use optional cookies for analytics and ads. The resume builder works the same either way and your resume never leaves your device.{' '}
        <Link to="/privacy-policy">Privacy policy</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConsent('denied')}>Decline</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setConsent('granted')}>Accept</button>
      </div>
    </div>
  );
}
