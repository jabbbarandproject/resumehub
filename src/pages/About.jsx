import { Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell.jsx';

export default function About() {
  return (
    <PageShell
      title="About ResumeHub | Free ATS Resume Builder" description="ResumeHub helps job seekers build ATS-friendly resumes for free. Learn why we built it and how we keep your data private."
      path="/about" h1="About ResumeHub" lead="We built ResumeHub because good resumes were being rejected by software before a person ever read them." narrow cta={false} ad={false}
    >
      <section className="block">
        <h2>Our mission</h2>
        <p>Applicant tracking systems filter most online applications. Many resume builders produce beautiful layouts that these systems cannot read. ResumeHub does the opposite: every template is a clean single column of real text, so the software reads exactly what you wrote.</p>
      </section>
      <section className="block">
        <h2>What we believe</h2>
        <ul className="plain-list">
          <li><strong>Free tools should be genuinely useful.</strong> The builder, score checker and cover letter builder are free with no account.</li>
          <li><strong>Your resume is yours.</strong> It is created and stored in your browser. We do not receive it.</li>
          <li><strong>Advice should be honest.</strong> Our checks are transparent and our guides explain the reasoning, not just the rules.</li>
        </ul>
      </section>
      <section className="block">
        <h2>How we are funded</h2>
        <p>ResumeHub is supported by optional Premium resume designs and by advertising on content pages. Ads are never shown inside the builder, and optional cookies load only after you accept them. Read our <Link to="/privacy-policy">privacy policy</Link> for details.</p>
      </section>
      <section className="block"><p>Questions or feedback? <Link to="/contact">Contact us</Link>.</p></section>
    </PageShell>
  );
}
