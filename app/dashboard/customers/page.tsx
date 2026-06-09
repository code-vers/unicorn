'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import CustomersTable from '@/components/dashboard/CustomersTable';

export default function CustomersPage() {
  return (
    <div className='flex h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 overflow-auto md:ml-0'>
        <DashboardHeader completedToday={12} />
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
