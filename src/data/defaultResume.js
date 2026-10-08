import { initialSettings } from './layoutSpec';

export const uid = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random().toString(16).slice(2);

const ENTRY_DEFAULTS = {
  experience: { jobTitle: '', company: '', startDate: '', endDate: '', current: false, bullets: '' },
  education: { degree: '', school: '', eduYear: '', eduExtra: '' },
  certifications: { certName: '', certIssuer: '', certYear: '' },
  projects: { projectName: '', projectYear: '', projectDesc: '' },
};

export const newEntry = (section) => ({ id: uid(), ...ENTRY_DEFAULTS[section] });

export const emptyResume = () => ({
  personal: { fullName: '', jobTitle: '', email: '', phone: '', location: '', linkedin: '' },
  summary: '',
  experience: [newEntry('experience')],
  education: [newEntry('education')],
  skills: [],
  certifications: [],
  projects: [],
  template: 'modern',
  settings: initialSettings('modern'),
});
