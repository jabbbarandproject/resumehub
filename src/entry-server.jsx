import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { PAGES, SITE_URL } from './data/siteConfig';

export { SITE_URL };

// Every page that gets its own static HTML file. `index: false` keeps it out of the sitemap.
export const ROUTES = [
  ...Object.values(PAGES).map((p) => ({ path: p.path, priority: p.priority, index: true })),
  { path: '/builder', priority: 0, index: false },
  { path: '/my-resumes', priority: 0, index: false },
];

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;
  const head = ['title', 'priority', 'meta', 'link', 'script'].map((k) => (helmet[k] ? helmet[k].toString() : '')).join('\n');
  return { html, head };
}
