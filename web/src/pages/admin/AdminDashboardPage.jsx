import StatsCard from '../../components/StatsCard.jsx';
import DataTable from '../../components/DataTable.jsx';
import { initialOrders } from '../../data/mockOrders.js';
import { products } from '../../data/mockProducts.js';
import { users } from '../../data/mockUsers.js';

const AdminDashboardPage = () => {
  const latestOrders = initialOrders.slice(0, 3);
  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map((item) => ({ name: item.name, restaurant: item.restaurant, rating: item.rating }));

  const columns = [
    {
      header: 'Món ăn',
      accessorKey: 'name'
    },
    {
      header: 'Nhà hàng',
      accessorKey: 'restaurant'
    },
    {
      header: 'Đánh giá',
      accessorKey: 'rating'
    }
  ];

  return (
    <div className="page dashboard">
      <h2>Dashboard tổng quan</h2>
      <div className="stat-grid">
        <StatsCard title="Tổng doanh thu" value="₫ 4.8B" trend="+18% so với tháng trước" />
        <StatsCard title="Đơn hàng trong ngày" value="128" trend="12 drone đang hoạt động" />
        <StatsCard title="Khách hàng mới" value={`${users.length}`} trend="+32% tuần này" />
      </div>
      <section className="panel">
        <h3>Đơn hàng gần nhất</h3>
        <div className="order-list compact">
          {latestOrders.map((order) => (
            <div key={order.id} className="order-card compact">
              <h4>{order.id}</h4>
              <p>{order.customerName}</p>
              <p className={`status ${order.status}`}>{order.status}</p>
              <span>{order.total.toLocaleString()} đ</span>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <h3>Món ăn được yêu thích</h3>
        <DataTable columns={columns} data={topProducts} />
      </section>
    </div>
  );
};

export default AdminDashboardPage;
