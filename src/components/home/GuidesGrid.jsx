import { Link } from 'react-router-dom';
import { PAGES } from '../../data/siteConfig';

const KEYS = ['frontend', 'software', 'graduate', 'guide'];

export default function GuidesGrid() {
  return (
    <section className="container section" aria-labelledby="guides-h">
      <div className="section-head"><h2 id="guides-h">Resume guides and examples</h2></div>
      <div className="related-grid">
        {KEYS.map((k) => (
          <Link key={k} to={PAGES[k].path} className="related-card">
            <strong>{PAGES[k].label}</strong>
            <span className="muted small">{PAGES[k].desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
