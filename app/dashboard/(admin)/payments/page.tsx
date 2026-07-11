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

          {/* Summary Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <div className='bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-sm'>
              <h3 className='text-[#6B7280] text-[16px] font-lato mb-3'>Total Paid</h3>
              <p className='text-[#3FA34D] text-[24px] font-montserrat font-bold'>$1,490</p>
            </div>
            <div className='bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-sm'>
              <h3 className='text-[#6B7280] text-[16px] font-lato mb-3'>Pending Payments</h3>
              <p className='text-[#FF7815] text-[24px] font-montserrat font-bold'>$400</p>
            </div>
            <div className='bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-sm'>
              <h3 className='text-[#6B7280] text-[16px] font-lato mb-3'>Partial Payments</h3>
              <p className='text-[#FF7815] text-[24px] font-montserrat font-bold'>$840</p>
            </div>
          </div>

          <PaymentsTable />
        </div>
      </div>
    </div>
  );
}
