'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DriversTable from '@/components/dashboard/DriversTable';

export default function DriversPage() {
  return (
    <div className='flex h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 overflow-auto md:ml-0'>
        <DashboardHeader />
        <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Driver Management</h2>
            <p className='text-gray-600 mt-1 font-lato'>View and manage all registered drivers</p>
          </div>
          <DriversTable />
        </div>
      </div>
    </div>
  );
}
