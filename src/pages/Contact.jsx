import { useState } from 'react';
import PageShell from '../components/common/PageShell.jsx';
import { CONTACT_EMAIL } from '../data/siteConfig';

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    const body = `${f.message}\n\nFrom: ${f.name} (${f.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('ResumeHub message')}&body=${encodeURIComponent(body)}`;
  };
  return (
    <PageShell
      title="Contact ResumeHub" description="Contact the ResumeHub team with questions, feedback or support requests."
      path="/contact" h1="Contact us" lead="Questions, feedback or a problem with a Premium purchase? Send us a message." narrow cta={false} ad={false}
    >
      <section className="block">
        <p>Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the form below. It opens your email app with the message filled in.</p>
        <form className="card contact-form" onSubmit={send}>
          <label className="label" htmlFor="c-name">Name</label>
          <input id="c-name" className="input" required value={f.name} onChange={set('name')} />
          <label className="label mt" htmlFor="c-email">Your email</label>
          <input id="c-email" type="email" className="input" required value={f.email} onChange={set('email')} />
          <label className="label mt" htmlFor="c-msg">Message</label>
          <textarea id="c-msg" className="input" rows={6} required value={f.message} onChange={set('message')} />
          <button type="submit" className="btn btn-primary mt">Send message</button>
        </form>
      </section>
    </PageShell>
  );
}
