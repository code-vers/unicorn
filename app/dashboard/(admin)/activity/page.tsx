'use client';

import RecentActivity from '@/components/dashboard/admin/RecentActivity';
import { useActivity } from '@/hooks/useActivity';
import { Spinner } from '@/components/ui/Spinner';

export default function ActivityPage() {
  const { activities, isLoading, error } = useActivity(50); // Maybe larger limit for full page

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load activities.
      </div>
    );
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-6'>
          <RecentActivity activities={activities as any} />
        </div>
      </div>
    </div>
  );
}
