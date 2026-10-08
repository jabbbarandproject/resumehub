import { Link } from 'react-router-dom';
import { BsMagic } from 'react-icons/bs';
import ImportResume from '../components/common/ImportResume.jsx';
import useImportToBuilder from '../hooks/useImportToBuilder';
import PageShell from '../components/common/PageShell.jsx';
import FaqList from '../components/common/FaqList.jsx';
import TemplatesTeaser from '../components/home/TemplatesTeaser.jsx';
import { FAQ_GROUPS, faqSchema } from '../data/content/faqs';
import { HOW_STEPS } from '../data/content/features';
import { SITE_URL } from '../data/siteConfig';

const FAQS = FAQ_GROUPS[1].items.slice(0, 5);
const schema = [
  { '@type': 'WebApplication', name: 'ResumeHub ATS Resume Builder', url: `${SITE_URL}/ats-resume-builder`, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  faqSchema(FAQS),
];

export default function AtsResumeBuilder() {
  const importToBuilder = useImportToBuilder();
  return (
    <PageShell
      title="Free ATS Resume Builder With Live Score | ResumeHub"
      description="Create an ATS-friendly resume online for free. Live preview, ATS score checker, 10 templates, keyword matching and PDF download with real selectable text."
      path="/ats-resume-builder" h1="Free ATS resume builder"
      lead="Build a resume that applicant tracking systems can read, check it against a live score, and download a PDF with real text. No sign-up and nothing is uploaded."
      actions={<><Link to="/builder" className="btn btn-primary btn-lg"><BsMagic aria-hidden="true" /> Start building your resume</Link><ImportResume onResume={importToBuilder} label="Upload an existing resume" className="btn btn-ghost btn-lg" /></>}
      schema={schema} related={['templates', 'score', 'guide', 'cover']}
    >
      <section className="block">
        <h2>What makes a resume ATS-friendly</h2>
        <p>An ATS converts your resume to plain text. If the layout is complex, the text can come out in the wrong order, or whole sections can be lost. An ATS-friendly resume has a single column, standard section headings, common fonts and no tables, text boxes, icons or images carrying key information.</p>
        <p>Every template in ResumeHub follows these rules by design, so you can focus on your content instead of fighting the layout. Read the full <Link to="/ats-resume-guide">ATS resume guide</Link> for the reasoning behind each rule.</p>
      </section>

      <section className="block">
        <h2>What you get</h2>
        <ul className="plain-list">
          <li><strong>Upload your existing resume</strong> (PDF, DOCX or TXT) and edit it in the builder.</li>
          <li><strong>Live preview</strong> that matches the downloaded PDF, with page breaks shown.</li>
          <li><strong>ATS score</strong> with eight checks and a tip for each failed check.</li>
          <li><strong>Keyword matching</strong> against any job description you paste in.</li>
          <li><strong>Ten templates</strong> and full control of color, font, spacing and alignment. <Link to="/resume-templates">See the templates</Link>.</li>
          <li><strong>My Resumes library</strong> so you can edit and download again later.</li>
          <li><strong>Private by design</strong>: your resume is stored in your browser only.</li>
        </ul>
      </section>

      <section className="block">
        <h2>Build your resume in five steps</h2>
        <ol className="steps-list">
          {HOW_STEPS.map((s) => <li key={s.title}><strong>{s.title}.</strong> {s.text}</li>)}
        </ol>
      </section>

      <TemplatesTeaser />

      <section className="block narrow-block">
        <h2>Resume builder questions</h2>
        <FaqList items={FAQS} />
      </section>
    </PageShell>
  );
}
