'use client';

import { VehicleDistribution } from '@/types/dashboard';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface VehicleDistributionChartProps {
  data: VehicleDistribution[];
}

export default function VehicleDistributionChart({ data }: VehicleDistributionChartProps) {
  return (
    <div className='flex flex-col gap-6 w-full items-center'>
      <h3 className='text-[#0A1413] text-[20px] font-montserrat font-bold leading-[1.6] w-full text-left'>
        Vehicle Category Distribution
      </h3>
      <div className='w-full h-[300px] relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey='count'
              nameKey='category'
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Lato',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='flex flex-wrap justify-center gap-6'>
        {data.map((item) => (
          <div key={item.category} className='flex items-center gap-2'>
            <div className='w-3.5 h-3.5 rounded-sm' style={{ backgroundColor: item.color }}></div>
            <span className='text-[14px] font-nunito' style={{ color: item.color === '#9CA3AF' ? '#6B7280' : item.color }}>
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
