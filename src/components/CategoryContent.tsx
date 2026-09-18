import { motion, type Variants } from 'framer-motion';
import { useTranslations, useTranslatedPath } from '../i18n';
import Magnetic from './Magnetic';

interface CategoryContentProps {
  categoryId: string;
  categoryName: string;
  categoryDesc: string;
  products: any[];
  currentLang?: string;
}

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 22,
    },
  },
};

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 20,
    },
  },
};

const heroBannerVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
      delay: 0.1,
    },
  },
};

const backLinkVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
    },
  },
};

export default function CategoryContent({
  categoryId,
  categoryName,
  categoryDesc,
  products,
  currentLang = 'en',
}: CategoryContentProps) {
  const t = useTranslations(currentLang);
  const translatePath = useTranslatedPath(currentLang);

  const subcategoryOrder: Record<string, string[]> = {
    marshmallow: ['35g_marshmallow'],
    jelly: ['50g_jelly', '48g_jelly', '8g_jelly'],
    hard_candy: ['35g_bear_candy', '15g_lollipop'],
  };

  const subcategoryIcons: Record<string, string> = {
    '35g_marshmallow': '/images/categories/minimal_marshmallow.svg',
    '50g_jelly': '/images/categories/minimal_jelly.svg',
    '48g_jelly': '/images/categories/minimal_jelly.svg',
    '8g_jelly': '/images/categories/minimal_jelly.svg',
    '35g_bear_candy': '/images/categories/minimal_hard_candy.svg',
    '15g_lollipop': '/images/categories/minimal_hard_candy.svg',
  };

  const subcategoryTitles: Record<string, Record<string, string>> = {
    en: {
      '35g_marshmallow': '35g Marshmallows',
      '50g_jelly': '50g Fruit Jelly',
      '48g_jelly': '48g Jelly Candy',
      '8g_jelly': '8g Mini Gummies',
      '35g_bear_candy': '35g Bear Candy',
      '15g_lollipop': '15g Artistic Lollipops',
    },
    ar: {
      '35g_marshmallow': 'مارشميلو 35 غرام',
      '50g_jelly': 'حلوى جيلي 50 غرام',
      '48g_jelly': 'حلوى جيلي 48 غرام',
      '8g_jelly': 'ميني غامي 8 غرام',
      '35g_bear_candy': 'حلوى الدب 35 غرام',
      '15g_lollipop': 'مصاصات فنية 15 غرام',
    },
    ru: {
      '35g_marshmallow': 'Маршмеллоу 35г',
      '50g_jelly': 'Фруктовое желе 50г',
      '48g_jelly': 'Желейный мармелад 48г',
      '8g_jelly': 'Мини-мармелад 8г',
      '35g_bear_candy': 'Карамель Мишка 35г',
      '15g_lollipop': 'Леденцы на палочке 15г',
    },
    fr: {
      '35g_marshmallow': 'Guimauves 35g',
      '50g_jelly': 'Gélifiés aux fruits 50g',
      '48g_jelly': 'Bonbons gélifiés 48g',
      '8g_jelly': 'Mini oursons gélifiés 8g',
      '35g_bear_candy': 'Bonbon ourson 35g',
      '15g_lollipop': 'Sucettes artisanales 15g',
    },
  };

  const activeSubcategories = subcategoryOrder[categoryId] || [];

  const groupedProducts: Record<string, any[]> = {};
  products.forEach((product) => {
    const subcat = product.subcategoryId || 'other';
    if (!groupedProducts[subcat]) {
      groupedProducts[subcat] = [];
    }
    groupedProducts[subcat].push(product);
  });

  const renderList = [...activeSubcategories];
  Object.keys(groupedProducts).forEach((subcat) => {
    if (!renderList.includes(subcat) && groupedProducts[subcat].length > 0) {
      renderList.push(subcat);
    }
  });

  const getGradientByCat = (id: string) => {
    switch (id) {
      case 'marshmallow':
        return 'bg-strawberry/5';
      case 'jelly':
        return 'bg-lemon/10';
      case 'hard_candy':
        return 'bg-mint/10';
      case 'candy_toy':
        return 'bg-blue-50';
      default:
        return 'bg-cream';
    }
  };

  return (
    <div className={`min-h-[80vh] ${getGradientByCat(categoryId)} pb-24 relative overflow-hidden`}>
      {/* Playful Floating Geometry */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-60 rounded-full mix-blend-overlay filter blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-40">
        {/* Banner Area */}
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          {/* Back link with slide-in reveal */}
          <motion.div
            variants={backLinkVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 w-fit"
          >
            <Magnetic>
              <motion.div
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <a
                  href={translatePath('/products')}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-mocha/80 hover:text-choco shadow-sm border border-choco/5 hover:shadow-md transition-colors font-medium text-sm w-fit"
                >
                  <span className="rtl:rotate-180">←</span>{' '}
                  {t('product_details.back_to_categories', 'Back to Categories')}
                </a>
              </motion.div>
            </Magnetic>
          </motion.div>

          {/* Hero title reveal */}
          <motion.div
            variants={heroBannerVariants}
            initial="hidden"
            animate="visible"
            className="relative inline-block"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-choco tracking-tight drop-shadow-sm px-6 py-2">
              {categoryName}
            </h1>
            <p className="text-mocha text-base md:text-lg max-w-xl mx-auto mt-2 font-medium">
              {categoryDesc}
            </p>
            <motion.span
              className="absolute -top-4 -right-8 rtl:-right-auto rtl:-left-8 text-4xl hidden sm:block"
              aria-hidden="true"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <img
                src={subcategoryIcons[activeSubcategories[0]] || '/images/categories/minimal_marshmallow.svg'}
                className="w-16 h-16 drop-shadow-md"
                alt="icon"
              />
            </motion.span>
          </motion.div>
        </div>

        {/* Product Grid by Subcategory */}
        {products.length > 0 ? (
          <div className="space-y-24">
            {renderList.map((subcatId) => {
              const subcatProducts = groupedProducts[subcatId] || [];
              if (subcatProducts.length === 0) return null;

              const isStandard = subcatId !== 'other';
              const titleText = isStandard
                ? (subcategoryTitles[currentLang]?.[subcatId] || subcategoryTitles.en[subcatId] || subcatId)
                : (currentLang === 'ar' ? 'أصناف أخرى' : currentLang === 'ru' ? 'Другие сладости' : currentLang === 'fr' ? 'Autres bonbons' : 'Other Products');
              const emojiIcon = subcategoryIcons[subcatId] || '/images/categories/minimal_marshmallow.svg';

              return (
                <section key={subcatId} className="scroll-mt-32">
                  {/* Section header scroll-reveal */}
                  <motion.div
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="flex items-center gap-4 mb-10 border-b-2 border-choco/10 pb-4"
                  >
                    <motion.span
                      className="text-4xl filter drop-shadow-sm"
                      aria-hidden="true"
                      whileHover={{ rotate: [0, -12, 12, -8, 8, 0], scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 8 }}
                    >
                      <img
                        src={emojiIcon}
                        className="w-12 h-12 object-contain filter drop-shadow-md"
                        alt="Subcategory icon"
                      />
                    </motion.span>
                    <h2 className="text-2xl md:text-3xl font-extrabold font-display text-choco tracking-tight capitalize">
                      {titleText}
                    </h2>
                    <motion.span
                      className="ml-auto rtl:ml-0 rtl:mr-auto px-4 py-1.5 bg-white rounded-full text-sm font-bold font-display text-mocha/80 shadow-sm border border-choco/5"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 16, delay: 0.15 }}
                    >
                      {subcatProducts.length}{' '}
                      {currentLang === 'ar' ? 'صنف' : currentLang === 'ru' ? 'товаров' : currentLang === 'fr' ? 'produits' : 'Items'}
                    </motion.span>
                  </motion.div>

                  {/* Staggered product grid */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    {subcatProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={gridItemVariants}
                        whileHover={{
                          y: -8,
                          scale: 1.03,
                          boxShadow: '0 24px 48px -8px rgba(255,107,157,0.22)',
                          transition: { type: 'spring', stiffness: 400, damping: 10 },
                        }}
                        whileTap={{
                          scale: 0.97,
                          transition: { type: 'spring', stiffness: 500, damping: 14 },
                        }}
                        className="group flex flex-col items-center bg-white rounded-[2.5rem] p-4 md:p-6 shadow-sm border border-choco/5 cursor-pointer"
                      >
                        <a
                          href={translatePath(`/product/${product.id}`)}
                          className="flex flex-col items-center w-full h-full"
                        >
                          <div className="relative w-full aspect-square mb-6 bg-cream rounded-[1.5rem] flex items-center justify-center p-4 overflow-hidden">
                            <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 blur-[30px] transition-opacity duration-300" />
                            <motion.img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain filter drop-shadow-md relative z-10"
                              loading="lazy"
                              whileHover={{
                                scale: 1.12,
                                transition: { type: 'spring', stiffness: 350, damping: 14 },
                              }}
                            />
                          </div>

                          <h3 className="text-base md:text-lg font-bold font-display text-center text-choco/90 group-hover:text-strawberry transition-colors line-clamp-2 px-2">
                            {product.name}
                          </h3>

                          <motion.div
                            className="mt-4 px-4 py-1 rounded-full bg-cream text-mocha/80 text-xs font-bold font-display border border-choco/5"
                            initial={{ opacity: 0, y: 8 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                          >
                            {currentLang === 'ar' ? 'عرض المواصفات' : currentLang === 'ru' ? 'Подробнее' : currentLang === 'fr' ? 'Détails' : 'View details'}
                          </motion.div>
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <motion.div
            className="max-w-xl mx-auto bg-white rounded-[3rem] p-12 text-center shadow-xl shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)] border border-choco/5"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <motion.h2
              className="text-8xl mb-6"
              aria-hidden="true"
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              {categoryId === 'candy_toy' ? '🎉' : '🍬'}
            </motion.h2>
            <p className="text-xl md:text-2xl font-bold font-display text-mocha leading-relaxed">
              {categoryId === 'candy_toy'
                ? (currentLang === 'ar' ? 'ألعاب حلوى جديدة قادمة قريباً!' : currentLang === 'ru' ? 'Скоро новинки в категории конфет-игрушек!' : currentLang === 'fr' ? 'De nouvelles friandises arrivent bientôt!' : 'Exciting candy toys are coming soon!')
                : (currentLang === 'ar' ? 'لا توجد منتجات حالياً.' : currentLang === 'ru' ? 'Нет доступных товаров.' : currentLang === 'fr' ? 'Aucun produit disponible pour le moment.' : 'No products available here right now.')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
