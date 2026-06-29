const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'src', 'routes', 'contact.tsx');
let code = fs.readFileSync(contactPath, 'utf8');

// I see the disaster!
// In the previous replace script (`fix_contact_layout.cjs`), I ran:
// code.replace(/\{\/\* Decorative blobs.*?<\/motion\.div>/gs, ''); 
// The problem is `.*` in `.*?` with `s` flag spans across lines.
// It matched ALL THE WAY from `{/* Decorative blobs` DOWN TO THE END OF THE INFO ITEMS `</motion.div>`!
// It completely DELETED half of the page rendering logic (including the <div className="max-w-[1200px]...">).
// This is why ESLint is screaming about missing closing tags.

// Let's restore the entire rendering block by overwriting the `return (...)` with a safe, pristine layout.

const correctReturnBlock = `  return (
    <main className="min-h-screen bg-apple-bg relative overflow-hidden pt-32 pb-24 flex justify-center">

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── Left Panel: Contact Information ── */}
          <div className="lg:col-span-2">

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl font-semibold tracking-tighter text-apple-text leading-[1.1] mb-6"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0}
            >
              Let's Talk Sweet Business.
            </motion.h1>

            <motion.p
              className="text-lg text-apple-sub mb-10 leading-[1.8] font-medium"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={1}
            >
              We'd love to hear from you. Whether you're interested in distributing our candies, customizing bulk orders, or just want to report how sweet your day was.
            </motion.p>

            {/* Info cards — staggered */}
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-5 p-4 rounded-2xl hover:bg-apple-card/50 transition-colors duration-300"
                  variants={infoCardVariants}
                  custom={i}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-apple-card text-apple-text flex items-center justify-center shadow-sm border border-black/5 flex-shrink-0"
                    whileHover={iconHover}
                    whileTap={springTap}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-apple-text text-lg">
                      {item.titleKey ? t(item.titleKey, item.titleFallback) : item.title}
                    </h3>
                    {item.body}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Panel: Contact Form ── */}
          <div className="lg:col-span-3 w-full">
            <motion.div
              className="bg-apple-card/50 rounded-[2.5rem] shadow-sm border border-black/5 p-8 lg:p-12 w-full"
              variants={formCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                className="text-2xl font-semibold tracking-tighter text-apple-text mb-8"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={0}
              >
                Send us a message.
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-6 w-full">

                {/* Name + Email row */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={1}
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-apple-text ml-1">
                      {t('contact.name', 'Your Name')}*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-apple-sub/50">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-apple-bg border border-black/10 text-apple-text rounded-xl focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue outline-none block pl-11 p-3 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-apple-text ml-1">
                      {t('contact.email', 'Your Email')}*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-apple-sub/50">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-apple-bg border border-black/10 text-apple-text rounded-xl focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue outline-none block pl-11 p-3 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="space-y-2"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={2}
                >
                  <label className="text-sm font-semibold text-apple-text ml-1">
                    {t('contact.phone', 'Phone Number')}{' '}
                    <span className="text-apple-sub/60 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-apple-sub/50">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="w-full bg-apple-bg border border-black/10 text-apple-text rounded-xl focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue outline-none block pl-11 p-3 transition-all disabled:opacity-50"
                    />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  className="space-y-2"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={3}
                >
                  <label className="text-sm font-semibold text-apple-text ml-1">
                    {t('contact.message', 'Your Message')}*
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-apple-bg border border-black/10 text-apple-text rounded-xl focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue outline-none block p-4 transition-all disabled:opacity-50 resize-y"
                    />
                  </div>
                </motion.div>

                {/* Privacy checkbox */}
                <motion.div
                  className="flex items-start"
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={4}
                >
                  <div className="flex items-center h-5">
                    <input
                      id="privacy_agree"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      disabled={status === 'loading'}
                      className="w-5 h-5 bg-apple-bg border-black/20 rounded text-apple-blue focus:ring-apple-blue/30 transition-colors disabled:opacity-50 cursor-pointer"
                      required
                    />
                  </div>
                  <label htmlFor="privacy_agree" className="ms-3 text-sm text-apple-sub font-medium cursor-pointer">
                    {t('contact.privacy_agree', 'I agree that my submitted data is being collected and stored.')}
                  </label>
                </motion.div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-start gap-3"
                      variants={successVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <span className="text-xl">✅</span>
                      <p className="font-bold">
                        {t('contact.success', 'Message sent successfully! We will get back to you soon.')}
                      </p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      key="error"
                      className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3"
                      variants={successVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <span className="text-xl">❌</span>
                      <p className="font-bold">{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.div
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={5}
                >
                  <motion.button
                    type="submit"
                    disabled={!agreed || status === 'loading'}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-apple-text text-white font-medium text-lg disabled:bg-black/20 disabled:cursor-not-allowed border border-black/5 flex justify-center items-center gap-2"
                    whileHover={
                      agreed && status !== 'loading'
                        ? { scale: 1.02, backgroundColor: '#000000' }
                        : {}
                    }
                    whileTap={
                      agreed && status !== 'loading'
                        ? { scale: 0.95 }
                        : {}
                    }
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        {t('contact.sending', 'Sending...')}
                      </>
                    ) : (
                      <>
                        {t('contact.send', 'Send Message')}
                      </>
                    )}
                  </motion.button>
                </motion.div>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  )
}
`

// Regex to replace everything from `return (` inside Contact to the end
const brokenReturnRegex = /return \([\s\S]*?\}\s*$/;
code = code.replace(brokenReturnRegex, correctReturnBlock);

fs.writeFileSync(contactPath, code);
console.log("Contact catastrophic syntax meltdown fixed and fully restored.");
