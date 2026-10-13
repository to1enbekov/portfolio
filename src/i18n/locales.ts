export const locales = ['ru', 'kk', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export const languageNames: Localized<string> = {
  ru: 'RU',
  kk: 'ҚАЗ',
  en: 'EN',
};
export function localPath(locale: Locale, suffix = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') + '/';
  return `${base}${locale === 'ru' ? '' : `${locale}/`}${suffix.replace(/^\//, '')}`;
}
export function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
