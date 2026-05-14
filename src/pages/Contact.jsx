import { useState } from 'react';
import { useI18n } from '../i18n';

function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    alert(t('contact.success'));
    setForm({ name: '', email: '', phone: '', message: '' });
    setAgreed(false);
  };

  return (
    <main id="contactPage" className="fun-page-bg">
      <div className="wave-top"></div>

      {/* Floating Decorations */}
      <div className="floating-candy float-1">💌</div>
      <div className="floating-candy float-3">🌈</div>
      <div className="floating-candy float-5">📞</div>

      <div className="contact-wrapper">
        {/* Left: Contact Info Sticker */}
        <div className="sticker-card bounce-hover">
          <h1 className="products-title fun-title">{t('contact.title')}</h1>
          
          <div className="contact-info-list">
            <div className="info-item">
              <div className="icon-circle">🏢</div>
              <div className="info-text">
                <strong>HULUN TRADE CO., LTD</strong>
                <p>Yiwu, Zhejiang, China</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle">⏰</div>
              <div className="info-text">
                <p>{t('contact.office_hours')}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle">📞</div>
              <div className="info-text">
                <strong>{t('contact.mobile_title')}</strong>
                <p className="highlight-pill">+86 139 6742 7888</p>
                <p className="highlight-pill">+86 177 5806 9907</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle">📧</div>
              <div className="info-text">
                <strong>{t('contact.email_title')}</strong>
                <p>E-MAIL: <a href="mailto:VAN001@HULUNTRADE.COM" className="fun-link">VAN001@HULUNTRADE.COM</a></p>
                <p>WECHAT: <span className="highlight-pill">13967427888</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form Sticker */}
        <div className="sticker-card form-card">
          <h2 className="products-title fun-title small-title">{t('contact.form_subtitle')}</h2>
          
          <form onSubmit={handleSubmit} className="fun-contact-form">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder={t('contact.name')}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon">📩</span>
              <input
                type="email"
                name="email"
                placeholder={t('contact.email')}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon">📱</span>
              <input
                type="tel"
                name="phone"
                placeholder={t('contact.phone')}
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon top-icon">📝</span>
              <textarea
                name="message"
                rows="5"
                placeholder={t('contact.message')}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <label className="fun-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <span className="checkmark"></span>
              <span className="agree-text">{t('contact.privacy_agree')}</span>
            </label>
            
            <button type="submit" className="candy-btn bounce-anim">
              🚀 {t('contact.send')}
            </button>
          </form>
        </div>
      </div>

      <div className="wave-bottom"></div>
    </main>
  );
}

export default Contact;
