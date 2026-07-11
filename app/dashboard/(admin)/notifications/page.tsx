'use client';

import NotificationsList from '@/components/dashboard/admin/NotificationsList';

export default function NotificationsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Notifications</h2>
            <p className='text-gray-600 mt-1 font-lato'>Stay updated with the latest activity and alerts</p>
          </div>
          <NotificationsList />
        </div>
      </div>
    </div>
  );
}
