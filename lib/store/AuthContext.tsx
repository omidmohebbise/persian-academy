"use client";

/**
 * Client-side stand-in for a real login session — same shape of trick
 * lib/store/AppStateContext.tsx uses for learning progress: React state +
 * localStorage persistence, with a `hydrated` flag so components never act
 * on the default (logged-out) value before the real one loads. There's no
 * real backend behind this yet (see lib/api/auth.ts), so this only gates
 * the UI, not anything security-sensitive.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "yadegaar_auth_v1";

interface StoredAuth {
  phone: string;
}

interface AuthValue {
  phone: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

function loadPersisted(): string | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return (JSON.parse(raw) as StoredAuth).phone;
  } catch {
    // corrupted/unavailable storage — fall back to logged out
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPhone(loadPersisted());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (phone) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ phone }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [phone, hydrated]);

  function login(nextPhone: string) {
    setPhone(nextPhone);
  }

  function logout() {
    setPhone(null);
  }

  return (
    <AuthContext.Provider
      value={{
        phone,
        isAuthenticated: phone !== null,
        hydrated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
