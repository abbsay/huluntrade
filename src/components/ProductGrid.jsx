import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

const FEATURED = [
  { id: 'bubble_gum',   image: '/images/logos/boom-spray-LOGO.jpg' },
  { id: 'sprays',       image: '/images/slider/MR-SQ-POP-SLIDER.jpg' },
  { id: 'lollipop',     image: '/images/logos/SPINER-CANDY-LOGO.jpg' },
  { id: 'chocolate',    image: '/images/slider/ALIEN-CAR-SLIDER.jpg' },
  { id: 'hard_candy',   image: '/images/logos/SOUR-CRAZY-ROLL.jpg' },
  { id: 'jelly',        image: '/images/slider/SLIDER-CHAMELEON-POP-kopia.jpg' },
  { id: 'squeeze_gel',  image: '/images/slider/SLIDER-HAPPY-TOOLS.jpg' },
  { id: 'roll_on',      image: '/images/slider/JB-SLIDER.jpg' },
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
              aria-label={t(`products_page.${item.id}`)}
            >
              <div
                className="product-card-img"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <h3 className="product-card-title">
                {t(`products_page.${item.id}`)}
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
