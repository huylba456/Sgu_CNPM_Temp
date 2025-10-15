import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import SortMenu from '../components/SortMenu.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import { categories, products } from '../data/mockProducts.js';

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [category, setCategory] = useState('all');

  const items = useMemo(() => {
    let list = products;

    if (category !== 'all') {
      list = list.filter((product) => product.category === category);
    }

    if (search.trim()) {
      list = list.filter((product) =>
        `${product.name} ${product.restaurant}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
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
  }, [category, search, sort]);

  return (
    <div className="page">
      <header className="page-header">
        <h2>Danh mục món ăn</h2>
        <div className="filters">
          <SearchBar value={search} onChange={setSearch} />
          <SortMenu value={sort} onChange={setSort} />
        </div>
        <CategoryFilter categories={categories} activeCategory={category} onSelect={setCategory} />
      </header>
      <section className="grid">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </section>
    </div>
  );
};

export default ProductsPage;
