import { NavLink, Outlet } from 'react-router-dom';

const RestaurantLayout = () => (
  <div className="dashboard-shell">
    <aside className="sidebar">
      <h2>FoodFast Nhà hàng</h2>
      <nav>
        <NavLink to="/restaurant" end>
          Tổng quan
        </NavLink>
        <NavLink to="/restaurant/products">Món ăn</NavLink>
        <NavLink to="/restaurant/orders">Đơn hàng</NavLink>
      </nav>
    </aside>
    <section className="dashboard-content">
      <Outlet />
    </section>
  </div>
);

export default RestaurantLayout;
