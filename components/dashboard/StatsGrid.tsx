'use client';

import React from 'react';
import { CalendarDays, DollarSign, UserCheck, Car, BarChart2 } from 'lucide-react';
import StatCard from './StatCard';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Spinner } from '@/components/ui/Spinner';

export default function StatsGrid() {
  const { overview, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[120px] w-full">
        <Spinner size="md" />
      </div>
    );
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
      change: '+12.5%', // Mocked until API supports changes
      subText: 'vs last 30 days',
      icon: CalendarDays,
      iconBgColor: '#ebf7ed',
      iconColor: '#3FA34D',
    },
    {
      title: 'Revenue',
      value: `£${overview.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      subText: 'vs last 30 days',
      icon: DollarSign,
      iconBgColor: '#ffefdf',
      iconColor: '#FF7815',
    },
    {
      title: 'Upcoming Rentals',
      value: overview.upcomingRentals.toString(),
      change: '+12.5%',
      subText: 'next 7 days',
      icon: BarChart2,
      iconBgColor: '#fff4df',
      iconColor: '#FFB800',
    },
    {
      title: 'Active Drivers',
      value: overview.pendingArrivals.toString(), // mapped pendingArrivals as a placeholder since driver API might be separate
      change: '+12.5%',
      subText: 'active today',
      icon: UserCheck,
      iconBgColor: '#f3eeff',
      iconColor: '#7C3AED',
    },
    {
      title: 'Available Vehicles',
      value: overview.activeVehicles.toString(),
      change: '+12.5%',
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

