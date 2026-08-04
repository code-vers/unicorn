'use client';

import MostBookedVehicles from '@/components/dashboard/admin/MostBookedVehicles';
import PendingPaymentsDetailed from '@/components/dashboard/admin/PendingPaymentsDetailed';
import PerformanceScore from '@/components/dashboard/admin/PerformanceScore';
import RecentActivityDetailed from '@/components/dashboard/admin/RecentActivityDetailed';
import RecentBookingsTable from '@/components/dashboard/admin/RecentBookingsTable';
import RevenueAnalysis from '@/components/dashboard/admin/RevenueAnalysis';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TodayAtGlance from '@/components/dashboard/TodayAtGlance';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';

export default function DashboardPage() {
  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex-1'>
        <main className='flex-1 overflow-y-auto bg-[#ffffff]'>
          <div className='p-6 space-y-6 max-w-[1600px] mx-auto'>
            {/* Welcome Section */}
            <WelcomeBanner />

            {/* Stats Overview */}
            <StatsGrid />

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
              {/* Left Column - Main Content (8 cols) */}
              <div className='lg:col-span-8 space-y-6'>
                {/* Top Row: Revenue + Most Booked */}
                <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
                  <div className='xl:col-span-8'>
                    <RevenueAnalysis />
                  </div>
                  <div className='xl:col-span-4'>
                    <MostBookedVehicles />
                  </div>
                </div>

                {/* Pending Payments */}
                <PendingPaymentsDetailed />

                {/* Recent Bookings Table */}
                <RecentBookingsTable />
              </div>

              {/* Right Column - Side Content (4 cols) */}
              <div className='lg:col-span-4 space-y-6'>
                {/* Today at a Glance */}
                <TodayAtGlance />

                {/* Recent Activity */}
                <RecentActivityDetailed />

                {/* Performance Score */}
                <PerformanceScore />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
