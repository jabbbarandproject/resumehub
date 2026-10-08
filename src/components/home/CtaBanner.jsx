import { Link } from 'react-router-dom';
import { BsFileEarmarkPlus } from 'react-icons/bs';

export default function CtaBanner({ title = 'Ready to build a resume that gets read?', text = 'It takes about ten minutes and needs no account.' }) {
  return (
    <section className="section-tight">
      <div className="cta">
        <h2>{title}</h2>
        <p>{text}</p>
        <Link to="/builder" className="btn btn-white btn-lg">
          <BsFileEarmarkPlus aria-hidden="true" /> Build my resume
        </Link>
      </div>
    </section>
  );
}
