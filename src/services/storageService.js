const DRAFT_KEY = 'resumehub_draft_v1';
const OLD_DRAFT_KEY = 'leafcv_autosave_v2'; // from the earlier version

const read = (key) => {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
};

// The unsaved "working draft" (a resume that is not in My Resumes yet)
export const loadDraft = () => read(DRAFT_KEY) || read(OLD_DRAFT_KEY);

export function saveDraft(data) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); return true; } catch { return false; }
}

export function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); localStorage.removeItem(OLD_DRAFT_KEY); } catch { /* ignore */ }
}
