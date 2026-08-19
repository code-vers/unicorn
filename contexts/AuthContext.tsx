"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User, callbackUrl?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await apiClient.get('/users/me');
        setUser(response.data.data ?? response.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (user: User, callbackUrl?: string) => {
    setUser(user);
    const defaultDestination = user.role === 'ADMIN' ? '/dashboard' : '/dashboard/client';
    const destination =
      callbackUrl?.startsWith('/') && !callbackUrl.startsWith('//')
        ? callbackUrl
        : defaultDestination;
    router.replace(destination);
    router.refresh();
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Local logout still proceeds if the API is unavailable.
    }
    setUser(null);
    router.replace('/login');
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
