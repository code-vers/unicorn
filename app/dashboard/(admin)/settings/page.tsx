'use client';

import SettingsForm from '@/components/dashboard/admin/SettingsForm';
import SystemSettingsForm from '@/components/dashboard/admin/SystemSettingsForm';

export default function SettingsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-6 max-w-7xl mx-auto flex flex-col gap-8'>
          <SettingsForm />
          
          <SystemSettingsForm />
        </div>
      </div>
    </div>
  );
}
