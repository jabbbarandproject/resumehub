import { Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell.jsx';
import { HOW_STEPS } from '../data/content/features';

export default function HowItWorks() {
  return (
    <PageShell
      title="How It Works: Build an ATS Resume in 5 Steps | ResumeHub"
      description="See how to build an ATS-friendly resume with ResumeHub: fill in your details, pick a template, check your score, download a PDF and edit it later."
      path="/how-it-works" h1="How ResumeHub works"
      lead="From a blank page to a PDF that applicant tracking systems can read, in five steps and about ten minutes."
      related={['builder', 'guide', 'score']}
    >
      <section className="block">
        <ol className="steps">
          {HOW_STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num">{i + 1}</span>
              <h2>{s.title}</h2>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="block">
        <h2>Tips for better results</h2>
        <ul className="plain-list">
          <li>Write one achievement per line and add a number to as many as you can.</li>
          <li>Paste the job description into the keyword matcher before every application.</li>
          <li>Duplicate your resume for each job and adjust the keywords.</li>
          <li>Open the downloaded PDF and try to select the text. If you can, an ATS can read it.</li>
        </ul>
        <p>Ready? <Link to="/builder">Start building your resume</Link>.</p>
      </section>
    </PageShell>
  );
}
