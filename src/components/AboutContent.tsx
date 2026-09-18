import { motion, useScroll, useTransform } from 'framer-motion';

interface AboutContentProps {
  currentLang?: string;
}

const springApple = { type: 'spring' as const, stiffness: 200, damping: 12, mass: 0.8 };

export default function AboutContent({ currentLang = 'en' }: AboutContentProps) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-cream text-choco antialiased pt-40 lg:pt-48 pb-32 overflow-hidden relative">
      {/* Abstract Background geometry */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <motion.img
          style={{ y: yParallax, rotate: 15 }}
          src="/images/categories/minimal_jelly.svg"
          className="w-[800px] h-[800px] blur-[80px] opacity-20"
          alt="Abstract Jelly Blob"
        />
      </div>

      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springApple}
          className="mt-20 mb-32"
        >
          <h2 className="text-mocha font-black font-display tracking-widest uppercase text-sm mb-4">
            {currentLang === 'ar' ? 'قيمنا الجوهرية' :
             currentLang === 'ru' ? 'Наши ценности' :
             currentLang === 'fr' ? 'Nos Valeurs Fondamentales' :
             'Our Core Values'}
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black font-display tracking-tighter leading-[1.05]">
            {currentLang === 'ar' ? (
              <>صناعة <br/>البهجة والفرح.</>
            ) : currentLang === 'ru' ? (
              <>Инженерия <br/>счастья.</>
            ) : currentLang === 'fr' ? (
              <>Créateurs <br/>de bonheur.</>
            ) : (
              <>Engineering <br/>happiness.</>
            )}
          </h1>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={springApple}
          className="space-y-12 text-2xl md:text-3xl lg:text-[40px] leading-[1.3] font-medium tracking-tight text-mocha"
        >
          <p className="text-choco">
            {currentLang === 'ar' ? 'نؤمن بأن قطعة حلوى واحدة وبسيطة تمتلك قوة عميقة لإدخال السرور على قلوب الناس حول العالم.' :
             currentLang === 'ru' ? 'Мы верим, что даже маленькая конфета способна подарить человеку мгновение искренней радости.' :
             currentLang === 'fr' ? 'Nous croyons qu’une simple confiserie a le pouvoir de réchauffer les cœurs et d’illuminer les sourires.' :
             'We believe that a simple piece of candy holds the profound power to elevate the human experience.'}
          </p>
          <p>
            {currentLang === 'ar' ? 'انطلقت حلويات هولون من رؤية ملهمة تمزج بين روعة المذاق وتناسق الأشكال الفنية ومتعة التذوق الخالصة، دون أي مساومة على الجودة.' :
             currentLang === 'ru' ? 'Компания Hulun Sweets была создана на стыке изысканного вкуса, безупречной формы и радости. Никаких компромиссов.' :
             currentLang === 'fr' ? 'Née d’une vision d’excellence, Hulun Sweets allie goût d’exception, esthétique ludique et plaisir absolu, sans aucun compromis.' :
             'Started as a visionary dream, Hulun Sweets focuses on the intersection of taste, geometry, and pure joy. No compromises. Just absolute perfection in every bite.'}
          </p>
          <p>
            {currentLang === 'ar' ? 'من النعومة الفائقة للمارشميلو إلى الانفجار اللذيذ لنكهات الفواكه في حلوى الجيلي، نصنع كل صنف ليرسم ابتسامة لا تُنسى.' :
             currentLang === 'ru' ? 'От воздушной мягкости маршмеллоу до сочных фруктовых мармеладок — каждая наша сладость создана для вашей улыбки.' :
             currentLang === 'fr' ? 'De la tendresse aérienne de nos guimauves aux éclats fruités de nos gélifiés, chaque bonbon est une promesse d’émerveillement.' :
             'From the pillowy softness of our marshmallows to the vibrant flavors of our fruit jellies, we craft every sweet to bring a smile to your face.'}
          </p>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={springApple}
          className="mt-32 pt-16 border-t border-black/10"
        >
          <h3 className="text-4xl font-black font-display tracking-tighter mb-4 text-choco">
            {currentLang === 'ar' ? 'المستقبل أكثر حلاوة.' :
             currentLang === 'ru' ? 'Будущее будет сладким.' :
             currentLang === 'fr' ? 'L’avenir sera doux.' :
             'The future is sweet.'}
          </h3>
          <p className="text-xl text-mocha font-medium">
            {currentLang === 'ar' ? 'شاركونا الرحلة لنجعل العالم مكاناً أكثر لطفاً وحلاوة وسعادة.' :
             currentLang === 'ru' ? 'Присоединяйтесь к нам, чтобы сделать этот мир чуточку добрее и слаще.' :
             currentLang === 'fr' ? 'Rejoignez-nous pour rendre le monde un peu plus doux et chaleureux.' :
             'Join us in making the world a slightly better, vastly sweeter place.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
