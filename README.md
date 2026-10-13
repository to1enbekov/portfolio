# NS Dev

Коммерческий сайт IT-команды: шесть направлений услуг, семь основных проектов, отдельные страницы кейсов, RU / ҚАЗ / EN и рабочий сценарий заявки через WhatsApp.

**Публичная версия пока остаётся прежней:** https://to1enbekov.github.io/portfolio/. Эта ветка не меняет настройки Pages и не запускает автоматическую публикацию.

## Локальный запуск

Требуется Node.js 22 LTS ≥ 22.13 или Node.js ≥ 24 и npm. Зависимости зафиксированы в package-lock.json.

```powershell
npm ci
npm run dev
```

Открыть http://127.0.0.1:4321/portfolio/. Для просмотра готовой статической сборки:

```powershell
npm run build
npm run preview
```

Preview обслуживает реальный `/portfolio/`, глубокие пути и HTTP 404. Не подменяет неизвестные страницы главной SPA. Для остановки — Ctrl+C.

## Проверки

```powershell
npm run check
npm run lint
npm run format:check
npm run test
npm run build
npm run test:static
npx playwright install chromium
npm run test:e2e
```

В среде с установленным Chrome можно использовать его без скачивания браузера:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run test:e2e
```

`npm run qa:lighthouse` выполняется при запущенном production preview. Для устойчивой оценки запускайте Lighthouse отдельно от браузерных тестов и сборок. Отчёты: `artifacts/lighthouse/`. Playwright: `playwright-report/`, traces в `test-results/`, изображения в `artifacts/screenshots/`. Эти данные не попадают в Git.

## Структура

```text
src/components/    секции сайта, карточки, форма, кейсы и служебные страницы
src/layouts/       общий HTML, метаданные, schema, header/footer
src/data/          единый типизированный контент проектов и услуг
src/i18n/          локали, переводы сайта и компактный словарь формы
src/lib/           валидация заявки и submission adapter
src/pages/         статические маршруты, sitemap и robots
src/scripts/       небольшие клиентские взаимодействия без React
src/styles/        токены и адаптивная вёрстка
public/assets/     оригинальные знаки и реальные screenshots
scripts/           preview, экспорт assets и проверка сборки
tests/             unit + Playwright / axe
docs/              план, аудит, дизайн-система и QA-отчёт
docs/legacy/       исходное портфолио, README и монограмма
```

Корневой `index.html` — сохранённый исходный сайт для legacy Pages. Astro использует `src/pages/index.astro` и создаёт новый `dist/index.html`. Архив и legacy HTML не включаются в новую сборку. Публиковать нужно содержимое `dist`, а не исходники.

## Языки и кейсы

- RU: `/portfolio/`; KK: `/portfolio/kk/`; EN: `/portfolio/en/`.
- Кейсы: `[locale]/projects/[slug]/` (у RU нет префикса).
- Privacy: `[locale]/privacy/`.
- Переключатель сохраняет slug и текущий hash раздела. Используется KK, не KZ.
- Ключи и структура переводов проверяются TypeScript и unit-тестом полноты.

Проекты редактируются в `src/data/projects.ts`, услуги в `src/data/services.ts`, текст сайта в `src/i18n/translations.ts`, форма в `src/i18n/contact.ts`. Все три локали обязательны. Добавление проекта автоматически создаёт три кейса и sitemap; обновите ожидаемое количество страниц/кейсов в тестах.

Семь основных кейсов: House of Halal, TendlyHub, Nur-Mubarak Systems, Rizko.ai, Satbayev School, Alatau Bot, Islamic Research Journal. Kitapkhana сохранён как дополнительный public sample. viraltrend-ai обозначен как связанный пример, не production-source Rizko.ai. Журнал относится к университетским работам Nur-Mubarak, а не отдельному клиенту.

## Логотипы и screenshots

Знак экспортирован из оригинального PNG, без перерисовки и искажения пропорций. Повторный экспорт:

```powershell
node scripts/prepare-brand.mjs docs/legacy/NS-original-symbol.png
node scripts/prepare-social.mjs
```

Social-экспорт требует Playwright Chromium или установленного Chrome (переменная выше). Он использует оригинальный растр и настоящий локальный Inter. Лицензии Inter и Lucide включены в `public/assets/licenses/`.

`node scripts/capture-projects.mjs` — read-only снимки публичных страниц на 1440 × 960. Не запускает бот, не отправляет формы, не обходит доступ. Проверяйте screenshots визуально перед заменой: внешние сайты могут измениться. WebP 1200 × 800 и 640 × 427 хранятся локально; hotlink нет. Rizko.ai и Alatau Bot используют подписанные графические обложки. Полный инвентарь восьми исходных знаков проверен из папки `../logo`.

## Как работает заявка

1. CTA услуги выбирает направление в форме. CTA кейса передаёт только публичный service ID.
2. Имя, услуга, описание и ознакомление с обработкой данных обязательны. Бюджет, сроки и контакт необязательны.
3. Валидация формирует локализованное сообщение; ввод остаётся обычным текстом.
4. Открывается `https://wa.me/77773567132?text=...`. Пользователь сам нажимает **Send в WhatsApp**. Видимый fallback позволяет повторно открыть сообщение, если браузер заблокировал новую вкладку.
5. Сайт сообщает о подготовке, не об отправке. Данные не сохраняются в БД, localStorage/sessionStorage, логах или URL сайта. На уходе форма очищается. URL WhatsApp содержит текст и может остаться в истории внешнего адреса — это раскрыто на privacy-странице.

