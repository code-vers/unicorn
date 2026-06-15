import MyBookings from '@/components/dashboard/client/booking';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function MyBookingsPage() {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="My Bookings" />
        <main className="flex-1 overflow-y-auto bg-white">
          <MyBookings />
        </main>
      </div>
    </div>
  );
}
