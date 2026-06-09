'use client';

import { Activity, AlertCircle, CheckCircle, CreditCard, User } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'booking' | 'payment' | 'driver' | 'service' | 'assignment';
  title: string;
  description: string;
  time: string;
  status?: 'new' | 'pending' | 'completed';
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const getIcon = (type: string) => {
  switch (type) {
    case 'booking':
      return <Activity size={18} />;
    case 'driver':
      return <User size={18} />;
    case 'payment':
      return <CreditCard size={18} />;
    case 'service':
      return <CheckCircle size={18} />;
    case 'assignment':
      return <AlertCircle size={18} />;
    default:
      return <Activity size={18} />;
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'new':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'completed':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getIconBg = (type: string) => {
  switch (type) {
    case 'booking':
      return 'bg-blue-100 text-blue-600';
    case 'driver':
      return 'bg-purple-100 text-purple-600';
    case 'payment':
      return 'bg-orange-100 text-orange-600';
    case 'service':
      return 'bg-green-100 text-green-600';
    case 'assignment':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-gray-900'>Recent Activity</h3>
          <p className='text-sm text-gray-500 mt-1'>Latest updates</p>
        </div>
        <a
          href='/dashboard/activity'
          className='text-sm font-semibold text-purple-600 hover:text-purple-700'
        >
          View All
        </a>
      </div>

      <div className='space-y-4'>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className='flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0'
          >
            {/* Icon */}
            <div className={`p-2 rounded-lg ${getIconBg(activity.type)}`}>
              {getIcon(activity.type)}
            </div>

            {/* Content */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between gap-2'>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>{activity.title}</p>
                  <p className='text-sm text-gray-600 truncate'>{activity.description}</p>
                </div>
                {activity.status && (
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(
                      activity.status,
                    )}`}
                  >
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                )}
              </div>
              <p className='text-xs text-gray-500 mt-2'>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
