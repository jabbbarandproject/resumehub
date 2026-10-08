import { useState } from 'react';
import { BsClipboard, BsEnvelopePaper, BsMagic } from 'react-icons/bs';
import { generateCoverLetter } from '../../services/coverLetterService';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

export default function CoverLetter({ resume }) {
  const [form, setForm] = useState({ jobTitle: '', company: '', achievement: '' });
  const [letter, setLetter] = useState('');
  const copy = useCopyToClipboard();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="card">
      <h2 className="card-title"><BsEnvelopePaper aria-hidden="true" /> Cover letter generator</h2>
      <div className="grid-12">
        <div className="span-6">
          <label className="label" htmlFor="clJob">Job title</label>
          <input id="clJob" className="input" value={form.jobTitle} onChange={set('jobTitle')} placeholder="Senior Product Manager" />
        </div>
        <div className="span-6">
          <label className="label" htmlFor="clCompany">Company</label>
          <input id="clCompany" className="input" value={form.company} onChange={set('company')} placeholder="Acme Corp" />
        </div>
        <div className="span-12">
          <label className="label" htmlFor="clAch">One key achievement</label>
          <input id="clAch" className="input" value={form.achievement} onChange={set('achievement')} placeholder="increased customer retention by 25% in one year" />
        </div>
      </div>
      <button type="button" className="btn btn-primary btn-sm mt" onClick={() => setLetter(generateCoverLetter({ resume, ...form }))}>
        <BsMagic aria-hidden="true" /> Generate cover letter
      </button>

      {letter && (
        <div className="mt">
          <label className="label" htmlFor="clOut">Draft (editable)</label>
          <textarea id="clOut" className="input" rows={9} value={letter} onChange={(e) => setLetter(e.target.value)} />
          <button type="button" className="btn btn-soft btn-sm mt" onClick={() => copy(letter, 'Cover letter copied')}>
            <BsClipboard aria-hidden="true" /> Copy to clipboard
          </button>
        </div>
      )}
    </div>
  );
}
