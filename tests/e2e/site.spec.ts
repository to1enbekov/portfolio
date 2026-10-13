import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { projects } from '../../src/data/projects';
import { services } from '../../src/data/services';
import { t } from '../../src/i18n/translations';
import { locales } from '../../src/i18n/locales';
const home = (locale: string) =>
  `/portfolio/${locale === 'ru' ? '' : `${locale}/`}`;

for (const locale of locales) {
  test(`${locale}: seven projects, external URLs, privacy and accessible content`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(home(locale));
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('[data-project-category]')).toHaveCount(7);
    for (const project of projects)
      for (const link of project.links)
        await expect(
          page.locator(`.project-links a[href="${link.url}"]`),
        ).toBeVisible();
    await expect(page.locator('.phone-contact > a')).toHaveText(
      '+7 777 356 7132',
    );
    await expect(page.locator('.contact-copy .button')).toHaveAttribute(
      'href',
      /https:\/\/wa.me\/77773567132\?text=/,
    );
    await expect(page.locator('.enquiry-form')).toContainText(
      t(locale).contact.explanation,
    );
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      audit.violations,
      JSON.stringify(
        audit.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ),
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.goto(`${home(locale)}privacy/`);
    await expect(page.locator('h1')).toHaveText(t(locale).privacy.title);
  });

  for (const width of [320, 375, 768, 1024, 1440]) {
    test(`${locale}: responsive ${width}px screenshot`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(home(locale));
      await page.evaluate(() => document.fonts.ready);
      // Trigger every lazy image before capturing the complete page.
      for (const image of await page.locator('img:visible').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (el) =>
                (el as HTMLImageElement).complete &&
                (el as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBeTruthy();
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      const overflowing = await page
        .locator(
          'h1, h2, h3, .button, .field input, .field select, .field textarea',
        )
        .evaluateAll((elements) =>
          elements
            .filter((el) => {
              const box = el.getBoundingClientRect();
              return box.right > window.innerWidth + 1 || box.left < -1;
            })
            .map((el) => el.textContent?.trim().slice(0, 60)),
        );
      expect(overflowing).toEqual([]);
      const broken = await page
        .locator('img:visible')
        .evaluateAll((elements) =>
          (elements as HTMLImageElement[])
            .filter((img) => !img.complete || img.naturalWidth === 0)
            .map((img) => img.src),
        );
      expect(broken).toEqual([]);
      await mkdir('artifacts/screenshots', { recursive: true });
      await page.screenshot({
        path: `artifacts/screenshots/${locale}-home-${width}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    });
  }

  test(`${locale}: filters and service selection`, async ({ page }) => {
    await page.goto(home(locale));
    await page.locator('[data-filter="education"]').click();
    await expect(page.locator('[data-project-category]:visible')).toHaveCount(
      3,
    );
    await page.locator('[data-filter="ai"]').click();
    await expect(page.locator('[data-project-category]:visible')).toHaveCount(
      2,
    );
    await page.locator('[data-filter="all"]').click();
    await expect(page.locator('[data-project-category]:visible')).toHaveCount(
      7,
    );
    for (const service of services) {
      await page.locator(`[data-service="${service.id}"]`).click();
      await expect(page.locator('[name="service"]')).toHaveValue(service.id);
    }
    await page
      .getByRole('button', { name: t(locale).contact.submit, exact: true })
      .click();
    await expect(page.locator('#error-name')).toHaveText(
      t(locale).contact.errorName,
    );
    await expect(page.locator('#error-project')).toHaveText(
      t(locale).contact.errorProject,
    );
    await expect(page.locator('#error-consent')).toHaveText(
      t(locale).contact.errorConsent,
    );
    await expect(page.locator('[name="name"]')).toBeFocused();
    await expect(page.locator('[data-handoff]')).toBeHidden();
  });

  test(`${locale}: validated handoff is plain text and never a sent confirmation`, async ({
    page,
    context,
  }) => {
    // Intercept the external handoff: no real message or third-party request is sent in QA.
    await context.route('https://wa.me/**', (route) =>
      route.fulfill({
        status: 200,
        body: '<title>WhatsApp handoff QA</title>',
      }),
    );
    await page.goto(home(locale));
    await page.locator('[name="name"]').fill('QA Example');
    await page.locator('[name="service"]').selectOption('ai');
    await page
      .locator('[name="project"]')
      .fill('<b>QA</b> Жаңа өнім & website, with AI features.');
    await page.locator('[name="budget"]').fill('1000 USD');
    await page.locator('[name="consent"]').check();
    const popupPromise = context.waitForEvent('page');
    await page
      .getByRole('button', { name: t(locale).contact.submit, exact: true })
      .click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    const href = await page.locator('[data-handoff-link]').getAttribute('href');
    const url = new URL(href!);
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/77773567132');
    expect(url.searchParams.get('text')).toContain(
      '<b>QA</b> Жаңа өнім & website, with AI features.',
    );
    expect(url.searchParams.get('text')).toContain('1000 USD');
    await expect(page.locator('[data-handoff]')).toContainText(
      t(locale).contact.prepared,
    );
    await expect(page.locator('[data-handoff] b')).toHaveCount(0);
    expect(page.url()).not.toContain('QA');
    expect(
      await page.evaluate(() => ({
        local: Object.keys(localStorage),
        session: Object.keys(sessionStorage),
        cookies: document.cookie,
      })),
    ).toEqual({ local: [], session: [], cookies: '' });
    await popup.close();
    await page
      .locator('[name="project"]')
      .fill('A changed task after preparing the message.');
    await expect(page.locator('[data-handoff]')).toBeHidden();
    await page.reload();
    await expect(page.locator('[name="name"]')).toHaveValue('');
  });

  for (const project of projects) {
    test(`${locale}: deep case ${project.slug}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const response = await page.goto(
        `${home(locale)}projects/${project.slug}/`,
      );
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveText(project.name);
      await expect(page.locator('.case-body')).toContainText(
        project.copy[locale].task,
      );
      if (project.copy[locale].note)
        await expect(page.locator('.case-note')).toHaveText(
          project.copy[locale].note!,
        );
      await expect(page.locator('.case-cta .button')).toHaveAttribute(
        'href',
        `${home(locale)}?service=${project.service}#contact`,
      );
      await page.evaluate(() => document.fonts.ready);
      await mkdir('artifacts/screenshots', { recursive: true });
      await page.screenshot({
        path: `artifacts/screenshots/${locale}-case-${project.slug}.png`,
        fullPage: true,
        animations: 'disabled',
      });
      const other = locale === 'en' ? 'kk' : 'en';
      await page
        .locator(`.header-actions [data-language][lang="${other}"]`)
        .click();
      await expect(page).toHaveURL(
        new RegExp(`${home(other)}projects/${project.slug}/$`),
      );
    });
  }
}

test('mobile menu traps focus, closes with Escape and follows anchors', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto('/portfolio/');
  const opener = page.locator('[data-menu-open]');
  await opener.click();
  await expect(page.locator('dialog')).toBeVisible();
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
  for (let i = 0; i < 18; i++) {
    await page.keyboard.press('Tab');
    expect(
      await page.evaluate(() => !!document.activeElement?.closest('dialog')),
    ).toBeTruthy();
  }
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).toBeHidden();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.locator('[data-menu-close]').click();
  await expect(page.locator('dialog')).toBeHidden();
  await opener.click();
  await page.locator('dialog nav a[href="/portfolio/#projects"]').click();
  await expect(page.locator('dialog')).toBeHidden();
  await expect(page).toHaveURL(/#projects$/);
});
test('locale switch retains the semantic section', async ({ page }) => {
  await page.goto('/portfolio/#services');
  await page.locator('.header-actions [data-language][lang="kk"]').click();
  await expect(page).toHaveURL('/portfolio/kk/#services');
  await page.locator('.header-actions [data-language][lang="en"]').click();
  await expect(page).toHaveURL('/portfolio/en/#services');
});
test('no JavaScript: content, case links, FAQ and direct contact remain usable', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/portfolio/kk/');
  await expect(page.locator('[data-project-category]')).toHaveCount(7);
  await expect(page.locator('.nojs-mobile')).toBeVisible();
  await expect(page.locator('.contact-copy .button')).toHaveAttribute(
    'href',
    /wa.me/,
  );
  await expect(page.locator('fieldset')).toHaveAttribute('disabled', '');
  await expect(page.locator('.form-submit')).toBeDisabled();
  await page.locator('.faq-list summary').first().click();
  await expect(page.locator('.faq-list details').first()).toHaveAttribute(
    'open',
    '',
  );
  await page.locator('.project-title').first().click();
  await expect(page.locator('h1')).toHaveText('House of Halal');
  await context.close();
});
test('404 response, localized recovery and root assets fail closed', async ({
  page,
  request,
}) => {
  for (const locale of locales) {
    const response = await page.goto(`${home(locale)}missing-page/`);
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText(t(locale).notFound.title);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, follow',
    );
  }
  expect((await request.get('/assets/brand/icon-32.png')).status()).toBe(404);
  expect(
    (await request.get('/portfolio/assets/brand/icon-32.png')).status(),
  ).toBe(200);
});
test('clipboard copy has a working fallback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-write', 'clipboard-read']);
  await page.goto('/portfolio/en/');
  await page.locator('[data-copy-phone]').click();
  await expect(page.locator('[data-copy-status]')).toHaveText(
    t('en').contact.copied,
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    '+7 777 356 7132',
  );
});
test('case enquiry preselects the matching service', async ({ page }) => {
  await page.goto('/portfolio/kk/projects/rizko-ai/');
  await page.locator('.case-cta .button').click();
  await expect(page.locator('[name="service"]')).toHaveValue('ai');
});
test('reduced motion disables smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/portfolio/');
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
});
