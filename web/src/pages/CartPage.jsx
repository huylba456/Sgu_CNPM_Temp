import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page">
      <header className="page-header">
        <h2>Giỏ hàng của bạn</h2>
        <p className="muted">Drone sẽ cất cánh ngay khi bạn hoàn tất thanh toán.</p>
      </header>
      {cartItems.length === 0 ? (
        <div className="empty-state">
          <p>Giỏ hàng đang trống. Hãy khám phá các món ngon nhé!</p>
          <Link to="/products" className="secondary">
            Tiếp tục đặt món
          </Link>
        </div>
      ) : (
        <div className="cart">
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p className="muted">{item.restaurant}</p>
                  <div className="quantity">
                    <label>
                      Số lượng
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                      />
                    </label>
                    <span>{(item.price * item.quantity).toLocaleString()} đ</span>
                  </div>
                </div>
                <button type="button" className="danger" onClick={() => removeFromCart(item.id)}>
                  Xoá
                </button>
              </li>
            ))}
          </ul>
          <footer className="cart-summary">
            <h3>Tổng cộng</h3>
            <p className="total">{total.toLocaleString()} đ</p>
            <Link to="/checkout" className="primary">
              Tiến hành thanh toán
            </Link>
          </footer>
        </div>
      )}
    </div>
  );
};

export default CartPage;
