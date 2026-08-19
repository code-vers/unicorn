'use client';

import BookingTrendsChart from '@/components/dashboard/admin/BookingTrendsChart';
import RevenueGrowthChart from '@/components/dashboard/admin/RevenueGrowthChart';
import VehicleDistributionChart from '@/components/dashboard/admin/VehicleDistributionChart';
import ReportsMetrics from '@/components/dashboard/admin/ReportsMetrics';
import { useAnalytics } from '@/hooks/useAnalytics';
import { PageSkeleton } from '@/components/ui/Skeleton';

export default function ReportsPage() {
  const { overview, bookingTrends, revenueTrends, vehicleStats, isLoading, error } = useAnalytics();
  
  // Build report metrics dynamically from backend overview
  const reportMetrics = overview ? [
      { label: 'Total Revenue', value: `KSh ${overview.totalRevenue.toLocaleString()}` },
    { label: 'Total Bookings', value: overview.reservations.toString() },
    { label: 'Active Vehicles', value: overview.activeVehicles.toString() },
    { label: 'Completed Today', value: overview.completedToday.toString() },
  ] : [];

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load report analytics.
      </div>
    );
  }

  // Transform vehicleStats to match VehicleDistributionChart expected format
  const vehicleDistribution = vehicleStats.map(stat => ({
    category: stat.type,
    count: stat.count,
    color: stat.color,
  }));

  // RevenueGrowthChart expects { month, revenue, expenses, net } from revenueTrends
  // BookingTrendsChart expects { month, bookings } from bookingTrends

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex-1'>
        <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Analytics & Reports</h2>
            <p className='text-gray-600 mt-1 font-lato'>Monitor business performance and fleet utilization</p>
          </div>

          <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden flex flex-col w-full'>
            <div className='p-8 flex flex-col gap-12'>
              {/* Row 1: Booking Trends & Revenue Growth */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                <BookingTrendsChart data={bookingTrends} />
                <RevenueGrowthChart data={revenueTrends} />
              </div>

              {/* Row 2: Vehicle Distribution & Key Metrics */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                <VehicleDistributionChart data={vehicleDistribution} />
                <ReportsMetrics metrics={reportMetrics} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
