import { emptyResume } from '../data/defaultResume';
import { initialSettings } from '../data/layoutSpec';
import { loadDraft, saveDraft } from './storageService';
import { hasAnyContent } from './resumeText';

// Open the builder with an example resume loaded as the working draft
export function startFromSample(sample, navigate) {
  const draft = loadDraft();
  if (draft && hasAnyContent({ ...emptyResume(), ...draft }) &&
    !window.confirm('Replace your current unsaved draft with this example?')) return;
  saveDraft(JSON.parse(JSON.stringify(sample)));
  navigate('/builder');
}

// Open the builder with a template applied, keeping any content already typed
export function startFromTemplate(templateId, navigate) {
  const draft = loadDraft() || {};
  saveDraft({ ...emptyResume(), ...draft, template: templateId, settings: initialSettings(templateId) });
  navigate('/builder');
}
