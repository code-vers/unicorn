'use client';

import PaymentsTable from '@/components/dashboard/admin/PaymentsTable';

export default function PaymentsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Payments / Invoices</h2>
            <p className='text-gray-600 mt-1 font-lato'>Monitor and track all financial transactions</p>
          </div>

          <PaymentsTable />
        </div>
      </div>
    </div>
  );
}
