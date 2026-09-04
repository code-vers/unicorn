'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SectionSkeleton } from '@/components/ui/Skeleton';

export default function MostBookedVehicles() {
  const { vehicleStats: data, isLoading, error } = useAnalytics();

  if (isLoading) {
    return <SectionSkeleton className='h-[516px]' rows={6} />;
  }

  if (error || !data || data.length === 0) {
    return (
      <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] p-6 h-[516px] flex items-center justify-center text-red-500 text-sm'>
        Failed to load vehicle stats.
      </div>
    );
  }

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] p-6 h-[516px] '>
      <h3 className='text-[18px] font-bold text-[#0A1413] font-montserrat mb-6'>
        Most Booked Vehicles
      </h3>

      <div className='h-[200px] w-full mb-6'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey='count'
              nameKey='type'
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='space-y-3'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-[2px]' style={{ backgroundColor: item.color }} />
              <span className='text-[12px] text-[#6B7280] font-lato'>{item.type}</span>
            </div>
            <span className='text-[12px] font-bold text-[#0A1413] font-montserrat'>
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
