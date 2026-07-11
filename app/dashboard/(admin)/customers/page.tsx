'use client';

import CustomersTable from '@/components/dashboard/admin/CustomersTable';

export default function CustomersPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Customer Management</h2>
            <p className='text-gray-600 mt-1 font-lato'>View and manage all registered customers</p>
          </div>
          <CustomersTable />
        </div>
      </div>
    </div>
  );
}
