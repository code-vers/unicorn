import Payments from '@/components/dashboard/client/Payments';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function MyPaymentsPage() {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="My Payments" />
        <main className="flex-1 overflow-y-auto bg-white">
          <Payments />
        </main>
      </div>
    </div>
  );
}
