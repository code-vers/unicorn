'use client';

import { getRevenueData } from '@/lib/dashboard-data';
import { TrendingUp } from 'lucide-react';
import {
  Bar,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from 'recharts';

export default function RevenueAnalysis() {
  const data = getRevenueData();

  const metrics = [
    { label: 'TOTAL REV.', value: '£754k', color: 'text-[#3FA34D]' },
    { label: 'TOTAL EXP.', value: '£443k', color: 'text-[#FF7815]' },
    { label: 'NET PROFIT', value: '£311k', color: 'text-[#007BFF]' },
    { label: 'BEST MONTH', value: 'Dec', color: 'text-[#9747FF]' },
  ];

  return (
    <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] p-6 h-full'>
      <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
        <div>
          <h3 className='text-[14px] font-bold text-[#0A1413] font-montserrat'>
            Today at a Glance
          </h3>
          <p className='text-[#6B7280] text-[12px] font-lato'>
            Revenue vs. Expenses — FY 2024
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-6'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-1 bg-[#3FA34D] rounded-full' />
            <span className='text-[12px] text-[#6B7280] font-lato'>Revenue</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-0.5 bg-[#FF7815] rounded-full' />
            <span className='text-[12px] text-[#6B7280] font-lato'>Expenses</span>
          </div>
          <div className='flex items-center gap-2 bg-[#F6F6F6] px-3 py-1 rounded-full'>
            <TrendingUp size={12} className='text-[#3FA34D]' />
            <span className='text-[12px] text-[#3FA34D] font-bold font-lato'>
              +18.4% YoY
            </span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {metrics.map((metric, index) => {
          let valColor = metric.color;
          if (metric.label === 'NET PROFIT') valColor = 'text-[#0891B2]';
          if (metric.label === 'BEST MONTH') valColor = 'text-[#8B5CF6]';
          
          return (
            <div key={index} className='bg-[#F6F6F6] p-3 rounded-[8px]'>
              <p className='text-[10px] font-bold text-[#9CA3AF] tracking-wider mb-1'>
                {metric.label}
              </p>
              <p className={`${valColor} text-[14px] font-bold font-montserrat`}>
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className='h-[300px] w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart data={data}>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#F2F4F7'
            />
            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A0AEC0', fontSize: 12, fontFamily: 'Lato' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A0AEC0', fontSize: 12, fontFamily: 'Lato' }}
              tickFormatter={(value) => `£${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey='revenue'
              fill='#3FA34D'
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Line
              type='monotone'
              dataKey='expenses'
              stroke='#FF7815'
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
