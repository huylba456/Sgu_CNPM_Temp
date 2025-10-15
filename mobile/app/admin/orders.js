import { useMemo, useState } from 'react';
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

export default function AdminOrdersScreen() {
  const [orders, setOrders] = useState(seedOrders);
  const [filter, setFilter] = useState('all');
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() =>
    orders.filter((order) => {
      if (filter !== 'all' && order.status !== filter) {
        return false;
      }
      if (keyword && !order.id.toLowerCase().includes(keyword.toLowerCase())) {
        return false;
      }
      return true;
    }),
  [orders, filter, keyword]);

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const updateDrone = (id, droneId) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, droneId } : order)));
  };

  return (
    <Screen>
      <Header title="Admin • Đơn hàng" />
      <View style={styles.filters}>
        <View style={styles.chips}>
          <Text
            style={[styles.chip, filter === 'all' && styles.chipActive]}
            onPress={() => setFilter('all')}
          >
            Tất cả
          </Text>
          {statuses.map((status) => (
            <Text
              key={status.value}
              style={[styles.chip, filter === status.value && styles.chipActive]}
              onPress={() => setFilter(status.value)}
            >
              {status.label}
            </Text>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Tìm mã đơn"
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>
      <View style={styles.list}>
        {filtered.map((order) => (
          <View key={order.id} style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.name}>{order.id}</Text>
              <Text style={styles.badge}>{order.status}</Text>
            </View>
            <Text style={styles.muted}>{order.items.length} món • {(order.total).toLocaleString()} đ</Text>
            <TextInput
              style={styles.input}
              placeholder="Mã drone"
              value={order.droneId ?? ''}
              onChangeText={(value) => updateDrone(order.id, value)}
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
  filters: {
    gap: spacing.sm
  },
  chips: {
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
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
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
    backgroundColor: '#dbeafe',
    color: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm
  },
  muted: {
    color: colors.muted
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs
  }
});
