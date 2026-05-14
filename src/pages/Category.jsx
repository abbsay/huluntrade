import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { getProductsByCategory } from '../data/mockProducts';

function Category() {
  const { categoryId } = useParams();
  const { t } = useI18n();
  const products = getProductsByCategory(categoryId);

  // Category name translation
  const categoryName = t(`products_page.${categoryId}`);

  return (
    <main className="fun-page-bg category-page">
      <div className="container">
        
        {/* Banner */}
        <div className="category-banner">
          <Link to="/products" className="back-btn bounce-hover">
            ← {t('product_details.back_to_categories')}
          </Link>
          <h1 className="category-title bounce-anim">{categoryName}</h1>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="product-grid-layout">
            {products.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`} 
                className="sticker-card product-item bounce-hover"
              >
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state sticker-card">
            <h2>😢</h2>
            <p>{t('product_details.no_products')}</p>
          </div>
        )}

      </div>
    </main>
  );
}

export default Category;
