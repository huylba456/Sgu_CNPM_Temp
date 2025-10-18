import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { useAuth } from '../hooks/useAuth.js';

const paymentMethods = ['Ví FoodFast Pay', 'Thẻ tín dụng', 'Chuyển khoản'];

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [isConfirming, setIsConfirming] = useState(false);
  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsConfirming(true);
  };

  const handleConfirmPayment = () => {
    setIsConfirming(false);
    clearCart();
    navigate('/orders', {
      state: {
        message: 'Đơn hàng đã được tạo thành công! Drone sẽ cất cánh trong ít phút.'
      }
    });
  };

  const handleCancelConfirmation = () => {
    setIsConfirming(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <h2>Không có món nào trong giỏ hàng</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Thanh toán</h2>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form-section">
          <legend>Thông tin nhận hàng</legend>
          <label className="form-field">
            Tên người nhận
            <input type="text" defaultValue={user?.name ?? ''} required />
          </label>
          <label className="form-field">
            Email
            <input type="email" defaultValue={user?.email ?? ''} required />
          </label>
          <label className="form-field">
            Số điện thoại
            <input type="tel" defaultValue={user?.phone ?? ''} required />
          </label>
          <label className="form-field">
            Địa chỉ drone hạ cánh
            <input type="text" defaultValue={user?.address ?? ''} required />
          </label>
        </fieldset>
        <fieldset className="form-section">
          <legend>Phương thức thanh toán</legend>
          <label className="form-field">
            Phương thức
            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
            </select>
          </label>
          <label className="form-field">
            Ghi chú cho phi hành đoàn
            <textarea value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
        </fieldset>
        <section className="order-summary">
          <h3>Tóm tắt đơn hàng</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}{' '}
                <span>{(item.price * item.quantity).toLocaleString()} đ</span>
              </li>
            ))}
          </ul>
          <p className="total">Tổng cộng: {total.toLocaleString()} đ</p>
          <p className="muted">Drone dự kiến đến trong 12 phút.</p>
        </section>
        <button type="submit" className="primary">
          Xác nhận thanh toán
        </button>
      </form>
      {isConfirming && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Bạn có muốn thanh toán?</h3>
            <p>Đơn hàng sẽ được gửi tới phi hành đoàn drone để xử lý ngay sau khi bạn xác nhận.</p>
            <div className="modal-actions">
              <button type="button" className="ghost-button" onClick={handleCancelConfirmation}>
                Không
              </button>
              <button type="button" className="primary" onClick={handleConfirmPayment}>
                Có
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
