import {
  DashboardMetrics,
  PendingPayment,
  RevenueData,
  VehicleStats,
  TodayAtGlance,
  PerformanceScore,
  RecentBooking,
} from '@/types/dashboard';

// Mock data - Replace with actual API calls
export const getDashboardMetrics = (): DashboardMetrics => {
  return {
    totalRevenue: 754000,
    reservations: 3285,
    upcomingRentals: 89,
    pendingArrivals: 62,
    activeVehicles: 94,
    completedToday: 8,
  };
};

export const getRevenueData = (): RevenueData[] => {
  return [
    { date: 'Jan', revenue: 42000, expenses: 28000, net: 14000 },
    { date: 'Feb', revenue: 38000, expenses: 25000, net: 13000 },
    { date: 'Mar', revenue: 52000, expenses: 31000, net: 21000 },
    { date: 'Apr', revenue: 48000, expenses: 29000, net: 19000 },
    { date: 'May', revenue: 62000, expenses: 38000, net: 24000 },
    { date: 'Jun', revenue: 58000, expenses: 35000, net: 23000 },
    { date: 'Jul', revenue: 72000, expenses: 43000, net: 29000 },
    { date: 'Aug', revenue: 68000, expenses: 40000, net: 28000 },
    { date: 'Sep', revenue: 56000, expenses: 34000, net: 22000 },
    { date: 'Oct', revenue: 78000, expenses: 45000, net: 33000 },
    { date: 'Nov', revenue: 82000, expenses: 47000, net: 35000 },
    { date: 'Dec', revenue: 95000, expenses: 52000, net: 43000 },
  ];
};

export const getVehicleStats = (): VehicleStats[] => {
  return [
    { type: 'Toyota Camry', count: 45, color: '#3FA34D' },
    { type: 'Honda Accord', count: 38, color: '#FF7815' },
    { type: 'Mercedes C-Class', count: 32, color: '#FFB800' },
    { type: 'BMW 3 Series', count: 28, color: '#F6F6F6' },
    { type: 'Audi A4', count: 25, color: '#0A1413' },
  ];
};

export const getPendingPayments = (): PendingPayment[] => {
  return [
    {
      id: 'INV-2411',
      name: 'James Okafor',
      amount: 1240,
      daysOverdue: 3,
      initials: 'JO',
      avatarColor: '#EBF7ED',
    },
    {
      id: 'INV-2408',
      name: 'Amira Diallo',
      amount: 890,
      daysOverdue: 5,
      initials: 'AD',
      avatarColor: '#EBF7ED',
    },
    {
      id: 'INV-2405',
      name: 'Sophie Turner',
      amount: 2100,
      daysOverdue: 9,
      initials: 'ST',
      avatarColor: '#FFF3E8',
    },
    {
      id: 'INV-2401',
      name: 'Felix Mensah',
      amount: 650,
      daysOverdue: 14,
      initials: 'FM',
      avatarColor: '#FFF3E8',
    },
  ];
};

export const getRecentActivity = () => {
  return [
    {
      id: '1',
      type: 'booking' as const,
      title: 'New Booking',
      description: 'Oliver Chen — BMW 5 Series · Self-Drive',
      time: '2 min ago',
      status: 'new' as const,
    },
    {
      id: '2',
      type: 'driver' as const,
      title: 'Driver Assigned',
      description: 'Mike Asante assigned to BK-4021',
      time: '18 min ago',
      status: 'completed' as const,
    },
    {
      id: '3',
      type: 'payment' as const,
      title: 'Payment Overdue',
      description: 'Amira Diallo · INV-2408 · £890',
      time: '1 hr ago',
      status: 'pending' as const,
    },
    {
      id: '4',
      type: 'booking' as const,
      title: 'Booking Completed',
      description: 'Felix Mensah — Ford Explorer returned',
      time: '2 hr ago',
      status: 'completed' as const,
    },
    {
      id: '5',
      type: 'assignment' as const,
      title: 'Service Alert',
      description: 'Toyota Camry (LT21 ABC) — service due',
      time: '3 hr ago',
      status: 'pending' as const,
    },
  ];
};

export const getTodayAtGlance = (): TodayAtGlance => {
  return {
    revenue: 3840,
    revenueChange: 12,
    newBookings: 12,
    pendingActions: 5,
  };
};

export const getPerformanceScore = (): PerformanceScore => {
  return {
    score: 94.2,
    reviewsCount: 284,
    rating: 4.7,
  };
};

export const getRecentBookings = (): RecentBooking[] => {
  return [
    {
      id: 'BK-4021',
      customer: { name: 'James Okafor', id: 'BK-4021', initials: 'JO', avatarColor: '#EBF7ED' },
      vehicle: 'Mercedes C-Class',
      pickupDate: '12 May',
      dropoffDate: '15 May',
      type: 'Chauffeur',
      status: 'In Progress',
      paymentStatus: 'Paid',
      amount: 480,
    },
    {
      id: 'BK-4020',
      customer: { name: 'Amira Diallo', id: 'BK-4020', initials: 'AD', avatarColor: '#FFF3E8' },
      vehicle: 'BMW 5 Series',
      pickupDate: '12 May',
      dropoffDate: '14 May',
      type: 'Self-drive',
      status: 'Completed',
      paymentStatus: 'Paid',
      amount: 310,
    },
    {
      id: 'BK-4019',
      customer: { name: 'Sophie Turner', id: 'BK-4019', initials: 'ST', avatarColor: '#EBE9F5' },
      vehicle: 'Toyota Camry',
      pickupDate: '13 May',
      dropoffDate: '17 May',
      type: 'Chauffeur',
      status: 'Pending',
      paymentStatus: 'Pending',
      amount: 620,
    },
    {
      id: 'BK-4018',
      customer: { name: 'Felix Mensah', id: 'BK-4018', initials: 'FM', avatarColor: '#E0F7FF' },
      vehicle: 'Ford Explorer',
      pickupDate: '11 May',
      dropoffDate: '13 May',
      type: 'Self-drive',
      status: 'Completed',
      paymentStatus: 'Refunded',
      amount: 275,
    },
    {
      id: 'BK-4017',
      customer: { name: 'Laila Nasser', id: 'BK-4017', initials: 'LN', avatarColor: '#FFF9E0' },
      vehicle: 'Hyundai Sonata',
      pickupDate: '14 May',
      dropoffDate: '16 May',
      type: 'Self-drive',
      status: 'Pending',
      paymentStatus: 'Pending',
      amount: 240,
    },
    {
      id: 'BK-4016',
      customer: { name: 'Marcus Blaine', id: 'BK-4016', initials: 'MB', avatarColor: '#FFF0F0' },
      vehicle: 'Nissan Altima',
      pickupDate: '10 May',
      dropoffDate: '11 May',
      type: 'Chauffeur',
      status: 'Cancelled',
      paymentStatus: 'Refunded',
      amount: 190,
    },
    {
      id: 'BK-4015',
      customer: { name: 'Priya Sharma', id: 'BK-4015', initials: 'PS', avatarColor: '#EBF7ED' },
      vehicle: 'BMW 5 Series',
      pickupDate: '15 May',
      dropoffDate: '18 May',
      type: 'Chauffeur',
      status: 'In Progress',
      paymentStatus: 'Paid',
      amount: 540,
    },
  ];
};
