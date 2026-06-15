'use client';

import SupportCenter from '@/components/dashboard/client/SupportCenter';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function SupportPage() {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Support Center" />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-10 max-w-[1600px] mx-auto">
            <SupportCenter />
          </div>
        </main>
      </div>
    </div>
  );
}
