import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const Layout = () => {
  const { user, logout } = useAuth();
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
        </nav>
        <div className="header-actions">
          {isAuthenticated ? (
            <button type="button" onClick={logout} className="ghost-button">
              Đăng xuất
            </button>
          ) : (
            <Link to="/login" className="header-link">
              Đăng nhập
            </Link>
          )}
        </div>
      </header>
      <main className="app-main full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
