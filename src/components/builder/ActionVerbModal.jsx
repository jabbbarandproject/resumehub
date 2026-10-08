import { useEffect, useState } from 'react';
import { BsListStars, BsX } from 'react-icons/bs';
import { ACTION_VERBS } from '../../data/actionVerbs';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

export default function ActionVerbModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const copy = useCopyToClipboard();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const q = query.toLowerCase();
  const groups = Object.entries(ACTION_VERBS)
    .map(([cat, verbs]) => [cat, verbs.filter((v) => !q || cat.toLowerCase().includes(q) || v.toLowerCase().includes(q))])
    .filter(([, verbs]) => verbs.length);

  return (
    <>
      <div className="card">
        <h2 className="card-title"><BsListStars aria-hidden="true" /> Action verb helper</h2>
        <p className="muted small">Stuck on wording? Browse strong verbs and copy one into a bullet.</p>
        <button type="button" className="btn btn-soft btn-sm" onClick={() => setOpen(true)}>Open verb library</button>
      </div>

      {open && (
        <div className="modal-backdrop no-print" onClick={() => setOpen(false)}>
          <div className="modal glass-solid" role="dialog" aria-modal="true" aria-label="Action verb library" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Action verb library</h2>
              <button type="button" className="icon-btn" aria-label="Close" onClick={() => setOpen(false)}><BsX /></button>
            </div>
            <input className="input" autoFocus value={query} placeholder="Search verbs, e.g. lead, build, analyze" aria-label="Search verbs" onChange={(e) => setQuery(e.target.value)} />
            <div className="modal-body">
              {groups.length === 0 && <p className="muted">No verbs match your search.</p>}
              {groups.map(([cat, verbs]) => (
                <div key={cat}>
                  <h3 className="verb-cat">{cat}</h3>
                  <div className="kw-list">
                    {verbs.map((v) => (
                      <button type="button" key={v} className="verb-chip" onClick={() => copy(v, `Copied "${v}"`)}>{v}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="help">Click a verb to copy it, then paste it into a bullet point.</p>
          </div>
        </div>
      )}
    </>
  );
}
