'use client';

import { RevenueData } from '@/types/dashboard';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-gray-900'>Revenue vs Expenses</h3>
        <p className='text-sm text-gray-500 mt-1'>Monthly overview</p>
      </div>

      <div className='w-full h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis dataKey='date' stroke='#9ca3af' />
            <YAxis stroke='#9ca3af' />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey='revenue' fill='#10B981' radius={[8, 8, 0, 0]} />
            <Bar dataKey='expenses' fill='#EF4444' radius={[8, 8, 0, 0]} />
            <Bar dataKey='net' fill='#6366F1' radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
