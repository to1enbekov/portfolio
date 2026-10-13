import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const base = (process.env.BASE_PATH || '/portfolio/').replace(/\/$/, '') + '/';
const port = Number(process.env.PORT || 4321);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
};
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, 'http://localhost').pathname,
    );
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }
  if (pathname === base.slice(0, -1) || pathname === '/') {
    response.writeHead(302, { Location: base });
    response.end();
    return;
  }
  const relative = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : null;
  let status = 200;
  let target =
    relative === null ? null : path.resolve(root, relative || 'index.html');
  // Decode first, then prove containment; never serve source or adjacent files.
  if (target && !target.startsWith(root + path.sep) && target !== root) {
    response.writeHead(403);
    response.end();
    return;
  }
  try {
    if (!target) throw new Error('Outside base');
    if ((await stat(target)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { Location: pathname + '/' });
        response.end();
        return;
      }
      target = path.join(target, 'index.html');
    }
    await stat(target);
  } catch {
    status = 404;
    const locale = relative?.match(/^(kk|en)\//)?.[1];
    target = locale
      ? path.join(root, locale, '404/index.html')
      : path.join(root, '404.html');
  }
  try {
    const body = await readFile(target);
    response.writeHead(status, {
      'Content-Type': types[path.extname(target)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500);
    response.end('Build the site first.');
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`NS Dev preview: http://127.0.0.1:${port}${base}`),
);
