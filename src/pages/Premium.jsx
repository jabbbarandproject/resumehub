import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheck2Circle, BsGem } from 'react-icons/bs';
import PageShell from '../components/common/PageShell.jsx';
import FaqList from '../components/common/FaqList.jsx';
import PremiumCard from '../components/premium/PremiumCard.jsx';
import UnlockModal from '../components/premium/UnlockModal.jsx';
import usePremium from '../hooks/usePremium';
import useToast from '../hooks/useToast';
import { PREMIUM_RESUMES } from '../data/content/premium';
import { faqSchema } from '../data/content/faqs';
import { PRICE_CURRENCY, PRICE_LABEL, PRICE_VALUE, SITE_URL } from '../data/siteConfig';
import { downloadResumePdf } from '../services/pdfService';
import { startFromSample } from '../services/sampleService';

const FAQS = [
  { q: 'What do I get with Premium?', a: `A one-time payment of ${PRICE_LABEL} unlocks ${PREMIUM_RESUMES.length} professionally written and designed resumes. You can open any of them in the builder, change every detail and download unlimited PDFs.` },
  { q: 'Are premium resumes ATS-friendly?', a: 'Yes. They use the same single-column, real-text structure as every ResumeHub template: no tables, images or icons. The look comes from typography, color and spacing.' },
  { q: 'How do I unlock them after buying?', a: 'After checkout you receive a license key. Click Unlock, paste the key and the library opens on this device.' },
  { q: 'Can I use the same key on another device?', a: 'Enter the key on each device you use. A license is for personal use only.' },
  { q: 'Can I try before I buy?', a: 'You can preview every resume on this page, and the free builder and ten templates are always available.' },
];

const schema = [
  { '@type': 'Product', name: 'ResumeHub Premium Resume Library', description: 'Ready-made, ATS-friendly premium resumes that you can edit and download.', image: `${SITE_URL}/og-image.png`, brand: { '@type': 'Brand', name: 'ResumeHub' }, offers: { '@type': 'Offer', price: PRICE_VALUE, priceCurrency: PRICE_CURRENCY, availability: 'https://schema.org/InStock', url: `${SITE_URL}/premium` } },
  faqSchema(FAQS),
];

export default function Premium() {
  const navigate = useNavigate();
  const toast = useToast();
  const { active } = usePremium();
  const [open, setOpen] = useState(false);

  const download = async (item) => {
    try { await downloadResumePdf(item.data); toast('PDF downloaded'); } catch { toast('Could not create the PDF'); }
  };

  return (
    <PageShell
      title="Premium ATS Resumes: Ready-Made and Editable | ResumeHub"
      description={`${PREMIUM_RESUMES.length} professionally written, beautifully designed and ATS-friendly resumes. Buy once, edit everything and download unlimited PDFs.`}
      path="/premium" crumbLabel="Premium" h1="Premium resumes, ready to edit and download"
      lead="Skip the blank page. Start from a professionally written resume in a polished design that applicant tracking systems can still read."
      actions={active
        ? <span className="pill"><BsCheck2Circle aria-hidden="true" /> Premium unlocked on this device</span>
        : <button type="button" className="btn btn-primary btn-lg" onClick={() => setOpen(true)}><BsGem aria-hidden="true" /> Unlock Premium for {PRICE_LABEL}</button>}
      schema={schema} related={['templates', 'builder', 'score']}
    >
      <section className="block">
        <ul className="plain-list">
          <li><strong>{PREMIUM_RESUMES.length} complete resumes</strong> across engineering, product, marketing, data, design, healthcare, finance and operations.</li>
          <li><strong>Edit everything</strong> in the builder: wording, colors, fonts, spacing and layout.</li>
          <li><strong>Unlimited PDF downloads</strong> with real selectable text.</li>
          <li><strong>One payment</strong>, no subscription.</li>
        </ul>
      </section>

      <section className="block">
        <h2>The premium library</h2>
        <div className="pgrid">
          {PREMIUM_RESUMES.map((item) => (
            <PremiumCard key={item.id} item={item} active={active} onUse={(i) => startFromSample(i.data, navigate)} onDownload={download} onUnlock={() => setOpen(true)} />
          ))}
        </div>
      </section>

      <section className="block narrow-block"><h2>Premium questions</h2><FaqList items={FAQS} /></section>
      <UnlockModal open={open} onClose={() => setOpen(false)} />
    </PageShell>
  );
}
