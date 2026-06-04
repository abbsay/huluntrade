import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { mockProducts } from '../data/mockProducts';

// Pick 6 representative products across different categories
const FEATURED_IDS = [
  'hl-marsh-010',   // marshmallow
  'hl-marsh-014',   // marshmallow
  'yt24051401',     // 50g jelly
  'hl-jelly-005',   // 48g jelly
  'hl24050701',     // 35g bear candy
  'bbw24042929',    // 15g lollipop
];

const FEATURED = FEATURED_IDS
  .map(id => mockProducts.find(p => p.id === id))
  .filter(Boolean);

const CATEGORY_LABELS = {
  marshmallow: 'Marshmallow',
  jelly: 'Jelly Candy',
  hard_candy: 'Hard Candy',
  candy_toy: 'Candy Toy',
};

function ProductGrid() {
  const { t } = useI18n();

  return (
    <section className="product-grid-section" id="featured-products">
      <div className="container">
        <div className="section-ribbon">
          <h2>{t('home.featured_products', 'Featured Products')}</h2>
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
              <div className="product-card-body">
                <p className="product-card-category">
                  {CATEGORY_LABELS[item.categoryId] || item.categoryId}
                </p>
                <h3 className="product-card-title">{item.name}</h3>
                <div className="product-card-meta">
                  <span>{item.weight || 'N/A'}</span>
                  <span>{item.packaging || 'Standard'}</span>
                </div>
              </div>
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
