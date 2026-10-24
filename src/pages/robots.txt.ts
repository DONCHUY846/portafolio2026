import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const prerender = true;

export const GET: APIRoute = ({ site: astroSite }) => {
	const base = astroSite ?? new URL(site.url);
	const sitemapUrl = new URL('sitemap.xml', base).href;

	const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
