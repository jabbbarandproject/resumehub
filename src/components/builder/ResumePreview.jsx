import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import { hasAnyContent, parseBullets } from '../../services/resumeText';
import { FONTS, MARGIN, PAGE, SECTION_ORDERS } from '../../data/layoutSpec';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Entry = ({ title, sub, date, children }) => (
  <div className="r-entry">
    <div className="r-entry-head">
      <div>
        <span className="r-entry-title">{title}</span>
        {sub && <span className="r-entry-sub"> - {sub}</span>}
      </div>
      {date && <div className="r-entry-date">{date}</div>}
    </div>
    {children}
  </div>
);

export default function ResumePreview({ resume, showPageInfo = true }) {
  const { personal: p, summary, experience, education, skills, certifications, projects, settings: s } = resume;
  const page = PAGE[s.pageSize] || PAGE.a4;
  const m = MARGIN[s.margin] ?? MARGIN.normal;

  const wrapRef = useRef(null);
  const paperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [paperH, setPaperH] = useState(page.h);

  // The paper is laid out at real page size (1px = 1pt) and scaled to fit,
  // so the preview matches the downloaded PDF.
  useIsoLayoutEffect(() => {
    const wrap = wrapRef.current;
    const paper = paperRef.current;
    const update = () => {
      setScale(Math.min(1, wrap.clientWidth / page.w));
      setPaperH(paper.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    ro.observe(paper);
    return () => ro.disconnect();
  }, [page.w]);

  const stride = page.h - 2 * m;
  const pages = Math.max(1, Math.ceil((paperH - 2 * m) / stride));
  const breaks = Array.from({ length: pages - 1 }, (_, i) => m + (i + 1) * stride);

  const contact = [p.email, p.phone, p.location, p.linkedin].filter(Boolean).join('  |  ');
  const exps = experience.filter((e) => e.jobTitle || e.company || e.bullets);
  const edus = education.filter((e) => e.degree || e.school);
  const certs = certifications.filter((c) => c.certName);
  const projs = projects.filter((x) => x.projectName);
  const hc = `r-section ${s.headingStyle}`;
  const H = 'div'; // never a heading element: the page itself owns the h1/h2 outline

  const blocks = {
    summary: summary && (<><H className={hc}>Professional Summary</H><p className="r-p">{summary}</p></>),
    experience: exps.length > 0 && (
      <>
        <H className={hc}>Work Experience</H>
        {exps.map((e) => {
          const lines = parseBullets(e.bullets);
          const date = [e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' - ');
          return (
            <Entry key={e.id} title={e.jobTitle || 'Job title'} sub={e.company} date={date}>
              {lines.length > 0 && <ul className="r-bullets">{lines.map((l, i) => <li key={i}>{l}</li>)}</ul>}
            </Entry>
          );
        })}
      </>
    ),
    education: edus.length > 0 && (
      <>
        <H className={hc}>Education</H>
        {edus.map((e) => (
          <Entry key={e.id} title={e.degree || 'Degree'} sub={e.school} date={e.eduYear}>
            {e.eduExtra && <div className="r-note">{e.eduExtra}</div>}
          </Entry>
        ))}
      </>
    ),
    skills: skills.length > 0 && (<><H className={hc}>Skills</H><p className="r-p">{skills.join(', ')}</p></>),
    certifications: certs.length > 0 && (
      <>
        <H className={hc}>Certifications</H>
        {certs.map((c) => <Entry key={c.id} title={c.certName} sub={c.certIssuer} date={c.certYear} />)}
      </>
    ),
    projects: projs.length > 0 && (
      <>
        <H className={hc}>Projects</H>
        {projs.map((x) => (
          <Entry key={x.id} title={x.projectName} date={x.projectYear}>
            {x.projectDesc && <div className="r-note">{x.projectDesc}</div>}
          </Entry>
        ))}
      </>
    ),
  };

  const paperStyle = {
    width: page.w, minHeight: page.h, padding: m, transform: `scale(${scale})`,
    fontFamily: FONTS[s.fontFamily].css, fontSize: s.fontSize, lineHeight: s.lineHeight,
    '--fs': `${s.fontSize}px`, '--lh': s.lineHeight, '--accent': s.accent,
    '--header-align': s.headerAlign, '--heading-align': s.headingAlign,
  };

  return (
    <>
      {showPageInfo && (
        <div className="page-info no-print small muted">
          {pages} {pages === 1 ? 'page' : 'pages'} &middot; {page.label}
        </div>
      )}
      <div ref={wrapRef} className="paper-scale" style={{ height: paperH * scale }}>
        <div ref={paperRef} className="paper" style={paperStyle}>
          {!hasAnyContent(resume) ? (
            <div className="empty-preview">
              <BsFileEarmarkText aria-hidden="true" />
              <p>Start filling in the form and your resume will appear here.</p>
            </div>
          ) : (
            <>
              <div className={`r-header ${s.headerRule ? 'rule' : ''}`}>
                <div className={`r-name ${s.nameUpper ? 'upper' : ''}`}>{p.fullName || 'Your Name'}</div>
                {p.jobTitle && <div className="r-title">{p.jobTitle}</div>}
                {contact && <div className="r-contact">{contact}</div>}
              </div>
              {(SECTION_ORDERS[s.sectionOrder] || SECTION_ORDERS.standard).map((k) => (
                <Fragment key={k}>{blocks[k]}</Fragment>
              ))}
            </>
          )}

          {breaks.map((top, i) => (
            <div key={top} className="page-break no-print" style={{ top }}><span>Page {i + 2} starts</span></div>
          ))}
        </div>
      </div>
    </>
  );
}
