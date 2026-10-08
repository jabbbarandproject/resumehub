import { BsClipboard, BsFileEarmarkText } from 'react-icons/bs';
import { resumeToText } from '../../services/resumeText';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

export default function PlainTextCard({ resume }) {
  const copy = useCopyToClipboard();
  return (
    <div className="card">
      <h2 className="card-title"><BsFileEarmarkText aria-hidden="true" /> Plain text version</h2>
      <p className="muted small">Many job portals ask you to paste your resume into a text box. Copy a clean plain-text version here.</p>
      <button type="button" className="btn btn-soft btn-sm" onClick={() => copy(resumeToText(resume), 'Plain text copied')}>
        <BsClipboard aria-hidden="true" /> Copy as plain text
      </button>
    </div>
  );
}
