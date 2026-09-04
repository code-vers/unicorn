'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PageSkeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/contexts/AuthContext';

const clientRoutes = [
  '/dashboard/client',
  '/dashboard/my-bookings',
  '/dashboard/my-payments',
  '/dashboard/my-documents',
  '/dashboard/trip-management',
  '/dashboard/profile',
  '/dashboard/support'
];

const sharedRoutes = ['/dashboard/notifications'];

export default function DashboardAccessGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isClientRoute = clientRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isSharedRoute = sharedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const denied = Boolean(
    user &&
      !isSharedRoute &&
      ((user.role === 'USER' && !isClientRoute) || (user.role === 'ADMIN' && isClientRoute))
  );

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
    if (!loading && user?.role === 'USER' && !isClientRoute && !isSharedRoute) router.replace('/dashboard/client');
    if (!loading && user?.role === 'ADMIN' && isClientRoute && !isSharedRoute) router.replace('/dashboard');
  }, [isClientRoute, isSharedRoute, loading, router, user]);

  if (loading || !user || denied) return <PageSkeleton className='min-h-screen' />;
  return children;
}
