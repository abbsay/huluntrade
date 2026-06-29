const fs = require('fs');
const path = require('path');

const indexTsxPath = path.join(__dirname, 'src', 'routes', 'index.tsx');
let code = fs.readFileSync(indexTsxPath, 'utf8');

// 1. Remove the old separate linear sections and combine them into a massive Bento Grid
// Old Section 2: "Brand Sweet Intro"
// Old Section 3: "Sweet Statistics Strip"
// Old Section 4: "Partner Brands Slider"

// We will target everything from `<section className="py-20 md:py-32 bg-white relative overflow-hidden">`
// up to (but not including) `{/* 5. Product Categories Grid */}`
const oldSectionsRegex = /\{\/\* 2\. Brand Sweet Intro \*\/\}[\s\S]*?(?=\{\/\* 5\. Product Categories Grid \*\/})/s;

const bentoBoxHTML = `{/* 2. Apple-Style Bento Box (Features + Stats + Partners) */}
      <section className="py-24 md:py-32 relative bg-cream overflow-hidden">
        {/* Dynamic Abstract Background Blobs for Bento */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-strawberry/20 rounded-full mix-blend-multiply blur-[80px] opacity-60 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[auto]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            
            {/* BENTO 1: Left Main Hero (Span 2 cols on Desktop, 2 cols on tablet) */}
            <motion.div
              variants={staggerChild}
              className="md:col-span-2 lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(61,44,35,0.06)] border border-choco/5 flex flex-col justify-center relative overflow-hidden group"
            >
              {/* Internal Accent Blob */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full mix-blend-overlay blur-2xl opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream text-mocha font-bold text-sm tracking-wide shadow-sm border border-mocha/10 w-max mb-6">
                <span className="animate-pulse">✨</span> Welcome to Hulun Candy Shop
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black font-display text-choco leading-[1.05] tracking-tight mb-6 relative z-10">
                Delicious, Colorful &{' '}
                <span className="text-strawberry drop-shadow-sm">Playful Sweets</span><br/>
                For Everyone
              </h1>
              <p className="text-lg md:text-xl text-mocha/80 leading-[1.8] font-sans max-w-xl font-medium mb-10 relative z-10">
                We bring you a delightful range of handpicked marshmallow clouds, juicy jellies, sweet lollipops, and creative candy toys. Our sweets are made to bring pure joy!
              </p>
              
              <div className="flex flex-wrap items-center gap-4 relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/products" className="inline-flex px-8 py-4 rounded-full bg-choco text-cream font-bold text-lg shadow-xl shadow-mocha/20 hover:bg-mocha transition-all jelly-highlight">
                    Explore Sweets 🎪
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/contact" className="inline-flex px-8 py-4 rounded-full bg-cream text-choco font-black text-lg border-2 border-white shadow-md hover:brightness-95 transition-all jelly-highlight-ghost">
                    Say Hello 🍬
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* BENTO 2: Right Vertical Features (Span 1 col, Row span 2 logic via tall height) */}
            <motion.div
              variants={staggerChild}
              className="md:col-span-1 lg:col-span-1 md:row-span-2 bg-gradient-to-b from-strawberry to-pink-400 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_40px_-15px_rgba(255,107,157,0.3)] border border-white/20 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl opacity-20 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6 flex-grow">
                <h3 className="text-3xl font-black font-display text-white mb-6 leading-tight drop-shadow-md">
                  Why You'll Love Us 🍭
                </h3>
                
                <ul className="space-y-6">
                  {[
                    { title: 'Super Yummy', desc: 'Mouth-watering flavors & fluffy textures', icon: '😋' },
                    { title: 'Beautiful & Cute', desc: 'Adorable shapes and vibrant colors', icon: '🎀' },
                    { title: 'Safe & Pure', desc: 'High-quality safe ingredients carefully crafted', icon: '🛡️' },
                  ].map((feature, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-sm transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                        {feature.icon}
                      </span>
                      <div>
                        <strong className="block text-lg font-bold font-display text-white mb-1 drop-shadow-sm">
                          {feature.title}
                        </strong>
                        <span className="text-white/80 leading-snug font-medium text-sm block pr-2">{feature.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* BENTO 3: Tall Vertical Trust/Stats Grid (Span 1 col) */}
            <motion.div
              variants={staggerChild}
              className="md:col-span-1 lg:col-span-1 bg-white rounded-[2.5rem] p-6 shadow-[0_15px_30px_-10px_rgba(61,44,35,0.05)] border border-choco/5 flex flex-col justify-center"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 h-full">
                {trustItems.map((item, i) => (
                  <motion.div 
                    key={item.label}
                    className={\`rounded-3xl p-5 flex flex-col items-center justify-center text-center \${i%2===0 ? 'bg-blue-50/50' : 'bg-yellow-50/50'}\`}
                    whileHover={{ scale: 1.03, y: -2 }}
                  >
                    <div className="text-3xl font-black font-display text-choco drop-shadow-sm mb-1">{item.value}</div>
                    <div className="text-[11px] font-bold text-mocha/70 uppercase tracking-widest">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* BENTO 4: Wide Partner Logo Strip (Span 2 cols on Desktop) */}
            <motion.div
              variants={staggerChild}
              className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-cream to-white rounded-[2.5rem] p-8 shadow-[0_15px_30px_-10px_rgba(61,44,35,0.05)] border border-choco/5 flex flex-col sm:flex-row items-center gap-8 overflow-hidden"
            >
              <div className="sm:w-1/3 flex-shrink-0 text-center sm:text-start">
                <h3 className="text-2xl font-black font-display text-choco mb-2">Our Sweet Friends</h3>
                <p className="text-sm font-medium text-mocha/80 leading-relaxed">
                  Trusted by brands worldwide to deliver shared happiness and joyful candies!
                </p>
              </div>
              <div className="sm:w-2/3 w-full border-l border-mocha/10 pl-0 sm:pl-8 py-2">
                {/* Embedded Logo Slider right inside the Bento Box! */}
                <div className="scale-90 origin-left">
                  <LogoSlider />
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      `;

