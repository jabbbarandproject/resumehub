import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { emptyResume, newEntry } from '../data/defaultResume';
import { initialSettings, TEMPLATE_PRESETS } from '../data/layoutSpec';
import { clearDraft, loadDraft, saveDraft } from '../services/storageService';
import { createResume, getResume, upsertResume } from '../services/resumeLibrary';
import useDebounce from './useDebounce';
import useToast from './useToast';

function hydrate(saved) {
  const base = emptyResume();
  return { ...base, ...saved, settings: { ...base.settings, ...(saved.settings || {}) } };
}

function reducer(state, a) {
  switch (a.type) {
    case 'personal':
      return { ...state, personal: { ...state.personal, [a.key]: a.value } };
    case 'summary':
      return { ...state, summary: a.value };
    case 'template':
      return { ...state, template: a.value, settings: initialSettings(a.value) };
    case 'setting':
      return { ...state, settings: { ...state.settings, [a.key]: a.value } };
    case 'resetSettings':
      return { ...state, settings: initialSettings(state.template) };
    case 'add':
      return { ...state, [a.section]: [...state[a.section], newEntry(a.section)] };
    case 'update':
      return { ...state, [a.section]: state[a.section].map((e) => (e.id === a.id ? { ...e, [a.key]: a.value } : e)) };
    case 'remove':
      return { ...state, [a.section]: state[a.section].filter((e) => e.id !== a.id) };
    case 'addSkill':
      return state.skills.includes(a.value) ? state : { ...state, skills: [...state.skills, a.value] };
    case 'removeSkill':
      return { ...state, skills: state.skills.filter((s) => s !== a.value) };
    case 'replace':
      return { ...a.value, template: state.template, settings: state.settings };
    case 'reset':
      return emptyResume();
    default:
      return state;
  }
}

/**
 * /builder        -> a new resume (an unsaved working draft is restored if one exists)
 * /builder/:id    -> edit a resume stored in My Resumes
 */
export default function useResume() {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const [missing] = useState(() => Boolean(id) && !getResume(id));
  const [resume, dispatch] = useReducer(reducer, id, (rid) => {
    const rec = rid ? getResume(rid) : null;
    if (rec) return hydrate(rec.data);
    const draft = rid ? null : loadDraft();
    return draft ? hydrate(draft) : emptyResume();
  });
  const [lastSaved, setLastSaved] = useState(null);

  // Silent autosave: into the library when editing a saved resume, else into the draft slot
  const debounced = useDebounce(resume, 700);
  useEffect(() => {
    if (missing) return;
    if (id) { upsertResume(id, debounced); setLastSaved(new Date()); } else saveDraft(debounced);
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  // Flush the latest edits if the user leaves quickly
  const latest = useRef({ resume, id, missing });
  latest.current = { resume, id, missing };
  useEffect(() => () => {
    const { resume: r, id: rid, missing: m } = latest.current;
    if (m) return;
    if (rid) upsertResume(rid, r); else saveDraft(r);
  }, []);

  /** Saves to My Resumes. Returns the resume id. */
  const save = (silent = false) => {
    if (id) {
      upsertResume(id, resume);
      setLastSaved(new Date());
      if (!silent) toast('Saved to My Resumes');
      return id;
    }
    const rec = createResume(resume);
    clearDraft();
    navigate(`/builder/${rec.id}`, { replace: true });
    setLastSaved(new Date());
    if (!silent) toast('Saved to My Resumes');
    return rec.id;
  };

  const reset = () => {
    if (!window.confirm('Clear every field in this resume? This cannot be undone.')) return;
    dispatch({ type: 'reset' });
    toast('Form cleared');
  };

  return { resume, dispatch, save, reset, missing, isSaved: Boolean(id), lastSaved };
}
