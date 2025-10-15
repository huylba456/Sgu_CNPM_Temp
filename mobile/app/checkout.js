import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Header } from '../src/components/Header';
import { useCart } from '../src/context/CartContext';
import { colors, radius, spacing } from '../src/styles/theme';
import { useAuth } from '../src/context/AuthContext';

const methods = ['Ví FoodFast Pay', 'Thẻ tín dụng', 'Tiền mặt khi nhận'];

export default function CheckoutScreen() {
  const { items, clear } = useCart();
  const { user } = useAuth();
  const [payment, setPayment] = useState(methods[0]);
  const [note, setNote] = useState('');

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleSubmit = () => {
    clear();
    router.replace('/orders');
  };

  return (
    <Screen>
      <Header title="Thanh toán" subtitle="Hoàn tất để drone cất cánh" />
      <View style={styles.section}>
        <Text style={styles.label}>Tên người nhận</Text>
        <TextInput style={styles.input} defaultValue={user?.name} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} defaultValue={user?.email} />
        <Text style={styles.label}>Địa chỉ hạ cánh</Text>
        <TextInput style={styles.input} defaultValue="Vinhomes Grand Park" />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Phương thức thanh toán</Text>
        {methods.map((method) => (
          <Text
            key={method}
            style={[styles.option, payment === method && styles.optionActive]}
            onPress={() => setPayment(method)}
          >
            {method}
          </Text>
        ))}
        <Text style={styles.label}>Ghi chú</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          multiline
          numberOfLines={3}
          value={note}
          onChangeText={setNote}
        />
      </View>
      <View style={styles.summary}>
        <Text style={styles.totalLabel}>Tổng cộng</Text>
        <Text style={styles.totalValue}>{total.toLocaleString()} đ</Text>
      </View>
      <Text style={styles.payButton} onPress={handleSubmit}>
        Xác nhận thanh toán
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    gap: spacing.sm
  },
  label: {
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  option: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm
  },
  optionActive: {
    borderColor: colors.primary,
    color: colors.primary
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center'
  },
  totalLabel: {
    fontWeight: '600'
  },
  totalValue: {
    fontWeight: '700',
    color: colors.primary
  },
  payButton: {
    backgroundColor: colors.primary,
    color: 'white',
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    textAlign: 'center',
    fontWeight: '600'
  }
});
