'use client';

import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
