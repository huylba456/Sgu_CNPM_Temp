import { useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { initialOrders } from '../data/mockOrders.js';
import StatsCard from '../components/StatsCard.jsx';

const statusLabels = {
  pending: 'Chờ xác nhận',
  preparing: 'Đang chuẩn bị',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Hủy'
};

const OrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const location = useLocation();
  const stats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter((order) => order.status === 'delivered').length;
    const shipping = orders.filter((order) => order.status === 'shipping').length;
    return {
      total,
      delivered,
      shipping
    };
  }, [orders]);

  const handleCancelOrder = (id) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: 'cancelled' } : order))
    );
  };

  return (
    <div className="page">
      <header className="page-header">
        <h2>Đơn hàng của tôi</h2>
        {location.state?.message && <div className="toast success">{location.state.message}</div>}
        <div className="stat-grid">
          <StatsCard title="Tổng đơn" value={stats.total} />
          <StatsCard title="Đã giao" value={stats.delivered} />
          <StatsCard title="Đang giao" value={stats.shipping} />
        </div>
      </header>
      <section className="order-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <header>
              <h3>Đơn {order.id}</h3>
              <span className={`status ${order.status}`}>{statusLabels[order.status]}</span>
            </header>
            <div className="order-meta">
              <p>
                <strong>Địa chỉ giao:</strong> {order.deliveryAddress ?? order.customerAddress}
              </p>
              <p>
                <strong>Thanh toán:</strong> {order.paymentMethod ?? 'Đang cập nhật'}
              </p>
            </div>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity}
                  <span>{(item.price * item.quantity).toLocaleString()} đ</span>
                </li>
              ))}
            </ul>
            <footer>
              <p>Tổng: {order.total.toLocaleString()} đ</p>
              <p className="muted">Drone phụ trách: {order.droneId ?? 'Đang phân bổ'}</p>
              <p className="muted">Thời gian đặt: {new Date(order.placedAt).toLocaleString('vi-VN')}</p>
              {order.status === 'pending' && (
                <button
                  type="button"
                  className="cancel-order-button"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Hủy đơn hàng
                </button>
              )}
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
};

export default OrdersPage;
