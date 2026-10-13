import { describe, expect, it } from 'vitest';
import { locales } from '../../src/i18n/locales';
import { t } from '../../src/i18n/translations';
import {
  validateEnquiry,
  whatsappAdapter,
  whatsappUrl,
  type Enquiry,
} from '../../src/lib/submission';
const valid: Enquiry = {
  name: 'QA Example',
  service: 'web',
  project: 'A new website for an educational project.',
  budget: '',
  timing: '',
  reply: '',
  consent: true,
};
describe('real WhatsApp handoff', () => {
  for (const locale of locales) {
    it(`${locale}: required fields and consent`, () => {
      const errors = validateEnquiry(
        {
          ...valid,
          name: ' ',
          service: 'invalid',
          project: 'short',
          consent: false,
        },
        locale,
      );
      expect(Object.keys(errors)).toEqual([
        'name',
        'service',
        'project',
        'consent',
      ]);
      expect(errors.name).toBe(t(locale).contact.errorName);
    });
    it(`${locale}: optional fields can be omitted`, () => {
      expect(validateEnquiry(valid, locale)).toEqual({});
      const result = whatsappAdapter.prepare(valid, locale);
      expect(result.kind).toBe('handoff');
      const url = new URL(result.url);
      expect(url.hostname).toBe('wa.me');
      expect(url.pathname).toBe('/77773567132');
      expect(url.searchParams.get('text')).toContain(
        t(locale).contact.messageIntro,
      );
      expect(url.searchParams.get('text')).not.toContain(
        `${t(locale).contact.messageBudget}:`,
      );
    });
    it(`${locale}: maximum lengths are enforced`, () =>
      expect(
        Object.keys(
          validateEnquiry(
            {
              ...valid,
              name: 'x'.repeat(81),
              project: 'x'.repeat(1501),
              budget: 'x'.repeat(121),
              timing: 'x'.repeat(121),
              reply: 'x'.repeat(121),
            },
            locale,
          ),
        ),
      ).toEqual(['name', 'project', 'budget', 'timing', 'reply']));
  }
  it('keeps user text as encoded plain text, including HTML and line breaks', () => {
    const project = '<script>alert("x")</script> & описание\nжаңа жоба';
    const url = new URL(
      whatsappAdapter.prepare({ ...valid, project }, 'kk').url,
    );
    expect(url.searchParams.get('text')).toContain(project);
    expect(url.href).not.toContain('<script>');
  });
  it('rejects invalid data before generating a handoff', () =>
    expect(() =>
      whatsappAdapter.prepare({ ...valid, consent: false }, 'en'),
    ).toThrow('Invalid enquiry'));
  it('encodes Cyrillic, Kazakh and special characters', () =>
    expect(new URL(whatsappUrl('Сәлем! +&?#')).searchParams.get('text')).toBe(
      'Сәлем! +&?#',
    ));
});
