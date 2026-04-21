import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // TODO: Replace with real API call → POST /api/auth/login
    // const res = await fetch('/api/auth/login', { method:'POST', body: JSON.stringify({email, password}) });
    // const data = await res.json();
    // setUser(data.user);

    // Mock login for now
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const mockUser = {
            id: 1,
            email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'moderator' : 'customer',
          };
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 900);
    });
  };

  const logout = () => {
    // TODO: POST /api/auth/logout
    setUser(null);
  };

  const register = async (name, email, password) => {
    // TODO: POST /api/auth/register
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const mockUser = { id: Date.now(), email, name, role: 'customer' };
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 900);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
