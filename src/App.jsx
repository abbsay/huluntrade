import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useI18n, LANG_OPTIONS } from './i18n';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

const PHONE_DISPLAY = '+86 13967427888';
const PHONE_TEL = '+8613967427888';

function Header() {
  const { t } = useI18n();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Body scroll lock when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const headerClass = [
    'header',
    scrolled ? 'header--scrolled' : '',
    menuOpen ? 'header--menu-open' : '',
  ].filter(Boolean).join(' ');

  const navItems = [
    { id: 'home', path: '/', label: t('nav.home'), icon: '/images/home_ico.png' },
    { id: 'products', path: '/products', label: t('nav.products'), icon: '/images/box_ico.png' },
    { id: 'about', path: '/about', label: t('nav.about'), icon: '/images/chat_ico.png' },
    { id: 'contact-nav', path: '/contact', label: t('nav.contact'), icon: '/images/plane_ico.png' },
  ];

  return (
    <>
      <header id="menu" className={headerClass}>
        {/* Zone 1: Logo */}
        <div id="logo_menu">
          <Link to="/" onClick={closeMenu}>
            <img src="/logo.png" alt="Hulun Trade Logo" id="logo_img" />
          </Link>
        </div>

        {/* Zone 2: Primary Navigation */}
        <nav aria-label="Primary" className={menuOpen ? 'nav--open' : ''}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li
                key={item.id}
                id={item.id}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <Link to={item.path} onClick={closeMenu}>
                  <span
                    className="ico"
                    aria-hidden="true"
                    style={{ backgroundImage: `url('${item.icon}')` }}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Zone 3: Actions (Phone, Catalogue, Language) */}
        <div className="header-actions">
          <a href={`tel:${PHONE_TEL}`} className="action-phone" id="phone_menu_nav">
            <span
              className="ico"
              aria-hidden="true"
              style={{ backgroundImage: `url('/images/phone_ico.png')` }}
            />
            <span className="action-phone-text">{PHONE_DISPLAY}</span>
          </a>

          <Link
            to="/contact"
            className="action-catalogue"
            id="catalog"
          >
            <span
              className="ico"
              aria-hidden="true"
              style={{ backgroundImage: `url('/images/catalog_ico.png')` }}
            />
            <span className="action-catalogue-text">{t('nav.catalogue')}</span>
          </Link>

          <LangSwitcher />

          {/* Hamburger button (mobile only) */}
          <button
            type="button"
            className={`hamburger ${menuOpen ? 'hamburger--active' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile overlay backdrop */}
      {menuOpen && (
        <div className="menu-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}
    </>
  );
}

function LangSwitcher() {
  const { lang: currentLang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Close when pressing Escape key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      className="lang-switcher"
      ref={rootRef}
    >
      <button
        type="button"
        className="lang-toggle"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="ico lang-ico" aria-hidden="true" />
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
              {opt.native}
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
              WeChat: <span className="highlight-text">13967427888 / 17758069907</span>
              <br />
              TEL: <a href="tel:+8613967427888" className="fun-link">+86 13967427888</a>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
