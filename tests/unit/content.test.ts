import { describe, expect, it, vi } from 'vitest';
import { projects } from '../../src/data/projects';
import { services } from '../../src/data/services';
import { translations } from '../../src/i18n/translations';
import { locales, localPath, assetPath } from '../../src/i18n/locales';
vi.stubEnv('BASE_URL', '/portfolio/');
function leaves(value: unknown, path = ''): string[] {
  if (typeof value === 'string') {
    expect(value.trim().length).toBeGreaterThan(0);
    return [path];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, item]) => leaves(item, `${path}.${key}`),
  );
}
describe('content contracts', () => {
  for (const locale of locales) {
    it(`${locale}: complete UI and project/service copy`, () => {
      expect(leaves(translations[locale])).toEqual(leaves(translations.ru));
      for (const project of projects) {
        expect(project.copy[locale].summary).toBeTruthy();
        expect(project.copy[locale].features.length).toBeGreaterThan(1);
      }
      for (const service of services)
        expect(service.copy[locale].deliverables).toHaveLength(4);
    });
    it(`${locale}: same case route and correct base`, () => {
      expect(localPath(locale, 'projects/rizko-ai/')).toBe(
        `/portfolio/${locale === 'ru' ? '' : `${locale}/`}projects/rizko-ai/`,
      );
    });
  }
  it('retains seven main projects and all supplied URLs', () => {
    expect(projects).toHaveLength(7);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(7);
    expect(services).toHaveLength(6);
    const urls = projects.flatMap((p) => p.links.map((l) => l.url));
    for (const url of [
      'https://houseofhalal.us/',
      'https://apps.apple.com/us/app/house-of-halal/id6781131756',
      'https://tendlyhub.kz/',
      'https://journal.nmu.edu.kz/',
      'https://queue.nmu.edu.kz/',
      'https://github.com/to1enbekov/viraltrend-ai',
      'https://satbayevschool.edu.kz/index.html#history',
      'https://t.me/aalatau_bot',
      'https://journal.nmu.edu.kz/index.php/ris',
    ])
      expect(urls).toContain(url);
  });
  it('AI code sample and journal relationship are explicit in all locales', () => {
    for (const locale of locales) {
      expect(
        projects.find((p) => p.slug === 'rizko-ai')?.copy[locale].note,
      ).toContain('production');
      expect(
        projects.find((p) => p.slug === 'islamic-research-journal')?.copy[
          locale
        ].note,
      ).toContain('Nur-Mubarak');
    }
  });
  it('uses local base-aware brand paths', () =>
    expect(assetPath('/assets/brand/icon-32.png')).toBe(
      '/portfolio/assets/brand/icon-32.png',
    ));
});
