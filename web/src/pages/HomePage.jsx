import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import SearchBar from '../components/SearchBar.jsx';
import SortMenu from '../components/SortMenu.jsx';
import { categories, products } from '../data/mockProducts.js';

const sortProducts = (list, sortKey) => {
  switch (sortKey) {
    case 'priceAsc':
      return [...list].sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return [...list].sort((a, b) => b.price - a.price);
    case 'rating':
      return [...list].sort((a, b) => b.rating - a.rating);
    case 'delivery':
      return [...list].sort((a, b) => a.deliveryTime - b.deliveryTime);
    default:
      return list;
  }
};

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  const filteredProducts = useMemo(() => {
    let list = products;

    if (activeCategory !== 'all') {
      list = list.filter((product) => product.category === activeCategory);
    }

    if (search.trim()) {
      list = list.filter((product) =>
        `${product.name} ${product.restaurant}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    return sortProducts(list, sort);
  }, [activeCategory, search, sort]);

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">Đội drone tự động thế hệ mới</span>
          <h1>FoodFast Drone Delivery</h1>
          <p>
            Trải nghiệm giao đồ ăn trong 15 phút với đội drone tự động của FoodFast. Theo dõi hành
            trình thời gian thực và nhận món nóng hổi ngay khi drone hạ cánh.
          </p>
          <div className="hero-meta">
            <div className="hero-pill">
              <strong>15&apos;</strong>
              <span>Thời gian giao trung bình</span>
            </div>
            <div className="hero-pill">
              <strong>120+</strong>
              <span>Món ăn sẵn sàng phục vụ</span>
            </div>
            <div className="hero-pill">
              <strong>Realtime</strong>
              <span>Theo dõi hành trình giao hàng</span>
            </div>
          </div>
        </div>
        <div className="hero-controls">
          <div className="hero-actions">
            <SearchBar value={search} onChange={setSearch} />
            <SortMenu value={sort} onChange={setSort} />
          </div>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
      </section>
      <section className="product-section">
        <header className="section-heading">
          <div>
            <h2>Món ngon dành cho bạn</h2>
            <p className="muted">
              {filteredProducts.length} lựa chọn phù hợp với nhu cầu của bạn.
            </p>
          </div>
        </header>
        {filteredProducts.length > 0 ? (
          <div className="grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Không tìm thấy món ăn phù hợp</h3>
            <p className="muted">
              Hãy thử điều chỉnh từ khóa tìm kiếm hoặc chọn một danh mục khác.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
