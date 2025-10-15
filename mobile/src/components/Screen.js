import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export const Screen = ({ children, scrollable = true, style }) => {
  const Container = scrollable ? ScrollView : SafeAreaView;
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Container contentContainerStyle={scrollable ? styles.content : undefined} style={!scrollable && styles.flex}>
        {children}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 20,
    gap: 16
  },
  flex: {
    flex: 1
  }
});
