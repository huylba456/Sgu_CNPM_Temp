import { useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { initialOrders } from '../data/mockOrders.js';
import StatsCard from '../components/StatsCard.jsx';

const statusLabels = {
  processing: 'Chuẩn bị',
  in_transit: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã huỷ'
};

const OrdersPage = () => {
  const [orders] = useState(initialOrders);
  const location = useLocation();
  const stats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter((order) => order.status === 'delivered').length;
    const inTransit = orders.filter((order) => order.status === 'in_transit').length;
    return {
      total,
      delivered,
      inTransit
    };
  }, [orders]);

  return (
    <div className="page">
      <header className="page-header">
        <h2>Đơn hàng của tôi</h2>
        {location.state?.message && <div className="toast success">{location.state.message}</div>}
        <div className="stat-grid">
          <StatsCard title="Tổng đơn" value={stats.total} />
          <StatsCard title="Đã giao" value={stats.delivered} />
          <StatsCard title="Đang giao" value={stats.inTransit} />
        </div>
      </header>
      <section className="order-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <header>
              <h3>Đơn {order.id}</h3>
              <span className={`status ${order.status}`}>{statusLabels[order.status]}</span>
            </header>
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
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
};

export default OrdersPage;
