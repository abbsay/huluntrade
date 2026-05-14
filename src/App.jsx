import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useI18n, LANG_OPTIONS } from './i18n';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';

const PHONE_DISPLAY = '+86 139 6742 7888';
const PHONE_TEL = '+8613967427888';

function Header() {
  const { t } = useI18n();
  const location = useLocation();

  return (
    <header id="menu" className="header">
      <div id="logo_menu">
        <Link to="/">
          <img src="/logo.png" alt="Hulun Trade Logo" id="logo_img" />
        </Link>
        {/* Language Switcher moved here to group with logo on mobile */}
        <div id="lang">
          <LangSwitcher />
        </div>
      </div>

      <nav aria-label="Primary">
        <ul className="nav-links">
          {/* Phone */}
          <li id="phone_menu_nav">
            <a href={`tel:${PHONE_TEL}`}>
              <span className="ico" aria-hidden="true"></span>
              {PHONE_DISPLAY}
            </a>
          </li>

          {/* Catalogue (外链/下载占位) */}
          <li id="catalog">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span className="ico" aria-hidden="true"></span>
              {t('nav.catalogue')}
            </a>
          </li>

          {/* Home */}
          <li id="home" className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">
              <span className="ico" aria-hidden="true"></span>
              {t('nav.home')}
            </Link>
          </li>

          {/* Products */}
          <li id="products" className={location.pathname === '/products' ? 'active' : ''}>
            <Link to="/products">
              <span className="ico" aria-hidden="true"></span>
              {t('nav.products')}
            </Link>
          </li>

          {/* About */}
          <li id="about" className={location.pathname === '/about' ? 'active' : ''}>
            <Link to="/about">
              <span className="ico" aria-hidden="true"></span>
              {t('nav.about')}
            </Link>
          </li>

          {/* Contact (route to page) */}
          <li id="contact-nav" className={location.pathname === '/contact' ? 'active' : ''}>
            <Link to="/contact">
              <span className="ico" aria-hidden="true"></span>
              {t('nav.contact')}
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}

function LangSwitcher() {
  const { lang: currentLang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  // 点击外部关闭
  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div
      className="lang-switcher"
      ref={rootRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="lang-toggle"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="ico lang-ico" aria-hidden="true"></span>
        <span className="lang-code">{currentLang.toUpperCase()}</span>
      </button>
      {isOpen && (
        <ul className="lang-dropdown" role="listbox">
          {LANG_OPTIONS.map((opt) => (
            <li
              key={opt.code}
              role="option"
              aria-selected={currentLang === opt.code}
              className={`lang-option ${currentLang === opt.code ? 'active' : ''}`}
              onClick={() => {
                setLang(opt.code);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer id="footer" className="fun-footer">
      <div className="footer-wave"></div>
      <div className="footer-content-wrapper">
        <div id="footer-contact" className="footer-inner">
          {/* Left: Address */}
          <div className="footer_left bounce-hover">
            <div className="footer-icon-wrapper">📍</div>
            <div className="footer-text-content">
              <strong>HULUN TRADE CO., LTD</strong>
              <br />
              Yiwu, Zhejiang
              <br />
              China
              <br />
              <a
                className="btn_fun"
                href="https://maps.google.com/?q=Yiwu,Zhejiang,China"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer.findus')} 🗺️
              </a>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="footer_left_contact bounce-hover">
            <div className="footer-icon-wrapper">💬</div>
            <div className="footer-text-content">
              <strong>{t('footer.contactdesc')}</strong>
              <br />
              {t('footer.email_label')}:{' '}
              <a href="mailto:Van001@huluntrade.com" className="fun-link">Van001@huluntrade.com</a>
              <br />
              {t('footer.wechat_label')}: <span className="highlight-text">13967427888 / 17758069907</span>
              <br />
              gsm: <a href={`tel:${PHONE_TEL}`} className="fun-link">{PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>🍬 {t('footer.copyright')} 🍭</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    // 路由切换时滚到顶部
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
