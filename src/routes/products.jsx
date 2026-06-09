import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../i18n'
import { Link } from '@tanstack/react-router'

const CATEGORIES = [
  { id: 'marshmallow', barColor: '#ff9ebb', img: '/images/categories/other.png' },
  { id: 'jelly',       barColor: '#85be21', img: '/images/categories/jelly.png' },
  { id: 'hard_candy',  barColor: '#bf1075', img: '/images/categories/hard_candy.png' },
  { id: 'candy_toy',   barColor: '#ffb834', img: '/images/categories/other.png' }
];

export const Route = createFileRoute('/products')({
  component: Products,
  head: () => ({
    meta: [
      { title: 'Our Candy Categories — Hulun Sweets' },
      { name: 'description', content: 'Browse our delightful candy categories: fluffy marshmallows, juicy jelly candies, handmade hard candies, and creative candy toys. Find your favorite sweet treat!' },
    ],
  }),
})

function Products() {
  const { t } = useI18n();

  return (
    <main className="products-page">
      {/* Playful Floating Background Elements */}
      <div className="floating-candy float-1" aria-hidden="true">🍬</div>
      <div className="floating-candy float-2" aria-hidden="true">🍭</div>
      <div className="floating-candy float-3" aria-hidden="true">✨</div>
      <div className="floating-candy float-4" aria-hidden="true">🎈</div>
      <div className="floating-candy float-5" aria-hidden="true">🍬</div>

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
              <div key={cat.id} className="colProd cat" style={{ '--cat-color': cat.barColor }}>
                <Link to={`/category/${cat.id}`} aria-label={name} className="cat-card-link">
                  {/* Label on TOP */}
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
        <div className="wave-bottom"></div>
      </div>
    </main>
  );
}
