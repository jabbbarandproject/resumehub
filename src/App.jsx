import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Builder from './pages/Builder.jsx';
import MyResumes from './pages/MyResumes.jsx';
import AtsResumeBuilder from './pages/AtsResumeBuilder.jsx';
import ResumeTemplates from './pages/ResumeTemplates.jsx';
import ResumeExamples from './pages/ResumeExamples.jsx';
import ResumeScoreChecker from './pages/ResumeScoreChecker.jsx';
import AtsGuide from './pages/AtsGuide.jsx';
import CoverLetterBuilder from './pages/CoverLetterBuilder.jsx';
import RolePage from './pages/RolePage.jsx';
import Premium from './pages/Premium.jsx';
import Features from './pages/Features.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import FaqPage from './pages/FaqPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';
import { ROLES } from './data/content/roles';
import { PAGES } from './data/siteConfig';

const rel = (p) => p.replace(/^\//, '');

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="builder/:id?" element={<Builder />} />
        <Route path="my-resumes" element={<MyResumes />} />
        <Route path={rel(PAGES.builder.path)} element={<AtsResumeBuilder />} />
        <Route path={rel(PAGES.templates.path)} element={<ResumeTemplates />} />
        <Route path={rel(PAGES.examples.path)} element={<ResumeExamples />} />
        <Route path={rel(PAGES.score.path)} element={<ResumeScoreChecker />} />
        <Route path={rel(PAGES.guide.path)} element={<AtsGuide />} />
        <Route path={rel(PAGES.cover.path)} element={<CoverLetterBuilder />} />
        <Route path={rel(PAGES.premium.path)} element={<Premium />} />
        {ROLES.map((r) => <Route key={r.key} path={rel(r.path)} element={<RolePage role={r} />} />)}
        <Route path={rel(PAGES.features.path)} element={<Features />} />
        <Route path={rel(PAGES.how.path)} element={<HowItWorks />} />
        <Route path={rel(PAGES.faq.path)} element={<FaqPage />} />
        <Route path={rel(PAGES.about.path)} element={<About />} />
        <Route path={rel(PAGES.contact.path)} element={<Contact />} />
        <Route path={rel(PAGES.privacy.path)} element={<Privacy />} />
        <Route path={rel(PAGES.terms.path)} element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
