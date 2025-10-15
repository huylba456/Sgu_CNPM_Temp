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
    <div className="page">
      <section className="hero">
        <h1>FoodFast Drone Delivery</h1>
        <p>
          Trải nghiệm giao đồ ăn trong 15 phút với đội drone tự động của FoodFast. Theo dõi hành
          trình thời gian thực và nhận món nóng hổi ngay khi drone hạ cánh.
        </p>
        <div className="hero-actions">
          <SearchBar value={search} onChange={setSearch} />
          <SortMenu value={sort} onChange={setSort} />
        </div>
        <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
      </section>
      <section className="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
