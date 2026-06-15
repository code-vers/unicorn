'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import MostBookedVehicles from '@/components/dashboard/MostBookedVehicles';
import PendingPaymentsDetailed from '@/components/dashboard/PendingPaymentsDetailed';
import PerformanceScore from '@/components/dashboard/PerformanceScore';
import RecentActivityDetailed from '@/components/dashboard/RecentActivityDetailed';
import RecentBookingsTable from '@/components/dashboard/RecentBookingsTable';
import RevenueAnalysis from '@/components/dashboard/RevenueAnalysis';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TodayAtGlance from '@/components/dashboard/TodayAtGlance';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';

export default function DashboardPage() {
  return (
    <div className='flex h-screen bg-white'>
      <DashboardSidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <DashboardHeader />
        <main className='flex-1 overflow-y-auto bg-[#F9FAFB]'>
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
