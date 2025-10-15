import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { Header } from '../../src/components/Header';
import { mockUsers } from '../../src/data/mockData';
import { colors, radius, spacing } from '../../src/styles/theme';
import { generateId } from '../../src/utils/id';

const roles = [
  { value: 'customer', label: 'Khách hàng' },
  { value: 'admin', label: 'Admin' },
  { value: 'restaurant', label: 'Nhà hàng' }
];

export default function AdminUsersScreen() {
  const [users, setUsers] = useState(mockUsers);
  const [form, setForm] = useState({ id: '', name: '', email: '', role: 'customer' });

  const handleSave = () => {
    if (form.id) {
      setUsers((prev) => prev.map((user) => (user.id === form.id ? form : user)));
    } else {
      setUsers((prev) => [...prev, { ...form, id: generateId() }]);
    }
    setForm({ id: '', name: '', email: '', role: 'customer' });
  };

  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    if (form.id === id) {
      setForm({ id: '', name: '', email: '', role: 'customer' });
    }
  };

  return (
    <Screen>
      <Header title="Admin • Người dùng" />
      <View style={styles.form}>
        <Text style={styles.label}>Họ tên</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={form.email} onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))} />
        <Text style={styles.label}>Vai trò</Text>
        <View style={styles.chips}>
          {roles.map((role) => (
            <Text
              key={role.value}
              style={[styles.chip, form.role === role.value && styles.chipActive]}
              onPress={() => setForm((prev) => ({ ...prev, role: role.value }))}
            >
              {role.label}
            </Text>
          ))}
        </View>
        <Text style={styles.submit} onPress={handleSave}>
          {form.id ? 'Cập nhật người dùng' : 'Thêm người dùng'}
        </Text>
      </View>
      <View style={styles.list}>
        {users.map((user) => (
          <View key={user.id} style={styles.item}>
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.muted}>{user.email}</Text>
            </View>
            <View style={styles.actions}>
              <Text style={styles.action} onPress={() => handleEdit(user)}>
                Sửa
              </Text>
              <Text style={styles.delete} onPress={() => handleDelete(user.id)}>
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
