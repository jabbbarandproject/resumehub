import PageShell from '../components/common/PageShell.jsx';
import { UPDATED } from '../data/siteConfig';

export default function Terms() {
  return (
    <PageShell
      title="Terms of Use | ResumeHub" description="Terms for using ResumeHub, including Premium resume purchases." path="/terms" h1="Terms of use"
      lead={`Last updated ${UPDATED}.`} narrow cta={false} ad={false}
    >
      <section className="block"><h2>Using ResumeHub</h2>
        <p>ResumeHub provides free tools for writing resumes and cover letters. You are responsible for the accuracy of what you put in your documents and for how you use them.</p></section>
      <section className="block"><h2>No guarantee</h2>
        <p>ATS scores and suggestions are guidance only. Employers use different systems, and we cannot guarantee interviews, offers or specific results.</p></section>
      <section className="block"><h2>Your content</h2>
        <p>You keep ownership of your resume content. It is stored in your browser and you are responsible for keeping backups.</p></section>
      <section className="block"><h2>Premium resumes</h2>
        <p>Premium gives you access to ready-made resume designs and sample content that you may edit and use for your own job applications. You may not resell, redistribute or publish the Premium resume library. A license key is for personal use. Payments and refunds are handled by our payment provider under the terms shown at checkout.</p></section>
      <section className="block"><h2>Acceptable use</h2>
        <p>Do not misuse the site, attempt to bypass Premium access, or use it to submit false information to employers.</p></section>
      <section className="block"><h2>Disclaimer</h2>
        <p>The service is provided as is, without warranties of any kind, to the fullest extent permitted by law.</p></section>
      <section className="block"><h2>Changes</h2>
        <p>We may update these terms and will change the date above when we do.</p></section>
    </PageShell>
  );
}
