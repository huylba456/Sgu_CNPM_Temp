import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Header } from '../../src/components/Header';
import { orders as seedOrders } from '../../src/data/mockData';
import { colors, radius, spacing } from '../../src/styles/theme';

const statuses = [
  { value: 'processing', label: 'Chuẩn bị' },
  { value: 'in_transit', label: 'Đang giao' },
  { value: 'delivered', label: 'Đã giao' },
  { value: 'cancelled', label: 'Đã huỷ' }
];

export default function RestaurantOrdersScreen() {
  const [orders, setOrders] = useState(seedOrders);

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const updateNote = (id, note) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, note } : order)));
  };

  return (
    <Screen>
      <Header title="Nhà hàng • Đơn hàng" />
      <View style={styles.list}>
        {orders.map((order) => (
          <View key={order.id} style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.name}>{order.id}</Text>
              <Text style={styles.badge}>{order.status}</Text>
            </View>
            <Text style={styles.muted}>{order.items.length} món • {order.total.toLocaleString()} đ</Text>
            <TextInput
              style={styles.input}
              placeholder="Ghi chú cho phi hành đoàn"
              value={order.note ?? ''}
              onChangeText={(value) => updateNote(order.id, value)}
            />
            <View style={styles.actions}>
              {statuses.map((status) => (
                <Text
                  key={status.value}
                  style={[styles.chip, order.status === status.value && styles.chipActive]}
                  onPress={() => updateStatus(order.id, status.value)}
                >
                  {status.label}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm
  },
  item: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    gap: spacing.sm
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: '600'
  },
  badge: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm
  },
  muted: {
    color: colors.muted
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: '#e2e8f0'
  },
  chipActive: {
    backgroundColor: colors.primary,
    color: 'white'
  }
});
