import { useNavigate } from 'react-router-dom';
import { emptyResume } from '../data/defaultResume';
import { hasAnyContent } from '../services/resumeText';
import { loadDraft, saveDraft } from '../services/storageService';
import useToast from './useToast';

// For pages outside the builder: save the parsed upload as the working draft and open the builder.
export default function useImportToBuilder() {
  const navigate = useNavigate();
  const toast = useToast();
  return (resume) => {
    const draft = loadDraft();
    if (draft && hasAnyContent({ ...emptyResume(), ...draft }) &&
      !window.confirm('Replace your current unsaved draft with the uploaded resume?')) return;
    saveDraft(resume);
    toast('Resume imported. Review it in the builder.');
    navigate('/builder');
  };
}
