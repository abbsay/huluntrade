import { useParams, Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { getProductById } from '../data/mockProducts';

function ProductDetail() {
  const { productId } = useParams();
  const { t } = useI18n();
  const navigate = useNavigate();
  const product = getProductById(productId);

  if (!product) {
    return (
      <main className="fun-page-bg">
        <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
          <div className="sticker-card">
            <h1>Product Not Found</h1>
            <button onClick={() => navigate('/products')} className="btn-fun bounce-hover">
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fun-page-bg product-detail-page">
      <div className="container">
        
        <div className="detail-header">
          <button onClick={() => navigate(-1)} className="back-btn bounce-hover">
            ← {t('product_details.back_to_categories')}
          </button>
        </div>

        <div className="detail-content-wrapper">
          {/* Left: Image */}
          <div className="detail-image sticker-card bounce-anim-slow">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Right: Info */}
          <div className="detail-info sticker-card">
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-desc">{product.description}</p>
            
            <div className="detail-specs">
              <div className="spec-item">
                <span className="spec-icon">✨</span>
                <div>
                  <strong>{t('product_details.features')}:</strong>
                  <ul>
                    {product.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">⚖️</span>
                <div>
                  <strong>{t('product_details.weight')}:</strong> {product.weight}
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">📦</span>
                <div>
                  <strong>{t('product_details.packaging')}:</strong> {product.packaging}
                </div>
              </div>
            </div>

            <Link to="/contact" className="btn_fun submit-btn bouncy-btn btn-large" style={{ marginTop: '20px', display: 'inline-block' }}>
              🚀 {t('product_details.inquire_button')}
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default ProductDetail;
