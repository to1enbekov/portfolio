import type { Locale } from '../i18n/locales';
import { contactTranslations } from '../i18n/contact';
import { services, serviceIds } from '../data/services';

export const PHONE = '+7 777 356 7132';
export const WHATSAPP_NUMBER = '77773567132';
export interface Enquiry {
  name: string;
  service: string;
  project: string;
  budget: string;
  timing: string;
  reply: string;
  consent: boolean;
}
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;
export interface SubmissionResult {
  kind: 'handoff';
  url: string;
}
export interface SubmissionAdapter {
  prepare(enquiry: Enquiry, locale: Locale): SubmissionResult;
}

export function validateEnquiry(data: Enquiry, locale: Locale): EnquiryErrors {
  const c = contactTranslations[locale];
  const errors: EnquiryErrors = {};
  const name = data.name.trim();
  const project = data.project.trim();
  if (name.length < 2 || name.length > 80) errors.name = c.errorName;
  if (!serviceIds.includes(data.service as (typeof serviceIds)[number]))
    errors.service = c.errorService;
  if (project.length < 10 || project.length > 1500)
    errors.project = c.errorProject;
  for (const field of ['budget', 'timing', 'reply'] as const)
    if (data[field].trim().length > 120) errors[field] = c.errorOptional;
  if (!data.consent) errors.consent = c.errorConsent;
  return errors;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const whatsappAdapter: SubmissionAdapter = {
  prepare(data, locale) {
    if (Object.keys(validateEnquiry(data, locale)).length)
      throw new Error('Invalid enquiry');
    const c = contactTranslations[locale];
    const service = services.find((item) => item.id === data.service);
    const lines = [
      c.messageIntro,
      '',
      `${c.messageName}: ${data.name.trim()}`,
      `${c.messageService}: ${service?.copy[locale].title}`,
      `${c.messageProject}: ${data.project.trim()}`,
    ];
    for (const [field, label] of [
      ['budget', c.messageBudget],
      ['timing', c.messageTiming],
      ['reply', c.messageReply],
    ] as const) {
      if (data[field].trim()) lines.push(`${label}: ${data[field].trim()}`);
    }
    return { kind: 'handoff', url: whatsappUrl(lines.join('\n')) };
  },
};
