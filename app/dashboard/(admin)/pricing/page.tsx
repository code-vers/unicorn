'use client';

import PricingForm from '@/components/dashboard/admin/PricingForm';

export default function PricingPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Pricing Management</h2>
            <p className='text-gray-600 mt-1 font-lato'>Configure rates, service fees, and special offers</p>
          </div>
          <PricingForm />
        </div>
      </div>
    </div>
  );
}
