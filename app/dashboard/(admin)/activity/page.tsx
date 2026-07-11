'use client';

import RecentActivity from '@/components/dashboard/admin/RecentActivity';
import { getRecentActivity } from '@/lib/dashboard-data';

export default function ActivityPage() {
  const activities = getRecentActivity();

  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <div className='p-6'>
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
}
