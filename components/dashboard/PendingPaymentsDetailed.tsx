'use client';

import { getPendingPayments } from '@/lib/dashboard-data';
import { AlertCircle, CreditCard } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

export default function PendingPaymentsDetailed() {
  const data = getPendingPayments();

  const chartData = [
    { name: 'Overdue', value: 4900, color: '#FF7815' },
    { name: 'Pending', value: 7200, color: '#D8A500' },
    { name: 'Cleared', value: 18400, color: '#3FA34D' },
  ];

  return (
    <div className='bg-white border border-[#F6F6F6] rounded-[16px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] p-5 flex flex-col'>
      <div className='flex items-start justify-between mb-6'>
        <div>
          <h3 className='text-[14px] font-bold text-[#0A1413] font-montserrat'>Pending Payments</h3>
          <p className='text-[#6B7280] text-[12px] font-lato'>Invoice ageing summary</p>
        </div>
        <div className='bg-[#FFF0F0] px-2 py-1 rounded-full flex items-center gap-1'>
          <AlertCircle size={10} className='text-[#DC2626]' />
          <span className='text-[#DC2626] text-[10px] font-lato'>4 overdue</span>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-center gap-6 mb-8'>
        <div className='relative w-[80px] h-[80px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={30}
                outerRadius={40}
                paddingAngle={0}
                dataKey='value'
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-[#FF7815] text-[10px] font-extrabold font-montserrat'>£4.9k</p>
          </div>
        </div>

        <div className='flex-1 w-full space-y-2'>
          {chartData.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-1 px-2 rounded-[8px] ${
                item.name === 'Overdue' ? 'bg-[rgba(255,120,21,0.07)]' : ''
              }`}
            >
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-[12px] text-[#6B7280] font-lato'>{item.name}</span>
              </div>
              <span
                className={`text-[12px] font-bold font-montserrat`}
                style={{ color: item.color }}
              >
                £{(item.value / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='flex-1 space-y-4 mb-6'>
        {data.map((payment) => (
          <div
            key={payment.id}
            className='flex items-center justify-between border-t border-[#F6F6F6] pt-4 first:border-0 first:pt-0'
          >
            <div className='flex items-center gap-3'>
              <div className='bg-[#F4F6F8] p-1.5 rounded-[6px]'>
                <CreditCard size={12} className='text-[#0A1413]' />
              </div>
              <div>
                <p className='text-[12px] font-semibold text-[#0A1413] font-lato'>{payment.name}</p>
                <p className='text-[12px] text-[#6B7280] font-lato'>{payment.id}</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-[12px] font-extrabold text-[#0A1413] font-lato'>
                £{payment.amount.toLocaleString()}
              </p>
              <p className='text-[12px] text-[#6B7280] font-lato'>{payment.daysOverdue}d overdue</p>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-auto'>
        <button className='w-full border border-[#FF7815] text-[#FF7815] py-3 rounded-[6px] text-[18px] font-bold font-montserrat hover:bg-[#FFF3E8] transition-colors'>
          View All Overdue Invoices
        </button>
      </div>
    </div>
  );
}
