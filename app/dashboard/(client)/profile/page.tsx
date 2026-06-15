import ClientProfile from '@/components/dashboard/client/ClientProfile';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Profile Settings" />
        <main className="flex-1 overflow-y-auto bg-white">
          <ClientProfile />
        </main>
      </div>
    </div>
  );
}
