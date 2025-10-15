import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Header } from '../../src/components/Header';
import { products as allProducts, categories } from '../../src/data/mockData';
import { colors, radius, spacing } from '../../src/styles/theme';
import { generateId } from '../../src/utils/id';

export default function RestaurantMenuScreen() {
  const [products, setProducts] = useState(allProducts.filter((item) => item.restaurant === 'FastGrill Station'));
  const [form, setForm] = useState({ id: '', name: '', price: '0', category: categories[0] });

  const handleSave = () => {
    if (form.id) {
      setProducts((prev) => prev.map((item) => (item.id === form.id ? { ...form, price: Number(form.price) } : item)));
    } else {
      setProducts((prev) => [...prev, { ...form, id: generateId(), price: Number(form.price) }]);
    }
    setForm({ id: '', name: '', price: '0', category: categories[0] });
  };

  const handleEdit = (product) => {
    setForm({ ...product, price: String(product.price) });
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (form.id === id) {
      setForm({ id: '', name: '', price: '0', category: categories[0] });
    }
  };

  return (
    <Screen>
      <Header title="Nhà hàng • Menu" />
      <View style={styles.form}>
        <Text style={styles.label}>Tên món</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))} />
        <Text style={styles.label}>Giá</Text>
        <TextInput style={styles.input} value={form.price} keyboardType="numeric" onChangeText={(value) => setForm((prev) => ({ ...prev, price: value }))} />
        <Text style={styles.label}>Danh mục</Text>
        <View style={styles.chips}>
          {categories.map((category) => (
            <Text
              key={category}
              style={[styles.chip, form.category === category && styles.chipActive]}
              onPress={() => setForm((prev) => ({ ...prev, category }))}
            >
              {category}
            </Text>
          ))}
        </View>
        <Text style={styles.submit} onPress={handleSave}>
          {form.id ? 'Cập nhật món' : 'Thêm món mới'}
        </Text>
      </View>
      <View style={styles.list}>
        {products.map((product) => (
          <View key={product.id} style={styles.item}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.muted}>{product.category}</Text>
            </View>
            <View style={styles.actions}>
              <Text style={styles.action} onPress={() => handleEdit(product)}>
                Sửa
              </Text>
              <Text style={styles.delete} onPress={() => handleDelete(product.id)}>
                Xoá
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
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
  submit: {
    backgroundColor: colors.primary,
    color: 'white',
    textAlign: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    fontWeight: '600'
  },
  list: {
    gap: spacing.sm
  },
  item: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: '600'
  },
  muted: {
    color: colors.muted
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  action: {
    color: colors.primary,
    fontWeight: '600'
  },
  delete: {
    color: colors.danger,
    fontWeight: '600'
  }
});
