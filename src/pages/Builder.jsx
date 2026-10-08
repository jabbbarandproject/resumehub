import { useMemo, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  BsBriefcase, BsGem, BsCardText, BsEye, BsKanban, BsMortarboard, BsPalette, BsPatchCheck,
  BsPencilSquare, BsPersonCircle, BsSpeedometer2, BsStars, BsTools,
} from 'react-icons/bs';
import Seo from '../components/common/Seo.jsx';
import Accordion from '../components/common/Accordion.jsx';
import Toolbar from '../components/builder/Toolbar.jsx';
import PersonalForm from '../components/builder/PersonalForm.jsx';
import SummaryForm from '../components/builder/SummaryForm.jsx';
import EntryList from '../components/builder/EntryList.jsx';
import SkillsForm from '../components/builder/SkillsForm.jsx';
import CustomizePanel from '../components/builder/TemplateSwitcher.jsx';
import AtsPanel from '../components/builder/AtsPanel.jsx';
import ActionVerbModal from '../components/builder/ActionVerbModal.jsx';
import CoverLetter from '../components/builder/CoverLetter.jsx';
import ImportResume from '../components/common/ImportResume.jsx';
import UnlockModal from '../components/premium/UnlockModal.jsx';
import usePremium from '../hooks/usePremium';
import { hasAnyContent } from '../services/resumeText';
import PlainTextCard from '../components/builder/PlainTextCard.jsx';
import ResumePreview from '../components/builder/ResumePreview.jsx';
import useResume from '../hooks/useResume';
import useToast from '../hooks/useToast';
import { completeness, runAtsCheck } from '../services/atsService';
import { downloadResumePdf } from '../services/pdfService';
import { markDownloaded } from '../services/resumeLibrary';
import { CERT_FIELDS, EDUCATION_FIELDS, EXPERIENCE_FIELDS, PROJECT_FIELDS } from '../data/formConfig';

const TABS = [
  { id: 'content', label: 'Content', icon: BsPencilSquare },
  { id: 'design', label: 'Design', icon: BsPalette },
  { id: 'ats', label: 'ATS check', icon: BsSpeedometer2 },
  { id: 'extras', label: 'Extras', icon: BsStars },
];

