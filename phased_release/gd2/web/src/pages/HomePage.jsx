import { useEffect, useMemo, useState } from 'react';
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
  const pageSize = 6;

  const featuredProducts = useMemo(() => {
    let list = products;

    if (activeCategory !== 'all') {
      list = list.filter((product) => product.category === activeCategory);
    }

    if (search.trim()) {
      list = list.filter((product) =>
        `${product.name} ${product.restaurant}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    return sortProducts(list, sort).slice(0, pageSize);
  }, [activeCategory, search, sort, pageSize]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory, search, sort]);

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge">Sprint 2 · Khám phá menu</span>
          <h1>Chọn món thật nhanh với drone FoodFast</h1>
          <p>
            Bổ sung danh mục sản phẩm, tìm kiếm, lọc và sắp xếp để khách hàng có thể khám phá menu
            một cách trực quan trước khi tiến tới đặt món ở Sprint 3.
          </p>
          <div className="hero-meta">
            <div className="hero-pill">
              <strong>120+</strong>
              <span>Món ăn trong mock data</span>
            </div>
            <div className="hero-pill">
              <strong>12 danh mục</strong>
              <span>Filter linh hoạt</span>
            </div>
            <div className="hero-pill">
              <strong>Tìm kiếm</strong>
              <span>Theo tên món &amp; nhà hàng</span>
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
            onSelect={(value) => setActiveCategory(value)}
          />
        </div>
      </section>
      <section className="product-section">
        <header className="section-heading">
          <div>
            <h2>Món nổi bật</h2>
            <p className="muted">{featuredProducts.length} gợi ý phù hợp với bộ lọc hiện tại.</p>
          </div>
        </header>
        <div className="grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
