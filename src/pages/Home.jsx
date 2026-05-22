import SwiperHero from '../components/SwiperHero';
import { useI18n } from '../i18n';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'marshmallow', barColor: '#ff9ebb', img: '/images/categories/other.png' },
  { id: 'jelly',       barColor: '#85be21', img: '/images/categories/jelly.png' },
  { id: 'hard_candy',  barColor: '#bf1075', img: '/images/categories/hard_candy.png' }
];

function Home() {
  const { t } = useI18n();

  return (
    <main>
      <SwiperHero />
      <section className="product-grid-section">
        <div className="container">
          <div className="section-ribbon">
            <h2>{t('home.featured')}</h2>
          </div>
          
          <div id="product_category_list" style={{ marginTop: '20px' }}>
            {CATEGORIES.map((cat) => {
              const name = t(`products_page.${cat.id}`);
              return (
                <div key={cat.id} className="colProd cat" style={{ '--cat-color': cat.barColor }}>
                  <Link to={`/category/${cat.id}`} aria-label={name} className="cat-card-link">
                    <div className="category_name" style={{ background: 'var(--cat-color)' }}>
                      <span>{name}</span>
                    </div>
                    <div className="cat-img-area">
                      <img src={cat.img} alt={name} className="cat-img" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
