import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';

const LoginPage = () => {
  const { login, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState('customer@foodfast.io');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    if (result.user.role === 'admin') {
      navigate('/admin', { replace: true });
      return;
    }
    if (result.user.role === 'restaurant') {
      navigate('/restaurant', { replace: true });
      return;
    }
    navigate('/', { replace: true });
  };

  const handleContinueAsGuest = () => {
    clearCart();
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="page auth">
      <form className="form auth-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập FoodFast</h2>
        <p className="muted">Chọn vai trò bằng cách nhập tài khoản mock bên dưới.</p>
        {error && <div className="toast error">{error}</div>}
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Mật khẩu
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" className="primary full">
          Đăng nhập
        </button>
        <div className="muted credential-hint">
          <p>Customer: customer@foodfast.io / 123456</p>
          <p>Admin: admin@foodfast.io / admin</p>
          <p>Nhà hàng: restaurant@foodfast.io / restaurant</p>
        </div>
        <button type="button" className="link-button" onClick={handleContinueAsGuest}>
          Tiếp tục mà không đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
