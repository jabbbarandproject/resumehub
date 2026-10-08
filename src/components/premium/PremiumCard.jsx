import { BsDownload, BsGem, BsLockFill, BsPencilSquare } from 'react-icons/bs';
import ResumePreview from '../builder/ResumePreview.jsx';

export default function PremiumCard({ item, active, onUse, onDownload, onUnlock }) {
  return (
    <article className={`pcard ${active ? '' : 'is-locked'}`}>
      <div className="pcard-preview">
        <ResumePreview resume={item.data} showPageInfo={false} />
        {!active && <div className="pcard-lock"><BsLockFill aria-hidden="true" /><span>Premium</span></div>}
      </div>
      <div className="pcard-body">
        <span className="chip">{item.role}</span>
        <h3>{item.title}</h3>
        <p className="muted small">{item.blurb}</p>
        {active ? (
          <div className="lib-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => onUse(item)}><BsPencilSquare aria-hidden="true" /> Use and edit</button>
            <button type="button" className="btn btn-soft btn-sm" onClick={() => onDownload(item)}><BsDownload aria-hidden="true" /> PDF</button>
          </div>
        ) : (
          <button type="button" className="btn btn-primary btn-sm" onClick={onUnlock}><BsGem aria-hidden="true" /> Unlock to edit and download</button>
        )}
      </div>
    </article>
  );
}
