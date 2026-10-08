import { Link } from 'react-router-dom';
import { BsGem } from 'react-icons/bs';
import ResumePreview from '../builder/ResumePreview.jsx';
import { PREMIUM_RESUMES } from '../../data/content/premium';
import { PRICE_LABEL } from '../../data/siteConfig';

export default function PremiumTeaser() {
  const shots = [PREMIUM_RESUMES[0], PREMIUM_RESUMES[2], PREMIUM_RESUMES[5]];
  return (
    <section className="container section" aria-labelledby="prem-h">
      <div className="premium-band">
        <div>
          <span className="pill"><BsGem aria-hidden="true" /> Premium</span>
          <h2 id="prem-h">Ready-made resumes that look as good as they read</h2>
          <p className="muted">{PREMIUM_RESUMES.length} professionally written, designed and ATS-friendly resumes. Unlock once for {PRICE_LABEL}, then edit everything and download unlimited PDFs.</p>
          <Link to="/premium" className="btn btn-primary">See premium resumes</Link>
        </div>
        <div className="premium-shots" aria-hidden="true">
          {shots.map((s) => (<div className="premium-shot" key={s.id}><ResumePreview resume={s.data} showPageInfo={false} /></div>))}
        </div>
      </div>
    </section>
  );
}
