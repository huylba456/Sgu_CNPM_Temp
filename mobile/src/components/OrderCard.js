import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../styles/theme';

const statusMap = {
  processing: { label: 'Chuẩn bị', color: '#f59e0b' },
  in_transit: { label: 'Đang giao', color: '#2563eb' },
  delivered: { label: 'Đã giao', color: '#16a34a' },
  cancelled: { label: 'Đã huỷ', color: '#dc2626' }
};

export const OrderCard = ({ order }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Text style={styles.title}>Đơn {order.id}</Text>
      <Text style={[styles.status, { color: statusMap[order.status]?.color ?? colors.muted }]}>
        {statusMap[order.status]?.label ?? order.status}
      </Text>
    </View>
    {order.items.map((item) => (
      <View key={item.id} style={styles.row}>
        <Text style={styles.item}>{item.name} x {item.quantity}</Text>
        <Text style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString()} đ</Text>
      </View>
    ))}
    <View style={styles.row}>
      <Text style={styles.total}>Tổng</Text>
      <Text style={styles.total}>{order.total.toLocaleString()} đ</Text>
    </View>
    <Text style={styles.meta}>Drone: {order.droneId ?? 'Đang phân bổ'}</Text>
    <Text style={styles.meta}>Đặt lúc: {new Date(order.placedAt).toLocaleString('vi-VN')}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 }
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  },
  status: {
    fontWeight: '600'
  },
  item: {
    color: colors.muted
  },
  itemPrice: {
    fontWeight: '600'
  },
  total: {
    fontWeight: '700',
    color: colors.primary
  },
  meta: {
    color: colors.muted,
    fontSize: 12
  }
});
