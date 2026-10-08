import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsClipboard, BsDownload, BsFileEarmarkText, BsMagic } from 'react-icons/bs';
import PageShell from '../components/common/PageShell.jsx';
import FaqList from '../components/common/FaqList.jsx';
import Segmented from '../components/builder/Segmented.jsx';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { buildCoverLetter } from '../services/coverLetterService';
import { downloadTextPdf } from '../services/pdfService';
import { faqSchema } from '../data/content/faqs';
import { SITE_URL } from '../data/siteConfig';

const FAQS = [
  { q: 'How long should a cover letter be?', a: 'Three to four short paragraphs, under one page. State the role, prove your fit with one achievement, and close with a clear next step.' },
  { q: 'Do I need a cover letter if the job does not ask for one?', a: 'It is optional but helpful, especially when changing careers or applying to a company you are excited about.' },
  { q: 'Should I send a different cover letter to every job?', a: 'Yes. Change the role, company and the achievement you highlight so each letter matches the job post.' },
  { q: 'Is the generated letter final?', a: 'No, it is a draft. Edit the text so it sounds like you and add details specific to the employer.' },
];
const schema = [
  { '@type': 'WebApplication', name: 'ResumeHub Cover Letter Builder', url: `${SITE_URL}/cover-letter-builder`, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  faqSchema(FAQS),
];

export default function CoverLetterBuilder() {
  const copy = useCopyToClipboard();
  const [f, setF] = useState({ name: '', currentTitle: '', jobTitle: '', company: '', hiringManager: '', achievement: '', skills: '', tone: 'formal' });
  const [letter, setLetter] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const txt = () => {
    const url = URL.createObjectURL(new Blob([letter], { type: 'text/plain' }));
    const a = document.createElement('a'); a.href = url; a.download = 'cover-letter.txt'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <PageShell
      title="Free Cover Letter Builder With PDF Download | ResumeHub"
      description="Write a tailored cover letter in a minute. Add the role, company and one achievement, choose a tone, edit the draft and download it as PDF or text."
      path="/cover-letter-builder" h1="Free cover letter builder"
      lead="Fill in a few fields to get an editable cover letter draft. Download it as a PDF or plain text. Nothing is uploaded."
      schema={schema} related={['builder', 'examples', 'guide']}
    >
      <section className="block checker">
        <div className="card">
          <div className="grid-12">
            <div className="span-6"><label className="label" htmlFor="cl-name">Your name</label><input id="cl-name" className="input" value={f.name} onChange={set('name')} placeholder="Jane Doe" /></div>
            <div className="span-6"><label className="label" htmlFor="cl-cur">Your current title</label><input id="cl-cur" className="input" value={f.currentTitle} onChange={set('currentTitle')} placeholder="Marketing Specialist" /></div>
            <div className="span-6"><label className="label" htmlFor="cl-job">Job you are applying for</label><input id="cl-job" className="input" value={f.jobTitle} onChange={set('jobTitle')} placeholder="Marketing Manager" /></div>
            <div className="span-6"><label className="label" htmlFor="cl-co">Company</label><input id="cl-co" className="input" value={f.company} onChange={set('company')} placeholder="Acme Corp" /></div>
            <div className="span-12"><label className="label" htmlFor="cl-hm">Hiring manager (optional)</label><input id="cl-hm" className="input" value={f.hiringManager} onChange={set('hiringManager')} placeholder="Ms. Patel" /></div>
            <div className="span-12"><label className="label" htmlFor="cl-ach">One key achievement</label><input id="cl-ach" className="input" value={f.achievement} onChange={set('achievement')} placeholder="increased customer retention by 25% in one year" /></div>
            <div className="span-12"><label className="label" htmlFor="cl-sk">Key skills (optional)</label><input id="cl-sk" className="input" value={f.skills} onChange={set('skills')} placeholder="SEO, analytics, team leadership" /></div>
            <div className="span-12"><span className="label">Tone</span>
              <Segmented label="Tone" value={f.tone} onChange={(v) => setF({ ...f, tone: v })} options={[{ value: 'formal', label: 'Formal' }, { value: 'friendly', label: 'Friendly' }, { value: 'confident', label: 'Confident' }]} />
            </div>
          </div>
          <button type="button" className="btn btn-primary mt" onClick={() => setLetter(buildCoverLetter(f))}><BsMagic aria-hidden="true" /> Generate cover letter</button>
        </div>

        <div className="card" aria-live="polite">
          {!letter ? <p className="muted">Your cover letter draft appears here. You can edit it before downloading.</p> : (
            <>
              <label className="label" htmlFor="cl-out">Draft (editable)</label>
              <textarea id="cl-out" className="input" rows={16} value={letter} onChange={(e) => setLetter(e.target.value)} />
              <div className="lib-actions mt">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => downloadTextPdf(letter, `${(f.name || 'cover-letter').replace(/\s+/g, '-')}-cover-letter.pdf`)}><BsDownload aria-hidden="true" /> Download PDF</button>
                <button type="button" className="btn btn-soft btn-sm" onClick={txt}><BsFileEarmarkText aria-hidden="true" /> Download .txt</button>
                <button type="button" className="btn btn-soft btn-sm" onClick={() => copy(letter, 'Cover letter copied')}><BsClipboard aria-hidden="true" /> Copy</button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="block">
        <h2>How to structure a cover letter</h2>
        <ol className="steps-list">
          <li><strong>Opening.</strong> Name the role and company and say why you are writing.</li>
          <li><strong>Proof.</strong> Give one achievement with a number that matches the job.</li>
          <li><strong>Fit.</strong> Explain why this company, in one or two sentences.</li>
          <li><strong>Close.</strong> Thank them and ask for a conversation.</li>
        </ol>
        <p>Pair your letter with an ATS-friendly resume from the <Link to="/ats-resume-builder">resume builder</Link>.</p>
      </section>
      <section className="block narrow-block"><h2>Cover letter questions</h2><FaqList items={FAQS} /></section>
    </PageShell>
  );
}
