'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DocumentsContent from '@/components/dashboard/DocumentsContent';

export default function DocumentsPage() {
  return (
    <div className='flex h-screen bg-white'>
      <DashboardSidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <DashboardHeader />
        <main className='flex-1 overflow-y-auto bg-[#F9FAFB]'>
          <div className='p-6 space-y-6 max-w-[1600px] mx-auto'>
            <div className='flex items-center justify-between'>
              <h2 className="text-[#0A1413] text-2xl font-bold font-['Montserrat']">Document Upload</h2>
            </div>
            
            <DocumentsContent />
          </div>
        </main>
      </div>
    </div>
  );
}
