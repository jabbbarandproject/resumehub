import { Link } from 'react-router-dom';
import { BsCheck2Circle, BsCollection, BsDownload, BsSave, BsTrash3 } from 'react-icons/bs';

export default function Toolbar({ onSave, onReset, onDownload, downloading, completeness, isSaved, lastSaved }) {
  const time = lastSaved ? lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
  return (
    <div className="toolbar glass no-print">
      <div className="progress-wrap">
        <span className="small bold">Completeness</span>
        <div className="progress" role="progressbar" aria-valuenow={completeness} aria-valuemin={0} aria-valuemax={100} aria-label="Resume completeness">
          <div className="progress-bar" style={{ width: `${completeness}%` }} />
        </div>
        <span className="small bold">{completeness}%</span>
      </div>
      <span className={`save-status small ${isSaved ? 'is-saved' : ''}`}>
        {isSaved ? <><BsCheck2Circle aria-hidden="true" /> Saved{time ? ` ${time}` : ''}</> : 'Draft, not saved to My Resumes'}
      </span>
      <div className="toolbar-actions">
        <button type="button" className="btn btn-soft btn-sm" onClick={() => onSave()}><BsSave aria-hidden="true" /> Save</button>
        <Link to="/my-resumes" className="btn btn-soft btn-sm"><BsCollection aria-hidden="true" /> My resumes</Link>
        <button type="button" className="btn btn-danger-soft btn-sm" onClick={onReset}><BsTrash3 aria-hidden="true" /> Reset</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={onDownload} disabled={downloading}>
          <BsDownload aria-hidden="true" /> {downloading ? 'Preparing PDF...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
