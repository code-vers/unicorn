'use client';

import { getRecentActivity } from '@/lib/dashboard-data';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  CreditCard,
  TrendingUp,
  UserCheck,
} from 'lucide-react';

export default function RecentActivityDetailed() {
  const activities = getRecentActivity();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return {
          icon: Calendar,
          color: 'text-[#3FA34D]',
          bgColor: 'bg-[#EBF7ED]',
          borderColor: 'border-[rgba(63,163,77,0.1)]',
        };
      case 'driver':
        return {
          icon: UserCheck,
          color: 'text-[#0891B2]',
          bgColor: 'bg-[#E0F7FF]',
          borderColor: 'border-[rgba(8,145,178,0.1)]',
        };
      case 'payment':
        return {
          icon: CreditCard,
          color: 'text-[#FF7815]',
          bgColor: 'bg-[#FFF3E8]',
          borderColor: 'border-[rgba(255,120,21,0.1)]',
        };
      case 'service':
      case 'assignment':
        return {
          icon: CheckCircle2,
          color: 'text-[#3FA34D]',
          bgColor: 'bg-[#EBF7ED]',
          borderColor: 'border-[rgba(46,122,57,0.1)]',
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-[#D8A500]',
          bgColor: 'bg-[#FFFAE0]',
          borderColor: 'border-[rgba(216,165,0,0.1)]',
        };
    }
  };

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col'>
      <div className='p-4 border-b border-[#F2F4F7] flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='bg-[#EBF7ED] p-1.5 rounded-[7px]'>
            <TrendingUp size={14} className='text-[#3FA34D]' />
          </div>
          <div>
            <h3 className='text-[14px] font-bold text-[#0A1413] font-montserrat'>
              Recent Activity
            </h3>
            <p className='text-[#6B7280] text-[10px] font-lato'>Live updates</p>
          </div>
        </div>
        <div className='bg-[#FFF3E8] px-2 py-0.5 rounded-full flex items-center gap-1.5'>
          <div className='w-1.5 h-1.5 bg-[#FF7815] rounded-full' />
          <span className='text-[#FF7815] text-[10px] font-lato'>Live</span>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {activities.map((activity, index) => {
          const config = getIcon(activity.type);
          return (
            <div
              key={activity.id}
              className={`p-4 flex items-start justify-between border-b border-[#FAFBFC] last:border-0`}
            >
              <div className='flex gap-3'>
                <div className='flex flex-col items-center gap-1.5'>
                  <div
                    className={`${config.bgColor} ${config.borderColor} border p-1.5 rounded-[6px]`}
                  >
                    <config.icon size={12} className={config.color} />
                  </div>
                  {index !== activities.length - 1 && <div className='w-px h-10 bg-[#EEF1F5]' />}
                </div>
                <div className='space-y-3'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <p className='text-[14px] font-bold text-[#0A1413] font-lato'>
                        {activity.title}
                      </p>
                      {activity.status === 'new' && (
                        <span className='bg-[#3FA34D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] font-lato'>
                          New
                        </span>
                      )}
                      {activity.title === 'Payment Overdue' && (
                        <span className='bg-[#FF7815] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] font-lato'>
                          Overdue
                        </span>
                      )}
                      {activity.title === 'Service Alert' && (
                        <span className='bg-[#D8A500] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] font-lato'>
                          Alert
                        </span>
                      )}
                    </div>
                    <p className='text-[12px] text-[#6B7280] font-lato'>{activity.description}</p>
                  </div>
                  <div className='bg-[#F4F6F8] inline-block px-1.5 py-0.5 rounded-[3px]'>
                    <span className='text-[10px] text-[#6B7280] font-lato'>BK-4022</span>
                  </div>
                </div>
              </div>
              <span className='text-[12px] text-[#6B7280] font-lato whitespace-nowrap'>
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>

      <div className='p-3 border-t border-[#E8ECF0] space-y-3'>
        <button className='w-full py-1.5 text-[12px] text-[#6B7280] font-lato hover:bg-gray-50 rounded-[7px] transition-colors'>
          Show 3 More
        </button>
        <button className='w-full bg-[#3FA34D] text-white py-3 rounded-[6px] text-[14px] font-bold font-montserrat hover:bg-[#348a41] transition-colors'>
          View All Activity
        </button>
      </div>
    </div>
  );
}
