import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { localPath, locales } from '../i18n/locales';
const escape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');
export const GET: APIRoute = ({ site }) => {
  const routes = [
    '',
    'privacy/',
    ...projects.map((project) => `projects/${project.slug}/`),
  ];
  const body = routes
    .flatMap((route) =>
      locales.map(
        (locale) =>
          `<url><loc>${escape(new URL(localPath(locale, route), site).href)}</loc>${locales.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${escape(new URL(localPath(l, route), site).href)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${escape(new URL(localPath('ru', route), site).href)}"/></url>`,
      ),
    )
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
