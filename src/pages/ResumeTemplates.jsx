import { useNavigate } from 'react-router-dom';
import PageShell from '../components/common/PageShell.jsx';
import TemplateThumb from '../components/common/TemplateThumb.jsx';
import FaqList from '../components/common/FaqList.jsx';
import { DEFAULT_SETTINGS, FONTS, TEMPLATES } from '../data/layoutSpec';
import { startFromTemplate } from '../services/sampleService';

const FAQS = [
  { q: 'Are these resume templates really ATS-friendly?', a: 'Yes. Each one is a single column of real text with standard fonts and no tables, text boxes, images or icons. The PDF text can be selected and copied in the correct order.' },
  { q: 'Can I change the colors and fonts?', a: 'Yes. After choosing a template you can change the accent color, font family, size, spacing, margins, alignment and heading style. Those options stay within ATS-safe limits.' },
  { q: 'Which template is best for me?', a: 'Choose Modern or Classic if unsure. Use Compact to fit a long career on one page, Tech for developer roles and Academic for research or education.' },
];

export default function ResumeTemplates() {
  const navigate = useNavigate();
  return (
    <PageShell
      title="10 ATS-Friendly Resume Templates (Free) | ResumeHub"
      description="Choose from 10 free ATS-friendly resume templates. Single column, real text, standard fonts. Customize color and layout, then download a PDF."
      path="/resume-templates" h1="Free ATS-friendly resume templates"
      lead="Ten professional designs, one rule: every template is readable by applicant tracking systems. Pick one, make it yours and download a PDF."
      related={['builder', 'examples', 'guide']}
    >
      <section className="block">
        <div className="tpl-gallery">
          {TEMPLATES.map((t) => (
            <article className="tpl-big" key={t.id}>
              <TemplateThumb settings={{ ...DEFAULT_SETTINGS, ...t.settings }} />
              <h2>{t.name}</h2>
              <p className="muted small">{t.note}. {FONTS[t.settings.fontFamily || 'sans'].label} font.</p>
              <p className="small"><strong>Best for:</strong> {t.bestFor}</p>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => startFromTemplate(t.id, navigate)}>Use this template</button>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>What makes a template ATS-friendly</h2>
        <ul className="plain-list">
          <li>One column, so text is read in the order you wrote it.</li>
          <li>Real text, not images, so every word can be extracted.</li>
          <li>Standard fonts (Arial, Times, Courier styles) that every system supports.</li>
          <li>Standard headings such as Work Experience, Education and Skills.</li>
          <li>No tables, text boxes, icons or skill bars for important content.</li>
        </ul>
      </section>

      <section className="block">
        <h2>How to choose a template</h2>
        <p>Match the tone to the industry. Conservative fields like law, finance and government suit Classic or Executive. Creative and client-facing roles can use Modern, Banner or Elegant. Developers often prefer Tech. If you have a long career, try Compact. If you are short on experience, switch the section order to education first in the design panel.</p>
      </section>

      <section className="block narrow-block">
        <h2>Template questions</h2>
        <FaqList items={FAQS} />
      </section>
    </PageShell>
  );
}
