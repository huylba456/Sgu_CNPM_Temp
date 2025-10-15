import { createContext, useMemo, useState } from 'react';
import { users } from '../data/mockUsers.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(users[0]);

  const login = (email, password) => {
    const found = users.find((item) => item.email === email && item.password === password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'Thông tin đăng nhập không chính xác' };
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
