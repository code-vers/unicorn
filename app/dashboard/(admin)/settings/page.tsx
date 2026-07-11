'use client';

import SettingsForm from '@/components/dashboard/admin/SettingsForm';

export default function SettingsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <div className='p-6'>
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
