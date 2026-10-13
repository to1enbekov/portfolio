import { contactTranslations } from './contact';
import type { Locale, Localized } from './locales';

const ru = {
  meta: {
    title: 'NS Dev — сайты, приложения, автоматизация и AI',
    description:
      'IT-команда NS Dev. Создаём сайты, бизнес-платформы, мобильные приложения, Telegram-ботов и AI-решения. От идеи до запуска и поддержки.',
  },
  nav: {
    services: 'Услуги',
    projects: 'Проекты',
    process: 'Как работаем',
    contact: 'Контакты',
    discuss: 'Обсудить проект',
    open: 'Открыть меню',
    close: 'Закрыть меню',
    label: 'Основная навигация',
    languages: 'Выбрать язык',
    skip: 'Перейти к содержимому',
  },
  hero: {
    eyebrow: 'IT-команда. Полный цикл разработки.',
    line1: 'Создаём цифровые',
    line2: 'продукты, которые',
    line3: 'работают.',
    description:
      'Сайты, приложения, автоматизация и AI-решения — от идеи до запуска и поддержки.',
    work: 'Смотреть работы',
    note: 'Продумано. Разработано. Запущено.',
    visual: 'От идеи',
    visualEnd: 'до работающего продукта',
    visualLabel: 'Дизайн · Разработка · Запуск',
    scroll: 'Листайте дальше',
    disciplines: 'Веб / Мобильные продукты / Автоматизация / AI',
  },
  services: {
    eyebrow: '01 / Что мы делаем',
    title: 'Технологии под вашу задачу.',
    description:
      'Новый продукт, развитие существующего или автоматизация рутины. Начинаем с задачи и выбираем подходящее решение.',
    cta: 'Обсудить услугу',
  },
  work: {
    eyebrow: '02 / Наша работа',
    title: 'Идеи становятся продуктами.',
    description:
      'Коммерческие платформы, образовательные системы и цифровые инструменты. От разработки до сопровождения.',
    all: 'Все проекты',
    featured: 'Избранные работы',
    case: 'Подробнее о проекте',
    count: 'Показано проектов:',
    filter: 'Фильтр проектов',
    related: 'Другие проекты',
    sample: 'Ещё один публичный пример: Kitapkhana',
    sampleDescription:
      'Двуязычная цифровая библиотека. React, Express, PostgreSQL / Supabase, авторизация и работа с файлами.',
    cover: 'Фирменная обложка проекта',
    screenshot: 'Публичный интерфейс',
    view: 'Открыть сайт',
    app: 'App Store',
    code: 'Связанный пример кода',
    journal: 'Система журнала',
    queue: 'Очередь приёмной комиссии',
    bot: 'Открыть Telegram-бота',
    history: 'История школы',
  },
  why: {
    eyebrow: '03 / Почему NS Dev',
    title: 'Одна задача.\nЦелый цикл.',
    description:
      'От первого разговора до жизни продукта после запуска. Держим в фокусе то, что важно вашему бизнесу.',
    items: [
      {
        title: 'Понятная коммуникация',
        text: 'Обсуждаем цели, показываем промежуточный результат и объясняем решения без лишних терминов.',
      },
      {
        title: 'Решение под ваш процесс',
        text: 'Проектируем продукт вокруг реальных задач, пользователей и существующих систем.',
      },
      {
        title: 'Ответственность за запуск',
        text: 'Продумываем интеграции, проверяем сценарии и готовим продукт к эксплуатации.',
      },
      {
        title: 'Поддержка после релиза',
        text: 'Помогаем развивать функциональность, разбирать проблемы и поддерживать стабильную работу.',
      },
    ],
  },
  process: {
    eyebrow: '04 / Как работаем',
    title: 'Прозрачно.\nНа каждом этапе.',
    description:
      'Сначала понимаем задачу. Затем согласуем объём, двигаемся по этапам и держим вас в курсе.',
    steps: [
      {
        title: 'Обсуждение',
        text: 'Знакомимся с идеей, задачами бизнеса и ожиданиями от продукта.',
      },
      {
        title: 'Анализ и предложение',
        text: 'Определяем объём, приоритеты, подход, бюджет и ориентиры по срокам.',
      },
      {
        title: 'Дизайн и разработка',
        text: 'Проектируем интерфейс и собираем продукт, показывая промежуточные результаты.',
      },
      {
        title: 'Тестирование и запуск',
        text: 'Проверяем ключевые сценарии и готовим релиз в согласованной среде.',
      },
      {
        title: 'Поддержка',
        text: 'Обсуждаем сопровождение, обновления и следующие шаги развития.',
      },
    ],
  },
  faq: {
    eyebrow: '05 / Вопросы и ответы',
    title: 'До того, как начнём.',
    items: [
      {
        q: 'Сколько стоит разработка?',
        a: 'Стоимость зависит от объёма, сложности и интеграций. После обсуждения задачи готовим предложение с понятным составом работ. Фиксированную цену без понимания проекта не называем.',
      },
      {
        q: 'Какие сроки нужны для проекта?',
        a: 'Сроки зависят от функций, готовности материалов и этапов согласования. После анализа дадим оценку и предложим план. Если нужен быстрый старт, обсудим первую полезную версию.',
      },
      {
        q: 'Можно доработать уже существующий сайт?',
        a: 'Да. Сначала изучаем текущий продукт и ограничения, затем предлагаем доработку, редизайн или постепенное обновление с сохранением нужного контента.',
      },
      {
        q: 'Вы подключаете внешние системы?',
        a: 'Да, работаем с API, платёжными сервисами и другими интеграциями. Возможность и объём подключения уточняем по документации и доступам конкретного сервиса.',
      },
      {
        q: 'Как я буду видеть ход работы?',
        a: 'Согласуем этапы и формат связи. Показываем промежуточный результат, собираем обратную связь и обсуждаем изменения до перехода к следующему этапу.',
      },
      {
        q: 'Есть поддержка после запуска?',
        a: 'Да. Объём сопровождения, мониторинга, обновлений и развития продукта согласуем отдельно под ваши потребности.',
      },
    ],
  },
  contact: contactTranslations.ru,
  case: {
    back: 'К проектам',
    task: 'Задача',
    approach: 'Что реализовано',
    stack: 'Подтверждённые технологии',
    links: 'Посмотреть продукт',
    similar: 'Обсудить похожий проект',
    cta: 'Есть похожая задача?',
    ctaText:
      'Расскажите о вашей идее — обсудим, как превратить её в работающий продукт.',
    next: 'Следующий проект',
    label: 'Проект NS Dev',
    captured: 'Скриншот публичной страницы. Интерфейс продукта может меняться.',
    branded: 'Графическая обложка; не скриншот интерфейса.',
  },
  privacy: {
    title: 'Как обрабатываются данные',
    intro: 'Коротко и понятно о форме заявки на сайте NS Dev.',
    blocks: [
      {
        title: 'Что вы указываете',
        text: 'Имя, направление услуги и описание задачи. Бюджет, сроки и контакт для ответа — необязательные поля. Пожалуйста, не отправляйте пароли, ключи доступа и чувствительные данные.',
      },
      {
        title: 'Что делает сайт',
        text: 'Сайт собирает сообщение только в памяти текущей страницы. Он не сохраняет содержимое формы в базе данных, localStorage, аналитике или логах приложения. После закрытия или перезагрузки страницы оно исчезает.',
      },
      {
        title: 'Как передаётся сообщение',
        text: 'Кнопка «Продолжить в WhatsApp» открывает WhatsApp с подготовленным текстом. Текст передаётся сервису WhatsApp в параметре ссылки и может остаться в истории открытого адреса. Сообщение команде отправляется только после того, как вы нажмёте «Отправить» в WhatsApp. Открытие ссылки само по себе не означает отправку.',
      },
      {
        title: 'После отправки',
        text: 'Отправленная переписка обрабатывается в WhatsApp по правилам этого сервиса. NS Dev использует ваше сообщение для обсуждения проекта и ответа на запрос. По вопросам об отправленной информации свяжитесь с нами по указанному номеру WhatsApp.',
      },
      {
        title: 'Технические данные',
        text: 'В этой версии нет рекламных и аналитических трекеров. Статический хостинг может обрабатывать технические данные запросов по собственным правилам; форма не отправляет ему ваше содержимое.',
      },
    ],
    whatsappPolicy: 'Политика конфиденциальности WhatsApp',
  },
  footer: {
    tagline: 'От идеи до работающего продукта.',
    privacy: 'Обработка данных',
    rights: 'IT-команда NS Dev',
    top: 'Наверх',
  },
  notFound: {
    title: 'Этой страницы здесь нет.',
    text: 'Возможно, адрес изменился. Вернитесь на главную или посмотрите наши проекты.',
    home: 'На главную',
    meta: 'Страница не найдена — NS Dev',
  },
  categories: {
    all: 'Все',
    commerce: 'Коммерция',
    business: 'Бизнес-системы',
    education: 'Образование',
    ai: 'AI и боты',
  },
};
type Translation = typeof ru;

