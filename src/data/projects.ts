import type { Localized } from '../i18n/locales';
import type { ServiceId } from './services';
export type Category = 'commerce' | 'business' | 'education' | 'ai';
export type LinkLabel =
  'view' | 'app' | 'code' | 'journal' | 'queue' | 'bot' | 'history';
export interface ProjectCopy {
  category: string;
  summary: string;
  task: string;
  features: string[];
  note?: string;
}
export interface Project {
  slug: string;
  name: string;
  category: Category;
  service: ServiceId;
  image?: string;
  cover?: 'ai' | 'mountains';
  stack: string[];
  links: { url: string; label: LinkLabel }[];
  copy: Localized<ProjectCopy>;
}
export const projects: Project[] = [
  {
    slug: 'house-of-halal',
    name: 'House of Halal',
    category: 'commerce',
    service: 'web',
    image: 'house-of-halal',
    stack: [
      'Swift / iOS',
      'Supabase',
      'Stripe',
      'Uber',
      'Clover',
      'Cloudflare',
      'Vercel',
    ],
    links: [
      { url: 'https://houseofhalal.us/', label: 'view' },
      {
        url: 'https://apps.apple.com/us/app/house-of-halal/id6781131756',
        label: 'app',
      },
    ],
    copy: {
      ru: {
        category: 'Электронная коммерция · Web + iOS',
        summary:
          'Цифровой продукт для halal-бизнеса: веб, iOS, доставка и внешние интеграции.',
        task: 'Создать и сопровождать коммерческий продукт, соединяющий веб-сервис, мобильное приложение и операционные инструменты бизнеса.',
        features: [
          'Веб-продукт и административные инструменты.',
          'iOS-приложение и работа с релизами TestFlight / App Store.',
          'Платёжные и внешние интеграции, аналитика.',
          'Развёртывание и поддержка продукта.',
        ],
      },
      kk: {
        category: 'Электрондық коммерция · Web + iOS',
        summary:
          'Halal-бизнеске арналған цифрлық өнім: веб, iOS, жеткізу және сыртқы интеграциялар.',
        task: 'Веб-сервисті, мобильді қосымшаны және бизнестің жұмыс құралдарын біріктіретін коммерциялық өнімді жасау және қолдау.',
        features: [
          'Веб-өнім және басқару құралдары.',
          'iOS қосымшасы және TestFlight / App Store релиздері.',
          'Төлем және сыртқы интеграциялар, аналитика.',
          'Өнімді орналастыру және қолдау.',
        ],
      },
      en: {
        category: 'E-commerce · Web + iOS',
        summary:
          'A digital product for halal commerce: web, iOS, delivery and external integrations.',
        task: 'Build and support a commercial product connecting a web service, mobile app and operational business tools.',
        features: [
          'Web product and admin tooling.',
          'iOS app and TestFlight / App Store release workflows.',
          'Payment and external integrations, analytics.',
          'Deployments and ongoing product support.',
        ],
      },
    },
  },
  {
    slug: 'tendlyhub',
    name: 'TendlyHub',
    category: 'business',
    service: 'business',
    image: 'tendlyhub',
    stack: ['Next.js', 'React', 'TypeScript', 'Telegram'],
    links: [{ url: 'https://tendlyhub.kz/', label: 'view' }],
    copy: {
      ru: {
        category: 'B2B · Тендеры и CRM',
        summary:
          'Платформа для поиска закупок и организации работы с тендерами.',
        task: 'Разработать с нуля B2B-платформу, в которой работа с закупками, доступами и CRM-процессами собрана в одном продукте.',
        features: [
          'Поиск и загрузка данных о закупках.',
          'Аккаунты, роли и разграничение доступа.',
          'CRM-процессы и Telegram-уведомления.',
          'Запуск и сопровождение продукта.',
        ],
      },
      kk: {
        category: 'B2B · Тендерлер және CRM',
        summary:
          'Сатып алуларды іздеуге және тендерлермен жұмысты ұйымдастыруға арналған платформа.',
        task: 'Сатып алуларды, қолжетімділікті және CRM процестерін бір өнімге біріктіретін B2B платформаны нөлден әзірлеу.',
        features: [
          'Сатып алуларды іздеу және деректерді жүктеу.',
          'Аккаунттар, рөлдер және қолжетімділікті бөлу.',
          'CRM процестері және Telegram хабарламалары.',
          'Өнімді іске қосу және қолдау.',
        ],
      },
      en: {
        category: 'B2B · Tenders & CRM',
        summary:
          'A platform for finding procurement opportunities and organising tender workflows.',
        task: 'Build a B2B platform from scratch, bringing procurement, access management and CRM workflows into one product.',
        features: [
          'Procurement search and data ingestion.',
          'Accounts, roles and access separation.',
          'CRM workflows and Telegram notifications.',
          'Product launch and ongoing support.',
        ],
      },
    },
  },
  {
    slug: 'nur-mubarak',
    name: 'Nur-Mubarak Systems',
    category: 'education',
    service: 'web',
    image: 'nur-mubarak',
    stack: ['PHP', 'Composer', 'Git'],
    links: [
      { url: 'https://journal.nmu.edu.kz/', label: 'journal' },
      { url: 'https://queue.nmu.edu.kz/', label: 'queue' },
    ],
    copy: {
      ru: {
        category: 'Образование · Университетские системы',
        summary:
          'Публичные и внутренние веб-системы университета: разработка, эксплуатация и поддержка.',
        task: 'Развивать и поддерживать университетские веб-системы, сохраняя их доступность и удобство в повседневной работе.',
        features: [
          'Разработка и автоматизация PHP-приложений.',
          'Публичные системы: журнал и очередь приёмной комиссии.',
          'Развёртывание, настройка серверов и SSL/TLS.',
          'Диагностика, исправление ошибок и сопровождение.',
        ],
        note: 'Научный журнал также представлен отдельным кейсом в этой же группе университетских работ.',
      },
      kk: {
        category: 'Білім беру · Университет жүйелері',
        summary:
          'Университеттің ашық және ішкі веб-жүйелері: әзірлеу, пайдалану және қолдау.',
        task: 'Университеттің веб-жүйелерін дамытып, күнделікті жұмыста қолжетімділігі мен ыңғайлылығын қамтамасыз ету.',
        features: [
          'PHP қосымшаларын әзірлеу және автоматтандыру.',
          'Ашық жүйелер: журнал және қабылдау комиссиясының кезегі.',
          'Орналастыру, сервер баптауы және SSL/TLS.',
          'Диагностика, қателерді түзету және қолдау.',
        ],
        note: 'Ғылыми журнал осы университеттік жұмыстар тобының ішінде жеке жоба ретінде де көрсетілген.',
      },
      en: {
        category: 'Education · University systems',
        summary:
          'Public and internal university web systems: development, operation and support.',
        task: 'Develop and maintain university web systems, keeping them accessible and useful in everyday operation.',
        features: [
          'PHP application development and automation.',
          'Public systems: the journal and admissions queue.',
          'Deployment, server configuration and SSL/TLS.',
          'Diagnostics, fixes and ongoing maintenance.',
        ],
        note: 'The scientific journal is also featured separately within the same group of university work.',
      },
    },
  },
  {
    slug: 'rizko-ai',
    name: 'Rizko.ai',
    category: 'ai',
    service: 'ai',
    cover: 'ai',
    stack: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Gemini',
      'Claude',
      'Apify',
    ],
    links: [
      { url: 'https://github.com/to1enbekov/viraltrend-ai', label: 'code' },
    ],
    copy: {
      ru: {
        category: 'AI · Анализ данных и трендов',
        summary:
          'AI-продукт для анализа трендов с обработкой внешних данных и LLM-процессами.',
        task: 'Собрать продукт для AI-анализа трендов и контента, связав интерфейс, обработку данных и структурированные LLM-процессы.',
        features: [
          'Интерфейс на React / TypeScript.',
          'Backend на Python / FastAPI и PostgreSQL.',
          'Получение внешних данных через Apify.',
          'Структурированные Gemini / Claude процессы анализа и оценки.',
        ],
        note: 'viraltrend-ai — связанный публичный пример кода, а не production-исходники Rizko.ai.',
      },
      kk: {
        category: 'AI · Деректер мен трендтерді талдау',
        summary:
          'Сыртқы деректерді өңдейтін және LLM процестерін қолданатын трендтерді талдау өнімі.',
        task: 'Интерфейсті, деректерді өңдеуді және құрылымдалған LLM процестерін біріктіріп, трендтер мен контентті AI арқылы талдайтын өнім жасау.',
        features: [
          'React / TypeScript интерфейсі.',
          'Python / FastAPI backend және PostgreSQL.',
          'Apify арқылы сыртқы деректерді алу.',
          'Талдау мен бағалауға арналған құрылымдалған Gemini / Claude процестері.',
        ],
        note: 'viraltrend-ai — байланысты ашық код үлгісі, Rizko.ai өнімінің production бастапқы коды емес.',
      },
      en: {
        category: 'AI · Data & trend analysis',
        summary:
          'An AI product for trend analysis, connecting external data and LLM workflows.',
        task: 'Build an AI trend and content analysis product, connecting an interface, data processing and structured LLM workflows.',
        features: [
          'React / TypeScript interface.',
          'Python / FastAPI backend and PostgreSQL.',
          'External data ingestion through Apify.',
          'Structured Gemini / Claude workflows for analysis and scoring.',
        ],
        note: 'viraltrend-ai is a related public code sample, not the production source of Rizko.ai.',
      },
    },
  },
  {
    slug: 'satbayev-school',
    name: 'Satbayev School',
    category: 'education',
    service: 'web',
    image: 'satbayev-school',
    stack: [],
    links: [
      { url: 'https://satbayevschool.edu.kz/', label: 'view' },
      {
        url: 'https://satbayevschool.edu.kz/index.html#history',
        label: 'history',
      },
    ],
    copy: {
      ru: {
        category: 'Образование · Сайт школы-лицея',
        summary:
          'Публичный сайт школы: история, новости и образовательная информация в одном месте.',
        task: 'Представить школу-лицей в цифровой среде и сделать публичную информацию доступной для учеников, родителей и посетителей.',
        features: [
          'Информация о школе и её истории.',
          'Новости и объявления.',
          'Разделы администрации и образовательной работы.',
          'Навигация по публичным материалам школы.',
        ],
      },
      kk: {
        category: 'Білім беру · Мектеп-лицей сайты',
        summary:
          'Мектептің ашық сайты: тарих, жаңалықтар және білім беру ақпараты бір жерде.',
        task: 'Мектеп-лицейді цифрлық ортада таныстырып, ашық ақпаратты оқушыларға, ата-аналарға және келушілерге қолжетімді ету.',
        features: [
          'Мектеп және оның тарихы туралы ақпарат.',
          'Жаңалықтар мен хабарландырулар.',
          'Әкімшілік және білім беру бөлімдері.',
          'Мектептің ашық материалдары бойынша навигация.',
        ],
      },
      en: {
        category: 'Education · School website',
        summary:
          'A public school website: history, news and education information in one place.',
        task: 'Present the school online and make public information accessible to students, parents and visitors.',
        features: [
          'School information and history.',
          'News and announcements.',
          'Administration and education sections.',
          'Navigation through the school’s public materials.',
        ],
      },
    },
  },
  {
    slug: 'alatau-bot',
    name: 'Alatau Bot',
    category: 'ai',
    service: 'ai',
    cover: 'mountains',
    stack: ['Telegram'],
    links: [{ url: 'https://t.me/aalatau_bot', label: 'bot' }],
    copy: {
      ru: {
        category: 'Telegram · Горный туризм',
        summary:
          'Цифровой инструмент поддержки безопасности и координации в горном туризме.',
        task: 'Помочь людям удобнее и спокойнее планировать и совершать походы через привычный Telegram-канал.',
        features: [
          'Telegram-бот для задач горного туризма.',
          'Цифровая поддержка безопасности и координации.',
        ],
        note: 'Бот — вспомогательный инструмент. Он не гарантирует безопасность и не заменяет экстренные службы.',
      },
      kk: {
        category: 'Telegram · Тау туризмі',
        summary:
          'Тау туризміндегі қауіпсіздік пен үйлестіруге көмектесетін цифрлық құрал.',
        task: 'Адамдарға үйреншікті Telegram арнасы арқылы жорықтарды ыңғайлы әрі сенімді жоспарлауға және өткізуге көмектесу.',
        features: [
          'Тау туризміне арналған Telegram-бот.',
          'Қауіпсіздік пен үйлестіруге цифрлық қолдау.',
        ],
        note: 'Бот — көмекші құрал. Ол қауіпсіздікке кепілдік бермейді және төтенше қызметтерді алмастырмайды.',
      },
      en: {
        category: 'Telegram · Mountain tourism',
        summary:
          'A digital tool supporting safety and coordination in mountain tourism.',
        task: 'Help people plan and undertake hikes more comfortably through a familiar Telegram channel.',
        features: [
          'A Telegram bot for mountain tourism.',
          'Digital support for safety and coordination.',
        ],
        note: 'The bot is a supporting tool. It does not guarantee safety or replace emergency services.',
      },
    },
  },
  {
    slug: 'islamic-research-journal',
    name: 'Islamic Research Journal',
    category: 'education',
    service: 'web',
    image: 'islamic-research-journal',
    stack: [],
    links: [{ url: 'https://journal.nmu.edu.kz/index.php/ris', label: 'view' }],
    copy: {
      ru: {
        category: 'Образование · Научный журнал',
        summary:
          'Платформа журнала «Исламские исследования»: публикации, выпуски и материалы для авторов.',
        task: 'Обеспечить публичный цифровой формат научного журнала с понятной навигацией по публикациям и информации для авторов.',
        features: [
          'Страницы научного журнала и публикаций.',
          'Текущий выпуск и навигация по материалам.',
          'Информация для авторов и редакционные правила.',
          'Публичная навигация на нескольких языках.',
        ],
        note: 'Часть университетских работ Nur-Mubarak Systems; отдельный spotlight проекта, не дополнительный клиент.',
      },
      kk: {
        category: 'Білім беру · Ғылыми журнал',
        summary:
          '«Исламдық зерттеулер» журналының платформасы: жарияланымдар, шығарылымдар және авторларға арналған материалдар.',
        task: 'Ғылыми журналды жарияланымдар мен авторларға арналған ақпарат бойынша түсінікті навигациясы бар ашық цифрлық форматта ұсыну.',
        features: [
          'Ғылыми журнал мен жарияланымдар беттері.',
          'Ағымдағы шығарылым және материалдар навигациясы.',
          'Авторларға арналған ақпарат және редакциялық ережелер.',
          'Бірнеше тілдегі ашық навигация.',
        ],
        note: 'Nur-Mubarak Systems университеттік жұмыстарының бөлігі; жеке көрсетілген жоба, қосымша клиент емес.',
      },
      en: {
        category: 'Education · Scientific journal',
        summary:
          'The Islamic Research journal platform: publications, issues and information for authors.',
        task: 'Provide a public digital home for a scientific journal with clear navigation through publications and author information.',
        features: [
          'Journal and publication pages.',
          'The current issue and material navigation.',
          'Author information and editorial policies.',
          'Public navigation in several languages.',
        ],
        note: 'Part of the Nur-Mubarak Systems university work; a separate project spotlight, not an additional client.',
      },
    },
  },
];
