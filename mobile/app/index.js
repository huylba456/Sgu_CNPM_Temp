import { Link, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Header } from '../src/components/Header';
import { ProductTile } from '../src/components/ProductTile';
import { categories, products } from '../src/data/mockData';
import { colors, radius, spacing } from '../src/styles/theme';
import { useCart } from '../src/context/CartContext';

export default function HomeScreen() {
  const router = useRouter();
  const { add } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      if (search && !`${product.name} ${product.restaurant}`.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [search, activeCategory]);

  return (
    <Screen>
      <Header
        title="FoodFast Drone"
        subtitle="Giao đồ ăn trong 15 phút"
        right={<Link href="/cart" style={styles.cart}>Giỏ hàng</Link>}
      />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm món hoặc nhà hàng"
        style={styles.search}
      />
      <View style={styles.categories}>
        <CategoryChip label="Tất cả" active={activeCategory === 'all'} onPress={() => setActiveCategory('all')} />
        {categories.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            active={activeCategory === category}
            onPress={() => setActiveCategory(category)}
          />
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
      <View style={styles.links}>
        <Link href="/orders" style={styles.link}>
          Xem đơn hàng
        </Link>
        <Link href="/admin" style={styles.link}>
          Vào dashboard Admin
        </Link>
        <Link href="/restaurant" style={styles.link}>
          Trung tâm Nhà hàng
        </Link>
      </View>
    </Screen>
  );
}

const CategoryChip = ({ label, active, onPress }) => (
  <Text style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
    {label}
  </Text>
);

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: '#e2e8f0',
    color: '#1e293b'
  },
  chipActive: {
    backgroundColor: colors.primary,
    color: 'white'
  },
  cart: {
    backgroundColor: colors.primary,
    color: 'white',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm
  },
  links: {
    gap: spacing.sm
  },
  link: {
    color: colors.primary,
    fontWeight: '600'
  }
});
