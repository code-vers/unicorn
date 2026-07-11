'use client';

import { PendingPayment } from '@/types/dashboard';
import { AlertCircle, MoreVertical } from 'lucide-react';

interface PendingPaymentsProps {
  payments: PendingPayment[];
}

export default function PendingPayments({ payments }: PendingPaymentsProps) {
  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-gray-900'>Pending Payments</h3>
          <p className='text-sm text-gray-500 mt-1'>Overdue listing</p>
        </div>
        <AlertCircle size={20} className='text-red-500' />
      </div>

      <div className='space-y-3'>
        {payments.map((payment) => (
          <div
            key={payment.id}
            className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
          >
            <div className='flex items-center gap-3'>
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm'
                style={{ backgroundColor: payment.avatarColor }}
              >
                {payment.initials}
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>{payment.name}</p>
                <p className='text-xs text-gray-500'>{payment.daysOverdue} days overdue</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='text-right'>
                <p className='text-sm font-bold text-gray-900'>
                  ${payment.amount.toLocaleString()}
                </p>
              </div>
              <button className='p-2 hover:bg-gray-200 rounded-lg transition-colors'>
                <MoreVertical size={16} className='text-gray-400' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className='mt-6 pt-4 border-t border-gray-200'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-gray-600'>Total Overdue</span>
          <span className='text-lg font-bold text-gray-900'>
            ${payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
