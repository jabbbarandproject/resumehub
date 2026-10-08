import { Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell.jsx';
import FaqList from '../components/common/FaqList.jsx';
import { GUIDE } from '../data/content/guide';
import { FAQ_GROUPS, faqSchema } from '../data/content/faqs';
import { SITE_NAME, SITE_URL, UPDATED } from '../data/siteConfig';

const FAQS = FAQ_GROUPS[0].items;
const schema = [
  {
    '@type': 'Article', headline: 'ATS Resume Guide: How to Write a Resume That Applicant Tracking Systems Can Read',
    author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-mark.png` } },
    datePublished: '2026-10-07', dateModified: '2026-10-07', image: `${SITE_URL}/og-image.png`, mainEntityOfPage: `${SITE_URL}/ats-resume-guide`,
  },
  faqSchema(FAQS),
];

export default function AtsGuide() {
  return (
    <PageShell
      title="ATS Resume Guide: How to Write an ATS-Friendly Resume | ResumeHub"
      description="Learn how applicant tracking systems read resumes and how to format, word and export yours so it is parsed correctly. Rules, examples and a final checklist."
      path="/ats-resume-guide" crumbLabel="ATS resume guide" h1="ATS resume guide: how to write a resume that software can read"
      lead={`How applicant tracking systems read your resume, and exactly what to do about it. Updated ${UPDATED}.`}
      schema={schema} type="article" related={['score', 'templates', 'builder', 'examples']}
    >
      <div className="guide">
        <nav className="toc card" aria-label="Table of contents">
          <h2>In this guide</h2>
          <ol>{GUIDE.map((g) => <li key={g.id}><a href={`#${g.id}`}>{g.title}</a></li>)}</ol>
        </nav>
        <article className="guide-body">
          {GUIDE.map((g) => (
            <section key={g.id} id={g.id} className="block">
              <h2>{g.title}</h2>
              {g.paragraphs.map((p) => <p key={p}>{p}</p>)}
              {g.list && <ul className="plain-list">{g.list.map((i) => <li key={i}>{i}</li>)}</ul>}
            </section>
          ))}
          <section className="block">
            <h2>Put it into practice</h2>
            <p>Build a resume with these rules baked in using the <Link to="/ats-resume-builder">ATS resume builder</Link>, or paste an existing one into the <Link to="/resume-score-checker">resume score checker</Link> to see what to fix first.</p>
          </section>
          <section className="block narrow-block"><h2>ATS questions</h2><FaqList items={FAQS} /></section>
        </article>
      </div>
    </PageShell>
  );
}
