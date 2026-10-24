import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const prerender = true;

export const GET: APIRoute = ({ site: astroSite }) => {
	const base = astroSite ?? new URL(site.url);
	const pageUrl = new URL('/', base).href;
	const lastmod = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${pageUrl}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
