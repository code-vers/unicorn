'use client';

import DocumentsContent from '@/components/dashboard/admin/DocumentsContent';

export default function DocumentsPage() {
  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex-1'>
        <main className='flex-1 overflow-y-auto bg-[#ffffff]'>
          <div className='p-6 space-y-6 max-w-[1600px] mx-auto'>
            <div className='flex items-center justify-between'>
              <h2 className="text-[#0A1413] text-2xl font-bold font-['Montserrat']">
                Document Upload
              </h2>
            </div>

            <DocumentsContent />
          </div>
        </main>
      </div>
    </div>
  );
}
