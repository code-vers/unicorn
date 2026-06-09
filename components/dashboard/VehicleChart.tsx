'use client';

import { VehicleStats } from '@/types/dashboard';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface VehicleChartProps {
  data: VehicleStats[];
}

export default function VehicleChart({ data }: VehicleChartProps) {
  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-gray-900'>Most Booked Vehicles</h3>
        <p className='text-sm text-gray-500 mt-1'>Vehicle distribution</p>
      </div>

      <div className='w-full h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ type, count }) => `${type}: ${count}`}
              outerRadius={100}
              fill='#8884d8'
              dataKey='count'
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className='grid grid-cols-2 gap-3 mt-6'>
        {data.map((item) => (
          <div key={item.type} className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full' style={{ backgroundColor: item.color }} />
            <div className='flex-1'>
              <p className='text-sm font-medium text-gray-900'>{item.type}</p>
              <p className='text-xs text-gray-500'>{item.count} vehicles</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
