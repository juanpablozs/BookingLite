import React, { createContext, useState, useContext, useEffect } from 'react';
import client from '../services/api';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, businessName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // could validate token here, but keep simple
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await client.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', res.data.tokens.accessToken);
    localStorage.setItem('refreshToken', res.data.tokens.refreshToken);
    setUser(res.data.user);
  };

  const register = async (email: string, password: string, businessName: string) => {
    const res = await client.post('/auth/register', { email, password, businessName });
    localStorage.setItem('accessToken', res.data.tokens.accessToken);
    localStorage.setItem('refreshToken', res.data.tokens.refreshToken);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be in AuthProvider');
  return ctx;
}
