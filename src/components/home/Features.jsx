import { Link } from 'react-router-dom';
import { FEATURE_DETAILS } from '../../data/content/features';

export default function Features({ limit = 6 }) {
  return (
    <section className="container section" aria-labelledby="features-h">
      <div className="section-head">
        <h2 id="features-h">Everything a screening-ready resume needs</h2>
        <p className="muted">The essentials of a good builder, plus checks recruiters wish every candidate ran.</p>
      </div>
      <div className="feature-grid">
        {FEATURE_DETAILS.slice(0, limit).map(({ icon: Icon, title, text }) => (
          <article className="feature" key={title}>
            <span className="icon-tile"><Icon aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p className="muted">{text}</p>
          </article>
        ))}
      </div>
      <p className="more-link"><Link to="/features">See all features</Link></p>
    </section>
  );
}
