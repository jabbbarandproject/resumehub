import PageShell from '../components/common/PageShell.jsx';
import FaqList from '../components/common/FaqList.jsx';
import { ALL_FAQS, FAQ_GROUPS, faqSchema } from '../data/content/faqs';

export default function FaqPage() {
  return (
    <PageShell
      title="FAQ: ATS Resumes, Privacy and the Builder | ResumeHub"
      description="Answers to common questions about applicant tracking systems, ATS-friendly resumes, privacy, saving your resume and downloading a PDF."
      path="/faq" h1="Frequently asked questions"
      lead="Straight answers about ATS, your privacy and how the builder works."
      schema={[faqSchema(ALL_FAQS)]} related={['guide', 'builder', 'score']} narrow
    >
      {FAQ_GROUPS.map((g) => (
        <section className="block" key={g.group}>
          <h2>{g.group}</h2>
          <FaqList items={g.items} />
        </section>
      ))}
    </PageShell>
  );
}
