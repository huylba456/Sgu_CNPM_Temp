import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Header } from '../src/components/Header';
import { mockUsers } from '../src/data/mockData';
import { useAuth } from '../src/context/AuthContext';
import { colors, radius, spacing } from '../src/styles/theme';

export default function LoginScreen() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('customer@foodfast.io');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    const found = mockUsers.find((user) => user.email === email);
    if (!found) {
      setMessage('Không tìm thấy tài khoản mock.');
      return;
    }
    setUser(found);
    setMessage(`Đăng nhập thành ${found.role}`);
    router.replace('/');
  };

  return (
    <Screen>
      <Header title="Đăng nhập" subtitle="Chọn vai trò bằng email mock" />
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Text style={styles.button} onPress={handleLogin}>
          Đăng nhập
        </Text>
        <Text style={styles.hint}>
          Customer: customer@foodfast.io
          {'\n'}Admin: admin@foodfast.io
          {'\n'}Nhà hàng: restaurant@foodfast.io
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    gap: spacing.md
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
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    textAlign: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    fontWeight: '600'
  },
  hint: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  message: {
    color: colors.primary
  }
});
