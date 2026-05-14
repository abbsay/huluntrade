import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

const FEATURED = [
  { id: '35g-marshmallow', image: '/images/categories/lollipop.png', name: '35g Marshmallow' },
  { id: '50g-jelly', image: '/images/categories/jelly.png', name: '50g Jelly' },
  { id: '48g-jelly', image: '/images/slider/SLIDER-CHAMELEON-POP-kopia.jpg', name: '48g Jelly' },
  { id: '8g-jelly', image: '/images/logos/logo-3.jpg', name: '8g Jelly' },
  { id: '35g-bear-candy', image: '/images/logos/SOUR-CRAZY-ROLL.jpg', name: '35g Bear Candy' },
  { id: '15g-lollipop', image: '/images/slider/MR-SQ-POP-SLIDER.jpg', name: '15g Lollipop' }
];

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
