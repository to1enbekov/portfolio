import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('artifacts/lighthouse', { recursive: true });
const chrome = await launch({
  chromePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  chromeFlags: ['--headless', '--disable-gpu', '--no-first-run'],
});
const summary = [];
try {
  for (const locale of ['ru', 'kk', 'en']) {
    const url = `http://127.0.0.1:4321/portfolio/${locale === 'ru' ? '' : `${locale}/`}`;
    const result = await lighthouse(url, {
      port: chrome.port,
      output: ['json', 'html'],
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    await writeFile(`artifacts/lighthouse/${locale}.json`, result.report[0]);
    await writeFile(`artifacts/lighthouse/${locale}.html`, result.report[1]);
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, category]) => [
        key,
        Math.round(category.score * 100),
      ]),
    );
    const item = {
      locale,
      url,
      scores,
      lcp: result.lhr.audits['largest-contentful-paint'].displayValue,
      cls: result.lhr.audits['cumulative-layout-shift'].displayValue,
    };
    summary.push(item);
    console.log(JSON.stringify(item));
  }
} finally {
  await Promise.resolve(chrome.kill());
}
await writeFile(
  'artifacts/lighthouse/summary.json',
  JSON.stringify(summary, null, 2),
);
