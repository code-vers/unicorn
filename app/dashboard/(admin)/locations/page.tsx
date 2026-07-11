'use client';

import LocationsTable from '@/components/dashboard/admin/LocationsTable';

export default function LocationsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Location Management</h2>
            <p className='text-gray-600 mt-1 font-lato'>View and manage all pickup and drop-off locations</p>
          </div>
          <LocationsTable />
        </div>
      </div>
    </div>
  );
}
