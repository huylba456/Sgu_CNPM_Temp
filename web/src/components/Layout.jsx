import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';
import DroneTracker from './DroneTracker.jsx';

const Layout = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          FoodFast
        </Link>
        <nav>
          <NavLink to="/" end>
            Trang chủ
          </NavLink>
          <NavLink to="/products">Sản phẩm</NavLink>
          <NavLink to="/orders">Đơn hàng</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
          {(user?.role === 'restaurant' || user?.role === 'admin') && (
            <NavLink to="/restaurant">Nhà hàng</NavLink>
          )}
        </nav>
        <div className="header-actions">
          <Link to="/cart">Giỏ hàng ({cartItems.length})</Link>
          {user ? (
            <button type="button" onClick={logout} className="secondary">
              Đăng xuất
            </button>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          )}
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <aside className="drone-tracker">
        <DroneTracker />
      </aside>
    </div>
  );
};

export default Layout;
