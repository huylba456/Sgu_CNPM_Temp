import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../styles/theme';

export const Header = ({ title, subtitle, right }) => (
  <View style={styles.wrapper}>
    <View style={styles.textGroup}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    {right}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm
  },
  textGroup: {
    flex: 1,
    gap: 4
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary
  },
  subtitle: {
    color: colors.muted
  }
});
