'use client';

import { getNotifications } from '@/lib/dashboard-data';

export default function NotificationsList() {
  const notifications = getNotifications();

  return (
    <div className="flex flex-col gap-[20px] w-full max-w-[1630px]">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className="bg-white border-[#e5e7eb] border-[1.5px] border-solid flex flex-col gap-[6px] items-start p-[16px] relative rounded-[8px] w-full shadow-sm"
        >
          <div className="flex w-full items-start justify-between">
            <h4 className="font-['Montserrat:Bold'] font-bold text-[14px] text-black leading-[1.6]">
              {notification.title}
            </h4>
            <span className="font-['Lato:Regular'] font-normal text-[#6b7280] text-[12px] leading-[1.6]">
              {notification.time}
            </span>
          </div>
          <p className="font-['Nunito:Regular'] font-normal text-[#6b7280] text-[14px] leading-[1.6]">
            {notification.description}
          </p>
        </div>
      ))}
    </div>
  );
}