export default function Builder() {
  const toast = useToast();
  const { resume, dispatch, save, reset, missing, isSaved, lastSaved } = useResume();
  const [tab, setTab] = useState('content');
  const [view, setView] = useState('edit'); // mobile only: edit | preview
  const [downloading, setDownloading] = useState(false);
  const { active } = usePremium();
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const locked = Boolean(resume.premiumId) && !active;

  const ats = useMemo(() => runAtsCheck(resume), [resume]);
  const pct = useMemo(() => completeness(resume), [resume]);

  const goTab = (id) => {
    setTab(id);
    document.getElementById('builder-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onImport = (parsed, warns) => {
    if (hasAnyContent(resume) && !window.confirm('Replace the content of this resume with the uploaded file?')) return;
    dispatch({ type: 'replace', value: parsed });
    setWarnings(warns);
    setTab('content');
    toast(warns.length ? 'Imported. Please review each section.' : 'Resume imported. Review and edit it below.');
  };

  const download = async () => {
    if (locked) { setUnlockOpen(true); return; }
    setDownloading(true);
    try {
      const rid = save(true); // every downloaded resume is kept in My Resumes
      await downloadResumePdf(resume);
      markDownloaded(rid);
      toast('PDF downloaded and saved in My Resumes');
    } catch {
      toast('Could not create the PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (missing) return <Navigate to="/my-resumes" replace />;

  const sections = [
    { title: 'Personal info', icon: BsPersonCircle, content: <PersonalForm personal={resume.personal} dispatch={dispatch} /> },
    { title: 'Professional summary', icon: BsCardText, content: <SummaryForm summary={resume.summary} dispatch={dispatch} /> },
    { title: 'Work experience', icon: BsBriefcase, content: <EntryList section="experience" items={resume.experience} fields={EXPERIENCE_FIELDS} label="Role" addLabel="Add work experience" dispatch={dispatch} /> },
    { title: 'Education', icon: BsMortarboard, content: <EntryList section="education" items={resume.education} fields={EDUCATION_FIELDS} label="Degree" addLabel="Add education" dispatch={dispatch} /> },
    { title: 'Skills', icon: BsTools, content: <SkillsForm skills={resume.skills} dispatch={dispatch} /> },
    { title: 'Certifications (optional)', icon: BsPatchCheck, content: <EntryList section="certifications" items={resume.certifications} fields={CERT_FIELDS} label="Certification" addLabel="Add certification" dispatch={dispatch} /> },
    { title: 'Projects (optional)', icon: BsKanban, content: <EntryList section="projects" items={resume.projects} fields={PROJECT_FIELDS} label="Project" addLabel="Add project" dispatch={dispatch} /> },
  ];

  const idx = TABS.findIndex((t) => t.id === tab);
  const prev = TABS[idx - 1];
  const next = TABS[idx + 1];

  return (
    <>
      <Seo
        title="ATS Resume Builder - Live Preview and PDF Download | ResumeHub"
        description="Build an ATS-friendly resume with live preview, custom colors, fonts and alignment, ATS score checker, keyword matching and one-click PDF download."
        path="/builder"
        noindex
      />
      <div className="container builder">
        <h1 className="sr-only">ATS resume builder</h1>
        <Toolbar onSave={() => (locked ? setUnlockOpen(true) : save())} onReset={reset} onDownload={download} downloading={downloading} completeness={pct} isSaved={isSaved} lastSaved={lastSaved} />

        {locked && (
          <div className="lock-banner no-print" role="status">
            <BsGem aria-hidden="true" />
            <p><strong>This is a Premium resume.</strong> Unlock Premium to edit and download it.</p>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => setUnlockOpen(true)}>Unlock Premium</button>
            <Link to="/premium" className="btn btn-ghost btn-sm">See Premium</Link>
          </div>
        )}

        <div className="mobile-switch no-print" role="tablist" aria-label="Editor or preview">
          <button type="button" role="tab" aria-selected={view === 'edit'} className={view === 'edit' ? 'is-active' : ''} onClick={() => setView('edit')}><BsPencilSquare aria-hidden="true" /> Edit</button>
          <button type="button" role="tab" aria-selected={view === 'preview'} className={view === 'preview' ? 'is-active' : ''} onClick={() => setView('preview')}><BsEye aria-hidden="true" /> Preview</button>
        </div>

        <div className="builder-grid">
          <div className={`builder-form no-print ${view === 'preview' ? 'hide-mobile' : ''} ${locked ? 'is-locked' : ''}`}>
            <div id="builder-tabs" className="tabs" role="tablist" aria-label="Builder steps">
              {TABS.map((t, i) => {
                const Icon = t.icon;
                return (
                  <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={`tab ${tab === t.id ? 'is-active' : ''}`} onClick={() => setTab(t.id)}>
                    <span className="tab-icon"><Icon aria-hidden="true" /></span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" className="tab-panel">
              {tab === 'content' && (
                <>
                  <div className="card import-card">
                    <div>
                      <strong>Already have a resume?</strong>
                      <p className="muted small">Upload a PDF, DOCX or TXT and we fill in the form for you. Then edit anything.</p>
                    </div>
                    <ImportResume onResume={onImport} label="Upload resume" className="btn btn-soft" />
                  </div>
                  {warnings.length > 0 && (
                    <div className="import-warn" role="status">
                      <strong>Please check these after importing:</strong>
                      <ul>{warnings.map((w) => <li key={w}>{w}</li>)}</ul>
                    </div>
                  )}
                  <Accordion items={sections} defaultOpen={0} />
                </>
              )}
              {tab === 'design' && <CustomizePanel resume={resume} dispatch={dispatch} />}
              {tab === 'ats' && <AtsPanel resume={resume} ats={ats} />}
              {tab === 'extras' && (<><PlainTextCard resume={resume} /><ActionVerbModal /><CoverLetter resume={resume} /></>)}
            </div>

            <div className="step-nav">
              {prev ? <button type="button" className="btn btn-ghost" onClick={() => goTab(prev.id)}>Back: {prev.label}</button> : <span />}
              {next ? (
                <button type="button" className="btn btn-primary" onClick={() => goTab(next.id)}>Next: {next.label}</button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={download} disabled={downloading}>Download PDF</button>
              )}
            </div>
          </div>

          <aside className={`builder-preview ${view === 'edit' ? 'hide-mobile' : ''}`} aria-label="Live resume preview">
            <div className="preview-head no-print">
              <h2><BsEye aria-hidden="true" /> Live preview</h2>
              <span className="small muted">{ats.words} words</span>
            </div>
            <div className="paper-outer">
              <ResumePreview resume={resume} />
            </div>
          </aside>
        </div>
      </div>
      <UnlockModal open={unlockOpen} onClose={() => setUnlockOpen(false)} />
    </>
  );
}
