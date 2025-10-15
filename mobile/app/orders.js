import { Screen } from '../src/components/Screen';
import { Header } from '../src/components/Header';
import { OrderCard } from '../src/components/OrderCard';
import { orders as seedOrders } from '../src/data/mockData';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatBadge } from '../src/components/StatBadge';

export default function OrdersScreen() {
  const [orders] = useState(seedOrders);
  const stats = useMemo(() => ({
    total: orders.length,
    delivered: orders.filter((order) => order.status === 'delivered').length,
    inTransit: orders.filter((order) => order.status === 'in_transit').length
  }), [orders]);

  return (
    <Screen>
      <Header title="Đơn hàng" subtitle="Theo dõi tiến độ drone" />
      <View style={styles.stats}>
        <StatBadge label="Tổng đơn" value={stats.total} />
        <StatBadge label="Đã giao" value={stats.delivered} />
        <StatBadge label="Đang giao" value={stats.inTransit} />
      </View>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      <Text style={styles.note}>Drone sẽ cập nhật trạng thái real-time khi đang bay.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: 12
  },
  note: {
    textAlign: 'center',
    color: '#64748b'
  }
});
