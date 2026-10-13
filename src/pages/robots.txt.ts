import type { APIRoute } from 'astro';
import { assetPath } from '../i18n/locales';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\nSitemap: ${new URL(assetPath('sitemap.xml'), site)}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
