import { contactTranslations } from '../i18n/contact';
import { locales, type Locale } from '../i18n/locales';
import { services } from '../data/services';
import {
  PHONE,
  validateEnquiry,
  whatsappAdapter,
  whatsappUrl,
  type Enquiry,
} from '../lib/submission';

const dialog = document.querySelector<HTMLDialogElement>('#mobile-menu');
const opener = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeMenu = () => dialog?.close();
if (dialog && opener) {
  opener.hidden = false;
  document.querySelector('.nojs-mobile')?.setAttribute('hidden', '');
  opener.addEventListener('click', () => {
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-menu-close]')?.focus();
    opener.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  });
  dialog
    .querySelector('[data-menu-close]')
    ?.addEventListener('click', closeMenu);
  dialog
    .querySelectorAll('a')
    .forEach((link) => link.addEventListener('click', closeMenu));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeMenu();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ).filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  dialog.addEventListener('close', () => {
    opener.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    opener.focus({ preventScroll: true });
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1100 && dialog.open) closeMenu();
  });
}

document
  .querySelectorAll<HTMLAnchorElement>('[data-language]')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const url = new URL(link.href);
      url.hash = location.hash;
      link.href = url.href;
    });
  });

const filters = document.querySelector<HTMLElement>('[data-project-filters]');
if (filters) {
  filters.hidden = false;
  filters
    .querySelectorAll<HTMLButtonElement>('[data-filter]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.dataset.filter;
        filters
          .querySelectorAll('button')
          .forEach((item) =>
            item.setAttribute('aria-pressed', String(item === button)),
          );
        let count = 0;
        document
          .querySelectorAll<HTMLElement>('[data-project-category]')
          .forEach((item) => {
            item.hidden =
              category !== 'all' && item.dataset.projectCategory !== category;
            if (!item.hidden) count++;
          });
        const status = document.querySelector<HTMLElement>(
          '[data-filter-status]',
        );
        if (status)
          status.textContent = `${status.dataset.countLabel} ${count}`;
      });
    });
}

document
  .querySelectorAll<HTMLButtonElement>('[data-copy-phone]')
  .forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const status = document.querySelector('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(PHONE);
        if (status) status.textContent = button.dataset.copied || '';
      } catch {
        if (status) status.textContent = button.dataset.copyFallback || PHONE;
      }
    });
  });

const form = document.querySelector<HTMLFormElement>('[data-enquiry]');
if (form) {
  const value = form.dataset.locale;
  const locale: Locale = locales.includes(value as Locale)
    ? (value as Locale)
    : 'ru';
  const c = contactTranslations[locale];
  const fields = form.querySelector<HTMLFieldSetElement>(
    '[data-enquiry-fields]',
  );
  if (fields) fields.disabled = false;
  const summary = form.querySelector<HTMLElement>('[data-form-summary]');
  const handoff = form.querySelector<HTMLElement>('[data-handoff]');
  const handoffLink = form.querySelector<HTMLAnchorElement>(
    '[data-handoff-link]',
  );

  const invalidateHandoff = () => {
    if (handoff) handoff.hidden = true;
    if (handoffLink) handoffLink.href = whatsappUrl(c.directMessage);
  };
  const preselect = (id: string) => {
    if (!services.some((service) => service.id === id)) return;
    const select = form.querySelector<HTMLSelectElement>('[name="service"]');
    if (select) {
      select.value = id;
      select.removeAttribute('aria-invalid');
    }
    const error = form.querySelector('[data-error="service"]');
    if (error) error.textContent = '';
    invalidateHandoff();
  };
  // Only a public service identifier can be read from the URL; never form contents.
  const requestedService = new URLSearchParams(location.search).get('service');
  if (requestedService) preselect(requestedService);
  document
    .querySelectorAll<HTMLAnchorElement>('[data-service]')
    .forEach((link) =>
      link.addEventListener('click', () => {
        preselect(link.dataset.service || '');
      }),
    );
  form.addEventListener('input', (event) => {
    invalidateHandoff();
    const field = event.target as HTMLInputElement;
    if (field.name) {
      field.removeAttribute('aria-invalid');
      const error = form.querySelector(`[data-error="${field.name}"]`);
      if (error) error.textContent = '';
    }
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = new FormData(form);
    const data: Enquiry = {
      name: String(input.get('name') || ''),
      service: String(input.get('service') || ''),
      project: String(input.get('project') || ''),
      budget: String(input.get('budget') || ''),
      timing: String(input.get('timing') || ''),
      reply: String(input.get('reply') || ''),
      consent: input.get('consent') === 'on',
    };
    const errors = validateEnquiry(data, locale);
    form.querySelectorAll('[data-error]').forEach((el) => {
      el.textContent = '';
    });
    form.querySelectorAll('[aria-invalid]').forEach((el) => {
      el.removeAttribute('aria-invalid');
    });
    if (summary) {
      summary.hidden = !Object.keys(errors).length;
      summary.textContent = c.summaryError;
    }
    if (Object.keys(errors).length) {
      invalidateHandoff();
      for (const [field, error] of Object.entries(errors)) {
        const element = form.querySelector<HTMLElement>(`[name="${field}"]`);
        element?.setAttribute('aria-invalid', 'true');
        const message = form.querySelector(`[data-error="${field}"]`);
        if (message) message.textContent = error;
      }
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    const result = whatsappAdapter.prepare(data, locale);
    if (handoffLink) handoffLink.href = result.url;
    if (handoff) handoff.hidden = false;
    // A synchronous anchor click preserves the user gesture. The visible link is also a fallback.
    const link = document.createElement('a');
    link.href = result.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  });
  // Drop generated URL and form PII when leaving, including browser back/forward cache.
  window.addEventListener('pagehide', () => {
    form.reset();
    invalidateHandoff();
  });
}
