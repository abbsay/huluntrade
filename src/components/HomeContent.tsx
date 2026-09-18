import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSlider from './HeroSlider';
import { useTranslations, useTranslatedPath } from '../i18n';

interface HomeContentProps {
  currentLang?: string;
}

const springApple = { type: 'spring' as const, stiffness: 200, damping: 12, mass: 0.8 };

export default function HomeContent({ currentLang = 'en' }: HomeContentProps) {
  const { scrollYProgress } = useScroll();
  const t = useTranslations(currentLang);
  const translatePath = useTranslatedPath(currentLang);

  const CATEGORIES = [
    {
      id: 'marshmallow',
      name: t('products_page.marshmallow', 'Marshmallow'),
      desc: currentLang === 'ar' ? 'أخف من الهواء، سحابي ناعم.' :
            currentLang === 'ru' ? 'Легче воздуха, облачная текстура.' :
            currentLang === 'fr' ? 'Plus léger que l’air, moelleux.' :
            'Lighter than air.',
      img: '/images/categories/minimal_marshmallow.svg',
      glow: 'from-glowPink to-transparent'
    },
    {
      id: 'jelly',
      name: t('products_page.jelly', 'Jelly Candy'),
      desc: currentLang === 'ar' ? 'انفجار نكهات فواكه طبيعية.' :
            currentLang === 'ru' ? 'Взрыв натурального сока.' :
            currentLang === 'fr' ? 'Explosion de saveurs fruitées.' :
            'Bursting with flavor.',
      img: '/images/categories/minimal_jelly.svg',
      glow: 'from-glowOrange to-transparent'
    },
    {
      id: 'hard_candy',
      name: t('products_page.hard_candy', 'Hard Candy'),
      desc: currentLang === 'ar' ? 'قرمشة وحلاوة لا تنتهي.' :
            currentLang === 'ru' ? 'Сладкий хруст и карамель.' :
            currentLang === 'fr' ? 'Douceur croquante et durable.' :
            'Enduring sweetness.',
      img: '/images/categories/minimal_hard_candy.svg',
      glow: 'from-glowPurple to-transparent'
    },
    {
      id: 'candy_toy',
      name: t('products_page.candy_toy', 'Candy Toys'),
      desc: currentLang === 'ar' ? 'متعة اللعب ولذة الحلوى.' :
            currentLang === 'ru' ? 'Игра и вкус вместе.' :
            currentLang === 'fr' ? 'Le jeu rencontre la friandise.' :
            'Play meets taste.',
      img: '/images/categories/minimal_toy.svg',
      glow: 'from-glowBlue to-transparent'
    },
  ];

  return (
    <div className="w-full flex flex-col bg-cream antialiased selection:bg-strawberry selection:text-white pb-32">

      {/* 1. FULL SCREEN HERO SLIDER */}
      <HeroSlider currentLang={currentLang} />

      {/* ZERO GRAVITY PARALLAX (Subtle, Premium Apple Glass style) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden mix-blend-multiply opacity-20">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -800]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 90])
          }}
          className="absolute top-[40%] left-[5%] blur-[4px] scale-[1.5]"
        >
          <span className="text-7xl filter drop-shadow-2xl grayscale">🍬</span>
        </motion.div>
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -1000]),
            x: useTransform(scrollYProgress, [0, 1], [0, 100]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, -120])
          }}
          className="absolute top-[70%] right-[8%] blur-[2px] scale-[2]"
        >
          <span className="text-6xl filter drop-shadow-2xl grayscale">🍭</span>
        </motion.div>
      </div>

      {/* 2. CHUNKY MINIMALIST BENTO BOX (With rich hovers) */}
      <section className="py-24 max-w-[1240px] mx-auto px-4 sm:px-6 z-20 w-full relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-display text-choco tracking-tighter">
            {currentLang === 'ar' ? 'صُممت لتنشر البهجة والفرح.' :
             currentLang === 'ru' ? 'Создано, чтобы радовать.' :
             currentLang === 'fr' ? 'Conçu pour émerveiller.' :
             'Designed to delight.'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Main Giant Showcase */}
          <motion.a
            href={translatePath('/category/marshmallow')}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={springApple}
            className="md:col-span-8 bg-white rounded-[3rem] p-10 md:p-16 flex flex-col items-start overflow-hidden relative group cursor-pointer h-[500px] md:h-[650px] border border-black/5 hover:shadow-2xl hover:shadow-strawberry/20 transition-all duration-700 block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-strawberry/0 via-transparent to-strawberry/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-3xl md:text-5xl font-black font-display text-choco tracking-tight z-10">
              {currentLang === 'ar' ? 'مارشميلو فائق النعومة.' :
               currentLang === 'ru' ? 'Нежный маршмеллоу.' :
               currentLang === 'fr' ? 'Guimauves moelleuses.' :
               'Fluffy Marshmallows.'}
            </h3>
            <p className="text-lg md:text-xl text-mocha font-medium mt-2 z-10 w-2/3">
              {currentLang === 'ar' ? 'استمتع بخفة لا مثيل لها ومذاق سحابي معبأ بأحدث تقنيات الإنتاج العالمية.' :
               currentLang === 'ru' ? 'Невероятная легкость и мягкость. Создано по передовой технологии.' :
               currentLang === 'fr' ? 'Découvrez une légèreté incroyable élaborée avec les plus hauts standards.' :
               'Experience the impossible lightness. Engineered with micro-bubble technology.'}
            </p>
            <motion.img
              src="/images/categories/minimal_marshmallow.svg"
              alt="Marshmallow"
              className="absolute -bottom-10 -right-10 rtl:-right-auto rtl:-left-10 w-[120%] lg:w-[90%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] origin-bottom-right rtl:origin-bottom-left"
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={springApple}
            />
          </motion.a>

          {/* Right Vertical */}
          <motion.a
            href={translatePath('/category/jelly')}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ ...springApple, delay: 0.1 }}
            className="md:col-span-4 bg-choco rounded-[3rem] p-10 md:p-12 flex flex-col items-center text-center overflow-hidden relative group cursor-pointer h-[400px] md:h-[650px] hover:shadow-2xl hover:shadow-strawberry/30 transition-all duration-700 block"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-glowBlue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-3xl font-black font-display text-white tracking-tight z-10">
              {currentLang === 'ar' ? 'قطع الجيلي المرحة.' :
               currentLang === 'ru' ? 'Сочные желейки.' :
               currentLang === 'fr' ? 'Bouchées gélifiées.' :
               'Bouncy Bites.'}
            </h3>
            <p className="text-gray-400 font-medium mt-2 z-10">
              {currentLang === 'ar' ? 'قوام مطاطي لذيذ ونكهات فواكه مركزة.' :
               currentLang === 'ru' ? 'Идеальная жевательная текстура.' :
               currentLang === 'fr' ? 'Texture moelleuse professionnelle.' :
               'Pro-level chewiness.'}
            </p>
            <div className="flex-grow flex items-center justify-center w-full mt-8 z-10">
              <motion.img
                src="/images/categories/minimal_jelly.svg"
                alt="Jelly"
                className="w-[140%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] origin-center"
                whileHover={{ scale: 1.15, y: -20 }}
                transition={springApple}
              />
            </div>
          </motion.a>
        </div>
      </section>

      {/* 2.5 INFINITE CANDY MARQUEE RIBBON */}
      <div className="w-full bg-strawberry text-white py-4 md:py-5 overflow-hidden flex items-center shadow-inner relative z-20 border-y border-white/20 transform -rotate-1 origin-center scale-105 my-12">
        <motion.div
          className="flex whitespace-nowrap items-center font-display font-black text-2xl md:text-3xl uppercase tracking-widest"
          animate={{ x: currentLang === 'ar' ? [0, 1035] : [0, -1035] }}
          transition={{ ease: "linear", duration: 18, repeat: Infinity }}
        >
          {Array(8).fill(
            currentLang === 'ar' ? '🍬 أحلى بهجة 🍭 طعم ساحر ✨ سعادة خالصة ' :
            currentLang === 'ru' ? '🍬 СЛАДКАЯ РАДОСТЬ 🍭 ВОЛШЕБНЫЙ ВКУС ✨ ЧИСТОЕ СЧАСТЬЕ ' :
            currentLang === 'fr' ? '🍬 DOUCEUR ABSOLUE 🍭 GOÛT MAGIQUE ✨ PUR BONHEUR ' :
            '🍬 SWEETEST JOY 🍭 MAGICAL TASTE ✨ PURE HAPPINESS '
          ).map((text, i) => (
             <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* 3. STICKY EDITORIAL SCROLL (The Rich Effect Gallery) */}
      <section className="py-24 bg-white relative border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-start relative min-h-screen gap-12 lg:gap-8">

            {/* Sticky Left Pillar */}
            <div className="w-full lg:w-2/5 lg:sticky lg:top-40 lg:pr-12 rtl:lg:pr-0 rtl:lg:pl-12 z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={springApple}
              >
                <div className="inline-block relative mb-8">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black font-display text-choco leading-[1.05] tracking-tighter">
                    {currentLang === 'ar' ? (
                      <>اختر نكهتك <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-glowPurple to-glowBlue">الساحرة.</span></>
                    ) : currentLang === 'ru' ? (
                      <>Выберите свой <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-glowPurple to-glowBlue">сладкий вкус.</span></>
                    ) : currentLang === 'fr' ? (
                      <>Choisissez votre <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-glowPurple to-glowBlue">saveur magique.</span></>
                    ) : (
                      <>Pick your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-glowPurple to-glowBlue">Flavor Magic.</span></>
                    )}
                  </h2>
                </div>
                <p className="text-xl text-mocha font-medium leading-relaxed max-w-md">
                  {currentLang === 'ar' ? 'استكشف أقسام حلوياتنا الاستثنائية. من المارشميلو الخفيف إلى المصاصات المقرمشة، كل قطعة تخبئ عالماً من السعادة.' :
                   currentLang === 'ru' ? 'Листайте вниз и открывайте наши фирменные категории сладостей. В каждой упаковке — частичка искренней радости.' :
                   currentLang === 'fr' ? 'Découvrez nos catégories de confiseries d’exception. Chaque sachet renferme un monde de gourmandise.' :
                   'Scroll down to discover our magical categories. From bouncy marshmallows to crunchy hard candies, every packet holds a tiny universe of joy.'}
                </p>
              </motion.div>
            </div>

            {/* Scrolling Right Gallery */}
            <div className="w-full lg:w-3/5 pb-12 flex flex-col space-y-12 md:space-y-24 z-10">
              {CATEGORIES.map((cat, index) => {
                const name = cat.name;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 100, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ margin: '-20%' }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    className="relative group w-full"
                  >
                    {/* Parallax numbering layout */}
                    <div className="absolute -top-12 -left-6 md:-left-12 rtl:-left-auto rtl:-right-6 rtl:md:-right-12 text-[120px] font-black font-display text-black/5 z-0 select-none pointer-events-none tracking-tighter">
                      0{index + 1}
                    </div>

                    <a
                      href={translatePath(`/category/${cat.id}`)}
                      className="relative z-10 flex flex-col justify-end h-80 md:h-[420px] w-full rounded-[3rem] overflow-hidden shadow-lg border border-white transition-all duration-700 bg-white group-hover:shadow-2xl block"
                    >
                      {/* Luminous Core Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.glow} opacity-[0.05] group-hover:opacity-100 transition-all duration-700`} />

                      <div className="absolute inset-0 p-8 pb-32 flex items-center justify-center pointer-events-none z-20">
                        <motion.img
                          src={cat.img}
                          alt={name}
                          className="w-full h-full object-contain max-h-[90%] filter drop-shadow-xl origin-center"
                          variants={{
                            initial: { y: 0, scale: 1, rotate: 0 },
                            hover: { y: -30, scale: 1.15, rotate: -5, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.2))' }
                          }}
                          initial="initial"
                          whileHover="hover"
                          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                        />
                      </div>

                      <div className="relative z-30 m-6 px-8 py-6 rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-sm transform group-hover:translate-y-2 transition-all duration-500 border border-white flex justify-between items-center">
                        <div>
                          <span className="block text-2xl md:text-3xl font-black font-display text-choco tracking-tight mb-1">
                            {name}
                          </span>
                          <span className="text-mocha font-medium">{cat.desc}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-choco group-hover:bg-choco group-hover:text-white transition-colors duration-300">
                          <svg className="w-5 h-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7-7m7 7H3" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
