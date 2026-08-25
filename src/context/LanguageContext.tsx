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
      title: "Zövqünüzə uyğun evlər",
      sortLowest: "Ən aşağı qiymət",
      sortHighest: "Ən yüksək qiymət",
      sortNewest: "Ən yenilər",
      viewMore: "Daha çox",
      viewLess: "Gizlət",
      tabs: {
        all: "Hamısı",
        flats: "Mənzillər",
        townhouses: "Taunhauslar",
        penthouses: "Penthauslar",
      },
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
      placeholder: "+994 (50) 000-00-00",
      submitBtn: "Zəng sifariş et",
      successTitle: "Müraciətiniz qəbul olundu!",
      successMsg: "Təşəkkür edirik. Yaxın dəqiqələrdə menecerimiz sizinlə əlaqə saxlayacaq.",
      directCall: "Və ya birbaşa zəng edin:",
    },
    aboutPage: {
      tag: "HAQQIMIZDA • REALTORS CASPIAN",
      heroQuote: "10 illik təcrübə. 200+ eksklüziv obyekt. Mükəmməl həyat tərzi.",
      title: "Bakının və Xəzər sahilinin lüks daşınmaz əmlak bazarında liderlik edirik.",
      subtitle: "Realtors Caspian olaraq 2014-cü ildən bəri müştərilərimizə premium mənzillər, villalar, penthauslar və kommersiya obyektlərinin alqı-satqısında peşəkar vasitəçilik xidməti təklif edirik.",
      expYears: "10+ İl",
      expLabel: "Uğurlu təcrübə",
      propertiesCount: "200+",
      propertiesLabel: "Lüks rezidensiya",
      satisfactionRate: "99%",
      satisfactionLabel: "Müştəri məmnuniyyəti",
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
      tabs: {
        all: "All",
        flats: "Flats",
        townhouses: "Townhouses",
        penthouses: "Penthouses",
      },
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
      subtitle: "Leave your phone number and we will get back to you",
      placeholder: "+994 (50) 000-00-00",
      submitBtn: "Request Callback",
      successTitle: "Request Received!",
      successMsg: "Thank you. Our manager will contact you shortly.",
      directCall: "Or call us directly:",
    },
    aboutPage: {
      tag: "ABOUT US • REALTORS CASPIAN",
      heroQuote: "10 years experience. 200+ exclusive properties. Premium lifestyle.",
      title: "Leading the luxury real estate market in Baku and the Caspian coast.",
      subtitle: "Since 2014, Realtors Caspian provides premium brokerage services for luxury apartments, villas, penthouses, and commercial properties.",
      expYears: "10+ Yrs",
      expLabel: "Successful experience",
      propertiesCount: "200+",
      propertiesLabel: "Luxury residences",
      satisfactionRate: "99%",
      satisfactionLabel: "Client satisfaction",
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
      tabs: {
        all: "Все",
        flats: "Квартиры",
        townhouses: "Таунхаусы",
        penthouses: "Пентхаусы",
      },
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
      subtitle: "Оставьте свой номер телефона, и мы перезвоним вам",
      placeholder: "+994 (50) 000-00-00",
      submitBtn: "Заказать звонок",
      successTitle: "Заявка принята!",
      successMsg: "Спасибо. Наш менеджер свяжется с вами в ближайшее время.",
      directCall: "Или позвоните нам напрямую:",
    },
    aboutPage: {
      tag: "О НАС • REALTORS CASPIAN",
      heroQuote: "10 лет опыта. 200+ эксклюзивных объектов. Идеальный стиль жизни.",
      title: "Лидируем на рынке элитной недвижимости Баку и Каспийского побережья.",
      subtitle: "С 2014 года Realtors Caspian предоставляет профессиональные брокерские услуги по купле-продаже элитных квартир, вилл, пентхаусов и коммерческих объектов.",
      expYears: "10+ Лет",
      expLabel: "Успешного опыта",
      propertiesCount: "200+",
      propertiesLabel: "Элитных резиденций",
      satisfactionRate: "99%",
      satisfactionLabel: "Довольных клиентов",
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
    try {
      const savedLang = localStorage.getItem('rc_lang') as Language;
      if (savedLang && (savedLang === 'AZ' || savedLang === 'ENG' || savedLang === 'RUS')) {
        setLangState(savedLang);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('rc_lang', newLang);
    } catch {
      // Ignore localStorage errors
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
