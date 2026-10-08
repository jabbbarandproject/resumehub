import { useRef, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import useToast from '../../hooks/useToast';
import { extractTextFromFile } from '../../services/fileTextService';
import { parseResumeText } from '../../services/resumeParser';

/**
 * mode="resume": parses the file and calls onResume(resume, warnings)
 * mode="text":   extracts the text and calls onText(text, meta)
 */
export default function ImportResume({ mode = 'resume', onResume, onText, label = 'Upload your resume', className = 'btn btn-ghost' }) {
  const ref = useRef(null);
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const handle = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      const meta = await extractTextFromFile(file);
      if (!meta.text || meta.text.trim().length < 30) {
        throw new Error(meta.kind === 'pdf'
          ? 'No readable text was found. This PDF may be a scanned image, which an ATS cannot read either.'
          : 'The file looks empty.');
      }
      if (mode === 'text') onText?.(meta.text, meta);
      else { const { resume, warnings } = parseResumeText(meta.text); onResume?.(resume, warnings, meta); }
    } catch (err) {
      toast(err.message || 'Could not read that file.');
    } finally { setBusy(false); }
  };

  return (
    <>
      <button type="button" className={className} onClick={() => ref.current?.click()} disabled={busy}>
        <BsUpload aria-hidden="true" /> {busy ? 'Reading file...' : label}
      </button>
      <input ref={ref} type="file" hidden accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={handle} />
    </>
  );
}
