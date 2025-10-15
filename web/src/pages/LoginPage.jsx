import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const LoginPage = () => {
  const { login } = useAuth();
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
    navigate('/');
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
      </form>
    </div>
  );
};

export default LoginPage;
