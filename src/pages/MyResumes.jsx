import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BsCopy, BsDownload, BsFileEarmarkPlus, BsFileEarmarkText, BsPencilSquare, BsTrash3, BsUpload, BsBoxArrowDown,
} from 'react-icons/bs';
import Seo from '../components/common/Seo.jsx';
import ScoreRing from '../components/common/ScoreRing.jsx';
import TemplateThumb from '../components/common/TemplateThumb.jsx';
import useToast from '../hooks/useToast';
import usePremium from '../hooks/usePremium';
import { runAtsCheck } from '../services/atsService';
import { downloadResumePdf } from '../services/pdfService';
import { clearDraft } from '../services/storageService';
import { DEFAULT_SETTINGS, TEMPLATES } from '../data/layoutSpec';
import {
  deleteResume, duplicateResume, exportLibrary, importLibrary, listResumes, markDownloaded,
} from '../services/resumeLibrary';

const fmt = (ts) => new Date(ts).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

export default function MyResumes() {
  const toast = useToast();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [items, setItems] = useState(listResumes);
  const [busyId, setBusyId] = useState(null);
  const { active } = usePremium();
  const refresh = () => setItems(listResumes());

  const startNew = () => { clearDraft(); navigate('/builder'); };

  const download = async (rec) => {
    if (rec.data.premiumId && !active) { toast('Unlock Premium to download this resume'); navigate('/premium'); return; }
    setBusyId(rec.id);
    try {
      await downloadResumePdf(rec.data);
      markDownloaded(rec.id);
      refresh();
      toast('PDF downloaded');
    } catch { toast('Could not create the PDF'); } finally { setBusyId(null); }
  };

  const remove = (rec) => {
    if (!window.confirm(`Delete "${rec.title}"? This cannot be undone.`)) return;
    deleteResume(rec.id); refresh(); toast('Resume deleted');
  };

  const duplicate = (rec) => { duplicateResume(rec.id); refresh(); toast('Copy created'); };

  const backup = () => {
    const url = URL.createObjectURL(new Blob([exportLibrary()], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'resumehub-backup.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const restore = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const n = importLibrary(await file.text());
      refresh();
      toast(n ? `Imported ${n} resume${n === 1 ? '' : 's'}` : 'Nothing new to import');
    } catch { toast('That file is not a valid ResumeHub backup'); }
  };

  return (
    <section className="container section lib-page">
      <Seo title="My Resumes | ResumeHub" description="Your saved resumes. Edit, download or duplicate them any time." path="/my-resumes" noindex />

      <div className="page-head">
        <div>
          <h1>My resumes</h1>
          <p className="muted">Saved on this device only. Every resume you download is kept here so you can edit and download it again.</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-soft" onClick={backup} disabled={!items.length}><BsBoxArrowDown aria-hidden="true" /> Export backup</button>
          <button type="button" className="btn btn-soft" onClick={() => fileRef.current?.click()}><BsUpload aria-hidden="true" /> Import backup</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={restore} />
          <button type="button" className="btn btn-primary" onClick={startNew}><BsFileEarmarkPlus aria-hidden="true" /> New resume</button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <BsFileEarmarkText aria-hidden="true" />
          <h2>No saved resumes yet</h2>
          <p className="muted">Build a resume and press Save or Download PDF. It will appear here.</p>
          <Link to="/builder" className="btn btn-primary">Build my first resume</Link>
        </div>
      ) : (
        <div className="lib-grid">
          {items.map((rec) => {
            const settings = { ...DEFAULT_SETTINGS, ...(rec.data.settings || {}) };
            const tpl = TEMPLATES.find((t) => t.id === rec.data.template);
            const { score } = runAtsCheck(rec.data);
            return (
              <article className="lib-card" key={rec.id}>
                <Link to={`/builder/${rec.id}`} className="lib-thumb" aria-label={`Edit ${rec.title}`}>
                  <TemplateThumb settings={settings} />
                </Link>
                <div className="lib-body">
                  <h2 className="lib-title">{rec.title}{rec.data.premiumId && <span className="chip chip-premium">Premium</span>}</h2>
                  <p className="small muted">
                    {tpl ? `${tpl.name} template` : 'Custom'} &middot; Updated {fmt(rec.updatedAt)}
                    {rec.downloadedAt ? ` · Downloaded ${fmt(rec.downloadedAt)}` : ''}
                  </p>
                  <div className="lib-score"><ScoreRing value={score} size={44} /><span className="small muted">ATS score</span></div>
                  <div className="lib-actions">
                    <Link to={`/builder/${rec.id}`} className="btn btn-primary btn-sm"><BsPencilSquare aria-hidden="true" /> Edit</Link>
                    <button type="button" className="btn btn-soft btn-sm" onClick={() => download(rec)} disabled={busyId === rec.id}><BsDownload aria-hidden="true" /> PDF</button>
                    <button type="button" className="icon-btn" title="Duplicate" aria-label={`Duplicate ${rec.title}`} onClick={() => duplicate(rec)}><BsCopy aria-hidden="true" /></button>
                    <button type="button" className="icon-btn danger" title="Delete" aria-label={`Delete ${rec.title}`} onClick={() => remove(rec)}><BsTrash3 aria-hidden="true" /></button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
