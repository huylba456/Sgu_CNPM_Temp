import { useMemo, useState } from 'react';
import DataTable from '../../components/DataTable.jsx';
import { users as seedUsers } from '../../data/mockUsers.js';

const roles = [
  { value: 'customer', label: 'Khách hàng' },
  { value: 'admin', label: 'Quản trị' },
  { value: 'restaurant', label: 'Nhà hàng' }
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState(seedUsers);
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    role: 'customer',
    phone: '',
    address: ''
  });
  const [editingId, setEditingId] = useState(null);

  const columns = useMemo(
    () => [
      { header: 'Tên', accessorKey: 'name' },
      { header: 'Email', accessorKey: 'email' },
      {
        header: 'Vai trò',
        accessorKey: 'role',
        cell: ({ row }) => roles.find((role) => role.value === row.original.role)?.label ?? row.original.role
      },
      { header: 'SĐT', accessorKey: 'phone' },
      { header: 'Địa chỉ', accessorKey: 'address' },
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
    [users]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingId) {
      setUsers((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
    } else {
      setUsers((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setForm({ id: '', name: '', email: '', role: 'customer', phone: '', address: '' });
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user.id);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ id: '', name: '', email: '', role: 'customer', phone: '', address: '' });
    }
  };

  return (
    <div className="page dashboard">
      <h2>Quản lý người dùng</h2>
      <form className="form inline" onSubmit={handleSubmit}>
        <div className="grid two">
          <label>
            Họ tên
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Vai trò
            <select name="role" value={form.role} onChange={handleChange}>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Số điện thoại
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>
        </div>
        <label>
          Địa chỉ
          <input name="address" value={form.address} onChange={handleChange} />
        </label>
        <button type="submit" className="primary">
          {editingId ? 'Cập nhật người dùng' : 'Thêm người dùng'}
        </button>
      </form>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default AdminUsersPage;
