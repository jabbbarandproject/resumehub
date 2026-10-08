import { BsCheckCircleFill, BsExclamationTriangleFill, BsSpeedometer2 } from 'react-icons/bs';
import ScoreRing from '../common/ScoreRing.jsx';
import KeywordMatcher from './KeywordMatcher.jsx';

function verdict(score) {
  if (score >= 80) return 'Excellent. Your resume looks ATS-ready.';
  if (score >= 50) return 'Good start. A few fixes will help.';
  return 'Needs work. Follow the tips below.';
}

export default function AtsPanel({ resume, ats }) {
  return (
    <div className="card">
      <h2 className="card-title"><BsSpeedometer2 aria-hidden="true" /> ATS score checker</h2>
      <div className="ats-top">
        <ScoreRing value={ats.score} size={92} />
        <p className="ats-verdict">{verdict(ats.score)}</p>
      </div>
      <ul className="checklist">
        {ats.checks.map((c) => (
          <li key={c.label} className={c.pass ? 'ok' : 'warn'}>
            {c.pass ? <BsCheckCircleFill aria-hidden="true" /> : <BsExclamationTriangleFill aria-hidden="true" />}
            <div>
              <span>{c.label}</span>
              {!c.pass && c.tip && <div className="tip">{c.tip}</div>}
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <KeywordMatcher resume={resume} />
    </div>
  );
}
