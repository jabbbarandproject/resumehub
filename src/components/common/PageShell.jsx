import { Link } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import Seo from './Seo.jsx';
import AdSlot from './AdSlot.jsx';
import CtaBanner from '../home/CtaBanner.jsx';
import { PAGES } from '../../data/siteConfig';

// Shared layout for every content page: SEO tags, breadcrumbs, heading, body, ad, related links, CTA.
export default function PageShell({
  title, description, path, crumbLabel, h1, lead, actions, schema, type, children, related = [], cta = true, ad = true, narrow = false,
}) {
  const crumbs = path === '/' ? [{ label: 'Home', path: '/' }]
    : [{ label: 'Home', path: '/' }, { label: crumbLabel || h1, path }];

  return (
    <>
      <Seo title={title} description={description} path={path} schema={schema} type={type} crumbs={crumbs} />
      <div className={`container page ${narrow ? 'narrow' : ''}`}>
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.path}>
              {i < crumbs.length - 1 ? <Link to={c.path}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              {i < crumbs.length - 1 && <BsChevronRight aria-hidden="true" />}
            </span>
          ))}
        </nav>
        <header className="page-hero">
          <h1>{h1}</h1>
          {lead && <p className="lead">{lead}</p>}
          {actions && <div className="hero-actions">{actions}</div>}
        </header>
        {children}
        {ad && <AdSlot />}
        {related.length > 0 && (
          <section className="block" aria-labelledby="related-h">
            <h2 id="related-h">Related pages</h2>
            <div className="related-grid">
              {related.map((k) => (
                <Link key={k} to={PAGES[k].path} className="related-card">
                  <strong>{PAGES[k].label}</strong>
                  <span className="muted small">{PAGES[k].desc}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      {cta && <div className="container"><CtaBanner /></div>}
    </>
  );
}
