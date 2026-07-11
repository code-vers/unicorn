'use client';

import SupportCenter from '@/components/dashboard/client/SupportCenter';

export default function SupportPage() {
  return (
    <div className='h-full w-full flex flex-col'>
            <div className='flex-1'>
                <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-10 max-w-[1600px] mx-auto">
            <SupportCenter />
          </div>
        </main>
      </div>
    </div>
  );
}
