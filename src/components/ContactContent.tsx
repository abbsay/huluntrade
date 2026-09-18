import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useTranslations } from '../i18n';
import confetti from 'canvas-confetti';

interface ContactContentProps {
  currentLang?: string;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 280,
      damping: 22,
    },
  }),
};

const infoCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
    },
  }),
};

const formCardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 220,
      damping: 22,
      delay: 0.15,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 18 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: -10,
    transition: { duration: 0.25 },
  },
};

const springTap = { scale: 0.94, transition: { type: 'spring' as const, stiffness: 400, damping: 10 } };
const iconHover = { scale: 1.18, rotate: 6, transition: { type: 'spring' as const, stiffness: 400, damping: 10 } };

export default function ContactContent({ currentLang = 'en' }: ContactContentProps) {
  const t = useTranslations(currentLang);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      if (typeof window !== 'undefined') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
      setAgreed(false);
    } catch {
      setStatus('error');
      setErrorMessage(t('contact.error', 'An error occurred. Please try again.'));
    }
  };

  const infoItems = [
    {
      gradient: 'from-pink-400 to-rose-400',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Hulun Sweets',
      body: <p className="text-mocha">{currentLang === 'ar' ? 'إيوو، تشجيانغ، الصين' : currentLang === 'ru' ? 'Иу, Чжэцзян, Китай' : currentLang === 'fr' ? 'Yiwu, Zhejiang, Chine' : 'Yiwu, Zhejiang, China'}</p>,
    },
    {
      gradient: 'from-blue-400 to-indigo-500',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: currentLang === 'ar' ? 'الهاتف وواتساب' : currentLang === 'ru' ? 'Телефон и WeChat' : currentLang === 'fr' ? 'Téléphone & WhatsApp' : 'Phone & WhatsApp',
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
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: currentLang === 'ar' ? 'البريد الإلكتروني' : currentLang === 'ru' ? 'Электронная почта' : currentLang === 'fr' ? 'E-mail Direct' : 'Email',
      body: (
        <a
          href="mailto:Van001@huluntrade.com"
          className="text-mocha hover:text-strawberry transition-colors underline decoration-strawberry/30 underline-offset-4 mt-1 block"
        >
          Van001@huluntrade.com
        </a>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden pt-40 lg:pt-48 pb-32 flex justify-center">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
          {/* Left Panel: Contact Information */}
          <div className="lg:col-span-5 pt-4">
            <motion.h1
              className="text-4xl md:text-5xl font-black font-display tracking-tighter text-choco leading-[1.1] mb-8"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0}
            >
              {currentLang === 'ar' ? 'تواصل معنا في عالم الحلوى.' :
               currentLang === 'ru' ? 'Давайте обсудим сладкий бизнес.' :
               currentLang === 'fr' ? 'Parlons de confiserie avec passion.' :
               "Let's Talk Sweet Business."}
            </motion.h1>

            <motion.p
              className="text-lg text-mocha mb-14 leading-[1.6] text-xl font-medium"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={1}
            >
              {currentLang === 'ar' ? 'يسعدنا دائماً التحدث معك، سواء كنت مهتماً بتوزيع حلوياتنا أو تخصيص طلبات الجملة OEM أو طلب العينات.' :
               currentLang === 'ru' ? 'Будем рады сотрудничеству! Дистрибуция сладостей, оптовые партии под заказ (OEM) или консультации.' :
               currentLang === 'fr' ? 'Nous serions ravis d’échanger avec vous: distribution, commandes OEM personnalisées ou demandes d’échantillons.' :
               "We'd love to hear from you. Whether you're interested in distributing our candies, customizing bulk orders, or just want to report how sweet your day was."}
            </motion.p>

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
                      {item.title}
                    </h3>
                    {item.body}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Panel: Interactive Form */}
          <motion.div
            className="lg:col-span-7 bg-white/80 backdrop-blur-2xl rounded-[3rem] p-8 sm:p-12 border border-white shadow-[0_20px_40px_-15px_rgba(61,44,35,0.08)]"
            variants={formCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success-msg"
                  className="text-center py-16"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="text-7xl block mb-6">🎉</span>
                  <h2 className="text-3xl font-black font-display text-choco mb-4">
                    {currentLang === 'ar' ? 'تم استلام رسالتك بنجاح!' :
                     currentLang === 'ru' ? 'Ваше сообщение отправлено!' :
                     currentLang === 'fr' ? 'Message envoyé avec succès !' :
                     'Message Sent Sweetly!'}
                  </h2>
                  <p className="text-mocha text-lg max-w-sm mx-auto mb-8 font-medium">
                    {currentLang === 'ar' ? 'سيتواصل معك فريق التصدير في أسرع وقت.' :
                     currentLang === 'ru' ? 'Наши специалисты свяжутся с вами в ближайшее время.' :
                     currentLang === 'fr' ? 'Notre équipe commerciale vous répondra dans les plus brefs délais.' :
                     'Our sweet team will get back to you shortly.'}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-cream rounded-full text-choco font-bold text-sm hover:bg-strawberry hover:text-white transition-colors"
                  >
                    {currentLang === 'ar' ? 'إرسال رسالة أخرى' :
                     currentLang === 'ru' ? 'Отправить еще' :
                     currentLang === 'fr' ? 'Nouveau message' :
                     'Send Another Message'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-mocha mb-2">
                      {currentLang === 'ar' ? 'الاسم الكامل' : currentLang === 'ru' ? 'Ваше имя' : currentLang === 'fr' ? 'Nom complet' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={currentLang === 'ar' ? 'مثال: محمد' : 'e.g. Candy Lover'}
                      className="w-full px-5 py-4 bg-cream/50 rounded-2xl border border-choco/5 focus:bg-white focus:ring-2 focus:ring-strawberry/30 outline-none transition-all text-choco font-medium text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-mocha mb-2">
                        {currentLang === 'ar' ? 'البريد الإلكتروني' : currentLang === 'ru' ? 'Электронная почта' : currentLang === 'fr' ? 'E-mail' : 'Email'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="van@huluntrade.com"
                        className="w-full px-5 py-4 bg-cream/50 rounded-2xl border border-choco/5 focus:bg-white focus:ring-2 focus:ring-strawberry/30 outline-none transition-all text-choco font-medium text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-mocha mb-2">
                        {currentLang === 'ar' ? 'رقم الهاتف / واتساب' : currentLang === 'ru' ? 'Телефон / WhatsApp' : currentLang === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+86 139..."
                        className="w-full px-5 py-4 bg-cream/50 rounded-2xl border border-choco/5 focus:bg-white focus:ring-2 focus:ring-strawberry/30 outline-none transition-all text-choco font-medium text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-mocha mb-2">
                      {currentLang === 'ar' ? 'رسالتك أو استفسارك' : currentLang === 'ru' ? 'Ваше сообщение' : currentLang === 'fr' ? 'Votre message' : 'Your Message'}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={currentLang === 'ar' ? 'اكتب تفاصيل طلبك أو المنتجات التي ترغب بالاستفسار عنها...' : 'Tell us about your candy distribution or OEM inquiries...'}
                      className="w-full px-5 py-4 bg-cream/50 rounded-2xl border border-choco/5 focus:bg-white focus:ring-2 focus:ring-strawberry/30 outline-none transition-all text-choco font-medium text-base resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="agreed"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-5 h-5 rounded-md accent-strawberry cursor-pointer"
                    />
                    <label htmlFor="agreed" className="text-xs text-mocha font-medium cursor-pointer">
                      {currentLang === 'ar' ? 'أوافق على سياسة الخصوصية والتواصل التجاري.' :
                       currentLang === 'ru' ? 'Я согласен с обработкой контактных данных.' :
                       currentLang === 'fr' ? 'J’accepte la politique de confidentialité.' :
                       'I agree to the privacy policy and commercial communication.'}
                    </label>
                  </div>

                  {status === 'error' && (
                    <p className="text-sm font-bold text-rose-500 bg-rose-50 p-3 rounded-xl">
                      {errorMessage}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={!agreed || status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-2xl font-black font-display text-lg tracking-wide text-white transition-all shadow-lg ${
                      agreed
                        ? 'bg-strawberry hover:bg-rose-500 shadow-strawberry/30 cursor-pointer'
                        : 'bg-choco/30 cursor-not-allowed'
                    }`}
                  >
                    {status === 'loading'
                      ? (currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                      : (currentLang === 'ar' ? 'إرسال الرسالة ←' : currentLang === 'ru' ? 'Отправить сообщение →' : currentLang === 'fr' ? 'Envoyer le message →' : 'Send Message →')}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
