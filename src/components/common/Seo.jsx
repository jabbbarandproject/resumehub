import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_URL } from '../../data/siteConfig';

const strip = ({ ['@context']: _ctx, ...rest }) => rest;

export default function Seo({ title, description, path = '/', noindex = false, type = 'website', schema, crumbs }) {
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/og-image.png`;
  const nodes = [].concat(schema || []).map(strip);
  if (crumbs && crumbs.length > 1) {
    nodes.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: `${SITE_URL}${c.path}` })),
    });
  }
  const graph = nodes.length ? JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }) : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {graph && <script type="application/ld+json">{graph}</script>}
    </Helmet>
  );
}
