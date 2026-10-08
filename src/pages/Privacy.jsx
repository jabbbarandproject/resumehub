import { Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell.jsx';
import { CONTACT_EMAIL, UPDATED } from '../data/siteConfig';

export default function Privacy() {
  return (
    <PageShell
      title="Privacy Policy | ResumeHub" description="How ResumeHub handles your data: resumes stay in your browser, and optional analytics and advertising cookies load only with your consent."
      path="/privacy-policy" h1="Privacy policy" lead={`Last updated ${UPDATED}.`} narrow cta={false} ad={false}
    >
      <section className="block"><h2>Summary</h2>
        <p>Your resume is created and stored in your own browser. We do not have accounts and we do not receive the content of your resume, uploaded files or cover letters.</p></section>
      <section className="block"><h2>Information stored on your device</h2>
        <p>ResumeHub uses your browser's localStorage to save your resumes, your working draft, your cookie choice and, if you buy Premium, your license key. This data stays on your device. Clearing your browser data removes it. Files you upload to import a resume are read in your browser and are not sent to us.</p></section>
      <section className="block"><h2>Cookies and similar technologies</h2>
        <p>We show a cookie banner. Optional analytics and advertising scripts load only if you choose Accept. If you choose Decline they are not loaded. The builder works either way. You can change your choice by clearing this site's data in your browser.</p></section>
      <section className="block"><h2>Analytics</h2>
        <p>If enabled and accepted, we use Google Analytics to understand which pages are used, with IP anonymization. It may set cookies and collect device and usage information such as pages viewed and approximate location.</p></section>
      <section className="block"><h2>Advertising</h2>
        <p>If enabled and accepted, third-party vendors including Google use cookies to serve ads based on your visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you. You can manage personalized advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, and learn more about how Google uses information at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com</a>. Ads are not shown inside the resume builder.</p></section>
      <section className="block"><h2>Payments</h2>
        <p>Premium purchases are handled by a third-party payment provider. We do not see or store your card details. The provider gives you a license key, which you can enter on the Premium page. Depending on the setup, the key may be checked by a verification service we operate.</p></section>
      <section className="block"><h2>Contact form</h2>
        <p>The contact form opens your email app. We receive only what you choose to send.</p></section>
      <section className="block"><h2>Children</h2>
        <p>ResumeHub is not directed to children under 13 and we do not knowingly collect their personal information.</p></section>
      <section className="block"><h2>Your rights</h2>
        <p>Because resume data stays on your device, you control it directly. If you are in a region with data protection rights (such as the EU, UK or California) you may contact us to ask about any personal data we hold, for example from an email you sent us.</p></section>
      <section className="block"><h2>Changes</h2>
        <p>We may update this policy and will change the date above when we do.</p></section>
      <section className="block"><h2>Contact</h2>
        <p>Questions about this policy: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or the <Link to="/contact">contact page</Link>.</p></section>
    </PageShell>
  );
}
