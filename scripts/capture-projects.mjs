import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Read-only public-page captures. No authentication, forms or bot interaction.
const targets = [
  ['previous-portfolio', 'https://to1enbekov.github.io/portfolio/'],
  ['house-of-halal', 'https://houseofhalal.us/'],
  ['tendlyhub', 'https://tendlyhub.kz/'],
  ['nur-mubarak', 'https://queue.nmu.edu.kz/'],
  ['satbayev-school', 'https://satbayevschool.edu.kz/'],
  ['islamic-research-journal', 'https://journal.nmu.edu.kz/index.php/ris'],
];
await mkdir('artifacts/sources', { recursive: true });
await mkdir('public/assets/projects', { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
});
const report = [];
for (const [slug, url] of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
  });
  try {
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 25000,
    });
    await page.waitForTimeout(2200);
    await page.evaluate(() => document.fonts.ready);
    const image = await page.screenshot({
      path: `artifacts/sources/${slug}.png`,
    });
    const destination =
      slug === 'previous-portfolio' ? 'docs/legacy' : 'public/assets/projects';
    await sharp(image)
      .resize(1200, 800)
      .webp({ quality: 82 })
      .toFile(`${destination}/${slug}.webp`);
    await sharp(image)
      .resize(640)
      .webp({ quality: 78 })
      .toFile(`${destination}/${slug}-640.webp`);
    report.push({
      slug,
      url,
      status: response?.status(),
      title: await page.title(),
      screenshot: `${slug}.webp`,
    });
    console.log(`${slug}: ${response?.status()} ${await page.title()}`);
  } catch (error) {
    report.push({ slug, url, error: error.message });
    console.log(`${slug}: unavailable (${error.message.split('\n')[0]})`);
  }
  await page.close();
}
await browser.close();
await writeFile(
  'artifacts/sources/capture-report.json',
  JSON.stringify(report, null, 2),
);
