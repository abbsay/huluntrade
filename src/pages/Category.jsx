import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { getProductsByCategory } from '../data/mockProducts';

function Category() {
  const { categoryId } = useParams();
  const { t } = useI18n();
  const products = getProductsByCategory(categoryId);

  // Category name translation
  const categoryName = t(`products_page.${categoryId}`);

  const subcategoryOrder = {
    marshmallow: ['35g_marshmallow'],
    jelly: ['50g_jelly', '48g_jelly', '8g_jelly'],
    hard_candy: ['35g_bear_candy', '15g_lollipop']
  };

  const subcategoryIcons = {
    '35g_marshmallow': '🍡',
    '50g_jelly': '🍇',
    '48g_jelly': '🍓',
    '8g_jelly': '🍮',
    '35g_bear_candy': '🧸',
    '15g_lollipop': '🍭'
  };

  const activeSubcategories = subcategoryOrder[categoryId] || [];

  // Group products by subcategoryId
  const groupedProducts = {};
  products.forEach(product => {
    const subcat = product.subcategoryId || 'other';
    if (!groupedProducts[subcat]) {
      groupedProducts[subcat] = [];
    }
    groupedProducts[subcat].push(product);
  });

  // Dynamic fallback for any unmapped subcategories
  const renderList = [...activeSubcategories];
  Object.keys(groupedProducts).forEach(subcat => {
    if (!renderList.includes(subcat) && groupedProducts[subcat].length > 0) {
      renderList.push(subcat);
    }
  });

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

        {/* Product Grid by Subcategory */}
        {products.length > 0 ? (
          <div className="subcategory-container">
            {renderList.map(subcatId => {
              const subcatProducts = groupedProducts[subcatId] || [];
              if (subcatProducts.length === 0) return null;

              const isStandard = subcatId !== 'other';
              const titleText = isStandard ? t(`subcategories.${subcatId}`) : t('product_details.other_products', 'Other Products');
              const emojiIcon = subcategoryIcons[subcatId] || '🍬';

              return (
                <section key={subcatId} className="subcategory-section">
                  <h2 className="subcategory-title">
                    <span className="subcategory-icon">{emojiIcon}</span>
                    <span className="subcategory-text">{titleText}</span>
                  </h2>
                  <div className="product-grid-layout">
                    {subcatProducts.map(product => (
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
                </section>
              );
            })}
          </div>
        ) : (
          <div className="empty-state sticker-card">
            <h2>{categoryId === 'candy_toy' ? '🎉' : '😢'}</h2>
            <p>{categoryId === 'candy_toy' ? t('product_details.coming_soon') : t('product_details.no_products')}</p>
          </div>
        )}

      </div>
    </main>
  );
}

export default Category;
