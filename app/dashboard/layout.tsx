import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Unicorn',
  description: 'Unicorn Dashboard Overview',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
