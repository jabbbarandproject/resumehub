import { Link } from 'react-router-dom';
import { PAGES } from '../../data/siteConfig';

const COLS = [
  { title: 'Tools', keys: ['builder', 'templates', 'score', 'cover', 'premium'] },
  { title: 'Resources', keys: ['examples', 'guide', 'features', 'how', 'faq'] },
  { title: 'Resumes by role', keys: ['frontend', 'software', 'graduate'] },
  { title: 'Company', keys: ['about', 'contact', 'privacy', 'terms'] },
];

export default function Footer() {
  return (
    <footer className="footer no-print">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <img className="brand-logo" src="/logo-mark.png" alt="" width="34" height="34" /> ResumeHub
          </div>
          <p className="muted small">Free ATS-friendly resume builder. Your resume stays in your browser.</p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title} className="footer-col">
            <h2>{c.title}</h2>
            {c.keys.map((k) => <Link key={k} to={PAGES[k].path}>{PAGES[k].label}</Link>)}
          </nav>
        ))}
      </div>
      <div className="container footer-bottom">
        <p className="muted small">&copy; {new Date().getFullYear()} ResumeHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