Без JavaScript форма отключена, но прямой WhatsApp, телефон, содержимое, FAQ и навигация работают. Есть копирование номера и текстовый fallback при недоступном Clipboard API. Реальная отправка из WhatsApp требует подтверждения пользователем и не выполнялась при QA.

`SubmissionAdapter` в `src/lib/submission.ts` — точка расширения. **Самостоятельного приёма в CRM, почту или БД сейчас нет**: нужен настоящий защищённый backend/form service, антиспам и серверные секреты. Фиктивный endpoint не подключён. Нет аналитических/рекламных трекеров, учётных записей и платных внешних сервисов.

## SEO и будущий домен

У индексируемых страниц уникальные title/description, canonical/hreflang, OG/Twitter и Organization/WebSite schema. Sitemap содержит 27 страниц; три 404 имеют noindex. На project Pages robots доступен внутри `/portfolio/`; правила всего origin относятся к корню хостинга. GitHub Pages использует общий `404.html` на русском с ссылками всех локалей; локальное preview подбирает перевод по пути.

Настройки `site` и `base` в astro.config.mjs или переменные окружения:

```powershell
$env:SITE_URL = 'https://example.com'
$env:BASE_PATH = '/'
npm run build
npm run test:static
```

Все ссылки и assets строятся через единые helpers. При переносе проверьте sitemap/canonical/OG, хостинг и 404. Для Playwright измените URL и ожидаемый base; текущая QA-конфигурация проверяет `/portfolio/`.

## Релиз после одобрения

1. Review feature-ветки/PR и QA. Merge выполняется после отдельного разрешения.
2. После одобренного merge переключить Settings → Pages → Source на GitHub Actions. Сейчас настройка не изменена.
3. Вручную запустить `Publish NS Dev (manual approval only)` из `main`, введя `PUBLISH_NS_DEV`. Workflow не запускается на push, PR или feature-ветке; до deploy повторяет checks/build/tests.
4. Проверить публичный `/portfolio/`, KK/EN, прямые кейсы, 404 и WhatsApp на iOS/Android/desktop.
5. Для отката вернуть Pages legacy/main/root: прежний index.html сохранён. Следующие релизы также запускаются вручную после одобрения.

PR CI только проверяет код и сохраняет build/test artifacts. Ничего не публикует. Домен не покупался, DNS и production не изменялись.
