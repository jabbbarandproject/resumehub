# ResumeHub - ATS Resume Builder (React, pre-rendered for SEO)

React 18 + Vite + React Router. Every page is **pre-rendered to static HTML at build time**, so Google (and AdSense reviewers) see full content. The tools run in the browser; resumes are stored in localStorage only.

## What is in the site
Home, ATS Resume Builder (landing), Builder (tool), Resume Templates (10), Resume Examples, Resume Score Checker (paste or upload), ATS Resume Guide, Cover Letter Builder, Resume for Frontend Developer / Software Engineer / Fresh Graduate, **Premium** (8 ready-made resumes, paid), Features, How It Works, FAQ, About, Contact, Privacy Policy, Terms, My Resumes, 404.

Key features: upload an existing resume (PDF, DOCX, TXT) and edit it in the builder; ATS score checker with file upload; 10 ATS-safe templates with full design control; real-text PDF download; saved resumes library with backup; plain-text copy; cookie consent; AdSense and GA4 hooks.

## Run
```bash
npm install
cp .env.example .env     # fill in your values
npm run dev              # http://localhost:5173
npm run build            # client build + server render + prerender -> /dist
npm run preview
```
Needs Node 18+.

## Deploy (static hosting)
Upload `/dist`. Works on Netlify, Vercel, Cloudflare Pages.
- Netlify / Cloudflare Pages: `public/_redirects` is included.
- Vercel: `vercel.json` is included.
- Any other host: serve `dist/<route>/index.html` for each route, `404.html` for unknown URLs, and `200.html` for `/builder/*`.

## Go-live checklist (Google traffic)
1. Buy a domain, set `VITE_SITE_URL` in `.env`, rebuild. This fixes canonicals, Open Graph, sitemap and robots.
2. Add the site to **Google Search Console** (domain property), submit `https://yourdomain.com/sitemap.xml`.
3. Request indexing for the home page and the main tool pages.
4. Add real content over time (more role guides, blog posts). Search traffic follows useful, original pages; the keyword pages here are a base.
5. Page speed: the build is static and cached; check with PageSpeed Insights.

## Ads (Google AdSense)
1. Deploy first. AdSense reviews a live site with real content; About, Contact, Privacy and Terms pages are included.
2. Apply at adsense.google.com. After approval put your IDs in `.env`: `VITE_ADSENSE_CLIENT=ca-pub-...`, `VITE_ADSENSE_SLOT=...`, and put your line in `public/ads.txt`.
3. Rebuild and deploy. Ads show only on content pages and only after the visitor accepts cookies. There are no ads in the builder.
4. If you serve EU/UK visitors, use a Google-certified consent platform (CMP) in addition to the built-in banner.

## Premium (paid resumes)
How it works: `/premium` shows 8 ready-made resumes. Without a license they are previews only. With a license the user can open them in the builder, edit and download. A premium resume opened without a license is locked in the builder.

Set up:
1. Create a product in Stripe Payment Links, Gumroad, Lemon Squeezy or Paddle that issues a **license key** after purchase. Put its checkout URL in `VITE_CHECKOUT_URL`, and the price in `VITE_PREMIUM_PRICE` (+ `_VALUE`, `_CURRENCY`).
2. Choose how keys are checked:
   - **Recommended:** deploy `serverless/verify-license.js` as a Netlify Function and set `VITE_LICENSE_API=/.netlify/functions/verify-license`. It verifies keys with Lemon Squeezy or Gumroad. Test it with a real test purchase first.
   - **Simple:** set `VITE_LICENSE_KEY_HASHES` to SHA-256 hashes of keys you issue (`npm run hash-key -- MY-KEY`). This is quick for launch but weak: the hashes ship in the JavaScript.
3. Honest limit: the site is static and PDFs are made in the browser, so a determined technical user can bypass any client-side lock. This protects against normal users, not against copying. Stronger protection needs a server that renders the PDFs.

## Uploading an existing resume
PDF and DOCX text is extracted in the browser (pdf.js, mammoth) and parsed with heuristics into the form. It works best on conventional layouts (name at top, headings such as Experience / Education / Skills, dates on each role). Always review the result; the builder shows what could not be detected. Scanned or image-only PDFs have no text and cannot be read (an ATS cannot read them either).

## Structure
```
src/pages/         all pages (content pages use components/common/PageShell)
src/data/          siteConfig (URLs, ads, premium), layoutSpec (templates), content/* (copy and examples)
src/services/      pdfService, resumeParser, fileTextService, licenseService, resumeLibrary, atsService, textScoreService ...
src/entry-server.jsx + scripts/prerender.mjs   static rendering, sitemap.xml, robots.txt
serverless/        license verification function
```

## Notes
- PDFs use Helvetica/Times/Courier (Latin text only). Urdu or other scripts need an embedded font.
- Replace the placeholder legal text only after reading it. It is a reasonable starting point, not legal advice.
- Content on role pages and the guide is original starter copy; extend and keep it accurate.
