'use client';

import { RevenueGrowth } from '@/types/dashboard';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RevenueGrowthChartProps {
  data: RevenueGrowth[];
}

export default function RevenueGrowthChart({ data }: RevenueGrowthChartProps) {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <h3 className='text-[#0A1413] text-[20px] font-montserrat font-bold leading-[1.6]'>
        Revenue Growth
      </h3>
      <div className='w-full h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'Lato',
              }}
            />
            <Area
              type='monotone'
              dataKey='revenue'
              stroke='#FF7815'
              fill='transparent'
              strokeWidth={2}
              dot={{ r: 4, fill: '#FF7815', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <div className='w-3.5 h-3.5 bg-[#FF7815] rounded-sm'></div>
        <span className='text-[#FF7815] text-[14px] font-nunito'>revenue</span>
      </div>
    </div>
  );
}
