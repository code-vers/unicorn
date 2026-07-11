'use client';

import { BookingTrend } from '@/types/dashboard';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BookingTrendsChartProps {
  data: BookingTrend[];
}

export default function BookingTrendsChart({ data }: BookingTrendsChartProps) {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <h3 className='text-[#0A1413] text-[20px] font-montserrat font-bold leading-[1.6]'>
        Booking Trends
      </h3>
      <div className='w-full h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#E5E7EB' />
            <XAxis
              dataKey='month'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Lato' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Lato' }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'Lato',
              }}
            />
            <Bar dataKey='bookings' fill='#3FA34D' radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <div className='w-3.5 h-3.5 bg-[#3FA34D] rounded-sm'></div>
        <span className='text-[#3FA344] text-[14px] font-nunito'>bookings</span>
      </div>
    </div>
  );
}
