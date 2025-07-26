
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut, Auth } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup'];
const publicRoutes = ['/'];
const verificationRoute = '/verify-email';


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(pathname);
    const isVerificationRoute = pathname === verificationRoute;

    if (user) {
      // User is logged in
      if (!user.emailVerified) {
        // If email is not verified, they can only be on the verification page
        if (!isVerificationRoute) {
          router.push(verificationRoute);
        }
      } else {
        // If email is verified, they should not be on auth or verification pages
        if (isAuthRoute || isVerificationRoute) {
          router.push('/dashboard');
        }
      }
    } else {
      // User is not logged in
      if (isProtectedRoute) {
        router.push('/login');
      }
    }

  }, [user, loading, pathname, router]);


  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const value = {
    user,
    loading,
    logout,
  };

  if (loading && protectedRoutes.some(route => pathname.startsWith(route))) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