code = code.replace(oldSectionsRegex, bentoBoxHTML);

// 2. Next, modify Section 5 "Product Categories Grid" to be a Sticky Editorial Scroll layout
const oldCategoriesRegex = /\{\/\* 5\. Product Categories Grid \*\/\}[\s\S]*?(?=\{\/\* 6\. Featured Products Grid \*\/})/s;

const stickyGalleryHTML = `{/* 5. Sticky Editorial Category Gallery */}
      <section className="py-0 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-start relative min-h-screen lg:py-32 py-24 gap-12 lg:gap-8">
            
            {/* Sticky Left Pillar */}
            <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:pr-12 pt-8 z-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
              >
                <div className="inline-block relative mb-8">
                  <span className="absolute -top-6 -left-6 w-20 h-20 bg-strawberry rounded-full blur-[40px] opacity-40 z-0"></span>
                  <p className="text-strawberry font-bold tracking-widest uppercase text-sm mb-4 relative z-10">Sweet Collections</p>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black font-display text-choco leading-[1.1] tracking-tight relative z-10 selection:bg-strawberry selection:text-white">
                    Pick Your<br/>Flavor <span className="text-transparent bg-clip-text bg-gradient-to-r from-strawberry to-orange-400">Magic</span>
                  </h2>
                </div>
                <p className="text-xl text-mocha/80 font-sans font-medium leading-[1.8] max-w-md">
                  Scroll down to discover our magical categories. From bouncy marshmallows to crunchy hard candies, every packet holds a tiny universe of joy.
                </p>
                
                {/* Arrow Prompt */}
                <motion.div 
                  className="hidden lg:flex mt-12 w-16 h-16 rounded-full border-2 border-mocha/10 items-center justify-center text-mocha/50"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Scrolling Right Gallery */}
            <div className="w-full lg:w-3/5 pb-12 flex flex-col space-y-12 md:space-y-24 z-10">
              {CATEGORIES.map((cat, index) => {
                const name = t(\`products_page.\${cat.id}\`);
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 100, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ margin: '-20%' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="relative group w-full"
                  >
                    {/* Parallax numbering layout */}
                    <div className="absolute -top-12 -left-6 md:-left-12 text-[120px] font-black font-display text-choco/5 z-0 select-none pointer-events-none">
                      0{index + 1}
                    </div>

                    {/* Luminous Diffuse Glow */}
                    <motion.div 
                      className={\`absolute inset-0 bg-gradient-to-br \${cat.barColor} blur-[60px] opacity-0 z-0 transition-opacity duration-1000 group-hover:opacity-40\`} 
                      style={{ transform: 'scale(0.85) translateY(20px)' }}
                    />

                    <Link
                      to={\`/category/\${cat.id}\`}
                      aria-label={name}
                      className="relative z-10 flex flex-col justify-end h-80 md:h-[420px] w-full rounded-[3rem] overflow-visible shadow-[0_30px_60px_-20px_rgba(61,44,35,0.12)] border border-choco/5 transition-all duration-700 bg-white"
                    >
                      <div className={\`absolute inset-0 rounded-[3rem] bg-gradient-to-br \${cat.barColor} opacity-[0.04] group-hover:opacity-100 transition-all duration-700 overflow-hidden\`}>
                        <div className="absolute inset-0 bg-white opacity-100 group-hover:opacity-0 transition-opacity duration-700 delay-100" />
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white opacity-25 rounded-full mix-blend-overlay group-hover:scale-[2.5] transition-transform duration-[1200ms] ease-out delay-75" />
                      </div>

                      <div className="absolute inset-0 p-8 pb-28 flex items-center justify-center pointer-events-none z-20">
                        {/* Escaping Image */}
                        <motion.img
                          src={cat.img}
                          alt={name}
                          className="w-full h-full object-contain max-h-[90%] filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] origin-center"
                          variants={{
                            initial: { y: 0, scale: 1, rotate: 0 },
                            hover: { y: -50, scale: 1.15, rotate: -5, filter: 'drop-shadow(0 45px 35px rgba(0,0,0,0.3))' }
                          }}
                          initial="initial"
                          whileHover="hover"
                          transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                        />
                      </div>

                      <div className="relative z-30 m-6 px-8 py-6 rounded-[2rem] bg-white/95 backdrop-blur-md shadow-xl transform group-hover:translate-y-4 group-hover:-rotate-1 transition-all duration-700 border border-white flex justify-between items-center">
                        <span className="block text-2xl md:text-3xl font-black font-display text-choco tracking-wide uppercase transition-colors">
                          {name}
                        </span>
                        <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-strawberry group-hover:bg-strawberry group-hover:text-white transition-colors duration-500 shadow-sm">
                          <svg className="w-5 h-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7-7m7 7H3" /></svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      `;

code = code.replace(oldCategoriesRegex, stickyGalleryHTML);

fs.writeFileSync(indexTsxPath, code);

console.log("Bento Box and Sticky Layouts created successfully!");
