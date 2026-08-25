'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'AZ' | 'ENG' | 'RUS';

export const TRANSLATIONS = {
  AZ: {
    hero: {
      title: "Rahatçılığını tapmağa kömək edirik",
      subtitle: "Axtardığınız mənzili tapmağınıza kömək edirik",
      searchBtn: "Ev axtarıram",
      sellBtn: "Ev satıram",
      location: "Bakı, Azərbaycan",
      whyUsTitle: "Niyə biz?",
      whyUsDesc: "10 illik təcrübəmizlə biz bazardayıq. Artıq 200+ evlərə sahibik. Biz sizin arzularınızdakı evi ən əlverişli şərtlərlə tapmağınız üçün peşəkar xidmət göstəririk.",
    },
    nav: {
      menuTitle: "Menyu",
      links: {
        home: "Ana Səhifə",
        about: "Haqqımızda",
        listings: "Elanlar",
        contact: "Əlaqə",
      },
      phoneLabel: "Əlaqə nömrəsi",
      emailLabel: "Email",
      buyBtn: "Ev axtarıram",
      sellBtn: "Ev satıram",
    },
    listings: {
      title: "Elanlar",
      sortLowest: "Ən aşağı qiymət",
      sortHighest: "Ən yüksək qiymət",
      sortNewest: "Ən yenilər",
      viewMore: "Daha çox",
      viewLess: "Gizlət",
      moreFilters: "Daha çox filtr",
      lessFilters: "Daha az filtr",
      tabs: {
        all: "Hamısı",
        flats: "Mənzillər",
        townhouses: "Taunhauslar",
        penthouses: "Penthauslar",
      },
      searchLabel: "Axtarış",
      searchPlaceholder: "Mənzil adı, ünvan və ya axtarış...",
      roomsLabel: "Otaqlar",
      floorLabel: "mərtəbə",
      propertyTypeTitle: "Əmlakın növü",
      propertyTypes: {
        all: "Hamısı",
        flat: "Mənzil",
        house: "Həyət evi/Bağ evi",
        office: "Ofis",
        garage: "Qaraj",
        commercial: "Obyekt",
      },
      featuresFilter: {
        title: "Xüsusiyyətlər",
        balcony: "Balkon",
        pool: "Hovuz",
        terrace: "Terras",
        seaView: "Dəniz mənzərəsi",
        combi: "Kombi",
        garage: "Qaraj",
      },
      card: {
        badge: "Ətraflı bax",
        features: {
          area: "Sahə",
          renovated: "Təmirli",
          renovation: "Təmir",
          sot: "Sot",
          rooms: "Otaq",
          mortgage: "Ipoteka var",
          noMortgage: "Ipoteka yoxdur",
          location: "Ünvan",
        },
      },
      detail: {
        backToListings: "← Bütün elanlara qayıt",
        contactBtn: "Əlaqə üçün",
        characteristicsTitle: "Xarakteristikalar",
        descriptionTitle: "Ətraflı təsvir",
        galleryTitle: "Foto Qalereya",
        similarTitle: "Oxşar Elanlar",
        lightboxHint: "Şəkilə klikləyərək tam ölçüdə baxın",
        callPhone: "Zəng et",
        sendEmail: "E-poçt yaz",
        labels: {
          location: "Ünvan",
          area: "Ümumi sahə",
          rooms: "Otaq sayı",
          floor: "Mərtəbə",
          renovation: "Təmir vəziyyəti",
          mortgage: "İpoteka",
          landArea: "Torpaq sahəsi",
          propertyType: "Əmlakın növü",
          residenceType: "Kateqoriya",
          yes: "Bəli / Mövcuddur",
          no: "Xeyr",
          renovatedYes: "Əla Təmirli",
          renovatedNo: "Təmirsiz",
        },
      },
    },
    contactPage: {
      title: "Bizimlə Əlaqə",
      subtitle: "Nömrənizi qeyd edin, biz sizinlə əlaqəyə keçək",
      desc: "Ehtiyacınıza ən uyğun mənzili seçmək və ya məsləhətləşmə almaq üçün telefon nömrənizi qeyd edin. Menecerimiz qısa zamanda zəng edəcək.",
      placeholder: "+994 (50) 000-00-00",
      submitBtn: "Zəng sifariş et",
      successTitle: "Müraciətiniz qəbul olundu!",
      successMsg: "Təşəkkür edirik. Yaxın dəqiqələrdə menecerimiz sizinlə əlaqə saxlayacaq.",
      directCall: "Və ya birbaşa zəng edin:",
      supportLabel: "Müştəri dəstəyi 24/7",
    },
    aboutPage: {
      tag: "HAQQIMIZDA • REALTORS CASPIAN",
      heroQuote: "10 illik təcrübə. 200+ eksklüziv obyekt. Mükəmməl həyat tərzi.",
      title: "Bakının və Xəzər sahilinin lüks daşınmaz əmlak brendi",
      subtitle: "Realtors Caspian olaraq 2014-cü ildən bəri müştərilərimizə premium mənzillər, villalar, penthauslar və kommersiya obyektlərinin alqı-satqısında peşəkar vasitəçilik xidməti təklif edirik.",
      expYears: "10+ İl",
      expLabel: "Təcrübə (2014-dən)",
      propertiesCount: "200+",
      propertiesLabel: "Eksklüziv Obyekt",
      satisfactionRate: "99%",
      satisfactionLabel: "Müştəri Məmnuniyyəti",
      guaranteeRate: "100%",
      guaranteeLabel: "Hüquqi Zəmanət",
      filmSubtitle: "Realtors Caspian Film",
      filmTitle: "Lüks Həyat Tərzinizin Ünvanı",
      teamTitle: "Peşəkar Komandamız",
      galleryTitle: "Foto Qalereya",
      gallerySubtitle: "* Tam ölçüdə baxmaq üçün şəkillərə klikləyin",
      pillarsTitle: "Bizim Əsas Dəyərlərimiz",
      pillars: [
        {
          title: "Eksklüziv Portfel",
          desc: "Bazara çıxarılmayan ən prestijli rezidensiyalara və lüks mənzillərə birinci daxil olun.",
        },
        {
          title: "Hüquqi Zəmanət",
          desc: "Hər bir əqdin tam şəffaflıqla və 100% hüquqi təhlükəsizliklə həyata keçirilməsi.",
        },
        {
          title: "Fərdi Yanaşma",
          desc: "Hər müştərinin həyat tərzinə və investisiya məqsədlərinə uyğun fərdiləşdirilmiş seçim.",
        },
      ],
      ctaBtnListings: "Bütün elanlara baxın",
      ctaBtnContact: "Bizimlə əlaqə saxlayın",
    },
    cta: {
      title: "Sualınız var?",
      subtitle: "Peşəkar dəstək almaq üçün sadəcə nömrənizi qeyd edin, ən qısa zamanda sizinlə əlaqə saxlayaq",
      successMsg: "Təşəkkür edirik! Tezliklə sizinlə əlaqə saxlayacağıq.",
    },
    footer: {
      upBtn: "Yuxarı qalx",
      designerLabel: "Saytın dizaynı ",
      designerSuffix: " tərəfindən hazırlanmışdır",
      designerName: "Tərlan Mövlamov",
    },
  },
  ENG: {
    hero: {
      title: "Helping you find your comfort",
      subtitle: "We help you find the apartment you are looking for",
      searchBtn: "Looking for a house",
      sellBtn: "Selling a house",
      location: "Baku, Azerbaijan",
      whyUsTitle: "Why us?",
      whyUsDesc: "With 10 years of experience, we are in the market with 200+ properties. We provide professional real estate service to help you find your dream home under the best terms.",
    },
    nav: {
      menuTitle: "Menu",
      links: {
        home: "Home",
        about: "About",
        listings: "Listings",
        contact: "Contact",
      },
      phoneLabel: "Phone number",
      emailLabel: "Email",
      buyBtn: "Looking for a house",
      sellBtn: "Selling a house",
    },
    listings: {
      title: "Residences",
      sortLowest: "Lowest price",
      sortHighest: "Highest price",
      sortNewest: "Newest",
      viewMore: "View more",
      viewLess: "Collapse",
      moreFilters: "More filters",
      lessFilters: "Less filters",
      tabs: {
        all: "All",
        flats: "Flats",
        townhouses: "Townhouses",
        penthouses: "Penthouses",
      },
      searchLabel: "Search",
      searchPlaceholder: "Property name, location or search...",
      roomsLabel: "Rooms",
      floorLabel: "floor",
      propertyTypeTitle: "Property type",
      propertyTypes: {
        all: "All",
        flat: "Flat",
        house: "Villa / Country house",
        office: "Office",
        garage: "Garage",
        commercial: "Commercial",
      },
      featuresFilter: {
        title: "Features",
        balcony: "Balcony",
        pool: "Pool",
        terrace: "Terrace",
        seaView: "Sea view",
        combi: "Combi",
        garage: "Garage",
      },
      card: {
        badge: "View details",
        features: {
          area: "Area",
          renovated: "Renovated",
          renovation: "Renovation",
          sot: "Land sot",
          rooms: "Rooms",
          mortgage: "Mortgage available",
          noMortgage: "No mortgage",
          location: "Location",
        },
      },
      detail: {
        backToListings: "← Back to all listings",
        contactBtn: "Contact Agent",
        characteristicsTitle: "Characteristics",
        descriptionTitle: "Detailed Description",
        galleryTitle: "Photo Gallery",
        similarTitle: "Similar Listings",
        lightboxHint: "Click on any photo to view full screen",
        callPhone: "Call Phone",
        sendEmail: "Send Email",
        labels: {
          location: "Location",
          area: "Total area",
          rooms: "Rooms",
          floor: "Floor",
          renovation: "Renovation",
          mortgage: "Mortgage",
          landArea: "Land area",
          propertyType: "Property type",
          residenceType: "Category",
          yes: "Available",
          no: "No",
          renovatedYes: "Fully Renovated",
          renovatedNo: "Unrenovated",
        },
      },
    },
    contactPage: {
      title: "Contact Us",
      subtitle: "Leave your number and we will get in touch with you",
      desc: "Enter your phone number to receive a consultation or pick the property that best suits your needs. Our manager will call you shortly.",
      placeholder: "+994 (50) 000-00-00",
      submitBtn: "Request a Call",
      successTitle: "Application Received!",
      successMsg: "Thank you. Our manager will contact you shortly.",
      directCall: "Or call directly:",
      supportLabel: "Customer Support 24/7",
    },
    aboutPage: {
      tag: "ABOUT US • REALTORS CASPIAN",
      heroQuote: "10 years experience. 200+ exclusive properties. Premium lifestyle.",
      title: "The luxury real estate brand of Baku and the Caspian coast",
      subtitle: "Since 2014, Realtors Caspian provides professional brokerage services for purchasing and selling luxury apartments, villas, penthouses, and commercial real estate.",
      expYears: "10+ Yrs",
      expLabel: "Experience (Since 2014)",
      propertiesCount: "200+",
      propertiesLabel: "Exclusive Properties",
      satisfactionRate: "99%",
      satisfactionLabel: "Client Satisfaction",
      guaranteeRate: "100%",
      guaranteeLabel: "Legal Guarantee",
      filmSubtitle: "Realtors Caspian Film",
      filmTitle: "The Address of Your Luxury Lifestyle",
      teamTitle: "Our Professional Team",
      galleryTitle: "Photo Gallery",
      gallerySubtitle: "* Click on any photo to view full size",
      pillarsTitle: "Our Core Values",
      pillars: [
        {
          title: "Exclusive Portfolio",
          desc: "First access to private off-market residences and luxury apartments.",
        },
        {
          title: "Legal Assurance",
          desc: "Complete transparency and 100% legal security for every deal.",
        },
        {
          title: "Bespoke Service",
          desc: "Tailored property recommendations aligned with your lifestyle and goals.",
        },
      ],
      ctaBtnListings: "Explore All Properties",
      ctaBtnContact: "Contact Our Agents",
    },
    cta: {
      title: "Have questions?",
      subtitle: "Leave your phone number for professional support and we will contact you shortly",
      successMsg: "Thank you! We will contact you shortly.",
    },
    footer: {
      upBtn: "Scroll to top",
      designerLabel: "Site designed by ",
      designerSuffix: "",
      designerName: "Tarlan Movlamov",
    },
  },
  RUS: {
    hero: {
      title: "Помогаем обрести комфорт",
      subtitle: "Помогаем найти квартиру вашей мечты",
      searchBtn: "Ищу дом",
      sellBtn: "Продаю дом",
      location: "Баку, Азербайджан",
      whyUsTitle: "Почему мы?",
      whyUsDesc: "С 10-летним опытом мы на рынке недвижимости с 200+ объектами. Мы предоставляем профессиональные услуги, чтобы помочь вам найти дом вашей мечты на лучших условиях.",
    },
    nav: {
      menuTitle: "Меню",
      links: {
        home: "Главная",
        about: "О нас",
        listings: "Объявления",
        contact: "Контакты",
      },
      phoneLabel: "Телефон",
      emailLabel: "Эл. почта",
      buyBtn: "Ищу дом",
      sellBtn: "Продаю дом",
    },
    listings: {
      title: "Резиденции",
      sortLowest: "Сначала дешевле",
      sortHighest: "Сначала дороже",
      sortNewest: "Сначала новые",
      viewMore: "Показать еще",
      viewLess: "Свернуть",
      moreFilters: "Больше фильтров",
      lessFilters: "Свернуть фильтры",
      tabs: {
        all: "Все",
        flats: "Квартиры",
        townhouses: "Таунхаусы",
        penthouses: "Пентхаусы",
      },
      searchLabel: "Поиск",
      searchPlaceholder: "Название, адрес или поиск...",
      roomsLabel: "Комнаты",
      floorLabel: "этаж",
      propertyTypeTitle: "Тип недвижимости",
      propertyTypes: {
        all: "Все",
        flat: "Квартира",
        house: "Дом / Дача",
        office: "Офис",
        garage: "Гараж",
        commercial: "Коммерческая",
      },
      featuresFilter: {
        title: "Особенности",
        balcony: "Балкон",
        pool: "Бассейн",
        terrace: "Терраса",
        seaView: "Вид на море",
        combi: "Комби",
        garage: "Гараж",
      },
      card: {
        badge: "Подробнее",
        features: {
          area: "Площадь",
          renovated: "С ремонтом",
          renovation: "Ремонт",
          sot: "Сотка",
          rooms: "Комнат",
          mortgage: "Ипотека есть",
          noMortgage: "Без ипотеки",
          location: "Адрес",
        },
      },
      detail: {
        backToListings: "← Назад к объявлениям",
        contactBtn: "Связаться",
        characteristicsTitle: "Характеристики",
        descriptionTitle: "Подробное описание",
        galleryTitle: "Фотогалерея",
        similarTitle: "Похожие объявления",
        lightboxHint: "Нажмите на фото для просмотра на весь экран",
        callPhone: "Позвонить",
        sendEmail: "Написать",
        labels: {
          location: "Адрес",
          area: "Общая площадь",
          rooms: "Количество комнат",
          floor: "Этаж",
          renovation: "Состояние ремонта",
          mortgage: "Ипотека",
          landArea: "Площадь участка",
          propertyType: "Тип недвижимости",
          residenceType: "Категория",
          yes: "Есть",
          no: "Нет",
          renovatedYes: "С евроремонтом",
          renovatedNo: "Без ремонта",
        },
      },
    },
    contactPage: {
      title: "Связаться с нами",
      subtitle: "Оставьте свой номер, и мы свяжемся с вами",
      desc: "Оставьте свой номер телефона, чтобы выбрать подходящую недвижимость или получить консультацию. Наш менеджер перезвонит вам в ближайшее время.",
      placeholder: "+994 (50) 000-00-00",
      submitBtn: "Заказать звонок",
      successTitle: "Заявка принята!",
      successMsg: "Спасибо. Наш менеджер свяжется с вами в ближайшее время.",
      directCall: "Или позвоните нам напрямую:",
      supportLabel: "Служба поддержки 24/7",
    },
    aboutPage: {
      tag: "О НАС • REALTORS CASPIAN",
      heroQuote: "10 лет опыта. 200+ эксклюзивных объектов. Идеальный стиль жизни.",
      title: "Бренд элитной недвижимости Баку и Каспийского побережья",
      subtitle: "С 2014 года Realtors Caspian предоставляет профессиональные брокерские услуги по купле-продаже элитных квартир, вилл, пентхаусов и коммерческих объектов.",
      expYears: "10+ Лет",
      expLabel: "Опыта (С 2014 года)",
      propertiesCount: "200+",
      propertiesLabel: "Эксклюзивных объектов",
      satisfactionRate: "99%",
      satisfactionLabel: "Довольных клиентов",
      guaranteeRate: "100%",
      guaranteeLabel: "Юридическая гарантия",
      filmSubtitle: "Realtors Caspian Фильм",
      filmTitle: "Адрес вашего роскошного стиля жизни",
      teamTitle: "Наша профессиональная команда",
      galleryTitle: "Фотогалерея",
      gallerySubtitle: "* Нажмите на фото для просмотра в полном размере",
      pillarsTitle: "Наши Главные Ценности",
      pillars: [
        {
          title: "Эксклюзивный Портфель",
          desc: "Первый доступ к закрытым объектам премиум-класса и элитным квартирам.",
        },
        {
          title: "Юридическая Гарантия",
          desc: "Полная прозрачность и 100% юридическая безопасность каждой сделки.",
        },
        {
          title: "Индивидуальный Подход",
          desc: "Персональный подбор объектов в соответствии с вашим стилем жизни и целями.",
        },
      ],
      ctaBtnListings: "Смотреть все объекты",
      ctaBtnContact: "Связаться с нами",
    },
    cta: {
      title: "Есть вопросы?",
      subtitle: "Оставьте свой номер телефона для консультации, и мы свяжемся с вами в ближайшее время",
      successMsg: "Спасибо! Мы скоро свяжемся с вами.",
    },
    footer: {
      upBtn: "Наверх",
      designerLabel: "Дизайн сайта: ",
      designerSuffix: "",
      designerName: "Тарлан Мовламов",
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof TRANSLATIONS['AZ'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('AZ');

  useEffect(() => {
    let savedLang: Language | null = null;
    try {
      savedLang = localStorage.getItem('rc_lang') as Language;
    } catch {
      // Ignore localStorage read errors
    }

    if (savedLang && (savedLang === 'AZ' || savedLang === 'ENG' || savedLang === 'RUS')) {
      setLangState(savedLang);
      return;
    }

    // Auto-detect user's country location for first-time visitors
    const detectLanguageByLocation = async () => {
      try {
        const res = await fetch('https://api.country.is');
        if (res.ok) {
          const data = await res.json();
          const country = data.country?.toUpperCase();

          if (country === 'RU') {
            setLangState('RUS');
            return;
          } else if (country === 'AZ' || country === 'TR') {
            setLangState('AZ');
            return;
          } else if (country) {
            setLangState('ENG');
            return;
          }
        }
      } catch {
        // Fallback to browser locale if API fails
      }

      // Fallback via browser navigator.language
      try {
        const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
        if (browserLang.startsWith('ru')) {
          setLangState('RUS');
        } else if (browserLang.startsWith('az') || browserLang.startsWith('tr')) {
          setLangState('AZ');
        } else {
          setLangState('ENG');
        }
      } catch {
        setLangState('AZ');
      }
    };

    detectLanguageByLocation();
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('rc_lang', newLang);
    } catch {
      // Ignore localStorage write errors
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
