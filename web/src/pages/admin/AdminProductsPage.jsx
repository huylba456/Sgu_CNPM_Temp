import { useMemo, useState } from 'react';
import DataTable from '../../components/DataTable.jsx';
import { products as seedProducts, categories } from '../../data/mockProducts.js';

const AdminProductsPage = () => {
  const [products, setProducts] = useState(seedProducts);
  const [form, setForm] = useState({
    id: '',
    name: '',
    category: categories[0],
    price: 0,
    restaurant: '',
    description: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  const columns = useMemo(
    () => [
      { header: 'Tên món', accessorKey: 'name' },
      { header: 'Danh mục', accessorKey: 'category' },
      {
        header: 'Giá',
        cell: ({ row }) => `${row.original.price.toLocaleString()} đ`
      },
      { header: 'Nhà hàng', accessorKey: 'restaurant' },
      {
        header: 'Hành động',
        cell: ({ row }) => (
          <div className="table-actions">
            <button type="button" onClick={() => handleEdit(row.original)}>Sửa</button>
            <button type="button" className="danger" onClick={() => handleDelete(row.original.id)}>
              Xoá
            </button>
          </div>
        )
      }
    ],
    [products]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingId) {
      setProducts((prev) => prev.map((item) => (item.id === editingId ? { ...form, price: Number(form.price) } : item)));
    } else {
      setProducts((prev) => [...prev, { ...form, id: crypto.randomUUID(), price: Number(form.price) }]);
    }
    setForm({ id: '', name: '', category: categories[0], price: 0, restaurant: '', description: '', image: '' });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ id: '', name: '', category: categories[0], price: 0, restaurant: '', description: '', image: '' });
    }
  };

  return (
    <div className="page dashboard">
      <h2>Quản lý sản phẩm</h2>
      <form className="form inline" onSubmit={handleSubmit}>
        <div className="grid two">
          <label>
            Tên món
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Giá
            <input name="price" type="number" value={form.price} onChange={handleChange} required />
          </label>
          <label>
            Danh mục
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Nhà hàng
            <input name="restaurant" value={form.restaurant} onChange={handleChange} required />
          </label>
        </div>
        <label>
          Mô tả
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <label>
          Ảnh minh hoạ (URL)
          <input name="image" value={form.image} onChange={handleChange} />
        </label>
        <button type="submit" className="primary">
          {editingId ? 'Cập nhật món' : 'Thêm món mới'}
        </button>
      </form>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default AdminProductsPage;
