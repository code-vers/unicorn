'use client';

import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SectionSkeleton } from '@/components/ui/Skeleton';

export default function TodayAtGlance() {
  const { overview, isLoading, error } = useAnalytics();

  if (isLoading) {
    return <SectionSkeleton rows={3} />;
  }

  if (error || !overview) {
    return (
      <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] p-5 flex items-center justify-center min-h-[200px] text-red-500 text-sm'>
        Failed to load data.
      </div>
    );
  }

  const metrics = [
    {
      label: "Today's Revenue",
      value: `KSh ${overview.todayRevenue.toLocaleString()}`,
      change: `+12%`, // Mocked change %
      icon: CreditCard,
      bgColor: 'bg-[#EBF7ED]',
      iconColor: 'bg-[rgba(63,163,77,0.13)]',
      textColor: 'text-[#3FA34D]',
    },
    {
      label: 'Completed Today',
      value: overview.completedToday,
      change: 'today',
      icon: Calendar,
      bgColor: 'bg-[#FFF3E8]',
      iconColor: 'bg-[rgba(255,120,21,0.13)]',
      textColor: 'text-[#FF7815]',
    },
    {
      label: 'Pending Arrivals',
      value: overview.pendingArrivals,
      change: 'urgent',
      icon: AlertCircle,
      bgColor: 'bg-[#FFF0F0]',
      iconColor: 'bg-[rgba(255,0,0,0.13)]',
      textColor: 'text-[#DC2626]',
    },
  ];

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] p-5'>
      <div className='flex items-center justify-between border-b border-[#F2F4F7] pb-3 mb-4'>
        <h3 className='text-[14px] font-bold text-[#0A1413] font-montserrat'>
          Today at a Glance
        </h3>
        <span className='text-[#6B7280] text-[12px] font-lato'>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <div className='space-y-3'>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`${metric.bgColor} rounded-[8px] p-2 flex items-center justify-between`}
          >
            <div className='flex items-center gap-3'>
              <div
                className={`${metric.iconColor} p-2 rounded-[8px] flex items-center justify-center`}
              >
                <metric.icon size={12} className={metric.textColor} />
              </div>
              <div>
                <p className='text-[#6B7280] text-[12px] font-semibold font-lato'>
                  {metric.label}
                </p>
                <p
                  className={`${metric.textColor} text-[14px] font-bold font-montserrat`}
                >
                  {metric.value}
                </p>
              </div>
            </div>
            <span className={`${metric.textColor} text-[12px] font-semibold font-lato`}>
              {metric.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
