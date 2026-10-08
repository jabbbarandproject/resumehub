import { Link } from 'react-router-dom';
import FaqList from '../common/FaqList.jsx';
import { ALL_FAQS } from '../../data/content/faqs';

export const HOME_FAQS = [ALL_FAQS[0], ALL_FAQS[1], ALL_FAQS[4], ALL_FAQS[10]];

export default function FaqTeaser() {
  return (
    <section className="container section narrow" aria-labelledby="faq-h">
      <div className="section-head"><h2 id="faq-h">Frequently asked questions</h2></div>
      <FaqList items={HOME_FAQS} />
      <p className="more-link"><Link to="/faq">Read all questions</Link></p>
    </section>
  );
}
