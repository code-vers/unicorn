'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ReportsToolbar from '@/components/dashboard/ReportsToolbar';
import BookingTrendsChart from '@/components/dashboard/BookingTrendsChart';
import RevenueGrowthChart from '@/components/dashboard/RevenueGrowthChart';
import VehicleDistributionChart from '@/components/dashboard/VehicleDistributionChart';
import ReportsMetrics from '@/components/dashboard/ReportsMetrics';
import { getBookingTrends, getRevenueGrowth, getVehicleDistribution, getReportMetrics } from '@/lib/dashboard-data';

export default function ReportsPage() {
  const bookingTrends = getBookingTrends();
  const revenueGrowth = getRevenueGrowth();
  const vehicleDistribution = getVehicleDistribution();
  const reportMetrics = getReportMetrics();

  return (
    <div className='flex h-screen bg-gray-50'>
      <DashboardSidebar />
      <div className='flex-1 overflow-auto md:ml-0'>
        <DashboardHeader completedToday={12} />
        <div className='p-6'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 font-montserrat'>Analytics & Reports</h2>
            <p className='text-gray-600 mt-1 font-lato'>Monitor business performance and fleet utilization</p>
          </div>

          <div className='bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden flex flex-col w-full'>
            <ReportsToolbar />
            
            <div className='p-8 flex flex-col gap-12'>
              {/* Row 1: Booking Trends & Revenue Growth */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                <BookingTrendsChart data={bookingTrends} />
                <RevenueGrowthChart data={revenueGrowth} />
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
