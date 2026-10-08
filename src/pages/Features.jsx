import PageShell from '../components/common/PageShell.jsx';
import { FEATURE_DETAILS } from '../data/content/features';

export default function Features() {
  return (
    <PageShell
      title="Features: Free ATS Resume Builder Tools | ResumeHub"
      description="See everything ResumeHub includes for free: live ATS score, keyword matching, 10 templates, design control, real-text PDF download and a saved resumes library."
      path="/features" h1="Everything ResumeHub includes"
      lead="Built to help you pass applicant tracking systems and impress the person reading after them. All free, all private."
      related={['builder', 'templates', 'how']}
    >
      <section className="block">
        <div className="feature-detail-grid">
          {FEATURE_DETAILS.map(({ icon: Icon, title, text, points }) => (
            <article className="feature" key={title}>
              <span className="icon-tile"><Icon aria-hidden="true" /></span>
              <h2>{title}</h2>
              <p className="muted">{text}</p>
              <ul className="plain-list small">{points.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
