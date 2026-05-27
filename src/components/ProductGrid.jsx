import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { mockProducts } from '../data/mockProducts';

// Pick 6 representative products across different categories
const FEATURED_IDS = [
  'hl-marsh-001',   // marshmallow
  'hl-marsh-005',   // marshmallow
  'yt24051401',     // 50g jelly
  'hl-jelly-005',   // 48g jelly
  'hl24050701',     // 35g bear candy
  'bbw24042929',    // 15g lollipop
];

const FEATURED = FEATURED_IDS
  .map(id => mockProducts.find(p => p.id === id))
  .filter(Boolean);

function ProductGrid() {
  const { t } = useI18n();

  return (
    <section className="product-grid-section" id="featured-products">
      <div className="container">
        <div className="section-ribbon">
          <h2>{t('home.featured')}</h2>
        </div>

        <div className="product-grid">
          {FEATURED.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="product-card"
              aria-label={item.name}
            >
              <div
                className="product-card-img"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <h3 className="product-card-title">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="product-grid-cta">
          <Link to="/products" className="btn-primary">
            {t('home.view_all')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
