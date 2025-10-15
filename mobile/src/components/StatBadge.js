import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../styles/theme';

export const StatBadge = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 }
  },
  label: {
    color: colors.muted,
    marginBottom: spacing.xs
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a'
  }
});
