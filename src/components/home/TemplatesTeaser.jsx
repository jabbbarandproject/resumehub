import { Link } from 'react-router-dom';
import TemplateThumb from '../common/TemplateThumb.jsx';
import { DEFAULT_SETTINGS, TEMPLATES } from '../../data/layoutSpec';

export default function TemplatesTeaser() {
  return (
    <section className="container section" aria-labelledby="tpl-h">
      <div className="section-head">
        <h2 id="tpl-h">Ten templates, all ATS-friendly</h2>
        <p className="muted">One column, real text and standard fonts in every design. Pick one and change the color, font and spacing.</p>
      </div>
      <div className="tpl-row">
        {TEMPLATES.slice(0, 5).map((t) => (
          <Link to="/resume-templates" key={t.id} className="tpl-card">
            <TemplateThumb settings={{ ...DEFAULT_SETTINGS, ...t.settings }} />
            <strong>{t.name}</strong>
          </Link>
        ))}
      </div>
      <p className="more-link"><Link to="/resume-templates">Browse all resume templates</Link></p>
    </section>
  );
}
