import { Stack } from 'expo-router';
import { useState } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { CartContextProvider } from '../src/context/CartContext';

export default function RootLayout() {
  const [user, setUser] = useState({
    id: 'u1',
    name: 'Mai Anh',
    email: 'customer@foodfast.io',
    role: 'customer'
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CartContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="catalog" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="orders" />
          <Stack.Screen name="admin/index" />
          <Stack.Screen name="admin/products" />
          <Stack.Screen name="admin/users" />
          <Stack.Screen name="admin/orders" />
          <Stack.Screen name="restaurant/index" />
          <Stack.Screen name="restaurant/menu" />
          <Stack.Screen name="restaurant/orders" />
          <Stack.Screen name="login" />
        </Stack>
      </CartContextProvider>
    </AuthContext.Provider>
  );
}
