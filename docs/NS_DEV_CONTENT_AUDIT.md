# Аудит исходного портфолио и публичных источников

Дата: 13 октября 2026. Репозиторий https://github.com/to1enbekov/portfolio, HEAD 7ae56bf. В корне — index.html и README.md; других проектов, зависимостей или AGENTS.md не было. Клонировано в рабочую папку ns/portfolio, создана feature-ветка, незакоммиченных изменений до начала не было.

GitHub API подтвердил Pages legacy / main / корень. Настройки не менялись. Исходный index.html остаётся в корне как прежняя версия для legacy Pages; новая реализация собирается только из src в dist. Полные оригинальные описания и ссылки дополнительно сохранены в docs/legacy/portfolio-before-redesign.html и README-before-redesign.md. Архив не входит в dist.

## Прежние работы

| Работа         | Сохранённые сведения                                                                                                                                                                                                                       | Ссылки                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| House of Halal | Web, admin, iOS, integrations, analytics, releases, support. Исходные теги: Web, Swift/iOS, Supabase, Stripe, Uber, Clover, Cloudflare, Vercel.                                                                                            | https://houseofhalal.us/ и https://apps.apple.com/us/app/house-of-halal/id6781131756        |
| TendlyHub      | From scratch, auth/roles, access isolation, CRM, закупки, Telegram, production. Исходные теги Next.js 16, React 19, TypeScript, SQLite, Telegram, Nginx, systemd. Версии и инфраструктурные детали не публикуются как текущая архитектура. | https://tendlyhub.kz/                                                                       |
| Nur-Mubarak    | Public/internal systems, PHP, automation, deployment, SSL/TLS, server configuration, logs, fixes, maintenance. Исходные теги PHP, Composer, Git, Plesk, PS.kz, Linux, SSL/TLS. Публичный кейс не раскрывает конкретную инфраструктуру.     | https://journal.nmu.edu.kz/ и https://queue.nmu.edu.kz/                                     |
| Rizko.ai       | React/TypeScript, FastAPI/Python, PostgreSQL, Apify, Gemini/Claude, structured analysis/scoring.                                                                                                                                           | https://github.com/to1enbekov/viraltrend-ai — связанный public sample, не production source |

README также перечислял Kitapkhana. Он сохранён как дополнительный публичный пример библиотеки вне семи основных кейсов. Подтверждён GitHub repo https://github.com/to1enbekov/kitapkhana: bilingual, React, Express, PostgreSQL/Supabase.

Прежние личные контакты (архив): nurdoskanatbek06@gmail.com, https://t.me/to1enbekov, https://github.com/to1enbekov. На коммерческом сайте основной подтверждённый канал — WhatsApp +7 777 356 7132; личная почта не представляется корпоративной.

## Добавленные работы

- Satbayev School: корневая страница и точная ссылка index.html#history. Публично подтверждены история, администрация, новости, образовательные разделы. Backend-стек не утверждается.
- Alatau Bot: точная ссылка https://t.me/aalatau_bot. Описание назначения взято из мастер-промпта; бот не запускался, GPS/SOS/карты/спасательные интеграции не утверждаются.
- Islamic Research Journal: https://journal.nmu.edu.kz/index.php/ris. Подтверждены страницы журнала, текущего выпуска, информация для авторов, редакционные правила и публичное переключение языков. Это часть Nur-Mubarak, не дополнительный клиент.

## Проверка источников

Браузерные GET без авторизации, заполнения форм и взаимодействия с продуктами: прежний сайт, House of Halal, TendlyHub, queue.nmu.edu.kz, Satbayev School, journal/index.php/ris — HTTP 200. Получены реальные локальные screenshots. Web-инструмент не смог открыть TendlyHub и прежний сайт, но обычный браузер открыл; это не трактуется как отсутствие проектов.

App Store доступен и подтверждает существование House of Halal. viraltrend-ai и Kitapkhana проверены read-only через GitHub API. Дополнительный ограниченный GET подтвердил HTTP 200 для t.me/aalatau_bot, journal.nmu.edu.kz (redirect на /index.php/ris) и satbayevschool.edu.kz/index.html. Автоматический web-инструмент не прочитал Telegram-страницу, но HTTP-ссылка доступна; реальная работа бота требует ручной проверки в Telegram.

Детали работ описаны по прежнему портфолио и заявлению владельца; наличие публичного сайта само по себе не является подтверждением исключительного авторства. Отзывы, клиентские числа, сроки, цены и метрики не добавлялись.
