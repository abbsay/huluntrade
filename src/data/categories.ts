// Centralized Candy Categories and Localization Data Source
// Single Source of Truth across Home, Products Catalog, and Category Detail routes

export interface CategoryMeta {
  id: string;
  count: number;
  img: string;
  glow: string;
  border: string;
  accent: string;
  badge: string;
}

export const CATEGORIES_BASE: readonly CategoryMeta[] = [
  {
    id: 'marshmallow',
    count: 31,
    img: '/images/categories/minimal_marshmallow.svg',
    glow: 'from-pink-500/15 via-rose-400/5 to-transparent',
    border: 'hover:border-pink-300 hover:shadow-pink-500/20',
    accent: 'text-pink-500 bg-pink-50',
    badge: 'Hot Seller',
  },
  {
    id: 'jelly',
    count: 7,
    img: '/images/categories/minimal_jelly.svg',
    glow: 'from-amber-500/15 via-orange-400/5 to-transparent',
    border: 'hover:border-amber-300 hover:shadow-amber-500/20',
    accent: 'text-amber-600 bg-amber-50',
    badge: 'Rich Fruit',
  },
  {
    id: 'hard_candy',
    count: 19,
    img: '/images/categories/minimal_hard_candy.svg',
    glow: 'from-purple-500/15 via-fuchsia-400/5 to-transparent',
    border: 'hover:border-purple-300 hover:shadow-purple-500/20',
    accent: 'text-purple-600 bg-purple-50',
    badge: 'Classic',
  },
  {
    id: 'candy_toy',
    count: 0,
    img: '/images/categories/minimal_toy.svg',
    glow: 'from-sky-500/15 via-blue-400/5 to-transparent',
    border: 'hover:border-sky-300 hover:shadow-sky-500/20',
    accent: 'text-sky-600 bg-sky-50',
    badge: 'Novelty Fun',
  },
] as const;

export interface LocalizedCategoryInfo {
  name: string;
  catalogName: string;
  tagline: string;
  desc: string;
  countText: string;
  title: string;
}

