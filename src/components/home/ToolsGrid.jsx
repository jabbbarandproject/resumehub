import { Link } from 'react-router-dom';
import { BsEnvelopePaper, BsFileEarmarkText, BsSpeedometer2 } from 'react-icons/bs';
import { PAGES } from '../../data/siteConfig';

const TOOLS = [
  { key: 'builder', icon: BsFileEarmarkText }, { key: 'score', icon: BsSpeedometer2 }, { key: 'cover', icon: BsEnvelopePaper },
];

export default function ToolsGrid() {
  return (
    <section className="container section" aria-labelledby="tools-h">
      <div className="section-head"><h2 id="tools-h">Free tools for your job search</h2></div>
      <div className="feature-grid three">
        {TOOLS.map(({ key, icon: Icon }) => (
          <Link key={key} to={PAGES[key].path} className="feature link-card">
            <span className="icon-tile"><Icon aria-hidden="true" /></span>
            <h3>{PAGES[key].label}</h3>
            <p className="muted">{PAGES[key].desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
