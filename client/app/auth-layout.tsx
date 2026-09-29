'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopHeader } from '@/components/layout/TopHeader';
import { Navbar } from '@/components/layout/Navbar';
import { AuthProvider } from '@/features/auth/AuthContext';
import { useAuth } from '@/features/auth/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { QueryProvider } from '@/providers/QueryProvider';

function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPath = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/register');

  useEffect(() => {
    if (!loading && !user && !isPublicPath) {
      router.push('/login');
    }
  }, [user, loading, isPublicPath, router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>;
  }

  return (
    <>
      {isPublicPath ? <Navbar /> : (
        <>
          <TopHeader />
          <Sidebar />
        </>
      )}
      <main className={isPublicPath ? 'flex-1' : 'flex-1 flex ml-[250px]'}>
        {isPublicPath ? (
          <div className="flex-1">
            {children}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        )}
      </main>
    </>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AuthLayoutContent>{children}</AuthLayoutContent>
      </AuthProvider>
    </QueryProvider>
  );
}
