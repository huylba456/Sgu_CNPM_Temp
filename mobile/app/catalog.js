import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Header } from '../src/components/Header';
import { ProductTile } from '../src/components/ProductTile';
import { categories, products } from '../src/data/mockData';
import { colors, radius, spacing } from '../src/styles/theme';
import { useRouter } from 'expo-router';
import { useCart } from '../src/context/CartContext';

const sorters = [
  { value: 'featured', label: 'Nổi bật' },
  { value: 'priceAsc', label: 'Giá tăng dần' },
  { value: 'priceDesc', label: 'Giá giảm dần' }
];

export default function CatalogScreen() {
  const router = useRouter();
  const { add } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'all') {
      list = list.filter((product) => product.category === category);
    }
    if (search) {
      list = list.filter((product) => `${product.name} ${product.restaurant}`.toLowerCase().includes(search.toLowerCase()));
    }
    if (sort === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [search, category, sort]);

  return (
    <Screen>
      <Header title="Danh mục món ăn" />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm món hoặc nhà hàng"
      />
      <View style={styles.chips}>
        <Chip label="Tất cả" active={category === 'all'} onPress={() => setCategory('all')} />
        {categories.map((item) => (
          <Chip key={item} label={item} active={category === item} onPress={() => setCategory(item)} />
        ))}
      </View>
      <View style={styles.chips}>
        {sorters.map((item) => (
          <Chip key={item.value} label={item.label} active={sort === item.value} onPress={() => setSort(item.value)} />
        ))}
      </View>
      <View>
        {filtered.map((product) => (
          <ProductTile
            key={product.id}
            product={product}
            onPress={(item) => router.push(`/product/${item.id}`)}
            onAdd={add}
          />
        ))}
      </View>
    </Screen>
  );
}

const Chip = ({ label, active, onPress }) => (
  <Text style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
    {label}
  </Text>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surface
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
  }
});
