import { Link } from 'react-router-dom';
import { BsClipboard } from 'react-icons/bs';
import PageShell from '../components/common/PageShell.jsx';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { BULLET_EXAMPLES, SUMMARY_EXAMPLES } from '../data/content/examples';
import { ROLES } from '../data/content/roles';

export default function ResumeExamples() {
  const copy = useCopyToClipboard();
  const CopyBtn = ({ text }) => (
    <button type="button" className="icon-btn" aria-label="Copy to clipboard" onClick={() => copy(text, 'Copied')}><BsClipboard aria-hidden="true" /></button>
  );

  return (
    <PageShell
      title="Resume Examples: Summaries and Bullet Points | ResumeHub"
      description="Resume examples you can adapt: professional summaries, achievement bullet points and full ATS-friendly resumes for developers and graduates."
      path="/resume-examples" h1="Resume examples that get read"
      lead="Real wording for summaries and bullet points, plus full example resumes for popular roles. Copy what helps and replace the details with your own."
      related={['templates', 'builder', 'score']}
    >
      <section className="block">
        <h2>Full example resumes by role</h2>
        <div className="related-grid">
          {ROLES.map((r) => (
            <Link key={r.key} to={r.path} className="related-card">
              <strong>{r.role} resume</strong>
              <span className="muted small">{r.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Professional summary examples</h2>
        <p>A good summary is two to three sentences: your title and years of experience, your specialty, and one measurable achievement.</p>
        <div className="example-list">
          {SUMMARY_EXAMPLES.map((e) => (
            <article className="example" key={e.role}>
              <div><h3>{e.role}</h3><p>{e.text}</p></div>
              <CopyBtn text={e.text} />
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Achievement bullet point examples</h2>
        <p>Each example follows the formula: action verb, what you did, measurable result.</p>
        <div className="example-list">
          {BULLET_EXAMPLES.map((g) => (
            <article className="example" key={g.area}>
              <div>
                <h3>{g.area}</h3>
                <ul className="plain-list">{g.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
              <CopyBtn text={g.bullets.join('\n')} />
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>How to adapt an example</h2>
        <ol className="steps-list">
          <li>Keep the structure, replace the facts with your own numbers.</li>
          <li>Use the exact tool and skill names from the job post where they are true.</li>
          <li>Never claim results you cannot explain in an interview.</li>
          <li>Run the result through the <Link to="/resume-score-checker">resume score checker</Link>.</li>
        </ol>
      </section>
    </PageShell>
  );
}