const kk: Translation = {
  meta: {
    title: 'NS Dev — сайттар, қосымшалар, автоматтандыру және AI',
    description:
      'NS Dev IT-командасы. Сайттар, бизнес-платформалар, мобильді қосымшалар, Telegram-боттар және AI шешімдерін жасаймыз. Идеядан іске қосуға және қолдауға дейін.',
  },
  nav: {
    services: 'Қызметтер',
    projects: 'Жобалар',
    process: 'Жұмыс барысы',
    contact: 'Байланыс',
    discuss: 'Жобаны талқылау',
    open: 'Мәзірді ашу',
    close: 'Мәзірді жабу',
    label: 'Негізгі навигация',
    languages: 'Тілді таңдау',
    skip: 'Мазмұнға өту',
  },
  hero: {
    eyebrow: 'IT-команда. Әзірлеудің толық циклі.',
    line1: 'Нәтиже беретін',
    line2: 'цифрлық өнімдер',
    line3: 'жасаймыз.',
    description:
      'Сайттар, қосымшалар, автоматтандыру және AI шешімдері — идеядан іске қосуға және қолдауға дейін.',
    work: 'Жобаларды көру',
    note: 'Ойластырылды. Жасалды. Іске қосылды.',
    visual: 'Идеядан',
    visualEnd: 'жұмыс істейтін өнімге дейін',
    visualLabel: 'Дизайн · Әзірлеу · Іске қосу',
    scroll: 'Төмен жылжыңыз',
    disciplines: 'Веб / Мобильді өнімдер / Автоматтандыру / AI',
  },
  services: {
    eyebrow: '01 / Қызметтеріміз',
    title: 'Міндетіңізге сай технология.',
    description:
      'Жаңа өнім, бар жүйені дамыту немесе күнделікті жұмысты автоматтандыру. Алдымен міндетті түсініп, тиімді шешімді таңдаймыз.',
    cta: 'Қызметті талқылау',
  },
  work: {
    eyebrow: '02 / Біздің жұмысымыз',
    title: 'Идеядан нақты өнімге.',
    description:
      'Коммерциялық платформалар, білім беру жүйелері және цифрлық құралдар. Әзірлеуден қолдауға дейін.',
    all: 'Барлық жобалар',
    featured: 'Таңдаулы жобалар',
    case: 'Жоба туралы толығырақ',
    count: 'Көрсетілген жобалар:',
    filter: 'Жобаларды сүзу',
    related: 'Басқа жобалар',
    sample: 'Тағы бір ашық мысал: Kitapkhana',
    sampleDescription:
      'Екітілді цифрлық кітапхана. React, Express, PostgreSQL / Supabase, тіркелу және файлдармен жұмыс.',
    cover: 'Жобаның фирмалық мұқабасы',
    screenshot: 'Жалпыға қолжетімді интерфейс',
    view: 'Сайтты ашу',
    app: 'App Store',
    code: 'Байланысты код үлгісі',
    journal: 'Журнал жүйесі',
    queue: 'Қабылдау комиссиясының кезегі',
    bot: 'Telegram-ботты ашу',
    history: 'Мектеп тарихы',
  },
  why: {
    eyebrow: '03 / Неліктен NS Dev',
    title: 'Бір міндет.\nТолық цикл.',
    description:
      'Алғашқы әңгімеден өнімді іске қосқаннан кейінгі жұмысына дейін. Бизнесіңіз үшін маңызды мәселелерге көңіл бөлеміз.',
    items: [
      {
        title: 'Түсінікті байланыс',
        text: 'Мақсаттарды талқылаймыз, аралық нәтижені көрсетеміз және шешімдерді қарапайым тілмен түсіндіреміз.',
      },
      {
        title: 'Жұмысыңызға сай шешім',
        text: 'Өнімді нақты міндеттерге, пайдаланушыларға және қолданыстағы жүйелерге сай жобалаймыз.',
      },
      {
        title: 'Іске қосуға жауапкершілік',
        text: 'Интеграцияларды ойластырамыз, негізгі сценарийлерді тексеріп, өнімді пайдалануға дайындаймыз.',
      },
      {
        title: 'Іске қосқаннан кейінгі қолдау',
        text: 'Функцияларды дамытуға, мәселелерді шешуге және тұрақты жұмысты қамтамасыз етуге көмектесеміз.',
      },
    ],
  },
  process: {
    eyebrow: '04 / Жұмыс барысы',
    title: 'Әр кезеңі\nтүсінікті.',
    description:
      'Алдымен міндетті түсінеміз. Содан кейін жұмыс көлемін келісіп, кезең-кезеңімен іске асырамыз және хабардар етіп отырамыз.',
    steps: [
      {
        title: 'Талқылау',
        text: 'Идеямен, бизнес міндеттерімен және өнімнен күткен нәтижемен танысамыз.',
      },
      {
        title: 'Талдау және ұсыныс',
        text: 'Жұмыс көлемін, басымдықтарды, тәсілді, бюджетті және мерзім бағдарын анықтаймыз.',
      },
      {
        title: 'Дизайн және әзірлеу',
        text: 'Интерфейсті жобалап, өнімді жасаймыз және аралық нәтижелерді көрсетеміз.',
      },
      {
        title: 'Тестілеу және іске қосу',
        text: 'Негізгі сценарийлерді тексеріп, келісілген ортада іске қосуға дайындаймыз.',
      },
      {
        title: 'Қолдау',
        text: 'Сүйемелдеуді, жаңартуларды және дамудың келесі қадамдарын талқылаймыз.',
      },
    ],
  },
  faq: {
    eyebrow: '05 / Сұрақтар мен жауаптар',
    title: 'Бастамас бұрын.',
    items: [
      {
        q: 'Әзірлеу қанша тұрады?',
        a: 'Баға жұмыс көлеміне, күрделілігіне және интеграцияларға байланысты. Міндетті талқылағаннан кейін жұмыс құрамын нақты көрсететін ұсыныс дайындаймыз. Жобаны түсінбей тұрып бекітілген баға айтпаймыз.',
      },
      {
        q: 'Жобаға қанша уақыт керек?',
        a: 'Мерзім функцияларға, материалдардың дайындығына және келісу кезеңдеріне байланысты. Талдаудан кейін бағалау мен жоспар ұсынамыз. Жылдам бастау қажет болса, алғашқы пайдалы нұсқаны талқылаймыз.',
      },
      {
        q: 'Бар сайтты жетілдіруге бола ма?',
        a: 'Иә. Алдымен қазіргі өнім мен шектеулерін зерттейміз. Содан кейін қажетті мазмұнды сақтай отырып, жетілдіруді, редизайнды немесе кезеңдік жаңартуды ұсынамыз.',
      },
      {
        q: 'Сыртқы жүйелерді қосасыздар ма?',
        a: 'Иә, API, төлем сервистері және басқа интеграциялармен жұмыс істейміз. Қосу мүмкіндігі мен көлемін нақты сервистің құжаттамасы және қолжетімділігі бойынша анықтаймыз.',
      },
      {
        q: 'Жұмыс барысын қалай көремін?',
        a: 'Кезеңдер мен байланыс форматын келісеміз. Аралық нәтижені көрсетіп, пікіріңізді жинаймыз және келесі кезеңге өтпес бұрын өзгерістерді талқылаймыз.',
      },
      {
        q: 'Іске қосқаннан кейін қолдау бар ма?',
        a: 'Иә. Сүйемелдеу, мониторинг, жаңартулар және өнімді дамыту көлемін қажеттілігіңізге сай бөлек келісеміз.',
      },
    ],
  },
  contact: contactTranslations.kk,
  case: {
    back: 'Жобаларға оралу',
    task: 'Міндет',
    approach: 'Іске асырылған шешімдер',
    stack: 'Расталған технологиялар',
    links: 'Өнімді көру',
    similar: 'Ұқсас жобаны талқылау',
    cta: 'Ұқсас міндетіңіз бар ма?',
    ctaText:
      'Идеяңызды айтыңыз — оны жұмыс істейтін өнімге айналдыру жолын талқылаймыз.',
    next: 'Келесі жоба',
    label: 'NS Dev жобасы',
    captured:
      'Жалпыға қолжетімді беттің скриншоты. Өнім интерфейсі өзгеруі мүмкін.',
    branded: 'Графикалық мұқаба; интерфейс скриншоты емес.',
  },
  privacy: {
    title: 'Деректер қалай өңделеді',
    intro: 'NS Dev сайтындағы өтінім нысаны туралы қысқаша ақпарат.',
    blocks: [
      {
        title: 'Қандай деректерді көрсетесіз',
        text: 'Атыңыз, қызмет бағыты және міндет сипаттамасы. Бюджет, мерзім және жауап беру үшін байланыс — міндетті емес. Құпиясөздер, кіру кілттері және сезімтал деректерді жібермеңіз.',
      },
      {
        title: 'Сайт не істейді',
        text: 'Сайт хабарламаны тек ағымдағы беттің жадында құрастырады. Нысан мазмұнын дерекқорда, localStorage, аналитикада немесе қолданба журналдарында сақтамайды. Бетті жапқанда немесе қайта жүктегенде ақпарат жойылады.',
      },
      {
        title: 'Хабарлама қалай беріледі',
        text: '«WhatsApp-та жалғастыру» батырмасы дайын мәтінмен WhatsApp ашады. Мәтін WhatsApp сервисіне сілтеме параметрінде беріледі және ашылған мекенжай тарихында қалуы мүмкін. Хабарлама командаға WhatsApp-та «Жіберу» батырмасын басқаннан кейін ғана жіберіледі. Сілтемені ашу хабарламаның жіберілгенін білдірмейді.',
      },
      {
        title: 'Жібергеннен кейін',
        text: 'Жіберілген хат алмасу WhatsApp сервисінің ережелері бойынша өңделеді. NS Dev хабарламаңызды жобаны талқылау және сұрағыңызға жауап беру үшін пайдаланады. Жіберілген ақпарат туралы сұрақтар бойынша көрсетілген WhatsApp нөміріне хабарласыңыз.',
      },
      {
        title: 'Техникалық деректер',
        text: 'Бұл нұсқада жарнамалық және аналитикалық трекерлер жоқ. Статикалық хостинг сұраулардың техникалық деректерін өз ережелерімен өңдеуі мүмкін; нысан сіздің мазмұныңызды оған жібермейді.',
      },
    ],
    whatsappPolicy: 'WhatsApp құпиялылық саясаты',
  },
  footer: {
    tagline: 'Идеядан жұмыс істейтін өнімге дейін.',
    privacy: 'Деректерді өңдеу',
    rights: 'NS Dev IT-командасы',
    top: 'Жоғары',
  },
  notFound: {
    title: 'Бұл бет табылмады.',
    text: 'Мекенжай өзгерген болуы мүмкін. Басты бетке оралыңыз немесе жобаларымызды қараңыз.',
    home: 'Басты бетке',
    meta: 'Бет табылмады — NS Dev',
  },
  categories: {
    all: 'Барлығы',
    commerce: 'Коммерция',
    business: 'Бизнес-жүйелер',
    education: 'Білім беру',
    ai: 'AI және боттар',
  },
};

