import { createFileRoute } from '@tanstack/react-router'
import SwiperHero from '../components/SwiperHero'
import ProductGrid from '../components/ProductGrid'
import LogoSlider from '../components/LogoSlider'
import { useI18n } from '../i18n'
import { Link } from '@tanstack/react-router'

const CATEGORIES = [
  { id: 'marshmallow', barColor: '#ff9ebb', img: '/images/categories/other.png' },
  { id: 'jelly',       barColor: '#85be21', img: '/images/categories/jelly.png' },
  { id: 'hard_candy',  barColor: '#bf1075', img: '/images/categories/hard_candy.png' },
  { id: 'candy_toy',   barColor: '#ffb834', img: '/images/categories/other.png' },
];

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  const { t } = useI18n();
  const trustItems = [
    { label: 'Tasty & Delicious', value: '100%' },
    { label: 'Cute Shapes', value: 'Creative' },
    { label: 'Playful Sweets', value: 'Fun!' },
    { label: 'Shared Happiness', value: 'Joyful' },
  ];

  return (
    <main className="home-page-declutter">
      {/* 1. Hero Carousel */}
      <SwiperHero />

      {/* 2. Brand Sweet Intro */}
      <section className="corporate-intro-section">
        <div className="container corporate-intro-grid">
          <div>
            <p className="corporate-kicker">Welcome to Hulun Candy Shop</p>
            <h1 className="corporate-title">Delicious, Colorful & Playful Sweets for Everyone</h1>
            <p className="corporate-subtitle">
              We bring you a delightful range of handpicked marshmallow clouds, juicy jellies, 
              sweet lollipops, and creative candy toys. Our sweets are made to bring pure joy, 
              bright smiles, and sweet moments to kids and candy lovers of all ages!
            </p>
            <div className="corporate-cta-row">
              <Link to="/products" className="btn-primary">Explore Sweets</Link>
              <Link to="/contact" className="btn-secondary-outline">Say Hello 🍬</Link>
            </div>
          </div>
          <div className="corporate-card">
            <h3>Why You'll Love Our Candies 🍭</h3>
            <ul>
              <li><strong>Super Yummy</strong>: Mouth-watering flavors and soft, fluffy textures</li>
              <li><strong>Beautiful & Cute</strong>: Adorable shapes and vibrant colors</li>
              <li><strong>Playful Designs</strong>: Creative candy toys that are both fun to play with and eat</li>
              <li><strong>Safe & Pure</strong>: High-quality ingredients carefully crafted for peace of mind</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Sweet Statistics Strip */}
      <section className="trust-strip-section">
        <div className="container trust-strip-grid">
          {trustItems.map((item) => (
            <div key={item.label} className="trust-item">
              <div className="trust-value">{item.value}</div>
              <div className="trust-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Partner Brands Slider */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-header">
            <h3>Our Sweet Friends</h3>
            <p>Sharing sweet happiness and joyful candies with friends everywhere!</p>
          </div>
        </div>
        <LogoSlider />
      </section>

      {/* 5. Product Categories Grid */}
      <section className="categories-grid-section">
        <div className="container">
          <div className="section-ribbon">
            <h2>{t('home.featured')}</h2>
          </div>
          
          <div id="product_category_list">
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

      {/* 6. Featured Products Grid */}
      <ProductGrid />

      {/* 7. Bottom Sweet Contact CTA */}
      <section className="corporate-contact-cta">
        <div className="container corporate-contact-wrap">
          <div>
            <p className="corporate-contact-kicker">Share the Sweetness</p>
            <h2>Want to Bring Home Some Sweet Candies?</h2>
            <p>
              Whether you are planning a fun party, looking for cute candy toys, or simply want to share a sweet moment with friends, write to us to get our latest sweet collections!
            </p>
          </div>
          <div className="corporate-contact-actions">
            <Link to="/contact" className="btn-primary">Get In Touch</Link>
            <a href="mailto:Van001@huluntrade.com" className="btn-secondary-outline">Email Us Directly</a>
          </div>
        </div>
      </section>
    </main>
  );
}
