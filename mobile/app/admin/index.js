import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Header } from '../../src/components/Header';
import { StatBadge } from '../../src/components/StatBadge';
import { orders } from '../../src/data/mockData';
import { products } from '../../src/data/mockData';
import { mockUsers } from '../../src/data/mockData';
import { colors, radius, spacing } from '../../src/styles/theme';

export default function AdminDashboardScreen() {
  return (
    <Screen>
      <Header title="Admin" subtitle="Điều hành FoodFast" />
      <View style={styles.stats}>
        <StatBadge label="Tổng đơn" value={orders.length} />
        <StatBadge label="Sản phẩm" value={products.length} />
        <StatBadge label="Người dùng" value={mockUsers.length} />
      </View>
      <View style={styles.links}>
        <Link style={styles.link} href="/admin/products">
          Quản lý sản phẩm
        </Link>
        <Link style={styles.link} href="/admin/users">
          Quản lý người dùng
        </Link>
        <Link style={styles.link} href="/admin/orders">
          Quản lý đơn hàng
        </Link>
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Hoạt động Drone</Text>
        <Text style={styles.muted}>12 drone đang hoạt động • Thời gian giao trung bình 13 phút</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  links: {
    gap: spacing.sm
  },
  link: {
    backgroundColor: colors.primary,
    color: 'white',
    paddingVertical: spacing.sm,
    textAlign: 'center',
    borderRadius: radius.md,
    fontWeight: '600'
  },
  panel: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    gap: spacing.sm
  },
  panelTitle: {
    fontWeight: '700'
  },
  muted: {
    color: colors.muted
  }
});