const en: Translation = {
  meta: {
    title: 'NS Dev — websites, apps, automation & AI',
    description:
      'NS Dev IT team. Websites, business platforms, mobile apps, Telegram bots and AI solutions. From the first idea to launch and ongoing support.',
  },
  nav: {
    services: 'Services',
    projects: 'Projects',
    process: 'Our process',
    contact: 'Contact',
    discuss: 'Discuss a project',
    open: 'Open menu',
    close: 'Close menu',
    label: 'Main navigation',
    languages: 'Choose language',
    skip: 'Skip to content',
  },
  hero: {
    eyebrow: 'IT team. Full-cycle development.',
    line1: 'Digital products,',
    line2: 'built to',
    line3: 'work.',
    description:
      'Websites, apps, automation and AI solutions — from the first idea to launch and ongoing support.',
    work: 'Explore our work',
    note: 'Considered. Developed. Launched.',
    visual: 'From an idea',
    visualEnd: 'to a working product',
    visualLabel: 'Design · Development · Launch',
    scroll: 'Keep exploring',
    disciplines: 'Web / Mobile / Automation / AI',
  },
  services: {
    eyebrow: '01 / What we build',
    title: 'Technology for your task.',
    description:
      'A new product, an existing system to improve, or a process to automate. We start with the task and find the right approach.',
    cta: 'Discuss this service',
  },
  work: {
    eyebrow: '02 / Our work',
    title: 'Ideas become products.',
    description:
      'Commercial platforms, education systems and digital tools. From development to ongoing support.',
    all: 'All projects',
    featured: 'Selected work',
    case: 'Explore the project',
    count: 'Projects shown:',
    filter: 'Filter projects',
    related: 'More projects',
    sample: 'Another public sample: Kitapkhana',
    sampleDescription:
      'A bilingual digital library. React, Express, PostgreSQL / Supabase, authentication and file workflows.',
    cover: 'Branded project cover',
    screenshot: 'Public interface',
    view: 'Visit website',
    app: 'App Store',
    code: 'Related code sample',
    journal: 'Journal system',
    queue: 'Admissions queue',
    bot: 'Open Telegram bot',
    history: 'School history',
  },
  why: {
    eyebrow: '03 / Why NS Dev',
    title: 'One task.\nThe whole cycle.',
    description:
      'From our first conversation to the product’s life after launch. Focused on what matters to your business.',
    items: [
      {
        title: 'Clear communication',
        text: 'We discuss goals, share progress and explain our decisions in plain language.',
      },
      {
        title: 'Built for your process',
        text: 'We design around real tasks, real users and the systems you already use.',
      },
      {
        title: 'Care through launch',
        text: 'We plan integrations, test key journeys and prepare the product for everyday use.',
      },
      {
        title: 'Support after release',
        text: 'We help extend features, resolve issues and keep your product working reliably.',
      },
    ],
  },
  process: {
    eyebrow: '04 / Our process',
    title: 'Clear at\nevery step.',
    description:
      'Understand the task. Agree on scope. Work through the stages and keep you informed.',
    steps: [
      {
        title: 'Conversation',
        text: 'We learn about your idea, business needs and expectations.',
      },
      {
        title: 'Analysis & proposal',
        text: 'We define the scope, priorities, approach, budget and timeline estimates.',
      },
      {
        title: 'Design & development',
        text: 'We design the interface and build the product, sharing progress along the way.',
      },
      {
        title: 'Testing & launch',
        text: 'We check the key journeys and prepare a release in the agreed environment.',
      },
      {
        title: 'Ongoing support',
        text: 'We agree on maintenance, updates and the next steps for the product.',
      },
    ],
  },
  faq: {
    eyebrow: '05 / Questions & answers',
    title: 'Before we begin.',
    items: [
      {
        q: 'How much does development cost?',
        a: 'Cost depends on scope, complexity and integrations. After discussing your task, we prepare a proposal with a clear breakdown of work. We do not quote a fixed price before understanding the project.',
      },
      {
        q: 'How long will the project take?',
        a: 'Timing depends on features, content readiness and review stages. After analysis, we provide an estimate and a plan. For a faster start, we can discuss a useful first version.',
      },
      {
        q: 'Can you improve an existing website?',
        a: 'Yes. We review the product and its constraints, then propose improvements, a redesign or a gradual update while preserving the content you need.',
      },
      {
        q: 'Do you connect external systems?',
        a: 'Yes, we work with APIs, payment services and other integrations. We confirm feasibility and scope against each service’s documentation and available access.',
      },
      {
        q: 'How will I follow progress?',
        a: 'We agree on stages and a communication format. We share intermediate results, collect your feedback and discuss changes before the next stage.',
      },
      {
        q: 'Is support available after launch?',
        a: 'Yes. We agree on maintenance, monitoring, updates and further development to suit your needs.',
      },
    ],
  },
  contact: contactTranslations.en,
  case: {
    back: 'Back to projects',
    task: 'The task',
    approach: 'What we built',
    stack: 'Confirmed technologies',
    links: 'Explore the product',
    similar: 'Discuss a similar project',
    cta: 'Have a similar task?',
    ctaText:
      'Tell us about your idea — we’ll discuss how to turn it into a working product.',
    next: 'Next project',
    label: 'An NS Dev project',
    captured: 'Screenshot of the public page. Product interfaces may change.',
    branded: 'A graphic cover, not a screenshot of the interface.',
  },
  privacy: {
    title: 'How we handle data',
    intro: 'A plain-language explanation of the NS Dev enquiry form.',
    blocks: [
      {
        title: 'What you provide',
        text: 'Your name, service category and a description of the task. Budget, timeline and a reply contact are optional. Please do not send passwords, access keys or sensitive information.',
      },
      {
        title: 'What the site does',
        text: 'The site prepares a message in the current page’s memory only. It does not save form contents in a database, localStorage, analytics or application logs. Closing or reloading the page clears it.',
      },
      {
        title: 'How the message is shared',
        text: '“Continue in WhatsApp” opens WhatsApp with your prepared text. The text is passed to WhatsApp in a link parameter and may remain in the history of that opened address. Your message reaches the team only after you press Send in WhatsApp. Opening the link does not send it.',
      },
      {
        title: 'After you send',
        text: 'Messages are handled in WhatsApp under that service’s rules. NS Dev uses your message to discuss the project and respond to your enquiry. For questions about information you sent, contact us at the WhatsApp number provided.',
      },
      {
        title: 'Technical information',
        text: 'This version has no advertising or analytics trackers. Static hosting may process technical request data under its own rules; the form does not submit your contents to the host.',
      },
    ],
    whatsappPolicy: 'WhatsApp privacy policy',
  },
  footer: {
    tagline: 'From an idea to a working product.',
    privacy: 'Data handling',
    rights: 'NS Dev IT team',
    top: 'Back to top',
  },
  notFound: {
    title: 'This page isn’t here.',
    text: 'The address may have changed. Return to the home page or explore our projects.',
    home: 'Back to home',
    meta: 'Page not found — NS Dev',
  },
  categories: {
    all: 'All',
    commerce: 'Commerce',
    business: 'Business systems',
    education: 'Education',
    ai: 'AI & bots',
  },
};

export const translations: Localized<Translation> = { ru, kk, en };
export const t = (locale: Locale): Translation => translations[locale];
