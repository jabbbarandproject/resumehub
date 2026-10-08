import { Link, useNavigate } from 'react-router-dom';
import { BsClipboard, BsMagic } from 'react-icons/bs';
import PageShell from '../components/common/PageShell.jsx';
import FaqList from '../components/common/FaqList.jsx';
import ResumePreview from '../components/builder/ResumePreview.jsx';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { faqSchema } from '../data/content/faqs';
import { TEMPLATES } from '../data/layoutSpec';
import { startFromSample } from '../services/sampleService';

export default function RolePage({ role }) {
  const navigate = useNavigate();
  const copy = useCopyToClipboard();
  const tpl = TEMPLATES.find((t) => t.id === role.template);
  const related = ['builder', 'templates', 'examples', 'score'];

  return (
    <PageShell
      title={role.seoTitle} description={role.description} path={role.path} crumbLabel={`${role.role} resume`}
      h1={role.h1} lead={role.intro[0]}
      actions={<button type="button" className="btn btn-primary btn-lg" onClick={() => startFromSample(role.sample, navigate)}><BsMagic aria-hidden="true" /> Use this example in the builder</button>}
      schema={[faqSchema(role.faqs)]} related={related}
    >
      <section className="block"><p>{role.intro[1]}</p></section>

      <section className="block role-example">
        <div>
          <h2>Example {role.role.toLowerCase()} resume</h2>
          <p className="muted">This example uses the <strong>{tpl.name}</strong> template. Every part is ATS-friendly text. Open it in the builder to edit it with your own details.</p>
          <button type="button" className="btn btn-soft" onClick={() => startFromSample(role.sample, navigate)}>Edit this example</button>
        </div>
        <div className="role-paper"><ResumePreview resume={role.sample} showPageInfo={false} /></div>
      </section>

      <section className="block">
        <h2>Resume summary example</h2>
        <div className="example">
          <div><p>{role.summary}</p></div>
          <button type="button" className="icon-btn" aria-label="Copy summary" onClick={() => copy(role.summary, 'Summary copied')}><BsClipboard aria-hidden="true" /></button>
        </div>
      </section>

      <section className="block">
        <h2>Skills to include</h2>
        <div className="skill-groups">
          {role.skillGroups.map((g) => (
            <div key={g.name}>
              <h3>{g.name}</h3>
              <div className="kw-list">{g.items.map((i) => <span key={i} className="kw kw-found">{i}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Keywords an ATS looks for</h2>
        <p>Use these terms where they honestly describe your work. Check each job post and mirror its wording.</p>
        <div className="kw-list">{role.keywords.map((k) => <span key={k} className="kw kw-found">{k}</span>)}</div>
      </section>

      <section className="block">
        <h2>Example bullet points</h2>
        <ul className="plain-list">{role.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        <p>Want more wording ideas? See all <Link to="/resume-examples">resume examples</Link>.</p>
      </section>

      <section className="block">
        <h2>How to write a strong {role.role.toLowerCase()} resume</h2>
        <div className="tips-grid">
          {role.tips.map((t) => (<article className="feature" key={t.title}><h3>{t.title}</h3><p className="muted">{t.text}</p></article>))}
        </div>
      </section>

      <section className="block">
        <h2>Mistakes to avoid</h2>
        <ul className="plain-list">{role.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>
      </section>

      <section className="block narrow-block">
        <h2>{role.role} resume questions</h2>
        <FaqList items={role.faqs} />
      </section>
    </PageShell>
  );
}
