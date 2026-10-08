import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill, BsExclamationTriangleFill, BsSearch } from 'react-icons/bs';
import ImportResume from '../components/common/ImportResume.jsx';
import PageShell from '../components/common/PageShell.jsx';
import ScoreRing from '../components/common/ScoreRing.jsx';
import FaqList from '../components/common/FaqList.jsx';
import { SAMPLE_RESUME_TEXT, scoreResumeText } from '../services/textScoreService';
import { listResumes } from '../services/resumeLibrary';
import { resumeToText } from '../services/resumeText';
import { faqSchema } from '../data/content/faqs';
import { SITE_URL } from '../data/siteConfig';

const FAQS = [
  { q: 'How does the resume score checker work?', a: 'It runs ten transparent checks on the text you paste: contact details, standard sections, dates, numbers in bullets, action verbs, weak phrases and length. If you add a job description it also compares keywords.' },
  { q: 'Is my resume sent to a server?', a: 'No. The check runs entirely in your browser. The text you paste is not uploaded or stored.' },
  { q: 'Is this the same score an employer sees?', a: 'No. Employers use different systems and none publish a single score. This checker finds common problems that hurt readability and relevance.' },
  { q: 'What is a good score?', a: 'Aim for 80 or higher. Fix every failed check, then tailor your keywords to each job.' },
];
const schema = [
  { '@type': 'WebApplication', name: 'ResumeHub Resume Score Checker', url: `${SITE_URL}/resume-score-checker`, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  faqSchema(FAQS),
];

export default function ResumeScoreChecker() {
  const [text, setText] = useState('');
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [saved] = useState(listResumes);
  const [meta, setMeta] = useState(null);

  const check = () => setResult(text.trim() ? scoreResumeText(text, jd, meta) : { empty: true });
  const onUpload = (t, m) => { setText(t); setMeta(m); setResult(scoreResumeText(t, jd, m)); };

  return (
    <PageShell
      title="Free Resume Score Checker (ATS Check) | ResumeHub"
      description="Paste your resume and a job description to get a free ATS score, a keyword match and tips to fix every issue. Runs in your browser, nothing is uploaded."
      path="/resume-score-checker" h1="Free resume score checker"
      lead="Upload your resume (PDF, DOCX or TXT) or paste the text to see how an applicant tracking system is likely to read it. Add a job description to check keyword match."
      schema={schema} related={['guide', 'builder', 'examples']}
    >
      <section className="block checker">
        <div className="checker-inputs">
          <div className="checker-head">
            <label className="label" htmlFor="resumeText">Your resume text</label>
            <span className="checker-links">
              <ImportResume mode="text" onText={onUpload} label="Upload PDF, DOCX or TXT" className="btn btn-soft btn-sm" />
              <button type="button" className="link-btn" onClick={() => { setText(SAMPLE_RESUME_TEXT); setMeta(null); }}>Use sample</button>
              {saved.length > 0 && (
                <select className="input select-sm" aria-label="Load a saved resume" defaultValue="" onChange={(e) => { const r = saved.find((x) => x.id === e.target.value); if (r) setText(resumeToText(r.data)); }}>
                  <option value="" disabled>Load saved resume</option>
                  {saved.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              )}
            </span>
          </div>
          <textarea id="resumeText" className="input" rows={12} value={text} placeholder="Paste your resume here..." onChange={(e) => { setText(e.target.value); setMeta(null); }} />
          <label className="label mt" htmlFor="jdText">Job description (optional)</label>
          <textarea id="jdText" className="input" rows={6} value={jd} placeholder="Paste the job posting to check keyword match..." onChange={(e) => setJd(e.target.value)} />
          <button type="button" className="btn btn-primary mt" onClick={check}><BsSearch aria-hidden="true" /> Check my resume</button>
        </div>

        <div className="checker-results card" aria-live="polite">
          {!result && <p className="muted">Your score and tips appear here.</p>}
          {result?.empty && <p className="muted">Paste your resume text first.</p>}
          {result && !result.empty && (
            <>
              <div className="ats-top"><ScoreRing value={result.score} size={92} /><div><strong>{result.score >= 80 ? 'Looks ATS-ready' : result.score >= 50 ? 'Good start' : 'Needs work'}</strong><div className="small muted">{result.words} words</div></div></div>
              <ul className="checklist">
                {result.checks.map((c) => (
                  <li key={c.label} className={c.pass ? 'ok' : 'warn'}>
                    {c.pass ? <BsCheckCircleFill aria-hidden="true" /> : <BsExclamationTriangleFill aria-hidden="true" />}
                    <div><span>{c.label}</span>{!c.pass && <div className="tip">{c.tip}</div>}</div>
                  </li>
                ))}
              </ul>
              {result.keywordResult && (
                <div className="kw-results">
                  <hr />
                  <p><strong>{result.keywordResult.percent}%</strong> keyword match ({result.keywordResult.found.length} of {result.keywordResult.total})</p>
                  {result.keywordResult.missing.length > 0 && (<><div className="small bold">Missing. Add if relevant</div><div className="kw-list">{result.keywordResult.missing.map((k) => <span key={k} className="kw kw-missing">{k}</span>)}</div></>)}
                  {result.keywordResult.found.length > 0 && (<><div className="small bold">Found</div><div className="kw-list">{result.keywordResult.found.map((k) => <span key={k} className="kw kw-found">{k}</span>)}</div></>)}
                </div>
              )}
              <hr />
              <p className="small">Want to fix it? <Link to="/builder">Open the resume builder</Link> and the score updates live.</p>
            </>
          )}
        </div>
      </section>

      <section className="block">
        <h2>What the checker looks at</h2>
        <ul className="plain-list">
          <li><strong>Contact details:</strong> a readable email and phone number.</li>
          <li><strong>Structure:</strong> standard headings for experience, education and skills, and dates on every role.</li>
          <li><strong>Impact:</strong> numbers in your bullets and strong action verbs at the start of each.</li>
          <li><strong>Clarity:</strong> no weak phrases such as "responsible for", and a sensible length.</li>
          <li><strong>Relevance:</strong> keyword overlap with the job description you paste in.</li>
        </ul>
        <p>For the reasoning behind each check, read the <Link to="/ats-resume-guide">ATS resume guide</Link>.</p>
      </section>

      <section className="block narrow-block"><h2>Score checker questions</h2><FaqList items={FAQS} /></section>
    </PageShell>
  );
}
