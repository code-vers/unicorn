'use client';

import VehiclesTable from '@/components/dashboard/admin/VehiclesTable';
import VehiclesToolbar from '@/components/dashboard/admin/VehiclesToolbar';

export default function VehiclesPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className='flex-1 overflow-y-auto bg-[#F9FAFB]'>
          <div className='p-6 max-w-[1600px] mx-auto space-y-6'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-2xl font-bold text-[#1A202C]'>Vehicle Management</h1>
              <p className='text-sm text-[#718096]'>
                Manage and track all vehicles in your inventory
              </p>
            </div>

            <div className='bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col'>
              <VehiclesToolbar />
              <VehiclesTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
