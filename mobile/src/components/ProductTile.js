import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../styles/theme';

export const ProductTile = ({ product, onPress, onAdd }) => (
  <Pressable style={styles.card} onPress={() => onPress?.(product)}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.restaurant}>{product.restaurant}</Text>
      <View style={styles.meta}>
        <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
        <Text style={styles.badge}>{product.deliveryTime} phút</Text>
      </View>
    </View>
    {onAdd && (
      <Pressable style={styles.add} onPress={() => onAdd(product)}>
        <Text style={styles.addText}>+</Text>
      </Pressable>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 }
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: radius.md,
    marginBottom: spacing.md
  },
  info: {
    gap: 6
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a'
  },
  restaurant: {
    color: colors.muted
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    fontWeight: '700',
    color: colors.primary
  },
  badge: {
    backgroundColor: '#eff6ff',
    color: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    fontSize: 12
  },
  add: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  }
});
