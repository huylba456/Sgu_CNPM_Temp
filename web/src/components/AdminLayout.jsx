import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="dashboard-shell">
    <aside className="sidebar">
      <h2>FoodFast Admin</h2>
      <nav>
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products">Sản phẩm</NavLink>
        <NavLink to="/admin/users">Người dùng</NavLink>
        <NavLink to="/admin/orders">Đơn hàng</NavLink>
      </nav>
    </aside>
    <section className="dashboard-content">
      <Outlet />
    </section>
  </div>
);

export default AdminLayout;
