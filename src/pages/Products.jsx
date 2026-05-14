import { useI18n } from '../i18n';
import { Link } from 'react-router-dom';

/**
 * 12 categories — order & colors from madasweet.pl original
 * barColor = label bar background matching original CSS
 */
const CATEGORIES = [
  { id: 'news_items',   barColor: '#6a78e6', img: '/images/categories/news.png' },
  { id: 'lollipop',     barColor: '#d90ea6', img: '/images/categories/lollipop.png' },
  { id: 'dip_lick',     barColor: '#f7ad50', img: '/images/categories/dip_lick.png' },
  { id: 'bubble_gum',   barColor: '#f79eff', img: '/images/categories/bubble_gum.png' },
  { id: 'sprays',       barColor: '#92cdc2', img: '/images/categories/sprays.png' },
  { id: 'roll_on',      barColor: '#85be21', img: '/images/categories/roll_on.png' },
  { id: 'squeeze_gel',  barColor: '#bf1075', img: '/images/categories/squeeze_gel.png' },
  { id: 'powder_candy', barColor: '#7895e5', img: '/images/categories/powder_candy.png' },
  { id: 'jelly',        barColor: '#d9bc1e', img: '/images/categories/jelly.png' },
  { id: 'chocolate',    barColor: '#00baeb', img: '/images/categories/chocolate.png' },
  { id: 'hard_candy',   barColor: '#0adda5', img: '/images/categories/hard_candy.png' },
  { id: 'other',        barColor: '#d694e4', img: '/images/categories/other.png' },
];

function Products() {
  const { t } = useI18n();

  return (
    <main className="products-page">
      {/* Playful Floating Background Elements */}
      <div className="floating-candy float-1">🍬</div>
      <div className="floating-candy float-2">🍭</div>
      <div className="floating-candy float-3">✨</div>
      <div className="floating-candy float-4">🎈</div>
      <div className="floating-candy float-5">🍬</div>

      {/* Fun rounded banner */}
      <div className="products-banner">
        <div className="banner-dots left">
          <span className="banner-dot lg" />
          <span className="banner-dot" />
          <span className="banner-dot lg" />
        </div>

        <h1 className="products-title bounce-anim">
          {t('products_page.title')}
        </h1>

        <div className="banner-dots right">
          <span className="banner-dot lg" />
          <span className="banner-dot" />
          <span className="banner-dot lg" />
        </div>
      </div>

      {/* Light-blue grid background with polka dots */}
      <div className="products-grid-bg">
        <div className="wave-top"></div>
        <div id="product_category_list">
          {CATEGORIES.map((cat) => {
            const name = t(`products_page.${cat.id}`);
            return (
              <div key={cat.id} className="colProd cat">
                <Link to={`/category/${cat.id}`} aria-label={name} className="cat-card-link">
                  {/* Label on TOP */}
                  <div className="category_name" style={{ background: cat.barColor }}>
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
        <div className="wave-bottom"></div>
      </div>
    </main>
  );
}

export default Products;

