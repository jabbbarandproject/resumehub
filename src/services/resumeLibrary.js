import { uid } from '../data/defaultResume';

const KEY = 'resumehub_library_v1';

const read = () => {
  try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : []; } catch { return []; }
};
const write = (list) => {
  try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; }
};

export const titleFor = (data) => {
  const name = data.personal.fullName.trim();
  const job = data.personal.jobTitle.trim();
  if (name && job) return `${name} - ${job}`;
  return name || job || 'Untitled resume';
};

export const listResumes = () => read().sort((a, b) => b.updatedAt - a.updatedAt);
export const getResume = (id) => read().find((r) => r.id === id) || null;

export function createResume(data, title) {
  const now = Date.now();
  const rec = { id: uid(), title: title || titleFor(data), createdAt: now, updatedAt: now, downloadedAt: null, data };
  write([rec, ...read()]);
  return rec;
}

export function upsertResume(id, data) {
  const list = read();
  const i = list.findIndex((r) => r.id === id);
  const now = Date.now();
  if (i === -1) list.unshift({ id, title: titleFor(data), createdAt: now, updatedAt: now, downloadedAt: null, data });
  else list[i] = { ...list[i], title: titleFor(data), updatedAt: now, data };
  return write(list);
}

export function markDownloaded(id) {
  const list = read();
  const i = list.findIndex((r) => r.id === id);
  if (i === -1) return;
  list[i] = { ...list[i], downloadedAt: Date.now() };
  write(list);
}

export const deleteResume = (id) => write(read().filter((r) => r.id !== id));

export function duplicateResume(id) {
  const rec = getResume(id);
  if (!rec) return null;
  return createResume(JSON.parse(JSON.stringify(rec.data)), `${rec.title} (copy)`);
}

// Backup / restore, because localStorage lives in one browser only
export const exportLibrary = () => JSON.stringify({ app: 'resumehub', version: 1, resumes: read() }, null, 2);

export function importLibrary(text) {
  const parsed = JSON.parse(text);
  const incoming = Array.isArray(parsed) ? parsed : parsed.resumes;
  if (!Array.isArray(incoming)) throw new Error('Invalid backup file');
  const list = read();
  let added = 0;
  incoming.forEach((r) => {
    if (!r || !r.data || !r.data.personal) return;
    const existing = list.findIndex((x) => x.id === r.id);
    if (existing === -1) { list.push(r); added += 1; }
    else if ((r.updatedAt || 0) > list[existing].updatedAt) { list[existing] = r; added += 1; }
  });
  write(list);
  return added;
}
