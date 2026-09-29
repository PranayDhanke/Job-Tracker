'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCurrentUser, useLogin as useLoginHook, useRegister as useRegisterHook, useLogout as useLogoutHook } from '@/hooks/useAuth';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => Promise<void>;
  logout: () => void;
};

// Provide a default context that doesn't throw
const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useCurrentUser();
  const loginMutation = useLoginHook();
  const registerMutation = useRegisterHook();
  const logoutMutation = useLogoutHook();

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    await registerMutation.mutateAsync(data);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const value: AuthContextType = {
    user: user || null,
    loading: isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // Don't throw during static generation, just return default
  if (!context) {
    return defaultContext;
  }
  return context;
};
