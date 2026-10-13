import type { Localized } from '../i18n/locales';
export const serviceIds = [
  'web',
  'business',
  'ai',
  'mobile',
  'backend',
  'design',
] as const;
export type ServiceId = (typeof serviceIds)[number];
export interface ServiceCopy {
  title: string;
  text: string;
  deliverables: string[];
}
export interface Service {
  id: ServiceId;
  icon: 'Globe' | 'Workflow' | 'Bot' | 'Smartphone' | 'Layers' | 'PenTool';
  copy: Localized<ServiceCopy>;
}
export const services: Service[] = [
  {
    id: 'web',
    icon: 'Globe',
    copy: {
      ru: {
        title: 'Сайты и веб-приложения',
        text: 'Ваш бизнес в понятном цифровом формате. От первой страницы до полноценного продукта.',
        deliverables: [
          'Лендинги и корпоративные сайты',
          'Интернет-магазины',
          'Образовательные платформы',
          'Клиентские кабинеты',
        ],
      },
      kk: {
        title: 'Сайттар мен веб-қосымшалар',
        text: 'Бизнесіңізге түсінікті цифрлық орта. Алғашқы беттен толыққанды өнімге дейін.',
        deliverables: [
          'Лендингтер мен корпоративтік сайттар',
          'Интернет-дүкендер',
          'Білім беру платформалары',
          'Жеке кабинеттер',
        ],
      },
      en: {
        title: 'Websites & web apps',
        text: 'A clear digital home for your business. From a first page to a complete product.',
        deliverables: [
          'Landing pages & company websites',
          'Online stores',
          'Education platforms',
          'Customer portals',
        ],
      },
    },
  },
  {
    id: 'business',
    icon: 'Workflow',
    copy: {
      ru: {
        title: 'Бизнес и автоматизация',
        text: 'Меньше ручной работы, больше порядка в процессах. Системы, которые подстраиваются под вашу работу.',
        deliverables: [
          'CRM и внутренние системы',
          'Административные панели',
          'Автоматизация процессов',
          'Индивидуальные платформы',
        ],
      },
      kk: {
        title: 'Бизнес және автоматтандыру',
        text: 'Қол еңбегін азайтып, процестерді реттейміз. Жұмысыңызға бейімделген жүйелер жасаймыз.',
        deliverables: [
          'CRM және ішкі жүйелер',
          'Басқару панельдері',
          'Процестерді автоматтандыру',
          'Арнайы платформалар',
        ],
      },
      en: {
        title: 'Business & automation',
        text: 'Less manual work, more clarity in your processes. Systems that fit the way you work.',
        deliverables: [
          'CRM & internal systems',
          'Admin dashboards',
          'Process automation',
          'Custom platforms',
        ],
      },
    },
  },
  {
    id: 'ai',
    icon: 'Bot',
    copy: {
      ru: {
        title: 'Telegram-боты и AI',
        text: 'Удобные инструменты в привычном канале. Помогаем работать с информацией и автоматизировать общение.',
        deliverables: [
          'Telegram-решения',
          'AI-ассистенты',
          'LLM / RAG интеграции',
          'Интеллектуальная обработка данных',
        ],
      },
      kk: {
        title: 'Telegram-боттар және AI',
        text: 'Үйреншікті арнадағы ыңғайлы құралдар. Ақпаратпен жұмыс істеуге және байланысты автоматтандыруға көмектесеміз.',
        deliverables: [
          'Telegram шешімдері',
          'AI көмекшілері',
          'LLM / RAG интеграциялары',
          'Деректерді интеллектуалды өңдеу',
        ],
      },
      en: {
        title: 'Telegram bots & AI',
        text: 'Useful tools in a familiar channel. Make information easier to work with and communication easier to manage.',
        deliverables: [
          'Telegram solutions',
          'AI assistants',
          'LLM / RAG integrations',
          'Intelligent data processing',
        ],
      },
    },
  },
  {
    id: 'mobile',
    icon: 'Smartphone',
    copy: {
      ru: {
        title: 'Мобильные продукты',
        text: 'Ваш сервис всегда под рукой. Проектируем мобильный опыт и сопровождаем выпуск приложения.',
        deliverables: [
          'iOS-приложения',
          'Мобильные интерфейсы',
          'Интеграция с API',
          'Публикация и сопровождение',
        ],
      },
      kk: {
        title: 'Мобильді өнімдер',
        text: 'Сервисіңіз әрдайым қолжетімді. Мобильді тәжірибені жобалап, қосымшаны жариялауға көмектесеміз.',
        deliverables: [
          'iOS қосымшалары',
          'Мобильді интерфейстер',
          'API интеграциясы',
          'Жариялау және қолдау',
        ],
      },
      en: {
        title: 'Mobile products',
        text: 'Your service, close at hand. We design the mobile experience and support the app’s release.',
        deliverables: [
          'iOS apps',
          'Mobile interfaces',
          'API integration',
          'Publishing & maintenance',
        ],
      },
    },
  },
  {
    id: 'backend',
    icon: 'Layers',
    copy: {
      ru: {
        title: 'Backend и интеграции',
        text: 'Продуманная основа продукта. Соединяем данные, бизнес-логику и внешние сервисы.',
        deliverables: [
          'Серверная архитектура',
          'API и базы данных',
          'Платёжные интеграции',
          'Подключение внешних сервисов',
        ],
      },
      kk: {
        title: 'Backend және интеграциялар',
        text: 'Өнімнің ойластырылған негізі. Деректерді, бизнес логиканы және сыртқы сервистерді біріктіреміз.',
        deliverables: [
          'Серверлік архитектура',
          'API және дерекқорлар',
          'Төлем интеграциялары',
          'Сыртқы сервистерді қосу',
        ],
      },
      en: {
        title: 'Backend & integrations',
        text: 'A considered foundation for your product. Connecting data, business logic and external services.',
        deliverables: [
          'Server architecture',
          'APIs & databases',
          'Payment integrations',
          'External service connections',
        ],
      },
    },
  },
  {
    id: 'design',
    icon: 'PenTool',
    copy: {
      ru: {
        title: 'Дизайн, запуск и поддержка',
        text: 'От удобного интерфейса до стабильной работы. Заботимся о деталях до и после запуска.',
        deliverables: [
          'UI/UX и прототипы',
          'Дизайн-системы',
          'Подготовка и выпуск релиза',
          'Мониторинг и сопровождение',
        ],
      },
      kk: {
        title: 'Дизайн, іске қосу және қолдау',
        text: 'Ыңғайлы интерфейстен тұрақты жұмысқа дейін. Іске қосуға дейін де, кейін де егжей-тегжейге мән береміз.',
        deliverables: [
          'UI/UX және прототиптер',
          'Дизайн жүйелері',
          'Релизді дайындау және шығару',
          'Мониторинг және сүйемелдеу',
        ],
      },
      en: {
        title: 'Design, launch & support',
        text: 'From a useful interface to reliable operation. Care for the details before and after launch.',
        deliverables: [
          'UI/UX & prototypes',
          'Design systems',
          'Release preparation & launch',
          'Monitoring & maintenance',
        ],
      },
    },
  },
];
