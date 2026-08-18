'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'admin' | 'teacher';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes
const TOKEN_EXPIRY_BUFFER = 10 * 60 * 1000; // Refresh if expires within 10 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        localStorage.removeItem('iqra_token');
        setUser(null);
      }
    } catch (e) {
      console.error(e);
      localStorage.removeItem('iqra_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem('iqra_token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      const now = Date.now();

      if (expiryTime - now < TOKEN_EXPIRY_BUFFER) {
        const res = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('iqra_token', data.access_token);
          setUser(data.user);
        } else {
          localStorage.removeItem('iqra_token');
          setUser(null);
        }
      }
    } catch (e) {
      console.error('Token refresh failed:', e);
      localStorage.removeItem('iqra_token');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('iqra_token');
    if (token) {
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [user, refreshToken]);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem('iqra_token', data.access_token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('iqra_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
