const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'routes', 'product.$productId.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// I will precisely replace the whole return block inside ProductDetail
const returnIndex = code.lastIndexOf('  return (\n    <main className={`min-h-[90vh] ${theme.bg}');
if (returnIndex === -1) {
    console.log("Could not find the return block, trying fallback regex.");
}

const newReturnBlock = `  return (
    <main className={\`min-h-[90vh] \${theme.bg} pt-32 md:pt-40 pb-32 relative overflow-hidden\`}>

      {/* Playful Floating Geometry */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-70 rounded-full mix-blend-overlay filter blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-white opacity-50 rounded-full mix-blend-overlay filter blur-[60px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <Magnetic>
            <motion.button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md text-mocha shadow-sm border border-choco/5 font-bold text-sm w-fit"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(61,44,35,0.06)' }}
              whileTap={springTap}
              transition={springTransition}
            >
              <span className="rtl:rotate-180">←</span> {t('product_details.back_to_categories', 'Back')}
            </motion.button>
          </Magnetic>
        </motion.div>

        {/* Unified Monolithic Card */}
        <motion.div
          className="flex flex-col lg:flex-row bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(61,44,35,0.08)] border border-white overflow-hidden"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.08 }}
        >
          {/* Left: Product Image Area */}
          <div className={\`relative w-full lg:w-1/2 p-10 md:p-16 flex items-center justify-center min-h-[400px] lg:min-h-[600px] \${theme.imgBg}\`}>
            {/* Subtle inner animated ring */}
            <div className="absolute inset-0 border-2 border-dashed border-choco/10 rounded-[2.5rem] m-6 md:m-10 opacity-30 animate-[spin_60s_linear_infinite] pointer-events-none" />

            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[450px] object-contain filter drop-shadow-2xl relative z-10"
              whileHover={{ scale: 1.1, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 16 }}
            />

            {/* Cute badge */}
            <motion.div
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-white p-3.5 rounded-2xl shadow-lg border border-choco/5 z-20"
              aria-hidden="true"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              whileHover={{ scale: 1.2, rotate: 12 }}
            >
              <img src="/images/categories/minimal_jelly.svg" className="w-8 h-8 object-contain drop-shadow-sm" alt="sweet" />
            </motion.div>
          </div>

          {/* Right: Product Info Area */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">

            {/* Category badge */}
            <motion.span
              className={\`inline-block px-5 py-2 rounded-full bg-white shadow-sm border border-choco/5 text-xs font-bold tracking-widest uppercase mb-8 w-fit \${theme.accent}\`}
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUpVariants}
            >
              {product.categoryId?.replace('_', ' ') || 'Special'}
            </motion.span>

            {/* Product name */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-[54px] font-black font-display text-choco tracking-tight leading-[1.05] mb-6"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUpVariants}
            >
              {product.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-mocha font-medium leading-[1.8] mb-12"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUpVariants}
            >
              {product.description}
            </motion.p>

            {/* Specs Cards */}
            <motion.div
              className="space-y-4 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={specContainerVariants}
            >
              <div className="flex flex-col sm:flex-row gap-4">

                {/* Weight Spec */}
                <motion.div
                  className="flex-1 bg-cream/50 rounded-[1.5rem] p-5 flex items-center gap-5 border border-choco/5"
                  variants={specItemVariants}
                  whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(61,44,35,0.06)' }}
                  transition={springTransition}
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl">
                    <img src="/images/categories/minimal_hard_candy.svg" className="w-6 h-6 object-contain"/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-mocha/60 uppercase tracking-widest">{t('product_details.weight', 'Weight')}</div>
                    <div className="text-choco font-black font-display text-xl">{product.weight || '35g'}</div>
                  </div>
                </motion.div>

                {/* Packaging Spec */}
                <motion.div
                  className="flex-1 bg-cream/50 rounded-[1.5rem] p-5 flex items-center gap-5 border border-choco/5"
                  variants={specItemVariants}
                  whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(61,44,35,0.06)' }}
                  transition={springTransition}
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl">
                    <img src="/images/categories/minimal_toy.svg" className="w-6 h-6 object-contain"/>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-[11px] font-bold text-mocha/60 uppercase tracking-widest">{t('product_details.packaging', 'Packaging')}</div>
                    <div className="text-choco font-black font-display text-xl truncate">{product.packaging || 'Standard Box'}</div>
                  </div>
                </motion.div>
              </div>

              {/* Features Spec */}
              {product.features && product.features.length > 0 && (
                <motion.div
                  className="bg-cream/50 rounded-[1.5rem] p-6 border border-choco/5 mt-4"
                  variants={specItemVariants}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-sm">✨</div>
                    <span className="font-bold text-choco tracking-widest uppercase text-[12px]">{t('product_details.features', 'Sweet Highlights')}</span>
                  </div>
                  <motion.ul
                    className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 text-mocha font-medium"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={featureListVariants}
                  >
                    {product.features.map((f: string, i: number) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3"
                        variants={featureItemVariants}
                      >
                        <img src="/images/categories/minimal_marshmallow.svg" className="w-5 h-5 object-contain filter drop-shadow-sm flex-shrink-0" />
                        <span className="text-[15px] leading-tight">{f}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </motion.div>

            {/* Action Button */}
            <motion.div
              className="mt-auto pt-6 border-t border-choco/10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.32 }}
            >
              <motion.div
                whileHover={springHover}
                whileTap={springTap}
                transition={springTransition}
                className="inline-block w-full sm:w-auto"
              >
                <Link
                  to="/contact"
                  className={\`flex items-center justify-center w-full sm:w-auto px-10 py-5 rounded-full font-black font-display tracking-wide text-[17px] shadow-xl jelly-highlight transition-all duration-300 text-white \${theme.btn} \${theme.shadow}\`}
                >
                  {t('product_details.inquire_button', 'Ask About This Sweet')} <img src="/images/categories/minimal_jelly.svg" className="w-6 h-6 ml-2 object-contain filter drop-shadow-sm" />
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </main>
  );
}
`;

if (returnIndex !== -1) {
  code = code.substring(0, returnIndex) + newReturnBlock;
} else {
  // Fallback regex replacement for safety
  const replaceRegex = /  return \(\n    <main className=\{`min-h-\[90vh\].*?\n\s*\}\n/s;
  code = code.replace(replaceRegex, newReturnBlock + '\n');
}

fs.writeFileSync(filePath, code);
console.log("Monolithic unified Product Detail card applied!");
