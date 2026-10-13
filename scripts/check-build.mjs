import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
const root = path.resolve('dist');
const base = (process.env.BASE_PATH || '/portfolio/').replace(/\/$/, '') + '/';
const site = (process.env.SITE_URL || 'https://to1enbekov.github.io').replace(
  /\/$/,
  '',
);
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const pages = files.filter((file) => file.endsWith('.html'));
assert.equal(
  pages.length,
  30,
  'Three homes, 21 cases, three privacy pages, three 404 pages',
);
const titles = new Set();
let assets = 0,
  links = 0;
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const $ = load(html);
  const route = path
    .relative(root, file)
    .replaceAll(path.sep, '/')
    .replace(/index.html$/, '');
  const url = new URL(`${base}${route}`, site);
  const locale = route.startsWith('kk/')
    ? 'kk'
    : route.startsWith('en/')
      ? 'en'
      : 'ru';
  assert.equal($('html').attr('lang'), locale, file);
  assert.equal($('h1').length, 1, `${file}: one h1`);
  const title = $('title').text();
  assert(!titles.has(title), `${file}: unique title`);
  titles.add(title);
  assert(
    $('meta[name="description"]').attr('content')?.length > 20,
    `${file}: description`,
  );
  assert(
    !/NURDOS|Nurdos Kanatbek|Lorem ipsum|open to jobs/i.test(html),
    `${file}: old branding/placeholder`,
  );
  const is404 = /404(?:\.html|\/)/.test(route);
  if (!is404) {
    assert.equal(
      $('link[rel="alternate"][hreflang]').length,
      4,
      `${file}: hreflang`,
    );
    assert(
      $('link[rel="canonical"]')
        .attr('href')
        ?.startsWith(site + base),
      `${file}: canonical base`,
    );
    assert($('script[type="application/ld+json"]').length, `${file}: schema`);
    if (!route || route === 'kk/' || route === 'en/')
      assert.equal(
        $('[data-project-category]').length,
        7,
        `${file}: seven projects`,
      );
  } else
    assert.equal($('meta[name="robots"]').attr('content'), 'noindex, follow');
  for (const element of $('[src], [href], [srcset]').toArray()) {
    const el = $(element);
    for (const value of [
      el.attr('src'),
      el.attr('href'),
      ...(el
        .attr('srcset')
        ?.split(',')
        .map((item) => item.trim().split(/\s/)[0]) || []),
    ]) {
      if (
        !value ||
        value.startsWith('#') ||
        /^(tel:|mailto:|data:)/.test(value)
      )
        continue;
      if (/^https?:\/\//.test(value)) {
        if (el.attr('target') === '_blank')
          assert(
            /noopener/.test(el.attr('rel') || ''),
            `${file}: safe external link`,
          );
        continue;
      }
      assert(
        !value.startsWith('/') || value.startsWith(base),
        `${file}: wrong root-relative path ${value}`,
      );
      const resolved = new URL(value, url);
      let target = path.join(
        root,
        decodeURIComponent(resolved.pathname.slice(base.length)),
      );
      const info = await stat(target).catch(() => null);
      assert(info, `${file}: missing asset/link ${value}`);
      if (info.isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (el.attr('src') || el.attr('srcset')) assets++;
      else links++;
    }
  }
  for (const script of $('script[type="application/ld+json"]').toArray())
    JSON.parse($(script).text());
}
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, 27);
assert(!sitemap.includes('404'));
assert(sitemap.includes(site + base));
console.log(
  `PASS: ${pages.length} pages, ${assets} asset references, ${links} local links; SEO, branding, base path and sitemap.`,
);
