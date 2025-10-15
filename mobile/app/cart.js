import { Link } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Header } from '../src/components/Header';
import { useCart } from '../src/context/CartContext';
import { colors, radius, spacing } from '../src/styles/theme';

export default function CartScreen() {
  const { items, update, remove } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Screen>
      <Header title="Giỏ hàng" subtitle="Drone sẽ cất cánh sau khi thanh toán" />
      {items.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống. Hãy thêm món yêu thích!</Text>
      ) : (
        <View style={styles.list}>
          {items.map((item) => (
            <View key={item.id} style={styles.item}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{(item.price * item.quantity).toLocaleString()} đ</Text>
              </View>
              <Text style={styles.muted}>{item.restaurant}</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.quantity}
                  keyboardType="numeric"
                  value={String(item.quantity)}
                  onChangeText={(value) => update(item.id, Number(value) || 1)}
                />
                <Text style={styles.remove} onPress={() => remove(item.id)}>
                  Xoá
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{total.toLocaleString()} đ</Text>
          </View>
          <Link href="/checkout" style={styles.checkout}>
            Thanh toán
          </Link>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    color: colors.muted
  },
  list: {
    gap: spacing.md
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
  price: {
    fontWeight: '700',
    color: colors.primary
  },
  muted: {
    color: colors.muted
  },
  quantity: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    minWidth: 60
  },
  remove: {
    color: colors.danger,
    fontWeight: '600'
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalLabel: {
    fontWeight: '600'
  },
  totalValue: {
    fontWeight: '700',
    color: colors.primary
  },
  checkout: {
    backgroundColor: colors.primary,
    color: 'white',
    textAlign: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    fontWeight: '600'
  }
});
