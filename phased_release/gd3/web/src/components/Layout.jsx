import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';
import DroneTracker from './DroneTracker.jsx';

const Layout = () => {
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAuthenticated = Boolean(user);
  const navLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          FoodFast
        </Link>
        <nav>
          <NavLink to="/" end className={navLinkClass}>
            Trang chủ
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Sản phẩm
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/orders" className={navLinkClass}>
              Đơn hàng
            </NavLink>
          )}
        </nav>
        <div className="header-actions">
          {isAuthenticated && (
            <Link to="/cart" className="header-link">
              Giỏ hàng ({cartItemCount})
            </Link>
          )}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                clearCart();
                logout();
              }}
              className="ghost-button"
            >
              Đăng xuất
            </button>
          ) : (
            <Link to="/login" className="header-link">
              Đăng nhập
            </Link>
          )}
        </div>
      </header>
      <div className="app-content">
        <main className="app-main">
          <Outlet />
        </main>
        <aside className="app-aside">
          <DroneTracker />
        </aside>
      </div>
    </div>
  );
};

export default Layout;
