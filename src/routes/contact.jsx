import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useI18n } from '../i18n'

// SVG Icon components
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const FloatingCandy = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="svg-candy-vector">
    <path d="M17.2 6.8c-.4-.4-1-.4-1.4 0l-1.6 1.6C13.2 8.1 12 8 12 8s-.1 1.2.4 2.2L10.8 12 8 9.2l-4.2 4.2c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l2.8-2.8 1.4 1.4c.4.4 1 .4 1.4 0l4.2-4.2-2.8-2.8 1.6-1.6c.4-.4.4-1 0-1.4l-1.4-1.4z" />
  </svg>
);

const FloatingLollipop = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="svg-candy-vector">
    <circle cx="12" cy="8" r="5" />
    <path d="M12 13v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M12 5a3 3 0 0 1 3 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Route = createFileRoute('/contact')({
  component: Contact
})

function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
        setAgreed(false);
      } else {
        setStatus('error');
        setErrorMessage(data.error || t('contact.error'));
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(t('contact.error'));
    }
  };

  return (
    <main id="contactPage" className="fun-page-bg">
      <div className="wave-top"></div>

      {/* Elegant Floating SVG Candy Vectors */}
      <div className="floating-candy float-1 opacity-soft"><FloatingCandy /></div>
      <div className="floating-candy float-3 opacity-soft"><FloatingLollipop /></div>
      <div className="floating-candy float-5 opacity-soft"><FloatingCandy /></div>

      <div className="contact-wrapper">
        {/* Left: Contact Info Sticker */}
        <div className="sticker-card bounce-hover">
          <h1 className="products-title fun-title">{t('contact.title')}</h1>
          
          <div className="contact-info-list">
            <div className="info-item">
              <div className="icon-circle candy-peach">
                <MapPinIcon />
              </div>
              <div className="info-text">
                <strong>HULUN TRADE CO., LTD</strong>
                <p>Yiwu, Zhejiang, China</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle candy-mint">
                <ClockIcon />
              </div>
              <div className="info-text">
                <p>{t('contact.office_hours')}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle candy-yellow">
                <PhoneIcon />
              </div>
              <div className="info-text">
                <strong>{t('contact.mobile_title')}</strong>
                <p className="highlight-pill">WeChat: 13967427888 / 17758069907</p>
                <p className="highlight-pill">TEL: +86 13967427888</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle candy-purple">
                <MailIcon />
              </div>
              <div className="info-text">
                <strong>{t('contact.email_title')}</strong>
                <p>E-MAIL: <a href="mailto:Van001@huluntrade.com" className="fun-link">Van001@huluntrade.com</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form Sticker */}
        <div className="sticker-card form-card">
          <h2 className="products-title fun-title small-title">{t('contact.form_subtitle')}</h2>
          
          <form onSubmit={handleSubmit} className="fun-contact-form">
            <div className="input-group">
              <span className="input-icon">
                <UserIcon />
              </span>
              <input
                type="text"
                name="name"
                placeholder={t('contact.name')}
                value={form.name}
                onChange={handleChange}
                disabled={status === 'loading'}
                required
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                type="email"
                name="email"
                placeholder={t('contact.email')}
                value={form.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                required
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon">
                <PhoneIcon />
              </span>
              <input
                type="tel"
                name="phone"
                placeholder={t('contact.phone')}
                value={form.phone}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon top-icon">
                <MessageIcon />
              </span>
              <textarea
                name="message"
                rows="5"
                placeholder={t('contact.message')}
                value={form.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                required
              />
            </div>
            
            <label className={`fun-checkbox ${status === 'loading' ? 'disabled' : ''}`}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={status === 'loading'}
                required
              />
              <span className="checkmark"></span>
              <span className="agree-text">{t('contact.privacy_agree')}</span>
            </label>
            
            <button 
              type="submit" 
              className={`candy-btn bounce-anim ${status === 'loading' ? 'loading' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>{t('contact.sending', 'Sending...')}</>
              ) : (
                <>🚀 {t('contact.send')}</>
              )}
            </button>

            {status === 'success' && (
              <div className="form-status success-message">
                🎉 {t('contact.success')}
              </div>
            )}
            {status === 'error' && (
              <div className="form-status error-message">
                ❌ {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="wave-bottom"></div>
    </main>
  );
}
