import { Link } from 'react-router-dom';
import { BsMagic, BsShieldCheck, BsLightningCharge, BsFileEarmarkPdf, BsCheckCircleFill } from 'react-icons/bs';
import ScoreRing from '../common/ScoreRing.jsx';
import ImportResume from '../common/ImportResume.jsx';
import useImportToBuilder from '../../hooks/useImportToBuilder';

const PARSED = [
  { field: 'Name', value: 'Amelia Hart' },
  { field: 'Title', value: 'Product Manager' },
  { field: 'Email', value: 'amelia@mail.com' },
  { field: 'Skills', value: 'SQL, Figma, Agile' },
];

export default function Hero() {
  const importToBuilder = useImportToBuilder();
  return (
    <section className="container hero">
      <div className="hero-copy">
        <p className="pill"><BsShieldCheck aria-hidden="true" /> Free, no sign-up, runs in your browser</p>
        <h1>Free ATS resume builder that gets past the screening software</h1>
        <p className="lead">
          Most applications are filtered by an applicant tracking system before a person sees them.
          ResumeHub builds clean single-column resumes, scores them live and shows which job keywords you are missing.
        </p>
        <div className="hero-actions">
          <Link to="/builder" className="btn btn-primary btn-lg"><BsMagic aria-hidden="true" /> Start building</Link>
          <ImportResume onResume={importToBuilder} label="Upload your resume" className="btn btn-ghost btn-lg" />
          <Link to="/resume-score-checker" className="btn btn-ghost btn-lg">Check my ATS score</Link>
        </div>
        <ul className="hero-points">
          <li><BsShieldCheck aria-hidden="true" /> Data stays on your device</li>
          <li><BsLightningCharge aria-hidden="true" /> Instant live preview</li>
          <li><BsFileEarmarkPdf aria-hidden="true" /> One-click PDF export</li>
        </ul>
      </div>

      <div className="scan-demo" aria-label="Illustration of an ATS scanning a resume">
        <div className="scan-paper">
          <div className="sk sk-name" />
          <div className="sk sk-line w60" />
          <div className="sk sk-rule" />
          <div className="sk sk-line w90" />
          <div className="sk sk-line w80" />
          <div className="sk sk-line w70" />
          <div className="sk sk-rule" />
          <div className="sk sk-line w85" />
          <div className="sk sk-line w50" />
          <div className="scan-beam" />
        </div>
        <div className="scan-panel glass">
          <div className="scan-panel-head">
            <ScoreRing value={87} size={72} />
            <div>
              <strong>Parsed cleanly</strong>
              <span className="muted small">4 of 4 fields found</span>
            </div>
          </div>
          <ul className="parsed">
            {PARSED.map((p) => (
              <li key={p.field}>
                <BsCheckCircleFill aria-hidden="true" />
                <span className="muted">{p.field}</span>
                <b>{p.value}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
