import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Header } from '../../src/components/Header';
import { StatBadge } from '../../src/components/StatBadge';
import { restaurants, orders } from '../../src/data/mockData';

export default function RestaurantDashboardScreen() {
  const restaurant = restaurants[0];
  const restaurantOrders = orders.filter((order) => order.droneId);

  return (
    <Screen>
      <Header title="Trung tâm Nhà hàng" subtitle={restaurant.name} />
      <View style={styles.stats}>
        <StatBadge label="Doanh thu" value={`${restaurant.revenue.toLocaleString()} đ`} />
        <StatBadge label="Drone hoạt động" value={restaurant.activeDrones} />
        <StatBadge label="Điểm hài lòng" value={`${restaurant.rating}/5`} />
      </View>
      <View style={styles.links}>
        <Link style={styles.link} href="/restaurant/menu">
          Quản lý menu
        </Link>
        <Link style={styles.link} href="/restaurant/orders">
          Đơn hàng
        </Link>
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Đơn gần đây</Text>
        {restaurantOrders.map((order) => (
          <Text key={order.id} style={styles.muted}>
            {order.id} • {order.status} • {order.total.toLocaleString()} đ
          </Text>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: 12
  },
  links: {
    gap: 12
  },
  link: {
    backgroundColor: '#2563eb',
    color: 'white',
    paddingVertical: 12,
    textAlign: 'center',
    borderRadius: 12,
    fontWeight: '600'
  },
  panel: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    gap: 8
  },
  panelTitle: {
    fontWeight: '700'
  },
  muted: {
    color: '#64748b'
  }
});
