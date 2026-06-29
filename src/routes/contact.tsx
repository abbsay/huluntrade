import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useI18n } from '../i18n'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: [
      { title: 'Contact Us — Hulun Sweets' },
      { name: 'description', content: 'Get in touch with Hulun Sweets! Contact us for inquiries about candy customization, OEM bulk orders, distribution partnerships, or just to say hello!' },
    ],
  }),
})

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const infoCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
}

const formCardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 22,
      delay: 0.15,
    },
  },
}

const successVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 18 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: -10,
    transition: { duration: 0.25 },
  },
}

const springTap = { scale: 0.94, transition: { type: 'spring', stiffness: 400, damping: 10 } }

const iconHover = { scale: 1.18, rotate: 6, transition: { type: 'spring', stiffness: 400, damping: 10 } }

// ─── Contact Info Items ───────────────────────────────────────────────────────

const infoItems = [
  {
    gradient: 'from-pink-400 to-rose-400',
    shadow: 'shadow-sm border border-black/5',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Hulun Sweets',
    body: <p className="text-mocha">Yiwu, Zhejiang, China</p>,
  },
  {
    gradient: 'from-blue-400 to-indigo-500',
    shadow: 'shadow-sm border border-black/5',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    titleKey: 'contact.mobile_title',
    titleFallback: 'Phone & WeChat',
    body: (
      <div className="mt-1 space-y-1">
        <p className="bg-white/60 inline-block px-3 py-1 rounded-md text-choco font-mono text-sm border border-black/10">
          13967427888 / 17758069907
        </p>
        <p className="text-mocha block pt-1">+86 13967427888</p>
      </div>
    ),
  },
  {
    gradient: 'from-purple-400 to-fuchsia-500',
    shadow: 'shadow-sm border border-black/5',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    titleKey: 'contact.email_title',
    titleFallback: 'Email',
    body: (
      <a
        href="mailto:Van001@huluntrade.com"
        className="text-mocha hover:text-strawberry transition-colors underline decoration-apple-blue/30 underline-offset-4 mt-1 block"
      >
        Van001@huluntrade.com
      </a>
    ),
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

function Contact() {
  const { t } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed || status === 'loading') return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
        setAgreed(false)
        // Trigger confetti burst on success!
        
      } else {
        setStatus('error')
        setErrorMessage(data.error || t('contact.error', 'Failed to send message.'))
      }
    } catch {
      setStatus('error')
      setErrorMessage(t('contact.error', 'An error occurred. Please try again.'))
    }
  }

    return (
    <main className="min-h-screen bg-cream relative overflow-hidden pt-40 lg:pt-48 pb-32 flex justify-center">

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">

          {/* ── Left Panel: Contact Information ── */}
          <div className="lg:col-span-5 pt-4">

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl font-black font-display tracking-tighter text-choco leading-[1.1] mb-8"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0}
            >
              Let's Talk Sweet Business.
            </motion.h1>

            <motion.p
              className="text-lg text-mocha mb-14 leading-[1.6] text-xl font-medium"
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
                  className="flex items-center gap-6 py-3"
                  variants={infoCardVariants}
                  custom={i}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-white text-choco flex items-center justify-center border border-black/5 flex-shrink-0"
                    whileHover={iconHover}
                    whileTap={springTap}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-black font-display text-choco text-lg">
                      {item.titleKey ? t(item.titleKey, item.titleFallback) : item.title}
                    </h3>
                    {item.body}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Panel: Contact Form ── */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 lg:p-14 w-full"
              variants={formCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                className="text-2xl font-black font-display tracking-tighter text-choco mb-8"
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
                    <label className="text-sm font-black font-display text-choco ml-1">
                      {t('contact.name', 'Your Name')}*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-mocha/50">
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
                        className="w-full bg-white border border-transparent text-choco rounded-2xl focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue outline-none block pl-12 py-4 transition-all disabled:opacity-50 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-black font-display text-choco ml-1">
                      {t('contact.email', 'Your Email')}*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-mocha/50">
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
                        className="w-full bg-white border border-transparent text-choco rounded-2xl focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue outline-none block pl-12 py-4 transition-all disabled:opacity-50 shadow-sm"
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
                  <label className="text-sm font-black font-display text-choco ml-1">
                    {t('contact.phone', 'Phone Number')}{' '}
                    <span className="text-mocha/60 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-mocha/50">
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
                      className="w-full bg-white border border-transparent text-choco rounded-2xl focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue outline-none block pl-12 py-4 transition-all disabled:opacity-50 shadow-sm"
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
                  <label className="text-sm font-black font-display text-choco ml-1">
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
                      className="w-full bg-white border border-transparent text-choco rounded-2xl focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue outline-none block p-5 transition-all disabled:opacity-50 resize-y shadow-sm"
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
                      className="w-5 h-5 bg-cream border-black/20 rounded text-strawberry focus:ring-apple-blue/30 transition-colors disabled:opacity-50 cursor-pointer"
                      required
                    />
                  </div>
                  <label htmlFor="privacy_agree" className="ms-3 text-sm text-mocha font-medium cursor-pointer">
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
