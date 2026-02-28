'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { PortalMode, UserRole, StudentProfile } from './types';
import {
  PORTAL_MODE_KEY,
  PORTAL_ROLE_KEY,
  STUDENT_PROFILE_KEY,
  ACCESS_CODES,
} from './constants';

interface PortalContextValue {
  mode: PortalMode;
  role: UserRole;
  studentProfile: StudentProfile | null;
  setMode: (mode: PortalMode) => void;
  authenticate: (code: string) => UserRole | null;
  registerStudent: (profile: StudentProfile) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortalMode>('demo');
  const [role, setRole] = useState<UserRole>('guest');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedMode = sessionStorage.getItem(PORTAL_MODE_KEY) as PortalMode | null;
    const storedRole = sessionStorage.getItem(PORTAL_ROLE_KEY) as UserRole | null;
    const storedProfile = sessionStorage.getItem(STUDENT_PROFILE_KEY);

    if (storedMode === 'demo' || storedMode === 'pilot') setModeState(storedMode);
    if (storedRole) setRole(storedRole);
    if (storedProfile) {
      try { setStudentProfile(JSON.parse(storedProfile)); } catch { /* ignore */ }
    }
    setHydrated(true);
  }, []);

  const setMode = useCallback((newMode: PortalMode) => {
    setModeState(newMode);
    sessionStorage.setItem(PORTAL_MODE_KEY, newMode);
    if (newMode === 'demo') {
      setRole('guest');
      setStudentProfile(null);
      sessionStorage.removeItem(PORTAL_ROLE_KEY);
      sessionStorage.removeItem(STUDENT_PROFILE_KEY);
    }
  }, []);

  const authenticate = useCallback((code: string): UserRole | null => {
    const trimmed = code.trim().toUpperCase();
    for (const [roleKey, accessCode] of Object.entries(ACCESS_CODES)) {
      if (trimmed === accessCode) {
        const matchedRole = roleKey as UserRole;
        setRole(matchedRole);
        sessionStorage.setItem(PORTAL_ROLE_KEY, matchedRole);
        return matchedRole;
      }
    }
    return null;
  }, []);

  const registerStudent = useCallback((profile: StudentProfile) => {
    setStudentProfile(profile);
    sessionStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile));
  }, []);

  const logout = useCallback(() => {
    setRole('guest');
    setStudentProfile(null);
    sessionStorage.removeItem(PORTAL_ROLE_KEY);
    sessionStorage.removeItem(STUDENT_PROFILE_KEY);
  }, []);

  if (!hydrated) return null;

  return (
    <PortalContext.Provider
      value={{
        mode,
        role,
        studentProfile,
        setMode,
        authenticate,
        registerStudent,
        logout,
        isAuthenticated: role !== 'guest',
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used within PortalProvider');
  return ctx;
}
