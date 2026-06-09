'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import SettingsForm from '@/components/dashboard/SettingsForm';

export default function SettingsPage() {
  return (
    <div className='flex h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 overflow-auto md:ml-0'>
        <DashboardHeader completedToday={12} />
        <div className='p-6'>
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
