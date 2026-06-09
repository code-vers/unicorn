'use client';

import React from 'react';
import { CalendarDays, DollarSign, UserCheck, Car, BarChart2 } from 'lucide-react';
import StatCard from './StatCard';

export default function StatsGrid() {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,284',
      change: '+12.5%',
      subText: 'vs last 30 days',
      icon: CalendarDays,
      iconBgColor: '#ebf7ed',
      iconColor: '#3FA34D',
    },
    {
      title: 'Revenue',
      value: '328,500',
      change: '+12.5%',
      subText: 'vs last 30 days',
      icon: DollarSign,
      iconBgColor: '#ffefdf',
      iconColor: '#FF7815',
    },
    {
      title: 'Upcoming Rentals',
      value: '89',
      change: '+12.5%',
      subText: 'next 7 days',
      icon: BarChart2,
      iconBgColor: '#fff4df',
      iconColor: '#FFB800',
    },
    {
      title: 'Active Drivers',
      value: '62',
      change: '+12.5%',
      subText: '2 on leave today',
      icon: UserCheck,
      iconBgColor: '#f3eeff',
      iconColor: '#7C3AED',
    },
    {
      title: 'Available Vehicles',
      value: '94',
      change: '+12.5%',
      subText: '8 returned today',
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
