// Renders every route to static HTML so search engines (and ad reviewers) see full content.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const server = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const { render, ROUTES, SITE_URL } = server;

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const page = ({ html, head }) => template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);

for (const route of ROUTES) {
  const out = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path, 'index.html');
  write(out, page(render(route.path)));
  console.log('prerendered', route.path);
}

// Blank shell used for dynamic URLs such as /builder/<id>
write(path.join(dist, '200.html'), template.replace('<!--app-head-->', '').replace('<!--app-html-->', ''));
// Real 404 page
write(path.join(dist, '404.html'), page(render('/page-not-found')));

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => r.index).map((r) =>
  `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`).join('\n');
write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /builder\nDisallow: /my-resumes\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.rmSync(path.resolve('dist-server'), { recursive: true, force: true });
console.log('done:', ROUTES.length, 'pages + 200.html, 404.html, sitemap.xml, robots.txt');
