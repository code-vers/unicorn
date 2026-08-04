'use client';

import { useNotifications } from '@/hooks/useNotifications';
import { Spinner } from '@/components/ui/Spinner';

export default function NotificationsList() {
  const { notifications, isLoading, error, markAsRead } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full max-w-[1630px]">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full max-w-[1630px] text-red-500 text-sm">
        Failed to load notifications.
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full max-w-[1630px] text-gray-500 text-sm">
        No notifications.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[20px] w-full max-w-[1630px]">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={`border-[#e5e7eb] border-[1.5px] border-solid flex flex-col gap-[6px] items-start p-[16px] relative rounded-[8px] w-full shadow-sm ${notification.isRead ? 'bg-gray-50' : 'bg-white'}`}
          onClick={() => !notification.isRead && markAsRead(notification.id)}
        >
          <div className="flex w-full items-start justify-between">
            <h4 className="font-['Montserrat:Bold'] font-bold text-[14px] text-black leading-[1.6]">
              {notification.title}
              {!notification.isRead && (
                <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </h4>
            <span className="font-['Lato:Regular'] font-normal text-[#6b7280] text-[12px] whitespace-nowrap ml-4">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="font-['Nunito:Regular'] font-normal text-[#6b7280] text-[14px] leading-snug">
            {notification.message}
          </p>
        </div>
      ))}
    </div>
  );
}
