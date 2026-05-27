import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

function NotFound() {
  const { t } = useI18n();

  return (
    <main className="fun-page-bg not-found-page">
      {/* Floating candy decorations */}
      <div className="floating-candy float-1" aria-hidden="true">🍬</div>
      <div className="floating-candy float-2" aria-hidden="true">🍭</div>
      <div className="floating-candy float-3" aria-hidden="true">🍫</div>
      <div className="floating-candy float-4" aria-hidden="true">🧁</div>

      <div className="not-found-container">
        <div className="not-found-card">
          <div className="not-found-emoji" aria-hidden="true">🍬</div>
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">{t('not_found.title')}</h2>
          <p className="not-found-desc">{t('not_found.description')}</p>
          <div className="not-found-actions">
            <Link to="/" className="candy-btn not-found-home-btn">
              🏠 {t('not_found.go_home')}
            </Link>
            <Link to="/products" className="back-btn not-found-products-btn">
              🍭 {t('not_found.browse_products')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
