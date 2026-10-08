import Seo from '../components/common/Seo.jsx';
import Hero from '../components/home/Hero.jsx';
import ToolsGrid from '../components/home/ToolsGrid.jsx';
import Features from '../components/home/Features.jsx';
import TemplatesTeaser from '../components/home/TemplatesTeaser.jsx';
import PremiumTeaser from '../components/home/PremiumTeaser.jsx';
import GuidesGrid from '../components/home/GuidesGrid.jsx';
import FaqTeaser, { HOME_FAQS } from '../components/home/FaqTeaser.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import AdSlot from '../components/common/AdSlot.jsx';
import { faqSchema } from '../data/content/faqs';
import { SITE_NAME, SITE_URL } from '../data/siteConfig';

const schema = [
  { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
  { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/logo-mark.png` },
  faqSchema(HOME_FAQS),
];

export default function Home() {
  return (
    <>
      <Seo
        title="ResumeHub - Free ATS Resume Builder and Score Checker"
        description="Build an ATS-friendly resume in minutes. Free builder with 10 templates, live ATS score, job keyword matching, cover letter builder and PDF download."
        path="/" schema={schema}
      />
      <Hero />
      <ToolsGrid />
      <Features />
      <TemplatesTeaser />
      <PremiumTeaser />
      <div className="container"><AdSlot /></div>
      <GuidesGrid />
      <FaqTeaser />
      <div className="container"><CtaBanner /></div>
    </>
  );
}
