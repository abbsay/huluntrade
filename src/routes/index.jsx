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
    { label: 'Export Markets', value: '30+' },
    { label: 'OEM Experience', value: '10+ Years' },
    { label: 'Lead Time', value: '15-30 Days' },
    { label: 'MOQ Support', value: 'Flexible' },
  ];

  const oemSteps = [
    'Requirement & Packaging Brief',
    'Sampling & Formula Confirmation',
    'Mass Production & QC',
    'Loading & Global Delivery',
  ];

  return (
    <main className="home-page-declutter">
      {/* 1. Hero Carousel */}
      <SwiperHero />

      {/* 2. B2B Corporate Intro */}
      <section className="corporate-intro-section">
        <div className="container corporate-intro-grid">
          <div>
            <p className="corporate-kicker">Candy Manufacturing & Export from Yiwu</p>
            <h1 className="corporate-title">Reliable B2B Supply for Global Candy Buyers</h1>
            <p className="corporate-subtitle">
              Hulun Trade focuses on marshmallow, jelly candy, hard candy and candy toy products
              with stable quality, OEM support and efficient export fulfillment.
            </p>
            <div className="corporate-cta-row">
              <Link to="/contact" className="btn-primary">Get Catalogue</Link>
              <Link to="/contact" className="btn-secondary-outline">Request Quotation</Link>
            </div>
          </div>
          <div className="corporate-card">
            <h3>Why Buyers Work With Us</h3>
            <ul>
              <li>Factory-backed sourcing and export support</li>
              <li>Multi-language communication for global clients</li>
              <li>Custom packaging and private label options</li>
              <li>Fast response for samples and quotations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Trust Statistics Strip */}
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
            <h3>Our Partner Brands</h3>
            <p>Trusted by distributors and global supermarkets</p>
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

      {/* 7. OEM Customization Flow */}
      <section className="oem-flow-section">
        <div className="container">
          <div className="section-ribbon">
            <h2>OEM / Private Label Flow</h2>
          </div>
          <div className="oem-flow-grid">
            {oemSteps.map((step, idx) => (
              <div key={step} className="oem-step-card">
                <span className="oem-step-index">0{idx + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Corporate Bottom Contact CTA */}
      <section className="corporate-contact-cta">
        <div className="container corporate-contact-wrap">
          <div>
            <p className="corporate-contact-kicker">Fast Response for B2B Inquiry</p>
            <h2>Need Price List, MOQ and Packaging Details?</h2>
            <p>
              Share your target market and preferred product type. Our team will provide a
              tailored quotation and catalogue within 24 hours.
            </p>
          </div>
          <div className="corporate-contact-actions">
            <Link to="/contact" className="btn-primary">Send Inquiry</Link>
            <a href="mailto:Van001@huluntrade.com" className="btn-secondary-outline">Email Directly</a>
          </div>
        </div>
      </section>
    </main>
  );
}
