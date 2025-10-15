import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Header } from '../../src/components/Header';
import { products } from '../../src/data/mockData';
import { colors, radius, spacing } from '../../src/styles/theme';
import { useCart } from '../../src/context/CartContext';

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const { add } = useCart();
  const product = useMemo(() => products.find((item) => item.id === params.id), [params.id]);

  if (!product) {
    return (
      <Screen>
        <Header title="Không tìm thấy sản phẩm" />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title={product.name} subtitle={product.restaurant} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.tags}>
        <Tag label={`Danh mục: ${product.category}`} />
        <Tag label={`Đánh giá ${product.rating}/5`} />
        <Tag label={`Drone giao ${product.deliveryTime} phút`} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
        <Text style={styles.addButton} onPress={() => add(product)}>
          Thêm vào giỏ
        </Text>
      </View>
    </Screen>
  );
}

const Tag = ({ label }) => <Text style={styles.tag}>{label}</Text>;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 220,
    borderRadius: radius.lg
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#0f172a'
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  tag: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,
    color: colors.muted
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary
  },
  addButton: {
    backgroundColor: colors.primary,
    color: 'white',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    fontWeight: '600'
  }
});
