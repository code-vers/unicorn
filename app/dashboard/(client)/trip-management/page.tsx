import TripManagement from '@/components/dashboard/client/TripManagement';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function TripManagementPage() {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Trip Management" />
        <main className="flex-1 overflow-y-auto bg-white">
          <TripManagement />
        </main>
      </div>
    </div>
  );
}
