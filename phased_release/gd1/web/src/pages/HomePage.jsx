import { useAuth } from '../hooks/useAuth.js';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <section className="page home-page">
      <div className="hero">
        <div className="hero-copy">
          <span className="hero-badge">Sprint 1 · Nền tảng &amp; đăng nhập</span>
          <h1>FoodFast Drone Delivery</h1>
          <p>
            Thiết lập nền tảng web và hệ thống đăng nhập với dữ liệu mẫu cho khách hàng, admin và
            nhà hàng. Sau khi đăng nhập bạn sẽ nhìn thấy bảng điều khiển tổng quan về dịch vụ.
          </p>
          <div className="hero-meta">
            <div className="hero-pill">
              <strong>Xin chào</strong>
              <span>{user ? user.name : 'Hãy đăng nhập để bắt đầu'}</span>
            </div>
            <div className="hero-pill">
              <strong>3 vai trò</strong>
              <span>Customer · Admin · Restaurant</span>
            </div>
            <div className="hero-pill">
              <strong>Mock data</strong>
              <span>Tài khoản mẫu được cấu hình sẵn</span>
            </div>
          </div>
        </div>
        <div className="hero-controls">
          <div className="hero-actions">
            <button type="button" className="primary-button" disabled>
              Khám phá menu (Sprint 2)
            </button>
            <button type="button" className="ghost-button" disabled>
              Theo dõi đơn hàng (Sprint 3)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