export const CATEGORIES_I18N: Record<string, Record<string, LocalizedCategoryInfo>> = {
  en: {
    marshmallow: {
      name: 'Marshmallow',
      catalogName: 'Marshmallows',
      tagline: 'Lighter than air',
      desc: 'Discover our soft, fluffy, and cloud-like marshmallows. Fun shapes, fruity swirl twists, and creative themes exported globally.',
      countText: '31 Varieties',
      title: 'Delicious Marshmallows — Hulun Sweets',
    },
    jelly: {
      name: 'Jelly Candy',
      catalogName: 'Jelly Candies',
      tagline: 'Juicy fruit burst',
      desc: 'Explore our collection of juicy and chewy jelly gummies. Packed with fruit flavors and crystal clarity.',
      countText: '7 Varieties',
      title: 'Juicy Jelly Candies — Hulun Sweets',
    },
    hard_candy: {
      name: 'Hard Candy',
      catalogName: 'Hard Candy & Pops',
      tagline: 'Enduring sweet crunch',
      desc: 'Classic handmade hard candies, artistic crystal swirls, and colorful lollipops made for enduring sweet joy.',
      countText: '19 Varieties',
      title: 'Hard Candies & Lollipops — Hulun Sweets',
    },
    candy_toy: {
      name: 'Candy Toy',
      catalogName: 'Candy Toys',
      tagline: 'Play meets taste',
      desc: 'Creative interactive candy toys combining tasty sweets with hours of engaging play for kids.',
      countText: 'Novelty Fun',
      title: 'Playful Candy Toys — Hulun Sweets',
    },
  },
  ar: {
    marshmallow: {
      name: 'مارشميلو',
      catalogName: 'مارشميلو',
      tagline: 'أخف من الهواء',
      desc: 'اكتشف حلويات المارشميلو الناعمة والخفيفة كالسحاب. أشكال مرحة وحلزونية ونكهات فواكه تصدر عالمياً.',
      countText: '31 صنفاً',
      title: 'مارشميلو شهي طري — حلويات هولون',
    },
    jelly: {
      name: 'حلوى الجيلي',
      catalogName: 'حلوى الجيلي',
      tagline: 'انفجار نكهات الفواكه',
      desc: 'استكشف تشكيلتنا من حلوى الجيلي الطرية والمنعشة الغنية بنكهات الفواكه الصافية.',
      countText: '7 أصناف',
      title: 'حلوى جيلي الفواكه اللذيذة — حلويات هولون',
    },
    hard_candy: {
      name: 'حلوى صلبة',
      catalogName: 'حلوى صلبة ومصاصات',
      tagline: 'قرمشة وحلاوة تدوم',
      desc: 'مصاصات فنية ملونة وحلوى صلبة كلاسيكية مصنوعة يدويًا بدقة تدوم متعتها طويلاً.',
      countText: '19 صنفاً',
      title: 'حلوى صلبة ومصاصات — حلويات هولون',
    },
    candy_toy: {
      name: 'ألعاب الحلوى',
      catalogName: 'ألعاب الحلوى',
      tagline: 'متعة اللعب ولذة المذاق',
      desc: 'ألعاب تفاعلية مبتكرة تجمع بين تسلية اللعب ومذاق الحلوى الشهي للأطفال.',
      countText: 'مبتكرة وممتعة',
      title: 'ألعاب حلوى إبداعية للأطفال — حلويات هولون',
    },
  },
  ru: {
    marshmallow: {
      name: 'Маршмеллоу',
      catalogName: 'Маршмеллоу',
      tagline: 'Легче воздуха',
      desc: 'Нежный, воздушный маршмеллоу с текстурой облака. Оригинальные формы, спирали и фруктовые вкусы.',
      countText: '31 вид',
      title: 'Вкусный маршмеллоу — Hulun Sweets',
    },
    jelly: {
      name: 'Желейные конфеты',
      catalogName: 'Желейные конфеты',
      tagline: 'Взрыв фруктового сока',
      desc: 'Коллекция жевательного мармелада и кристально прозрачных фруктовых желейных сладостей.',
      countText: '7 видов',
      title: 'Сочные желейные конфеты — Hulun Sweets',
    },
    hard_candy: {
      name: 'Карамель и леденцы',
      catalogName: 'Леденцы и карамель',
      tagline: 'Долгая сладость и хруст',
      desc: 'Классическая хрустящая карамель, яркие леденцы на палочке и авторские сладкие спирали.',
      countText: '19 видов',
      title: 'Карамель и леденцы — Hulun Sweets',
    },
    candy_toy: {
      name: 'Конфеты-игрушки',
      catalogName: 'Конфеты-игрушки',
      tagline: 'Игра и вкус вместе',
      desc: 'Интерактивные игрушки с вкусным сладким наполнением, дарящие часы радости детям.',
      countText: 'Новинки',
      title: 'Конфеты-игрушки для детей — Hulun Sweets',
    },
  },
  fr: {
    marshmallow: {
      name: 'Guimauve',
      catalogName: 'Guimauves',
      tagline: 'Plus léger que l’air',
      desc: 'Découvrez nos guimauves aériennes et moelleuses. Formes créatives, torsades fruitées et qualité export.',
      countText: '31 Variétés',
      title: 'Délicieuses Guimauves — Hulun Sweets',
    },
    jelly: {
      name: 'Bonbon Gélifié',
      catalogName: 'Bonbons Gélifiés',
      tagline: 'Explosion de fruits',
      desc: 'Explorez notre gamme de bonbons gélifiés fruités, tendres et translucides aux extraits naturels de fruits.',
      countText: '7 Variétés',
      title: 'Gélifiés Fruités et Juteux — Hulun Sweets',
    },
    hard_candy: {
      name: 'Bonbon Dur',
      catalogName: 'Sucettes & Bonbons',
      tagline: 'Croquant et douceur',
      desc: 'Sucettes artisanales torsadées, bonbons durs cristallins et friandises traditionnelles incontournables.',
      countText: '19 Variétés',
      title: 'Sucettes et Bonbons Durs — Hulun Sweets',
    },
    candy_toy: {
      name: 'Jouet Sucré',
      catalogName: 'Jouets Sucrés',
      tagline: 'Le jeu et la friandise',
      desc: 'Jouets interactifs novateurs accompagnés de confiseries savoureuses pour les enfants.',
      countText: 'Nouveautés',
      title: 'Jouets de Bonbons Amusants — Hulun Sweets',
    },
  },
};

export const ALL_TAB_NAMES: Record<string, string> = {
  en: 'All Candies',
  ar: 'جميع الحلويات',
  ru: 'Все сладости',
  fr: 'Tous les bonbons',
};

export function getCategoriesWithLocale(lang: string = 'en') {
  const dict = CATEGORIES_I18N[lang] || CATEGORIES_I18N.en;
  return CATEGORIES_BASE.map((base) => {
    const loc = dict[base.id] || CATEGORIES_I18N.en[base.id];
    return {
      ...base,
      name: loc.name,
      catalogName: loc.catalogName,
      tagline: loc.tagline,
      desc: loc.desc,
      countText: loc.countText,
      title: loc.title,
    };
  });
}
