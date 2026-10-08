import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { matchKeywords } from '../../services/keywordService';

export default function KeywordMatcher({ resume }) {
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div className="keyword-box">
      <label className="label" htmlFor="jobDesc">Paste a job description to match keywords</label>
      <textarea id="jobDesc" className="input" rows={4} value={jd} placeholder="Paste the job posting text here..." onChange={(e) => setJd(e.target.value)} />
      <button type="button" className="btn btn-primary btn-sm" onClick={() => setResult(jd.trim() ? matchKeywords(jd, resume) : { empty: true })}>
        <BsSearch aria-hidden="true" /> Check keyword match
      </button>

      {result?.empty && <p className="muted small">Paste a job description first.</p>}
      {result && !result.empty && (
        <div className="kw-results">
          <p><strong>{result.percent}%</strong> match ({result.found.length} of {result.total} key terms found)</p>
          {result.found.length > 0 && (
            <>
              <div className="small bold">Found in your resume</div>
              <div className="kw-list">{result.found.map((k) => <span key={k} className="kw kw-found">{k}</span>)}</div>
            </>
          )}
          {result.missing.length > 0 && (
            <>
              <div className="small bold">Missing. Add them if they are relevant</div>
              <div className="kw-list">{result.missing.map((k) => <span key={k} className="kw kw-missing">{k}</span>)}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
