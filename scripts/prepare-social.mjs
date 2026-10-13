import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
const font = (
  await readFile(
    'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  )
).toString('base64');
const mark = (await readFile('public/assets/brand/ns-mark.png')).toString(
  'base64',
);
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<html><head><style>@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}*{box-sizing:border-box}body{margin:0;background:#f5f5f7;color:#111;font-family:Inter,sans-serif;display:flex;align-items:center;gap:96px;padding:128px;height:630px}img{width:auto;height:340px}h1{font-size:112px;font-weight:400;letter-spacing:-7px;margin:0;line-height:1.1;white-space:nowrap}p{font-size:22px;color:#6e6e73;margin:24px 0 0;white-space:nowrap}</style></head><body><img src="data:image/png;base64,${mark}" alt=""/><div><h1>NS Dev</h1><p>Web · Mobile · Automation · AI</p></div></body></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/assets/brand/og.png' });
  console.log(
    'OG exported: original NS raster + locally embedded Inter, 1200 × 630.',
  );
} finally {
  await browser.close();
}
