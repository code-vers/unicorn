'use client';

import React from 'react';
import { CalendarDays, DollarSign, UserCheck, Car, BarChart2 } from 'lucide-react';
import StatCard from './StatCard';
import { useAnalytics } from '@/hooks/useAnalytics';
import { CardGridSkeleton } from '@/components/ui/Skeleton';

export default function StatsGrid() {
  const { overview, isLoading, error } = useAnalytics();

  if (isLoading) {
    return <CardGridSkeleton cards={4} />;
  }

  if (error || !overview) {
    return (
      <div className="flex items-center justify-center min-h-[120px] w-full text-red-500 text-sm">
        Failed to load stats.
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Bookings',
      value: overview.reservations.toLocaleString(),
      subText: 'all time',
      icon: CalendarDays,
      iconBgColor: '#ebf7ed',
      iconColor: '#3FA34D',
    },
    {
      title: 'Revenue',
      value: `KSh ${overview.totalRevenue.toLocaleString()}`,
      subText: 'successful payments',
      icon: DollarSign,
      iconBgColor: '#ffefdf',
      iconColor: '#FF7815',
    },
    {
      title: 'Upcoming Rentals',
      value: overview.upcomingRentals.toString(),
      subText: 'confirmed bookings',
      icon: BarChart2,
      iconBgColor: '#fff4df',
      iconColor: '#FFB800',
    },
    {
      title: 'Active Drivers',
      value: overview.activeDrivers.toString(),
      subText: 'currently assigned',
      icon: UserCheck,
      iconBgColor: '#f3eeff',
      iconColor: '#7C3AED',
    },
    {
      title: 'Available Vehicles',
      value: overview.availableVehicles.toString(),
      subText: 'currently ready',
      icon: Car,
      iconBgColor: '#e0f7ff',
      iconColor: '#0EA5E9',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
