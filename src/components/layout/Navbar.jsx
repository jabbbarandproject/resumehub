import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BsChevronDown, BsGem, BsList, BsMagic, BsX } from 'react-icons/bs';
import { listResumes } from '../../services/resumeLibrary';
import { PAGES } from '../../data/siteConfig';

const cls = ({ isActive }) => `nav-link ${isActive ? 'is-current' : ''}`;
const MENUS = [
  { id: 'tools', label: 'Tools', items: ['builder', 'score', 'cover', 'templates'] },
  { id: 'guides', label: 'Guides', items: ['guide', 'frontend', 'software', 'graduate'] },
  { id: 'more', label: 'More', items: ['features', 'how', 'faq', 'about'] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); setMenu(null); setCount(listResumes().length); }, [pathname]);

  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenu(null); };
    const onKey = (e) => { if (e.key === 'Escape') setMenu(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <header className="nav-wrap no-print" ref={ref}>
      <nav className="navbar glass" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="ResumeHub home">
          <img className="brand-logo" src="/logo-mark.png" alt="" width="38" height="38" />
          <span>ResumeHub</span>
        </Link>

        <button type="button" className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <BsX /> : <BsList />}
        </button>

        <div className={`nav-menu ${open ? 'is-open' : ''}`}>
          <NavLink to={PAGES.templates.path} className={cls}>Templates</NavLink>
          <NavLink to={PAGES.examples.path} className={cls}>Examples</NavLink>
          {MENUS.map((m) => (
            <div className="dropdown" key={m.id}>
              <button type="button" className="nav-link dropdown-btn" aria-expanded={menu === m.id} aria-haspopup="true" onClick={() => setMenu(menu === m.id ? null : m.id)}>
                {m.label} <BsChevronDown aria-hidden="true" />
              </button>
              {menu === m.id && (
                <div className="dropdown-panel glass-solid">
                  {m.items.map((k) => (
                    <Link key={k} to={PAGES[k].path} className="dropdown-link">
                      <strong>{PAGES[k].label}</strong>
                      <span className="small muted">{PAGES[k].desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <NavLink to={PAGES.premium.path} className={({ isActive }) => `nav-link premium-link ${isActive ? 'is-current' : ''}`}><BsGem aria-hidden="true" /> Premium</NavLink>
          <NavLink to="/my-resumes" className={cls}>
            My resumes{count > 0 && <span className="nav-count">{count}</span>}
          </NavLink>
          <Link to="/builder" className="btn btn-primary btn-sm"><BsMagic aria-hidden="true" /> Build my resume</Link>
        </div>
      </nav>
    </header>
  );
}
