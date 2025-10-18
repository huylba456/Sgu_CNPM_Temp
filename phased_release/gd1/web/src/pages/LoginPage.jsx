import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const mockCredentials = [
  { label: 'Customer', value: 'customer@foodfast.io / 123456' },
  { label: 'Admin', value: 'admin@foodfast.io / admin' },
  { label: 'Restaurant', value: 'restaurant@foodfast.io / restaurant' }
];

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('customer@foodfast.io');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    const result = login(email, password);
    if (!result.success) {
      setMessage(result.message);
      return;
    }
    navigate('/', { replace: true });
  };

  return (
    <section className="page auth">
      <form className="form auth-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập FoodFast</h2>
        <p className="muted">Sử dụng tài khoản mock bên dưới để trải nghiệm nhanh ứng dụng.</p>
        {message && <div className="toast error">{message}</div>}
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary full">
          Đăng nhập
        </button>
        <div className="muted credential-hint">
          {mockCredentials.map((item) => (
            <p key={item.label}>
              {item.label}: {item.value}
            </p>
          ))}
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
