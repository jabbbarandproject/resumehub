import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ConsentBanner from '../common/ConsentBanner.jsx';
import { getConsent, loadAnalytics } from '../../services/consentService';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  useEffect(() => { if (getConsent() === 'granted') loadAnalytics(); }, []);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />
      <ScrollManager />
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <ConsentBanner />
    </>
  );
}
