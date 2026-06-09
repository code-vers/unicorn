'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { getRecentActivity } from '@/lib/dashboard-data';

export default function ActivityPage() {
  const activities = getRecentActivity();

  return (
    <div className='flex h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 overflow-auto md:ml-0'>
        <DashboardHeader completedToday={12} />
        <div className='p-6'>
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
}
