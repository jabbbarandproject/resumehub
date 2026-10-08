import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo.jsx';

export default function NotFound() {
  return (
    <section className="container section center">
      <Seo title="Page not found | ResumeHub" description="The page you are looking for does not exist." path="/404" noindex />
      <h1>This page does not exist</h1>
      <p className="muted">Check the address, or head back and keep building your resume.</p>
      <div className="hero-actions center-actions">
        <Link to="/builder" className="btn btn-primary">Open the builder</Link>
        <Link to="/" className="btn btn-ghost">Go home</Link>
      </div>
    </section>
  );
}
