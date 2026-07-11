import type { Metadata } from 'next';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export const metadata: Metadata = {
  title: 'Dashboard - Unicorn',
  description: 'Unicorn Dashboard Overview',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-white'>
      <DashboardSidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <DashboardHeader />
        <main className='flex-1 overflow-y-auto bg-[#F9FAFB]'>
          <div className='p-6 space-y-6 max-w-[1600px] mx-auto'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
