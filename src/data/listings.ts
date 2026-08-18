export interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  residenceType: 'All' | 'Flats' | 'Townhouses' | 'Penthouses';
  propertyType: 'All' | 'Mənzil' | 'Həyət evi/Bağ evi' | 'Ofis' | 'Qaraj' | 'Obyekt';
  areaSize: number; // in sq meters
  rooms: number;
  floor: number;
  totalFloors: number;
  hasMortgage: boolean;
  isRenovated: boolean;
  landArea?: string; // e.g. "5 sot"
  image: string;
  gallery?: string[];
  description?: string;
  features: string[];
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "rc-1",
    title: "Xətai residence - 3 otaq 12ci mərtəbə",
    price: 550000,
    currency: "₼",
    location: "Xətai rayonu, Xocalı pr.",
    residenceType: "Flats",
    propertyType: "Mənzil",
    areaSize: 145,
    rooms: 3,
    floor: 12,
    totalFloors: 18,
    hasMortgage: true,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    features: [
      "Mənzil",
      "145 m²",
      "Əla Təmirli",
      "3 otaq",
      "12-ci mərtəbə",
      "İpoteka var",
      "Xətai rayonu, Xocalı pr."
    ]
  },
  {
    id: "rc-2",
    title: "Mərdəkan - 3 otaq; 2 mərtəbə",
    price: 550000,
    currency: "₼",
    location: "Mərdəkan qəsəbəsi, F. Filankəsov küçəsi",
    residenceType: "Townhouses",
    propertyType: "Həyət evi/Bağ evi",
    areaSize: 110,
    rooms: 3,
    floor: 2,
    totalFloors: 2,
    hasMortgage: true,
    isRenovated: true,
    landArea: "5 sot",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    features: [
      "Bağ evi",
      "110 m2",
      "Təmirli",
      "5 sot",
      "3 otaq",
      "İpoteka var",
      "Mərdəkan qəsəbəsi, F. Filankəsov küçəsi"
    ]
  },
  {
    id: "rc-3",
    title: "Xətai residence - 3 otaq 12ci mərtəbə",
    price: 550000,
    currency: "₼",
    location: "Xətai rayonu, Ağ Şəhər",
    residenceType: "Flats",
    propertyType: "Mənzil",
    areaSize: 160,
    rooms: 3,
    floor: 12,
    totalFloors: 20,
    hasMortgage: false,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    features: [
      "Mənzil",
      "160 m²",
      "Dəniz Mənzərəsi",
      "3 otaq",
      "12-ci mərtəbə",
      "Çıxarışlı",
      "Ağ Şəhər bulvar kənarı"
    ]
  },
  {
    id: "rc-4",
    title: "Xətai residence - 3 otaq 12ci mərtəbə",
    price: 550000,
    currency: "₼",
    location: "Xətai rayonu, Port Baku yaxınlığı",
    residenceType: "Flats",
    propertyType: "Mənzil",
    areaSize: 130,
    rooms: 3,
    floor: 12,
    totalFloors: 16,
    hasMortgage: true,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    features: [
      "Mənzil",
      "130 m²",
      "Dizayn Təmirli",
      "3 otaq",
      "12-ci mərtəbə",
      "İpoteka var",
      "Neftçilər pr."
    ]
  },
  {
    id: "rc-5",
    title: "Bilgəh Dəniz Mənzərəli Penthouse",
    price: 850000,
    currency: "₼",
    location: "Bilgəh, Xəzər r.",
    residenceType: "Penthouses",
    propertyType: "Mənzil",
    areaSize: 280,
    rooms: 5,
    floor: 18,
    totalFloors: 18,
    hasMortgage: true,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    features: [
      "Penthouse",
      "280 m²",
      "Panoramik Terrace",
      "5 otaq",
      "18-ci mərtəbə",
      "İpoteka var",
      "Bilgəh sahil küçəsi"
    ]
  },
  {
    id: "rc-6",
    title: "Şüvəlan Lüks Townhouse Villa",
    price: 480000,
    currency: "₼",
    location: "Şüvəlan qəsəbəsi",
    residenceType: "Townhouses",
    propertyType: "Həyət evi/Bağ evi",
    areaSize: 220,
    rooms: 4,
    floor: 2,
    totalFloors: 2,
    hasMortgage: false,
    isRenovated: true,
    landArea: "6 sot",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    features: [
      "Townhouse",
      "220 m²",
      "Hovuzlu",
      "6 sot",
      "4 otaq",
      "Tam Mebelli",
      "Şüvəlan dəniz yolu"
    ]
  },
  {
    id: "rc-7",
    title: "Nizami Street Premium Ofis Mərkəzi",
    price: 620000,
    currency: "₼",
    location: "Nizami k., Səbail",
    residenceType: "Flats",
    propertyType: "Ofis",
    areaSize: 195,
    rooms: 4,
    floor: 4,
    totalFloors: 8,
    hasMortgage: true,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    features: [
      "Ofis",
      "195 m²",
      "Biznes Mərkəzi",
      "4 otaq",
      "4-cü mərtəbə",
      "Vitrin Pəncərələr",
      "Nizami küçəsi"
    ]
  },
  {
    id: "rc-8",
    title: "Ağ Şəhər 2 Otaqlı Mənzil",
    price: 290000,
    currency: "₼",
    location: "Ağ Şəhər, Xətai",
    residenceType: "Flats",
    propertyType: "Mənzil",
    areaSize: 95,
    rooms: 2,
    floor: 6,
    totalFloors: 14,
    hasMortgage: true,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    features: [
      "Mənzil",
      "95 m²",
      "Kombi",
      "2 otaq",
      "6-cı mərtəbə",
      "İpoteka var",
      "Ağ Şəhər park kənarı"
    ]
  },
  {
    id: "rc-9",
    title: "Badamdar Panorama Villa",
    price: 750000,
    currency: "₼",
    location: "Badamdar 1-ci massiv",
    residenceType: "Townhouses",
    propertyType: "Həyət evi/Bağ evi",
    areaSize: 320,
    rooms: 5,
    floor: 3,
    totalFloors: 3,
    hasMortgage: true,
    isRenovated: true,
    landArea: "8 sot",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    features: [
      "Villa",
      "320 m²",
      "Şəhər Mənzərəsi",
      "8 sot",
      "5 otaq",
      "Qarajlı",
      "Badamdar 1-ci massiv"
    ]
  },
  {
    id: "rc-10",
    title: "Yasamal Park Yaxınlığında Mənzil",
    price: 220000,
    currency: "₼",
    location: "Yasamal r., H. Cavid pr.",
    residenceType: "Flats",
    propertyType: "Mənzil",
    areaSize: 85,
    rooms: 2,
    floor: 8,
    totalFloors: 16,
    hasMortgage: true,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    features: [
      "Mənzil",
      "85 m²",
      "Tam Təmirli",
      "2 otaq",
      "8-ci mərtəbə",
      "Metro yaxınlığı",
      "H. Cavid pr."
    ]
  },
  {
    id: "rc-11",
    title: "Nərimanov Mərkəzi Obyekt",
    price: 450000,
    currency: "₼",
    location: "Nərimanov r., Təbriz k.",
    residenceType: "Flats",
    propertyType: "Obyekt",
    areaSize: 150,
    rooms: 3,
    floor: 1,
    totalFloors: 5,
    hasMortgage: false,
    isRenovated: true,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    features: [
      "Obyekt",
      "150 m²",
      "Yol Qırağı",
      "3 Vitrin",
      "1-ci mərtəbə",
      "İcarədədir",
      "Təbriz küçəsi"
    ]
  },
  {
    id: "rc-12",
    title: "Ağ Şəhər Yeraltı Qaraj Sahəsi",
    price: 35000,
    currency: "₼",
    location: "Ağ Şəhər, Xətai",
    residenceType: "Flats",
    propertyType: "Qaraj",
    areaSize: 25,
    rooms: 1,
    floor: -1,
    totalFloors: 14,
    hasMortgage: false,
    isRenovated: false,
    image: "https://images.unsplash.com/photo-1506521782020-18925f440d0a?auto=format&fit=crop&w=800&q=80",
    features: [
      "Qaraj",
      "25 m²",
      "24/7 Kamera",
      "Pultla Qapı",
      "-1-ci mərtəbə",
      "Çıxarışlı",
      "Ağ Şəhər"
    ]
  }
];

export function getListingById(id: string): Listing {
  const item = MOCK_LISTINGS.find((l) => l.id === id) || MOCK_LISTINGS[0];

  const defaultGallery = [
    item.image,
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
  ];

  return {
    ...item,
    gallery: item.gallery && item.gallery.length > 0 ? item.gallery : defaultGallery,
    description: item.description || "Xətai rayonunun ən nüfuzlu və komfortlu yaşayış kompleksində yerləşən bu eksklüziv mənzil müasir arxitekturası, yüksək keyfiyyətli təmir materialları və panarama mənzərəsi ilə seçilir. Mənzildə geniş və işıqlı qonaq otağı, dizayn edilmiş mətbəx və səs izolyasiyalı yataq otaqları mövcuddur. Kompleksdə 24/7 mühafizə, yeraltı qaraj, uşaq meydançası və yaşıl istirahət zonası fəaliyyət göstərir.",
  };
}
